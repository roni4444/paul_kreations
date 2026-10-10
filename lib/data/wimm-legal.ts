// lib/data/wimm-legal.ts
// Single source of truth for the facts repeated across the WIMM legal pages
// (privacy, terms, cookies, delete-account). Wording of the policies themselves
// lives in the page files; only values that must stay in sync live here.

import { WIMM_SUPPORT_EMAIL } from "@/lib/data/wimm";

export { WIMM_SUPPORT_EMAIL };

/** Shown as "Last Updated" on every WIMM legal page. */
export const WIMM_LEGAL_LAST_UPDATED = "10 October 2026";

/** Public home of the product; replaces the old wimm.paulkreations.com host. */
export const WIMM_PUBLIC_URL = "https://www.paulkreations.com/wimm";

/** How long deleted records can remain in routine hosting backups. */
export const WIMM_BACKUP_RETENTION = "30 days";

/** Target time to reply to a privacy request or deletion request. */
export const WIMM_RESPONSE_TARGET = "30 days";

// Grievance Officer — required under India's DPDP Act, 2023.
export const WIMM_GRIEVANCE_OFFICER = {
  name: "Debapriyo Paul",
  email: "suppoart@paulkreations.com",
  address: "20, Bindhyabasinitala Road, Ariadaha, Kolkata - 700057",
} as const;
