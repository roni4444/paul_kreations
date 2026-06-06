"use client";

// app/global-error.tsx
// Rendered when an unrecoverable error breaks the entire app (replaces root layout).
// Must include its own <html> and <body> tags — next/font and layout CSS vars
// are not available here, so fonts are loaded via Google Fonts link.

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import Link from "next/link";
import { Home, RefreshCw } from "lucide-react";

// Import Tailwind base styles — utility classes will still work
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Something went wrong — Paul Kreations</title>
        {/* Fonts: loaded directly since next/font is unavailable in global-error */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;600;700;900&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>

      <body
        suppressHydrationWarning
        style={{ margin: 0, background: "#f9f9ff", color: "#111c2d" }}
      >
        <div
          className="relative min-h-screen flex flex-col overflow-hidden"
          style={{ background: "#f9f9ff" }}
        >
          {/* ── Dot grid ─────────────────────────── */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(227,190,189,0.5) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* ── Crimson ambient glow ─────────────── */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(196,30,58,0.08) 0%, transparent 70%)",
            }}
          />

          {/* ── Radial fade ──────────────────────── */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, #f9f9ff 100%)",
            }}
          />

          {/* ── 500 watermark ────────────────────── */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
            style={{
              fontSize: "clamp(160px, 35vw, 360px)",
              fontWeight: 900,
              lineHeight: 1,
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(196,30,58,0.05)",
              fontFamily: "'Geist', sans-serif",
            }}
          >
            500
          </div>

          {/* ── Minimal header ───────────────────── */}
          <header
            className="relative z-10 border-b"
            style={{
              borderColor: "#e3bebd",
              background: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              className="max-w-[1280px] mx-auto px-10 flex items-center"
              style={{ height: "60px" }}
            >
              <Link
                href="/"
                className="flex items-center gap-2.5"
                aria-label="Paul Kreations home"
              >
                <div
                  className="size-8 flex items-center justify-center"
                  style={{
                    background: "#c41e3a",
                    borderRadius: "4px",
                  }}
                >
                  <span
                    style={{
                      color: "white",
                      fontWeight: 700,
                      fontSize: "13px",
                      letterSpacing: "-0.02em",
                      userSelect: "none",
                      fontFamily: "'Geist', sans-serif",
                    }}
                  >
                    PK
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'Geist', sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    letterSpacing: "-0.01em",
                    color: "#111c2d",
                  }}
                >
                  Paul Kreations
                </span>
              </Link>
            </div>
          </header>

          {/* ── Main content ─────────────────────── */}
          <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
            {/* Status label */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-8"
              style={{
                border: "1px solid #e3bebd",
                background: "white",
              }}
            >
              <span
                className="size-1.5"
                style={{ background: "#c41e3a" }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.05em",
                  color: "#5f5e5e",
                }}
              >
                ERROR 500 — SOMETHING WENT WRONG
              </span>
            </div>

            {/* Large 500 */}
            <div
              className="select-none mb-4"
              style={{
                fontSize: "clamp(4rem,18vw,11rem)",
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: "-0.04em",
                backgroundImage:
                  "linear-gradient(135deg, #9e0027 0%, #c41e3a 50%, #ff6b6b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "'Geist', sans-serif",
              }}
              aria-label="500 error"
            >
              500
            </div>

            {/* Heading */}
            <h1
              className="mb-3"
              style={{
                fontFamily: "'Geist', sans-serif",
                fontWeight: 700,
                fontSize: "1.5rem",
                letterSpacing: "-0.02em",
                color: "#111c2d",
              }}
            >
              Something went wrong
            </h1>

            {/* Description */}
            <p
              className="mb-10 max-w-sm"
              style={{
                fontSize: "0.875rem",
                lineHeight: 1.7,
                color: "#5f5e5e",
              }}
            >
              An unexpected error occurred. Our team has been notified
              automatically. You can try refreshing the page or go back to the
              homepage.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2"
                style={{
                  height: "40px",
                  padding: "0 20px",
                  background: "#c41e3a",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  fontFamily: "'Geist', sans-serif",
                  letterSpacing: "-0.01em",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#9e0027";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#c41e3a";
                }}
              >
                <RefreshCw size={14} aria-hidden="true" />
                Try Again
              </button>

              <Link
                href="/"
                className="inline-flex items-center gap-2"
                style={{
                  height: "40px",
                  padding: "0 20px",
                  background: "transparent",
                  color: "#c41e3a",
                  border: "1px solid #c41e3a",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  fontFamily: "'Geist', sans-serif",
                  letterSpacing: "-0.01em",
                  textDecoration: "none",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "#ffdad9";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "transparent";
                }}
              >
                <Home size={14} aria-hidden="true" />
                Go to Homepage
              </Link>
            </div>

            {/* Error digest for support */}
            {error.digest && (
              <p
                className="mt-10"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.05em",
                  color: "#8f6f6f",
                }}
              >
                Error ID: {error.digest}
              </p>
            )}
          </main>

          {/* ── Minimal footer ───────────────────── */}
          <footer
            className="relative z-10 border-t"
            style={{
              borderColor: "#e3bebd",
              background: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="max-w-[1280px] mx-auto px-10 py-4">
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.05em",
                  color: "#8f6f6f",
                }}
              >
                © {new Date().getFullYear()} Paul Kreations
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
