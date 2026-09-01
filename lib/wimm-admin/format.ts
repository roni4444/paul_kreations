// lib/wimm-admin/format.ts
// Small formatting helpers for the offers list and forms. No business
// logic here — just readability.

export function formatOfferWindow(
  validFrom: string,
  validUntil: string,
): string {
  const fmt = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return `${fmt.format(new Date(validFrom))} → ${fmt.format(new Date(validUntil))}`;
}

export function formatBenefitPeriod(month: number, year: number): string {
  const label = new Date(2000, month - 1, 1).toLocaleString(undefined, {
    month: "long",
  });
  return `${label} ${year}`;
}

export function currentTimeZoneLabel(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
