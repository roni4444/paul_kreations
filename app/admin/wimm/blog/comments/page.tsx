import type { Metadata } from "next";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";
import { requireWimmStaffPage } from "../../guard";
import { formatBlogDate } from "@/components/blog/post-meta";
import { COMMENT_STATUSES, type CommentStatus } from "@/schemas/blog-comment";
import {
  deleteCommentAction,
  moderateCommentAction,
} from "@/server/actions/blog-comments";
import {
  type AdminComment,
  listCommentsForAdmin,
} from "@/services/supabase/blog-comments";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Comments — Blog admin" };

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

function parseStatus(value: string | undefined): CommentStatus {
  return (COMMENT_STATUSES as readonly string[]).includes(value ?? "")
    ? (value as CommentStatus)
    : "pending";
}

async function loadComments(
  status: CommentStatus,
): Promise<{ comments: AdminComment[]; error: string | null }> {
  try {
    return { comments: await listCommentsForAdmin(status), error: null };
  } catch (err) {
    Sentry.captureException(err);
    return {
      comments: [],
      error:
        "Couldn't load comments. Has docs/sql/blog_phase2.sql been run on the admin-auth Supabase project?",
    };
  }
}

export default async function WimmCommentsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireWimmStaffPage();
  const status = parseStatus((await searchParams).status);
  const { comments, error } = await loadComments(status);

  return (
    <div className="mx-auto max-w-[760px] px-6 py-16">
      <Link
        href="/admin/wimm/blog"
        className={`${MONO} text-xs text-[#c41e3a] uppercase hover:underline`}
      >
        ← All posts
      </Link>
      <h1 className="mt-3 text-2xl font-semibold text-[#111c2d]">Comments</h1>
      <p className="mt-1 text-sm text-[#5f5e5e]">
        Comments are anonymous and stay hidden until you approve them.
      </p>

      <nav className="mt-6 flex gap-2" aria-label="Comment status">
        {COMMENT_STATUSES.map((s) => (
          <Link
            key={s}
            href={`/admin/wimm/blog/comments?status=${s}`}
            aria-current={s === status ? "page" : undefined}
            className={`${MONO} rounded-[4px] border px-3 py-1.5 text-xs uppercase ${
              s === status
                ? "border-[#c41e3a] bg-[#fff5f5] text-[#c41e3a]"
                : "border-[#e3bebd] text-[#5f5e5e] hover:border-[#c41e3a]"
            }`}
          >
            {s}
          </Link>
        ))}
      </nav>

      <div className="mt-6 flex flex-col gap-3">
        {error ? (
          <p role="alert" className="text-sm text-[#9e0027]">
            {error}
          </p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-[#5f5e5e]">No {status} comments.</p>
        ) : (
          comments.map((c) => (
            <div
              key={c.id}
              className="rounded-[4px] border border-[#e3bebd] bg-white p-4"
            >
              <p className={`${MONO} text-[11px] text-[#8f6f6f] uppercase`}>
                {c.authorName} · {formatBlogDate(c.createdAt)}
                {c.parentId
                  ? ` · reply to ${c.parentAuthorName ?? "a comment"}`
                  : ""}{" "}
                · on{" "}
                {c.postSlug ? (
                  <Link
                    href={`/blog/${c.postSlug}`}
                    target="_blank"
                    className="text-[#c41e3a] hover:underline"
                  >
                    {c.postTitle}
                  </Link>
                ) : (
                  c.postTitle
                )}
              </p>
              {c.authorEmail && (
                <p className="mt-1 text-xs text-[#5f5e5e]">
                  Email (private):{" "}
                  <a
                    href={`mailto:${c.authorEmail}`}
                    className="text-[#c41e3a] hover:underline"
                  >
                    {c.authorEmail}
                  </a>
                </p>
              )}
              <p className="mt-2 text-sm leading-6 whitespace-pre-wrap text-[#2b3445]">
                {c.body}
              </p>
              {c.moderatedByName && (
                <p className="mt-2 text-xs text-[#8f6f6f]">
                  {c.status === "approved" ? "Approved" : "Reviewed"} by{" "}
                  {c.moderatedByName}
                </p>
              )}

              <div className="mt-3 flex flex-wrap gap-2">
                {c.status !== "approved" && (
                  <form
                    action={moderateCommentAction.bind(null, c.id, "approved")}
                  >
                    <Button
                      type="submit"
                      className="h-8 rounded-[4px] bg-[#c41e3a] text-white hover:bg-[#9e0027]"
                    >
                      Approve
                    </Button>
                  </form>
                )}
                {c.status !== "rejected" && (
                  <form
                    action={moderateCommentAction.bind(null, c.id, "rejected")}
                  >
                    <Button
                      type="submit"
                      variant="outline"
                      className="h-8 rounded-[4px]"
                    >
                      {c.status === "approved" ? "Unpublish" : "Reject"}
                    </Button>
                  </form>
                )}
                <form action={deleteCommentAction.bind(null, c.id)}>
                  <Button
                    type="submit"
                    variant="outline"
                    className="h-8 rounded-[4px]"
                  >
                    Delete
                  </Button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
