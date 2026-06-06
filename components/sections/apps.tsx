// Server Component — image error handling is delegated to components/apps/app-images.tsx (client)
import { apps } from "@/lib/data";
import { AppIcon, FeatureGraphic } from "@/components/apps/app-images";
import { Download, ExternalLink, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";
const DEVICON_BASE =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

/** Renders a single tech stack icon with a CSS-only tooltip.
 *  Priority: localIconPath → deviconPath → text badge fallback.
 *  - localIconPath : put files in public/tech-icons/
 *  - deviconPath   : served from the devicons CDN
 *  - neither set   : name shown as a small mono chip (last resort)
 */
function TechIcon({ tech }: { tech: import("@/lib/data").TechStackItem }) {
  const src = tech.localIconPath
    ? tech.localIconPath
    : tech.deviconPath
      ? `${DEVICON_BASE}/${tech.deviconPath}.svg`
      : null;

  return (
    <div className="relative group/tip flex-shrink-0">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={tech.name}
          width={24}
          height={24}
          className="size-6 object-contain"
          loading="lazy"
        />
      ) : (
        /* Text-badge fallback — used when neither icon source is available */
        <span
          className={`${MONO} inline-block px-1.5 py-0.5 text-[9px] font-medium border border-[#e3bebd] text-[#5f5e5e] leading-tight whitespace-nowrap`}
          aria-label={tech.name}
        >
          {tech.name}
        </span>
      )}
      {/* CSS-only tooltip — shown on hover, no JS needed */}
      <span
        className={`${MONO} pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 text-[10px] bg-[#111c2d] text-white opacity-0 group-hover/tip:opacity-100 transition-opacity duration-150 z-10`}
        aria-hidden="true"
      >
        {tech.name}
      </span>
    </div>
  );
}

function RatingStars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={10}
          className={
            i < full
              ? "text-[#c41e3a] fill-[#c41e3a]"
              : half && i === full
                ? "text-[#c41e3a] fill-[#c41e3a]/40"
                : "text-[#e3bebd] fill-[#e3bebd]"
          }
        />
      ))}
    </span>
  );
}

export function Apps() {
  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-10">
        {/* ── Section Header ───────────────────── */}
        <div className="max-w-lg mb-16">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-4 border border-[#e3bebd] bg-[#ffdad9]">
            <svg
              viewBox="0 0 24 24"
              className="size-3 fill-[#c41e3a]"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M3.18 23.76c.34.19.72.24 1.09.14l.1-.05 11.2-6.47-2.44-2.44-9.95 8.82zm-.9-20.4A1.84 1.84 0 0 0 2 4.65v14.7c0 .52.17.96.28 1.29l.12-.07 9.8-8.67-9.92-8.54zm20.04 8.27-2.8-1.6-2.75 2.44 2.75 2.75 2.81-1.63a1.85 1.85 0 0 0 0-3.27l-.01.31zM4.27.1C3.9 0 3.52.04 3.18.23l9.92 8.8 2.44-2.44L4.35.14 4.27.1z" />
            </svg>
            <span
              className={`${MONO} text-[11px] font-semibold text-[#c41e3a] uppercase`}
            >
              Google Play Store
            </span>
          </div>
          <h2 className="text-[2rem] font-bold tracking-[-0.025em] text-[#111c2d] leading-tight mb-3">
            Our Products
          </h2>
          <p className="font-[family-name:var(--font-sans)] text-[#5f5e5e] leading-relaxed">
            Apps and games designed and engineered by Paul Kreations — available
            now on Android.
          </p>
        </div>

        {/* ── App Cards ────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {apps.map((app) => (
            <article
              key={app.id}
              className="group flex flex-col bg-white border border-[#e3bebd] overflow-hidden hover:border-[#c41e3a] hover:shadow-[0px_4px_20px_rgba(196,30,58,0.08)] transition-all duration-200"
            >
              {/* ── Feature Graphic (1024x500) ──── */}
              {/* FeatureGraphic is a Client Component — handles onError → gradient fallback */}
              <FeatureGraphic app={app} />

              {/* ── Card Body ──────────────────── */}
              <div className="flex flex-col flex-1 p-5 gap-4">
                {/* Category + Type badge */}
                <div className="flex items-center justify-between">
                  <span
                    className={`${MONO} text-[10px] text-[#8f6f6f] uppercase`}
                  >
                    {app.category}
                  </span>
                  <span
                    className={`${MONO} text-[10px] px-1.5 py-0.5 border border-[#e3bebd] text-[#8f6f6f] uppercase`}
                  >
                    {app.type}
                  </span>
                </div>

                {/* App Name (left) + App Icon 512x512→40x40 (right) */}
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-bold text-[#111c2d] text-lg leading-tight tracking-[-0.01em] truncate">
                      {app.name}
                    </h3>
                    <p className={`${MONO} text-[11px] text-[#c41e3a] mt-0.5`}>
                      {app.tagline}
                    </p>
                  </div>
                  {/* AppIcon is a Client Component — handles onError → letter fallback */}
                  <AppIcon app={app} />
                </div>

                {/* Description */}
                <p className="font-[family-name:var(--font-sans)] text-sm text-[#5f5e5e] leading-relaxed flex-1">
                  {app.description}
                </p>

                {/* ── Tech Stack ─────────────────── */}
                <div className="pt-3 border-t border-[#e3bebd]">
                  <p
                    className={`${MONO} text-[10px] text-[#8f6f6f] uppercase mb-2.5`}
                  >
                    Built with
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {app.techStack.map((tech) => (
                      <TechIcon key={tech.name} tech={tech} />
                    ))}
                  </div>
                </div>

                {/* ── Meta ───────────────────────── */}
                <div className="flex items-center justify-between px-3 py-2 bg-[#fff5f5] border border-[#e3bebd]">
                  <span
                    className={`${MONO} text-[10px] text-[#8f6f6f] flex items-center gap-1.5`}
                  >
                    <Download size={10} aria-hidden="true" />
                    {app.downloads}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <RatingStars rating={app.rating} />
                    <span
                      className={`${MONO} text-[10px] font-medium text-[#5f5e5e]`}
                    >
                      {app.rating.toFixed(1)}
                    </span>
                  </span>
                </div>

                {/* ── Actions ────────────────────── */}
                <div className="flex items-center gap-2">
                  <a
                    href={app.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#c41e3a] hover:bg-[#9e0027] text-white text-xs font-semibold transition-colors"
                    aria-label={`View ${app.name} on Google Play`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-3 fill-current flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M3.18 23.76c.34.19.72.24 1.09.14l.1-.05 11.2-6.47-2.44-2.44-9.95 8.82zm-.9-20.4A1.84 1.84 0 0 0 2 4.65v14.7c0 .52.17.96.28 1.29l.12-.07 9.8-8.67-9.92-8.54zm20.04 8.27-2.8-1.6-2.75 2.44 2.75 2.75 2.81-1.63a1.85 1.85 0 0 0 0-3.27l-.01.31zM4.27.1C3.9 0 3.52.04 3.18.23l9.92 8.8 2.44-2.44L4.35.14 4.27.1z" />
                    </svg>
                    Play Store
                    <ExternalLink size={10} aria-hidden="true" />
                  </a>
                  <Link
                    href={`/apps/${app.slug}/privacy`}
                    className="flex items-center gap-1.5 px-3 py-2.5 border border-[#e3bebd] hover:border-[#c41e3a] text-[#8f6f6f] hover:text-[#c41e3a] transition-colors"
                    aria-label={`${app.name} Privacy Policy`}
                    title="Privacy Policy"
                  >
                    <ShieldCheck size={13} aria-hidden="true" />
                    <span className={`${MONO} text-[10px]`}>Privacy</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── Play Store Profile ────────────────── */}
        <div className="mt-10 text-center">
          <a
            href="https://play.google.com/store/apps/developer?id=Paul+Kreations"
            target="_blank"
            rel="noopener noreferrer"
            className={`${MONO} inline-flex items-center gap-2 text-[11px] text-[#8f6f6f] hover:text-[#c41e3a] transition-colors`}
          >
            See all on Google Play Store
            <ExternalLink size={11} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
