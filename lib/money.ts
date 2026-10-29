// lib/money.ts
// Currency support for blog posts. Posts are written in rupees; an amount is
// marked up as {{money:45000}} (a plain number in INR, no symbol, no commas)
// and shown in the visitor's currency. A post that is India-specific puts
// {{currency:inr}} on its own line and always shows rupees.
// Shared by server and client code — no hooks, no "use client".

export const SUPPORTED_CURRENCIES = [
  "INR",
  "USD",
  "EUR",
  "GBP",
  "CAD",
  "AUD",
  "NZD",
  "SGD",
  "AED",
  "SAR",
  "JPY",
  "CHF",
  "MYR",
  "ZAR",
  "BDT",
  "LKR",
  "NPR",
  "PKR",
  "PHP",
  "IDR",
  "THB",
  "BRL",
  "MXN",
  "SEK",
  "NOK",
  "DKK",
  "PLN",
  "NGN",
  "KES",
] as const;

export type CurrencyCode = (typeof SUPPORTED_CURRENCIES)[number];

/** Units of each currency per 1 INR. */
export type Rates = Partial<Record<CurrencyCode, number>>;

/** Used when the live rate feed is unreachable (ExchangeRate-API,
 * 29 Oct 2026). Approximate on purpose — refresh now and then. */
export const FALLBACK_RATES: Rates = {
  INR: 1,
  USD: 0.010494,
  EUR: 0.009432,
  GBP: 0.007899,
  CAD: 0.014752,
  AUD: 0.014908,
  NZD: 0.018665,
  SGD: 0.013463,
  AED: 0.03854,
  SAR: 0.039353,
  JPY: 1.658968,
  CHF: 0.008711,
  MYR: 0.042828,
  ZAR: 0.174966,
  BDT: 1.303833,
  LKR: 3.491065,
  NPR: 1.6,
  PKR: 2.908135,
  PHP: 0.671317,
  IDR: 190.696403,
  THB: 0.354572,
  BRL: 0.05617,
  MXN: 0.195843,
  SEK: 0.104308,
  NOK: 0.09762,
  DKK: 0.07052,
  PLN: 0.041534,
  NGN: 14.162459,
  KES: 1.363857,
};

const EURO_COUNTRIES = [
  "AT",
  "BE",
  "CY",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PT",
  "SK",
  "SI",
  "ES",
  "HR",
];

const COUNTRY_CURRENCY: Record<string, CurrencyCode> = {
  IN: "INR",
  US: "USD",
  GB: "GBP",
  CA: "CAD",
  AU: "AUD",
  NZ: "NZD",
  SG: "SGD",
  AE: "AED",
  SA: "SAR",
  JP: "JPY",
  CH: "CHF",
  MY: "MYR",
  ZA: "ZAR",
  BD: "BDT",
  LK: "LKR",
  NP: "NPR",
  PK: "PKR",
  PH: "PHP",
  ID: "IDR",
  TH: "THB",
  BR: "BRL",
  MX: "MXN",
  SE: "SEK",
  NO: "NOK",
  DK: "DKK",
  PL: "PLN",
  NG: "NGN",
  KE: "KES",
  ...Object.fromEntries(EURO_COUNTRIES.map((c) => [c, "EUR" as const])),
};

/** Number-format locale per country, so separators follow local custom
 * (1.234,56 in Germany, 1 234,56 in France, 4,50,000 in India…). */
const COUNTRY_LOCALE: Record<string, string> = {
  IN: "en-IN",
  US: "en-US",
  GB: "en-GB",
  CA: "en-CA",
  AU: "en-AU",
  NZ: "en-NZ",
  SG: "en-SG",
  IE: "en-IE",
  ZA: "en-ZA",
  MY: "en-MY",
  PH: "en-PH",
  NG: "en-NG",
  KE: "en-KE",
  AE: "en-AE",
  DE: "de-DE",
  AT: "de-AT",
  CH: "de-CH",
  FR: "fr-FR",
  ES: "es-ES",
  MX: "es-MX",
  IT: "it-IT",
  NL: "nl-NL",
  BE: "nl-BE",
  PT: "pt-PT",
  BR: "pt-BR",
  SE: "sv-SE",
  NO: "nb-NO",
  DK: "da-DK",
  PL: "pl-PL",
  FI: "fi-FI",
  GR: "el-GR",
  JP: "ja-JP",
  ID: "id-ID",
};

export function currencyForCountry(country: string | null): CurrencyCode {
  if (!country) return "INR";
  return COUNTRY_CURRENCY[country.toUpperCase()] ?? "USD";
}

export function localeForCountry(
  country: string | null,
  browserLanguage?: string,
): string {
  const fromCountry = country
    ? COUNTRY_LOCALE[country.toUpperCase()]
    : undefined;
  return fromCountry ?? browserLanguage ?? "en-US";
}

export function isSupportedCurrency(value: unknown): value is CurrencyCode {
  return (
    typeof value === "string" &&
    (SUPPORTED_CURRENCIES as readonly string[]).includes(value)
  );
}

function format(
  value: number,
  currency: string,
  locale: string,
  original = false,
): string {
  const whole = Number.isInteger(value);
  const abs = Math.abs(value);
  try {
    const zeroDecimal =
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
      }).resolvedOptions().maximumFractionDigits === 0;
    // Rupee figures as written: whole numbers stay whole. Converted values:
    // cents only while they matter (under 100).
    const digits = original
      ? whole
        ? 0
        : 2
      : zeroDecimal || abs >= 100
        ? 0
        : 2;
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(value);
  } catch {
    return `${currency} ${Math.round(value)}`;
  }
}

/** Formats an amount written in INR for the chosen currency. Converted
 * figures get a leading "≈" because rates are approximate. */
export function formatMoney(
  amountInr: number,
  currency: CurrencyCode,
  rates: Rates | null,
  locale: string,
): string {
  const rate = rates?.[currency];
  if (currency === "INR" || !rate) {
    return format(amountInr, "INR", locale, true);
  }
  return `≈ ${format(amountInr * rate, currency, locale)}`;
}

// ── Markup in post Markdown ───────────────────────────────────────────────

const MONEY_SOURCE = String.raw`\{\{\s*money\s*:\s*(\d[\d,]*(?:\.\d+)?)\s*\}\}`;
const INR_ONLY_SOURCE = String.raw`^[ \t]*\{\{\s*currency\s*:\s*inr\s*\}\}[ \t]*(?:\r?\n|$)`;

export function hasMoneyMarkers(source: string): boolean {
  return new RegExp(MONEY_SOURCE).test(source);
}

export function isInrOnly(source: string): boolean {
  return new RegExp(INR_ONLY_SOURCE, "im").test(source);
}

/** Turns {{money:N}} into a link-shaped token the renderer swaps for the
 * <Money> component (its text is the plain rupee figure, which is what
 * search engines and no-JS readers see), and removes the {{currency:inr}}
 * line. */
export function prepareMarkdown(source: string): string {
  return source
    .replace(new RegExp(INR_ONLY_SOURCE, "gim"), "")
    .replace(new RegExp(MONEY_SOURCE, "g"), (_match, raw: string) => {
      const n = Number(raw.replace(/,/g, ""));
      if (!Number.isFinite(n)) return raw;
      return `[${format(n, "INR", "en-IN", true)}](money:${n})`;
    });
}
