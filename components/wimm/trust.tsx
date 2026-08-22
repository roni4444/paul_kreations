import { EyeOff, Lock, Mail, ShieldCheck, Smartphone } from "lucide-react";
import { WIMM_SUPPORT_EMAIL } from "@/lib/data/wimm";

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

// NOTE: Only claims you've explicitly confirmed appear here (local-first
// storage, no ads/no data selling, biometric+PIN). Deliberately not
// including "End-to-End Encrypted" or compliance badges (GDPR etc.) since
// those weren't confirmed — add them once the corresponding feature/audit
// is actually in place. False security claims are a real legal/trust risk.
const badges = [
  {
    icon: Lock,
    title: "Local-First Storage",
    description:
      "Your data lives on your device first. Cloud sync is optional, never forced.",
  },
  {
    icon: EyeOff,
    title: "No Ads, No Data Selling",
    description:
      "Where Is My Money? doesn't monetise your financial data. Ever.",
  },
  {
    icon: Smartphone,
    title: "Biometric + PIN Security",
    description: "Lock the app behind your fingerprint, face, or PIN.",
  },
  {
    icon: ShieldCheck,
    title: "You're In Control",
    description:
      "Export everything to PDF, or delete your data, whenever you choose.",
  },
];

export function WimmTrust() {
  return (
    <section className="py-16 bg-white border-y border-[#D8E8E0]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.title}
                className="flex flex-col items-center text-center gap-2.5"
              >
                <Icon size={20} className="text-[#0F7A4E]" aria-hidden="true" />
                <span
                  className={`${MONO} text-[11px] text-[#0E2A20] uppercase`}
                >
                  {badge.title}
                </span>
                <p className="text-xs text-[#5B6E64] leading-relaxed">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-2 mt-10 pt-8 border-t border-[#D8E8E0]">
          <Mail size={13} className="text-[#0F7A4E]" aria-hidden="true" />
          <span className={`${MONO} text-[11px] text-[#5B6E64]`}>
            Need help? Reach us at{" "}
            <a
              href={`mailto:${WIMM_SUPPORT_EMAIL}`}
              className="text-[#0F7A4E] hover:underline"
            >
              {WIMM_SUPPORT_EMAIL}
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}
