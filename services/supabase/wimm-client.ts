// services/supabase/wimm-client.ts
// Supabase client for the WIMM promo-offers admin. This shares the SAME
// self-hosted Supabase project (SUPABASE_URL / SUPABASE_PUBLISABLE_KEY)
// as the rest of paulkreations.com, but is scoped to the `money` schema
// via db.schema and carries its own Google-OAuth session (via
// @supabase/ssr), completely independent of the Appwrite-backed
// Henstel/Natural Farming admin session.
//
// Never import this outside services/supabase/wimm-admin.ts,
// server/actions/wimm-admin*.ts, and middleware.ts — everything else
// goes through the service layer (PROJECT_RULES.md §11).

import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export function getWimmSupabaseUrl(): string {
  return requireEnv("SUPABASE_URL");
}

function getWimmSupabaseKey(): string {
  return requireEnv("SUPABASE_PUBLISABLE_KEY");
}

/** Base URL for this project's Supabase Edge Functions (Kong gateway
 * proxies /functions/v1/* the same way on hosted and self-hosted
 * Supabase, so no URL rewriting is needed here). */
export function getWimmFunctionsUrl(): string {
  return `${getWimmSupabaseUrl()}/functions/v1`;
}

/** For use in Server Components, Server Actions, and Route Handlers. */
export async function createWimmSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(getWimmSupabaseUrl(), getWimmSupabaseKey(), {
    db: { schema: "money" },
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options as CookieOptions),
          );
        } catch {
          // Called from a Server Component with no response to write to —
          // middleware.ts refreshes the session on the next navigation.
        }
      },
    },
  });
}
