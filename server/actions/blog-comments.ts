"use server";

// server/actions/blog-comments.ts
// Public comment submission (anonymous: Turnstile + honeypot + moderation)
// and the staff moderation actions. Order for submit mirrors
// server/actions/waitlist.ts: validate → honeypot → verify human → persist.
// Comments are stored as "pending" and only appear on the post once a staff
// member approves them.

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import * as Sentry from "@sentry/nextjs";
import { z } from "zod";
import {
  commentFormSchema,
  type CommentStatus,
  commentStatusSchema,
} from "@/schemas/blog-comment";
import { verifyTurnstileToken } from "@/services/security/turnstile";
import { requireStaffAccess } from "@/services/staff";
import {
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

    const stored = await createPendingComment(comment);
    if (!stored) {
      return { success: false, error: "This post is not open for comments." };
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
