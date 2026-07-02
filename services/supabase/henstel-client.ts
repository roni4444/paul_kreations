// services/supabase/henstel-client.ts
// Service-role client for the Henstel Supabase project — the project
// holding `chef` (production) and `staging` (admin drafts). Full
// privileges, bypasses RLS entirely.
//
// Only ever call this after confirming the caller is an authorized staff
// member (services/staff.ts → getCurrentStaff() + staffCanAccess()).
// Never import this from a "use client" file, and never expose the
// service-role key to the browser.

import { createClient } from "@supabase/supabase-js";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function createHenstelSupabaseClient() {
  return createClient(
    requireEnv("HENSTEL_SUPABASE_URL"),
    requireEnv("HENSTEL_SUPABASE_SECRET_KEY"),
    { auth: { persistSession: false } },
  );
}
