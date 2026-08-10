// services/wimm/delete-account.ts
// All Supabase access for account_deletion_requests lives here — never call
// Supabase directly from UI or Server Actions (PROJECT_RULES.md §11).
//
// This deliberately does NOT delete anything automatically. It logs the
// request so you have an auditable record, and server/actions/delete-account.ts
// emails you immediately so a human reviews and actually performs the
// deletion. Auto-deleting on an unauthenticated web form submission would be
// an easy abuse vector (anyone could submit anyone else's email) — a manual
// review step before touching real data is the safer default until you
// decide otherwise.

import { getSupabaseServerClient } from "@/services/supabase/client";

type DeletionRequestInput = {
  email: string;
  accountIdentifier?: string;
  reason?: string;
};

export async function insertDeletionRequest(
  data: DeletionRequestInput,
): Promise<
  { success: true; requestId: string } | { success: false; error: string }
> {
  try {
    const supabase = getSupabaseServerClient();

    const { data: inserted, error } = await supabase
      .from("account_deletion_requests")
      .insert({
        email: data.email.toLowerCase().trim(),
        account_identifier: data.accountIdentifier || null,
        reason: data.reason || null,
        status: "pending",
      })
      .select("id")
      .single();

    if (error || !inserted) {
      console.error("[insertDeletionRequest] Supabase error:", error);
      return {
        success: false,
        error: "Couldn't submit your request. Please try again.",
      };
    }

    return { success: true, requestId: inserted.id as string };
  } catch (err) {
    console.error("[insertDeletionRequest] Unexpected error:", err);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
