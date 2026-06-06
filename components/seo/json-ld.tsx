// components/seo/json-ld.tsx
// Injects JSON-LD structured data into <head>.
// Used in layout.tsx (Organization) and can be added to individual pages.
//
// Schema types used:
//   Organization  — establishes Paul Kreations as an entity Google can understand
//   SoftwareApplication — makes apps eligible for rich results in Google Search

import { apps, teamMembers } from "@/lib/data";

// ─── Organisation schema ──────────────────────────────────────────────────────
// Tells Google who you are, your social profiles, and your Play Store page.
// Place this in the root layout so it appears on every page.

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Paul Kreations",
    url: "https://paulkreations.com",
    logo: "https://paulkreations.com/logo.png", // add your logo to /public/logo.png
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

// ─── App catalogue schema ─────────────────────────────────────────────────────
// One SoftwareApplication entry per app.
// Makes apps eligible for Google rich results (star rating, price, category).
// Place this on the home page near the Products section.

// Maps our category strings to schema.org applicationCategory values.
const CATEGORY_MAP: Record<string, string> = {
  "Food & Drink": "FoodApplication",
  Education: "EducationalApplication",
  Strategy: "GameApplication",
  Productivity: "ProductivityApplication",
  Utilities: "UtilitiesApplication",
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: app.rating.toString(),
      // ratingCount: "5", // uncomment and update with real review count
    },
    author: {
      "@type": "Organization",
      name: "Paul Kreations",
      url: "https://paulkreations.com",
    },
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
