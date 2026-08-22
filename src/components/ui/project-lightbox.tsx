"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";

export type LightboxMedia =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster: string };

interface ProjectLightboxProps {
  open: boolean;
  onClose: () => void;
  media: LightboxMedia[];
  initialIndex?: number;
  title: string;
  description?: string;
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d={direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
      />
    </svg>
  );
}

export function ProjectLightbox({
  open,
  onClose,
  media,
  initialIndex = 0,
  title,
  description,
}: ProjectLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [swipeStart, setSwipeStart] = useState<{ x: number; y: number } | null>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Reset to the requested slide each time the lightbox is opened.
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setIndex(initialIndex);
  }

  const next = useCallback(() => setIndex((i) => (i + 1) % media.length), [media.length]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + media.length) % media.length),
    [media.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, next, prev]);

  if (!mounted) return null;

  const current = media[index];

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm h-[100dvh] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} gallery`}
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl">{title}</h3>
              {description && (
                <p className="text-xs sm:text-sm text-white/60 mt-0.5">{description}</p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[11px] uppercase tracking-[2px] text-white/60 tabular-nums">
                {index + 1} / {media.length}
              </span>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                aria-label="Close gallery"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Stage */}
          <div
            className="relative flex-1 min-h-0 flex items-center justify-center px-2 sm:px-20 pb-4 select-none"
            style={{ touchAction: "pan-y" }}
            onPointerDown={(e) => setSwipeStart({ x: e.clientX, y: e.clientY })}
            onPointerUp={(e) => {
              if (!swipeStart) return;
              const dx = e.clientX - swipeStart.x;
              const dy = e.clientY - swipeStart.y;
              setSwipeStart(null);
              if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
                if (dx < 0) next();
                else prev();
              }
            }}
            onPointerCancel={() => setSwipeStart(null)}
          >
            {media.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                  aria-label="Previous"
                >
                  <ArrowIcon direction="left" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                  aria-label="Next"
                >
                  <ArrowIcon direction="right" />
                </button>
              </>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={current.src}
                className="relative w-full h-full flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
              >
                {current.type === "video" ? (
                  <video
                    src={current.src}
                    poster={current.poster}
                    className="max-h-full max-w-full rounded-lg shadow-2xl"
                    autoPlay
                    muted
                    loop
                    playsInline
                    disablePictureInPicture
                    disableRemotePlayback
                    controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={current.src}
                    alt={`${title} - ${index + 1}`}
                    className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
                    draggable={false}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Thumbnails */}
          {media.length > 1 && (
            <div
              className="w-full overflow-x-auto px-4 pb-4 sm:pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex gap-2 w-max mx-auto">
              {media.map((m, i) => (
                <button
                  key={m.src}
                  onClick={() => setIndex(i)}
                  className={`relative shrink-0 w-16 h-11 sm:w-20 sm:h-14 rounded overflow-hidden transition-all ${
                    i === index ? "ring-2 ring-[#C9A96E] opacity-100" : "opacity-50 hover:opacity-80"
                  }`}
                  aria-label={`Go to item ${i + 1}`}
                  ref={(el) => {
                    if (el && i === index) el.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.type === "video" ? m.poster : m.src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  {m.type === "video" && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
