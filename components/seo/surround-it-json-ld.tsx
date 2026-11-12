// components/seo/surround-it-json-ld.tsx
// JSON-LD for /surround-it — a SoftwareApplication entity with its own FAQ and
// breadcrumb. The FAQPage schema is generated FROM surroundItFaqs
// (lib/data/surround-it.ts), so the accordion and structured data cannot drift.
// aggregateRating is intentionally omitted — do not add it unless it is
// backed by real, verifiable reviews.

import {
  SURROUND_IT_META_DESCRIPTION,
  surroundItFaqs,
} from "@/lib/data/surround-it";
import { BASE_URL } from "@/lib/config";

export function SurroundItSoftwareApplicationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Surround It",
    applicationCategory: "GameApplication",
    description: SURROUND_IT_META_DESCRIPTION,
    operatingSystem: "Android",
    url: `${BASE_URL}/surround-it`,
    image: `${BASE_URL}/apps/surround-it/icon.png`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/surround-it`,
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

export function SurroundItFaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: surroundItFaqs.map((faq) => ({
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

export function SurroundItBreadcrumbJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Surround It",
        item: `${BASE_URL}/surround-it`,
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
