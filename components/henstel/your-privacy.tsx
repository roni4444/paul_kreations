import Link from "next/link";
import { Check } from "lucide-react";
import { henstelPrivacyPoints } from "@/lib/data/henstel";

const HEADING = "font-[family-name:var(--font-henstel-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

// Every line in henstelPrivacyPoints restates the Privacy Policy
// (app/henstel/privacy/page.tsx). Keep it to what the policy says.

export function HenstelYourPrivacy() {
  return (
    <section
      id="your-privacy"
      aria-labelledby="your-privacy-heading"
      className="py-16 bg-[#FBF6EC]"
    >
      <div className="max-w-[760px] mx-auto px-6 md:px-10">
        <span
          className={`${MONO} inline-block text-[11px] text-[#2E6B3F] uppercase mb-3`}
        >
          Your privacy
        </span>
        <h2
          id="your-privacy-heading"
          className={`${HEADING} text-[1.5rem] font-bold tracking-[-0.02em] text-[#3B2A18] leading-tight mb-5`}
        >
          Plain-language privacy
        </h2>
        <ul className="flex flex-col gap-2.5 mb-6">
          {henstelPrivacyPoints.map((point) => (
            <li key={point} className="flex items-start gap-2.5">
              <Check
                size={14}
                className="text-[#2E6B3F] mt-1 flex-shrink-0"
                aria-hidden="true"
              />
              <span className="text-[#5C4A36] leading-relaxed">{point}</span>
            </li>
          ))}
          <li className="flex items-start gap-2.5">
            <Check
              size={14}
              className="text-[#2E6B3F] mt-1 flex-shrink-0"
              aria-hidden="true"
            />
            <span className="text-[#5C4A36] leading-relaxed">
              You can{" "}
              <Link
                href="/henstel/delete-account"
                className="text-[#2E6B3F] underline"
              >
                request deletion of your data
              </Link>{" "}
              any time.
            </span>
          </li>
        </ul>
        <p className="text-sm text-[#7A6850]">
          Read the full{" "}
          <Link href="/henstel/privacy" className="text-[#2E6B3F] underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
