// app/wimm/admin/auth/callback/route.ts
// Exchanges the OAuth code for a session, then immediately checks
// money.promo_admins membership — a signed-in Google account is not the
// same thing as an authorized one. Non-members are signed back out
// immediately rather than left holding a valid-but-useless session.

import { type NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { createWimmSupabaseServerClient } from "@/services/supabase/wimm-client";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${origin}/wimm/admin/login`);
  }

  const supabase = await createWimmSupabaseServerClient();
  const { error: exchangeError } =
    await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    Sentry.captureException(exchangeError);
    return NextResponse.redirect(`${origin}/wimm/admin/login`);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(`${origin}/wimm/admin/login`);
  }

  const { data: adminRow, error: adminError } = await supabase
    .from("promo_admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (adminError) {
    Sentry.captureException(adminError);
  }

  if (!adminRow) {
    await supabase.auth.signOut();
    return NextResponse.redirect(`${origin}/wimm/admin/unauthorized`);
  }

  return NextResponse.redirect(`${origin}/wimm/admin`);
}
