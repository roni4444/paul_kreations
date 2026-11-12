"use client";

// components/surround-it/navbar.tsx
// Standalone nav for /surround-it — its own palette and typography, distinct from
// the parent site's crimson system (scoped override, see app/surround-it/layout.tsx).

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#screens", label: "Screens" },
  { href: "#faq", label: "FAQ" },
];

const HEADING = "font-[family-name:var(--font-surround-it-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export function SurroundItNavbar() {
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
          ? "bg-[#14221E]/95 backdrop-blur-md border-b border-[#263A32] shadow-[0px_4px_20px_rgba(0,0,0,0.35)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 h-[64px] flex items-center justify-between gap-6">
        {/* ── Logo ─────────────────────────────── */}
        <Link
          href="/surround-it"
          className="flex items-center gap-2.5 flex-shrink-0"
          aria-label="Surround It home"
        >
          <Image
            src="/apps/surround-it/icon.png"
            alt="Surround It"
            width={32}
            height={32}
            priority
            className="rounded-[8px]"
          />
          <span
            className={`${HEADING} font-semibold text-[#F4EEDA] tracking-[-0.01em] text-[15px]`}
          >
            Surround It
          </span>
        </Link>

        {/* ── Desktop Nav ──────────────────────── */}
        <nav
          className="hidden md:flex items-center gap-0.5"
          aria-label="Surround It navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm text-[#C9C3AE] hover:text-[#F4EEDA] hover:bg-[#1B2E27] rounded transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
          <span
            className={cn(
              MONO,
              "ml-2 text-[10px] text-[#8C9A90] uppercase pl-3 border-l border-[#263A32]",
            )}
          >
            by Paul Kreations
          </span>
        </nav>

        {/* ── Desktop CTA ──────────────────────── */}
        <div className="hidden md:flex items-center flex-shrink-0">
          <a
            href="#download"
            className="inline-flex items-center gap-2 h-9 px-4 rounded bg-[#D4AF37] hover:bg-[#F2CA50] text-[#081612] text-xs font-semibold transition-colors"
          >
            Download
          </a>
        </div>

        {/* ── Mobile Toggle ────────────────────── */}
        <button
          className="md:hidden size-9 flex items-center justify-center rounded hover:bg-[#1B2E27] transition-colors text-[#C9C3AE]"
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
          "md:hidden overflow-hidden transition-all duration-200 border-b border-[#263A32] bg-[#14221E]/98 backdrop-blur-md",
          mobileOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0",
        )}
        aria-hidden={!mobileOpen}
      >
        <nav
          className="px-6 py-4 flex flex-col gap-1"
          aria-label="Mobile Surround It navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-sm text-[#C9C3AE] hover:text-[#F4EEDA] hover:bg-[#1B2E27] rounded transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#download"
            onClick={() => setMobileOpen(false)}
            className="mt-2 flex items-center justify-center px-3 py-2.5 text-sm font-semibold text-[#081612] bg-[#D4AF37] rounded"
          >
            Download
          </a>
        </nav>
      </div>
    </header>
  );
}
