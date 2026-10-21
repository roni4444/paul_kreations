-- docs/sql/staff.sql
-- Run this once in the SQL Editor of the dedicated ADMIN-AUTH Supabase
-- project (fggsfrsourpxhunfnihm) — NOT the main site project and NOT the
-- Henstel / WIMM projects. See docs/decisions/0004-staff-auth-supabase.md.
--
-- This project exists only to hold staff identities (auth.users) and the
-- staff table below. Nothing else should ever live here.

create table if not exists public.staff
(
    id
    uuid
    primary
    key
    references
    auth
    .
    users
(
    id
) on delete cascade,
    email text not null unique,
    role text not null check
(
    role
    in
(
    'owner',
    'staff'
)),
    apps text[] not null default '{}'
    check
(
    apps <
    @
    array [
    'henstel',
    'natural-farming']
    :
    :
    text
[]
),
    is_active boolean not null default true,
    created_at timestamptz not null default now
(
)
    );

-- ── Row Level Security ────────────────────────────────────────────────────
-- PROJECT_RULES.md §9: RLS must be enabled.
-- A signed-in staff member may read ONLY their own row (that is how
-- services/staff.ts resolves "who am I and what can I access").
-- There are deliberately no insert/update/delete policies: staff rows are
-- created and changed only by scripts/add-staff.mjs using the secret
-- (service-role) key, which bypasses RLS.

alter table public.staff
    enable row level security;

drop
policy if exists "Staff can read their own row" on public.staff;
create
policy "Staff can read their own row"
    on public.staff for
select
    to authenticated
    using (id = (select auth.uid()));

-- Supabase grants broad table privileges to anon/authenticated by default.
-- Narrow them so RLS is not the only line of defence.
revoke all on public.staff from anon, authenticated;
grant select on public.staff to authenticated;

-- ── Dashboard settings (cannot be done in SQL) ────────────────────────────
-- Authentication → Sign In / Providers → turn OFF "Allow new users to
-- sign up". Staff accounts are created only by scripts/add-staff.mjs
-- (the Admin API still works with sign-ups disabled).
-- No redirect URL allow-list changes are needed: the sign-in link points
-- at our own /admin/auth/callback and is verified server-side with
-- verifyOtp(token_hash), not via Supabase's hosted redirect.
