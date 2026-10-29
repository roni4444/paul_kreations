// components/blog/comments-section.tsx
// Approved comments plus the submit form. Server component: comments are
// rendered as plain text (React escapes them) — never as Markdown/HTML.

import { CommentForm } from "./comment-form";
import { formatBlogDate } from "./post-meta";
import type { PublicComment } from "@/services/supabase/blog-comments";

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

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
        <ul className="mt-6 flex flex-col gap-5">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="rounded-[4px] border border-[#e3bebd] bg-white p-4"
            >
              <p className={`${MONO} text-[11px] text-[#8f6f6f] uppercase`}>
                {comment.authorName} · {formatBlogDate(comment.createdAt)}
              </p>
              <p className="mt-2 text-base leading-7 whitespace-pre-wrap text-[#2b3445]">
                {comment.body}
              </p>
            </li>
          ))}
        </ul>
      )}

      <h3 className="mt-10 mb-4 text-base font-semibold text-[#111c2d]">
        Leave a comment
      </h3>
      <p className="mb-4 text-sm text-[#5f5e5e]">
        Your email isn&apos;t asked for or stored. Comments are reviewed before
        they appear.
      </p>
      <CommentForm postId={postId} />
    </section>
  );
}
