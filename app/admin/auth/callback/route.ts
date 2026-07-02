// app/admin/auth/callback/route.ts
// Lands here after the staff member clicks the emailed link. Exchanges
// the userId+secret token (minted in server/actions/admin-auth.ts) for a
// real Appwrite session, then sets it as an httpOnly cookie — this is
// Appwrite's documented SSR pattern, not a custom scheme:
// https://appwrite.io/docs/products/auth/server-side-rendering

import { type NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { createAdminClient } from "@/services/appwrite/clients";
import { SESSION_COOKIE_NAME } from "@/lib/admin/constants";
import { getManagedApp } from "@/lib/admin/apps";
import { BASE_URL } from "@/lib/config";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");
  const appSlug = searchParams.get("app") ?? "";
  const managedApp = getManagedApp(appSlug);
  const destination = managedApp ? `/admin/${managedApp.slug}` : "/admin";

  if (!userId || !secret) {
    return NextResponse.redirect(`${BASE_URL}/admin/login?error=missing_token`);
  }

  try {
    const { account } = createAdminClient();
    const session = await account.createSession({ userId, secret });

    const response = NextResponse.redirect(`${BASE_URL}${destination}`);
    response.cookies.set(SESSION_COOKIE_NAME, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: new Date(session.expire),
    });
    return response;
  } catch (err) {
    Sentry.captureException(err);
    return NextResponse.redirect(`${BASE_URL}/admin/login?error=invalid_link`);
  }
}
