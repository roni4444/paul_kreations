// services/usage/staff-auth-usage.ts
// Reads real counts (staff rows, active staff) from the admin-auth
// Supabase project. Bandwidth/storage usage has no API-key-accessible
// endpoint, so the card links out to the dashboard for that.

import * as Sentry from "@sentry/nextjs";
import {
  createAdminServiceClient,
  getAdminSupabaseUrl,
} from "@/services/supabase/admin-client";
import type { StaffAuthUsage } from "@/schemas/usage";

export async function getStaffAuthUsage(): Promise<StaffAuthUsage> {
  try {
    const supabase = createAdminServiceClient();

    const [total, active] = await Promise.all([
      supabase.from("staff").select("id", { count: "exact", head: true }),
      supabase
        .from("staff")
        .select("id", { count: "exact", head: true })
        .eq("is_active", true),
    ]);

    if (total.error) throw total.error;
    if (active.error) throw active.error;

    // https://<project-ref>.supabase.co -> <project-ref>
    const projectRef = new URL(getAdminSupabaseUrl()).hostname.split(".")[0];

    return {
      status: "ok",
      totalStaff: total.count ?? 0,
      activeStaff: active.count ?? 0,
      dashboardUrl: `https://supabase.com/dashboard/project/${projectRef}`,
    };
  } catch (err) {
    Sentry.captureException(err);
    return {
      status: "error",
      message:
        err instanceof Error ? err.message : "Couldn't load staff auth counts.",
    };
  }
}
