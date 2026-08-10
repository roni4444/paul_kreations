// components/seo/wimm-json-ld.tsx
// JSON-LD for /wimm — separate from components/seo/json-ld.tsx (which
// covers the parent Paul Kreations site) since Where Is My Money? is its
// own SoftwareApplication entity with its own FAQ and breadcrumb.
//
// FAQPage schema is generated FROM wimmFaqs (lib/data/wimm.ts) rather than
// duplicated here, so the on-page accordion and the structured data can
// never drift out of sync.

import { WIMM_IS_LIVE, wimmFaqs } from "@/lib/data/wimm";
import { BASE_URL } from "@/lib/config";

export function WimmSoftwareApplicationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Where Is My Money?",
    applicationCategory: "FinanceApplication",
    description:
      "A complete personal finance operating system for Indians — banking, credit cards, investments with XIRR, debt, income tax, travel splitting, vehicles, and family budgets in one dashboard.",
    operatingSystem: ["Android", "iOS", "Windows", "macOS", "Linux"],
    url: `${BASE_URL}/wimm`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: WIMM_IS_LIVE
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      url: `${BASE_URL}/wimm`,
    },
    author: {
      "@type": "Organization",
      name: "Paul Kreations",
      url: BASE_URL,
    },
    // aggregateRating intentionally omitted — do not add until there are
    // real reviews to report. A fabricated rating is misleading and can
    // violate Google's structured-data guidelines.
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WimmFaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: wimmFaqs.map((faq) => ({
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

export function WimmBreadcrumbJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Where Is My Money?",
        item: `${BASE_URL}/wimm`,
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
