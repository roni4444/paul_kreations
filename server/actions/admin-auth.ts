// server/actions/admin-auth.ts
// Server Actions for the admin login form and sign-out.
//
// The authorization gate: users.list({ queries: [Query.equal("email", ...)] })
// only ever looks an email up — it never creates one. Accounts are
// provisioned exclusively by scripts/add-staff.mjs. An email with no
// matching Appwrite user gets the exact same "check your email" response
// as a real one, so the form can't be used to discover who has access.

"use server";

import { redirect } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import { Query } from "node-appwrite";
import { cookies } from "next/headers";
import {
  createAdminClient,
  createSessionClient,
} from "@/services/appwrite/clients";
import { SESSION_COOKIE_NAME } from "@/lib/admin/constants";
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

  try {
    const { users } = createAdminClient();

    const existing = await users.list({
      queries: [Query.equal("email", parsed.data.email)],
    });

    if (existing.total === 0) {
      // Same response as the success path on purpose — don't reveal
      // whether this email has an account.
      return { status: "sent" };
    }

    const appwriteUser = existing.users[0];
    const token = await users.createToken({ userId: appwriteUser.$id });

    const link = `${BASE_URL}/admin/auth/callback?app=${encodeURIComponent(parsed.data.app)}&userId=${encodeURIComponent(token.userId)}&secret=${encodeURIComponent(token.secret)}`;

    const result = await sendAdminSignInEmail(parsed.data.email, link);
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
  const sessionClient = await createSessionClient();
  if (sessionClient) {
    try {
      await sessionClient.account.deleteSession("current");
    } catch {
      // Already invalid — fine, we're signing out regardless.
    }
  }

  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect("/admin/login");
}
