"use client";

// components/surround-it/features.tsx
// Shows the 6 top features by default; "Show all 14" reveals the rest.
// Keeps the first impression focused per the brief: "highlight top 6,
// not every feature — too overwhelming."

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { surroundItCopy, surroundItFeatures } from "@/lib/data/surround-it";

const HEADING = "font-[family-name:var(--font-surround-it-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export function SurroundItFeatures() {
  const [showAll, setShowAll] = useState(false);
  const topFeatures = surroundItFeatures.filter((f) => f.top);
  const restFeatures = surroundItFeatures.filter((f) => !f.top);
  const visible = showAll ? surroundItFeatures : topFeatures;

  return (
    <section id="features" className="py-24 bg-[#081612]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-center max-w-[640px] mx-auto mb-14">
          <span
            className={`${MONO} inline-block text-[11px] text-[#D4AF37] uppercase mb-4`}
          >
            {surroundItCopy.featuresEyebrow}
          </span>
          <h2
            className={`${HEADING} text-[2rem] font-bold tracking-[-0.02em] text-[#F4EEDA] leading-tight mb-4`}
          >
            {surroundItCopy.featuresTitle}
          </h2>
          <p className="text-[#C9C3AE] leading-relaxed">
            {surroundItCopy.featuresIntro}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="flex flex-col gap-3 p-6 bg-[#14221E] border border-[#263A32] hover:border-[#D4AF37] transition-colors"
              >
                <div className="size-10 rounded flex items-center justify-center bg-[#1B2E27] text-[#D4AF37]">
                  <Icon size={18} aria-hidden="true" />
                </div>
                <h3
                  className={`${HEADING} font-semibold text-[#F4EEDA] text-[15px]`}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-[#A9B3A8] leading-relaxed">
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
              className={`${MONO} inline-flex items-center gap-2 h-10 px-5 border border-[#263A32] hover:border-[#D4AF37] hover:text-[#D4AF37] text-[#C9C3AE] text-[11px] uppercase transition-colors`}
              aria-expanded={showAll}
            >
              {showAll
                ? "Show fewer"
                : `Show all ${surroundItFeatures.length} features`}
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
