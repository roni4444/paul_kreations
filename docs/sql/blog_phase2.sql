-- docs/sql/blog_phase2.sql
-- Run once in the SQL Editor of the ADMIN-AUTH Supabase project
-- (fggsfrsourpxhunfnihm), after docs/sql/blog.sql.
--
-- Phase 2 of the blog: comments (moderated) plus atomic view / reaction
-- counters. Counters live on public.blog_posts (created in blog.sql).

-- ── Comments ──────────────────────────────────────────────────────────────
create table if not exists public.blog_comments
(
    id
    uuid
    primary
    key
    default
    gen_random_uuid
(
),
    post_id uuid not null references public.blog_posts
(
    id
) on delete cascade,
    author_name text not null check
(
    char_length
(
    author_name
) between 1 and 60),
    body text not null check
(
    char_length
(
    body
) between 3 and 2000),
    status text not null default 'pending'
    check
(
    status
    in
(
    'pending',
    'approved',
    'rejected'
)),
    created_at timestamptz not null default now
(
),
    moderated_at timestamptz,
    moderated_by_name text
    );

create index if not exists blog_comments_post_approved_idx
    on public.blog_comments (post_id, created_at)
    where status = 'approved';

create index if not exists blog_comments_status_idx
    on public.blog_comments (status, created_at desc);

-- Same pattern as blog_posts: RLS on, no policies, server-side service role only.
alter table public.blog_comments
    enable row level security;

revoke all on public.blog_comments from anon, authenticated;
grant
all
on public.blog_comments to service_role;

-- ── Atomic counters ───────────────────────────────────────────────────────
-- A plain "read, add one, write" from the app would lose updates under
-- concurrent visitors; these do it in one statement. updated_at is NOT
-- touched, so counters never change a post's "last updated" date.

create
or replace function public.blog_record_view(p_post_id uuid)
    returns table
            (
                views    bigint,
                likes    integer,
                dislikes integer
            )
    language sql
as
$$
update public.blog_posts p
set view_count = p.view_count + 1
where p.id = p_post_id
  and p.status = 'published' returning p.view_count, p.like_count, p.dislike_count;
$$;

-- p_prev / p_next are 'like', 'dislike' or null. Moving from one to the
-- other, or removing a reaction, is a single call. greatest(0, …) guards the
-- counters if a visitor's cookie was cleared or edited.
create
or replace function public.blog_apply_reaction(p_post_id uuid, p_prev text, p_next text)
    returns table
            (
                views    bigint,
                likes    integer,
                dislikes integer
            )
    language sql
as
$$
update public.blog_posts p
set like_count    = greatest(0, p.like_count
                                    +
                                (case when p_next = 'like' then 1 else 0 end)
    - (case when p_prev = 'like' then 1 else 0 end)),
    dislike_count = greatest(0, p.dislike_count
                                    +
                                (case when p_next = 'dislike' then 1 else 0 end)
        - (case when p_prev = 'dislike' then 1 else 0 end))
where p.id = p_post_id
  and p.status = 'published' returning p.view_count, p.like_count, p.dislike_count;
$$;

-- Functions are executable by PUBLIC by default — lock them to the server.
revoke all on function public.blog_record_view(uuid) from public, anon, authenticated;
revoke all on function public.blog_apply_reaction(uuid, text, text) from public, anon, authenticated;
grant
execute
on
function
public
.
blog_record_view
(uuid) to service_role;
grant execute on function public.blog_apply_reaction
(uuid, text, text) to service_role;

notify
pgrst, 'reload schema';
