import Link from "next/link";
import { Check } from "lucide-react";
import { naturalFarmingPrivacyPoints } from "@/lib/data/natural-farming";

const HEADING = "font-[family-name:var(--font-natural-farming-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

// Every line in naturalFarmingPrivacyPoints restates the Privacy Policy
// (app/natural-farming/privacy/page.tsx). Keep it to what the policy says.

export function NaturalFarmingYourPrivacy() {
  return (
    <section
      id="your-privacy"
      aria-labelledby="your-privacy-heading"
      className="py-16 bg-[#F9FBF9]"
    >
      <div className="max-w-[760px] mx-auto px-6 md:px-10">
        <span
          className={`${MONO} inline-block text-[11px] text-[#2E7D32] uppercase mb-3`}
        >
          Your privacy
        </span>
        <h2
          id="your-privacy-heading"
          className={`${HEADING} text-[1.5rem] font-bold tracking-[-0.02em] text-[#1B2E1C] leading-tight mb-5`}
        >
          Plain-language privacy
        </h2>
        <ul className="flex flex-col gap-2.5 mb-6">
          {naturalFarmingPrivacyPoints.map((point) => (
            <li key={point} className="flex items-start gap-2.5">
              <Check
                size={14}
                className="text-[#2E7D32] mt-1 flex-shrink-0"
                aria-hidden="true"
              />
              <span className="text-[#3F5543] leading-relaxed">{point}</span>
            </li>
          ))}
          <li className="flex items-start gap-2.5">
            <Check
              size={14}
              className="text-[#2E7D32] mt-1 flex-shrink-0"
              aria-hidden="true"
            />
            <span className="text-[#3F5543] leading-relaxed">
              You can{" "}
              <Link
                href="/natural-farming/delete-account"
                className="text-[#2E7D32] underline"
              >
                request deletion of your data
              </Link>{" "}
              any time.
            </span>
          </li>
        </ul>
        <p className="text-sm text-[#566B5A]">
          Read the full{" "}
          <Link
            href="/natural-farming/privacy"
            className="text-[#2E7D32] underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
