"use server";

// server/actions/currency.ts
// Tells the browser which country the visitor is in (from the hosting
// provider's request headers — not stored) and the current exchange rates.
// Called from the client after load so the post page itself stays ISR-cached.

import { headers } from "next/headers";
import { z } from "zod";
import { FALLBACK_RATES, type Rates, SUPPORTED_CURRENCIES } from "@/lib/money";

export interface CurrencyContext {
  country: string | null;
  rates: Rates;
  /** False when the live feed was unreachable and fallback rates are used. */
  live: boolean;
}

const ratesResponseSchema = z.object({
  result: z.literal("success"),
  rates: z.record(z.string(), z.number()),
});

const TWELVE_HOURS = 60 * 60 * 12;

async function loadRates(): Promise<{ rates: Rates; live: boolean }> {
  try {
    // Cached by Next for 12h, so this is one upstream call per half-day, not
    // one per visitor. Free tier of ExchangeRate-API (attribution shown by
    // the switcher).
    const res = await fetch("https://open.er-api.com/v6/latest/INR", {
      next: { revalidate: TWELVE_HOURS },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const parsed = ratesResponseSchema.parse(await res.json());

    const rates: Rates = { ...FALLBACK_RATES };
    for (const code of SUPPORTED_CURRENCIES) {
      const rate = parsed.rates[code];
      if (
        code !== "INR" &&
        typeof rate === "number" &&
        Number.isFinite(rate) &&
        rate > 0
      ) {
        rates[code] = rate;
      }
    }
    return { rates, live: true };
  } catch (err) {
    console.warn("[getCurrencyContextAction] rate feed failed", err);
    return { rates: FALLBACK_RATES, live: false };
  }
}

export async function getCurrencyContextAction(): Promise<CurrencyContext> {
  const headerList = await headers();
  const raw =
    headerList.get("x-vercel-ip-country") ?? headerList.get("cf-ipcountry");
  const country = raw && /^[A-Za-z]{2}$/.test(raw) ? raw.toUpperCase() : null;

  const { rates, live } = await loadRates();
  return { country, rates, live };
}
