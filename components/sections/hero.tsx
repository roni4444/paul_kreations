import Link from "next/link";
import { ArrowRight, Download, Star, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#f9f9fb]"
    >
      {/* ── Dot Grid Background ─────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #c5c5d5 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Gradient fade over grid ──────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 30%, #f9f9fb 100%)",
        }}
      />

      {/* ── Ambient indigo glow ──────────────── */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(60,82,192,0.08) 0%, transparent 70%)",
        }}
      />

      {/* ── Decorative oversized PK ─────────── */}
      <div
        aria-hidden="true"
        className="absolute right-[-80px] top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block"
        style={{
          fontSize: "28vw",
          fontWeight: 900,
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(60,82,192,0.06)",
          fontFamily: "var(--font-geist-sans, sans-serif)",
        }}
      >
        PK
      </div>

      {/* ── Main Content ─────────────────────── */}
      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-6 pt-24 pb-16 text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#c5c5d5] shadow-[0_1px_3px_rgba(0,0,0,0.06)] mb-8 animate-in fade-in-0 duration-700">
          <span className="size-1.5 rounded-full bg-[#3c52c0] animate-pulse" />
          <span className="text-xs font-medium text-[#444653] tracking-wide">
            3 products live on Google Play Store
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[clamp(2.8rem,8vw,6.5rem)] font-bold leading-[1.04] tracking-[-0.03em] text-[#1a1c1d] mb-5 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-100">
          Paul{" "}
          <span
            style={{
              backgroundImage:
                "linear-gradient(135deg, #3c52c0 0%, #576cdb 45%, #bac3ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Kreations
          </span>
        </h1>

        {/* Subheading */}
        <p className="max-w-[520px] mx-auto text-[1.0625rem] text-[#444653] leading-[1.7] mb-10 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-200">
          We build thoughtful digital products — Android apps, web experiences,
          and games — with precision, purpose, and genuine craft.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300">
          <Button
            asChild
            size="lg"
            className="h-11 px-6 bg-[#3c52c0] hover:bg-[#223aa9] text-white rounded-xl font-medium gap-2 shadow-md shadow-[#3c52c0]/20 transition-all hover:-translate-y-px"
          >
            <a href="#products">
              Explore Our Work
              <ArrowRight size={16} />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-11 px-6 rounded-xl border-[#c5c5d5] text-[#1a1c1d] bg-white hover:bg-[#edeef0] transition-all hover:-translate-y-px"
          >
            <a href="#services">Our Services</a>
          </Button>
        </div>

        {/* Stats row */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm animate-in fade-in-0 duration-700 delay-500"
          aria-label="Company statistics"
        >
          {[
            {
              icon: <Package size={14} className="text-[#3c52c0]" />,
              value: "3",
              label: "Products on Play Store",
            },
            {
              icon: <Download size={14} className="text-[#3c52c0]" />,
              value: "3.5K+",
              label: "Total Downloads",
            },
            {
              icon: <Star size={14} className="text-[#3c52c0]" />,
              value: "4.5",
              label: "Average Rating",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 text-[#444653]"
            >
              {stat.icon}
              <span className="font-bold text-[#1a1c1d]">{stat.value}</span>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom Section Fade ──────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#f9f9fb] to-transparent"
      />

      {/* ── Scroll indicator ────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce opacity-40">
        <div className="w-px h-8 bg-[#757684]" />
        <div className="size-1 rounded-full bg-[#757684]" />
      </div>
    </section>
  );
}
