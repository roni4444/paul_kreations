-- docs/sql/blog_comments_replies.sql
-- Run once in the SQL Editor of the ADMIN-AUTH Supabase project
-- (fggsfrsourpxhunfnihm), after blog_comments_email.sql.
--
-- One-level replies and per-comment like / dislike counters.
-- parent_id is only ever a top-level comment (the app flattens a reply to a
-- reply onto its parent). Deleting a comment deletes its replies.

alter table public.blog_comments
    add column if not exists parent_id uuid references public.blog_comments (id) on delete cascade,
    add column if not exists like_count integer not null default 0 check (like_count >= 0),
    add column if not exists dislike_count integer not null default 0 check (dislike_count >= 0);

create index if not exists blog_comments_parent_idx
    on public.blog_comments (parent_id)
    where parent_id is not null;

-- Same atomic pattern as blog_apply_reaction: p_prev / p_next are 'like',
-- 'dislike' or null. Only approved comments can be reacted to.
create
or replace function public.blog_apply_comment_reaction(p_comment_id uuid, p_prev text, p_next text)
    returns table
            (
                likes    integer,
                dislikes integer
            )
    language sql
as
$$
update public.blog_comments c
set like_count    = greatest(0, c.like_count
                                    +
                                (case when p_next = 'like' then 1 else 0 end)
    - (case when p_prev = 'like' then 1 else 0 end)),
    dislike_count = greatest(0, c.dislike_count
                                    +
                                (case when p_next = 'dislike' then 1 else 0 end)
        - (case when p_prev = 'dislike' then 1 else 0 end))
where c.id = p_comment_id
  and c.status = 'approved' returning c.like_count, c.dislike_count;
$$;

revoke all on function public.blog_apply_comment_reaction(uuid, text, text) from public, anon, authenticated;
grant
execute
on
function
public
.
blog_apply_comment_reaction
(uuid, text, text) to service_role;

grant all
on public.blog_comments to service_role;
notify
pgrst, 'reload schema';
