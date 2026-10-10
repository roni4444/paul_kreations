import Link from "next/link";
import { Check } from "lucide-react";

const HEADING = "font-[family-name:var(--font-wimm-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

// Every line here restates the Privacy Policy (app/wimm/privacy/page.tsx).
// Keep it to what the policy says.
const points = [
  "Your financial data stays on your device by default.",
  "Cloud sync is optional and part of Premium.",
  "Our cloud database is hosted in Mumbai, India.",
] as const;

export function WimmYourPrivacy() {
  return (
    <section
      id="your-privacy"
      aria-labelledby="your-privacy-heading"
      className="py-16 bg-[#F6FAF8]"
    >
      <div className="max-w-[760px] mx-auto px-6 md:px-10">
        <span
          className={`${MONO} inline-block text-[11px] text-[#0F7A4E] uppercase mb-3`}
        >
          Your privacy
        </span>
        <h2
          id="your-privacy-heading"
          className={`${HEADING} text-[1.5rem] font-bold tracking-[-0.02em] text-[#0E2A20] leading-tight mb-5`}
        >
          You decide where your data lives
        </h2>
        <ul className="flex flex-col gap-2.5 mb-6">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-2.5">
              <Check
                size={14}
                className="text-[#0F7A4E] mt-1 flex-shrink-0"
                aria-hidden="true"
              />
              <span className="text-[#4A5A52] leading-relaxed">{point}</span>
            </li>
          ))}
          <li className="flex items-start gap-2.5">
            <Check
              size={14}
              className="text-[#0F7A4E] mt-1 flex-shrink-0"
              aria-hidden="true"
            />
            <span className="text-[#4A5A52] leading-relaxed">
              You can{" "}
              <Link
                href="/wimm/delete-account"
                className="text-[#0F7A4E] underline"
              >
                delete your account
              </Link>{" "}
              any time.
            </span>
          </li>
        </ul>
        <p className="text-sm text-[#5B6E64]">
          Read the full{" "}
          <Link href="/wimm/privacy" className="text-[#0F7A4E] underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
