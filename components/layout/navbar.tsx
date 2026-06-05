"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#products", label: "Products" },
  { href: "#services", label: "Services" },
  { href: "#team", label: "Team" },
  { href: "#roadmap", label: "What's Next" },
];

// Replace the PK monogram below with your actual logo image:
// import Image from "next/image"
// <Image src="/logo.png" alt="Paul Kreations" width={32} height={32} />
function LogoMark() {
  return (
    <div className="size-8 rounded-lg bg-[#3c52c0] flex items-center justify-center shadow-sm shadow-[#3c52c0]/30">
      <span className="text-white font-bold text-[13px] tracking-tight select-none">
        PK
      </span>
    </div>
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

  // Close mobile menu on resize to desktop
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
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-[#e2e2e4] shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-[1280px] px-6 h-[60px] flex items-center justify-between gap-6">
        {/* ── Logo ───────────────────────────── */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group flex-shrink-0"
          aria-label="Paul Kreations home"
        >
          <LogoMark />
          <span className="font-semibold text-[#1a1c1d] tracking-[-0.01em] text-sm">
            Paul Kreations
          </span>
        </Link>

        {/* ── Desktop Nav ────────────────────── */}
        <nav
          className="hidden md:flex items-center gap-0.5"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm text-[#444653] hover:text-[#1a1c1d] transition-colors rounded-md hover:bg-[#edeef0] font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* ── Desktop CTA ────────────────────── */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <Button
            asChild
            size="sm"
            className="h-8 px-4 bg-[#3c52c0] hover:bg-[#223aa9] text-white rounded-lg text-xs font-medium gap-2 transition-colors"
          >
            <a
              href="https://play.google.com/store/apps/developer?id=Paul+Kreations"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Google Play icon */}
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
          </Button>
        </div>

        {/* ── Mobile Toggle ──────────────────── */}
        <button
          className="md:hidden size-9 flex items-center justify-center rounded-md hover:bg-[#edeef0] transition-colors text-[#444653]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* ── Mobile Menu ────────────────────────── */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 border-b border-[#e2e2e4] bg-white/95 backdrop-blur-md",
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
              className="px-3 py-2.5 text-sm text-[#444653] hover:text-[#1a1c1d] hover:bg-[#edeef0] rounded-md transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://play.google.com/store/apps/developer?id=Paul+Kreations"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-[#3c52c0] bg-[#dee0ff] rounded-md"
          >
            Google Play Store
          </a>
        </nav>
      </div>
    </header>
  );
}
