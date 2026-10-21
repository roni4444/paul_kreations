// app/api/internal/keep-staff-auth-warm/route.ts
// Supabase's free tier pauses a project after about a week with no
// activity. A daily ping from Vercel Cron (see vercel.json) keeps the
// admin-auth project well inside that window with one cheap, side-effect-
// free query. Vercel automatically sends "Authorization: Bearer
// $CRON_SECRET" on its own cron-triggered requests once CRON_SECRET is set
// as an env var — this check rejects anyone else hitting the URL directly.

import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { createAdminServiceClient } from "@/services/supabase/admin-client";

export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  if (
    !process.env.CRON_SECRET ||
    auth !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { error } = await createAdminServiceClient()
      .from("staff")
      .select("id", { count: "exact", head: true });
    if (error) throw error;

    return NextResponse.json({ ok: true, pingedAt: new Date().toISOString() });
  } catch (err) {
    Sentry.captureException(err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
