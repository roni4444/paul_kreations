import { services } from "@/lib/data";
import { Globe, Layers, Lightbulb, LucideIcon, Smartphone } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Smartphone,
  Globe,
  Layers,
  Lightbulb,
};

// Mono label style — JetBrains Mono
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export function Services() {
  return (
    <section id="services" className="py-24 bg-[#f9f9ff]">
      <div className="max-w-[1280px] mx-auto px-10">
        {/* ── Section Header ───────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-lg">
            <span
              className={`${MONO} inline-block text-[11px] text-[#c41e3a] uppercase mb-4`}
            >
              What We Do
            </span>
            <h2 className="text-[2rem] font-bold tracking-[-0.025em] text-[#111c2d] leading-tight mb-3">
              Services
            </h2>
            <p className="font-[family-name:var(--font-sans)] text-[#5f5e5e] leading-relaxed">
              From idea to production — we cover the full spectrum of digital
              product development with a focus on quality at every step.
            </p>
          </div>

          {/* 2px crimson accent line per spec */}
          <div className="hidden md:block w-[2px] h-16 bg-gradient-to-b from-transparent via-[#c41e3a] to-transparent flex-shrink-0" />
        </div>

        {/* ── Service Cards — flat, 1px border, no shadow ─ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {services.map((service, index) => {
            const Icon = ICON_MAP[service.icon] ?? Lightbulb;

            return (
              <article
                key={service.id}
                className="group relative flex flex-col gap-4 p-6 bg-white border border-[#e3bebd] hover:border-[#c41e3a] hover:shadow-[0px_4px_20px_rgba(196,30,58,0.08)] transition-all duration-200 overflow-hidden"
              >
                {/* 2px crimson left-border on hover — "selected" style per spec */}
                <div
                  className="absolute top-0 left-0 bottom-0 w-[2px] bg-[#c41e3a] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  aria-hidden="true"
                />

                {/* Icon — Rose Mist bg per spec */}
                <div className="size-10 flex items-center justify-center bg-[#ffdad9] flex-shrink-0">
                  <Icon
                    size={18}
                    className="text-[#c41e3a]"
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-[#111c2d] text-[1.0625rem] tracking-[-0.01em]">
                    {service.title}
                  </h3>
                  <p className="font-[family-name:var(--font-sans)] text-sm text-[#5f5e5e] leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Highlight chips — Rose Mist background + crimson border per spec */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#e3bebd]">
                  {service.highlights.map((item) => (
                    <span
                      key={item}
                      className={`${MONO} px-2 py-0.5 text-[10px] font-medium text-[#c41e3a] bg-[#fff5f5] border border-[#c41e3a]/30`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        {/* ── Section divider ─────────────────── */}
        <div className="mt-16 flex items-center gap-4">
          <div className="flex-1 h-px bg-[#e3bebd]" />
          <div className="size-1.5 bg-[#c41e3a]" />
          <div className="flex-1 h-px bg-[#e3bebd]" />
        </div>
      </div>
    </section>
  );
}
