// components/legal/site-legal-shell.tsx
// Shared chrome for the site-wide legal pages (privacy, cookies,
// disclaimer). Mirrors the look of app/tos/page.tsx. The WIMM legal pages
// use their own shell (components/wimm/legal-shell.tsx) — do not mix them.

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import { BASE_URL } from "@/lib/config";

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/tos", label: "Terms of Service" },
  { href: "/disclaimer", label: "Disclaimer" },
] as const;

export function formatLegalDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface SiteLegalShellProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function SiteLegalShell({
  title,
  lastUpdated,
  children,
}: SiteLegalShellProps) {
  return (
    <div className="min-h-screen bg-white text-[#111c2d]">
      <header className="border-b border-[#e3bebd] bg-white">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between gap-4 px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-[#5f5e5e] transition-colors hover:text-[#c41e3a]"
            aria-label="Back to Paul Kreations"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            <span className={`${MONO} text-[11px]`}>
              {BASE_URL.replace(/^https?:\/\//, "")}
            </span>
          </Link>
          <div className="flex items-center gap-1.5">
            <FileText size={15} className="text-[#c41e3a]" aria-hidden="true" />
            <span className={`${MONO} text-[11px] text-[#8f6f6f]`}>
              {title}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-12">
        <div className="mb-10 border-b border-[#e3bebd] pb-8">
          <div className="mb-4 inline-flex items-center gap-2 border border-[#e3bebd] bg-[#ffdad9] px-2.5 py-1">
            <span
              className={`${MONO} text-[11px] font-semibold text-[#c41e3a] uppercase`}
            >
              Legal
            </span>
          </div>
          <h1 className="mb-2 text-3xl font-bold tracking-[-0.025em] text-[#111c2d]">
            Paul Kreations
          </h1>
          <p className="mb-3 text-xl font-semibold text-[#111c2d]">{title}</p>
          <p className={`${MONO} text-[11px] text-[#8f6f6f]`}>
            Last updated: {formatLegalDate(lastUpdated)}
          </p>
        </div>

        <div className="space-y-8">{children}</div>

        <nav
          aria-label="Legal"
          className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#e3bebd] pt-6 text-sm"
        >
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#c41e3a] hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </main>

      <footer className="border-t border-[#e3bebd] bg-white">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-between gap-3 px-6 py-6 sm:flex-row">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="Paul Kreations home"
          >
            <div className="flex size-6 flex-shrink-0 items-center justify-center bg-[#c41e3a]">
              <span className="text-[10px] font-bold tracking-tight text-white select-none">
                PK
              </span>
            </div>
            <span className={`${MONO} text-[11px] text-[#5f5e5e]`}>
              Paul Kreations
            </span>
          </Link>
          <span className={`${MONO} text-[10px] text-[#8f6f6f]`}>
            © {new Date().getFullYear()} Paul Kreations. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}

/** One numbered section. Children are styled by the wrapper below. */
export function LegalSection({
  n,
  title,
  id,
  children,
}: {
  n: string;
  title: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id}>
      <h2
        id={id}
        className="mb-3 flex scroll-mt-6 items-center gap-2 text-base font-bold text-[#111c2d]"
      >
        <span className={`${MONO} w-5 text-[10px] text-[#c41e3a]`}>{n}</span>
        {title}
      </h2>
      <div className="flex flex-col gap-3 pl-7 font-[family-name:var(--font-sans)] text-sm leading-relaxed text-[#5f5e5e] [&_a]:text-[#c41e3a] [&_a]:underline [&_li]:leading-relaxed [&_strong]:font-semibold [&_strong]:text-[#111c2d] [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-1.5 [&_ul]:pl-5">
        {children}
      </div>
      <div className="mt-8 border-t border-[#e3bebd]" />
    </section>
  );
}

/** Simple responsive table for providers / cookies. */
export function SiteLegalTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-left text-[13px]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c}
                scope="col"
                className={`${MONO} border border-[#e3bebd] bg-[#fff5f5] px-3 py-2 text-[10px] font-medium text-[#111c2d] uppercase`}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="border border-[#e3bebd] px-3 py-2 align-top"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
