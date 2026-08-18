"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { GA_MEASUREMENT_ID, pageview } from "@/lib/analytics";

// GA4 via gtag, gated on NEXT_PUBLIC_GA_MEASUREMENT_ID (Production only in
// Vercel). Renders nothing when the env var is unset, so preview and dev
// deploys emit no tag. Consent Mode v2 defaults are declared before config.
// send_page_view is false and page_view is sent manually here so App Router
// client navigations are counted once each (the initial load included).
export function GoogleAnalytics() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !pathname) return;
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    pageview(pathname);
  }, [pathname]);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        id="ga4-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'granted',
            wait_for_update: 0
          });
          gtag('config', '${GA_MEASUREMENT_ID}', {
            send_page_view: false,
            allow_google_signals: false,
            allow_ad_personalization_signals: false
          });
        `}
      </Script>
    </>
  );
}
