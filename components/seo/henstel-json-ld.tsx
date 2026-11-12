// components/seo/henstel-json-ld.tsx
// JSON-LD for /henstel — a SoftwareApplication entity with its own FAQ and
// breadcrumb. The FAQPage schema is generated FROM henstelFaqs
// (lib/data/henstel.ts), so the accordion and structured data cannot drift.
// aggregateRating is intentionally omitted — do not add it unless it is
// backed by real, verifiable reviews.

import { henstelFaqs, HENSTEL_META_DESCRIPTION } from "@/lib/data/henstel";
import { BASE_URL } from "@/lib/config";

export function HenstelSoftwareApplicationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Henstel",
    applicationCategory: "LifestyleApplication",
    description: HENSTEL_META_DESCRIPTION,
    operatingSystem: "Android",
    url: `${BASE_URL}/henstel`,
    image: `${BASE_URL}/apps/henstel/icon.png`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/henstel`,
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

export function HenstelFaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: henstelFaqs.map((faq) => ({
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

export function HenstelBreadcrumbJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Henstel",
        item: `${BASE_URL}/henstel`,
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
