"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { TextAnimate } from "@/components/ui/text-animate";
import { BackgroundVideo } from "@/components/ui/background-video";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center text-center text-white overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 -z-10">
        <BackgroundVideo
          src="https://res.cloudinary.com/dku1gnuat/video/upload/v1767825571/hero-drone_ugfa4w.mp4"
          poster="/images/hero.png"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <BlurFade delay={0.2} inView>
          <span className="inline-block text-[11px] uppercase tracking-[4px] text-white/80 mb-8">
            Scottsdale &bull; Paradise Valley &bull; Arcadia &bull; Biltmore
          </span>
        </BlurFade>

        <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-8 leading-[1.1]">
          <BlurFade as="span" delay={0.4} inView className="block mb-4">
            <TextAnimate as="span" animation="blurInUp" by="word" className="block">
              Luxury Residential
            </TextAnimate>
          </BlurFade>
          <BlurFade as="span" delay={0.5} inView className="block">
            <span className="text-white italic">Development</span>
          </BlurFade>
        </h1>

        <BlurFade delay={0.7} inView>
          <p className="text-base sm:text-lg md:text-xl font-light text-white/85 mb-12 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
            Specializing in high-end, ground-up spec homes throughout
            Arizona&apos;s most sought-after markets.
          </p>
        </BlurFade>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <BlurFade delay={1.2} inView>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
        </BlurFade>
      </div>
    </section>
  );
}
