"use client";

import { useRef, useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Phone, Mail } from "lucide-react";
import { track } from "@/lib/analytics";

const contacts = [
  {
    name: "Diego Colwell",
    title: "Founder & President",
    phone: "480-341-1881",
    email: "Diego@crea-development.com",
  },
  {
    name: "Alex Yoo",
    title: "Director of Acquisitions & Investor Relations",
    phone: "858-343-8500",
    email: "Alex@crea-development.com",
  },
];

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  // Spam protection: time on form. Set when the section mounts.
  const startedAt = useRef<number>(Date.now());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      interest: formData.get("interest"),
      message: formData.get("message"),
      // Honeypot: humans never see or fill this field.
      company: formData.get("company"),
      elapsedMs: Date.now() - startedAt.current,
      page: typeof window !== "undefined" ? window.location.pathname : "/",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const json: { spam?: boolean } = await response.json().catch(() => ({}));
        setSubmitStatus("success");
        if (!json.spam) {
          track("contact_form_submit", {
            form_id: "contact",
            interest: String(data.interest ?? ""),
            has_phone: Boolean(data.phone),
          });
        }
        form.reset();
        startedAt.current = Date.now();
      } else {
        setSubmitStatus("error");
        track("contact_form_error", { form_id: "contact", status: response.status });
      }
    } catch {
      setSubmitStatus("error");
      track("contact_form_error", { form_id: "contact", status: 0 });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 lg:py-32 bg-[#FAF8F5]">
      <div className="container px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-24">
          {/* Left Column - Contact Info */}
          <div className="text-center md:text-left">
            <BlurFade delay={0.1} inView>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[2px] sm:tracking-[3px] text-[#8B7355] mb-4 sm:mb-6 block">
                Contact Us
              </span>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 text-[#2C2824] leading-[1.1]">
                Start the
                <br />
                Conversation
              </h2>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <p className="text-base sm:text-lg text-[#6B6560] mb-8 sm:mb-12 leading-relaxed max-w-md mx-auto md:mx-0">
                We invite accredited investors and land owners to discuss
                current and future opportunities.
              </p>
            </BlurFade>

            {/* Contact Cards */}
            <div className="space-y-6 sm:space-y-8">
              {contacts.map((contact, index) => (
                <BlurFade key={contact.name} delay={0.4 + index * 0.1} inView>
                  <div className="group">
                    <h3 className="font-[family-name:var(--font-playfair)] text-lg sm:text-xl text-[#2C2824]">
                      {contact.name}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] uppercase tracking-[1.5px] sm:tracking-[2px] text-[#8B7355] mb-2 sm:mb-3">
                      {contact.title}
                    </p>
                    <div className="flex flex-col gap-2">
                      <a
                        href={`tel:${contact.phone.replace(/-/g, "")}`}
                        onClick={() => track("phone_click", { person: contact.name, location: "contact_section" })}
                        className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 text-[#6B6560] hover:text-[#8B7355] transition-colors active:scale-[0.98]"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#F4F1ED] flex items-center justify-center group-hover:bg-[#8B7355]/10 transition-colors">
                          <Phone className="w-4 h-4" />
                        </div>
                        <span className="text-sm sm:text-base">{contact.phone}</span>
                      </a>
                      <a
                        href={`mailto:${contact.email}`}
                        onClick={() => track("email_click", { person: contact.name, location: "contact_section" })}
                        className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 text-[#6B6560] hover:text-[#8B7355] transition-colors active:scale-[0.98]"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#F4F1ED] flex items-center justify-center group-hover:bg-[#8B7355]/10 transition-colors">
                          <Mail className="w-4 h-4" />
                        </div>
                        <span className="text-xs sm:text-sm">{contact.email}</span>
                      </a>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>

            <BlurFade delay={0.6} inView>
              <div className="mt-8 sm:mt-10">
                <a
                  href="https://www.instagram.com/creadevelopment?igsh=NTc4MTIwNjQ2YQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("instagram_click", { location: "contact_section" })}
                  className="inline-flex items-center justify-center md:justify-start gap-2 sm:gap-3 text-[#6B6560] hover:text-[#8B7355] transition-colors active:scale-[0.98]"
                >
                  <div className="w-8 h-8 rounded-full bg-[#F4F1ED] flex items-center justify-center hover:bg-[#8B7355]/10 transition-colors">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                  </div>
                  <span className="text-sm sm:text-base">@creadevelopment</span>
                </a>
              </div>
            </BlurFade>
          </div>

          {/* Right Column - Contact Form */}
          <BlurFade delay={0.5} inView>
            <MagicCard
              className="p-5 sm:p-8 md:p-10 bg-white border-0 shadow-sm rounded-xl"
              gradientColor="rgba(139, 115, 85, 0.08)"
              gradientSize={300}
            >
              <h3 className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl text-[#2C2824] mb-6 sm:mb-8">
                Send a Message
              </h3>

              <form className="space-y-4 sm:space-y-6 relative" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] sm:text-[10px] uppercase tracking-[1.5px] sm:tracking-[2px] text-[#6B6560] mb-1.5 sm:mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="w-full p-3 sm:p-4 bg-[#F8F6F3] border border-[#E8E4DF] text-[#2C2824] placeholder:text-[#6B6560]/50 focus:outline-none focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355] transition-all rounded-lg text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] sm:text-[10px] uppercase tracking-[1.5px] sm:tracking-[2px] text-[#6B6560] mb-1.5 sm:mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="w-full p-3 sm:p-4 bg-[#F8F6F3] border border-[#E8E4DF] text-[#2C2824] placeholder:text-[#6B6560]/50 focus:outline-none focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355] transition-all rounded-lg text-base"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] sm:text-[10px] uppercase tracking-[1.5px] sm:tracking-[2px] text-[#6B6560] mb-1.5 sm:mb-2">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full p-3 sm:p-4 bg-[#F8F6F3] border border-[#E8E4DF] text-[#2C2824] placeholder:text-[#6B6560]/50 focus:outline-none focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355] transition-all rounded-lg text-base"
                  />
                </div>

                <div>
                  <label className="block text-[9px] sm:text-[10px] uppercase tracking-[1.5px] sm:tracking-[2px] text-[#6B6560] mb-1.5 sm:mb-2">
                    Interest
                  </label>
                  <select
                    name="interest"
                    className="w-full p-3 sm:p-4 bg-[#F8F6F3] border border-[#E8E4DF] text-[#2C2824] focus:outline-none focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355] transition-all appearance-none cursor-pointer rounded-lg text-base"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select your interest
                    </option>
                    <option value="investor">Investment Opportunities</option>
                    <option value="buyer">Property Buyer</option>
                    <option value="seller">Property Seller</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] sm:text-[10px] uppercase tracking-[1.5px] sm:tracking-[2px] text-[#6B6560] mb-1.5 sm:mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full p-3 sm:p-4 bg-[#F8F6F3] border border-[#E8E4DF] text-[#2C2824] placeholder:text-[#6B6560]/50 focus:outline-none focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355] transition-all resize-none rounded-lg text-base"
                    required
                  />
                </div>

                {/* Honeypot. Hidden from humans and screen readers; bots fill it. */}
                <div aria-hidden="true" className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden">
                  <label htmlFor="company">Company</label>
                  <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <ShimmerButton
                  type="submit"
                  className="w-full py-3.5 sm:py-4"
                  shimmerColor="#8B7355"
                  shimmerSize="0.1em"
                  background="#2C2824"
                  borderRadius="8px"
                  disabled={isSubmitting}
                >
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[1.5px] sm:tracking-[2px] font-semibold">
                    {isSubmitting ? "Sending..." : "Submit Inquiry"}
                  </span>
                </ShimmerButton>

                {submitStatus === "success" && (
                  <p className="text-green-600 text-sm text-center mt-4">
                    Thank you! Your message has been sent successfully.
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-red-600 text-sm text-center mt-4">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </MagicCard>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
