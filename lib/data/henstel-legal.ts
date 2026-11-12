// lib/data/henstel-legal.ts
// Single source of truth for the facts repeated across the Henstel legal pages
// (privacy, terms, cookies, delete-account). Wording of the policies themselves
// lives in the page files; only values that must stay in sync live here.

import { HENSTEL_SUPPORT_EMAIL } from "@/lib/data/henstel";

export { HENSTEL_SUPPORT_EMAIL };

/** Shown as "Last Updated" on every Henstel legal page. */
export const HENSTEL_LEGAL_LAST_UPDATED = "12 November 2026";

/** Public home of the product. */
export const HENSTEL_PUBLIC_URL = "https://www.paulkreations.com/henstel";

/** How long deleted records can remain in routine hosting backups. */
export const HENSTEL_BACKUP_RETENTION = "30 days";

/** Target time to reply to a privacy request or deletion request. */
export const HENSTEL_RESPONSE_TARGET = "30 days";

/** Minimum age to use the app. */
export const HENSTEL_MIN_AGE = 13;

// Grievance Officer — required under India's DPDP Act, 2023.
export const HENSTEL_GRIEVANCE_OFFICER = {
  name: "Debapriyo Paul",
  email: "support@paulkreations.com",
  address: "20, Bindhyabasinitala Road, Ariadaha, Kolkata - 700057",
} as const;
