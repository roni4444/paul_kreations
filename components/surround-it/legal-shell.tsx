import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

// components/surround-it/legal-shell.tsx
// Shared chrome for the legal pages (privacy, terms, cookies, delete-account
// and the archived versions) so they look and read consistently without
// triplicating the header/typography in every page.tsx. Content itself stays
// in each page file — this is layout only, not a content template.
// Every page rendered through this shell also gets the same legal footer
// links (Privacy, Terms, Cookies, Delete account).

const HEADING = "font-[family-name:var(--font-surround-it-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

const FOOTER_LINKS = [
  { href: "/surround-it/privacy", label: "Privacy Policy" },
  { href: "/surround-it/terms", label: "Terms of Service" },
  { href: "/surround-it/cookies", label: "Cookie Policy" },
  { href: "/surround-it/delete-account", label: "Delete your data" },
] as const;

type LegalShellProps = {
  title: string;
  lastUpdated: string;
  children: ReactNode;
};

export function LegalShell({ title, lastUpdated, children }: LegalShellProps) {
  return (
    <main className="min-h-screen bg-[#081612]">
      {/* Minimal header — not the full marketing navbar, just a way back */}
      <div className="border-b border-[#263A32] bg-[#14221E]">
        <div className="max-w-[760px] mx-auto px-6 h-16 flex items-center">
          <Link
            href="/surround-it"
            className="flex items-center gap-2.5"
            aria-label="Surround It home"
          >
            <Image
              src="/apps/surround-it/icon.png"
              alt="Surround It"
              width={26}
              height={26}
              className="rounded-[6px]"
            />
            <span
              className={`${HEADING} font-semibold text-[#F4EEDA] text-[14px]`}
            >
              Surround It
            </span>
          </Link>
        </div>
      </div>

      <div className="max-w-[760px] mx-auto px-6 py-16">
        <Link
          href="/surround-it"
          className={`${MONO} inline-flex items-center gap-1.5 text-[11px] text-[#D4AF37] uppercase mb-8 hover:underline`}
        >
          ← Back to Surround It
        </Link>

        <h1 className={`${HEADING} text-[2rem] font-bold text-[#F4EEDA] mb-2`}>
          {title}
        </h1>
        <p className={`${MONO} text-[11px] text-[#8C9A90] uppercase mb-12`}>
          Last Updated: {lastUpdated}
        </p>

        <div className="flex flex-col gap-8 text-[#D8D3BF] leading-relaxed [&_h2]:font-[family-name:var(--font-surround-it-heading)] [&_h2]:text-[1.25rem] [&_h2]:font-semibold [&_h2]:text-[#F4EEDA] [&_h2]:mb-3 [&_h2]:mt-2 [&_section]:flex [&_section]:flex-col [&_section]:gap-3 [&_h2]:scroll-mt-6 [&_h3]:font-[family-name:var(--font-surround-it-heading)] [&_h3]:text-[1rem] [&_h3]:font-semibold [&_h3]:text-[#F4EEDA] [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:scroll-mt-6 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5 [&_p]:leading-relaxed [&_a]:text-[#D4AF37] [&_a]:underline">
          {children}
        </div>

        <p
          className={`${MONO} text-[10px] text-[#8C9A90] leading-relaxed mt-16 pt-8 border-t border-[#263A32]`}
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
              className="text-[#D4AF37] hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
