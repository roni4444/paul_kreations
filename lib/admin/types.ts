// lib/admin/types.ts
// Shared types for the admin section.

export type AppSlug = "henstel" | "natural-farming";

export type StaffRole = "owner" | "staff";

export interface Staff {
  id: string;
  email: string;
  role: StaffRole;
  apps: AppSlug[];
  isActive: boolean;
}
