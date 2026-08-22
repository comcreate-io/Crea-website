"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { TextAnimate } from "@/components/ui/text-animate";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BorderBeam } from "@/components/ui/border-beam";
import { BackgroundVideo } from "@/components/ui/background-video";

export function DevelopmentsSection() {
  return (
    <section id="developments" className="py-24 md:py-32 text-white relative overflow-hidden">
      {/* Background Video */}
      <BackgroundVideo
        src="https://res.cloudinary.com/dku1gnuat/video/upload/v1767825571/property-tour_qdsczq.mp4"
        poster="https://res.cloudinary.com/dku1gnuat/video/upload/so_0,q_auto,f_jpg/property-tour_qdsczq.jpg"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <BlurFade delay={0.1} inView>
            <span className="text-[11px] uppercase tracking-[3px] text-[#C9A96E] mb-6 block">
              2026 Pipeline
            </span>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl text-white leading-[1.1] mb-6">
              <TextAnimate as="span" animation="slideUp" by="word">
                Curated
              </TextAnimate>{" "}
              <span className="italic text-[#C9A96E]">Developments</span>
            </h2>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              Each property is carefully selected through our proprietary evaluation
              process, ensuring only the highest-potential developments make it
              into our portfolio.
            </p>
          </BlurFade>
        </div>

        {/* Stats Card */}
        <BlurFade delay={0.4} inView>
          <div className="relative max-w-4xl mx-auto p-8 md:p-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden">
            <BorderBeam
              size={120}
              duration={10}
              colorFrom="#C9A96E"
              colorTo="#8B7355"
              borderWidth={1}
            />

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 text-center max-w-2xl mx-auto">
              <div>
                <div className="flex items-baseline justify-center">
                  <NumberTicker
                    value={5}
                    className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#C9A96E]"
                  />
                  <span className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#C9A96E]">
                    +
                  </span>
                </div>
                <p className="text-[10px] uppercase tracking-[2px] text-white/50 mt-3">
                  Properties Secured
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#C9A96E]">
                  More
                </span>
                <p className="text-[10px] uppercase tracking-[2px] text-white/50 mt-3">
                  Coming Soon
                </p>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/20">
              <p className="text-white/60 text-center leading-relaxed max-w-2xl mx-auto">
                We have additional builds in the pipeline.
              </p>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
