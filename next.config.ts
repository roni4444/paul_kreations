import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevents your site from being embedded in an iframe on other domains
          // Protects against clickjacking attacks
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          // Stops the browser from guessing the content type of a response
          // Prevents MIME-type sniffing attacks
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Controls how much referrer info is sent when navigating away
          // Visitors going to external links won't expose your full URL
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Restricts which browser features your site can use
          // Disables access to camera, microphone, location etc.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // Forces HTTPS for 1 year — only enable once your custom domain is live
          // Leave commented out on vercel.app (Vercel already handles HTTPS)
          // {
          //   key: "Strict-Transport-Security",
          //   value: "max-age=31536000; includeSubDomains; preload",
          // },
          // Content Security Policy — uncomment and tighten when on custom domain
          // This is a permissive starting point that won't break anything
          // {
          //   key: "Content-Security-Policy",
          //   value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com;",
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
