// app/sitemap.ts
// Next.js auto-generates /sitemap.xml from this file at build time.
// Update BASE_URL to your production domain before deploying.

import type { MetadataRoute } from "next";
import { apps } from "@/lib/data";

const BASE_URL = "https://paul-kreations.vercel.app"; // ← update to your domain

export default function sitemap(): MetadataRoute.Sitemap {
  const privacyPolicyRoutes = apps.map((app) => ({
    url: `${BASE_URL}/apps/${app.slug}/privacy`,
    lastModified: new Date(app.privacyPolicy.lastUpdated),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    ...privacyPolicyRoutes,
  ];
}
