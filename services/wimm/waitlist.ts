// services/wimm/waitlist.ts
// All Supabase access for the Where Is My Money? waitlist table lives here — never call
// Supabase directly from UI or Server Actions (PROJECT_RULES.md §11).
//
// Table: waitlist_signups (see docs/sql/waitlist_signups.sql for schema + RLS)

import { getSupabaseServerClient } from "@/services/supabase/client";
import type { WaitlistFormData } from "@/schemas/waitlist";

export type WaitlistInsertResult =
  | { success: true; alreadyExists: boolean }
  | { success: false; error: string };

export async function insertWaitlistSignup(
  data: Omit<WaitlistFormData, "turnstileToken" | "website">,
): Promise<WaitlistInsertResult> {
  try {
    const supabase = getSupabaseServerClient();

    const { error } = await supabase.from("waitlist_signups").insert({
      full_name: data.fullName,
      email: data.email.toLowerCase().trim(),
      use_case: data.useCase,
      platform_interest: data.platform,
      source: data.source ?? "direct",
    });

    if (error) {
      // Unique constraint on `email` — treat a duplicate signup as a
      // soft success so the user isn't shown a scary error for re-submitting.
      if (error.code === "23505") {
        return { success: true, alreadyExists: true };
      }

      console.error("[insertWaitlistSignup] Supabase error:", error);
      return {
        success: false,
        error: "Couldn't save your spot. Please try again.",
      };
    }

    return { success: true, alreadyExists: false };
  } catch (err) {
    console.error("[insertWaitlistSignup] Unexpected error:", err);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
