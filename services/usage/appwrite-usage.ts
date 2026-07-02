// services/usage/appwrite-usage.ts
// Reads real counts (staff users, staff table rows) via node-appwrite —
// already a project dependency (Phase 1), no new import. Project-wide
// bandwidth/storage/executions usage has no confirmed API-key-accessible
// endpoint on Appwrite Cloud; that data lives in the Console. Rather
// than guess at an endpoint (the exact mistake that cost real time with
// Gemini's config earlier in this project), this links out for it.

import { createAdminClient } from "@/services/appwrite/clients";
import type { AppwriteUsage } from "@/schemas/usage";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export async function getAppwriteUsage(): Promise<AppwriteUsage> {
  try {
    const { users, tablesDB } = createAdminClient();

    const [userList, rowList] = await Promise.all([
      users.list({ queries: [] }),
      tablesDB.listRows(
        requireEnv("APPWRITE_DATABASE_ID"),
        requireEnv("APPWRITE_STAFF_TABLE_ID"),
        [],
      ),
    ]);

    const projectId = requireEnv("NEXT_PUBLIC_APPWRITE_PROJECT_ID");

    return {
      status: "ok",
      totalStaffUsers: userList.total,
      totalStaffRows: rowList.total,
      dashboardUrl: `https://cloud.appwrite.io/console/project-${projectId}/overview`,
    };
  } catch (err) {
    return {
      status: "error",
      message:
        err instanceof Error ? err.message : "Couldn't load Appwrite counts.",
    };
  }
}
