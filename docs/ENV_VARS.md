# .env.local.additions

# ─────────────────────────────────────────────────────────────────────────────

# New env vars required by this drop (Domain / WIMM landing page / Resend /

# Speed Insights). Add these to Vercel → Project → Settings → Environment

# Variables (and to your local .env.local for dev). Nothing here is new

# *infrastructure* — Supabase and Resend are already in your stack per

# PROJECT_RULES.md, these are just the additional keys WIMM needs.

# ─────────────────────────────────────────────────────────────────────────────

# ── Already existed (unchanged) ───────────────────────────────────────────────

# RESEND_API_KEY=re_xxxxxxxx

# CONTACT_EMAIL=you@example.com

# NEXT_PUBLIC_BASE_URL=https://paulkreations.com

# ── Supabase (new — needed for waitlist_signups) ───────────────────────────────

# Find these in Supabase → Project Settings → API.

NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co

# Service role key — server-only, NEVER exposed to the client.

# This bypasses RLS by design (see services/supabase/client.ts) — keep it

# out of NEXT_PUBLIC_* and out of client components.

SUPABASE_SERVICE_ROLE_KEY=eyJxxxxxxxx

# ── Cloudflare Turnstile (new — protects the waitlist form) ───────────────────

# Create a widget at https://dash.cloudflare.com/?to=/:account/turnstile

# Site key is public (safe in the browser bundle); secret key is server-only.

NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAAxxxxxxxx
TURNSTILE_SECRET_KEY=0x4AAAAAAAxxxxxxxx

# ── Resend (unchanged key, new sending domain) ─────────────────────────────────

# No new env var needed — services/email.ts and services/wimm/email.ts now

# hardcode the "from" address to use mail.paulkreations.com, which you've

# already verified in Resend. Just confirm RESEND_API_KEY above is set.

# ── Account deletion request notifications (optional) ──────────────────────────

# Every deletion request (app/wimm/delete-account) emails you. By default it

# reuses CONTACT_EMAIL. Set this only if you want deletion requests routed

# to a different inbox than general contact-form messages.

# DELETION_REQUESTS_EMAIL=you@example.com
