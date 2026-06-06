import { roadmap } from "@/lib/data";
import { LucideIcon, Server, ShoppingBag, Smartphone } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  ShoppingBag,
  Smartphone,
  Server,
};

// Mono label style — JetBrains Mono
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

// Status badge styles — JetBrains Mono per spec
const STATUS_LABEL: Record<string, string> = {
  planned: "PLANNED",
  "in-progress": "IN PROGRESS",
  soon: "COMING SOON",
};

const STATUS_STYLE: Record<string, string> = {
  planned: "bg-[#f9f9ff] text-[#8f6f6f] border border-[#e3bebd]",
  "in-progress": "bg-[#ffdad9] text-[#c41e3a] border border-[#c41e3a]/40",
  soon: "bg-[#c41e3a] text-white border border-[#9e0027]",
};

export function Roadmap() {
  return (
    <section id="roadmap" className="py-24 bg-[#f9f9ff]">
      <div className="max-w-[1280px] mx-auto px-10">
        {/* ── Section Header ───────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-lg">
            <span
              className={`${MONO} inline-block text-[11px] text-[#c41e3a] uppercase mb-4`}
            >
              The Future
            </span>
            <h2 className="text-[2rem] font-bold tracking-[-0.025em] text-[#111c2d] leading-tight mb-3">
              What&apos;s Next
            </h2>
            <p className="font-[family-name:var(--font-sans)] text-[#5f5e5e] leading-relaxed">
              Paul Kreations is just getting started. Here&apos;s a preview of
              what we&apos;re planning to build — more products, more platforms,
              more possibilities.
            </p>
          </div>

          {/* Status indicator — JetBrains Mono */}
          <div className="flex-shrink-0 hidden md:flex items-center gap-2 px-4 py-2 border border-[#e3bebd] bg-white">
            <div className="size-1.5 bg-[#c41e3a] animate-pulse" />
            <span className={`${MONO} text-[11px] text-[#5f5e5e]`}>
              Actively building
            </span>
          </div>
        </div>

        {/* ── Roadmap Cards — flat per spec ─────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {roadmap.map((item, index) => {
            const Icon = ICON_MAP[item.icon] ?? Server;
            return (
              <div
                key={item.id}
                className="flex flex-col gap-4 p-6 bg-white border border-[#e3bebd]"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Icon — flat, no-shadow per spec */}
                <div className="size-10 flex items-center justify-center bg-[#f9f9ff] border border-[#e3bebd]">
                  <Icon
                    size={18}
                    className="text-[#8f6f6f]"
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-[#111c2d] tracking-[-0.01em] leading-tight">
                      {item.title}
                    </h3>
                    {item.eta && (
                      <span
                        className={`${MONO} text-[10px] text-[#8f6f6f] bg-[#f9f9ff] border border-[#e3bebd] px-2 py-0.5 whitespace-nowrap flex-shrink-0`}
                      >
                        ~{item.eta}
                      </span>
                    )}
                  </div>
                  <p className="font-[family-name:var(--font-sans)] text-sm text-[#5f5e5e] leading-relaxed flex-1">
                    {item.description}
                  </p>
                </div>

                {/* Status badge — JetBrains Mono per spec */}
                <div className="pt-4 border-t border-[#e3bebd]">
                  <span
                    className={`${MONO} inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-semibold ${STATUS_STYLE[item.status]}`}
                  >
                    <span className="size-1.5 bg-current opacity-80" />
                    {STATUS_LABEL[item.status]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CTA Banner ──────────────────────── */}
        <div className="mt-12 p-6 bg-white border border-[#e3bebd] border-l-[3px] border-l-[#c41e3a]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="font-semibold text-[#111c2d] mb-1">
                Have an idea or collaboration in mind?
              </p>
              <p className="font-[family-name:var(--font-sans)] text-sm text-[#5f5e5e]">
                Paul Kreations is open to partnerships, feedback, and new
                directions. Reach out and let&apos;s build something together.
              </p>
            </div>
            <a
              href="mailto:contact@paulkreations.com"
              className="flex-shrink-0 inline-flex items-center h-9 px-4 rounded bg-[#c41e3a] hover:bg-[#9e0027] text-white text-sm font-semibold transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
