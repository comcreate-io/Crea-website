"use client";

import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";
import { TextAnimate } from "@/components/ui/text-animate";
import { BorderBeam } from "@/components/ui/border-beam";
import { track } from "@/lib/analytics";

const principles = [
  {
    number: "01",
    title: "Preservation",
    description:
      "Safeguarding principal through conservative underwriting and legacy-focused acquisition in prime markets.",
  },
  {
    number: "02",
    title: "Performance",
    description:
      "Targeting attractive, risk-adjusted returns driven by tangible asset appreciation and market demand.",
  },
  {
    number: "03",
    title: "Transparency",
    description:
      "Alignment of interests through clear reporting, open communication, and defined investment frameworks.",
  },
];

export function InvestmentSection() {
  return (
    <section id="investment" className="py-24 md:py-32 bg-[#1C1917] text-white relative overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(139,115,85,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="container relative z-10">
        {/* Top Section - Two Column */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 mb-16">
          {/* Left - Headline */}
          <div>
            <BlurFade delay={0.1} inView>
              <span className="text-[11px] uppercase tracking-[3px] text-[#C9A96E] mb-6 block">
                Raising Capital
              </span>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
                <TextAnimate as="span" animation="blurInUp" by="word">
                  Capital
                </TextAnimate>{" "}
                <span className="text-[#C9A96E]">&</span>
                <br />
                <TextAnimate as="span" animation="blurInUp" by="word" delay={0.2}>
                  Vision
                </TextAnimate>
              </h2>
            </BlurFade>
          </div>

          {/* Right - Description + Stats */}
          <div className="flex flex-col justify-end">
            <BlurFade delay={0.3} inView>
              <p className="text-lg text-white/70 leading-relaxed">
                The firm partners with high net-worth individuals, family offices, and select private capital firms to offer alternative investment strategies through luxury residential real estate development. These partnerships are structured to prioritize capital preservation while targeting attractive, risk-adjusted returns through conservative underwriting, strong equity positions, and clearly defined investment frameworks. Transparency, alignment of interests, and a risk-averse approach are central to every investor relationship. We are also actively raising capital for upcoming luxury residential developments and new acquisitions.
              </p>
            </BlurFade>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10" />

        {/* Principles List */}
        <div>
          {principles.map((principle, index) => (
            <BlurFade key={principle.number} delay={0.5 + index * 0.1} inView>
              <div className="grid grid-cols-1 md:grid-cols-[100px_240px_1fr_auto] gap-4 md:gap-8 items-start md:items-center py-8 border-b border-white/10 group hover:bg-white/[0.02] transition-colors px-4 -mx-4">
                <div className="flex items-center gap-4 md:block">
                  <span className="font-[family-name:var(--font-playfair)] text-2xl text-white/25 group-hover:text-white/40 transition-colors">
                    {principle.number}
                  </span>
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl md:text-3xl text-white group-hover:text-[#C9A96E] transition-colors md:hidden">
                    {principle.title}
                  </h3>
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-white group-hover:text-[#C9A96E] transition-colors hidden md:block">
                  {principle.title}
                </h3>
                <p className="text-white/50 leading-relaxed group-hover:text-white/70 transition-colors text-sm md:text-base">
                  {principle.description}
                </p>
                {/* Document icon for last item */}
                {index === 2 && (
                  <div className="hidden md:block text-white/30 group-hover:text-[#C9A96E] transition-colors">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </BlurFade>
          ))}
        </div>

        {/* CTA Button */}
        <BlurFade delay={0.8} inView>
          <div className="flex justify-center mt-16">
            <Link
              href="#contact"
              onClick={() => track("request_access_click", { location: "investment_section" })}
              className="relative inline-block px-12 py-4 border border-white/20 hover:border-[#C9A96E]/50 transition-colors duration-300 overflow-hidden"
            >
              <span className="text-[11px] uppercase tracking-[3px] font-medium text-white">
                Request Access
              </span>
              <BorderBeam
                size={80}
                duration={8}
                colorFrom="#C9A96E"
                colorTo="#8B7355"
                borderWidth={1}
              />
            </Link>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
