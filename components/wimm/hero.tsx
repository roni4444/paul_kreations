import Image from "next/image";
import { ArrowRight, PlayCircle } from "lucide-react";
import {
  WIMM_IS_LIVE,
  WIMM_LAUNCH_DATE,
  WIMM_SUBTAGLINE,
  WIMM_TAGLINE,
} from "@/lib/data/wimm";

const HEADING = "font-[family-name:var(--font-wimm-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

function formatLaunchDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function WimmHero() {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center overflow-hidden bg-[#F6FAF8] pt-32 pb-20 md:pt-40 md:pb-28"
    >
      {/* ── Dot Grid Background ─────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, #D8E8E0 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(15,122,78,0.09) 0%, rgba(30,111,168,0.05) 55%, transparent 75%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 25%, #F6FAF8 100%)",
        }}
      />

      {/* ── Signature element ────────────────────────────────────────────
          A rising sparkline echoing the app icon's own growth-arrow motif —
          the one deliberate visual flourish on this page; everything else
          stays quiet by comparison. */}
      <svg
        aria-hidden="true"
        className="absolute right-[-40px] top-[18%] w-[340px] h-[200px] opacity-[0.14] hidden lg:block pointer-events-none"
        viewBox="0 0 340 200"
        fill="none"
      >
        <defs>
          <linearGradient id="wimm-hero-line" x1="0" y1="200" x2="340" y2="0">
            <stop offset="0%" stopColor="#0F7A4E" />
            <stop offset="100%" stopColor="#1E6FA8" />
          </linearGradient>
        </defs>
        <path
          d="M4 170 L70 130 L120 150 L180 70 L230 95 L300 20"
          stroke="url(#wimm-hero-line)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="300" cy="20" r="9" fill="#1E6FA8" />
      </svg>

      <div className="relative z-10 max-w-[900px] w-full mx-auto px-6 md:px-10 text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 border border-[#D8E8E0] bg-white">
          <span className="size-1.5 rounded-full bg-[#0F7A4E] animate-pulse" />
          <span className={`${MONO} text-[11px] text-[#4A5A52]`}>
            {WIMM_IS_LIVE
              ? "Now available"
              : `Launching ${formatLaunchDate(WIMM_LAUNCH_DATE)}`}
          </span>
        </div>

        {/* App icon */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/wimm/icon.png"
            alt="Where Is My Money? app icon"
            width={88}
            height={88}
            priority
            className="rounded-[20px] shadow-[0px_6px_24px_rgba(15,122,78,0.14)]"
          />
        </div>

        {/* Headline */}
        <h1
          className={`${HEADING} text-[clamp(2.2rem,6vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#0E2A20] mb-5`}
        >
          {WIMM_TAGLINE}
        </h1>

        {/* Subheading */}
        <p className="max-w-[560px] mx-auto text-[1.0625rem] text-[#4A5A52] leading-[1.7] mb-10">
          {WIMM_SUBTAGLINE}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 h-11 px-6 rounded bg-[#0F7A4E] hover:bg-[#0A5C3A] text-white text-sm font-semibold transition-colors"
          >
            {WIMM_IS_LIVE ? "Download Now" : "Get Early Access"}
            <ArrowRight size={15} />
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 h-11 px-6 rounded border border-[#0F7A4E] text-[#0F7A4E] bg-transparent hover:bg-[#E3F3EA] text-sm font-semibold transition-colors"
          >
            <PlayCircle size={15} />
            See How It Works
          </a>
        </div>

        <p className={`${MONO} mt-6 text-[10px] text-[#7C9187] uppercase`}>
          Android · iOS · Windows · macOS · Linux — No ads, no data selling
        </p>
      </div>
    </section>
  );
}
