// schemas/staff.ts
// Validates the `staff` row coming back from the admin-auth Supabase
// project. External data is still external input (PROJECT_RULES.md §5):
// a row that doesn't match — e.g. an unknown app slug — is treated as
// "not staff", failing closed.

import { z } from "zod";

export const staffRowSchema = z.object({
  id: z.string().min(1),
  email: z.string().min(1),
  role: z.enum(["owner", "staff"]),
  apps: z.array(z.enum(["henstel", "natural-farming", "wimm"])),
  is_active: z.boolean(),
  // Added by docs/sql/staff_wimm_access.sql — tolerated as missing so the
  // app keeps working before that migration has been run.
  display_name: z.string().nullish(),
});

export type StaffRow = z.infer<typeof staffRowSchema>;
