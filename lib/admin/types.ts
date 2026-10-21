// lib/admin/types.ts
// Shared types for the admin section.

export type AppSlug = "henstel" | "natural-farming" | "wimm";

export type StaffRole = "owner" | "staff";

export interface Staff {
  id: string;
  email: string;
  /** Shown publicly as blog author/reviewer. Falls back to the part of the
   * email before the @ — never the full address. */
  displayName: string;
  role: StaffRole;
  apps: AppSlug[];
  isActive: boolean;
}
