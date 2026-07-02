# 0002 — Staff auth moves to Appwrite, not a third Supabase project

## Status

Accepted. Supersedes the staff-auth half of ADR 0001 (the `staging`/`chef`/
`pg_cron` decisions in ADR 0001 are unaffected and still stand).

## Context

ADR 0001 called for a new, dedicated Supabase project to hold staff
accounts, separate from Henstel's and Natural Farming's own projects.
In practice, Supabase's free tier caps an account at 2 active projects
total — Henstel and Natural Farming already use both. The available
options were:

1. Upgrade an organization to Supabase Pro (~$25/mo) for a third project.
2. Put the `staff` table inside the existing Henstel project (a new
   `public.staff` table, reusing its `auth.users`).
3. Use a second Supabase account under a different email for another
   free 2-project allowance.
4. Use a different vendor entirely for just this piece.

Option 2 was technically sound (the `staff` table + RLS remains the real
authorization boundary regardless of which project hosts it), but the
explicit instruction was not to touch the Henstel or Natural Farming
projects at all. Option 3 works but means managing a second set of
platform credentials indefinitely. Option 1 costs money for a need that
fits comfortably in a free tier elsewhere.

## Decision

Staff authentication and the `staff` record move to **Appwrite**, in its
own project, completely separate from both Supabase projects:

- Appwrite Auth (Users API) holds staff identities. Accounts are created
  exclusively by `scripts/add-staff.mjs` — there is no public sign-up
  flow, so only people the owner explicitly provisions can ever exist as
  a user in this project.
- A `staff` collection (1 database, well inside the free tier's "1
  database" limit) holds `email`, `role`, `apps`, `isActive`, with the
  document ID set to the Appwrite user's `$id` and per-document read
  permission scoped to that user only.
- Sign-in uses Appwrite's custom token mechanism rather than its built-in
  Magic URL email: `users.list()` looks up the email without ever
  creating one (`shouldCreateUser: false` equivalent), `users.createToken()`
  mints a one-time secret, and the link is delivered through the
  project's existing Resend integration rather than Appwrite Cloud's
  fixed, unbrandable email templates.
- A daily Vercel Cron hits `/api/internal/keep-appwrite-warm` so the free
  Appwrite project's "paused after 7 days idle" limit is never reached
  even during quiet stretches with no staff logins.

## Alternatives considered

See Context above — embedding the table in Henstel's project remains the
technically simplest option and is the fallback if Appwrite ever becomes
a problem (rate limits, reliability, pricing changes). It was set aside
here only because of the explicit "don't touch Henstel or Natural
Farming" instruction, not because it was unsound.

## Consequences

- One more vendor in the stack, used for exactly one narrow purpose
  (staff identity), wrapped behind `services/appwrite/clients.ts` and
  `services/staff.ts` — nothing else in the codebase talks to Appwrite
  directly, matching the project's `/services` boundary rule.
- `APPWRITE_API_KEY` is a real secret (full project privileges) and is
  never used outside Server Actions/Route Handlers; it's never sent to
  the browser.
- Free-tier limits checked against this use case (1 admin today, a few
  staff later, no file storage, no Appwrite Functions): comfortably
  inside every quota except the 7-day pause window, which the keep-warm
  cron addresses directly.
- If Henstel or Natural Farming's Supabase plans are ever upgraded for
  other reasons, staff auth could later move into one of those projects
  to drop a vendor — not necessary now.
