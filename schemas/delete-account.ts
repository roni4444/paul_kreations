// schemas/delete-account.ts
// Zod schema for the account deletion request form
// (components/wimm/delete-account-form.tsx). Google Play requires this
// request path to work even for people who no longer have the app
// installed, so we don't require the user to be logged in — just enough
// identifying info to locate their account server-side.

import { z } from "zod";

export const deleteAccountSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email address is too long"),
  // Optional second identifier — helps disambiguate if someone signed up
  // with a different email than the one they're contacting from.
  accountIdentifier: z
    .string()
    .max(160, "That's too long")
    .optional()
    .or(z.literal("")),
  reason: z
    .string()
    .max(1000, "Please keep this under 1000 characters")
    .optional()
    .or(z.literal("")),
  turnstileToken: z.string().min(1, "Please complete the verification"),
  // Honeypot — see schemas/waitlist.ts for why this has no length constraint.
  website: z.string().optional(),
});

export type DeleteAccountFormData = z.infer<typeof deleteAccountSchema>;
