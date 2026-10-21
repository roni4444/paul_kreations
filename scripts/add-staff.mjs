// scripts/add-staff.mjs
//
// Creates (or updates) a staff member in the admin-auth Supabase project:
// the underlying auth user if they don't already have one, plus their
// `staff` row with role and app access. Safe to re-run on the same email
// to change role/apps.
//
// Usage:
//   node --env-file=.env.local scripts/add-staff.mjs <email> <role> <apps>
//
// Examples:
//   node --env-file=.env.local scripts/add-staff.mjs you@example.com owner henstel
//   node --env-file=.env.local scripts/add-staff.mjs colleague@example.com staff henstel,natural-farming
//
// role defaults to "staff" if omitted. apps is a comma-separated list
// (ignored for role=owner, which always has access to everything — see
// services/staff.ts).
//
// Needs ADMIN_SUPABASE_URL and ADMIN_SUPABASE_SECRET_KEY in .env.local.

import { createClient } from "@supabase/supabase-js";

const VALID_APPS = ["henstel", "natural-farming"];

const [, , emailArg, roleArg, appsArg] = process.argv;
const email = emailArg?.trim().toLowerCase();
const role = roleArg ?? "staff";
const apps = (appsArg ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

if (!email) {
  console.error("Usage: node scripts/add-staff.mjs <email> [role] [apps]");
  process.exit(1);
}
if (!["owner", "staff"].includes(role)) {
  console.error('role must be "owner" or "staff"');
  process.exit(1);
}
const badApp = apps.find((a) => !VALID_APPS.includes(a));
if (badApp) {
  console.error(
    `Unknown app "${badApp}". Valid apps: ${VALID_APPS.join(", ")}`,
  );
  process.exit(1);
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

const supabase = createClient(
  requireEnv("ADMIN_SUPABASE_URL"),
  requireEnv("ADMIN_SUPABASE_SECRET_KEY"),
  { auth: { persistSession: false, autoRefreshToken: false } },
);

// The Admin API has no "get user by email", so page through the (tiny)
// user list.
async function findAuthUserByEmail() {
  const perPage = 200;
  for (let page = 1; ; page++) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage,
    });
    if (error) throw error;
    const match = data.users.find((u) => u.email?.toLowerCase() === email);
    if (match) return match;
    if (data.users.length < perPage) return null;
  }
}

async function ensureAuthUser() {
  const existing = await findAuthUserByEmail();
  if (existing) {
    console.log(`Auth user already exists for ${email}.`);
    return existing;
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    email_confirm: true,
  });
  if (error) throw error;
  console.log(`Created auth user for ${email}.`);
  return data.user;
}

async function upsertStaffRow(userId) {
  const { error } = await supabase.from("staff").upsert(
    {
      id: userId,
      email,
      role,
      apps: role === "owner" ? VALID_APPS : apps,
      is_active: true,
    },
    { onConflict: "id" },
  );
  if (error) throw error;
  console.log(`Saved staff row for ${email} (role=${role}, apps=[${apps}]).`);
}

try {
  const user = await ensureAuthUser();
  await upsertStaffRow(user.id);
  console.log(
    `\nDone. ${email} can now request a sign-in link from /admin/login.`,
  );
} catch (err) {
  console.error("Failed:", err instanceof Error ? err.message : err);
  process.exit(1);
}
