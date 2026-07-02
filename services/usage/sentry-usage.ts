// services/usage/sentry-usage.ts
// Reads real event-volume numbers from Sentry's stats_v2 endpoint
// (confirmed documented: GET /api/0/organizations/{org_slug}/stats_v2/).
// Raw fetch, same pattern as services/gemini/recipe-extraction.ts — no
// new dependency needed for a single well-defined REST call
// (PROJECT_RULES.md §7).
//
// Org slug is a required env var (SENTRY_ORG_SLUG) rather than looked
// up via GET /organizations/ — that endpoint 403s for Organization Auth
// Tokens (the current Sentry token type), which is what
// SENTRY_MANAGEMENT_ACCESS_TOKEN is here.
//
// category="transaction" is deliberately NOT requested — Sentry moved
// tracing/billing from "transactions" to "spans" during 2025, so that
// category value is likely rejected on current accounts. Only "error"
// is requested for now, since it's unambiguously still valid. On any
// non-2xx response the full response body (not just the status code)
// is surfaced, since Sentry's 400 responses for stats_v2 name the
// exact set of valid category values it accepts on this account —
// evidence to extend this safely later, rather than a second guess.

import type { SentryUsage } from "@/schemas/usage";

const SENTRY_API_BASE = "https://sentry.io/api/0";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

interface StatsV2Response {
  groups: { by: { category: string }; totals: Record<string, number> }[];
}

export async function getSentryUsage(): Promise<SentryUsage> {
  try {
    const token = requireEnv("SENTRY_MANAGEMENT_ACCESS_TOKEN");
    const orgSlug = requireEnv("SENTRY_ORG_SLUG");

    const params = new URLSearchParams({
      statsPeriod: "30d",
      interval: "12h",
      field: "sum(quantity)",
      groupBy: "category",
    });
    params.append("category", "error");

    const res = await fetch(
      `${SENTRY_API_BASE}/organizations/${orgSlug}/stats_v2/?${params}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    if (!res.ok) {
      const body = await res.text();
      console.log(
        `[getSentryUsage] stats_v2 returned ${res.status}. Body: ${body}`,
      );
      throw new Error(
        `Sentry stats request failed (${res.status}). See server console for the full response body.`,
      );
    }

    const data = (await res.json()) as StatsV2Response;
    const errorEvents =
      data.groups.find((g) => g.by.category === "error")?.totals[
        "sum(quantity)"
      ] ?? 0;

    return {
      status: "ok",
      orgSlug,
      periodLabel: "Last 30 days",
      errorEvents,
      transactionEvents: 0,
      dashboardUrl: `https://sentry.io/organizations/${orgSlug}/stats/`,
    };
  } catch (err) {
    return {
      status: "error",
      message:
        err instanceof Error ? err.message : "Couldn't load Sentry usage.",
    };
  }
}
