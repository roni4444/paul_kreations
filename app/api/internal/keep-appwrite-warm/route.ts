// app/api/internal/keep-appwrite-warm/route.ts
// Appwrite's free tier pauses a project after 7 days with no activity.
// A daily ping from Vercel Cron (see vercel.json) keeps it well inside
// that window with one cheap, side-effect-free API call. Vercel
// automatically sends "Authorization: Bearer $CRON_SECRET" on its own
// cron-triggered requests once CRON_SECRET is set as an env var — this
// check rejects anyone else hitting the URL directly.

import { NextResponse } from "next/server";
import { createAdminClient } from "@/services/appwrite/clients";

export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { users } = createAdminClient();
    await users.list({ queries: [] });
    return NextResponse.json({ ok: true, pingedAt: new Date().toISOString() });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
