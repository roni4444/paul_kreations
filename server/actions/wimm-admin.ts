"use server";

// server/actions/wimm-admin.ts
// Every action re-checks requireWimmAdmin() itself — middleware.ts only
// confirms *a* Supabase session exists, not money.promo_admins
// membership. All actual data access lives in
// services/supabase/wimm-admin.ts; this file is validation + error
// translation only, matching server/actions/cookbooks.ts.

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import { promoOfferFormSchema, userLookupSchema } from "@/schemas/wimm-admin";
import {
  createOffer,
  lookupUserByEmail,
  requireWimmAdmin,
  revokeRedemption,
  setOfferActive,
  updateOffer,
} from "@/services/supabase/wimm-admin";
import type { EligibleUser, PromoOfferInput } from "@/lib/wimm-admin/types";

export interface WimmOfferFormState {
  status: "idle" | "error";
  message?: string;
}

function toOfferInput(formData: FormData): unknown {
  return {
    title: formData.get("title"),
    description: formData.get("description"),
    isActive: formData.get("isActive") === "on",
    validFrom: formData.get("validFrom"),
    validUntil: formData.get("validUntil"),
    benefitMonth: formData.get("benefitMonth"),
    benefitYear: formData.get("benefitYear"),
    eligibleUserIds: formData.getAll("eligibleUserIds").map(String),
  };
}

export async function createOfferAction(
  _prevState: WimmOfferFormState,
  formData: FormData,
): Promise<WimmOfferFormState> {
  await requireWimmAdmin();

  const parsed = promoOfferFormSchema.safeParse(toOfferInput(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }

  let offerId: string;
  try {
    offerId = await createOffer(parsed.data as PromoOfferInput);
  } catch (err) {
    Sentry.captureException(err);
    return {
      status: "error",
      message:
        err instanceof Error ? err.message : "Couldn't create the offer.",
    };
  }

  revalidatePath("/wimm/admin");
  redirect(`/wimm/admin/offers/${offerId}`);
}

export async function updateOfferAction(
  _prevState: WimmOfferFormState,
  formData: FormData,
): Promise<WimmOfferFormState> {
  await requireWimmAdmin();

  const offerId = String(formData.get("offerId") ?? "");
  if (!offerId) {
    return { status: "error", message: "Missing offer id." };
  }

  const parsed = promoOfferFormSchema.safeParse(toOfferInput(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }

  try {
    await updateOffer(offerId, parsed.data as PromoOfferInput);
  } catch (err) {
    Sentry.captureException(err);
    return {
      status: "error",
      message: err instanceof Error ? err.message : "Couldn't save changes.",
    };
  }

  revalidatePath("/wimm/admin");
  revalidatePath(`/wimm/admin/offers/${offerId}`);
  return { status: "idle" };
}

export async function toggleOfferActiveAction(
  offerId: string,
  isActive: boolean,
): Promise<void> {
  await requireWimmAdmin();

  try {
    await setOfferActive(offerId, isActive);
  } catch (err) {
    Sentry.captureException(err);
    throw err;
  }

  revalidatePath("/wimm/admin");
}

export async function revokeRedemptionAction(
  redemptionId: string,
  offerId: string,
): Promise<void> {
  await requireWimmAdmin();

  try {
    await revokeRedemption(redemptionId);
  } catch (err) {
    Sentry.captureException(err);
    throw err;
  }

  revalidatePath(`/wimm/admin/offers/${offerId}/redemptions`);
  revalidatePath("/wimm/admin");
}

export interface LookupUserState {
  status: "found" | "not_found" | "error";
  user?: EligibleUser;
  message?: string;
}

export async function lookupUserByEmailAction(
  email: string,
): Promise<LookupUserState> {
  await requireWimmAdmin();

  const parsed = userLookupSchema.safeParse({ email });
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message };
  }

  try {
    const user = await lookupUserByEmail(parsed.data.email);
    return user ? { status: "found", user } : { status: "not_found" };
  } catch (err) {
    Sentry.captureException(err);
    return {
      status: "error",
      message: "Couldn't look up that email. Please try again.",
    };
  }
}
