// lib/ads.ts
// Google AdSense configuration and placement rules for blog posts.
//
// Ads stay OFF until all of these are set (Vercel env vars; see
// docs/ENV_VARS.md) — so deploying this code before AdSense approves the
// site changes nothing:
//   NEXT_PUBLIC_ADSENSE_CLIENT            e.g. ca-pub-2310065446402536
//   NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE   ad unit id of an "In-article" unit
//   NEXT_PUBLIC_ADSENSE_SLOT_DISPLAY      ad unit id of a "Display" unit
// They are also off in development (PROJECT_RULES.md §12: env-controlled,
// lazy-loaded, dev-disabled).

export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";
export const ADSENSE_SLOT_IN_ARTICLE =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE ?? "";
export const ADSENSE_SLOT_DISPLAY =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_DISPLAY ?? "";

export const adsEnabled: boolean =
  process.env.NODE_ENV === "production" &&
  ADSENSE_CLIENT !== "" &&
  ADSENSE_SLOT_IN_ARTICLE !== "" &&
  ADSENSE_SLOT_DISPLAY !== "";

// ── Placement rules ──────────────────────────────────────────────────────

/** Hard cap on ads per post page: in-article ads + the one closing display ad. */
export const MAX_ADS_PER_POST = 10;

/** Posts shorter than this get no ads (thin content). */
export const MIN_WORDS_FOR_ADS = 600;

/** Minimum words of content between two ads — and before the first one, so
 * nothing appears in the first screen. */
export const MIN_WORDS_BETWEEN_ADS = 450;

/** An in-article ad is skipped if less than this much text follows it, so it
 * never sits right next to the closing ad. */
export const MIN_WORDS_AFTER_AD = 150;

export function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
}

/** Whether a post is long enough to carry ads at all. */
export function postQualifiesForAds(bodyMd: string): boolean {
  return adsEnabled && countWords(bodyMd) >= MIN_WORDS_FOR_ADS;
}
