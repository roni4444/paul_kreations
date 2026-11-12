import { Check } from "lucide-react";
import { henstelBenefitGroups, henstelCopy } from "@/lib/data/henstel";

const HEADING = "font-[family-name:var(--font-henstel-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export function HenstelBenefits() {
  return (
    <section id="benefits" className="py-24 bg-[#FBF6EC]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-center max-w-[640px] mx-auto mb-14">
          <span
            className={`${MONO} inline-block text-[11px] text-[#2E6B3F] uppercase mb-4`}
          >
            Why Henstel
          </span>
          <h2
            className={`${HEADING} text-[2rem] font-bold tracking-[-0.02em] text-[#3B2A18] leading-tight mb-4`}
          >
            {henstelCopy.benefitsTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {henstelBenefitGroups.map((group) => (
            <div
              key={group.id}
              className="p-6 bg-[#FFFFFF] border border-[#E6DCC6]"
            >
              <h3
                className={`${HEADING} font-semibold text-[#3B2A18] text-[15px] mb-4`}
              >
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {group.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <Check
                      size={14}
                      className="text-[#2E6B3F] mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-[#7A6850] leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
