// components/blog/post-meta.tsx
// Byline shared by the blog list and the post page: author, reviewer
// (when someone other than the author last edited it) and last-updated
// date. Server-safe — no hooks.

import type { BlogPostSummary } from "@/services/supabase/blog";

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export function formatBlogDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
  });
}

export function PostMeta({ post }: { post: BlogPostSummary }) {
  return (
    <p
      className={`${MONO} flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#8f6f6f] uppercase`}
    >
      <span>By {post.authorName}</span>
      {post.reviewerName && <span>Reviewed by {post.reviewerName}</span>}
      <span>
        Updated{" "}
        <time dateTime={post.updatedAt}>{formatBlogDate(post.updatedAt)}</time>
      </span>
    </p>
  );
}
