# 0007 — Comment reactions, replies and currency display

**Comments.** Visitors can like/dislike any approved comment and reply to
it. Replies are one level deep (a reply to a reply attaches to the top-level
comment, prefilled with `@name`). Replies reuse the comment pipeline:
Turnstile, honeypot, moderation — nothing shows until approved. Comment
reactions are counted atomically in SQL (`blog_apply_comment_reaction`) and
tracked per visitor in one httpOnly cookie `bcr` (capped at 60 entries).
Optional commenter email is stored but never returned by public queries.
SQL: `docs/sql/blog_comments_email.sql`, then `blog_comments_replies.sql`.

**Currency.** Amounts are marked `{{money:N}}` (INR) in the Markdown and
replaced at render time by a client `<Money>`; `{{currency:inr}}` on the first
line pins a post to rupees. Country comes from `x-vercel-ip-country` (or
`cf-ipcountry`) via a server action, so the post page stays ISR-cached.
Rates: open.er-api.com, cached 12h by Next, with a static fallback table in
`lib/money.ts` (refresh occasionally). Number formatting uses a per-country
locale so separators follow local custom. A visitor's own choice is kept in
localStorage (`pk_currency`). Converted values are shown with "≈".
Authoring rules: `docs/blog-authoring-guide.md`.
