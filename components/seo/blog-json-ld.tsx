// components/seo/blog-json-ld.tsx
// schema.org BlogPosting for a single post — enables article rich results.

import { BASE_URL } from "@/lib/config";
import type { BlogPostPublic } from "@/services/supabase/blog";

export function BlogPostJsonLd({ post }: { post: BlogPostPublic }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: `${BASE_URL}/blog/${post.slug}`,
    author: { "@type": "Person", name: post.authorName },
    ...(post.reviewerName
      ? { reviewedBy: { "@type": "Person", name: post.reviewerName } }
      : {}),
    publisher: { "@type": "Organization", name: "Paul Kreations" },
  };

  // "<" is escaped so a title containing "</script>" can't break out of
  // the tag.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
