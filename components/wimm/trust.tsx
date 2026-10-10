import { EyeOff, Lock, Mail, MapPin, ShieldCheck } from "lucide-react";
import { WIMM_SUPPORT_EMAIL } from "@/lib/data/wimm";

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

// NOTE: Every claim here must be stated in the Privacy Policy
// (app/wimm/privacy/page.tsx). Do not add security or compliance claims
// ("bank-grade", "end-to-end encrypted", GDPR badges, biometric/PIN, etc.)
// unless the policy says so first. False security claims are a real
// legal/trust risk.
const badges = [
  {
    icon: Lock,
    title: "Local-First Storage",
    description:
      "Your financial data stays on your device by default. Cloud sync is optional and Premium.",
  },
  {
    icon: EyeOff,
    title: "No Data Selling",
    description:
      "We do not sell your personal data, and we do not use your financial records for advertising.",
  },
  {
    icon: MapPin,
    title: "Cloud Hosted in Mumbai",
    description: "Our cloud database is hosted in Mumbai, India.",
  },
  {
    icon: ShieldCheck,
    title: "You're In Control",
    description:
      "Export your data, or delete your account, whenever you choose.",
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
