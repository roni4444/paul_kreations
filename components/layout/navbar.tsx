"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const NAV_LINKS = [
  { href: "#products", label: "Products" },
  { href: "#services", label: "Services" },
  { href: "#team", label: "Team" },
  { href: "#roadmap", label: "What's Next" },
];

// ─── HOW TO USE YOUR LOGO ──────────────────────────────────────────────────────
//
// 1. Put your logo file inside the /public folder of your project.
//    Example: /public/logo.png  or  /public/logo.svg
//
// 2. Add this import at the top of this file:
//    import Image from "next/image"
//
// 3. Replace the LogoMark function below with ONE of these options:
//
//    OPTION A — Square icon (logo replaces the PK block, ~32×32 px):
//    ┌──────────────────────────────────────────────────────────┐
//    │ function LogoMark() {                                    │
//    │   return (                                               │
//    │     <Image                                               │
//    │       src="/logo.png"   // ← your filename              │
//    │       alt="Paul Kreations"                               │
//    │       width={32}                                         │
//    │       height={32}                                        │
//    │       priority                                           │
//    │     />                                                   │
//    │   );                                                     │
//    │ }                                                        │
//    └──────────────────────────────────────────────────────────┘
//
//    OPTION B — Wide/horizontal logo (already contains company name, ~140×32 px):
//    ┌──────────────────────────────────────────────────────────┐
//    │ function LogoMark() {                                    │
//    │   return (                                               │
//    │     <Image                                               │
//    │       src="/logo.png"   // ← your filename              │
//    │       alt="Paul Kreations"                               │
//    │       width={140}       // ← adjust to your logo width  │
//    │       height={32}                                        │
//    │       priority                                           │
//    │     />                                                   │
//    │   );                                                     │
//    │ }                                                        │
//    └──────────────────────────────────────────────────────────┘
//    Then ALSO delete the <span>Paul Kreations</span> text below
//    since your logo image already contains the company name.
//
// ──────────────────────────────────────────────────────────────────────────────
function LogoMark() {
  return (
    <Image
      src="/logo_extended.svg"
      alt="Paul Kreations"
      width={140}
      height={32}
      priority
    />
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-200",
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#e3bebd] shadow-[0px_4px_20px_rgba(196,30,58,0.06)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-[1280px] px-10 h-[60px] flex items-center justify-between gap-6">
        {/* ── Logo ─────────────────────────────── */}
        <Link
          href="/"
          className="flex items-center gap-2.5 flex-shrink-0"
          aria-label="Paul Kreations home"
        >
          <LogoMark />
          {/* Delete this <span> if your logo image already contains "Paul Kreations" */}
          {/*<span className="font-semibold text-[#111c2d] tracking-[-0.01em] text-sm">*/}
          {/*  Paul Kreations*/}
          {/*</span>*/}
        </Link>

        {/* ── Desktop Nav ──────────────────────── */}
        <nav
          className="hidden md:flex items-center gap-0.5"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm text-[#5f5e5e] hover:text-[#111c2d] hover:bg-[#ffdad9] rounded transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* ── Desktop CTA ──────────────────────── */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <a
            href="https://play.google.com/store/apps/developer?id=Paul+Kreations"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-8 px-4 rounded bg-[#c41e3a] hover:bg-[#9e0027] text-white text-xs font-semibold transition-colors"
            aria-label="Paul Kreations on Google Play Store"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-3.5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M3.18 23.76c.34.19.72.24 1.09.14l.1-.05 11.2-6.47-2.44-2.44-9.95 8.82zm-.9-20.4A1.84 1.84 0 0 0 2 4.65v14.7c0 .52.17.96.28 1.29l.12-.07 9.8-8.67-9.92-8.54zm20.04 8.27-2.8-1.6-2.75 2.44 2.75 2.75 2.81-1.63a1.85 1.85 0 0 0 0-3.27l-.01.31zM4.27.1C3.9 0 3.52.04 3.18.23l9.92 8.8 2.44-2.44L4.35.14 4.27.1z" />
            </svg>
            Google Play
          </a>
        </div>

        {/* ── Mobile Toggle ────────────────────── */}
        <button
          className="md:hidden size-9 flex items-center justify-center rounded hover:bg-[#ffdad9] transition-colors text-[#5f5e5e]"
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
          "md:hidden overflow-hidden transition-all duration-200 border-b border-[#e3bebd] bg-white/98 backdrop-blur-md",
          mobileOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0",
        )}
        aria-hidden={!mobileOpen}
      >
        <nav
          className="px-6 py-4 flex flex-col gap-1"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-sm text-[#5f5e5e] hover:text-[#111c2d] hover:bg-[#ffdad9] rounded transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://play.google.com/store/apps/developer?id=Paul+Kreations"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center px-3 py-2.5 text-sm font-semibold text-white bg-[#c41e3a] rounded"
          >
            Google Play Store
          </a>
        </nav>
      </div>
    </header>
  );
}
