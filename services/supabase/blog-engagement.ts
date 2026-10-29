// services/supabase/blog-engagement.ts
// View and like/dislike counters on public.blog_posts. Increments happen in
// SQL functions (docs/sql/blog_phase2.sql) so concurrent visitors can't lose
// updates. Who may react, and how often, is decided by the caller (the
// Server Action, via cookies) — this file only touches the database.

import { createAdminServiceClient } from "./admin-client";
import type { Reaction } from "@/schemas/blog-comment";

export interface PostCounts {
  views: number;
  likes: number;
  dislikes: number;
}

interface CountsRow {
  views: number | string;
  likes: number;
  dislikes: number;
}

function toCounts(row: CountsRow): PostCounts {
  return {
    // bigint can arrive as a string over PostgREST.
    views: Number(row.views),
    likes: row.likes,
    dislikes: row.dislikes,
  };
}

function firstRow(data: unknown): CountsRow | null {
  return Array.isArray(data) && data.length > 0 ? (data[0] as CountsRow) : null;
}

/** Current counters of a published post, or null if it isn't published. */
export async function getPostCounts(
  postId: string,
): Promise<PostCounts | null> {
  const supabase = createAdminServiceClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("view_count, like_count, dislike_count")
    .eq("id", postId)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw new Error(`getPostCounts: ${error.message}`);
  if (!data) return null;
  const row = data as {
    view_count: number | string;
    like_count: number;
    dislike_count: number;
  };
  return {
    views: Number(row.view_count),
    likes: row.like_count,
    dislikes: row.dislike_count,
  };
}

export async function incrementView(
  postId: string,
): Promise<PostCounts | null> {
  const supabase = createAdminServiceClient();
  const { data, error } = await supabase.rpc("blog_record_view", {
    p_post_id: postId,
  });
  if (error) throw new Error(`incrementView: ${error.message}`);
  const row = firstRow(data);
  return row ? toCounts(row) : null;
}

export async function applyReaction(
  postId: string,
  previous: Reaction | null,
  next: Reaction | null,
): Promise<PostCounts | null> {
  const supabase = createAdminServiceClient();
  const { data, error } = await supabase.rpc("blog_apply_reaction", {
    p_post_id: postId,
    p_prev: previous,
    p_next: next,
  });
  if (error) throw new Error(`applyReaction: ${error.message}`);
  const row = firstRow(data);
  return row ? toCounts(row) : null;
}
