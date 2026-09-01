// app/wimm/admin/(protected)/offers/[id]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getOffer, resolveEligibleUsers } from "@/services/supabase/wimm-admin";
import { updateOfferAction } from "@/server/actions/wimm-admin";
import { OfferForm } from "@/components/wimm-admin/offer-form";

const HEADING = "font-[family-name:var(--font-wimm-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export default async function EditWimmOfferPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const offer = await getOffer(id);
  if (!offer) notFound();

  const initialEligibleUsers = await resolveEligibleUsers(
    offer.eligible_user_ids,
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className={`${HEADING} text-[1.5rem] font-bold text-[#0E2A20]`}>
          Edit offer
        </h1>
        <Link
          href={`/wimm/admin/offers/${offer.id}/redemptions`}
          className={`${MONO} text-[11px] text-[#0F7A4E] uppercase hover:underline`}
        >
          View redemptions →
        </Link>
      </div>
      <OfferForm
        offer={offer}
        initialEligibleUsers={initialEligibleUsers}
        action={updateOfferAction}
        submitLabel="Save changes"
      />
    </div>
  );
}
