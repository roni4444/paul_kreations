import type { Metadata, Viewport } from "next";
import { BASE_URL } from "@/lib/config";
import {
  HENSTEL_LONGTAIL_KEYWORDS,
  HENSTEL_META_DESCRIPTION,
  HENSTEL_META_TITLE,
  HENSTEL_PRIMARY_KEYWORDS,
} from "@/lib/data/henstel";

// Fonts are loaded with a stylesheet link scoped to this route (not
// next/font/google): Turbopack in Next 16.2.x fails to parse the newer
// "font?kit=...&skey=..." URLs Google now serves for some families.
const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700;800&family=Nunito:wght@400;500;600;700&display=swap";
const FONT_VARS = {
  "--font-henstel-heading": "'Fraunces', Georgia, serif",
  "--font-henstel-body":
    "'Nunito', system-ui, -apple-system, 'Segoe UI', sans-serif",
} as React.CSSProperties;

export const metadata: Metadata = {
  title: {
    default: HENSTEL_META_TITLE,
    template: "%s | Henstel",
  },
  description: HENSTEL_META_DESCRIPTION,
  keywords: [...HENSTEL_PRIMARY_KEYWORDS, ...HENSTEL_LONGTAIL_KEYWORDS],
  alternates: { canonical: "./" },
  openGraph: {
    title: HENSTEL_META_TITLE,
    description: HENSTEL_META_DESCRIPTION,
    url: `${BASE_URL}/henstel`,
    siteName: "Paul Kreations",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/apps/henstel/feature.png`,
        width: 1024,
        height: 500,
        alt: "Henstel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HENSTEL_META_TITLE,
    description: HENSTEL_META_DESCRIPTION,
    images: [`${BASE_URL}/apps/henstel/feature.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#2E6B3F",
  width: "device-width",
  initialScale: 1,
};

export default function HenstelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={FONT_VARS}
      className="font-[family-name:var(--font-henstel-body)] bg-[#FBF6EC]"
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href={FONT_HREF} precedence="default" />
      {children}
    </div>
  );
}
