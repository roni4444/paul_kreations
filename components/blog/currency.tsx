"use client";

// components/blog/currency.tsx
// Shows {{money:N}} amounts in the visitor's currency. The default is the
// visitor's country (detected after load), a choice made in the switcher is
// remembered in this browser, and anything we can't work out stays in
// rupees — which is also what the server renders, so there's no hydration
// mismatch. Outside a provider (e.g. the admin preview) amounts are rupees.

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getCurrencyContextAction } from "@/server/actions/currency";
import {
  type CurrencyCode,
  currencyForCountry,
  formatMoney,
  isSupportedCurrency,
  localeForCountry,
  type Rates,
  SUPPORTED_CURRENCIES,
} from "@/lib/money";

const STORAGE_KEY = "pk_currency";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

interface CurrencyState {
  enabled: boolean;
  currency: CurrencyCode;
  rates: Rates | null;
  locale: string;
  live: boolean;
  setCurrency: (code: CurrencyCode) => void;
}

const DEFAULT_STATE: CurrencyState = {
  enabled: false,
  currency: "INR",
  rates: null,
  locale: "en-IN",
  live: true,
  setCurrency: () => {},
};

const CurrencyContext = createContext<CurrencyState>(DEFAULT_STATE);

function readSaved(): CurrencyCode | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return isSupportedCurrency(value) ? value : null;
  } catch {
    return null;
  }
}

export function CurrencyProvider({
  enabled,
  children,
}: {
  /** True only for posts with marked amounts that aren't India-specific. */
  enabled: boolean;
  children: ReactNode;
}) {
  const [detected, setDetected] = useState<{
    currency: CurrencyCode;
    rates: Rates;
    locale: string;
    live: boolean;
  } | null>(null);
  const [chosen, setChosen] = useState<CurrencyCode | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    getCurrencyContextAction()
      .then((ctx) => {
        if (cancelled) return;
        setDetected({
          currency: currencyForCountry(ctx.country),
          rates: ctx.rates,
          locale: localeForCountry(ctx.country, navigator.language),
          live: ctx.live,
        });
        setChosen(readSaved());
      })
      .catch(() => {
        // Stay in rupees.
      });
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  const setCurrency = useCallback((code: CurrencyCode) => {
    setChosen(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Private mode etc. — the choice just won't be remembered.
    }
  }, []);

  const value = useMemo<CurrencyState>(
    () => ({
      enabled: enabled && detected !== null,
      currency: detected ? (chosen ?? detected.currency) : "INR",
      rates: detected?.rates ?? null,
      locale: detected?.locale ?? "en-IN",
      live: detected?.live ?? true,
      setCurrency,
    }),
    [enabled, detected, chosen, setCurrency],
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

/** One marked amount, written in INR in the post. */
export function Money({ amount }: { amount: number }) {
  const { currency, rates, locale } = useContext(CurrencyContext);
  return <>{formatMoney(amount, currency, rates, locale)}</>;
}

/** "Show amounts in [currency]" — renders nothing until the visitor's
 * currency is known, and never on posts that stay in rupees. */
export function CurrencySwitcher() {
  const { enabled, currency, setCurrency, live } = useContext(CurrencyContext);
  if (!enabled) return null;

  let names: Intl.DisplayNames | null = null;
  try {
    names = new Intl.DisplayNames(["en"], { type: "currency" });
  } catch {
    names = null;
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#5f5e5e]">
      <label
        htmlFor="currency-switcher"
        className={`${MONO} text-[11px] uppercase`}
      >
        Show amounts in
      </label>
      <select
        id="currency-switcher"
        value={currency}
        onChange={(e) => {
          if (isSupportedCurrency(e.target.value)) setCurrency(e.target.value);
        }}
        className="h-8 rounded-[4px] border border-[#e3bebd] bg-white px-2 text-sm text-[#111c2d]"
      >
        {SUPPORTED_CURRENCIES.map((code) => (
          <option key={code} value={code}>
            {`${code}${names?.of(code) ? ` — ${names.of(code)}` : ""}`}
          </option>
        ))}
      </select>
      {currency !== "INR" && (
        <span className="text-xs text-[#8f6f6f]">
          Approximate conversion from rupees
          {live ? "" : " (rates may be a few days old)"}. Rates by{" "}
          <a
            href="https://www.exchangerate-api.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#c41e3a]"
          >
            ExchangeRate-API
          </a>
          .
        </span>
      )}
    </div>
  );
}
