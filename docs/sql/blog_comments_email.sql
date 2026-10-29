-- docs/sql/blog_comments_email.sql
-- Run once in the SQL Editor of the ADMIN-AUTH Supabase project
-- (fggsfrsourpxhunfnihm), after blog_phase2.sql.
--
-- Optional commenter email. Never returned by any public query; only the
-- staff moderation page reads it.

alter table public.blog_comments
    add column if not exists author_email text
    check (author_email is null or char_length (author_email) <= 254);

grant
all
on public.blog_comments to service_role;
notify
pgrst, 'reload schema';
