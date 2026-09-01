// services/supabase/wimm-admin.ts
// Authorization boundary + all data access for the WIMM promo-offers
// admin. Every Server Action and every protected page calls
// requireWimmAdmin() itself — middleware.ts only confirms *a* Supabase
// session exists, not that it belongs to a money.promo_admins row.
//
// money.promo_offer_redemptions is deliberately SELECT + DELETE only in
// this file. There is no insert/update against it anywhere below, and
// there must never be one added — see the original spec: the only
// legitimate way a redemption is created is the mobile app's own
// server-side validation path, never this admin site.

import { redirect } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import {
  createWimmSupabaseServerClient,
  getWimmFunctionsUrl,
} from "./wimm-client";
import type {
  EligibleUser,
  PromoOffer,
  PromoOfferInput,
  PromoOfferRedemption,
} from "@/lib/wimm-admin/types";

export interface WimmAdminSession {
  userId: string;
  email: string;
}

/** Redirects rather than throwing — every caller is a Server Component
 * or Server Action, both of which can redirect(). */
export async function requireWimmAdmin(): Promise<WimmAdminSession> {
  const supabase = await createWimmSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/wimm/admin/login");

  const { data: adminRow, error } = await supabase
    .from("promo_admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    Sentry.captureException(error);
    redirect("/wimm/admin/unauthorized");
  }

  if (!adminRow) redirect("/wimm/admin/unauthorized");

  return { userId: user.id, email: user.email ?? "" };
}

export async function listOffers(): Promise<PromoOffer[]> {
  const supabase = await createWimmSupabaseServerClient();

  const { data, error } = await supabase
    .from("promo_offers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    Sentry.captureException(error);
    throw new Error("Couldn't load offers.");
  }

  return data as PromoOffer[];
}

export async function getOffer(id: string): Promise<PromoOffer | null> {
  const supabase = await createWimmSupabaseServerClient();

  const { data, error } = await supabase
    .from("promo_offers")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    Sentry.captureException(error);
    throw new Error("Couldn't load that offer.");
  }

  return data as PromoOffer | null;
}

export async function createOffer(input: PromoOfferInput): Promise<string> {
  const supabase = await createWimmSupabaseServerClient();

  const { data, error } = await supabase
    .from("promo_offers")
    .insert({
      title: input.title,
      description: input.description || null,
      is_active: input.isActive,
      valid_from: input.validFrom,
      valid_until: input.validUntil,
      benefit_type: "calendar_month",
      benefit_month: input.benefitMonth,
      benefit_year: input.benefitYear,
      eligible_user_ids: input.eligibleUserIds,
    })
    .select("id")
    .single();

  if (error) {
    Sentry.captureException(error);
    throw new Error(mapPromoOfferDbError(error.message));
  }

  return data.id as string;
}

export async function updateOffer(
  id: string,
  input: PromoOfferInput,
): Promise<void> {
  const supabase = await createWimmSupabaseServerClient();

  const { error } = await supabase
    .from("promo_offers")
    .update({
      title: input.title,
      description: input.description || null,
      is_active: input.isActive,
      valid_from: input.validFrom,
      valid_until: input.validUntil,
      benefit_month: input.benefitMonth,
      benefit_year: input.benefitYear,
      eligible_user_ids: input.eligibleUserIds,
    })
    .eq("id", id);

  if (error) {
    Sentry.captureException(error);
    throw new Error(mapPromoOfferDbError(error.message));
  }
}

export async function setOfferActive(
  id: string,
  isActive: boolean,
): Promise<void> {
  const supabase = await createWimmSupabaseServerClient();

  const { error } = await supabase
    .from("promo_offers")
    .update({ is_active: isActive })
    .eq("id", id);

  if (error) {
    Sentry.captureException(error);
    throw new Error("Couldn't update the offer.");
  }
}

/** One aggregate query for every offer's redemption count, keyed by
 * offer_id — simpler than N per-row queries and this list is never
 * large enough to need pagination. */
export async function getRedemptionCounts(): Promise<Record<string, number>> {
  const supabase = await createWimmSupabaseServerClient();

  const { data, error } = await supabase
    .from("promo_offer_redemptions")
    .select("offer_id");

  if (error) {
    Sentry.captureException(error);
    throw new Error("Couldn't load redemption counts.");
  }

  const counts: Record<string, number> = {};
  for (const row of data as { offer_id: string }[]) {
    counts[row.offer_id] = (counts[row.offer_id] ?? 0) + 1;
  }
  return counts;
}

export async function listRedemptions(
  offerId?: string,
): Promise<PromoOfferRedemption[]> {
  const supabase = await createWimmSupabaseServerClient();

  let query = supabase
    .from("promo_offer_redemptions")
    .select("*")
    .order("applied_at", { ascending: false });

  if (offerId) query = query.eq("offer_id", offerId);

  const { data, error } = await query;

  if (error) {
    Sentry.captureException(error);
    throw new Error("Couldn't load redemptions.");
  }

  return data as PromoOfferRedemption[];
}

/** Deliberately the ONLY write this file performs against
 * promo_offer_redemptions. See file header. */
export async function revokeRedemption(id: string): Promise<void> {
  const supabase = await createWimmSupabaseServerClient();

  const { error } = await supabase
    .from("promo_offer_redemptions")
    .delete()
    .eq("id", id);

  if (error) {
    Sentry.captureException(error);
    throw new Error("Couldn't revoke that redemption.");
  }
}

// ── Email ⇄ auth.users lookup, via the wimm-admin-user-lookup Edge
// Function (deployed separately — see supabase/functions/). auth.users
// has no public table and RLS correctly prevents querying it directly,
// so this is the one path that needs a privileged (service-role)
// operation. The function re-verifies promo_admins membership itself
// using the caller's own access token; this file just forwards it. ──

async function callUserLookupFunction(
  body: Record<string, unknown>,
): Promise<Response> {
  const supabase = await createWimmSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/wimm/admin/login");

  return fetch(`${getWimmFunctionsUrl()}/wimm-admin-user-lookup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify(body),
  });
}

export async function lookupUserByEmail(
  email: string,
): Promise<EligibleUser | null> {
  const res = await callUserLookupFunction({ email });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`User lookup failed (${res.status}).`);

  const data = (await res.json()) as { user: EligibleUser };
  return data.user;
}

/** Batch-resolves ids → {id, email} for display (eligible-people chips,
 * redemption rows). Silently drops ids that no longer resolve to a
 * user rather than failing the whole page. */
export async function resolveEligibleUsers(
  ids: string[],
): Promise<EligibleUser[]> {
  const uniqueIds = [...new Set(ids)];
  if (uniqueIds.length === 0) return [];

  const res = await callUserLookupFunction({ ids: uniqueIds });
  if (!res.ok) throw new Error(`User lookup failed (${res.status}).`);

  const data = (await res.json()) as { users: EligibleUser[] };
  return data.users;
}

function mapPromoOfferDbError(message: string): string {
  if (message.includes("promo_offers_valid_window")) {
    return "End date/time must be after the start date/time.";
  }
  if (message.includes("promo_offers_calendar_month_fields")) {
    return "Month and year are both required.";
  }
  if (message.includes("promo_offers_benefit_type_known")) {
    return "Unsupported benefit type.";
  }
  return "Couldn't save the offer. Please try again.";
}
