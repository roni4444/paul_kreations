// components/seo/natural-farming-json-ld.tsx
// JSON-LD for /natural-farming — a SoftwareApplication entity with its own FAQ and
// breadcrumb. The FAQPage schema is generated FROM naturalFarmingFaqs
// (lib/data/natural-farming.ts), so the accordion and structured data cannot drift.
// aggregateRating is intentionally omitted — do not add it unless it is
// backed by real, verifiable reviews.

import {
  NATURAL_FARMING_META_DESCRIPTION,
  naturalFarmingFaqs,
} from "@/lib/data/natural-farming";
import { BASE_URL } from "@/lib/config";

export function NaturalFarmingSoftwareApplicationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Natural Farming",
    applicationCategory: "EducationalApplication",
    description: NATURAL_FARMING_META_DESCRIPTION,
    operatingSystem: "Android",
    url: `${BASE_URL}/natural-farming`,
    image: `${BASE_URL}/apps/natural-farming/icon.png`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/natural-farming`,
    },
    author: {
      "@type": "Organization",
      name: "Paul Kreations",
      url: BASE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function NaturalFarmingFaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: naturalFarmingFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function NaturalFarmingBreadcrumbJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Natural Farming",
        item: `${BASE_URL}/natural-farming`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
