"use client";

// components/wimm/navbar.tsx
// Standalone nav for /wimm — its own green/blue/gold brand palette and
// Poppins/Open Sans typography, distinct from the parent site's crimson
// Kinetic Precision system (scoped override, see app/wimm/layout.tsx).

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { WIMM_IS_LIVE } from "@/lib/data/wimm";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#faq", label: "FAQ" },
];

const HEADING = "font-[family-name:var(--font-wimm-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export function WimmNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-200",
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#D8E8E0] shadow-[0px_4px_20px_rgba(15,122,78,0.08)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 h-[64px] flex items-center justify-between gap-6">
        {/* ── Logo ─────────────────────────────── */}
        <Link
          href="/wimm"
          className="flex items-center gap-2.5 flex-shrink-0"
          aria-label="Where Is My Money? home"
        >
          <Image
            src="/wimm/icon.png"
            alt="Where Is My Money?"
            width={32}
            height={32}
            priority
            className="rounded-full"
          />
          <span
            className={`${HEADING} font-semibold text-[#0E2A20] tracking-[-0.01em] text-[15px]`}
          >
            Where Is My Money?
          </span>
        </Link>

        {/* ── Desktop Nav ──────────────────────── */}
        <nav
          className="hidden md:flex items-center gap-0.5"
          aria-label="Where Is My Money? navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm text-[#4A5A52] hover:text-[#0E2A20] hover:bg-[#E3F3EA] rounded transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
          <span
            className={cn(
              MONO,
              "ml-2 text-[10px] text-[#7C9187] uppercase pl-3 border-l border-[#D8E8E0]",
            )}
          >
            by Paul Kreations
          </span>
        </nav>

        {/* ── Desktop CTA ──────────────────────── */}
        <div className="hidden md:flex items-center flex-shrink-0">
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 h-9 px-4 rounded bg-[#0F7A4E] hover:bg-[#0A5C3A] text-white text-xs font-semibold transition-colors"
          >
            {WIMM_IS_LIVE ? "Download Now" : "Get Early Access"}
          </a>
        </div>

        {/* ── Mobile Toggle ────────────────────── */}
        <button
          className="md:hidden size-9 flex items-center justify-center rounded hover:bg-[#E3F3EA] transition-colors text-[#4A5A52]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* ── Mobile Menu ──────────────────────────── */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-200 border-b border-[#D8E8E0] bg-white/98 backdrop-blur-md",
          mobileOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0",
        )}
        aria-hidden={!mobileOpen}
      >
        <nav
          className="px-6 py-4 flex flex-col gap-1"
          aria-label="Mobile Where Is My Money? navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-sm text-[#4A5A52] hover:text-[#0E2A20] hover:bg-[#E3F3EA] rounded transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#waitlist"
            onClick={() => setMobileOpen(false)}
            className="mt-2 flex items-center justify-center px-3 py-2.5 text-sm font-semibold text-white bg-[#0F7A4E] rounded"
          >
            {WIMM_IS_LIVE ? "Download Now" : "Get Early Access"}
          </a>
        </nav>
      </div>
    </header>
  );
}
