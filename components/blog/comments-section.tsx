// components/blog/comments-section.tsx
// Approved comments plus the submit form. Server component: comments are
// rendered as plain text (React escapes them) — never as Markdown/HTML.

import { CommentForm } from "./comment-form";
import { CommentThread } from "./comment-thread";
import type { PublicComment } from "@/services/supabase/blog-comments";

interface CommentsSectionProps {
  postId: string;
  comments: PublicComment[];
  /** True when loading comments failed — we say so instead of showing
   * "no comments yet", which would be untrue. */
  loadFailed?: boolean;
}

export function CommentsSection({
  postId,
  comments,
  loadFailed = false,
}: CommentsSectionProps) {
  return (
    <section
      id="comments"
      aria-labelledby="comments-heading"
      className="mt-12 scroll-mt-28 border-t border-[#e3bebd] pt-8"
    >
      <h2
        id="comments-heading"
        className="text-xl font-semibold text-[#111c2d]"
      >
        Comments{comments.length > 0 ? ` (${comments.length})` : ""}
      </h2>

      {loadFailed ? (
        <p className="mt-4 text-sm text-[#5f5e5e]">
          Comments couldn&apos;t be loaded right now.
        </p>
      ) : comments.length === 0 ? (
        <p className="mt-4 text-sm text-[#5f5e5e]">
          No comments yet. Be the first to share your thoughts.
        </p>
      ) : (
        <CommentThread postId={postId} comments={comments} />
      )}

      <h3 className="mt-10 mb-4 text-base font-semibold text-[#111c2d]">
        Leave a comment
      </h3>
      <p className="mb-4 text-sm text-[#5f5e5e]">
        Your email is optional and never shown. Comments are reviewed before
        they appear.
      </p>
      <CommentForm postId={postId} />
    </section>
  );
}
