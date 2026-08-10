// schemas/waitlist.ts
// Zod schema for the Where Is My Money? waitlist form — validated both client-side
// (components/wimm/waitlist-form.tsx) and server-side
// (server/actions/waitlist.ts). Never trust the client-side pass alone.

import { z } from "zod";
import { WIMM_INTEREST_OPTIONS, WIMM_PLATFORM_OPTIONS } from "@/lib/data/wimm";

const interestValues = WIMM_INTEREST_OPTIONS.map((o) => o.value) as [
  string,
  ...string[],
];
const platformValues = WIMM_PLATFORM_OPTIONS.map((o) => o.value) as [
  string,
  ...string[],
];

export const waitlistSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email address is too long"),
  useCase: z.enum(interestValues, {
    message: "Please tell us what best describes you",
  }),
  platform: z.enum(platformValues, {
    message: "Please select a platform preference",
  }),
  // Cloudflare Turnstile token — verified server-side in
  // services/security/turnstile.ts before any write happens.
  turnstileToken: z.string().min(1, "Please complete the verification"),
  // Honeypot field — intentionally has NO length constraint here.
  // If it had one, a bot filling it in would fail Zod validation and get
  // back field errors that reveal the honeypot exists. Instead, parsing
  // always succeeds, and server/actions/waitlist.ts checks this value
  // AFTER a successful parse and silently returns a fake "success" —
  // so bots never learn the field was a trap.
  website: z.string().optional(),
  // Where the signup came from (utm_source or referrer) — captured
  // client-side for the "signups by source" admin view later.
  source: z.string().max(120).optional(),
});

export type WaitlistFormData = z.infer<typeof waitlistSchema>;
