import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { pageMeta } from "@/lib/meta";
import { CONTACT, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  path: "/privacy",
  title: "Privacy Policy",
  description:
    "How Crea Development collects, uses, and protects information submitted through crea-development.com, including the contact form, analytics, and email delivery.",
});

const LAST_UPDATED = "August 17, 2026";

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated={LAST_UPDATED}>
      <p>
        {SITE_NAME} (&quot;Crea,&quot; &quot;we,&quot; &quot;us,&quot; or
        &quot;our&quot;) operates the website at {SITE_URL} (the
        &quot;Site&quot;). This Privacy Policy explains what information we
        collect when you visit the Site or contact us through it, how we use
        that information, and the choices you have.
      </p>

      <h2>Information you provide to us</h2>
      <p>
        The Site includes a contact form. When you submit it, we collect the
        information you enter in the following fields: your name, email
        address, phone number, the interest you select (for example investor,
        buyer, or land owner), and your message. We also record the date and
        time of the submission and the page you submitted it from.
      </p>
      <p>
        You may also contact us directly by phone or email using the details on
        the Site. Any information you share that way is used to respond to you.
      </p>

      <h2>Information collected automatically</h2>
      <p>
        When you browse the Site we may collect standard technical information
        through analytics tools, including the pages you view, the approximate
        region you are visiting from, your device and browser type, referring
        website, and how you interact with the Site. We use:
      </p>
      <ul>
        <li>
          Google Analytics 4, provided by Google LLC, to understand how visitors
          use the Site. Google Analytics uses cookies and similar identifiers.
          You can learn how Google uses data at{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            rel="noopener noreferrer"
            target="_blank"
          >
            policies.google.com/technologies/partner-sites
          </a>{" "}
          and opt out with the Google Analytics browser add-on.
        </li>
        <li>
          Vercel Analytics and Vercel Speed Insights, provided by Vercel Inc.,
          which measure page views and performance without cookies and without
          storing personal identifiers.
        </li>
      </ul>

      <h2>How we use information</h2>
      <ul>
        <li>To respond to inquiries and requests you send through the Site.</li>
        <li>
          To evaluate potential investment, acquisition, or purchase
          conversations you have asked us to start.
        </li>
        <li>To operate, secure, and improve the Site.</li>
        <li>To comply with legal obligations.</li>
      </ul>
      <p>
        We do not sell your personal information, and we do not use it for
        third-party advertising.
      </p>

      <h2>How contact form submissions are delivered and stored</h2>
      <p>
        Contact form submissions are delivered to Crea inboxes by email using
        Resend, an email delivery service operated by Resend, Inc. A copy of
        each submission is also written to a private submissions log that Crea
        owns and controls, so that inquiries are not lost. Access to that log
        is limited to Crea and the service providers who maintain the Site on
        our behalf.
      </p>

      <h2>Service providers</h2>
      <p>
        We rely on a small number of service providers to run the Site: Vercel
        (hosting and analytics), Google (analytics and embedded maps), Resend
        (email delivery), and our website agency, which maintains the Site.
        Each processes information only as needed to provide its service to us.
      </p>

      <h2>Cookies</h2>
      <p>
        The Site uses cookies and similar technologies for analytics as
        described above. Most browsers let you block or delete cookies through
        their settings. Blocking cookies does not prevent you from using the
        Site or the contact form.
      </p>

      <h2>Retention</h2>
      <p>
        We keep contact form submissions for as long as needed to respond to
        you and to maintain a record of the conversation, and then for as long
        as required by law or our legitimate business needs. Analytics data is
        retained according to the settings of the tools described above.
      </p>

      <h2>Your choices and rights</h2>
      <p>
        You may ask us to access, correct, or delete the personal information
        we hold about you, or to stop contacting you, by emailing{" "}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or calling{" "}
        <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a>. Depending on
        where you live you may have additional rights under applicable law; we
        will honor valid requests.
      </p>

      <h2>Children</h2>
      <p>
        The Site is intended for adults. We do not knowingly collect personal
        information from anyone under 18.
      </p>

      <h2>Security</h2>
      <p>
        We use reasonable technical and organizational measures to protect the
        information we hold. No method of transmission or storage is completely
        secure, so we cannot guarantee absolute security.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The date at the
        top of this page shows when it was last revised. Continued use of the
        Site after a change means you accept the updated policy.
      </p>

      <h2>Contact</h2>
      <p>
        {SITE_NAME}
        <br />
        {CONTACT.street}, {CONTACT.city}, {CONTACT.region} {CONTACT.postal}
        <br />
        <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a>
        <br />
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
      </p>
    </LegalPage>
  );
}
