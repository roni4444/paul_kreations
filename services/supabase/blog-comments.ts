// services/supabase/blog-comments.ts
// All public.blog_comments access. Public functions only ever return
// APPROVED comments and never expose moderation fields; admin functions
// assume the caller already passed requireStaffAccess("wimm") — see
// server/actions/blog-comments.ts.

import { createAdminServiceClient } from "./admin-client";
import type { CommentStatus } from "@/schemas/blog-comment";

export interface PublicComment {
  id: string;
  /** Top-level comment this replies to, or null for a top-level comment. */
  parentId: string | null;
  authorName: string;
  body: string;
  createdAt: string;
  likeCount: number;
  dislikeCount: number;
}

export interface AdminComment extends PublicComment {
  authorEmail: string | null;
  parentAuthorName: string | null;
  status: CommentStatus;
  postId: string;
  postTitle: string;
  postSlug: string;
  moderatedAt: string | null;
  moderatedByName: string | null;
}

interface PostRef {
  title: string;
  slug: string;
}

/** PostgREST types a to-one embed as an object or a one-element array
 * depending on the generated relationship — accept both. */
function firstOf<T>(value: T | T[] | null | undefined): T | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

// ── Public ────────────────────────────────────────────────────────────────

export async function listApprovedComments(
  postId: string,
): Promise<PublicComment[]> {
  const supabase = createAdminServiceClient();
  const { data, error } = await supabase
    .from("blog_comments")
    .select(
      "id, parent_id, author_name, body, created_at, like_count, dislike_count",
    )
    .eq("post_id", postId)
    .eq("status", "approved")
    .order("created_at", { ascending: true });

  if (error) throw new Error(`listApprovedComments: ${error.message}`);
  return (
    data as {
      id: string;
      parent_id: string | null;
      author_name: string;
      body: string;
      created_at: string;
      like_count: number;
      dislike_count: number;
    }[]
  ).map((r) => ({
    id: r.id,
    parentId: r.parent_id,
    authorName: r.author_name,
    body: r.body,
    createdAt: r.created_at,
    likeCount: r.like_count,
    dislikeCount: r.dislike_count,
  }));
}

export type CreateCommentOutcome = "ok" | "no_post" | "no_parent";

/** Stores a new comment (or reply) as pending. "no_post" when the post
 * doesn't exist or isn't published (so nobody can comment on drafts);
 * "no_parent" when a reply's target isn't an approved comment on this post. */
export async function createPendingComment(input: {
  postId: string;
  parentId?: string;
  authorName: string;
  authorEmail?: string;
  body: string;
}): Promise<CreateCommentOutcome> {
  const supabase = createAdminServiceClient();

  const { data: post, error: postError } = await supabase
    .from("blog_posts")
    .select("id")
    .eq("id", input.postId)
    .eq("status", "published")
    .maybeSingle();
  if (postError) throw new Error(`createPendingComment: ${postError.message}`);
  if (!post) return "no_post";

  // Replies are one level deep: replying to a reply attaches to its parent.
  let parentId: string | null = null;
  if (input.parentId) {
    const { data: parent, error: parentError } = await supabase
      .from("blog_comments")
      .select("id, parent_id")
      .eq("id", input.parentId)
      .eq("post_id", input.postId)
      .eq("status", "approved")
      .maybeSingle();
    if (parentError) {
      throw new Error(`createPendingComment: ${parentError.message}`);
    }
    if (!parent) return "no_parent";
    const row = parent as { id: string; parent_id: string | null };
    parentId = row.parent_id ?? row.id;
  }

  const { error } = await supabase.from("blog_comments").insert({
    post_id: input.postId,
    parent_id: parentId,
    author_name: input.authorName,
    author_email: input.authorEmail ? input.authorEmail : null,
    body: input.body,
    status: "pending",
  });
  if (error) throw new Error(`createPendingComment: ${error.message}`);
  return "ok";
}

export interface CommentReactionCounts {
  likes: number;
  dislikes: number;
}

/** Atomically moves a comment's like/dislike counters (docs/sql/
 * blog_comments_replies.sql). Null when the comment isn't approved. */
export async function applyCommentReaction(
  commentId: string,
  previous: "like" | "dislike" | null,
  next: "like" | "dislike" | null,
): Promise<CommentReactionCounts | null> {
  const supabase = createAdminServiceClient();
  const { data, error } = await supabase.rpc("blog_apply_comment_reaction", {
    p_comment_id: commentId,
    p_prev: previous,
    p_next: next,
  });
  if (error) throw new Error(`applyCommentReaction: ${error.message}`);
  const row = Array.isArray(data) && data.length > 0 ? data[0] : null;
  return row ? { likes: row.likes, dislikes: row.dislikes } : null;
}

// ── Admin ─────────────────────────────────────────────────────────────────

export async function listCommentsForAdmin(
  status: CommentStatus,
): Promise<AdminComment[]> {
  const supabase = createAdminServiceClient();
  const { data, error } = await supabase
    .from("blog_comments")
    .select(
      "id, post_id, parent_id, author_name, author_email, body, status, created_at, like_count, dislike_count, moderated_at, moderated_by_name, blog_posts(title, slug), parent:blog_comments!parent_id(author_name)",
    )
    .eq("status", status)
    .order("created_at", { ascending: status === "pending" })
    .limit(200);

  if (error) throw new Error(`listCommentsForAdmin: ${error.message}`);

  type Row = {
    id: string;
    post_id: string;
    parent_id: string | null;
    like_count: number;
    dislike_count: number;
    parent: { author_name: string } | { author_name: string }[] | null;
    author_name: string;
    author_email: string | null;
    body: string;
    status: CommentStatus;
    created_at: string;
    moderated_at: string | null;
    moderated_by_name: string | null;
    blog_posts: PostRef | PostRef[] | null;
  };

  return (data as unknown as Row[]).map((r) => {
    const post = firstOf(r.blog_posts);
    return {
      id: r.id,
      authorName: r.author_name,
      authorEmail: r.author_email,
      parentId: r.parent_id,
      parentAuthorName: firstOf(r.parent)?.author_name ?? null,
      likeCount: r.like_count,
      dislikeCount: r.dislike_count,
      body: r.body,
      createdAt: r.created_at,
      status: r.status,
      postId: r.post_id,
      postTitle: post?.title ?? "(deleted post)",
      postSlug: post?.slug ?? "",
      moderatedAt: r.moderated_at,
      moderatedByName: r.moderated_by_name,
    };
  });
}

export async function countPendingComments(): Promise<number> {
  const supabase = createAdminServiceClient();
  const { count, error } = await supabase
    .from("blog_comments")
    .select("id", { count: "exact", head: true })
    .eq("status", "pending");

  if (error) throw new Error(`countPendingComments: ${error.message}`);
  return count ?? 0;
}

/** Returns the post slug (for cache revalidation), or null if not found. */
export async function setCommentStatus(
  id: string,
  status: CommentStatus,
  moderator: { name: string },
): Promise<string | null> {
  const supabase = createAdminServiceClient();
  const { data, error } = await supabase
    .from("blog_comments")
    .update({
      status,
      moderated_at: new Date().toISOString(),
      moderated_by_name: moderator.name,
    })
    .eq("id", id)
    .select("blog_posts(slug)")
    .maybeSingle();

  if (error) throw new Error(`setCommentStatus: ${error.message}`);
  if (!data) return null;
  const post = firstOf(
    (
      data as unknown as {
        blog_posts: { slug: string } | { slug: string }[] | null;
      }
    ).blog_posts,
  );
  return post?.slug ?? null;
}

export async function deleteComment(id: string): Promise<string | null> {
  const supabase = createAdminServiceClient();
  const { data, error } = await supabase
    .from("blog_comments")
    .delete()
    .eq("id", id)
    .select("blog_posts(slug)")
    .maybeSingle();

  if (error) throw new Error(`deleteComment: ${error.message}`);
  if (!data) return null;
  const post = firstOf(
    (
      data as unknown as {
        blog_posts: { slug: string } | { slug: string }[] | null;
      }
    ).blog_posts,
  );
  return post?.slug ?? null;
}
