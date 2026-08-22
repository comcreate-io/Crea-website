"use client";

import { MutedAutoplayVideo } from "@/components/ui/muted-autoplay-video";

interface BackgroundVideoProps {
  src: string;
  mobileSrc?: string;
  poster?: string;
  className?: string;
}

export function BackgroundVideo({ src, mobileSrc, poster, className = "" }: BackgroundVideoProps) {
  // #t=0.001 shows the first frame on iOS instead of a black screen if the still is missing.
  const desktopSrc = `${src}#t=0.001`;
  const mobileSrcWithTime = mobileSrc ? `${mobileSrc}#t=0.001` : undefined;

  if (mobileSrc && mobileSrcWithTime) {
    return (
      <>
        <MutedAutoplayVideo
          src={desktopSrc}
          poster={poster}
          className={`hidden md:block ${className}`}
        />
        <MutedAutoplayVideo
          src={mobileSrcWithTime}
          poster={poster}
          className={`md:hidden ${className}`}
        />
      </>
    );
  }

  return <MutedAutoplayVideo src={desktopSrc} poster={poster} className={className} />;
}
