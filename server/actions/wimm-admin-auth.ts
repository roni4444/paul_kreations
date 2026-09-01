"use server";

// server/actions/wimm-admin-auth.ts
// Sign-in kickoff for the WIMM promo-offers admin. Turnstile is verified
// here, server-side, before Supabase ever issues a redirect — the same
// boundary services/security/turnstile.ts already enforces for the
// waitlist and account-deletion forms.
//
// NOTE: this assumes services/security/turnstile.ts exports
// `verifyTurnstileToken(token: string): Promise<boolean>`. Adjust the
// import/name below if the real export differs — I couldn't see that
// file's contents to confirm the exact signature.

import { redirect } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import {
  wimmAdminPasswordSignInSchema,
  wimmAdminSignInSchema,
} from "@/schemas/wimm-admin";
import { verifyTurnstileToken } from "@/services/security/turnstile";
import { createWimmSupabaseServerClient } from "@/services/supabase/wimm-client";
import { BASE_URL } from "@/lib/config";

export interface WimmAdminSignInState {
  status: "idle" | "error";
  message?: string;
}

export async function signInWithGoogleAction(
  _prevState: WimmAdminSignInState,
  formData: FormData,
): Promise<WimmAdminSignInState> {
  const parsed = wimmAdminSignInSchema.safeParse({
    turnstileToken: formData.get("turnstileToken"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message:
        parsed.error.issues[0]?.message ?? "Please complete the verification.",
    };
  }

  let isHuman: { success: true } | { success: false; error: string };
  try {
    isHuman = await verifyTurnstileToken(parsed.data.turnstileToken);
  } catch (err) {
    Sentry.captureException(err);
    return {
      status: "error",
      message: "Verification failed. Please try again.",
    };
  }

  if (!isHuman) {
    return {
      status: "error",
      message: "Verification failed. Please try again.",
    };
  }

  const supabase = await createWimmSupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${BASE_URL}/wimm/admin/auth/callback`,
    },
  });

  if (error || !data.url) {
    Sentry.captureException(error ?? new Error("No OAuth URL returned"));
    return {
      status: "error",
      message: "Couldn't start sign-in. Please try again.",
    };
  }

  redirect(data.url);
}

// Sign-in only — there is deliberately no matching sign-up action. Password
// accounts for this admin are created by hand in Supabase (Authentication →
// Users → Add user), the same way the promo_admins row itself is seeded.
// If that account uses the same email as the Google account, Supabase links
// them under one auth.users id automatically, so a single promo_admins row
// covers both sign-in methods; a different email needs its own row.
export async function signInWithPasswordAction(
  _prevState: WimmAdminSignInState,
  formData: FormData,
): Promise<WimmAdminSignInState> {
  const parsed = wimmAdminPasswordSignInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    turnstileToken: formData.get("turnstileToken"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }

  let isHuman: { success: true } | { success: false; error: string };
  try {
    isHuman = await verifyTurnstileToken(parsed.data.turnstileToken);
  } catch (err) {
    Sentry.captureException(err);
    return {
      status: "error",
      message: "Verification failed. Please try again.",
    };
  }

  if (!isHuman) {
    return {
      status: "error",
      message: "Verification failed. Please try again.",
    };
  }

  const supabase = await createWimmSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    // Deliberately generic — never confirm whether the email exists.
    return { status: "error", message: "Invalid email or password." };
  }

  redirect("/wimm/admin");
}

export async function signOutAction() {
  const supabase = await createWimmSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/wimm/admin/login");
}
