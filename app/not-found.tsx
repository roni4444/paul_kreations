// app/not-found.tsx
// Shown for any URL that doesn't match a route, and when notFound() is called
// (e.g. /apps/invalid-slug/privacy).

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#f9f9ff] overflow-hidden">
      {/* ── Dot grid background ─────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, #e3bebd 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Crimson ambient glow ────────────────── */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(196,30,58,0.07) 0%, transparent 70%)",
        }}
      />

      {/* ── Radial fade ─────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, #f9f9ff 100%)",
        }}
      />

      {/* ── Decorative oversized 404 watermark ──── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        style={{
          fontSize: "clamp(200px, 40vw, 400px)",
          fontWeight: 900,
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(196,30,58,0.05)",
          fontFamily: "var(--font-geist-sans, sans-serif)",
        }}
      >
        404
      </div>

      {/* ── Minimal header ──────────────────────── */}
      <header className="relative z-10 border-b border-[#e3bebd] bg-white/80 backdrop-blur-sm">
        <div className="max-w-[1280px] mx-auto px-10 h-[60px] flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label="Paul Kreations home"
          >
            <div className="size-8 rounded flex items-center justify-center bg-[#c41e3a]">
              <span className="text-white font-bold text-[13px] tracking-tight select-none">
                PK
              </span>
            </div>
            <span className="font-semibold text-[#111c2d] tracking-[-0.01em] text-sm">
              Paul Kreations
            </span>
          </Link>
        </div>
      </header>

      {/* ── Main content ────────────────────────── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        {/* Status label */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 border border-[#e3bebd] bg-white">
          <span className="size-1.5 bg-[#c41e3a]" aria-hidden="true" />
          <span className={`${MONO} text-[11px] text-[#5f5e5e]`}>
            ERROR 404 — PAGE NOT FOUND
          </span>
        </div>

        {/* Large 404 */}
        <div
          className="text-[clamp(5rem,20vw,12rem)] font-bold leading-none tracking-[-0.04em] mb-4 select-none"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #9e0027 0%, #c41e3a 50%, #ff6b6b 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          aria-label="404"
        >
          404
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-[#111c2d] mb-3">
          This page doesn&apos;t exist
        </h1>

        {/* Description */}
        <p className="font-[family-name:var(--font-sans)] text-[#5f5e5e] text-sm leading-relaxed max-w-sm mb-10">
          The URL you visited couldn&apos;t be found. It may have been moved,
          deleted, or you may have typed it incorrectly.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-10 px-5 bg-[#c41e3a] hover:bg-[#9e0027] text-white text-sm font-semibold transition-colors"
          >
            <Home size={14} aria-hidden="true" />
            Back to Home
          </Link>
          <Link
            href="/#products"
            className="inline-flex items-center gap-2 h-10 px-5 border border-[#c41e3a] text-[#c41e3a] bg-transparent hover:bg-[#ffdad9] text-sm font-semibold transition-colors"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            View Our Apps
          </Link>
        </div>

        {/* Help text */}
        <p className={`${MONO} text-[10px] text-[#8f6f6f] mt-10`}>
          Looking for an app privacy policy?{" "}
          <Link href="/#products" className="text-[#c41e3a] hover:underline">
            Find it in the Products section
          </Link>
        </p>
      </main>

      {/* ── Minimal footer ──────────────────────── */}
      <footer className="relative z-10 border-t border-[#e3bebd] bg-white/80 backdrop-blur-sm">
        <div className="max-w-[1280px] mx-auto px-10 py-4">
          <span className={`${MONO} text-[10px] text-[#8f6f6f]`}>
            © {new Date().getFullYear()} Paul Kreations
          </span>
        </div>
      </footer>
    </div>
  );
}
