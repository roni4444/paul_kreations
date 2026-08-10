// services/supabase/client.ts
// Single factory for the server-side Supabase client.
// PROJECT_RULES.md §11: "Supabase — Must be wrapped in /services/supabase.
// Never called directly in UI." Every other services/**/*.ts file that
// touches Supabase should import getSupabaseServerClient() from here rather
// than instantiating its own client.
//
// Uses the SERVICE ROLE key because writes here happen from trusted server
// code (Server Actions), not from the browser — RLS is still enabled on
// every table as a defense-in-depth measure (see docs/sql/waitlist_signups.sql),
// but this client is intentionally allowed to bypass it where the action
// has already validated the request server-side.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null = null;

export function getSupabaseServerClient(): SupabaseClient {
  if (cachedClient) return cachedClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "[getSupabaseServerClient] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.",
    );
  }

  cachedClient = createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });

  return cachedClient;
}
