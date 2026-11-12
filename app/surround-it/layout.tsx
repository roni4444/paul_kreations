import type { Metadata, Viewport } from "next";
import { BASE_URL } from "@/lib/config";
import {
  SURROUND_IT_LONGTAIL_KEYWORDS,
  SURROUND_IT_META_DESCRIPTION,
  SURROUND_IT_META_TITLE,
  SURROUND_IT_PRIMARY_KEYWORDS,
} from "@/lib/data/surround-it";

// Fonts are loaded with a stylesheet link scoped to this route (not
// next/font/google): Turbopack in Next 16.2.x fails to parse the newer
// "font?kit=...&skey=..." URLs Google now serves for some families.
const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Manrope:wght@400;500;600;700&display=swap";
const FONT_VARS = {
  "--font-surround-it-heading": "'Cinzel', Georgia, serif",
  "--font-surround-it-body":
    "'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif",
} as React.CSSProperties;

export const metadata: Metadata = {
  title: {
    default: SURROUND_IT_META_TITLE,
    template: "%s | Surround It",
  },
  description: SURROUND_IT_META_DESCRIPTION,
  keywords: [...SURROUND_IT_PRIMARY_KEYWORDS, ...SURROUND_IT_LONGTAIL_KEYWORDS],
  alternates: { canonical: "./" },
  openGraph: {
    title: SURROUND_IT_META_TITLE,
    description: SURROUND_IT_META_DESCRIPTION,
    url: `${BASE_URL}/surround-it`,
    siteName: "Paul Kreations",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/apps/surround-it/feature.png`,
        width: 1024,
        height: 500,
        alt: "Surround It",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SURROUND_IT_META_TITLE,
    description: SURROUND_IT_META_DESCRIPTION,
    images: [`${BASE_URL}/apps/surround-it/feature.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#081612",
  width: "device-width",
  initialScale: 1,
};

export default function SurroundItLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={FONT_VARS}
      className="font-[family-name:var(--font-surround-it-body)] bg-[#081612]"
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href={FONT_HREF} precedence="default" />
      {children}
    </div>
  );
}
