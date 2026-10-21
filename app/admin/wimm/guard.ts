// app/admin/wimm/guard.ts
// Page-level gate shared by every /admin/wimm page. This is the UX layer —
// signed-out visitors go to login, signed-in staff without access to the
// "Where Is My Money?" app go to "not authorized". The real security
// boundary is requireStaffAccess in each Server Action (see
// services/staff.ts).

import { redirect } from "next/navigation";
import { getCurrentStaff, staffCanAccess } from "@/services/staff";
import type { Staff } from "@/lib/admin/types";

export async function requireWimmStaffPage(): Promise<Staff> {
  const staff = await getCurrentStaff();

  if (!staff) {
    redirect("/admin/login?app=wimm");
  }
  if (!staffCanAccess(staff, "wimm")) {
    redirect("/admin/unauthorized");
  }
  return staff;
}
