"use client";

// components/blog/share-buttons.tsx
// Share a post: the device's own share sheet where supported (phones), plus
// direct links to the common networks and a copy-link button.

import { useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";
const BTN =
  "inline-flex h-9 items-center gap-2 rounded-[4px] border border-[#e3bebd] px-3 text-sm text-[#5f5e5e] transition-colors hover:border-[#c41e3a] hover:text-[#c41e3a]";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const targets = [
    { name: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
    { name: "X", href: `https://twitter.com/intent/tweet?text=${t}&url=${u}` },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    },
    { name: "Telegram", href: `https://t.me/share/url?url=${u}&text=${t}` },
  ];

  async function nativeShare() {
    try {
      await navigator.share({ title, url });
    } catch {
      // Dismissed by the user — nothing to do.
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }

  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      <span className={`${MONO} mr-1 text-[11px] text-[#8f6f6f] uppercase`}>
        Share
      </span>
      {canNativeShare && (
        <button type="button" onClick={nativeShare} className={BTN}>
          <Share2 className="h-4 w-4" aria-hidden />
          Share
        </button>
      )}
      {targets.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${s.name}`}
          className={BTN}
        >
          {s.name}
        </a>
      ))}
      <button type="button" onClick={copyLink} className={BTN}>
        {copied ? (
          <Check className="h-4 w-4" aria-hidden />
        ) : (
          <Link2 className="h-4 w-4" aria-hidden />
        )}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
