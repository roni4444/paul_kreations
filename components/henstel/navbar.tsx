"use client";

// components/henstel/navbar.tsx
// Standalone nav for /henstel — its own palette and typography, distinct from
// the parent site's crimson system (scoped override, see app/henstel/layout.tsx).

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

const HEADING = "font-[family-name:var(--font-henstel-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export function HenstelNavbar({
  showScreens = true,
}: {
  showScreens?: boolean;
}) {
  const navLinks = showScreens
    ? NAV_LINKS
    : NAV_LINKS.filter((l) => l.href !== "#screens");
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
          ? "bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E6DCC6] shadow-[0px_4px_20px_rgba(46,107,63,0.10)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 h-[64px] flex items-center justify-between gap-6">
        {/* ── Logo ─────────────────────────────── */}
        <Link
          href="/henstel"
          className="flex items-center gap-2.5 flex-shrink-0"
          aria-label="Henstel home"
        >
          <Image
            src="/apps/henstel/icon.png"
            alt="Henstel"
            width={32}
            height={32}
            priority
            className="rounded-[8px]"
          />
          <span
            className={`${HEADING} font-semibold text-[#3B2A18] tracking-[-0.01em] text-[15px]`}
          >
            Henstel
          </span>
        </Link>

        {/* ── Desktop Nav ──────────────────────── */}
        <nav
          className="hidden md:flex items-center gap-0.5"
          aria-label="Henstel navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm text-[#5C4A36] hover:text-[#3B2A18] hover:bg-[#E6F0E4] rounded transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
          <span
            className={cn(
              MONO,
              "ml-2 text-[10px] text-[#8A7A60] uppercase pl-3 border-l border-[#E6DCC6]",
            )}
          >
            by Paul Kreations
          </span>
        </nav>

        {/* ── Desktop CTA ──────────────────────── */}
        <div className="hidden md:flex items-center flex-shrink-0">
          <a
            href="#download"
            className="inline-flex items-center gap-2 h-9 px-4 rounded bg-[#2E6B3F] hover:bg-[#1F4D2C] text-[#FFFFFF] text-xs font-semibold transition-colors"
          >
            Download
          </a>
        </div>

        {/* ── Mobile Toggle ────────────────────── */}
        <button
          className="md:hidden size-9 flex items-center justify-center rounded hover:bg-[#E6F0E4] transition-colors text-[#5C4A36]"
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
          "md:hidden overflow-hidden transition-all duration-200 border-b border-[#E6DCC6] bg-[#FFFFFF]/98 backdrop-blur-md",
          mobileOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0",
        )}
        aria-hidden={!mobileOpen}
      >
        <nav
          className="px-6 py-4 flex flex-col gap-1"
          aria-label="Mobile Henstel navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-sm text-[#5C4A36] hover:text-[#3B2A18] hover:bg-[#E6F0E4] rounded transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#download"
            onClick={() => setMobileOpen(false)}
            className="mt-2 flex items-center justify-center px-3 py-2.5 text-sm font-semibold text-[#FFFFFF] bg-[#2E6B3F] rounded"
          >
            Download
          </a>
        </nav>
      </div>
    </header>
  );
}
