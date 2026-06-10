// lib/config.ts
// Single source of truth for the site's canonical base URL.
//
// Priority order:
//   1. NEXT_PUBLIC_BASE_URL   — set this in Vercel once your custom domain is live
//                               e.g. https://paulkreations.com
//   2. VERCEL_URL             — Vercel injects this automatically on every deployment
//                               e.g. paul-kreations.vercel.app  (no https://)
//   3. localhost fallback     — used during local development
//
// Action required:
//   Add  NEXT_PUBLIC_BASE_URL=https://paul-kreations.vercel.app  to Vercel env vars.
//   When your custom domain is live, update it to https://paulkreations.com.

export const BASE_URL: string =
  process.env.NEXT_PUBLIC_BASE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");
