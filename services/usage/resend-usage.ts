// services/usage/resend-usage.ts
// Reads recent send activity via resend.emails.list() — the official
// SDK already used in services/email.ts and services/email-admin.ts, so
// this introduces no new dependency. Resend has no separate "quota
// remaining" endpoint; this shows real recent activity, not a hard
// quota number.

import { Resend } from "resend";
import type { ResendUsage } from "@/schemas/usage";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function getResendUsage(): Promise<ResendUsage> {
  try {
    const { data, error } = await resend.emails.list();
    if (error) {
      throw new Error(error.message);
    }

    const emails = data?.data ?? [];
    const lastSentAt = emails[0]?.created_at ?? null;

    return {
      status: "ok",
      recentEmailCount: emails.length,
      lastSentAt,
      dashboardUrl: "https://resend.com/emails",
    };
  } catch (err) {
    return {
      status: "error",
      message:
        err instanceof Error ? err.message : "Couldn't load Resend activity.",
    };
  }
}
