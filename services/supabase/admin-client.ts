// services/supabase/admin-client.ts
// Supabase clients for the dedicated ADMIN-AUTH project — the one that
// holds staff identities and the `staff` table, separate from the main
// site project, Henstel, and WIMM (see docs/decisions/0004-staff-auth-
// supabase.md). PROJECT_RULES.md §11: Supabase is only ever touched
// through /services/supabase.
//
// Two clients, two trust levels:
//   - createAdminSessionClient(): publishable key + the signed-in staff
//     member's session cookie. Acts as that person, so RLS applies. Used
//     to answer "who is signed in" and to read their own staff row.
//   - createAdminServiceClient(): secret (service-role) key. Bypasses
//     RLS. Used only to look up an email before sending a sign-in link,
//     to mint that link, and by operational code (usage, keep-warm).
//     Never import this from a "use client" file.
//
// proxy.ts and app/admin/auth/callback/route.ts build their own
// @supabase/ssr client from the same env vars because they need to read
// and write cookies on the request/response rather than via next/headers.

import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getAdminSupabaseUrl(): string {
  return requireEnv("ADMIN_SUPABASE_URL");
}

export function getAdminSupabasePublishableKey(): string {
  return requireEnv("ADMIN_SUPABASE_PUBLISHABLE_KEY");
}

/** For Server Components, Server Actions, and Route Handlers. */
export async function createAdminSessionClient() {
  const cookieStore = await cookies();

  return createServerClient(
    getAdminSupabaseUrl(),
    getAdminSupabasePublishableKey(),
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options as CookieOptions),
            );
          } catch {
            // Called from a Server Component with no response to write
            // to — proxy.ts refreshes the session on the next
            // navigation.
          }
        },
      },
    },
  );
}

let cachedServiceClient: SupabaseClient | null = null;

export function createAdminServiceClient(): SupabaseClient {
  if (cachedServiceClient) return cachedServiceClient;

  cachedServiceClient = createClient(
    getAdminSupabaseUrl(),
    requireEnv("ADMIN_SUPABASE_SECRET_KEY"),
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
  return cachedServiceClient;
}
