// middleware.ts
// Two independent admin sessions live behind this one middleware file
// (Next.js only allows one):
//
//   /admin/**       — Appwrite-backed Henstel/Natural Farming admin.
//                      Cheap cookie-presence check only; real validation
//                      happens in the page (services/staff.ts).
//   /wimm/admin/**  — Supabase-backed WIMM promo-offers admin. Uses
//                      @supabase/ssr to refresh the Supabase session
//                      cookie so it stays valid across navigations. This
//                      only confirms a session exists — whether that
//                      account is an actual money.promo_admins member is
//                      checked server-side in
//                      services/supabase/wimm-admin.ts (requireWimmAdmin),
//                      exactly like the Appwrite side defers staff-access
//                      checks to services/staff.ts.
//
// These two systems do not share cookies, env vars, or code paths —
// don't merge them.

import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getManagedApp } from "@/lib/admin/apps";
import { SESSION_COOKIE_NAME } from "@/lib/admin/constants";

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

function handleAppwriteAdmin(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ADMIN_PATHS.has(pathname)) return NextResponse.next();

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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/wimm/admin")) {
    return handleWimmAdmin(request);
  }

  if (pathname.startsWith("/admin")) {
    return handleAppwriteAdmin(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/wimm/admin/:path*"],
};
