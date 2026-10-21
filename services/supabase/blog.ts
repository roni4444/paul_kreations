// services/supabase/blog.ts
// All public.blog_posts reads/writes. Server Actions and pages call into
// these functions — never query the table anywhere else (PROJECT_RULES.md
// §11).
//
// Uses the main-site service-role client (RLS has no policies for
// anon/authenticated on this table — see docs/sql/blog.sql), so it is THIS
// file's job to keep public reads safe:
//   - public functions always filter status = 'published'
//   - public functions never select author_id / reviewer_id
// Admin functions assume the caller already passed requireWimmAdmin() —
// see server/actions/blog.ts.

import { getSupabaseServerClient } from "./client";

// ── Types ─────────────────────────────────────────────────────────────────

/** What the public list shows. Contains no staff IDs. */
export interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt: string;
  authorName: string;
  reviewerName: string | null;
  publishedAt: string;
  updatedAt: string;
}

/** What a public post page shows. */
export interface BlogPostPublic extends BlogPostSummary {
  bodyMd: string;
}

export type BlogStatus = "draft" | "published";

/** Admin list row. */
export interface BlogPostAdminRow {
  id: string;
  slug: string;
  title: string;
  status: BlogStatus;
  authorName: string;
  reviewerName: string | null;
  publishedAt: string | null;
  updatedAt: string;
}

/** Admin edit view. */
export interface BlogPostAdminDetail extends BlogPostAdminRow {
  excerpt: string;
  bodyMd: string;
  authorId: string;
}

interface SummaryRow {
  slug: string;
  title: string;
  excerpt: string;
  author_name: string;
  reviewer_name: string | null;
  published_at: string;
  updated_at: string;
}

interface AdminRow {
  id: string;
  slug: string;
  title: string;
  status: BlogStatus;
  author_name: string;
  reviewer_name: string | null;
  published_at: string | null;
  updated_at: string;
}

interface AdminDetailRow extends AdminRow {
  excerpt: string;
  body_md: string;
  author_id: string;
}

const SUMMARY_COLUMNS =
  "slug, title, excerpt, author_name, reviewer_name, published_at, updated_at";
const ADMIN_COLUMNS =
  "id, slug, title, status, author_name, reviewer_name, published_at, updated_at";

function toSummary(row: SummaryRow): BlogPostSummary {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    authorName: row.author_name,
    reviewerName: row.reviewer_name,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
  };
}

function toAdminRow(row: AdminRow): BlogPostAdminRow {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    status: row.status,
    authorName: row.author_name,
    reviewerName: row.reviewer_name,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
  };
}

/** Postgres unique_violation — the slug is already used by another post. */
const UNIQUE_VIOLATION = "23505";
export const SLUG_TAKEN = "SLUG_TAKEN";

// ── Public reads ──────────────────────────────────────────────────────────

export async function listPublishedPosts(): Promise<BlogPostSummary[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(SUMMARY_COLUMNS)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) throw new Error(`listPublishedPosts: ${error.message}`);
  return (data as SummaryRow[]).map(toSummary);
}

export async function getPublishedPostBySlug(
  slug: string,
): Promise<BlogPostPublic | null> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(`${SUMMARY_COLUMNS}, body_md`)
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(`getPublishedPostBySlug: ${error.message}`);
  if (!data) return null;

  const row = data as SummaryRow & { body_md: string };
  return { ...toSummary(row), bodyMd: row.body_md };
}

// ── Admin reads ───────────────────────────────────────────────────────────

export async function listAllPostsForAdmin(): Promise<BlogPostAdminRow[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(ADMIN_COLUMNS)
    .order("updated_at", { ascending: false });

  if (error) throw new Error(`listAllPostsForAdmin: ${error.message}`);
  return (data as AdminRow[]).map(toAdminRow);
}

export async function getPostForAdmin(
  id: string,
): Promise<BlogPostAdminDetail | null> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(`${ADMIN_COLUMNS}, excerpt, body_md, author_id`)
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`getPostForAdmin: ${error.message}`);
  if (!data) return null;

  const row = data as AdminDetailRow;
  return {
    ...toAdminRow(row),
    excerpt: row.excerpt,
    bodyMd: row.body_md,
    authorId: row.author_id,
  };
}

// ── Admin writes ──────────────────────────────────────────────────────────

export interface BlogWriteInput {
  title: string;
  slug: string;
  excerpt: string;
  bodyMd: string;
}

/** Creates a draft. The creator becomes the author. */
export async function createPost(
  input: BlogWriteInput,
  author: { id: string; name: string },
): Promise<string> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      title: input.title,
      slug: input.slug,
      excerpt: input.excerpt,
      body_md: input.bodyMd,
      status: "draft",
      author_id: author.id,
      author_name: author.name,
    })
    .select("id")
    .single();

  if (error) {
    if (error.code === UNIQUE_VIOLATION) throw new Error(SLUG_TAKEN);
    throw new Error(`createPost: ${error.message}`);
  }
  return (data as { id: string }).id;
}

export type BlogUpdateIntent = "save" | "publish" | "unpublish";

/** Updates a post. When someone other than the author edits it, they
 * become the reviewer; the author editing their own post leaves the
 * reviewer unchanged. Returns the previous slug (for cache revalidation)
 * and the resulting status. */
export async function updatePost(
  id: string,
  input: BlogWriteInput,
  intent: BlogUpdateIntent,
  editor: { id: string; name: string },
): Promise<{ previousSlug: string; status: BlogStatus } | null> {
  const existing = await getPostForAdmin(id);
  if (!existing) return null;

  const now = new Date().toISOString();
  const status: BlogStatus =
    intent === "publish"
      ? "published"
      : intent === "unpublish"
        ? "draft"
        : existing.status;

  const patch: Record<string, unknown> = {
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt,
    body_md: input.bodyMd,
    status,
    updated_at: now,
  };
  // First publish sets the publish date; later edits and unpublish/
  // republish keep the original.
  if (status === "published" && !existing.publishedAt) {
    patch.published_at = now;
  }
  if (editor.id !== existing.authorId) {
    patch.reviewer_id = editor.id;
    patch.reviewer_name = editor.name;
  }

  const supabase = getSupabaseServerClient();
  const { error } = await supabase
    .from("blog_posts")
    .update(patch)
    .eq("id", id);

  if (error) {
    if (error.code === UNIQUE_VIOLATION) throw new Error(SLUG_TAKEN);
    throw new Error(`updatePost: ${error.message}`);
  }
  return { previousSlug: existing.slug, status };
}

/** Deletes a post and returns its slug (for cache revalidation). */
export async function deletePost(id: string): Promise<string | null> {
  const existing = await getPostForAdmin(id);
  if (!existing) return null;

  const supabase = getSupabaseServerClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw new Error(`deletePost: ${error.message}`);
  return existing.slug;
}
