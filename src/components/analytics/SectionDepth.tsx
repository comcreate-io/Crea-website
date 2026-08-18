"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { GA_MEASUREMENT_ID, track } from "@/lib/analytics";

// Single-page site: page_view alone says nothing. Fires section_view once per
// homepage section as it enters the viewport (30 percent visible) and
// investors_scroll at 25/50/75/100 percent through #investment. Uses
// IntersectionObserver, so Lenis smooth scrolling does not affect it.
// Unknown ids are skipped, so this is safe on routes without the sections.

const SECTION_IDS = [
  "hero",
  "about",
  "services",
  "acquisitions",
  "investment",
  "developments",
  "projects",
  "team",
  "contact",
  "location",
];

export function SectionDepth({
  investorsSectionId = "investment",
}: {
  investorsSectionId?: string;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    // 1. section_view once per section
    const seen = new Set<string>();
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).id;
          if (e.isIntersecting && !seen.has(id)) {
            seen.add(id);
            track("section_view", { section_id: id });
          }
        }
      },
      { threshold: 0.3 }
    );
    let observedAny = false;
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        sectionObserver.observe(el);
        observedAny = true;
      }
    });

    // 2. investors_scroll depth: 1px sentinels at 25/50/75/100 percent
    const investors = document.getElementById(investorsSectionId);
    const sentinels: HTMLElement[] = [];
    let depthObserver: IntersectionObserver | undefined;
    if (investors) {
      const fired = new Set<number>();
      depthObserver = new IntersectionObserver((entries) => {
        for (const e of entries) {
          const pct = Number((e.target as HTMLElement).dataset.pct);
          if (e.isIntersecting && !fired.has(pct)) {
            fired.add(pct);
            track("investors_scroll", { percent: pct, section_id: investorsSectionId });
          }
        }
      });
      if (getComputedStyle(investors).position === "static") {
        investors.style.position = "relative";
      }
      [25, 50, 75, 100].forEach((pct) => {
        const s = document.createElement("span");
        s.dataset.pct = String(pct);
        s.setAttribute("aria-hidden", "true");
        s.style.cssText = `position:absolute;left:0;width:1px;height:1px;pointer-events:none;top:${
          pct === 100 ? "calc(100% - 1px)" : pct + "%"
        }`;
        investors.appendChild(s);
        sentinels.push(s);
        depthObserver?.observe(s);
      });
    }

    if (!observedAny && !investors) {
      sectionObserver.disconnect();
      return;
    }

    return () => {
      sectionObserver.disconnect();
      depthObserver?.disconnect();
      sentinels.forEach((s) => s.remove());
    };
  }, [pathname, investorsSectionId]);

  return null;
}
