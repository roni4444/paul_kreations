// server/actions/admin-auth.ts
// Server Actions for the admin login form and sign-out.
//
// The authorization gate: we look the email up in the `staff` table
// (active rows only) BEFORE asking Supabase for a link. generateLink() on
// its own would happily create an account for an unknown email, so the
// staff table — not auth.users — decides who may receive a link. Accounts
// and staff rows are provisioned exclusively by scripts/add-staff.mjs. An
// email with no staff row gets the exact same "check your email" response
// as a real one, so the form can't be used to discover who has access.

"use server";

import { redirect } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import {
  createAdminServiceClient,
  createAdminSessionClient,
} from "@/services/supabase/admin-client";
import { magicLinkSchema } from "@/schemas/admin-auth";
import { sendAdminSignInEmail } from "@/services/email-admin";
import { BASE_URL } from "@/lib/config";

export interface MagicLinkState {
  status: "idle" | "sent" | "error";
  message?: string;
}

const GENERIC_ERROR =
  "Something went wrong sending that link. Please try again.";

export async function requestMagicLink(
  _prevState: MagicLinkState,
  formData: FormData,
): Promise<MagicLinkState> {
  const parsed = magicLinkSchema.safeParse({
    email: formData.get("email"),
    app: formData.get("app"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }

  // Staff emails are stored lower-case by scripts/add-staff.mjs.
  const email = parsed.data.email.trim().toLowerCase();

  try {
    const supabase = createAdminServiceClient();

    const { data: staff, error: lookupError } = await supabase
      .from("staff")
      .select("id")
      .eq("email", email)
      .eq("is_active", true)
      .maybeSingle();

    if (lookupError) {
      Sentry.captureException(lookupError);
      return { status: "error", message: GENERIC_ERROR };
    }

    if (!staff) {
      // Same response as the success path on purpose — don't reveal
      // whether this email has access.
      return { status: "sent" };
    }

    const { data: linkData, error: linkError } =
      await supabase.auth.admin.generateLink({ type: "magiclink", email });

    const tokenHash = linkData?.properties?.hashed_token;
    if (linkError || !tokenHash) {
      Sentry.captureException(
        linkError ?? new Error("generateLink returned no hashed_token"),
      );
      return { status: "error", message: GENERIC_ERROR };
    }

    const link = `${BASE_URL}/admin/auth/callback?app=${encodeURIComponent(parsed.data.app)}&token_hash=${encodeURIComponent(tokenHash)}`;

    const result = await sendAdminSignInEmail(email, link);
    if (!result.success) {
      Sentry.captureMessage("Failed to send admin sign-in email", "error");
      return { status: "error", message: GENERIC_ERROR };
    }

    return { status: "sent" };
  } catch (err) {
    Sentry.captureException(err);
    return { status: "error", message: GENERIC_ERROR };
  }
}

export async function signOut() {
  try {
    const supabase = await createAdminSessionClient();
    // Revokes the session server-side and clears the auth cookies.
    await supabase.auth.signOut();
  } catch (err) {
    // Already invalid — fine, we're signing out regardless.
    Sentry.captureException(err);
  }
  redirect("/admin/login");
}
