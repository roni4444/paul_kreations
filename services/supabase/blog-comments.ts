// services/supabase/blog-comments.ts
// All public.blog_comments access. Public functions only ever return
// APPROVED comments and never expose moderation fields; admin functions
// assume the caller already passed requireStaffAccess("wimm") — see
// server/actions/blog-comments.ts.

import { createAdminServiceClient } from "./admin-client";
import type { CommentStatus } from "@/schemas/blog-comment";

export interface PublicComment {
  id: string;
  authorName: string;
  body: string;
  createdAt: string;
}

export interface AdminComment extends PublicComment {
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
    .select("id, author_name, body, created_at")
    .eq("post_id", postId)
    .eq("status", "approved")
    .order("created_at", { ascending: true });

  if (error) throw new Error(`listApprovedComments: ${error.message}`);
  return (
    data as {
      id: string;
      author_name: string;
      body: string;
      created_at: string;
    }[]
  ).map((r) => ({
    id: r.id,
    authorName: r.author_name,
    body: r.body,
    createdAt: r.created_at,
  }));
}

/** Stores a new comment as pending. Returns false when the post doesn't
 * exist or isn't published (so nobody can comment on drafts). */
export async function createPendingComment(input: {
  postId: string;
  authorName: string;
  body: string;
}): Promise<boolean> {
  const supabase = createAdminServiceClient();

  const { data: post, error: postError } = await supabase
    .from("blog_posts")
    .select("id")
    .eq("id", input.postId)
    .eq("status", "published")
    .maybeSingle();
  if (postError) throw new Error(`createPendingComment: ${postError.message}`);
  if (!post) return false;

  const { error } = await supabase.from("blog_comments").insert({
    post_id: input.postId,
    author_name: input.authorName,
    body: input.body,
    status: "pending",
  });
  if (error) throw new Error(`createPendingComment: ${error.message}`);
  return true;
}

// ── Admin ─────────────────────────────────────────────────────────────────

export async function listCommentsForAdmin(
  status: CommentStatus,
): Promise<AdminComment[]> {
  const supabase = createAdminServiceClient();
  const { data, error } = await supabase
    .from("blog_comments")
    .select(
      "id, post_id, author_name, body, status, created_at, moderated_at, moderated_by_name, blog_posts(title, slug)",
    )
    .eq("status", status)
    .order("created_at", { ascending: status === "pending" })
    .limit(200);

  if (error) throw new Error(`listCommentsForAdmin: ${error.message}`);

  type Row = {
    id: string;
    post_id: string;
    author_name: string;
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
