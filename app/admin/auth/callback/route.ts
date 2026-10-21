// app/admin/auth/callback/route.ts
// Lands here after the staff member clicks the emailed link. Verifies the
// one-time token hash (minted in server/actions/admin-auth.ts) with
// Supabase and, on success, lets @supabase/ssr write the session cookies
// onto the redirect response. This is Supabase's documented SSR pattern
// (verifyOtp with a token_hash), not a custom scheme.

import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import * as Sentry from "@sentry/nextjs";
import {
  getAdminSupabasePublishableKey,
  getAdminSupabaseUrl,
} from "@/services/supabase/admin-client";
import { getManagedApp } from "@/lib/admin/apps";
import { BASE_URL } from "@/lib/config";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const managedApp = getManagedApp(searchParams.get("app") ?? "");
  const destination = managedApp ? `/admin/${managedApp.slug}` : "/admin";
  // The login page needs ?app=... or it bounces to the picker and drops
  // the error message.
  const loginBase = `${BASE_URL}/admin/login${managedApp ? `?app=${managedApp.slug}&` : "?"}`;

  if (!tokenHash) {
    return NextResponse.redirect(`${loginBase}error=missing_token`);
  }

  try {
    const response = NextResponse.redirect(`${BASE_URL}${destination}`);

    const supabase = createServerClient(
      getAdminSupabaseUrl(),
      getAdminSupabasePublishableKey(),
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    const { error } = await supabase.auth.verifyOtp({
      type: "email",
      token_hash: tokenHash,
    });

    if (error) {
      return NextResponse.redirect(`${loginBase}error=invalid_link`);
    }

    return response;
  } catch (err) {
    Sentry.captureException(err);
    return NextResponse.redirect(`${loginBase}error=unexpected`);
  }
}
