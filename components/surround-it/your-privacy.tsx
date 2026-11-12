import Link from "next/link";
import { Check } from "lucide-react";
import { surroundItPrivacyPoints } from "@/lib/data/surround-it";

const HEADING = "font-[family-name:var(--font-surround-it-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

// Every line in surroundItPrivacyPoints restates the Privacy Policy
// (app/surround-it/privacy/page.tsx). Keep it to what the policy says.

export function SurroundItYourPrivacy() {
  return (
    <section
      id="your-privacy"
      aria-labelledby="your-privacy-heading"
      className="py-16 bg-[#081612]"
    >
      <div className="max-w-[760px] mx-auto px-6 md:px-10">
        <span
          className={`${MONO} inline-block text-[11px] text-[#D4AF37] uppercase mb-3`}
        >
          Your privacy
        </span>
        <h2
          id="your-privacy-heading"
          className={`${HEADING} text-[1.5rem] font-bold tracking-[-0.02em] text-[#F4EEDA] leading-tight mb-5`}
        >
          Plain-language privacy
        </h2>
        <ul className="flex flex-col gap-2.5 mb-6">
          {surroundItPrivacyPoints.map((point) => (
            <li key={point} className="flex items-start gap-2.5">
              <Check
                size={14}
                className="text-[#D4AF37] mt-1 flex-shrink-0"
                aria-hidden="true"
              />
              <span className="text-[#C9C3AE] leading-relaxed">{point}</span>
            </li>
          ))}
          <li className="flex items-start gap-2.5">
            <Check
              size={14}
              className="text-[#D4AF37] mt-1 flex-shrink-0"
              aria-hidden="true"
            />
            <span className="text-[#C9C3AE] leading-relaxed">
              You can{" "}
              <Link
                href="/surround-it/delete-account"
                className="text-[#D4AF37] underline"
              >
                request deletion of your data
              </Link>{" "}
              any time.
            </span>
          </li>
        </ul>
        <p className="text-sm text-[#A9B3A8]">
          Read the full{" "}
          <Link
            href="/surround-it/privacy"
            className="text-[#D4AF37] underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
