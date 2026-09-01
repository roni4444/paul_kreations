// supabase/functions/wimm-admin-user-lookup/index.ts
//
// Deploy separately via the Supabase CLI — this is NOT part of the
// Next.js app's build/deploy pipeline:
//
//   supabase functions deploy wimm-admin-user-lookup --project-ref <ref>
//
// Required secrets on the Supabase project (set via `supabase secrets
// set` or the dashboard) — SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
// are usually already present by default for every Edge Function:
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//
// This is the ONE place a service-role key is appropriate for the whole
// WIMM admin feature. It never trusts "only the admin site calls this"
// — it re-verifies the caller is a money.promo_admins member using the
// caller's own JWT before touching anything.
//
// Request body — exactly one of:
//   { "email": "person@example.com" }   → { "user": { id, email } } | 404
//   { "ids": ["uuid", ...] }            → { "users": [{ id, email }, ...] }

import { createClient } from "jsr:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

interface LookupRequestBody {
  email?: string;
  ids?: string[];
}

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** Scans listUsers() pages looking for a case-insensitive email match.
 * Self-hosted GoTrue versions vary in whether they support a direct
 * email filter on the admin API, so this avoids depending on that.
 * Fine for an admin tool used at collaborator scale; if the user base
 * ever grows into the tens of thousands, swap this for a direct email
 * filter if the deployed GoTrue version supports one. */
async function findUserByEmail(
  adminClient: ReturnType<typeof createClient>,
  email: string,
): Promise<{ id: string; email: string } | null> {
  const perPage = 200;
  const maxPages = 25;

  for (let page = 1; page <= maxPages; page++) {
    const { data, error } = await adminClient.auth.admin.listUsers({
      page,
      perPage,
    });
    if (error) throw error;

    const match = data.users.find(
      (u) => u.email?.toLowerCase() === email.toLowerCase(),
    );
    if (match) return { id: match.id, email: match.email! };

    if (data.users.length < perPage) break; // last page reached
  }

  return null;
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return jsonResponse({ error: "Missing Authorization header" }, 401);
  }

  // Client scoped to the CALLER's own JWT — RLS decides what it can see.
  // A non-admin's SELECT against promo_admins returns zero rows, never
  // an error, same as everywhere else in this app.
  const callerClient = createClient(
    SUPABASE_URL,
    authHeader.replace("Bearer ", ""),
    {
      db: { schema: "money" },
      global: { headers: { Authorization: authHeader } },
    },
  );

  const {
    data: { user: caller },
    error: callerError,
  } = await callerClient.auth.getUser();

  if (callerError || !caller) {
    return jsonResponse({ error: "Not authenticated" }, 401);
  }

  const { data: adminRow, error: adminError } = await callerClient
    .from("promo_admins")
    .select("user_id")
    .eq("user_id", caller.id)
    .maybeSingle();

  if (adminError || !adminRow) {
    return jsonResponse({ error: "Not authorized" }, 403);
  }

  let body: LookupRequestBody;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  // Service-role client — the only place in this whole feature this key
  // is used. Never returned to the caller, never logged.
  const adminClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  if (body.email) {
    const email = body.email.trim();
    if (!email) return jsonResponse({ error: "email is empty" }, 400);

    try {
      const match = await findUserByEmail(adminClient, email);
      if (!match) return jsonResponse({ error: "User not found" }, 404);
      return jsonResponse({ user: match }, 200);
    } catch (err) {
      console.error("wimm-admin-user-lookup: email lookup failed", err);
      return jsonResponse({ error: "Lookup failed" }, 500);
    }
  }

  if (body.ids && Array.isArray(body.ids)) {
    const results = await Promise.all(
      body.ids.map(async (id) => {
        try {
          const { data, error } = await adminClient.auth.admin.getUserById(id);
          if (error || !data.user?.email) return null;
          return { id: data.user.id, email: data.user.email };
        } catch {
          return null;
        }
      }),
    );

    return jsonResponse(
      {
        users: results.filter(
          (u): u is { id: string; email: string } => u !== null,
        ),
      },
      200,
    );
  }

  return jsonResponse({ error: "Provide either email or ids" }, 400);
});
