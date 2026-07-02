// services/appwrite/clients.ts
// Server-only Appwrite client factories for the staff/admin auth project.
// Used in Server Components, Server Actions, and Route Handlers — never
// import this from a "use client" file.
//
// Two clients, two trust levels (mirrors Appwrite's own recommended SSR
// pattern: https://appwrite.io/docs/products/auth/server-side-rendering):
//   - createAdminClient(): holds the API key. Full privileges — looking up
//     users by email, issuing tokens, reading/writing the staff table
//     (via TablesDB, not the deprecated Databases/Collections service).
//     Never expose this client or its key to the browser.
//   - createSessionClient(): scoped to whatever staff member's session
//     cookie is on the current request. No more access than that person
//     has — used only to answer "who is currently signed in".

import { Client, Account, TablesDB, Users } from "node-appwrite";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/lib/admin/constants";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function baseClient() {
  return new Client()
    .setEndpoint(requireEnv("NEXT_PUBLIC_APPWRITE_ENDPOINT"))
    .setProject(requireEnv("NEXT_PUBLIC_APPWRITE_PROJECT_ID"));
}

export function createAdminClient() {
  const client = baseClient().setKey(requireEnv("APPWRITE_API_KEY"));
  return {
    account: new Account(client),
    // TablesDB, not the deprecated Databases/Collections service — see
    // docs/decisions/0002-staff-auth-appwrite.md.
    tablesDB: new TablesDB(client),
    users: new Users(client),
  };
}

/** Returns null if there's no session cookie — callers treat that as
 * "not signed in", same as a Supabase client with no user. */
export async function createSessionClient() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);
  if (!session?.value) return null;

  const client = baseClient().setSession(session.value);
  return { account: new Account(client) };
}
