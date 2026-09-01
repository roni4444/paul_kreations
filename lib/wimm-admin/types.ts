// lib/wimm-admin/types.ts
// Shared types for the WIMM promo-offers admin. Mirrors money.promo_offers
// and money.promo_offer_redemptions exactly — see the data model in the
// original spec for column-by-column notes.

export interface PromoOffer {
  id: string;
  title: string;
  description: string | null;
  is_active: boolean;
  valid_from: string;
  valid_until: string;
  benefit_type: "calendar_month";
  benefit_month: number;
  benefit_year: number;
  eligible_user_ids: string[];
  created_at: string;
}

export interface PromoOfferInput {
  title: string;
  description?: string;
  isActive: boolean;
  validFrom: string;
  validUntil: string;
  benefitMonth: number;
  benefitYear: number;
  eligibleUserIds: string[];
}

export interface PromoOfferRedemption {
  id: string;
  user_id: string;
  offer_id: string;
  applied_at: string;
}

export interface EligibleUser {
  id: string;
  email: string;
}
