"use client";

import { useEffect, useRef } from "react";

interface BackgroundVideoProps {
  src: string;
  mobileSrc?: string;
  poster?: string;
  className?: string;
}

export function BackgroundVideo({ src, mobileSrc, poster, className = "" }: BackgroundVideoProps) {
  const desktopRef = useRef<HTMLVideoElement>(null);
  const mobileRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const playVideo = async (video: HTMLVideoElement | null) => {
      if (!video) return;

      // Ensure muted state
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;

      try {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
      } catch {
        // Autoplay blocked — no play/pause overlay.
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      playVideo(desktopRef.current);
      if (mobileSrc) {
        playVideo(mobileRef.current);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [mobileSrc]);

  const videoClassName = `absolute inset-0 w-full h-full object-cover ${className}`;

  // Add #t=0.001 to show first frame on iOS instead of black screen
  const desktopSrc = `${src}#t=0.001`;
  const mobileSrcWithTime = mobileSrc ? `${mobileSrc}#t=0.001` : undefined;

  return (
    <>
      {mobileSrc ? (
        <>
          <video
            ref={desktopRef}
            className={`hidden md:block ${videoClassName}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
            src={desktopSrc}
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
          />
          <video
            ref={mobileRef}
            className={`md:hidden ${videoClassName}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
            src={mobileSrcWithTime}
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
          />
        </>
      ) : (
        <video
          ref={desktopRef}
          className={videoClassName}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          src={desktopSrc}
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
        />
      )}
    </>
  );
}
