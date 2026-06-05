import Link from "next/link";

const FOOTER_LINKS = [
  { href: "#products", label: "Products" },
  { href: "#services", label: "Services" },
  { href: "#team", label: "Team" },
  { href: "#roadmap", label: "What's Next" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1c1d] text-white">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* ── Main Footer Row ─────────────────── */}
        <div className="py-12 flex flex-col md:flex-row md:items-start justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              aria-label="Paul Kreations home"
            >
              <div className="size-8 rounded-lg bg-[#3c52c0] flex items-center justify-center shadow-sm shadow-[#3c52c0]/30">
                <span className="text-white font-bold text-[13px] tracking-tight select-none">
                  PK
                </span>
              </div>
              <span className="font-semibold text-white tracking-[-0.01em] text-sm">
                Paul Kreations
              </span>
            </Link>
            <p className="text-sm text-[rgba(255,255,255,0.45)] leading-relaxed">
              Building thoughtful digital products — Android apps, web
              platforms, and games — with precision and craft.
            </p>

            {/* Play Store link */}
            <a
              href="https://play.google.com/store/apps/developer?id=Paul+Kreations"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-xs font-medium text-white/70 hover:text-white w-fit"
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
              Google Play Store
            </a>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.1em] font-semibold text-white/30 mb-4">
              Navigation
            </p>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-2.5">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
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
            <p className="text-[10px] uppercase tracking-[0.1em] font-semibold text-white/30 mb-4">
              Contact
            </p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href="mailto:debapriyopaul.dp@gmail.com"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  debapriyopaul.dp@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────── */}
        <div className="py-5 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <span>© {year} Paul Kreations. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            Built with
            <span className="text-white/50">Next.js</span>
            &amp;
            <span className="text-white/50">Tailwind CSS</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
