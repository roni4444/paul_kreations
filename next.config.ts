import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
