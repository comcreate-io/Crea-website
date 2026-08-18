import { NextRequest, NextResponse, after } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

// Time-on-form floor. Below this we treat the post as automated. Kept low
// (1,500 ms) because autofill plus a short message can beat a higher floor
// and a false positive silently drops a real inquiry.
const MIN_ELAPSED_MS = 1500;

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  interest: z.enum(["investor", "buyer", "seller", "other"]).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(5000),
  // Honeypot. Humans never see or fill this field.
  company: z.string().max(500).optional().or(z.literal("")),
  // Client-side time on form in ms.
  elapsedMs: z.number().finite().nonnegative().optional(),
  // Pathname the form was submitted from (route attribution).
  page: z.string().max(200).optional(),
});

type ContactInput = z.infer<typeof ContactSchema>;

const escapeHtml = (s: string): string =>
  s.replace(/[&<>"']/g, (c) => {
    switch (c) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });

type LogPayload = {
  ts: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  page: string;
  ua: string;
  spam_flag: boolean;
  resend_id?: string;
  error?: string;
};

// Fire-and-forget durable log (Google Sheet via Apps Script, or any inbound
// webhook). Secret travels in the JSON body because Apps Script doPost cannot
// read custom request headers. Never throws, never blocks the lead, no-op
// when LEAD_WEBHOOK_URL is unset. No IP is logged. Scheduled with after() so
// the request runs to completion once the response has been sent.
function logSubmission(payload: LogPayload): void {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return;
  try {
    after(() => sendLog(url, payload));
  } catch (err) {
    // after() is unavailable outside a request scope; fall back to a bare promise.
    console.error("Lead log scheduling failed:", err);
    void sendLog(url, payload);
  }
}

function sendLog(url: string, payload: LogPayload): Promise<void> {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: process.env.LEAD_WEBHOOK_SECRET ?? "", ...payload }),
    signal: AbortSignal.timeout(4000),
    redirect: "follow",
  })
    .then(() => undefined)
    .catch((err: unknown) => {
      console.error("Lead log failed:", err);
    });
}

function basePayload(input: ContactInput, ua: string): Omit<LogPayload, "spam_flag"> {
  return {
    ts: new Date().toISOString(),
    name: input.name,
    email: input.email,
    phone: input.phone || "",
    interest: input.interest || "",
    message: input.message,
    page: input.page || "/",
    ua,
  };
}

export async function POST(request: NextRequest) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid submission" }, { status: 400 });
  }

  const input = parsed.data;
  const { name, email, phone, interest, message, company, elapsedMs, page } = input;
  const ua = request.headers.get("user-agent") ?? "";

  const isSpam =
    Boolean(company) || (typeof elapsedMs === "number" && elapsedMs < MIN_ELAPSED_MS);

  if (isSpam) {
    // Log it, but pretend success so bots learn nothing. No email is sent and
    // the client skips the GA event when spam is true.
    logSubmission({ ...basePayload(input, ua), spam_flag: true });
    return NextResponse.json({ ok: true, spam: true }, { status: 200 });
  }

  try {
    const from = process.env.RESEND_FROM || "CREA Development <onboarding@resend.dev>";
    const to = (process.env.RESEND_TO || "Alex@crea-development.com,diego@comcreate.org")
      .split(",")
      .map((address) => address.trim())
      .filter(Boolean);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "Not provided");
    const safeInterest = escapeHtml(interest || "Not specified");
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");
    const safePage = escapeHtml(page || "/");

    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New Contact Form Submission - ${interest || "General Inquiry"}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Interest:</strong> ${safeInterest}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
        <hr/>
        <p style="color:#888;font-size:12px">Page: ${safePage} | Source: crea-development.com contact form</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      logSubmission({ ...basePayload(input, ua), spam_flag: false, error: error.message });
      return NextResponse.json(
        { message: "Failed to send email", error: error.message },
        { status: 500 }
      );
    }

    logSubmission({ ...basePayload(input, ua), spam_flag: false, resend_id: data?.id });
    return NextResponse.json(
      { ok: true, message: "Email sent successfully", id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    logSubmission({
      ...basePayload(input, ua),
      spam_flag: false,
      error: error instanceof Error ? error.message : "unknown",
    });
    return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
  }
}
