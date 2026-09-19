import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ── wimm.paulkreations.com → www.paulkreations.com/wimm ─────────────────
      // Lets us share the short "wimm.paulkreations.com" link while keeping
      // the app on the canonical www domain for unified SEO / analytics / auth
      // cookies. Pointing straight at www (not the apex) avoids a second
      // apex → www hop, which Vercel does not carry the path through.
      // Requires "wimm.paulkreations.com" to be added as a domain on this
      // Vercel project (see docs/DOMAIN_SETUP.md).
      {
        source: "/",
        has: [{ type: "host", value: "wimm.paulkreations.com" }],
        destination: "https://www.paulkreations.com/wimm",
        permanent: true, // 308
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "wimm.paulkreations.com" }],
        destination: "https://www.paulkreations.com/wimm/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevents your site from being embedded in an iframe on other domains
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Stops the browser from guessing the content type of a response
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Controls how much referrer info is sent when navigating away
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Restricts which browser features your site can use
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // Forces HTTPS for 1 year. Custom domain is live, so this is now on.
          // Deliberately no includeSubDomains/preload: api., latex. and monitor.
          // are separate services and preload is hard to undo.
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000",
          },
          // Content Security Policy — uncomment and tighten when ready.
          // If you enable this, add https://challenges.cloudflare.com to
          // script-src and frame-src so the Turnstile widget keeps working.
          // {
          //   key: "Content-Security-Policy",
          //   value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com;",
          // },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: "paulkreations",
  project: "paul_kreations",

  // Only print source-map upload logs in CI (keeps local dev output clean)
  silent: !process.env.CI,

  // Upload a larger set of source maps for readable stack traces
  widenClientFileUpload: true,

  // Route Sentry requests through /monitoring to bypass ad-blockers
  // Make sure this path doesn't clash with any Next.js middleware
  tunnelRoute: "/monitoring",

  // Auto-instrument Vercel Cron Monitors
  // Note: does not yet work with App Router route handlers
  automaticVercelMonitors: true,

  // Delete source maps from the deployment after uploading to Sentry.
  // Prevents your source code from being exposed in the production bundle.
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },
});
