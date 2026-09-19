// components/seo/json-ld.tsx
// Injects JSON-LD structured data into <head>.
// Used in layout.tsx (Organization) and can be added to individual pages.
//
// Schema types used:
//   Organization  — establishes Paul Kreations as an entity Google can understand
//   SoftwareApplication — makes apps eligible for rich results in Google Search
//
// All URLs derive from BASE_URL (lib/config.ts) so the canonical domain
// (https://www.paulkreations.com) is defined in exactly one place.

import { apps, teamMembers } from "@/lib/data";
import { BASE_URL } from "@/lib/config";

// ─── Organisation schema ──────────────────────────────────────────────────────

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Paul Kreations",
    url: BASE_URL,
    // app/icon.png is served by Next.js at /icon.png. Swap for a dedicated
    // square logo (min 112x112) if you add one to /public.
    logo: `${BASE_URL}/icon.png`,
    description:
      "Paul Kreations builds thoughtful Android apps, web experiences, and games with precision, purpose, and genuine craft.",
    founder: {
      "@type": "Person",
      name: teamMembers[0].name,
      url: teamMembers[0].linkedin,
    },
    sameAs: [
      teamMembers[0].github,
      teamMembers[0].linkedin,
      "https://play.google.com/store/apps/developer?id=Paul+Kreations",
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── WebSite schema ───────────────────────────────────────────────────────────
// Names the site and links it to the Organization entity above.

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: "Paul Kreations",
    url: BASE_URL,
    publisher: { "@id": `${BASE_URL}/#organization` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── App catalogue schema ─────────────────────────────────────────────────────

const CATEGORY_MAP: Record<string, string> = {
  "Food & Drink": "FoodApplication",
  Education: "EducationalApplication",
  Strategy: "GameApplication",
  Productivity: "ProductivityApplication",
  Utilities: "UtilitiesApplication",
  Finance: "FinanceApplication",
};

export function AppsJsonLd() {
  const schemas = apps.map((app) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.description,
    applicationCategory: CATEGORY_MAP[app.category] ?? "MobileApplication",
    operatingSystem: "Android",
    url: app.playStoreUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    // Omitted entirely for apps with no rating yet — a fabricated rating is
    // misleading and can violate Google's structured-data guidelines.
    ...(typeof app.rating === "number"
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: app.rating.toString(),
            // ratingCount: "5", // uncomment and update with real review count
          },
        }
      : {}),
    author: { "@id": `${BASE_URL}/#organization` },
  }));

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
