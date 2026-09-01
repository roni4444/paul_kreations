"use client";

// components/wimm-admin/redemptions-table.tsx

import { useState, useTransition } from "react";
import { revokeRedemptionAction } from "@/server/actions/wimm-admin";
import type { PromoOfferRedemption } from "@/lib/wimm-admin/types";

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export function RedemptionsTable({
  offerId,
  redemptions,
  emailById,
}: {
  offerId: string;
  redemptions: PromoOfferRedemption[];
  emailById: Record<string, string>;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleRevoke(redemptionId: string) {
    const confirmed = window.confirm(
      "Revoke this redemption? The person loses premium access immediately and can't reapply unless eligible again.",
    );
    if (!confirmed) return;

    setError("");
    startTransition(async () => {
      try {
        await revokeRedemptionAction(redemptionId, offerId);
      } catch {
        setError("Couldn't revoke that redemption. Please try again.");
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
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Applied</th>
              <th className="text-left px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {redemptions.map((r) => (
              <tr
                key={r.id}
                className="border-b border-[#EEF4F1] last:border-0"
              >
                <td className="px-4 py-3 text-[#0E2A20]">
                  {emailById[r.user_id] ?? r.user_id}
                </td>
                <td className={`${MONO} px-4 py-3 text-[11px] text-[#4A5A52]`}>
                  {new Intl.DateTimeFormat(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(r.applied_at))}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleRevoke(r.id)}
                    className={`${MONO} text-[11px] text-[#C0392B] uppercase hover:underline disabled:opacity-50`}
                  >
                    Revoke
                  </button>
                </td>
              </tr>
            ))}
            {redemptions.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-10 text-center text-sm text-[#7C9187]"
                >
                  No redemptions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
