import { apps } from "@/lib/data";
import { ExternalLink, Star, Download } from "lucide-react";

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
          size={11}
          className={
            i < full
              ? "text-[#af6200] fill-[#af6200]"
              : half && i === full
                ? "text-[#af6200] fill-[#af6200]/40"
                : "text-[#c5c5d5] fill-[#c5c5d5]"
          }
        />
      ))}
    </span>
  );
}

export function Apps() {
  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* ── Section Header ──────────────────── */}
        <div className="max-w-lg mb-16">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#dee0ff] mb-4">
            {/* Google Play icon */}
            <svg
              viewBox="0 0 24 24"
              className="size-3.5 fill-[#3c52c0]"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M3.18 23.76c.34.19.72.24 1.09.14l.1-.05 11.2-6.47-2.44-2.44-9.95 8.82zm-.9-20.4A1.84 1.84 0 0 0 2 4.65v14.7c0 .52.17.96.28 1.29l.12-.07 9.8-8.67-9.92-8.54zm20.04 8.27-2.8-1.6-2.75 2.44 2.75 2.75 2.81-1.63a1.85 1.85 0 0 0 0-3.27l-.01.31zM4.27.1C3.9 0 3.52.04 3.18.23l9.92 8.8 2.44-2.44L4.35.14 4.27.1z" />
            </svg>
            <span className="text-xs font-semibold text-[#3c52c0] uppercase tracking-wide">
              Google Play Store
            </span>
          </div>
          <h2 className="text-[2rem] font-bold tracking-[-0.025em] text-[#1a1c1d] leading-tight mb-3">
            Our Products
          </h2>
          <p className="text-[#444653] leading-relaxed">
            Apps and games designed and engineered by Paul Kreations — available
            now on Android.
          </p>
        </div>

        {/* ── App Cards Grid ──────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {apps.map((app, index) => (
            <article
              key={app.id}
              className="group relative flex flex-col bg-white rounded-xl border border-[#e2e2e4] shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.08)]"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Icon area */}
              <div
                className="relative h-32 flex items-center justify-center overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${app.colorFrom} 0%, ${app.colorTo} 100%)`,
                }}
                aria-hidden="true"
              >
                {/* Subtle noise overlay */}
                <div
                  className="absolute inset-0 opacity-20 mix-blend-soft-light"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />
                <div className="relative z-10 size-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-black/10">
                  <span className="text-3xl" role="img" aria-label={app.name}>
                    {app.emoji}
                  </span>
                </div>

                {/* Type badge */}
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide bg-black/20 text-white backdrop-blur-sm">
                  {app.type}
                </span>
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-5">
                {/* Category */}
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#757684] mb-1.5">
                  {app.category}
                </span>

                {/* Name + tagline */}
                <h3 className="font-bold text-[#1a1c1d] text-lg leading-tight tracking-[-0.01em] mb-1">
                  {app.name}
                </h3>
                <p className="text-sm font-medium text-[#576cdb] mb-3">
                  {app.tagline}
                </p>

                {/* Description */}
                <p className="text-sm text-[#444653] leading-relaxed flex-1 mb-4">
                  {app.description}
                </p>

                {/* Meta row */}
                <div className="flex items-center justify-between text-xs text-[#757684] mb-4 pt-4 border-t border-[#f3f3f5]">
                  <span className="flex items-center gap-1.5">
                    <Download size={11} />
                    {app.downloads}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <RatingStars rating={app.rating} />
                    <span className="font-medium text-[#444653]">
                      {app.rating}
                    </span>
                  </span>
                </div>

                {/* CTA */}
                <a
                  href={app.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-[#3c52c0] bg-[#dee0ff] hover:bg-[#bac3ff] transition-colors"
                  aria-label={`View ${app.name} on Google Play`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-3.5 fill-[#3c52c0]"
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
            className="inline-flex items-center gap-2 text-sm text-[#444653] hover:text-[#3c52c0] transition-colors font-medium"
          >
            See all on Google Play Store
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
