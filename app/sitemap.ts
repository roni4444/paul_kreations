// app/sitemap.ts — auto-served at /sitemap.xml by Next.js
import type { MetadataRoute } from "next";
import * as Sentry from "@sentry/nextjs";
import { BASE_URL } from "@/lib/config";
import { listPublishedPosts } from "@/services/supabase/blog";

// Blog posts come from the database, so the sitemap is regenerated at most
// hourly (and immediately when staff save — see server/actions/blog.ts).
export const revalidate = 3600;

// lastModified is only set where we have a real date (blog posts). Using `new Date()` stamps every URL as "changed at build
// time", which teaches Google to ignore the field. Omitting it is more
// honest.

async function getBlogRoutes(): Promise<MetadataRoute.Sitemap> {
  try {
    const posts = await listPublishedPosts();
    return [
      { url: `${BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.7 },
      ...posts.map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  } catch (err) {
    // A database problem must not take the whole sitemap down — fall back
    // to the static routes, but report it.
    Sentry.captureException(err);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Every app has its own landing page and dedicated legal pages. Archived
  // (superseded) versions under /<slug>/privacy/archive/ are deliberately not
  // listed — they are noindex.
  const appRoutes = (slug: string): MetadataRoute.Sitemap => [
    { url: `${BASE_URL}/${slug}`, changeFrequency: "weekly", priority: 0.8 },
    {
      url: `${BASE_URL}/${slug}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/${slug}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/${slug}/cookies`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    // Required by Google Play for the data-deletion request path.
    {
      url: `${BASE_URL}/${slug}/delete-account`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const appLegalAndLandingRoutes: MetadataRoute.Sitemap = [
    "wimm",
    "henstel",
    "natural-farming",
    "surround-it",
  ].flatMap(appRoutes);

  return [
    { url: BASE_URL, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE_URL}/about`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/tos`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/cookies`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/disclaimer`, changeFrequency: "yearly", priority: 0.2 },
    ...appLegalAndLandingRoutes,
    ...(await getBlogRoutes()),
  ];
}
