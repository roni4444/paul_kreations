import { Check } from "lucide-react";
import { wimmBenefitGroups } from "@/lib/data/wimm";

const HEADING = "font-[family-name:var(--font-wimm-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export function WimmBenefits() {
  return (
    <section id="benefits" className="py-24 bg-[#F6FAF8]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-center max-w-[640px] mx-auto mb-14">
          <span
            className={`${MONO} inline-block text-[11px] text-[#0F7A4E] uppercase mb-4`}
          >
            Why Where Is My Money?
          </span>
          <h2
            className={`${HEADING} text-[2rem] font-bold tracking-[-0.02em] text-[#0E2A20] leading-tight mb-4`}
          >
            Built for how Indians actually manage money
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wimmBenefitGroups.map((group) => (
            <div
              key={group.id}
              className="p-6 bg-white border border-[#D8E8E0]"
            >
              <h3
                className={`${HEADING} font-semibold text-[#0E2A20] text-[15px] mb-4`}
              >
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {group.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <Check
                      size={14}
                      className="text-[#0F7A4E] mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-[#5B6E64] leading-relaxed">
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
