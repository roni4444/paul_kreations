// components/ads/adsense-script.tsx
// Loads Google's ad library — only on pages that actually render ads, and
// only after the page is interactive. Uses next/script (built in, no new
// dependency). Renders nothing unless ads are enabled (lib/ads.ts).

import Script from "next/script";
import { adsEnabled, ADSENSE_CLIENT } from "@/lib/ads";

export function AdSenseScript() {
  if (!adsEnabled) return null;

  return (
    <Script
      id="adsense-library"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
    />
  );
}
