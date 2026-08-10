import Link from "next/link";
import Image from "next/image";

const HEADING = "font-[family-name:var(--font-wimm-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export function WimmFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0D231C] text-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="py-12 flex flex-col md:flex-row md:items-start justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <Link
              href="/wimm"
              className="flex items-center gap-2.5"
              aria-label="Where Is My Money? home"
            >
              <Image
                src="/wimm/icon.png"
                alt="Where Is My Money?"
                width={28}
                height={28}
                className="rounded-full"
              />
              <span
                className={`${HEADING} font-semibold text-white tracking-[-0.01em] text-sm`}
              >
                Where Is My Money?
              </span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed">
              A complete personal finance operating system, built for India — by
              Paul Kreations.
            </p>
            <Link
              href="/"
              className="text-xs text-white/40 hover:text-white transition-colors w-fit"
            >
              ← Back to paulkreations.com
            </Link>
          </div>

          {/* Legal */}
          <div>
            <p className={`${MONO} text-[10px] text-white/35 uppercase mb-4`}>
              Legal
            </p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="/wimm/privacy"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/wimm/terms"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/wimm/cookies"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className={`${MONO} text-[10px] text-white/35 uppercase mb-4`}>
              Contact
            </p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href="mailto:support@mail.paulkreations.com"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  support@mail.paulkreations.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="py-5 border-t border-white/[0.08]">
          <p
            className={`${MONO} text-[9px] text-white/30 leading-relaxed max-w-[720px]`}
          >
            Where Is My Money? is a personal finance tracking tool. It does not
            provide financial, tax, or investment advice. Figures such as XIRR,
            credit health scores, and tax estimates are calculated for
            informational purposes only — verify independently before making
            financial decisions.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className={`${MONO} text-[10px] text-white/30`}>
            © {year} Paul Kreations. All rights reserved.
          </span>
          <span className={`${MONO} text-[10px] text-white/30`}>
            Built with Next.js &amp; Tailwind CSS
          </span>
        </div>
      </div>
    </footer>
  );
}
