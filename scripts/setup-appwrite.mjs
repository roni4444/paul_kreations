// scripts/setup-appwrite.mjs
//
// One-time setup: creates the database, the staff table, and its
// columns, using TablesDB. Safe to re-run — the table and each column
// are checked independently, so a partial previous run resumes cleanly
// instead of being skipped wholesale.
//
// Usage:
//   node --env-file=.env.local scripts/setup-appwrite.mjs

import { Client, TablesDB } from "node-appwrite";

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID ?? "admin";
const TABLE_ID = process.env.APPWRITE_STAFF_TABLE_ID ?? "staff";

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

const client = new Client()
  .setEndpoint(requireEnv("NEXT_PUBLIC_APPWRITE_ENDPOINT"))
  .setProject(requireEnv("NEXT_PUBLIC_APPWRITE_PROJECT_ID"))
  .setKey(requireEnv("APPWRITE_API_KEY"));

const tablesDB = new TablesDB(client);

async function ensureDatabase() {
  try {
    await tablesDB.get(DATABASE_ID);
    console.log(`Database "${DATABASE_ID}" already exists — skipping.`);
  } catch {
    await tablesDB.create(DATABASE_ID, "Admin");
    console.log(`Created database "${DATABASE_ID}".`);
  }
}

async function ensureTableExists() {
  try {
    await tablesDB.getTable(DATABASE_ID, TABLE_ID);
    console.log(`Table "${TABLE_ID}" already exists — skipping.`);
    return;
  } catch {
    // Not found — fall through and create it.
  }

  // Permissions are granted per-row (rowSecurity = true) rather than
  // table-wide, set individually by scripts/add-staff.mjs.
  await tablesDB.createTable(DATABASE_ID, TABLE_ID, "Staff", [], true);
  console.log(`Created table "${TABLE_ID}".`);
}

/** Creates a column, treating "already exists" as success rather than
 * skipping the whole table just because it already exists. */
async function ensureColumn(name, createFn) {
  try {
    await createFn();
    console.log(`Created column "${name}".`);
  } catch (err) {
    const alreadyExists =
      err?.code === 409 ||
      (typeof err?.message === "string" &&
        err.message.toLowerCase().includes("already exists"));
    if (alreadyExists) {
      console.log(`Column "${name}" already exists — skipping.`);
    } else {
      throw err;
    }
  }
}

async function ensureColumns() {
  await ensureColumn("email", () =>
    tablesDB.createStringColumn(DATABASE_ID, TABLE_ID, "email", 255, true),
  );
  // required=false here on purpose — Appwrite rejects required+default
  // together. Our own write path always sets these explicitly anyway;
  // the default is just a safety net for any row created without them.
  await ensureColumn("role", () =>
    tablesDB.createStringColumn(
      DATABASE_ID,
      TABLE_ID,
      "role",
      20,
      false,
      "staff",
    ),
  );
  await ensureColumn("apps", () =>
    tablesDB.createStringColumn(
      DATABASE_ID,
      TABLE_ID,
      "apps",
      50,
      false,
      undefined,
      true, // array
    ),
  );
  await ensureColumn("isActive", () =>
    tablesDB.createBooleanColumn(
      DATABASE_ID,
      TABLE_ID,
      "isActive",
      false,
      true,
    ),
  );
}

await ensureDatabase();
await ensureTableExists();
await ensureColumns();
console.log(
  "\nDone. Next: node --env-file=.env.local scripts/add-staff.mjs you@example.com owner henstel",
);
