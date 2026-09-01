"use client";

// components/wimm-admin/offers-table.tsx

import Link from "next/link";
import { useState, useTransition } from "react";
import { toggleOfferActiveAction } from "@/server/actions/wimm-admin";
import type { PromoOffer } from "@/lib/wimm-admin/types";
import {
  formatBenefitPeriod,
  formatOfferWindow,
} from "@/lib/wimm-admin/format";

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export function OffersTable({
  offers,
  redemptionCounts,
}: {
  offers: PromoOffer[];
  redemptionCounts: Record<string, number>;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleToggle(offer: PromoOffer) {
    setError("");
    startTransition(async () => {
      try {
        await toggleOfferActiveAction(offer.id, !offer.is_active);
      } catch {
        setError(`Couldn't update "${offer.title}". Please try again.`);
      }
    });
  }

  return (
    <div className="flex flex-col gap-3">
      {error && (
        <div className="px-3 py-2.5 border border-[#C0392B] bg-[#FCEEEC]">
          <span className={`${MONO} text-[11px] text-[#C0392B]`}>{error}</span>
        </div>
      )}

      <div className="border border-[#D8E8E0] bg-white overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr
              className={`${MONO} text-[10px] text-[#7C9187] uppercase border-b border-[#D8E8E0]`}
            >
              <th className="text-left px-4 py-3">Active</th>
              <th className="text-left px-4 py-3">Title</th>
              <th className="text-left px-4 py-3">Window</th>
              <th className="text-left px-4 py-3">Benefit</th>
              <th className="text-left px-4 py-3">Eligible</th>
              <th className="text-left px-4 py-3">Redemptions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr
                key={offer.id}
                className="border-b border-[#EEF4F1] last:border-0"
              >
                <td className="px-4 py-3">
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleToggle(offer)}
                    aria-pressed={offer.is_active}
                    aria-label={`Toggle "${offer.title}" active`}
                    className={`relative inline-flex h-5 w-9 items-center transition-colors disabled:opacity-50 ${
                      offer.is_active ? "bg-[#0F7A4E]" : "bg-[#D8E8E0]"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform bg-white transition-transform ${
                        offer.is_active ? "translate-x-4" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/wimm/admin/offers/${offer.id}`}
                    className="text-[#0E2A20] font-medium hover:text-[#0F7A4E] hover:underline"
                  >
                    {offer.title}
                  </Link>
                </td>
                <td className={`${MONO} px-4 py-3 text-[11px] text-[#4A5A52]`}>
                  {formatOfferWindow(offer.valid_from, offer.valid_until)}
                </td>
                <td className={`${MONO} px-4 py-3 text-[11px] text-[#4A5A52]`}>
                  {formatBenefitPeriod(offer.benefit_month, offer.benefit_year)}
                </td>
                <td className={`${MONO} px-4 py-3 text-[11px] text-[#4A5A52]`}>
                  {offer.eligible_user_ids.length === 0
                    ? "Everyone"
                    : `${offer.eligible_user_ids.length} people`}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/wimm/admin/offers/${offer.id}/redemptions`}
                    className={`${MONO} text-[11px] text-[#0F7A4E] hover:underline`}
                  >
                    {redemptionCounts[offer.id] ?? 0}
                  </Link>
                </td>
              </tr>
            ))}
            {offers.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-sm text-[#7C9187]"
                >
                  No offers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
