# 0006 — Blog ads (Google AdSense) and site legal pages

## Decision

- **Where:** ads appear only on `/blog/[slug]` posts of at least 600 words —
  never on the homepage, WIMM pages, forms or admin.
- **How many:** in-article ads after "big sections" (level-2 headings) once ≥
  450 words have passed since the start or the last ad (so the first screen is
  ad-free and ads are never crowded), plus one closing Display ad below the
  like/dislike row. Hard cap 10 per page; typical 2,000-word post gets about 4.
- **Types:** AdSense "In-article" (between sections) and "Display" (closing).
  In-feed is for the `/blog` list once there are many posts; Multiplex is
  skipped (overlaps with our own related-guides links). No Auto ads, so
  placement stays under our control.
- **Loading:** `next/script` (no new dependency), only on posts that render ads;
  each unit is requested only as it nears the viewport; an unfilled slot
  collapses. Off unless `NEXT_PUBLIC_ADSENSE_*` env vars are set, and always off
  in development.
- **ads.txt:** `public/ads.txt` with the publisher line.
- **Consent:** Google's free Privacy & messaging (certified consent message for
  EEA/UK/CH), configured in the AdSense dashboard. No custom consent banner, no
  consent data in Supabase. Our own cookies (`br_*`, `bv_*`) are first-party
  functional cookies, listed in the Cookie Policy.
- **Legal pages:** `/privacy`, `/cookies`, `/disclaimer` added; `/tos` extended
  (blog, comments, ads); `/wimm/cookies` scope clarified. App policies stay
  separate (`/wimm/privacy`, `/apps/[slug]/privacy`).

## Alternatives considered

- Auto ads: less control, can add overlays; rejected for a finance-education
  site.
- Own cookie-consent banner / consent store: more code and legal surface than
  Google's certified message; rejected.
- Fixed ad count per post: ignores post length; a word-spacing rule adapts to
  it.

## Consequences

- Revenue is bounded by the spacing rule, deliberately: readability and trust
  first.
- Ad category blocking (loans, credit cards, trading) must be set in AdSense.
- If new cookies, scripts or providers are added, update the Privacy and Cookie
  Policies in the same change.
