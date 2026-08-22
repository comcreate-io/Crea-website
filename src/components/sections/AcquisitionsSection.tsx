"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { TextAnimate } from "@/components/ui/text-animate";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BackgroundVideo } from "@/components/ui/background-video";

export function AcquisitionsSection() {
  return (
    <section id="acquisitions" className="py-24 md:py-32 text-white relative overflow-hidden">
      {/* Background Video */}
      <BackgroundVideo
        src="https://res.cloudinary.com/dku1gnuat/video/upload/v1767734734/video_gotd4b.mp4"
        poster="https://res.cloudinary.com/dku1gnuat/video/upload/so_0,q_auto,f_jpg/video_gotd4b.jpg"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(139,115,85,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <BlurFade delay={0.1} inView>
            <span className="text-[11px] uppercase tracking-[3px] text-[#C9A96E] mb-6 block">
              Proven Track Record
            </span>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl leading-[1.1] mb-3">
              <TextAnimate as="span" animation="blurInUp" by="word">
                Strategic
              </TextAnimate>{" "}
              <span className="text-[#C9A96E]">Acquisitions</span>
            </h2>
            <p className="text-lg md:text-xl text-white/60 mb-6">
              Real Estate Acquisitions & Joint Venture
            </p>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              The CREA Development team has been instrumental in over{" "}
              <span className="text-[#C9A96E] font-medium">$300M</span> in off-market
              luxury real estate acquisitions & joint ventures over the past three years.
            </p>
          </BlurFade>
        </div>

        {/* Stats Row */}
        <BlurFade delay={0.4} inView>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 mb-16">
            <div className="text-center">
              <div className="flex items-baseline justify-center">
                <span className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#C9A96E]">
                  $
                </span>
                <NumberTicker
                  value={300}
                  className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#C9A96E]"
                />
                <span className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#C9A96E]">
                  M+
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-[2px] text-white/50 mt-2">
                Acquisitions Facilitated
              </p>
            </div>
            <div className="text-center">
              <NumberTicker
                value={3}
                className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#C9A96E]"
              />
              <span className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#C9A96E]">
                {" "}Years
              </span>
              <p className="text-[10px] uppercase tracking-[2px] text-white/50 mt-2">
                Track Record
              </p>
            </div>
          </div>
        </BlurFade>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-12" />

        {/* Value Proposition */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <BlurFade delay={0.5} inView>
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-white mb-4">
                Off-Market Access
              </h3>
              <p className="text-white/60 leading-relaxed">
                Through deep relationships and trust, we source opportunities before they reach the open market securing premium parcels at favorable terms.
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.6} inView>
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-white mb-4">
                Selective Process
              </h3>
              <p className="text-white/60 leading-relaxed">
                We carefully evaluate every opportunity through our proprietary systems,
                selecting only the developments that meet our strict criteria, ensuring
                the best outcomes for our investors.
              </p>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
