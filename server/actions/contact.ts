"use server";

// server/actions/contact.ts
// Server-side handler for the contact form.
// Validates input with Zod, then delegates to the email service.
// Never called directly from UI — imported by the contact form component.

import { z } from "zod";
import { contactSchema } from "@/schemas/contact";
import { sendContactEmail } from "@/services/email";

type ActionResult =
  | { success: true }
  | { success: false; error: string }
  | { success: false; fieldErrors: Record<string, string[]> };

export async function submitContactForm(data: unknown): Promise<ActionResult> {
  // Server-side validation — always validate again regardless of client checks
  const result = contactSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      fieldErrors: z.flattenError(result.error).fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  return sendContactEmail(result.data);
}
