# PROJECT_RULES.md (TIGHT VERSION)

You are working on a production-grade Next.js web application.  
These rules are mandatory. Do not deviate.

---

# 1. TECH STACK (NO DEVIATIONS)

## Frontend

- Next.js (App Router only)
- React (latest)
- TypeScript (strict)
- Tailwind CSS
- shadcn/ui

## Backend

- Supabase (PostgreSQL + Auth + Storage when needed)
- Next.js Server Actions / Route Handlers
- Zod (required for all validation)

## Code Quality

- ESLint
- Prettier

## Infrastructure

- Vercel (hosting)
- GitHub (version control + CI/CD)
- Cloudflare (DNS, WAF, DDoS, Bot protection, Turnstile)

## Observability

- Sentry (errors)
- Cloudflare Web Analytics (default)
- Google Analytics (optional via env flag, dev-disabled, lazy-loaded)

## Email

- Resend (must be abstracted)

---

# 2. ARCHITECTURE (STRICT)

## Next.js

- App Router ONLY (/app)
- Server Components by default
- Client Components only when required (state, interactivity, browser APIs)
- No Pages Router

## Structure

/app → routes  
/components → UI (shadcn-based)  
/lib → utilities  
/server → server logic  
/services → external integrations  
/schemas → Zod validation  
/docs → architecture + ADRs

Rules:

- No business logic in UI
- All external calls via /services
- All validation via /schemas

---

# 3. UI RULES

- Use shadcn/ui only
- Extend, do NOT duplicate components
- Tailwind only (no CSS modules, no inline styles)

---

# 4. TYPESCRIPT

- strict mode ON
- avoid `any`
- prefer inferred types when safe
- reusable types preferred

---

# 5. VALIDATION & DATA

- ALL inputs validated with Zod
- Server-side validation mandatory
- Never trust external input
- Supabase never accessed directly outside /services

---

# 6. ERROR HANDLING

- Always try/catch async code
- Never fail silently
- Log to Sentry when appropriate

---

# 7. DEPENDENCIES

- No new dependencies without justification
- Prefer built-in Next.js features
- Avoid overlapping libraries

---

# 8. PERFORMANCE

- Minimize client JS
- Prefer Server Components
- Use dynamic imports only when needed
- Optimize images via Next/Image
- Avoid unnecessary re-renders

---

# 9. SECURITY

- Cloudflare Turnstile for all public forms
- No secrets in client code
- Use env vars for all sensitive data
- Supabase RLS must be enabled
- Validate everything server-side

---

# 10. STATE MANAGEMENT

- React state for UI only
- Server Components for server state
- React Query only if required for caching
- Avoid global state libraries unless necessary

---

# 11. INTEGRATIONS

## Supabase

- Must be wrapped in /services/supabase
- Never called directly in UI

## Email (Resend)

- Must be wrapped in /services/email
- No email logic in UI/routes

## External APIs

- Always via /services/*
- Must include validation + error handling

---

# 12. ANALYTICS

- Cloudflare Web Analytics default
- Google Analytics optional (env-controlled, lazy-loaded, dev-disabled)
- No duplicate tracking

---

# 13. DOCUMENTATION

Maintain:
/docs/architecture.md  
/docs/decisions (ADR format)

Each ADR must include:

- decision
- alternatives
- consequences

---

# 14. CODE PRINCIPLES

- Follow existing patterns only
- Do NOT invent new architecture
- Prefer simplicity over abstraction
- No over-engineering
- Reuse existing code
- Keep components small

---

# 15. AI BEHAVIOR RULES

- Optimize for long-term consistency
- Do not introduce competing patterns
- Ask if uncertain
- Never refactor architecture without request
- Stability > experimentation

---

# DONE CRITERIA

Feature is complete only if:

- TypeScript compiles
- Zod validation exists
- UI uses shadcn/ui
- Correct folder structure used
- No duplicate logic
- No unnecessary dependencies
- Errors handled properly
- All possible exception caught and processed