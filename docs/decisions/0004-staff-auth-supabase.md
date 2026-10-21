# 0004 — Staff auth moves from Appwrite to a dedicated Supabase project

## Status

Accepted.
Supersedes [0002 — Staff auth moves to Appwrite](./0002-staff-auth-appwrite.md).
The Stream Chat support decision (0003) is unaffected apart from the staff ID
source noted under Consequences.

## Context

ADR 0002 put staff authentication on Appwrite because Supabase's free tier
caps an account at 2 active projects and both were taken (Henstel and Natural
Farming). A dedicated Supabase project for staff identities is now
available, which removes the reason for the extra vendor: one fewer platform
to hold credentials for, one less SDK, and the same auth primitives
(`auth.users` + a `staff` table protected by RLS) the rest of the stack
already uses.

## Decision

Staff authentication and the `staff` record live in a **new, dedicated
Supabase project** — separate from the main site project, Henstel, and
WIMM — so staff identities stay isolated from every product's own data.

- `auth.users` holds staff identities. Public sign-up is switched off;
  accounts are created only by `scripts/add-staff.mjs` using the secret key.
- `public.staff` (`id` = auth user id, `email`, `role`, `apps`, `is_active`)
  has RLS enabled with a single policy: an authenticated user may read only
  their own row. All writes go through the script with the service role.
  See `docs/sql/staff.sql`.
- Sign-in keeps the same user experience: the login form posts an email;
  the server checks it against active `staff` rows first (so an unknown
  email never gets an account created), calls
  `auth.admin.generateLink({ type: "magiclink" })`, and delivers the link
  through Resend in the existing branded template. The link carries the
  one-time `token_hash` to `/admin/auth/callback`, which verifies it with
  `verifyOtp` and lets `@supabase/ssr` set the session cookies.
- `proxy.ts` refreshes the session and redirects signed-out visitors,
  exactly as it already does for `/wimm/admin` — against a different
  project, so the two admin sessions still never share cookies.
- `requireStaffAccess()` in `services/staff.ts` remains the real
  authorization boundary for Server Actions.
- A daily Vercel Cron hits `/api/internal/keep-staff-auth-warm` so the free
  project's inactivity pause is never reached.

## Alternatives considered

1. **Keep Appwrite** — works, but keeps a second auth vendor for a narrow
   job that Supabase now covers.
2. **A `staff` table inside the Henstel project** — simplest technically,
   but mixes staff identity with one product's data and was already ruled
   out in ADR 0002.
3. **Supabase's built-in email OTP / Google sign-in** — less code, but the
   emails would not use the project's Resend branding (OTP), or would
   require Google accounts and an OAuth client (Google).

## Consequences

- Vendors drop from "Supabase + Appwrite" to Supabase only for auth.
  `node-appwrite`, the `APPWRITE_*` / `NEXT_PUBLIC_APPWRITE_*` env vars and
  `scripts/setup-appwrite.mjs` are no longer needed.
- New env vars: `ADMIN_SUPABASE_URL`, `ADMIN_SUPABASE_PUBLISHABLE_KEY`,
  `ADMIN_SUPABASE_SECRET_KEY`. The secret key bypasses RLS and is used only
  in Server Actions, Route Handlers and scripts — never in client code.
- Staff IDs change from Appwrite `$id`s to Supabase user UUIDs. Anything
  derived from the staff ID (the support-chat pseudonym and the
  `staff_<id>` Stream user ID in `services/stream/`) will change for
  existing staff, so older support conversations will show a different
  agent name.
- Existing Appwrite sessions stop working at cut-over; staff sign in again.
- Magic links are single-use. An email scanner that pre-opens links can
  consume the token before the person clicks it; if that ever happens,
  request a fresh link.
