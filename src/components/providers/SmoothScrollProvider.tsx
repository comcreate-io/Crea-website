"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle anchor link clicks for smooth scrolling
    // Handles both "#section" and "/#section" hrefs. The "/#" form only
    // scrolls when we are already on the homepage; from any other route the
    // browser navigates to "/" and the native hash scroll takes over.
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"], a[href^="/#"]');
      if (!anchor) return;
      const raw = anchor.getAttribute("href") ?? "";
      const hash = raw.startsWith("/#") ? raw.slice(1) : raw;
      if (hash === "#" || hash.length < 2) return;
      if (raw.startsWith("/#") && window.location.pathname !== "/") return;
      const targetEl = document.querySelector(hash);
      if (targetEl) {
        e.preventDefault();
        lenis.scrollTo(targetEl as HTMLElement, {
          offset: -80, // Account for fixed header
        });
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return <>{children}</>;
}
