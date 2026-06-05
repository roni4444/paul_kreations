import { roadmap } from "@/lib/data";
import {
  Lock,
  LucideIcon,
  Server,
  ShoppingBag,
  Smartphone,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  ShoppingBag,
  Smartphone,
  Server,
};

const STATUS_LABEL: Record<string, string> = {
  planned: "Planned",
  "in-progress": "In Progress",
  soon: "Coming Soon",
};

const STATUS_STYLE: Record<string, string> = {
  planned: "bg-[#f3f3f5] text-[#757684] border border-[#e2e2e4]",
  "in-progress": "bg-[#dee0ff] text-[#3c52c0] border border-[#bac3ff]",
  soon: "bg-[#ffdcc1] text-[#6c3a00] border border-[#ffb778]",
};

export function Roadmap() {
  return (
    <section id="roadmap" className="py-24 bg-[#f9f9fb] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* ── Section Header ──────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-lg">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.1em] text-[#3c52c0] mb-4">
              The Future
            </span>
            <h2 className="text-[2rem] font-bold tracking-[-0.025em] text-[#1a1c1d] leading-tight mb-3">
              What&apos;s Next
            </h2>
            <p className="text-[#444653] leading-relaxed">
              Paul Kreations is just getting started. Here&apos;s a preview of
              what we&apos;re planning to build — more products, more platforms,
              more possibilities.
            </p>
          </div>
          <div className="flex-shrink-0 hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#e2e2e4] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <div className="size-1.5 rounded-full bg-[#3c52c0] animate-pulse" />
            <span className="text-xs font-medium text-[#444653]">
              Actively building
            </span>
          </div>
        </div>

        {/* ── Roadmap Cards ───────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {roadmap.map((item, index) => {
            const Icon = ICON_MAP[item.icon] ?? Server;
            return (
              <div
                key={item.id}
                className="relative group flex flex-col gap-4 p-6 bg-white rounded-xl border border-[#e2e2e4] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Blur mask overlay for "planned" items */}
                <div
                  className="absolute inset-0 backdrop-blur-[2px] bg-white/50 rounded-xl z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                >
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#e2e2e4] shadow-sm text-xs font-medium text-[#444653]">
                    <Lock size={11} />
                    Unlocking soon
                  </div>
                </div>

                {/* Icon */}
                <div className="size-10 rounded-lg bg-[#f3f3f5] border border-[#e2e2e4] flex items-center justify-center">
                  <Icon
                    size={18}
                    className="text-[#757684]"
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-[#1a1c1d] tracking-[-0.01em] leading-tight">
                      {item.title}
                    </h3>
                    {item.eta && (
                      <span className="text-[10px] font-medium text-[#757684] bg-[#f3f3f5] px-2 py-0.5 rounded-md whitespace-nowrap flex-shrink-0">
                        ~{item.eta}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#444653] leading-relaxed flex-1">
                    {item.description}
                  </p>
                </div>

                {/* Status badge */}
                <div className="pt-4 border-t border-[#f3f3f5]">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wide ${STATUS_STYLE[item.status]}`}
                  >
                    <span className="size-1.5 rounded-full bg-current opacity-70" />
                    {STATUS_LABEL[item.status]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Open note ───────────────────────── */}
        <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-[#dee0ff] to-[#e2dfff] border border-[#bac3ff]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#1a1c1d] mb-1">
                Have an idea or collaboration in mind?
              </p>
              <p className="text-xs text-[#444653]">
                Paul Kreations is open to partnerships, feedback, and new
                directions. Reach out and let&apos;s build something together.
              </p>
            </div>
            <a
              href="mailto:debapriyopaul.dp@gmail.com"
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3c52c0] hover:bg-[#223aa9] text-white text-sm font-medium transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
