// app/sitemap.ts — auto-served at /sitemap.xml by Next.js
import type { MetadataRoute } from "next";
import { apps } from "@/lib/data";
import { BASE_URL } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  // Apps with their own dedicated legal pages (landingUrl set, e.g. WIMM)
  // are excluded here — they get their real routes added explicitly below
  // instead of a generic /apps/[slug]/privacy entry.
  const privacyRoutes = apps
    .filter((app) => app.privacyPolicy)
    .map((app) => ({
      url: `${BASE_URL}/apps/${app.slug}/privacy`,
      lastModified: new Date(app.privacyPolicy!.lastUpdated),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    }));

  // WIMM's own routes — previously missing from the sitemap entirely.
  const wimmRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/wimm`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/wimm/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/wimm/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/wimm/cookies`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/tos`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    ...privacyRoutes,
    ...wimmRoutes,
  ];
}
