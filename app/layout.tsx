import type {Metadata, Viewport} from "next";
import {Geist, Geist_Mono, Inter} from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Paul Kreations — Building Thoughtful Digital Products",
    template: "%s | Paul Kreations",
  },
  description:
    "Paul Kreations builds Android apps, web experiences, and games with precision, purpose, and genuine craft. Available on Google Play Store.",
  keywords: [
    "Paul Kreations",
    "Android apps",
    "mobile development",
    "web development",
    "Google Play Store",
    "app development",
  ],
  authors: [{ name: "Paul Kreations" }],
  creator: "Paul Kreations",
  openGraph: {
    type: "website",
    siteName: "Paul Kreations",
    title: "Paul Kreations — Building Thoughtful Digital Products",
    description:
      "Android apps, web experiences, and games — built with precision, purpose, and genuine craft.",
    // Add your OG image path when available:
    // images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paul Kreations",
    description:
      "Building thoughtful digital products for Android and the web.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#3c52c0",
};

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
        inter.variable,
        "font-sans",
      )}
    >
      <body className="min-h-full flex flex-col bg-[#f9f9fb] text-[#1a1c1d]">
        {children}
      </body>
    </html>
  );
}
