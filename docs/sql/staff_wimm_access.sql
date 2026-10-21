-- docs/sql/staff_wimm_access.sql
-- Run this once in the SQL Editor of the ADMIN-AUTH Supabase project
-- (fggsfrsourpxhunfnihm). Safe to run more than once, and safe to run
-- BEFORE deploying the code: the app reads the staff row tolerantly, so a
-- missing display_name never locks anyone out.

-- 1. Blog authors/reviewers are shown by name, so staff need one.
alter table public.staff
    add column if not exists display_name text;

-- 2. "wimm" (Where Is My Money?) becomes a valid app alongside henstel and
--    natural-farming. This also replaces the constraint from an earlier
--    draft that allowed "blog".
alter table public.staff
drop
constraint if exists staff_apps_check;
alter table public.staff
    add constraint staff_apps_check
        check (apps < @ array['henstel', 'natural-farming', 'wimm']::text[]);

-- 3. Give yourself a display name (owners already have access to every app):
-- update public.staff set display_name = 'Your Name' where email = 'you@example.com';
-- or: node --env-file=.env.local scripts/add-staff.mjs you@example.com owner --name "Your Name"
