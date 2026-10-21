// lib/admin/apps.ts
// Static registry of apps manageable from the admin section.
// Natural Farming is listed so the picker shows it, but stays disabled
// until its admin scope and Supabase project are defined (Phase 4).

import type { AppSlug } from "./types";

export interface ManagedApp {
  slug: AppSlug;
  name: string;
  tagline: string;
  enabled: boolean;
}

export const MANAGED_APPS: ManagedApp[] = [
  {
    slug: "henstel",
    name: "Henstel",
    tagline: "Cookbooks, recipes, usage, and support",
    enabled: true,
  },
  {
    slug: "natural-farming",
    name: "Natural Farming",
    tagline: "Admin scope not defined yet",
    enabled: false,
  },
];

export function getManagedApp(slug: string): ManagedApp | undefined {
  return MANAGED_APPS.find((app) => app.slug === slug && app.enabled);
}

/** Admins that live outside the staff login. They have their own sign-in
 * and their own Supabase project, so the picker only links to them — the
 * staff session and staff.apps play no part. Do not merge these into
 * MANAGED_APPS (see the note at the top of proxy.ts). */
export interface ExternalAdmin {
  slug: string;
  name: string;
  tagline: string;
  href: string;
  note: string;
}

export const EXTERNAL_ADMINS: ExternalAdmin[] = [
  {
    slug: "wimm",
    name: "Where Is My Money?",
    tagline: "Promo offers, redemptions, and the website blog",
    href: "/wimm/admin",
    note: "Has its own Google sign-in",
  },
];
