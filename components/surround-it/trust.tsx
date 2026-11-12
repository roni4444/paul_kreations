import { Mail } from "lucide-react";
import {
  SURROUND_IT_SUPPORT_EMAIL,
  surroundItTrustBadges,
} from "@/lib/data/surround-it";

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

// NOTE: Every claim in surroundItTrustBadges must be stated in the Privacy
// Policy (app/surround-it/privacy/page.tsx). Do not add security or compliance
// claims unless the policy says so first.

export function SurroundItTrust() {
  return (
    <section className="py-16 bg-[#14221E] border-y border-[#263A32]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {surroundItTrustBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.title}
                className="flex flex-col items-center text-center gap-2.5"
              >
                <Icon size={20} className="text-[#D4AF37]" aria-hidden="true" />
                <span
                  className={`${MONO} text-[11px] text-[#F4EEDA] uppercase`}
                >
                  {badge.title}
                </span>
                <p className="text-xs text-[#A9B3A8] leading-relaxed">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-2 mt-10 pt-8 border-t border-[#263A32]">
          <Mail size={13} className="text-[#D4AF37]" aria-hidden="true" />
          <span className={`${MONO} text-[11px] text-[#A9B3A8]`}>
            Need help? Reach us at{" "}
            <a
              href={`mailto:${SURROUND_IT_SUPPORT_EMAIL}`}
              className="text-[#D4AF37] hover:underline"
            >
              {SURROUND_IT_SUPPORT_EMAIL}
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}
