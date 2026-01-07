"use client";

import { useEffect, useRef } from "react";

interface BackgroundVideoProps {
  src: string;
  mobileSrc?: string;
  className?: string;
}

export function BackgroundVideo({ src, mobileSrc, className = "" }: BackgroundVideoProps) {
  const desktopRef = useRef<HTMLVideoElement>(null);
  const mobileRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const playVideo = async (video: HTMLVideoElement | null) => {
      if (!video) return;

      video.muted = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");

      try {
        await video.play();
      } catch {
        // Silently handle autoplay prevention
      }
    };

    playVideo(desktopRef.current);
    if (mobileSrc) {
      playVideo(mobileRef.current);
    }
  }, [mobileSrc]);

  const videoClassName = `absolute inset-0 w-full h-full object-cover ${className}`;

  if (mobileSrc) {
    return (
      <>
        <video
          ref={desktopRef}
          className={`hidden md:block ${videoClassName}`}
          autoPlay
          muted
          loop
          playsInline
          src={src}
        />
        <video
          ref={mobileRef}
          className={`md:hidden ${videoClassName}`}
          autoPlay
          muted
          loop
          playsInline
          src={mobileSrc}
        />
      </>
    );
  }

  return (
    <video
      ref={desktopRef}
      className={videoClassName}
      autoPlay
      muted
      loop
      playsInline
      src={src}
    />
  );
}
