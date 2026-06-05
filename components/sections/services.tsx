import { services } from "@/lib/data";
import { Smartphone, Globe, Layers, Lightbulb, LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Smartphone,
  Globe,
  Layers,
  Lightbulb,
};

export function Services() {
  return (
    <section id="services" className="py-24 bg-[#f9f9fb]">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* ── Section Header ──────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-lg">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.1em] text-[#3c52c0] mb-4">
              What We Do
            </span>
            <h2 className="text-[2rem] font-bold tracking-[-0.025em] text-[#1a1c1d] leading-tight mb-3">
              Services
            </h2>
            <p className="text-[#444653] leading-relaxed">
              From idea to production — we cover the full spectrum of digital
              product development with a focus on quality at every step.
            </p>
          </div>

          {/* Decorative accent line */}
          <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-[#c5c5d5] to-transparent flex-shrink-0" />
        </div>

        {/* ── Service Cards ───────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {services.map((service, index) => {
            const Icon = ICON_MAP[service.icon] ?? Lightbulb;

            return (
              <article
                key={service.id}
                className="group relative flex flex-col gap-4 p-6 bg-white rounded-xl border border-[#e2e2e4] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)] overflow-hidden"
              >
                {/* Hover accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3c52c0] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                />

                {/* Icon */}
                <div className="size-10 rounded-lg bg-[#dee0ff] flex items-center justify-center flex-shrink-0">
                  <Icon
                    size={18}
                    className="text-[#3c52c0]"
                    aria-hidden="true"
                  />
                </div>

                {/* Title + Description */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-[#1a1c1d] text-[1.0625rem] tracking-[-0.01em]">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#444653] leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#f3f3f5]">
                  {service.highlights.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium text-[#444653] bg-[#f3f3f5] border border-[#e8e8ea]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        {/* ── Bottom divider into next section ─── */}
        <div className="mt-16 flex items-center gap-4">
          <div className="flex-1 h-px bg-[#e2e2e4]" />
          <div className="size-1.5 rounded-full bg-[#c5c5d5]" />
          <div className="size-1 rounded-full bg-[#e2e2e4]" />
        </div>
      </div>
    </section>
  );
}
