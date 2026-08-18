// Thin, safe wrapper around gtag. Never throws, no-ops on the server,
// when NEXT_PUBLIC_GA_MEASUREMENT_ID is unset (preview and dev deploys),
// and when GA is not loaded (ad blockers).

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

export type AnalyticsEvent =
  | "contact_form_submit"
  | "contact_form_error"
  | "request_access_click"
  | "phone_click"
  | "email_click"
  | "instagram_click"
  | "section_view"
  | "investors_scroll";

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

function gtagReady(): boolean {
  return (
    Boolean(GA_MEASUREMENT_ID) &&
    typeof window !== "undefined" &&
    typeof window.gtag === "function"
  );
}

export function track(name: AnalyticsEvent, params: AnalyticsParams = {}): void {
  if (!gtagReady()) return;
  try {
    window.gtag?.("event", name, params);
  } catch {
    // analytics must never break the UI
  }
}

export function pageview(path: string): void {
  if (!gtagReady()) return;
  try {
    window.gtag?.("event", "page_view", {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  } catch {
    // analytics must never break the UI
  }
}

// Consent Mode v2 hooks. Only needed if a cookie banner is added later.
export function grantAnalyticsConsent(): void {
  if (!gtagReady()) return;
  try {
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
  } catch {
    // ignore
  }
}

export function denyAnalyticsConsent(): void {
  if (!gtagReady()) return;
  try {
    window.gtag?.("consent", "update", { analytics_storage: "denied" });
  } catch {
    // ignore
  }
}
