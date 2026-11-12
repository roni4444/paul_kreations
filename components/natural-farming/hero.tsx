import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  NATURAL_FARMING_DOWNLOADS,
  NATURAL_FARMING_HERO_NOTE,
  NATURAL_FARMING_SUBTAGLINE,
  NATURAL_FARMING_TAGLINE,
} from "@/lib/data/natural-farming";

const HEADING = "font-[family-name:var(--font-natural-farming-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export function NaturalFarmingHero() {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center overflow-hidden bg-[#F9FBF9] pt-32 pb-20 md:pt-40 md:pb-28"
    >
      {/* ── Dot grid background ─────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, #D6E6D6 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(46,125,50,0.10) 0%, rgba(255,193,7,0.10) 55%, transparent 75%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 25%, #F9FBF9 100%)",
        }}
      />

      {/* ── Signature element ─────────────────────────────────────────── */}
      <svg
        aria-hidden="true"
        className="absolute right-[-30px] top-[16%] w-[300px] h-[300px] opacity-[0.16] hidden lg:block pointer-events-none"
        viewBox="0 0 200 200"
        fill="none"
      >
        <g fill="none" stroke="#2E7D32" strokeWidth="6" strokeLinecap="round">
          <path d="M100 190 V60" />
        </g>
        <path
          d="M100 120 C60 120 40 90 40 60 C75 60 100 85 100 120Z"
          fill="#2E7D32"
        />
        <path
          d="M100 90 C140 90 160 60 160 30 C125 30 100 55 100 90Z"
          fill="#FFC107"
        />
        <path
          d="M100 150 C70 150 55 130 55 108 C80 108 100 126 100 150Z"
          fill="#1B5E20"
        />
      </svg>

      <div className="relative z-10 max-w-[900px] w-full mx-auto px-6 md:px-10 text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 border border-[#D6E6D6] bg-[#FFFFFF]">
          <span className="size-1.5 rounded-full bg-[#2E7D32] animate-pulse" />
          <span className={`${MONO} text-[11px] text-[#3F5543]`}>
            Now available on Google Play
            {NATURAL_FARMING_DOWNLOADS
              ? ` · ${NATURAL_FARMING_DOWNLOADS} downloads`
              : ""}
          </span>
        </div>

        {/* App icon */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/apps/natural-farming/icon.png"
            alt="Natural Farming app icon"
            width={88}
            height={88}
            priority
            className="rounded-[20px] shadow-[0px_6px_24px_rgba(46,125,50,0.10)]"
          />
        </div>

        {/* Headline */}
        <h1
          className={`${HEADING} text-[clamp(2.2rem,6vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#1B2E1C] mb-5`}
        >
          {NATURAL_FARMING_TAGLINE}
        </h1>

        {/* Subheading */}
        <p className="max-w-[560px] mx-auto text-[1.0625rem] text-[#3F5543] leading-[1.7] mb-10">
          {NATURAL_FARMING_SUBTAGLINE}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#download"
            className="inline-flex items-center gap-2 h-11 px-6 rounded bg-[#2E7D32] hover:bg-[#1B5E20] text-[#FFFFFF] text-sm font-semibold transition-colors"
          >
            Download Now
            <ArrowRight size={15} />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 h-11 px-6 rounded border border-[#2E7D32] text-[#2E7D32] bg-transparent hover:bg-[#E4F1E4] text-sm font-semibold transition-colors"
          >
            <Sparkles size={15} />
            See What&apos;s Inside
          </a>
        </div>

        <p className={`${MONO} mt-6 text-[10px] text-[#6B8470] uppercase`}>
          {NATURAL_FARMING_HERO_NOTE}
        </p>
      </div>
    </section>
  );
}
