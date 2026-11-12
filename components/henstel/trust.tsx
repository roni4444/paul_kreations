import { Mail } from "lucide-react";
import { HENSTEL_SUPPORT_EMAIL, henstelTrustBadges } from "@/lib/data/henstel";

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

// NOTE: Every claim in henstelTrustBadges must be stated in the Privacy
// Policy (app/henstel/privacy/page.tsx). Do not add security or compliance
// claims unless the policy says so first.

export function HenstelTrust() {
  return (
    <section className="py-16 bg-[#FFFFFF] border-y border-[#E6DCC6]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {henstelTrustBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.title}
                className="flex flex-col items-center text-center gap-2.5"
              >
                <Icon size={20} className="text-[#2E6B3F]" aria-hidden="true" />
                <span
                  className={`${MONO} text-[11px] text-[#3B2A18] uppercase`}
                >
                  {badge.title}
                </span>
                <p className="text-xs text-[#7A6850] leading-relaxed">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-2 mt-10 pt-8 border-t border-[#E6DCC6]">
          <Mail size={13} className="text-[#2E6B3F]" aria-hidden="true" />
          <span className={`${MONO} text-[11px] text-[#7A6850]`}>
            Need help? Reach us at{" "}
            <a
              href={`mailto:${HENSTEL_SUPPORT_EMAIL}`}
              className="text-[#2E6B3F] hover:underline"
            >
              {HENSTEL_SUPPORT_EMAIL}
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}
