// app/robots.ts — auto-served at /robots.txt by Next.js
import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Internal tools and infrastructure — never useful in search or AI answers.
        disallow: ["/admin", "/wimm/admin", "/monitoring"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
