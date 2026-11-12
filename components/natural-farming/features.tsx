"use client";

// components/natural-farming/features.tsx
// Shows the 6 top features by default; "Show all 14" reveals the rest.
// Keeps the first impression focused per the brief: "highlight top 6,
// not every feature — too overwhelming."

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  naturalFarmingCopy,
  naturalFarmingFeatures,
} from "@/lib/data/natural-farming";

const HEADING = "font-[family-name:var(--font-natural-farming-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export function NaturalFarmingFeatures() {
  const [showAll, setShowAll] = useState(false);
  const topFeatures = naturalFarmingFeatures.filter((f) => f.top);
  const restFeatures = naturalFarmingFeatures.filter((f) => !f.top);
  const visible = showAll ? naturalFarmingFeatures : topFeatures;

  return (
    <section id="features" className="py-24 bg-[#F9FBF9]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-center max-w-[640px] mx-auto mb-14">
          <span
            className={`${MONO} inline-block text-[11px] text-[#2E7D32] uppercase mb-4`}
          >
            {naturalFarmingCopy.featuresEyebrow}
          </span>
          <h2
            className={`${HEADING} text-[2rem] font-bold tracking-[-0.02em] text-[#1B2E1C] leading-tight mb-4`}
          >
            {naturalFarmingCopy.featuresTitle}
          </h2>
          <p className="text-[#3F5543] leading-relaxed">
            {naturalFarmingCopy.featuresIntro}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="flex flex-col gap-3 p-6 bg-[#FFFFFF] border border-[#D6E6D6] hover:border-[#2E7D32] transition-colors"
              >
                <div className="size-10 rounded flex items-center justify-center bg-[#E4F1E4] text-[#2E7D32]">
                  <Icon size={18} aria-hidden="true" />
                </div>
                <h3
                  className={`${HEADING} font-semibold text-[#1B2E1C] text-[15px]`}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-[#566B5A] leading-relaxed">
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
              className={`${MONO} inline-flex items-center gap-2 h-10 px-5 border border-[#D6E6D6] hover:border-[#2E7D32] hover:text-[#2E7D32] text-[#3F5543] text-[11px] uppercase transition-colors`}
              aria-expanded={showAll}
            >
              {showAll
                ? "Show fewer"
                : `Show all ${naturalFarmingFeatures.length} features`}
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
