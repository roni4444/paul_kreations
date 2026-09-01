// app/wimm/admin/(protected)/page.tsx
import Link from "next/link";
import {
  getRedemptionCounts,
  listOffers,
} from "@/services/supabase/wimm-admin";
import { OffersTable } from "@/components/wimm-admin/offers-table";

const HEADING = "font-[family-name:var(--font-wimm-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export default async function WimmAdminOffersPage() {
  const [offers, redemptionCounts] = await Promise.all([
    listOffers(),
    getRedemptionCounts(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className={`${HEADING} text-[1.5rem] font-bold text-[#0E2A20]`}>
          Promo offers
        </h1>
        <Link
          href="/wimm/admin/offers/new"
          className={`${MONO} inline-flex items-center h-9 px-4 bg-[#0F7A4E] hover:bg-[#0A5C3A] text-white text-[11px] uppercase transition-colors`}
        >
          + Create new offer
        </Link>
      </div>

      <OffersTable offers={offers} redemptionCounts={redemptionCounts} />
    </div>
  );
}
