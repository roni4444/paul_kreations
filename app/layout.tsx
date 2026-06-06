import type {Metadata, Viewport} from "next";
import {Geist, Geist_Mono, Inter, JetBrains_Mono} from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import {OrganizationJsonLd} from "@/components/seo/json-ld";
import {Analytics} from "@vercel/analytics/next";
import {SpeedInsights} from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// ─── Base URL ─────────────────────────────────────────────────────────────────
// Required for Next.js to resolve relative OG image paths to absolute URLs.
// Without this, social platforms receive a relative path and show no preview.
const BASE_URL = "https://paul-kreations.vercel.app"; // ← update to your domain

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // metadataBase makes all relative image paths absolute (required for OG images)
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Paul Kreations — Android Apps, Web & Games",
    template: "%s | Paul Kreations",
  },
  description:
    "Paul Kreations builds thoughtful Android apps, web experiences, and games. Browse Henstel, Natural Farming, and Surround It — available on Google Play Store.",
  keywords: [
    "Paul Kreations",
    "Android apps",
    "Henstel app",
    "Natural Farming app",
    "Surround It game",
    "Flutter developer",
    "mobile development India",
    "Google Play Store",
    "Debapriyo Paul",
  ],
  authors: [{ name: "Debapriyo Paul", url: BASE_URL }],
  creator: "Paul Kreations",

  // ── Open Graph ──────────────────────────────────────────────────────────────
  // Controls how your link appears when shared on WhatsApp, Twitter, LinkedIn etc.
  // Create a 1200×630 px image at public/og-image.png to enable rich previews.
  openGraph: {
    type: "website",
    siteName: "Paul Kreations",
    title: "Paul Kreations — Android Apps, Web & Games",
    description:
      "Thoughtful Android apps and games built with precision. Henstel, Natural Farming, and Surround It — on Google Play Store.",
    url: BASE_URL,
    images: [
      {
        url: "/og-image.png", // create this file at public/og-image.png (1200×630 px)
        width: 1200,
        height: 630,
        alt: "Paul Kreations — Android Apps, Web & Games",
      },
    ],
  },

  // ── Twitter / X card ────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Paul Kreations — Android Apps, Web & Games",
    description:
      "Thoughtful Android apps and games. Available on Google Play Store.",
    images: ["/og-image.png"],
    // creator: "@yourhandle", // add your Twitter/X handle if you have one
  },

  // ── Icons ───────────────────────────────────────────────────────────────────
  // Add these files to your /public folder.
  // favicon.ico   — 32×32 or 48×48 px  (classic favicon)
  // icon.png      — 192×192 px          (modern browsers)
  // apple-icon.png — 180×180 px         (iOS home screen)
  // icons: {
  //   icon: [
  //     { url: "/favicon.ico", sizes: "any" },
  //     { url: "/icon.png", type: "image/png", sizes: "192x192" },
  //   ],
  //   apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  // },

  // ── Canonical & robots ──────────────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
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

  // ── Google Search Console verification ──────────────────────────────────────
  // After adding your site in Search Console, paste the verification string here.
  // verification: {
  //   google: "paste-your-verification-string-here",
  // },
};

export const viewport: Viewport = {
  themeColor: "#c41e3a",
  width: "device-width",
  initialScale: 1,
};

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased scroll-smooth",
        geistSans.variable,
        geistMono.variable,
        jetbrainsMono.variable,
        inter.variable,
        "font-sans",
      )}
    >
      <head>
        {/* Organisation JSON-LD — on every page */}
        <OrganizationJsonLd />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#f9f9ff] text-[#111c2d]"
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
