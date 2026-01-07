"use client";

import { useEffect, useRef, useState } from "react";

interface BackgroundVideoProps {
  src: string;
  mobileSrc?: string;
  poster?: string;
  className?: string;
}

export function BackgroundVideo({ src, mobileSrc, poster, className = "" }: BackgroundVideoProps) {
  const desktopRef = useRef<HTMLVideoElement>(null);
  const mobileRef = useRef<HTMLVideoElement>(null);
  const [showPlayButton, setShowPlayButton] = useState(false);

  useEffect(() => {
    const playVideo = async (video: HTMLVideoElement | null) => {
      if (!video) return;

      // Ensure muted state
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;

      // Try to play
      try {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
      } catch {
        // Autoplay blocked - show play button for user interaction
        setShowPlayButton(true);
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

  const handlePlayClick = () => {
    const playAll = async () => {
      const videos = [desktopRef.current, mobileRef.current].filter(Boolean);
      for (const video of videos) {
        if (video) {
          video.muted = true;
          try {
            await video.play();
          } catch {
            // Still blocked
          }
        }
      }
      setShowPlayButton(false);
    };
    playAll();
  };

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
        />
      )}

      {/* Fallback play button for iOS when autoplay is blocked */}
      {showPlayButton && (
        <button
          onClick={handlePlayClick}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 cursor-pointer"
          aria-label="Play video"
        >
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}
    </>
  );
}
