import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

// components/natural-farming/legal-shell.tsx
// Shared chrome for the legal pages (privacy, terms, cookies, delete-account
// and the archived versions) so they look and read consistently without
// triplicating the header/typography in every page.tsx. Content itself stays
// in each page file — this is layout only, not a content template.
// Every page rendered through this shell also gets the same legal footer
// links (Privacy, Terms, Cookies, Delete account).

const HEADING = "font-[family-name:var(--font-natural-farming-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

const FOOTER_LINKS = [
  { href: "/natural-farming/privacy", label: "Privacy Policy" },
  { href: "/natural-farming/terms", label: "Terms of Service" },
  { href: "/natural-farming/cookies", label: "Cookie Policy" },
  { href: "/natural-farming/delete-account", label: "Delete your data" },
] as const;

type LegalShellProps = {
  title: string;
  lastUpdated: string;
  children: ReactNode;
};

export function LegalShell({ title, lastUpdated, children }: LegalShellProps) {
  return (
    <main className="min-h-screen bg-[#F9FBF9]">
      {/* Minimal header — not the full marketing navbar, just a way back */}
      <div className="border-b border-[#D6E6D6] bg-[#FFFFFF]">
        <div className="max-w-[760px] mx-auto px-6 h-16 flex items-center">
          <Link
            href="/natural-farming"
            className="flex items-center gap-2.5"
            aria-label="Natural Farming home"
          >
            <Image
              src="/apps/natural-farming/icon.png"
              alt="Natural Farming"
              width={26}
              height={26}
              className="rounded-[6px]"
            />
            <span
              className={`${HEADING} font-semibold text-[#1B2E1C] text-[14px]`}
            >
              Natural Farming
            </span>
          </Link>
        </div>
      </div>

      <div className="max-w-[760px] mx-auto px-6 py-16">
        <Link
          href="/natural-farming"
          className={`${MONO} inline-flex items-center gap-1.5 text-[11px] text-[#2E7D32] uppercase mb-8 hover:underline`}
        >
          ← Back to Natural Farming
        </Link>

        <h1 className={`${HEADING} text-[2rem] font-bold text-[#1B2E1C] mb-2`}>
          {title}
        </h1>
        <p className={`${MONO} text-[11px] text-[#6B8470] uppercase mb-12`}>
          Last Updated: {lastUpdated}
        </p>

        <div className="flex flex-col gap-8 text-[#33473A] leading-relaxed [&_h2]:font-[family-name:var(--font-natural-farming-heading)] [&_h2]:text-[1.25rem] [&_h2]:font-semibold [&_h2]:text-[#1B2E1C] [&_h2]:mb-3 [&_h2]:mt-2 [&_section]:flex [&_section]:flex-col [&_section]:gap-3 [&_h2]:scroll-mt-6 [&_h3]:font-[family-name:var(--font-natural-farming-heading)] [&_h3]:text-[1rem] [&_h3]:font-semibold [&_h3]:text-[#1B2E1C] [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:scroll-mt-6 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5 [&_p]:leading-relaxed [&_a]:text-[#2E7D32] [&_a]:underline">
          {children}
        </div>

        <p
          className={`${MONO} text-[10px] text-[#6B8470] leading-relaxed mt-16 pt-8 border-t border-[#D6E6D6]`}
        >
          This document is provided for informational purposes only. It does not
          constitute legal advice.
        </p>

        <nav
          aria-label="Legal"
          className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm"
        >
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#2E7D32] hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
