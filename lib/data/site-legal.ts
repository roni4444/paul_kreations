// lib/data/site-legal.ts
// Facts repeated across the site-wide legal pages (privacy, cookies,
// disclaimer, terms) — the paulkreations.com website, including the blog.
// The WIMM app and its /wimm pages have their own policies
// (lib/data/wimm-legal.ts); keep the two separate.

export const SITE_LEGAL_LAST_UPDATED = "2026-10-29";

export const SITE_CONTACT_EMAIL = "support@paulkreations.com";

// Grievance Officer — India's DPDP Act, 2023. Same person and postal
// address as in the WIMM privacy policy, with the site contact address.
export const SITE_GRIEVANCE_OFFICER = {
  name: "Debapriyo Paul",
  email: SITE_CONTACT_EMAIL,
  address: "20, Bindhyabasinitala Road, Ariadaha, Kolkata - 700057",
} as const;

/** Target time to reply to a privacy or comment-removal request. */
export const SITE_RESPONSE_TARGET = "30 days";
