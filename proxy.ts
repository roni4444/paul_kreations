// proxy.ts (Next.js 16 name for what used to be middleware.ts)
// Two independent admin sessions live behind this one middleware file
// (Next.js only allows one). Both are Supabase-backed, but on DIFFERENT
// Supabase projects:
//
//   /admin/**       — Henstel/Natural Farming staff admin. Signs in against
//                      the dedicated admin-auth project (ADMIN_SUPABASE_*).
//                      Middleware refreshes the session cookie and bounces
//                      signed-out visitors to /admin/login. Whether the
//                      account is an active staff member with access to a
//                      given app is checked server-side in
//                      services/staff.ts (requireStaffAccess).
//   /wimm/admin/**  — WIMM promo-offers admin. Uses the WIMM project
//                      (SUPABASE_URL / SUPABASE_PUBLISABLE_KEY) with Google
//                      OAuth. This only confirms a session exists — whether
//                      that account is an actual money.promo_admins member
//                      is checked in services/supabase/wimm-admin.ts
//                      (requireWimmAdmin).
//
// The two do not share cookies (Supabase names the auth cookie after the
// project), env vars, or code paths — don't merge them.

import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getManagedApp } from "@/lib/admin/apps";

const PUBLIC_ADMIN_PATHS = new Set([
  "/admin",
  "/admin/login",
  "/admin/auth/callback",
  "/admin/unauthorized",
]);

const PUBLIC_WIMM_ADMIN_PATHS = new Set([
  "/wimm/admin/login",
  "/wimm/admin/auth/callback",
  "/wimm/admin/unauthorized",
]);

function staffLoginRedirect(request: NextRequest): NextResponse {
  const appSlug = request.nextUrl.pathname.split("/")[2];
  const managedApp = appSlug ? getManagedApp(appSlug) : undefined;

  const loginUrl = new URL("/admin/login", request.url);
  if (managedApp) loginUrl.searchParams.set("app", managedApp.slug);

  return NextResponse.redirect(loginUrl);
}

async function handleStaffAdmin(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_ADMIN_PATHS.has(pathname);

  let response = NextResponse.next({ request });

  const supabaseUrl = process.env.ADMIN_SUPABASE_URL;
  const supabaseKey = process.env.ADMIN_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    // Misconfigured env — fail closed for protected pages rather than let
    // an unauthenticated request through. Public pages stay reachable so
    // the redirect to /admin/login can't loop.
    return isPublic ? response : staffLoginRedirect(request);
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // Touching getUser() is what actually refreshes an expiring session.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isPublic) return response;

  if (!user) return staffLoginRedirect(request);

  return response;
}

async function handleWimmAdmin(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  let response = NextResponse.next({ request });

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_PUBLISABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    // Misconfigured env — fail closed rather than let an unauthenticated
    // request through.
    return NextResponse.redirect(new URL("/wimm/admin/login", request.url));
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    db: { schema: "money" },
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // Touching getUser() is what actually refreshes an expiring session.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (PUBLIC_WIMM_ADMIN_PATHS.has(pathname)) return response;

  if (!user) {
    return NextResponse.redirect(new URL("/wimm/admin/login", request.url));
  }

  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/wimm/admin")) {
    return handleWimmAdmin(request);
  }

  if (pathname.startsWith("/admin")) {
    return handleStaffAdmin(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/wimm/admin/:path*"],
};
