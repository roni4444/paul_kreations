-- docs/sql/waitlist_signups.sql
-- Run this once in the Supabase SQL Editor for the shared project
-- (Supabase → SQL Editor → New query → paste → Run).
--
-- Per your answer: "Shared project recommended — landing site uses
-- waitlist_signups, newsletter_subscribers, referrals tables; one auth
-- backend, clear separation by schema/RLS policies." This creates the
-- first of those three tables.

create table if not exists public.waitlist_signups
(
    id
    uuid
    primary
    key
    default
    gen_random_uuid
(
),
    full_name text not null,
    email text not null unique,
    use_case text not null, -- one of WIMM_INTEREST_OPTIONS values
    platform_interest text not null, -- one of WIMM_PLATFORM_OPTIONS values
    source text not null default 'direct',
    notified_at timestamptz, -- set when the launch email goes out
    created_at timestamptz not null default now
(
)
    );

create index if not exists waitlist_signups_created_at_idx
    on public.waitlist_signups (created_at desc);

create index if not exists waitlist_signups_source_idx
    on public.waitlist_signups (source);

-- ── Row Level Security ────────────────────────────────────────────────────
-- PROJECT_RULES.md §9: "Supabase RLS must be enabled."
-- Writes happen exclusively through server/actions/waitlist.ts using the
-- SERVICE ROLE key (services/supabase/client.ts), which bypasses RLS by
-- design. RLS here exists as defense-in-depth: if the anon/public key were
-- ever used against this table directly (e.g. from a future client-side
-- integration), it should be allowed to do nothing at all.

alter table public.waitlist_signups enable row level security;

-- No policies are created for the anon or authenticated roles — this means
-- every operation (select/insert/update/delete) is denied by default for
-- any client using the anon or authenticated key. Only the service role
-- (which bypasses RLS entirely) can read or write this table.
--
-- If you later build the admin panel with Supabase Auth-based admin users,
-- add a policy like:
--
-- create policy "Admins can read waitlist signups"
--   on public.waitlist_signups for select
--   using (auth.jwt() ->> 'role' = 'admin');
