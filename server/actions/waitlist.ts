"use server";

// server/actions/waitlist.ts
// Server Action for the Where Is My Money? waitlist form (components/wimm/waitlist-form.tsx).
// Order of operations matters: validate shape → verify human → check honeypot
// → persist → send email. Persisting is never skipped because email failed —
// a failed welcome email shouldn't cost someone their waitlist spot.

import * as Sentry from "@sentry/nextjs";
import { headers } from "next/headers";
import { waitlistSchema } from "@/schemas/waitlist";
import { verifyTurnstileToken } from "@/services/security/turnstile";
import { insertWaitlistSignup } from "@/services/wimm/waitlist";
import { sendWaitlistWelcomeEmail } from "@/services/wimm/email";

type ActionResult =
  | { success: true; alreadyExists: boolean }
  | { success: false; error: string }
  | { success: false; fieldErrors: Record<string, string[]> };

export async function submitWaitlistForm(data: unknown): Promise<ActionResult> {
  // ── 1. Shape validation ──────────────────────────────────────────────────
  const parsed = waitlistSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  const { turnstileToken, website, ...formData } = parsed.data;

  // ── 2. Honeypot — bots fill every field, real users never see this one ──
  if (website && website.length > 0) {
    // Return a fake success so bots don't learn the honeypot exists.
    return { success: true, alreadyExists: false };
  }

  try {
    // ── 3. Verify the human ────────────────────────────────────────────────
    const headerList = await headers();
    const remoteIp = headerList.get("x-forwarded-for")?.split(",")[0]?.trim();

    const turnstileResult = await verifyTurnstileToken(
      turnstileToken,
      remoteIp,
    );
    if (!turnstileResult.success) {
      return { success: false, error: turnstileResult.error };
    }

    // ── 4. Persist ──────────────────────────────────────────────────────────
    const insertResult = await insertWaitlistSignup(formData);
    if (!insertResult.success) {
      return { success: false, error: insertResult.error };
    }

    // ── 5. Welcome email (best-effort — never blocks the signup) ────────────
    if (!insertResult.alreadyExists) {
      const emailResult = await sendWaitlistWelcomeEmail({
        fullName: formData.fullName,
        email: formData.email,
      });
      if (!emailResult.success) {
        // Log but don't fail the request — the signup itself succeeded.
        Sentry.captureMessage(
          "Where Is My Money? welcome email failed to send",
          {
            level: "warning",
            extra: { email: formData.email },
          },
        );
      }
    }

    return { success: true, alreadyExists: insertResult.alreadyExists };
  } catch (err) {
    console.error("[submitWaitlistForm] Unexpected error:", err);
    Sentry.captureException(err);
    return {
      success: false,
      error: "Something went wrong. Please try again in a moment.",
    };
  }
}
