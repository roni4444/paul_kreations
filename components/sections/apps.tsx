import { apps } from "@/lib/data";
import { Download, ExternalLink, Star } from "lucide-react";

// Mono label style — JetBrains Mono
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

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
          {/* JetBrains Mono label */}
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

        {/* ── App Cards Grid ───────────────────── */}
        {/* Flat cards per design spec — 1px border, no shadow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {apps.map((app, index) => (
            <article
              key={app.id}
              className="group flex flex-col bg-white border border-[#e3bebd] overflow-hidden hover:border-[#c41e3a] hover:shadow-[0px_4px_20px_rgba(196,30,58,0.08)] transition-all duration-200"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Icon area — Rose Mist card header per spec */}
              <div
                className="relative h-28 flex items-center justify-center overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${app.colorFrom} 0%, ${app.colorTo} 100%)`,
                }}
                aria-hidden="true"
              >
                {/* Subtle noise texture */}
                <div
                  className="absolute inset-0 opacity-15 mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />
                <div className="relative z-10 size-14 bg-black/15 flex items-center justify-center">
                  <span className="text-3xl" role="img" aria-label={app.name}>
                    {app.emoji}
                  </span>
                </div>

                {/* Type badge — JetBrains Mono */}
                <span
                  className={`${MONO} absolute top-3 right-3 px-2 py-0.5 text-[10px] font-medium uppercase bg-black/25 text-white`}
                >
                  {app.type}
                </span>
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-5">
                {/* Category — JetBrains Mono label */}
                <span
                  className={`${MONO} text-[10px] text-[#8f6f6f] mb-1.5 uppercase`}
                >
                  {app.category}
                </span>

                {/* Name */}
                <h3 className="font-bold text-[#111c2d] text-lg leading-tight tracking-[-0.01em] mb-1">
                  {app.name}
                </h3>

                {/* Tagline — crimson */}
                <p className={`${MONO} text-[11px] text-[#c41e3a] mb-3`}>
                  {app.tagline}
                </p>

                {/* Description — Inter body */}
                <p className="font-[family-name:var(--font-sans)] text-sm text-[#5f5e5e] leading-relaxed flex-1 mb-4">
                  {app.description}
                </p>

                {/* Meta — Rose Mist header tint per design spec */}
                <div className="flex items-center justify-between px-3 py-2 mb-4 bg-[#fff5f5] border border-[#e3bebd]">
                  <span
                    className={`${MONO} text-[10px] text-[#8f6f6f] flex items-center gap-1.5`}
                  >
                    <Download size={10} />
                    {app.downloads}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <RatingStars rating={app.rating} />
                    <span
                      className={`${MONO} text-[10px] font-medium text-[#5f5e5e]`}
                    >
                      {app.rating}
                    </span>
                  </span>
                </div>

                {/* CTA — crimson outline per design spec for secondary button */}
                <a
                  href={app.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded border border-[#c41e3a] text-[#c41e3a] hover:bg-[#c41e3a] hover:text-white text-sm font-semibold transition-colors"
                  aria-label={`View ${app.name} on Google Play`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-3.5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M3.18 23.76c.34.19.72.24 1.09.14l.1-.05 11.2-6.47-2.44-2.44-9.95 8.82zm-.9-20.4A1.84 1.84 0 0 0 2 4.65v14.7c0 .52.17.96.28 1.29l.12-.07 9.8-8.67-9.92-8.54zm20.04 8.27-2.8-1.6-2.75 2.44 2.75 2.75 2.81-1.63a1.85 1.85 0 0 0 0-3.27l-.01.31zM4.27.1C3.9 0 3.52.04 3.18.23l9.92 8.8 2.44-2.44L4.35.14 4.27.1z" />
                  </svg>
                  View on Play Store
                  <ExternalLink size={11} />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* ── Play Store Profile Link ──────────── */}
        <div className="mt-10 text-center">
          <a
            href="https://play.google.com/store/apps/developer?id=Paul+Kreations"
            target="_blank"
            rel="noopener noreferrer"
            className={`${MONO} inline-flex items-center gap-2 text-[11px] text-[#8f6f6f] hover:text-[#c41e3a] transition-colors`}
          >
            See all on Google Play Store
            <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </section>
  );
}
