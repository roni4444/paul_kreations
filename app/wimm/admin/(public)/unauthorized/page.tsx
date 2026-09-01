// app/wimm/admin/(public)/unauthorized/page.tsx
import Link from "next/link";

const HEADING = "font-[family-name:var(--font-wimm-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export default function WimmAdminUnauthorizedPage() {
  return (
    <main className="min-h-screen bg-[#F6FAF8] flex items-center justify-center px-6">
      <div className="max-w-[400px] text-center flex flex-col items-center gap-3">
        <h1 className={`${HEADING} text-[1.5rem] font-bold text-[#0E2A20]`}>
          Not authorized
        </h1>
        <p className="text-sm text-[#3A4A42] leading-relaxed">
          This Google account isn&apos;t authorized to manage promo offers.
        </p>
        <Link
          href="/wimm/admin/login"
          className={`${MONO} text-[11px] text-[#0F7A4E] uppercase hover:underline mt-2`}
        >
          Back to sign in
        </Link>
      </div>
    </main>
  );
}
