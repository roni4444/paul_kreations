import Link from "next/link";
import Image from "next/image";
import {
  HENSTEL_DISCLAIMER,
  HENSTEL_FOOTER_BLURB,
  HENSTEL_SUPPORT_EMAIL,
} from "@/lib/data/henstel";

const HEADING = "font-[family-name:var(--font-henstel-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

const LEGAL_LINKS = [
  { href: "/henstel/privacy", label: "Privacy Policy" },
  { href: "/henstel/terms", label: "Terms of Service" },
  { href: "/henstel/cookies", label: "Cookie Policy" },
  { href: "/henstel/delete-account", label: "Delete account" },
] as const;

export function HenstelFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#2A1D10] text-[#F4F4F0]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="py-12 flex flex-col md:flex-row md:items-start justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <Link
              href="/henstel"
              className="flex items-center gap-2.5"
              aria-label="Henstel home"
            >
              <Image
                src="/apps/henstel/icon.png"
                alt="Henstel"
                width={28}
                height={28}
                className="rounded-[6px]"
              />
              <span
                className={`${HEADING} font-semibold text-white tracking-[-0.01em] text-sm`}
              >
                Henstel
              </span>
            </Link>
            <p className="text-sm text-white/55 leading-relaxed">
              {HENSTEL_FOOTER_BLURB}
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
                  href={`mailto:${HENSTEL_SUPPORT_EMAIL}`}
                  className="text-sm text-white/55 hover:text-white transition-colors"
                >
                  {HENSTEL_SUPPORT_EMAIL}
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
            {HENSTEL_DISCLAIMER}
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
