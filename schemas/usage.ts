// schemas/usage.ts
// Validates data crossing the boundary with each vendor's management
// API — external responses are still external input, never trusted
// blindly (PROJECT_RULES.md §5).

import { z } from "zod";

// ── Sentry ──────────────────────────────────────────────────────────────
export const sentryUsageSchema = z.object({
  status: z.literal("ok"),
  orgSlug: z.string(),
  periodLabel: z.string(),
  errorEvents: z.number(),
  transactionEvents: z.number(),
  dashboardUrl: z.string().url(),
});
export const sentryUsageErrorSchema = z.object({
  status: z.literal("error"),
  message: z.string(),
});
export type SentryUsage =
  | z.infer<typeof sentryUsageSchema>
  | z.infer<typeof sentryUsageErrorSchema>;

// ── Resend ──────────────────────────────────────────────────────────────
export const resendUsageSchema = z.object({
  status: z.literal("ok"),
  recentEmailCount: z.number(),
  lastSentAt: z.string().nullable(),
  dashboardUrl: z.string().url(),
});
export const resendUsageErrorSchema = z.object({
  status: z.literal("error"),
  message: z.string(),
});
export type ResendUsage =
  | z.infer<typeof resendUsageSchema>
  | z.infer<typeof resendUsageErrorSchema>;

// ── Supabase ────────────────────────────────────────────────────────────
export const supabaseProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  region: z.string(),
  status: z.string(),
});
export const supabaseUsageSchema = z.object({
  status: z.literal("ok"),
  projects: z.array(supabaseProjectSchema),
  dashboardUrl: z.string().url(),
});
export const supabaseUsageErrorSchema = z.object({
  status: z.literal("error"),
  message: z.string(),
});
export type SupabaseUsage =
  | z.infer<typeof supabaseUsageSchema>
  | z.infer<typeof supabaseUsageErrorSchema>;

// ── Appwrite ────────────────────────────────────────────────────────────
export const appwriteUsageSchema = z.object({
  status: z.literal("ok"),
  totalStaffUsers: z.number(),
  totalStaffRows: z.number(),
  dashboardUrl: z.string().url(),
});
export const appwriteUsageErrorSchema = z.object({
  status: z.literal("error"),
  message: z.string(),
});
export type AppwriteUsage =
  | z.infer<typeof appwriteUsageSchema>
  | z.infer<typeof appwriteUsageErrorSchema>;

export const usageDashboardSchema = z.object({
  sentry: z.union([sentryUsageSchema, sentryUsageErrorSchema]),
  resend: z.union([resendUsageSchema, resendUsageErrorSchema]),
  supabase: z.union([supabaseUsageSchema, supabaseUsageErrorSchema]),
  appwrite: z.union([appwriteUsageSchema, appwriteUsageErrorSchema]),
});
export type UsageDashboard = z.infer<typeof usageDashboardSchema>;
