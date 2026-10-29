"use server";

// server/actions/blog-comments.ts
// Public comment submission (anonymous: Turnstile + honeypot + moderation)
// and the staff moderation actions. Order for submit mirrors
// server/actions/waitlist.ts: validate → honeypot → verify human → persist.
// Comments are stored as "pending" and only appear on the post once a staff
// member approves them.

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import * as Sentry from "@sentry/nextjs";
import { z } from "zod";
import {
  commentFormSchema,
  commentIdSchema as publicCommentIdSchema,
  type CommentStatus,
  commentStatusSchema,
  type Reaction,
  reactionSchema,
} from "@/schemas/blog-comment";
import { verifyTurnstileToken } from "@/services/security/turnstile";
import { requireStaffAccess } from "@/services/staff";
import {
  applyCommentReaction,
  createPendingComment,
  deleteComment,
  setCommentStatus,
} from "@/services/supabase/blog-comments";

export type SubmitCommentResult =
  | { success: true }
  | { success: false; error: string };

export async function submitCommentAction(
  data: unknown,
): Promise<SubmitCommentResult> {
  const parsed = commentFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Please check your comment.",
    };
  }
  const { turnstileToken, website, ...comment } = parsed.data;

  // Honeypot — pretend it worked so bots learn nothing.
  if (website && website.length > 0) return { success: true };

  try {
    const headerList = await headers();
    const remoteIp = headerList.get("x-forwarded-for")?.split(",")[0]?.trim();

    const human = await verifyTurnstileToken(turnstileToken, remoteIp);
    if (!human.success) return { success: false, error: human.error };

    const outcome = await createPendingComment(comment);
    if (outcome === "no_post") {
      return { success: false, error: "This post is not open for comments." };
    }
    if (outcome === "no_parent") {
      return {
        success: false,
        error: "The comment you are replying to is no longer available.",
      };
    }
    return { success: true };
  } catch (err) {
    console.error("[submitCommentAction]", err);
    Sentry.captureException(err);
    return {
      success: false,
      error: "Something went wrong. Please try again in a moment.",
    };
  }
}

// ── Likes / dislikes on comments ─────────────────────────────────────────
// No accounts, so one reaction per visitor per comment is tracked in a
// single httpOnly cookie "bcr": "<comment id>:l" or ":d", comma-separated,
// newest last, capped so the cookie stays small. Clearing cookies lets a
// visitor react again — accepted for an anonymous counter.

const REACTIONS_COOKIE = "bcr";
const MAX_TRACKED_REACTIONS = 60;
const YEAR = 60 * 60 * 24 * 365;
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function parseReactions(value: string | undefined): Map<string, Reaction> {
  const map = new Map<string, Reaction>();
  if (!value) return map;
  for (const part of value.split(",")) {
    const [id, code] = part.split(":");
    if (id && UUID_RE.test(id) && (code === "l" || code === "d")) {
      map.set(id, code === "l" ? "like" : "dislike");
    }
  }
  return map;
}

function serializeReactions(map: Map<string, Reaction>): string {
  return [...map.entries()]
    .slice(-MAX_TRACKED_REACTIONS)
    .map(([id, r]) => `${id}:${r === "like" ? "l" : "d"}`)
    .join(",");
}

/** This visitor's own reactions, so the thread can highlight them. */
export async function loadMyCommentReactionsAction(): Promise<
  Record<string, Reaction>
> {
  try {
    const jar = await cookies();
    return Object.fromEntries(parseReactions(jar.get(REACTIONS_COOKIE)?.value));
  } catch (err) {
    Sentry.captureException(err);
    return {};
  }
}

export interface CommentReactionState {
  likes: number;
  dislikes: number;
  myReaction: Reaction | null;
}

/** Toggle: choosing your current reaction removes it; the other switches. */
export async function reactToCommentAction(
  commentId: unknown,
  reaction: unknown,
): Promise<CommentReactionState | null> {
  const parsedId = publicCommentIdSchema.safeParse(commentId);
  const parsedReaction = reactionSchema.safeParse(reaction);
  if (!parsedId.success || !parsedReaction.success) return null;
  const id = parsedId.data;

  try {
    const jar = await cookies();
    const mine = parseReactions(jar.get(REACTIONS_COOKIE)?.value);
    const previous = mine.get(id) ?? null;
    const next = previous === parsedReaction.data ? null : parsedReaction.data;

    const counts = await applyCommentReaction(id, previous, next);
    if (!counts) return null;

    mine.delete(id);
    if (next) mine.set(id, next); // re-inserted last = newest
    jar.set(REACTIONS_COOKIE, serializeReactions(mine), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: YEAR,
    });

    return { ...counts, myReaction: next };
  } catch (err) {
    console.error("[reactToCommentAction]", err);
    Sentry.captureException(err);
    return null;
  }
}

// ── Staff moderation (used as <form action={…bind(null, id, …)}>) ────────

const commentIdSchema = z.uuid();

function revalidateAfterModeration(slug: string | null) {
  revalidatePath("/admin/wimm/blog/comments");
  revalidatePath("/admin/wimm");
  if (slug) revalidatePath(`/blog/${slug}`);
}

export async function moderateCommentAction(
  commentId: string,
  status: CommentStatus,
): Promise<void> {
  const staff = await requireStaffAccess("wimm");
  const id = commentIdSchema.parse(commentId);
  const nextStatus = commentStatusSchema.parse(status);

  try {
    const slug = await setCommentStatus(id, nextStatus, {
      name: staff.displayName,
    });
    revalidateAfterModeration(slug);
  } catch (err) {
    console.error("[moderateCommentAction]", err);
    Sentry.captureException(err);
    await Sentry.flush(2000);
    throw err;
  }
}

export async function deleteCommentAction(commentId: string): Promise<void> {
  await requireStaffAccess("wimm");
  const id = commentIdSchema.parse(commentId);

  try {
    const slug = await deleteComment(id);
    revalidateAfterModeration(slug);
  } catch (err) {
    console.error("[deleteCommentAction]", err);
    Sentry.captureException(err);
    await Sentry.flush(2000);
    throw err;
  }
}
