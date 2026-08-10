import type { Metadata, Viewport } from "next";
import { Open_Sans, Poppins } from "next/font/google";
import { BASE_URL } from "@/lib/config";
import { WIMM_LONGTAIL_KEYWORDS, WIMM_PRIMARY_KEYWORDS } from "@/lib/data/wimm";

// ─── Brand-scoped typography ───────────────────────────────────────────────
// "Where Is My Money?" intentionally uses its own typeface pair — Poppins
// (bold, modern headers) + Open Sans (clean, readable body) — instead of
// the parent site's Geist/Inter, per an explicit brand decision to give
// this product its own visual identity distinct from the Kinetic Precision
// system used elsewhere on paulkreations.com. Loaded here (not in the root
// layout) so the override stays scoped to /wimm and never leaks to the
// rest of the site.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-wimm-heading",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-wimm-body",
});

// ─── /wimm metadata ─────────────────────────────────────────────────────────
// Deliberately its own title/description (not inherited from root layout.tsx)
// so this page can rank for "where is my money" / "personal finance app
// India" independently of the parent site's "Paul Kreations" targeting.

export const metadata: Metadata = {
  title: "Where Is My Money? — Personal Finance App for India",
  description:
    "Track banking, credit cards, investments (with XIRR), debt, income tax, travel, vehicles, and family budgets in one dashboard. Where Is My Money? is the complete personal finance app built for India.",
  keywords: [...WIMM_PRIMARY_KEYWORDS, ...WIMM_LONGTAIL_KEYWORDS],
  alternates: {
    canonical: `${BASE_URL}/wimm`,
  },
  openGraph: {
    type: "website",
    siteName: "Where Is My Money?",
    title: "Where Is My Money? — Personal Finance App for India",
    description:
      "Know exactly where every rupee goes — and where it's headed. One dashboard for banking, cards, investments, debt, tax, travel, vehicles, and family budgets.",
    url: `${BASE_URL}/wimm`,
    images: [
      {
        // TODO: create a dedicated 1200×630 OG image at public/wimm/og-image.png
        // — the app icon alone is too small/square for a good social card.
        url: "/wimm/icon.png",
        width: 1024,
        height: 1024,
        alt: "Where Is My Money? — Personal Finance App for India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Where Is My Money? — Personal Finance App for India",
    description:
      "One dashboard for banking, cards, investments, debt, tax, travel, vehicles, and family budgets — built for India.",
    images: ["/wimm/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Tints the mobile browser chrome green while visitors are on /wimm,
// overriding the crimson theme-color set in the root layout.
export const viewport: Viewport = {
  themeColor: "#0F7A4E",
  width: "device-width",
  initialScale: 1,
};

export default function WimmLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`${poppins.variable} ${openSans.variable} font-[family-name:var(--font-wimm-body)] bg-[#F6FAF8]`}
    >
      {children}
    </div>
  );
}
