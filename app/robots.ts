// app/robots.ts
// Next.js auto-generates /robots.txt from this file at build time.

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Privacy policy pages are useful to crawl (Play Store requires a live URL)
        // so we allow everything.
      },
    ],
    sitemap: "https://paulkreations.com/sitemap.xml",
  };
}
