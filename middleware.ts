// middleware.ts
// Cheap check only: does a session cookie exist at all? It deliberately
// does NOT import node-appwrite (kept out of the Edge runtime bundle on
// purpose — see lib/admin/constants.ts) and does NOT validate the
// session against Appwrite on every request. Whether the cookie still
// holds a *valid* session, and whether this person is an active staff
// member with access to this app, is checked in the page itself
// (services/staff.ts), which always runs server-side.

import { NextResponse, type NextRequest } from "next/server";
import { getManagedApp } from "@/lib/admin/apps";
import { SESSION_COOKIE_NAME } from "@/lib/admin/constants";

const PUBLIC_ADMIN_PATHS = new Set([
  "/admin",
  "/admin/login",
  "/admin/auth/callback",
  "/admin/unauthorized",
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin") || PUBLIC_ADMIN_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const hasSession = request.cookies.has(SESSION_COOKIE_NAME);

  if (!hasSession) {
    const appSlug = pathname.split("/")[2];
    const managedApp = appSlug ? getManagedApp(appSlug) : undefined;

    const loginUrl = new URL("/admin/login", request.url);
    if (managedApp) loginUrl.searchParams.set("app", managedApp.slug);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
