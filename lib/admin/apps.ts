// lib/admin/apps.ts
// Static registry of apps manageable from the admin section.
// Natural Farming is listed so the picker shows it, but stays disabled
// until its admin scope and Supabase project are defined (Phase 4).
//
// "Where Is My Money?" (wimm) is the website-side admin for the WIMM
// product: the blog editor, plus a link out to the separate promo-offers
// admin at /wimm/admin (which keeps its own Google sign-in and Supabase
// project — see the note at the top of proxy.ts).

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
    slug: "wimm",
    name: "Where Is My Money?",
    tagline: "Website blog, and the way into promo offers",
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
