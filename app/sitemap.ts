// app/sitemap.ts — auto-served at /sitemap.xml by Next.js
import type { MetadataRoute } from "next";
import { apps } from "@/lib/data";
import { BASE_URL } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const privacyRoutes = apps.map((app) => ({
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
    {
      url: `${BASE_URL}/tos`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    ...privacyRoutes,
  ];
}
