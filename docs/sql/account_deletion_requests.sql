-- docs/sql/account_deletion_requests.sql
-- Run this once in the Supabase SQL Editor (same project as waitlist_signups).
--
-- Every submission through app/wimm/delete-account triggers an insert here
-- AND an email to you (services/wimm/email.ts →
-- sendDeletionRequestOwnerNotification). This table is the audit trail you
-- process requests against — mark status='completed' once you've actually
-- deleted the person's data, so you have a record for Play Store compliance
-- if it's ever questioned.

create table if not exists public.account_deletion_requests
(
    id
    uuid
    primary
    key
    default
    gen_random_uuid
(
),
    email text not null,
    account_identifier text, -- optional second identifier the user gave
    reason text, -- optional, why they're leaving (feedback)
    status text not null default 'pending', -- pending | completed | rejected
    requested_at timestamptz not null default now
(
),
    processed_at timestamptz,
    processed_note text -- e.g. "no account found for this email"
    );

create index if not exists account_deletion_requests_status_idx
    on public.account_deletion_requests (status);

create index if not exists account_deletion_requests_requested_at_idx
    on public.account_deletion_requests (requested_at desc);

-- ── Row Level Security ────────────────────────────────────────────────────
-- Same pattern as waitlist_signups: writes go through the service role key
-- only (services/supabase/client.ts). No anon/authenticated policies are
-- defined, so the public API key can't read, insert, update, or delete here
-- at all — this table holds real personal data (email, deletion reasons),
-- so it should never be reachable from the browser.

alter table public.account_deletion_requests enable row level security;

-- If you build the admin panel later, add something like:
--
-- create policy "Admins can manage deletion requests"
--   on public.account_deletion_requests for all
--   using (auth.jwt() ->> 'role' = 'admin');
