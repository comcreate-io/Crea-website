"use client";

import { useEffect, useRef, useState } from "react";

type MutedAutoplayVideoProps = {
  src: string;
  poster?: string;
  /** Wrapper classes. Video/still always fill this box. */
  className?: string;
  fit?: "cover" | "contain";
  preload?: "none" | "metadata" | "auto";
  "aria-label"?: string;
};

/**
 * Muted looping video with no play/pause chrome.
 * iOS Safari paints a start-playback overlay on any paused, visible <video>.
 * Keep the video invisible until `playing`, and cover it with a still until then.
 * If autoplay is blocked, the still stays — never a play button.
 */
export function MutedAutoplayVideo({
  src,
  poster,
  className = "",
  fit = "cover",
  preload = "auto",
  "aria-label": ariaLabel,
}: MutedAutoplayVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const fitClass = fit === "contain" ? "object-contain" : "object-cover";

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.controls = false;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("x-webkit-airplay", "deny");

    const tryPlay = () => {
      video.play().catch(() => {
        // Autoplay blocked — leave the still up. Never show a play button.
      });
    };

    tryPlay();

    // iOS often unlocks muted autoplay only after a user gesture. Retry
    // silently — do not paint a play control.
    const onGesture = () => tryPlay();
    window.addEventListener("touchstart", onGesture, { passive: true });
    window.addEventListener("pointerdown", onGesture, { passive: true });

    const onPlaying = () => setPlaying(true);
    video.addEventListener("playing", onPlaying);
    return () => {
      video.removeEventListener("playing", onPlaying);
      window.removeEventListener("touchstart", onGesture);
      window.removeEventListener("pointerdown", onGesture);
    };
  }, [src]);

  const stillClass = `pointer-events-none absolute inset-0 h-full w-full ${fitClass}`;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" aria-hidden className={stillClass} />
      ) : (
        <div className="pointer-events-none absolute inset-0 bg-[#1C1917]" aria-hidden />
      )}
      <video
        ref={ref}
        src={src}
        poster={poster}
        className={`pointer-events-none absolute inset-0 h-full w-full ${fitClass} ${
          playing ? "opacity-100" : "opacity-0 invisible"
        }`}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        preload={preload}
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
        aria-label={ariaLabel}
        onPlaying={() => setPlaying(true)}
      />
      {/* Cover the video (and any iOS overlay) until playback actually starts. */}
      {!playing ? (
        poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt="" aria-hidden className={`z-10 ${stillClass}`} />
        ) : (
          <div className="pointer-events-none absolute inset-0 z-10 bg-[#1C1917]" aria-hidden />
        )
      ) : null}
    </div>
  );
}
