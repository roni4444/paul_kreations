// services/staff.ts
// Reads the current admin's staff record. This is the only place that
// queries the staff table directly — never query it from UI or route
// handlers.

import { createAdminClient, createSessionClient } from "./appwrite/clients";
import type { AppSlug, Staff } from "@/lib/admin/types";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

interface StaffRow {
  $id: string;
  email: string;
  role: "owner" | "staff";
  apps: string[];
  isActive: boolean;
}

export async function getCurrentStaff(): Promise<Staff | null> {
  const sessionClient = await createSessionClient();
  if (!sessionClient) return null;

  let userId: string;
  try {
    const user = await sessionClient.account.get();
    userId = user.$id;
  } catch {
    // Cookie present but the session is no longer valid (expired/revoked).
    return null;
  }

  try {
    // The staff row's ID is always the Appwrite user's $id — see
    // scripts/add-staff.mjs — so this is a direct lookup, not a query.
    const { tablesDB } = createAdminClient();
    const row = (await tablesDB.getRow(
      requireEnv("APPWRITE_DATABASE_ID"),
      requireEnv("APPWRITE_STAFF_TABLE_ID"),
      userId,
    )) as unknown as StaffRow;

    return {
      id: row.$id,
      email: row.email,
      role: row.role,
      apps: row.apps as AppSlug[],
      isActive: row.isActive,
    };
  } catch {
    // Authenticated with Appwrite, but no staff row — not staff.
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
