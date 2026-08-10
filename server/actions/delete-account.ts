"use server";

// server/actions/delete-account.ts
// Server Action for the account deletion request form
// (components/wimm/delete-account-form.tsx). Order: validate → verify human
// → check honeypot → log the request → notify you → confirm to the user.
//
// Deliberately does not delete any data itself — see the comment at the top
// of services/wimm/delete-account.ts for why a human-reviewed step is safer
// for an unauthenticated public form.

import * as Sentry from "@sentry/nextjs";
import { headers } from "next/headers";
import { deleteAccountSchema } from "@/schemas/delete-account";
import { verifyTurnstileToken } from "@/services/security/turnstile";
import { insertDeletionRequest } from "@/services/wimm/delete-account";
import {
  sendDeletionRequestConfirmation,
  sendDeletionRequestOwnerNotification,
} from "@/services/wimm/email";

type ActionResult =
  | { success: true }
  | { success: false; error: string }
  | { success: false; fieldErrors: Record<string, string[]> };

export async function submitDeleteAccountRequest(
  data: unknown,
): Promise<ActionResult> {
  const parsed = deleteAccountSchema.safeParse(data);
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

  // Honeypot
  if (website && website.length > 0) {
    return { success: true };
  }

  try {
    const headerList = await headers();
    const remoteIp = headerList.get("x-forwarded-for")?.split(",")[0]?.trim();

    const turnstileResult = await verifyTurnstileToken(
      turnstileToken,
      remoteIp,
    );
    if (!turnstileResult.success) {
      return { success: false, error: turnstileResult.error };
    }

    const insertResult = await insertDeletionRequest(formData);
    if (!insertResult.success) {
      return { success: false, error: insertResult.error };
    }

    // Notify the owner — this is the important one, and if it fails we want
    // to know about it (Sentry), because a silently-lost deletion request is
    // a real compliance problem, not just a UX nit.
    const ownerNotifyResult = await sendDeletionRequestOwnerNotification({
      email: formData.email,
      accountIdentifier: formData.accountIdentifier,
      reason: formData.reason,
      requestId: insertResult.requestId,
    });
    if (!ownerNotifyResult.success) {
      Sentry.captureMessage(
        "Deletion request owner notification failed to send",
        {
          level: "error",
          extra: { email: formData.email, requestId: insertResult.requestId },
        },
      );
    }

    // Confirmation to the requester is best-effort — the request is already
    // logged and you've already been notified either way.
    const confirmResult = await sendDeletionRequestConfirmation(formData.email);
    if (!confirmResult.success) {
      Sentry.captureMessage(
        "Deletion request user confirmation failed to send",
        { level: "warning", extra: { email: formData.email } },
      );
    }

    return { success: true };
  } catch (err) {
    console.error("[submitDeleteAccountRequest] Unexpected error:", err);
    Sentry.captureException(err);
    return {
      success: false,
      error: "Something went wrong. Please try again, or email us directly.",
    };
  }
}
