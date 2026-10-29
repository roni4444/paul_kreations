"use server";

// server/actions/blog-engagement.ts
// Public view counting and like/dislike for blog posts. No accounts exist,
// so "one per visitor" is enforced with httpOnly cookies:
//   bv_<postId>  — set for 24h after a view is counted (one view per
//                  visitor per post per day)
//   br_<postId>  — the visitor's current reaction ("like" | "dislike"),
//                  kept for a year so they can change or remove it
// A visitor who clears cookies can count again; that is an accepted limit
// for an anonymous counter. The action runs from the browser on page load
// (components/blog/post-engagement.tsx), so crawlers that don't execute JS
// are never counted and the ISR-cached page stays cacheable.

import { cookies } from "next/headers";
import * as Sentry from "@sentry/nextjs";
import {
  postIdSchema,
  type Reaction,
  reactionSchema,
} from "@/schemas/blog-comment";
import {
  applyReaction,
  getPostCounts,
  incrementView,
  type PostCounts,
} from "@/services/supabase/blog-engagement";

export interface EngagementState extends PostCounts {
  myReaction: Reaction | null;
}

const VIEW_COOKIE = "bv_";
const REACTION_COOKIE = "br_";
const DAY = 60 * 60 * 24;

function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}

function readReaction(value: string | undefined): Reaction | null {
  const parsed = reactionSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
}

/** Called once when a post page loads in the browser: counts the view (at
 * most once per day per visitor) and returns the live counters plus this
 * visitor's own reaction. Returns null on any failure — the page just keeps
 * its server-rendered numbers. */
export async function loadEngagementAction(
  postId: unknown,
): Promise<EngagementState | null> {
  const parsedId = postIdSchema.safeParse(postId);
  if (!parsedId.success) return null;
  const id = parsedId.data;

  try {
    const jar = await cookies();
    const myReaction = readReaction(jar.get(`${REACTION_COOKIE}${id}`)?.value);

    let counts: PostCounts | null;
    if (jar.get(`${VIEW_COOKIE}${id}`)) {
      counts = await getPostCounts(id);
    } else {
      counts = await incrementView(id);
      if (counts) jar.set(`${VIEW_COOKIE}${id}`, "1", cookieOptions(DAY));
    }

    return counts ? { ...counts, myReaction } : null;
  } catch (err) {
    console.error("[loadEngagementAction]", err);
    Sentry.captureException(err);
    return null;
  }
}

/** Toggles a reaction: choosing the one you already have removes it;
 * choosing the other switches. Returns the new state, or null on failure. */
export async function reactToPostAction(
  postId: unknown,
  reaction: unknown,
): Promise<EngagementState | null> {
  const parsedId = postIdSchema.safeParse(postId);
  const parsedReaction = reactionSchema.safeParse(reaction);
  if (!parsedId.success || !parsedReaction.success) return null;
  const id = parsedId.data;

  try {
    const jar = await cookies();
    const name = `${REACTION_COOKIE}${id}`;
    const previous = readReaction(jar.get(name)?.value);
    const next = previous === parsedReaction.data ? null : parsedReaction.data;

    const counts = await applyReaction(id, previous, next);
    if (!counts) return null;

    if (next) jar.set(name, next, cookieOptions(DAY * 365));
    else jar.delete(name);

    return { ...counts, myReaction: next };
  } catch (err) {
    console.error("[reactToPostAction]", err);
    Sentry.captureException(err);
    return null;
  }
}
