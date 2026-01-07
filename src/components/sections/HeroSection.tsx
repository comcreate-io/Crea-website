"use client";

import { useEffect, useRef } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { TextAnimate } from "@/components/ui/text-animate";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Force play all videos on load (helps with iOS autoplay)
    const videos = document.querySelectorAll('video');
    videos.forEach(async (video) => {
      video.muted = true; // Ensure muted for autoplay
      try {
        await video.play();
      } catch (e) {
        // Autoplay was prevented
      }
    });

    const video = videoRef.current;
    if (!video) return;

    // Smooth loop - restart slightly before end to avoid black frame
    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime > video.duration - 0.5) {
        video.currentTime = 0;
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center text-center text-white overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 -z-10">
        {/* Desktop video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          preload="auto"
          webkit-playsinline="true"
          x-webkit-airplay="deny"
          disablePictureInPicture
          className="hidden md:block absolute inset-0 w-full h-full object-cover [&::-webkit-media-controls]:hidden [&::-webkit-media-controls-enclosure]:hidden [&::-webkit-media-controls-panel]:hidden"
          src="https://res.cloudinary.com/dku1gnuat/video/upload/v1767825571/hero-drone_ugfa4w.mp4"
        />
        {/* Mobile video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          preload="auto"
          webkit-playsinline="true"
          x-webkit-airplay="deny"
          disablePictureInPicture
          className="md:hidden absolute inset-0 w-full h-full object-cover [&::-webkit-media-controls]:hidden [&::-webkit-media-controls-enclosure]:hidden [&::-webkit-media-controls-panel]:hidden"
          src="https://res.cloudinary.com/dku1gnuat/video/upload/v1767825570/hero-drone-mobile_mv44q4.mp4"
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

        <BlurFade delay={0.4} inView>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-4 leading-[1.1]">
            <TextAnimate animation="blurInUp" by="word">
              Luxury Residential
            </TextAnimate>
          </h1>
        </BlurFade>

        <BlurFade delay={0.5} inView>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-8 leading-[1.1]">
            <span className="text-white italic">Development</span>
          </h1>
        </BlurFade>

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
