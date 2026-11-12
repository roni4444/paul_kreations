import Link from "next/link";
import Image from "next/image";
import {
  SURROUND_IT_DISCLAIMER,
  SURROUND_IT_FOOTER_BLURB,
  SURROUND_IT_SUPPORT_EMAIL,
} from "@/lib/data/surround-it";

const HEADING = "font-[family-name:var(--font-surround-it-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

const LEGAL_LINKS = [
  { href: "/surround-it/privacy", label: "Privacy Policy" },
  { href: "/surround-it/terms", label: "Terms of Service" },
  { href: "/surround-it/cookies", label: "Cookie Policy" },
  { href: "/surround-it/delete-account", label: "Delete your data" },
] as const;

export function SurroundItFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#050E0B] text-[#F4F4F0]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="py-12 flex flex-col md:flex-row md:items-start justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <Link
              href="/surround-it"
              className="flex items-center gap-2.5"
              aria-label="Surround It home"
            >
              <Image
                src="/apps/surround-it/icon.png"
                alt="Surround It"
                width={28}
                height={28}
                className="rounded-[6px]"
              />
              <span
                className={`${HEADING} font-semibold text-white tracking-[-0.01em] text-sm`}
              >
                Surround It
              </span>
            </Link>
            <p className="text-sm text-white/55 leading-relaxed">
              {SURROUND_IT_FOOTER_BLURB}
            </p>
            <Link
              href="/"
              className="text-xs text-white/45 hover:text-white transition-colors w-fit"
            >
              ← Back to paulkreations.com
            </Link>
          </div>

          {/* Legal */}
          <div>
            <p className={`${MONO} text-[10px] text-white/40 uppercase mb-4`}>
              Legal
            </p>
            <ul className="flex flex-col gap-2.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/55 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="#faq"
                  className="text-sm text-white/55 hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className={`${MONO} text-[10px] text-white/40 uppercase mb-4`}>
              Contact
            </p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href={`mailto:${SURROUND_IT_SUPPORT_EMAIL}`}
                  className="text-sm text-white/55 hover:text-white transition-colors"
                >
                  {SURROUND_IT_SUPPORT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="py-5 border-t border-white/[0.08]">
          <p
            className={`${MONO} text-[9px] text-white/35 leading-relaxed max-w-[720px]`}
          >
            {SURROUND_IT_DISCLAIMER}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className={`${MONO} text-[10px] text-white/35`}>
            © {year} Paul Kreations. All rights reserved.
          </span>
          <span className={`${MONO} text-[10px] text-white/35`}>
            Built with Next.js &amp; Tailwind CSS
          </span>
        </div>
      </div>
    </footer>
  );
}
