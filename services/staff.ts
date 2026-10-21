// services/staff.ts
// Reads the current admin's staff record. This is the only place that
// queries the staff table on behalf of a signed-in user — never query it
// from UI or route handlers.

import * as Sentry from "@sentry/nextjs";
import { createAdminSessionClient } from "./supabase/admin-client";
import { staffRowSchema } from "@/schemas/staff";
import type { AppSlug, Staff } from "@/lib/admin/types";

export async function getCurrentStaff(): Promise<Staff | null> {
  // Created OUTSIDE the try/catch on purpose: this awaits cookies(), which
  // signals "this page is dynamic" by throwing a special error during
  // static prerendering. Swallowing it would let Next try to prerender
  // admin pages at build time.
  const supabase = await createAdminSessionClient();

  try {
    // getUser() validates the session with the Supabase Auth server —
    // unlike getSession(), it can't be fooled by a tampered cookie.
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) return null;

    // Runs as the signed-in user, so RLS ("read your own row only") is
    // enforced by the database, not just by this code. The staff row's id
    // is always the auth user's id — see scripts/add-staff.mjs.
    const { data, error } = await supabase
      .from("staff")
      .select("id, email, role, apps, is_active")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      Sentry.captureException(error);
      return null;
    }
    // Authenticated, but no staff row — not staff.
    if (!data) return null;

    const parsed = staffRowSchema.safeParse(data);
    if (!parsed.success) {
      Sentry.captureException(parsed.error);
      return null;
    }

    return {
      id: parsed.data.id,
      email: parsed.data.email,
      role: parsed.data.role,
      apps: parsed.data.apps as AppSlug[],
      isActive: parsed.data.is_active,
    };
  } catch (err) {
    Sentry.captureException(err);
    return null;
  }
}

/** Owners have access to every app; staff are scoped to their `apps` list. */
export function staffCanAccess(staff: Staff | null, appSlug: AppSlug): boolean {
  if (!staff || !staff.isActive) return false;
  if (staff.role === "owner") return true;
  return staff.apps.includes(appSlug);
}

/**
 * Guard for every Server Action that touches an app's data. Server
 * Actions are NOT automatically protected by middleware the way page
 * renders are — middleware matches on the page route, but a Server
 * Action's actual POST target is a separate internal endpoint. This is
 * the real enforcement point; the page-level checks are a UX nicety on
 * top of it, not the security boundary.
 */
export async function requireStaffAccess(appSlug: AppSlug): Promise<Staff> {
  const staff = await getCurrentStaff();
  if (!staffCanAccess(staff, appSlug)) {
    throw new Error("Not authorized");
  }
  return staff as Staff;
}
