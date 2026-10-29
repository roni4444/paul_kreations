// schemas/contact.ts
// Zod schema for the contact form — validated both client-side and server-side.

import { z } from "zod";

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z
    .email("Please enter a valid email address")
    .max(255, "Email address is too long"),
  contactingTo: z.string().min(1, "Please select who you are contacting"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// What the Server Action receives: the form fields plus anti-abuse extras.
// Kept separate so ContactFormData (used by the email service) stays just
// the message itself.
export const contactSubmissionSchema = contactSchema.extend({
  // Cloudflare Turnstile token — verified server-side before anything is
  // sent (services/security/turnstile.ts). May be empty only in local dev
  // when no Turnstile key is configured; the verifier decides.
  turnstileToken: z.string().max(4096),
  // Honeypot — no constraints on purpose, so a bot that fills it still
  // parses successfully and gets a fake success (see the action).
  website: z.string().optional(),
});
