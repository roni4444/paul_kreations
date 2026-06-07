import { ArrowRight, Download, Package, Star } from "lucide-react";
import { apps } from "@/lib/data";

// Mono label — JetBrains Mono from layout.tsx font variable
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#f9f9ff]"
    >
      {/* ── Dot Grid Background ─────────────────── */}
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(196,30,58,0.07) 0%, transparent 70%)",
        }}
      />

      {/* ── Rose-mist fade over grid ────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 25%, #f9f9ff 100%)",
        }}
      />

      {/* ── Decorative PK watermark ─────────────── */}
      <div
        aria-hidden="true"
        className="absolute right-[-80px] top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block"
        style={{
          fontSize: "28vw",
          fontWeight: 900,
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(196,30,58,0.05)",
          fontFamily: "var(--font-geist-sans, sans-serif)",
        }}
      >
        PK
      </div>

      {/* ── Main Content ────────────────────────── */}
      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-10 pt-24 pb-16 text-center">
        {/* Status badge — JetBrains Mono label */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 border border-[#e3bebd] bg-white animate-in fade-in-0 duration-700">
          <span className="size-1.5 rounded-full bg-[#c41e3a] animate-pulse" />
          <span className={`${MONO} text-[11px] text-[#5f5e5e]`}>
            {apps.length} products live on Google Play
          </span>
        </div>

        {/* Headline — Geist bold */}
        <h1 className="text-[clamp(2.8rem,8vw,6.5rem)] font-bold leading-[1.04] tracking-[-0.03em] text-[#111c2d] mb-5 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-100">
          Paul{" "}
          <span
            style={{
              backgroundImage:
                "linear-gradient(135deg, #9e0027 0%, #c41e3a 50%, #ff6b6b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Kreations
          </span>
        </h1>

        {/* Subheading — Inter regular */}
        <p className="font-[family-name:var(--font-sans)] max-w-[520px] mx-auto text-[1.0625rem] text-[#5f5e5e] leading-[1.7] mb-10 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-200">
          We build thoughtful digital products — Android apps, web experiences,
          and games — with precision, purpose, and genuine craft.
        </p>

        {/* CTAs — 4px radius per design spec */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300">
          <a
            href="#products"
            className="inline-flex items-center gap-2 h-11 px-6 rounded bg-[#c41e3a] hover:bg-[#9e0027] text-white text-sm font-semibold transition-colors"
          >
            Explore Our Work
            <ArrowRight size={15} />
          </a>
          <a
            href="#services"
            className="inline-flex items-center h-11 px-6 rounded border border-[#c41e3a] text-[#c41e3a] bg-transparent hover:bg-[#ffdad9] text-sm font-semibold transition-colors"
          >
            Our Services
          </a>
        </div>

        {/* Stats — JetBrains Mono */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 animate-in fade-in-0 duration-700 delay-500"
          aria-label="Company statistics"
        >
          {[
            {
              icon: <Package size={13} />,
              value: apps.length,
              label: "Products on Play Store",
            },
            {
              icon: <Download size={13} />,
              value: "500+",
              label: "Total Downloads",
            },
            {
              icon: <Star size={13} />,
              value: (
                (apps[0].rating + apps[1].rating + apps[2].rating) /
                3
              ).toPrecision(3),
              label: "Average" + " Rating",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 text-[#5f5e5e]"
            >
              <span className="text-[#c41e3a]">{stat.icon}</span>
              <span className={`${MONO} font-semibold text-[#111c2d]`}>
                {stat.value}
              </span>
              <span className={`${MONO} text-[11px]`}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom fade ─────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#f9f9ff] to-transparent"
      />

      {/* ── Scroll indicator ────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce opacity-30">
        <div className="w-px h-8 bg-[#c41e3a]" />
        <div className="size-1 rounded-full bg-[#c41e3a]" />
      </div>
    </section>
  );
}
