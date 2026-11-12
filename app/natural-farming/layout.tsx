import type { Metadata, Viewport } from "next";
import { BASE_URL } from "@/lib/config";
import {
  NATURAL_FARMING_LONGTAIL_KEYWORDS,
  NATURAL_FARMING_META_DESCRIPTION,
  NATURAL_FARMING_META_TITLE,
  NATURAL_FARMING_PRIMARY_KEYWORDS,
} from "@/lib/data/natural-farming";

// Fonts are loaded with a stylesheet link scoped to this route (not
// next/font/google): Turbopack in Next 16.2.x fails to parse the newer
// "font?kit=...&skey=..." URLs Google now serves for some families.
const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Lora:wght@500;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap";
const FONT_VARS = {
  "--font-natural-farming-heading": "'Lora', Georgia, serif",
  "--font-natural-farming-body":
    "'Source Sans 3', system-ui, -apple-system, 'Segoe UI', sans-serif",
} as React.CSSProperties;

export const metadata: Metadata = {
  title: {
    default: NATURAL_FARMING_META_TITLE,
    template: "%s | Natural Farming",
  },
  description: NATURAL_FARMING_META_DESCRIPTION,
  keywords: [
    ...NATURAL_FARMING_PRIMARY_KEYWORDS,
    ...NATURAL_FARMING_LONGTAIL_KEYWORDS,
  ],
  alternates: { canonical: "./" },
  openGraph: {
    title: NATURAL_FARMING_META_TITLE,
    description: NATURAL_FARMING_META_DESCRIPTION,
    url: `${BASE_URL}/natural-farming`,
    siteName: "Paul Kreations",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/apps/natural-farming/feature.png`,
        width: 1024,
        height: 500,
        alt: "Natural Farming",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: NATURAL_FARMING_META_TITLE,
    description: NATURAL_FARMING_META_DESCRIPTION,
    images: [`${BASE_URL}/apps/natural-farming/feature.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#2E7D32",
  width: "device-width",
  initialScale: 1,
};

export default function NaturalFarmingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={FONT_VARS}
      className="font-[family-name:var(--font-natural-farming-body)] bg-[#F9FBF9]"
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href={FONT_HREF} precedence="default" />
      {children}
    </div>
  );
}
