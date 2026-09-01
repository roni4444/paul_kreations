// schemas/wimm-admin.ts
// Validates the promo offer create/edit form, the admin-only email
// lookup request, and the sign-in Turnstile token. Server-side
// validation here backs up (never replaces) the DB's own CHECK
// constraints on money.promo_offers.

import { z } from "zod";

const uuidSchema = z.string().uuid();

function isParseableDate(value: string): boolean {
  return !Number.isNaN(Date.parse(value));
}

export const promoOfferFormSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Title is required")
      .max(200, "Title is too long"),
    description: z
      .string()
      .trim()
      .max(2000, "Description is too long")
      .optional()
      .or(z.literal("")),
    isActive: z.boolean(),
    // Stored as an ISO instant — the offer-form.tsx client converts the
    // datetime-local picker's local wall-clock value into this before
    // the form ever reaches this schema.
    validFrom: z
      .string()
      .min(1, "Pick a start date/time")
      .refine(isParseableDate, "Invalid start date/time"),
    validUntil: z
      .string()
      .min(1, "Pick an end date/time")
      .refine(isParseableDate, "Invalid end date/time"),
    benefitMonth: z.coerce
      .number()
      .int()
      .min(1, "Month must be between 1 and 12")
      .max(12, "Month must be between 1 and 12"),
    benefitYear: z.coerce
      .number()
      .int()
      .min(2020, "Year must be 2020 or later")
      .max(2100, "Year must be 2100 or earlier"),
    eligibleUserIds: z.array(uuidSchema).default([]),
  })
  .superRefine((data, ctx) => {
    if (
      new Date(data.validUntil).getTime() <= new Date(data.validFrom).getTime()
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["validUntil"],
        message: "End date/time must be after the start date/time",
      });
    }
  });

export type PromoOfferFormData = z.infer<typeof promoOfferFormSchema>;

export const userLookupSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
});

export const wimmAdminSignInSchema = z.object({
  turnstileToken: z.string().min(1, "Please complete the verification"),
});
