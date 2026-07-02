// scripts/add-staff.mjs
//
// Creates (or updates) a staff member: the underlying Appwrite user if
// they don't already have one, plus their staff row (TablesDB) with role
// and app access. Safe to re-run on the same email to change role/apps.
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

import {
  Client,
  TablesDB,
  Users,
  ID,
  Permission,
  Role,
  Query,
} from "node-appwrite";

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID ?? "admin";
const TABLE_ID = process.env.APPWRITE_STAFF_TABLE_ID ?? "staff";

const [, , email, roleArg, appsArg] = process.argv;
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

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

const client = new Client()
  .setEndpoint(requireEnv("NEXT_PUBLIC_APPWRITE_ENDPOINT"))
  .setProject(requireEnv("NEXT_PUBLIC_APPWRITE_PROJECT_ID"))
  .setKey(requireEnv("APPWRITE_API_KEY"));

const users = new Users(client);
const tablesDB = new TablesDB(client);

async function ensureAppwriteUser() {
  const existing = await users.list({ queries: [Query.equal("email", email)] });
  if (existing.total > 0) {
    console.log(`Appwrite user already exists for ${email}.`);
    return existing.users[0];
  }

  const user = await users.create({ userId: ID.unique(), email });
  console.log(`Created Appwrite user for ${email}.`);
  return user;
}

async function upsertStaffRow(userId) {
  const data = { email, role, apps, isActive: true };
  const permissions = [Permission.read(Role.user(userId))];

  try {
    await tablesDB.getRow(DATABASE_ID, TABLE_ID, userId);
    await tablesDB.updateRow(DATABASE_ID, TABLE_ID, userId, data, permissions);
    console.log(
      `Updated staff row for ${email} (role=${role}, apps=[${apps}]).`,
    );
  } catch {
    await tablesDB.createRow(DATABASE_ID, TABLE_ID, userId, data, permissions);
    console.log(
      `Created staff row for ${email} (role=${role}, apps=[${apps}]).`,
    );
  }
}

const user = await ensureAppwriteUser();
await upsertStaffRow(user.$id);
console.log(
  `\nDone. ${email} can now request a sign-in link from /admin/login.`,
);
