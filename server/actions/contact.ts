"use server";

// server/actions/contact.ts
// Server-side handler for the contact form.
// Validates input with Zod, rejects bots (honeypot + Cloudflare Turnstile,
// PROJECT_RULES.md §9), then delegates to the email service.
// Never called directly from UI — imported by the contact form component.

import * as Sentry from "@sentry/nextjs";
import { headers } from "next/headers";
import { z } from "zod";
import { contactSubmissionSchema } from "@/schemas/contact";
import { verifyTurnstileToken } from "@/services/security/turnstile";
import { sendContactEmail } from "@/services/email";

type ActionResult =
  | { success: true }
  | { success: false; error: string }
  | { success: false; fieldErrors: Record<string, string[]> };

export async function submitContactForm(data: unknown): Promise<ActionResult> {
  // Server-side validation — always validate again regardless of client checks
  const result = contactSubmissionSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      fieldErrors: z.flattenError(result.error).fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  const { turnstileToken, website, ...message } = result.data;

  // Honeypot — real visitors never see or fill this field. Pretend it
  // worked so bots learn nothing.
  if (website && website.length > 0) return { success: true };

  try {
    const headerList = await headers();
    const remoteIp = headerList.get("x-forwarded-for")?.split(",")[0]?.trim();

    const human = await verifyTurnstileToken(turnstileToken, remoteIp);
    if (!human.success) return { success: false, error: human.error };
  } catch (err) {
    console.error("[submitContactForm] Turnstile check failed:", err);
    Sentry.captureException(err);
    return {
      success: false,
      error: "Could not verify you're human. Please try again.",
    };
  }

  return sendContactEmail(message);
}
