// app/wimm/admin/(protected)/layout.tsx
// Everything under this route group requires an authorized
// money.promo_admins account. requireWimmAdmin() redirects to
// /wimm/admin/login or /wimm/admin/unauthorized otherwise — those two
// routes live in the sibling (public) group specifically so they're
// never wrapped by this layout.

import type { ReactNode } from "react";
import Link from "next/link";
import { requireWimmAdmin } from "@/services/supabase/wimm-admin";
import { signOutAction } from "@/server/actions/wimm-admin-auth";

const HEADING = "font-[family-name:var(--font-wimm-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export default async function WimmAdminProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const admin = await requireWimmAdmin();

  return (
    <div className="min-h-screen bg-[#F6FAF8]">
      <div className="border-b border-[#D8E8E0] bg-white">
        <div className="max-w-[1040px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/wimm/admin"
            className={`${HEADING} font-semibold text-[#0E2A20] text-[14px]`}
          >
            WIMM Admin — Promo Offers
          </Link>
          <div className="flex items-center gap-4">
            <span className={`${MONO} text-[11px] text-[#7C9187]`}>
              {admin.email}
            </span>
            <form action={signOutAction}>
              <button
                type="submit"
                className={`${MONO} text-[11px] text-[#0F7A4E] uppercase hover:underline`}
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="max-w-[1040px] mx-auto px-6 py-10">{children}</div>
    </div>
  );
}
