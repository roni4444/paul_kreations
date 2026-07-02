// server/actions/usage.ts
// Server Action for the Usage dashboard. Gated by requireStaffAccess —
// see services/staff.ts for why that's the real authorization boundary.

"use server";

import * as Sentry from "@sentry/nextjs";
import { requireStaffAccess } from "@/services/staff";
import { getSentryUsage } from "@/services/usage/sentry-usage";
import { getResendUsage } from "@/services/usage/resend-usage";
import { getSupabaseUsage } from "@/services/usage/supabase-usage";
import { getAppwriteUsage } from "@/services/usage/appwrite-usage";
import type { UsageDashboard } from "@/schemas/usage";

export async function getUsageDashboardAction(): Promise<UsageDashboard> {
  await requireStaffAccess("henstel");

  try {
    const [sentry, resend, supabase, appwrite] = await Promise.all([
      getSentryUsage(),
      getResendUsage(),
      getSupabaseUsage(),
      getAppwriteUsage(),
    ]);
    return { sentry, resend, supabase, appwrite };
  } catch (err) {
    // Each individual getX() already catches its own errors and returns
    // a { status: "error" } card rather than throwing — this catch is
    // only a last-resort safety net (PROJECT_RULES.md §6: never fail
    // silently), not the expected path.
    Sentry.captureException(err);
    const message =
      err instanceof Error ? err.message : "Couldn't load usage data.";
    const errored = { status: "error" as const, message };
    return {
      sentry: errored,
      resend: errored,
      supabase: errored,
      appwrite: errored,
    };
  }
}
