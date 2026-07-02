// schemas/admin-auth.ts
// Validation for the admin magic-link login form.

import { z } from "zod";

export const magicLinkSchema = z.object({
  email: z
    .string()
    .email("Enter a valid email address")
    .max(255, "Email address is too long"),
  app: z.enum(["henstel", "natural-farming"]),
});

export type MagicLinkFormData = z.infer<typeof magicLinkSchema>;
