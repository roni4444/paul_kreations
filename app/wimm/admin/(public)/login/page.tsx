// app/wimm/admin/(public)/login/page.tsx
// In the (public) route group deliberately — NOT wrapped by
// app/wimm/admin/(protected)/layout.tsx, which calls requireWimmAdmin()
// and would otherwise redirect straight back here in a loop.

import { WimmAdminLoginForm } from "@/components/wimm-admin/login-form";

const HEADING = "font-[family-name:var(--font-wimm-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export default function WimmAdminLoginPage() {
  return (
    <main className="min-h-screen bg-[#F6FAF8] flex items-center justify-center px-6">
      <div className="w-full max-w-[360px] flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-1 text-center">
          <span className={`${MONO} text-[11px] text-[#0F7A4E] uppercase`}>
            WIMM Admin
          </span>
          <h1 className={`${HEADING} text-[1.5rem] font-bold text-[#0E2A20]`}>
            Promo offers
          </h1>
        </div>
        <WimmAdminLoginForm />
      </div>
    </main>
  );
}
