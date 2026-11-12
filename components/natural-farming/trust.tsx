import { Mail } from "lucide-react";
import {
  NATURAL_FARMING_SUPPORT_EMAIL,
  naturalFarmingTrustBadges,
} from "@/lib/data/natural-farming";

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

// NOTE: Every claim in naturalFarmingTrustBadges must be stated in the Privacy
// Policy (app/natural-farming/privacy/page.tsx). Do not add security or compliance
// claims unless the policy says so first.

export function NaturalFarmingTrust() {
  return (
    <section className="py-16 bg-[#FFFFFF] border-y border-[#D6E6D6]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {naturalFarmingTrustBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.title}
                className="flex flex-col items-center text-center gap-2.5"
              >
                <Icon size={20} className="text-[#2E7D32]" aria-hidden="true" />
                <span
                  className={`${MONO} text-[11px] text-[#1B2E1C] uppercase`}
                >
                  {badge.title}
                </span>
                <p className="text-xs text-[#566B5A] leading-relaxed">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-2 mt-10 pt-8 border-t border-[#D6E6D6]">
          <Mail size={13} className="text-[#2E7D32]" aria-hidden="true" />
          <span className={`${MONO} text-[11px] text-[#566B5A]`}>
            Need help? Reach us at{" "}
            <a
              href={`mailto:${NATURAL_FARMING_SUPPORT_EMAIL}`}
              className="text-[#2E7D32] hover:underline"
            >
              {NATURAL_FARMING_SUPPORT_EMAIL}
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}
