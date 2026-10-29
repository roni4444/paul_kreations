"use client";

// components/ads/ad-slot.tsx
// One Google AdSense ad unit, labelled "Advertisement". The ad is requested
// only when the slot is about to scroll into view (saves bandwidth and keeps
// pages fast), and a slot Google cannot fill collapses away entirely.
// Renders nothing unless ads are enabled (lib/ads.ts).

import { useEffect, useRef } from "react";
import {
  adsEnabled,
  ADSENSE_CLIENT,
  ADSENSE_SLOT_DISPLAY,
  ADSENSE_SLOT_IN_ARTICLE,
} from "@/lib/ads";

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSlotProps {
  /** "in-article" sits between sections of text; "display" closes the post. */
  variant: "in-article" | "display";
}

export function AdSlot({ variant }: AdSlotProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const requestedRef = useRef(false);

  useEffect(() => {
    if (!adsEnabled) return;
    const node = wrapperRef.current;
    if (!node) return;

    const request = () => {
      if (requestedRef.current) return;
      requestedRef.current = true;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        // An ad failing must never break the page.
        console.warn("[AdSlot] adsbygoogle.push failed", err);
      }
    };

    if (typeof IntersectionObserver === "undefined") {
      request();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          request();
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (!adsEnabled) return null;

  const isInArticle = variant === "in-article";

  return (
    <aside
      aria-label="Advertisement"
      className="my-10 has-[ins[data-ad-status=unfilled]]:hidden"
    >
      <p
        className={`${MONO} mb-1 text-center text-[10px] text-[#8f6f6f] uppercase`}
      >
        Advertisement
      </p>
      <div
        ref={wrapperRef}
        className="min-h-[120px] overflow-hidden rounded-[4px] border border-[#e3bebd]/60 bg-[#fff5f5]/40"
      >
        <ins
          className="adsbygoogle block text-center"
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={
            isInArticle ? ADSENSE_SLOT_IN_ARTICLE : ADSENSE_SLOT_DISPLAY
          }
          {...(isInArticle
            ? { "data-ad-layout": "in-article", "data-ad-format": "fluid" }
            : {
                "data-ad-format": "auto",
                "data-full-width-responsive": "true",
              })}
        />
      </div>
    </aside>
  );
}
