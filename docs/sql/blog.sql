-- docs/sql/blog.sql
-- Run this once in the SQL Editor of the ADMIN-AUTH Supabase project
-- (fggsfrsourpxhunfnihm) — the same project that holds public.staff.
-- author_id / reviewer_id are public.staff ids.
--
-- Phase 1 of the blog: posts. Comments, reactions and view tracking arrive
-- in phase 2 (the counter columns below are created now so phase 2 needs no
-- change to this table).

create table if not exists public.blog_posts
(
    id
    uuid
    primary
    key
    default
    gen_random_uuid
(
),
    slug text not null unique
    check
(
    slug
    ~
    '^[a-z0-9]+(-[a-z0-9]+)*$'
),
    title text not null,
    excerpt text not null default '',
    body_md text not null default '',
    status text not null default 'draft'
    check
(
    status
    in
(
    'draft',
    'published'
)),

    -- Author = whoever created the post; reviewer = whoever last edited it
    -- (when that is someone other than the author). These are staff
    -- ids (public.staff), kept as plain UUIDs with no
    -- foreign key; the display name is stored as a snapshot so the public
    -- page never has to look anyone up.
    author_id uuid not null,
    author_name text not null,
    reviewer_id uuid,
    reviewer_name text,

    published_at timestamptz,
    created_at timestamptz not null default now
(
),
    -- Set by the application on every content edit — deliberately NOT a
    -- trigger, so counter updates (views/likes) never change "last updated".
    updated_at timestamptz not null default now
(
),

    view_count bigint not null default 0 check
(
    view_count
    >=
    0
),
    like_count integer not null default 0 check
(
    like_count
    >=
    0
),
    dislike_count integer not null default 0 check
(
    dislike_count
    >=
    0
),
    check
(
    status
    <>
    'published'
    or
    published_at
    is
    not
    null
)
    );

create index if not exists blog_posts_published_idx
    on public.blog_posts (published_at desc)
    where status = 'published';

-- ── Row Level Security ────────────────────────────────────────────────────
-- PROJECT_RULES.md §9. Same pattern as waitlist_signups: every read and
-- write goes through server code using the SERVICE ROLE key
-- (services/supabase/blog.ts). Public reads there always filter on
-- status = 'published' and never select author_id / reviewer_id. With no
-- policies for anon/authenticated, a leaked or future client-side key can
-- do nothing at all to this table.

alter table public.blog_posts
    enable row level security;

revoke all on public.blog_posts from anon, authenticated;

-- The server uses the service_role key. Grant it explicitly: projects whose
-- Data API does not auto-grant new tables fail with "permission denied"
-- (42501) otherwise. Harmless if it already has access.
grant
all
on public.blog_posts to service_role;

-- Make PostgREST pick up the new table immediately.
notify
pgrst, 'reload schema';
