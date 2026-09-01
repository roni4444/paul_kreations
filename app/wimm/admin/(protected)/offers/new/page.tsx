// app/wimm/admin/(protected)/offers/new/page.tsx
import { OfferForm } from "@/components/wimm-admin/offer-form";
import { createOfferAction } from "@/server/actions/wimm-admin";

const HEADING = "font-[family-name:var(--font-wimm-heading)]";

export default function NewWimmOfferPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className={`${HEADING} text-[1.5rem] font-bold text-[#0E2A20]`}>
        Create offer
      </h1>
      <OfferForm
        initialEligibleUsers={[]}
        action={createOfferAction}
        submitLabel="Create offer"
      />
    </div>
  );
}
