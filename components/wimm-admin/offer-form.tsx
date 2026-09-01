"use client";

// components/wimm-admin/offer-form.tsx
// Shared by the create and edit screens. Handles timezone-safe
// conversion for the datetime pickers itself (see localInputToIso) so
// server/actions/wimm-admin.ts only ever sees correct ISO instants.

import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import { EligibleUsersPicker } from "./eligible-users-picker";
import type { EligibleUser, PromoOffer } from "@/lib/wimm-admin/types";
import { currentTimeZoneLabel } from "@/lib/wimm-admin/format";
import type { WimmOfferFormState } from "@/server/actions/wimm-admin";

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";
const LABEL = `${MONO} text-[11px] text-[#4A5A52] uppercase`;
const FIELD =
  "w-full px-3 border border-[#D8E8E0] bg-white text-[#0E2A20] text-sm outline-none transition-all placeholder:text-[#8FA69B] focus:border-[#0F7A4E] focus:border-2 disabled:opacity-50 disabled:cursor-not-allowed h-11";

/** A datetime-local input's value is a wall-clock reading with no
 * timezone attached — the browser hands it to us in whatever timezone
 * it's rendering in, which is exactly what `new Date(value)` assumes
 * too, so this round-trips correctly to a real UTC instant. */
function localInputToIso(value: string): string {
  if (!value) return "";
  return new Date(value).toISOString();
}

/** Reverse conversion, for pre-filling the input when editing. */
function isoToLocalInput(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`;
}

const initialState: WimmOfferFormState = { status: "idle" };

export function OfferForm({
  offer,
  initialEligibleUsers,
  action,
  submitLabel,
}: {
  offer?: PromoOffer;
  initialEligibleUsers: EligibleUser[];
  action: (
    prevState: WimmOfferFormState,
    formData: FormData,
  ) => Promise<WimmOfferFormState>;
  submitLabel: string;
}) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [eligibleUsers, setEligibleUsers] =
    useState<EligibleUser[]>(initialEligibleUsers);
  const [validFromLocal, setValidFromLocal] = useState(
    offer ? isoToLocalInput(offer.valid_from) : "",
  );
  const [validUntilLocal, setValidUntilLocal] = useState(
    offer ? isoToLocalInput(offer.valid_until) : "",
  );

  const nextYear = new Date().getFullYear();

  return (
    <form action={formAction} className="flex flex-col gap-6 max-w-[560px]">
      {offer && <input type="hidden" name="offerId" value={offer.id} />}
      <input
        type="hidden"
        name="validFrom"
        value={localInputToIso(validFromLocal)}
      />
      <input
        type="hidden"
        name="validUntil"
        value={localInputToIso(validUntilLocal)}
      />
      {eligibleUsers.map((u) => (
        <input key={u.id} type="hidden" name="eligibleUserIds" value={u.id} />
      ))}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className={LABEL}>
          Title <span className="text-[#0F7A4E]">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={offer?.title}
          className={FIELD}
          disabled={isPending}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className={LABEL}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={offer?.description ?? ""}
          className={`${FIELD} h-auto py-2 resize-none`}
          disabled={isPending}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="isActive"
          name="isActive"
          type="checkbox"
          defaultChecked={offer?.is_active ?? true}
          disabled={isPending}
          className="h-4 w-4 accent-[#0F7A4E]"
        />
        <label htmlFor="isActive" className={LABEL}>
          Active
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="validFromInput" className={LABEL}>
            Valid from <span className="text-[#0F7A4E]">*</span>
          </label>
          <input
            id="validFromInput"
            type="datetime-local"
            required
            value={validFromLocal}
            onChange={(e) => setValidFromLocal(e.target.value)}
            className={FIELD}
            disabled={isPending}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="validUntilInput" className={LABEL}>
            Valid until <span className="text-[#0F7A4E]">*</span>
          </label>
          <input
            id="validUntilInput"
            type="datetime-local"
            required
            value={validUntilLocal}
            onChange={(e) => setValidUntilLocal(e.target.value)}
            className={FIELD}
            disabled={isPending}
          />
        </div>
      </div>
      <p className={`${MONO} text-[10px] text-[#7C9187] -mt-4`}>
        Times above are in your current timezone ({currentTimeZoneLabel()}) and
        stored as an exact instant.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="benefitMonth" className={LABEL}>
            Benefit month <span className="text-[#0F7A4E]">*</span>
          </label>
          <select
            id="benefitMonth"
            name="benefitMonth"
            required
            defaultValue={offer?.benefit_month ?? new Date().getMonth() + 1}
            className={FIELD}
            disabled={isPending}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                {new Date(2000, m - 1, 1).toLocaleString(undefined, {
                  month: "long",
                })}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="benefitYear" className={LABEL}>
            Benefit year <span className="text-[#0F7A4E]">*</span>
          </label>
          <input
            id="benefitYear"
            name="benefitYear"
            type="number"
            min={2020}
            max={2100}
            required
            defaultValue={offer?.benefit_year ?? nextYear}
            className={FIELD}
            disabled={isPending}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className={LABEL}>Eligible people</span>
        <EligibleUsersPicker
          initialUsers={initialEligibleUsers}
          onChange={setEligibleUsers}
        />
      </div>

      {state.status === "error" && (
        <div className="flex items-start gap-2 px-3 py-2.5 border border-[#C0392B] bg-[#FCEEEC]">
          <span className={`${MONO} text-[11px] text-[#C0392B]`}>
            {state.message}
          </span>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center gap-2 h-11 px-6 bg-[#0F7A4E] hover:bg-[#0A5C3A] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors w-fit"
      >
        {isPending && (
          <Loader2 size={14} className="animate-spin" aria-hidden="true" />
        )}
        {submitLabel}
      </button>
    </form>
  );
}
