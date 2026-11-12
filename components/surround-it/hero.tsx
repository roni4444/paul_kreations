import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  SURROUND_IT_DOWNLOADS,
  SURROUND_IT_HERO_NOTE,
  SURROUND_IT_SUBTAGLINE,
  SURROUND_IT_TAGLINE,
} from "@/lib/data/surround-it";

const HEADING = "font-[family-name:var(--font-surround-it-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export function SurroundItHero() {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center overflow-hidden bg-[#081612] pt-32 pb-20 md:pt-40 md:pb-28"
    >
      {/* ── Dot grid background ─────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, #263A32 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(212,175,55,0.10) 0%, rgba(178,60,54,0.08) 55%, transparent 75%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 25%, #081612 100%)",
        }}
      />

      {/* ── Signature element ─────────────────────────────────────────── */}
      <svg
        aria-hidden="true"
        className="absolute right-[-30px] top-[16%] w-[300px] h-[300px] opacity-[0.16] hidden lg:block pointer-events-none"
        viewBox="0 0 200 200"
        fill="none"
      >
        <g stroke="#D4AF37" strokeWidth="3">
          <line x1="20" y1="20" x2="180" y2="20" />
          <line x1="20" y1="60" x2="180" y2="60" />
          <line x1="20" y1="100" x2="180" y2="100" />
          <line x1="20" y1="140" x2="180" y2="140" />
          <line x1="20" y1="180" x2="180" y2="180" />
          <line x1="20" y1="20" x2="20" y2="180" />
          <line x1="60" y1="20" x2="60" y2="180" />
          <line x1="100" y1="20" x2="100" y2="180" />
          <line x1="140" y1="20" x2="140" y2="180" />
          <line x1="180" y1="20" x2="180" y2="180" />
          <line x1="20" y1="20" x2="180" y2="180" />
          <line x1="180" y1="20" x2="20" y2="180" />
        </g>
        <circle cx="100" cy="100" r="14" fill="#B23C36" />
        <circle cx="60" cy="140" r="9" fill="#D4AF37" />
        <circle cx="140" cy="140" r="9" fill="#D4AF37" />
        <circle cx="60" cy="60" r="9" fill="#D4AF37" />
        <circle cx="140" cy="60" r="9" fill="#D4AF37" />
      </svg>

      <div className="relative z-10 max-w-[900px] w-full mx-auto px-6 md:px-10 text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 border border-[#263A32] bg-[#14221E]">
          <span className="size-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className={`${MONO} text-[11px] text-[#C9C3AE]`}>
            Now available on Google Play
            {SURROUND_IT_DOWNLOADS
              ? ` · ${SURROUND_IT_DOWNLOADS} downloads`
              : ""}
          </span>
        </div>

        {/* App icon */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/apps/surround-it/icon.png"
            alt="Surround It app icon"
            width={88}
            height={88}
            priority
            className="rounded-[20px] shadow-[0px_6px_24px_rgba(0,0,0,0.35)]"
          />
        </div>

        {/* Headline */}
        <h1
          className={`${HEADING} text-[clamp(2.2rem,6vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#F4EEDA] mb-5`}
        >
          {SURROUND_IT_TAGLINE}
        </h1>

        {/* Subheading */}
        <p className="max-w-[560px] mx-auto text-[1.0625rem] text-[#C9C3AE] leading-[1.7] mb-10">
          {SURROUND_IT_SUBTAGLINE}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#download"
            className="inline-flex items-center gap-2 h-11 px-6 rounded bg-[#D4AF37] hover:bg-[#F2CA50] text-[#081612] text-sm font-semibold transition-colors"
          >
            Download Now
            <ArrowRight size={15} />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 h-11 px-6 rounded border border-[#D4AF37] text-[#D4AF37] bg-transparent hover:bg-[#1B2E27] text-sm font-semibold transition-colors"
          >
            <Sparkles size={15} />
            See What&apos;s Inside
          </a>
        </div>

        <p className={`${MONO} mt-6 text-[10px] text-[#8C9A90] uppercase`}>
          {SURROUND_IT_HERO_NOTE}
        </p>
      </div>
    </section>
  );
}
