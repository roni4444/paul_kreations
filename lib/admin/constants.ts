// lib/admin/constants.ts
// Deliberately has zero imports from node-appwrite or next/headers, so
// middleware.ts (Edge runtime) can import this without pulling in
// Node-only code.

export const SESSION_COOKIE_NAME = "admin_session";
