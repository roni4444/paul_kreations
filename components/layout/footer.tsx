import Link from "next/link";

// Mono label style — JetBrains Mono
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

const FOOTER_LINKS = [
  { href: "#products", label: "Products" },
  { href: "#services", label: "Services" },
  { href: "#team", label: "Team" },
  { href: "#roadmap", label: "What's Next" },
];

// ─── HOW TO USE YOUR LOGO ──────────────────────────────────────────────────────
// Same instructions as navbar.tsx — see the LogoMark comment there.
// Short version: import Image from "next/image", then replace the div+span below.
// ──────────────────────────────────────────────────────────────────────────────
function LogoMark() {
  return (
    <div className="size-8 rounded flex items-center justify-center bg-[#c41e3a]">
      <span className="text-white font-bold text-[13px] tracking-tight select-none">
        PK
      </span>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    // inverse-surface (#273143) — dark slate footer
    <footer className="bg-[#273143] text-white">
      <div className="max-w-[1280px] mx-auto px-10">
        {/* ── Main Footer Row ──────────────────── */}
        <div className="py-12 flex flex-col md:flex-row md:items-start justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              aria-label="Paul Kreations home"
            >
              <LogoMark />
              {/* Delete this span if your logo image already contains "Paul Kreations" */}
              <span className="font-semibold text-white tracking-[-0.01em] text-sm">
                Paul Kreations
              </span>
            </Link>
            <p className="font-[family-name:var(--font-sans)] text-sm text-white/45 leading-relaxed">
              Building thoughtful digital products — Android apps, web
              platforms, and games — with precision and craft.
            </p>

            {/* Play Store link — crimson tinted */}
            <a
              href="https://play.google.com/store/apps/developer?id=Paul+Kreations"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 border border-[#c41e3a]/40 hover:border-[#c41e3a] hover:bg-[#c41e3a]/10 transition-colors text-white/60 hover:text-white w-fit"
              aria-label="Paul Kreations on Google Play Store"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-3.5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M3.18 23.76c.34.19.72.24 1.09.14l.1-.05 11.2-6.47-2.44-2.44-9.95 8.82zm-.9-20.4A1.84 1.84 0 0 0 2 4.65v14.7c0 .52.17.96.28 1.29l.12-.07 9.8-8.67-9.92-8.54zm20.04 8.27-2.8-1.6-2.75 2.44 2.75 2.75 2.81-1.63a1.85 1.85 0 0 0 0-3.27l-.01.31zM4.27.1C3.9 0 3.52.04 3.18.23l9.92 8.8 2.44-2.44L4.35.14 4.27.1z" />
              </svg>
              <span className={`${MONO} text-[11px]`}>Google Play Store</span>
            </a>
          </div>

          {/* Navigation */}
          <div>
            <p className={`${MONO} text-[10px] text-white/30 uppercase mb-4`}>
              Navigation
            </p>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-2.5">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="font-[family-name:var(--font-sans)] text-sm text-white/45 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className={`${MONO} text-[10px] text-white/30 uppercase mb-4`}>
              Contact
            </p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href="mailto:contact@paulkreations.com"
                  className="font-[family-name:var(--font-sans)] text-sm text-white/45 hover:text-white transition-colors"
                >
                  contact@paulkreations.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────── */}
        <div className="py-5 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className={`${MONO} text-[10px] text-white/25`}>
            © {year} Paul Kreations. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <Link
              href="/tos"
              className={`${MONO} text-[10px] text-white/30 hover:text-white/60 transition-colors`}
            >
              Terms of Service
            </Link>
            <span className={`${MONO} text-[10px] text-white/25`}>
              Built with Next.js &amp; Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
