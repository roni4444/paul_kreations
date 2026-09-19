// app/sitemap.ts — auto-served at /sitemap.xml by Next.js
import type { MetadataRoute } from "next";
import { apps } from "@/lib/data";
import { BASE_URL } from "@/lib/config";

// lastModified is only set where we have a real date (app legal pages).
// Using `new Date()` stamps every URL as "changed at build time", which
// teaches Google to ignore the field. Omitting it is more honest.

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

  const wimmRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/wimm`, changeFrequency: "weekly", priority: 0.8 },
    {
      url: `${BASE_URL}/wimm/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    { url: `${BASE_URL}/wimm/terms`, changeFrequency: "yearly", priority: 0.3 },
    {
      url: `${BASE_URL}/wimm/cookies`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    // Required by Google Play for the data-deletion request path.
    {
      url: `${BASE_URL}/wimm/delete-account`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  return [
    { url: BASE_URL, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE_URL}/tos`, changeFrequency: "yearly", priority: 0.2 },
    ...privacyRoutes,
    ...wimmRoutes,
  ];
}
