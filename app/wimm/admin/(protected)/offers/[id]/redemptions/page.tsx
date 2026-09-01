// app/wimm/admin/(protected)/offers/[id]/redemptions/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getOffer,
  listRedemptions,
  resolveEligibleUsers,
} from "@/services/supabase/wimm-admin";
import { RedemptionsTable } from "@/components/wimm-admin/redemptions-table";

const HEADING = "font-[family-name:var(--font-wimm-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export default async function OfferRedemptionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [offer, redemptions] = await Promise.all([
    getOffer(id),
    listRedemptions(id),
  ]);
  if (!offer) notFound();

  const users = await resolveEligibleUsers(redemptions.map((r) => r.user_id));
  const emailById = Object.fromEntries(users.map((u) => [u.id, u.email]));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href={`/wimm/admin/offers/${offer.id}`}
          className={`${MONO} text-[11px] text-[#0F7A4E] uppercase hover:underline`}
        >
          ← Back to offer
        </Link>
        <h1
          className={`${HEADING} text-[1.5rem] font-bold text-[#0E2A20] mt-2`}
        >
          Redemptions — {offer.title}
        </h1>
      </div>

      <RedemptionsTable
        offerId={offer.id}
        redemptions={redemptions}
        emailById={emailById}
      />
    </div>
  );
}
