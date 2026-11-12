import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  HENSTEL_DOWNLOADS,
  HENSTEL_HERO_NOTE,
  HENSTEL_SUBTAGLINE,
  HENSTEL_TAGLINE,
} from "@/lib/data/henstel";

const HEADING = "font-[family-name:var(--font-henstel-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export function HenstelHero() {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center overflow-hidden bg-[#FBF6EC] pt-32 pb-20 md:pt-40 md:pb-28"
    >
      {/* ── Dot grid background ─────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, #E6DCC6 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(46,107,63,0.10) 0%, rgba(232,137,43,0.07) 55%, transparent 75%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 25%, #FBF6EC 100%)",
        }}
      />

      {/* ── Signature element ─────────────────────────────────────────── */}
      <svg
        aria-hidden="true"
        className="absolute right-[-30px] top-[16%] w-[300px] h-[300px] opacity-[0.16] hidden lg:block pointer-events-none"
        viewBox="0 0 200 200"
        fill="none"
      >
        <g stroke="#2E6B3F" strokeWidth="6" strokeLinecap="round" fill="none">
          <path d="M60 150 C40 120 80 100 60 70 C50 55 65 40 60 25" />
          <path d="M100 150 C80 120 120 100 100 70 C90 55 105 40 100 25" />
          <path d="M140 150 C120 120 160 100 140 70 C130 55 145 40 140 25" />
        </g>
        <path d="M30 165 H170 L160 190 H40 Z" fill="#654321" />
      </svg>

      <div className="relative z-10 max-w-[900px] w-full mx-auto px-6 md:px-10 text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 border border-[#E6DCC6] bg-[#FFFFFF]">
          <span className="size-1.5 rounded-full bg-[#2E6B3F] animate-pulse" />
          <span className={`${MONO} text-[11px] text-[#5C4A36]`}>
            Now available on Google Play
            {HENSTEL_DOWNLOADS ? ` · ${HENSTEL_DOWNLOADS} downloads` : ""}
          </span>
        </div>

        {/* App icon */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/apps/henstel/icon.png"
            alt="Henstel app icon"
            width={88}
            height={88}
            priority
            className="rounded-[20px] shadow-[0px_6px_24px_rgba(46,107,63,0.10)]"
          />
        </div>

        {/* Headline */}
        <h1
          className={`${HEADING} text-[clamp(2.2rem,6vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#3B2A18] mb-5`}
        >
          {HENSTEL_TAGLINE}
        </h1>

        {/* Subheading */}
        <p className="max-w-[560px] mx-auto text-[1.0625rem] text-[#5C4A36] leading-[1.7] mb-10">
          {HENSTEL_SUBTAGLINE}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#download"
            className="inline-flex items-center gap-2 h-11 px-6 rounded bg-[#2E6B3F] hover:bg-[#1F4D2C] text-[#FFFFFF] text-sm font-semibold transition-colors"
          >
            Download Now
            <ArrowRight size={15} />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 h-11 px-6 rounded border border-[#2E6B3F] text-[#2E6B3F] bg-transparent hover:bg-[#E6F0E4] text-sm font-semibold transition-colors"
          >
            <Sparkles size={15} />
            See What&apos;s Inside
          </a>
        </div>

        <p className={`${MONO} mt-6 text-[10px] text-[#8A7A60] uppercase`}>
          {HENSTEL_HERO_NOTE}
        </p>
      </div>
    </section>
  );
}
