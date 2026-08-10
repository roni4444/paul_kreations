"use client";

// components/wimm/features.tsx
// Shows the 6 top features by default; "Show all 14" reveals the rest.
// Keeps the first impression focused per the brief: "highlight top 6,
// not every feature — too overwhelming."

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { wimmFeatures } from "@/lib/data/wimm";

const HEADING = "font-[family-name:var(--font-wimm-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export function WimmFeatures() {
  const [showAll, setShowAll] = useState(false);
  const topFeatures = wimmFeatures.filter((f) => f.top);
  const restFeatures = wimmFeatures.filter((f) => !f.top);
  const visible = showAll ? wimmFeatures : topFeatures;

  return (
    <section id="features" className="py-24 bg-[#F6FAF8]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-center max-w-[640px] mx-auto mb-14">
          <span
            className={`${MONO} inline-block text-[11px] text-[#0F7A4E] uppercase mb-4`}
          >
            One App, Every Account
          </span>
          <h2
            className={`${HEADING} text-[2rem] font-bold tracking-[-0.02em] text-[#0E2A20] leading-tight mb-4`}
          >
            Everything about your money, unified
          </h2>
          <p className="text-[#4A5A52] leading-relaxed">
            Where Is My Money? isn&apos;t another expense tracker. It&apos;s a
            complete financial operating system covering {wimmFeatures.length}{" "}
            areas of your financial life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="flex flex-col gap-3 p-6 bg-white border border-[#D8E8E0] hover:border-[#0F7A4E] transition-colors"
              >
                <div className="size-10 rounded flex items-center justify-center bg-[#E3F3EA] text-[#0F7A4E]">
                  <Icon size={18} aria-hidden="true" />
                </div>
                <h3
                  className={`${HEADING} font-semibold text-[#0E2A20] text-[15px]`}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-[#5B6E64] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {restFeatures.length > 0 && (
          <div className="flex justify-center mt-10">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className={`${MONO} inline-flex items-center gap-2 h-10 px-5 border border-[#D8E8E0] hover:border-[#0F7A4E] hover:text-[#0F7A4E] text-[#4A5A52] text-[11px] uppercase transition-colors`}
              aria-expanded={showAll}
            >
              {showAll
                ? "Show fewer"
                : `Show all ${wimmFeatures.length} features`}
              <ChevronDown
                size={14}
                className={
                  showAll
                    ? "rotate-180 transition-transform"
                    : "transition-transform"
                }
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
