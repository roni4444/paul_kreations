// app/about/page.tsx
// Who is behind the site and the blog, what the guides are for, and how to
// reach us. Linked from the footer and the blog. Keep every statement true —
// this page is read by people and by ad/search-quality reviewers.

import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BASE_URL } from "@/lib/config";
import { SITE_CONTACT_EMAIL } from "@/lib/data/site-legal";
import { WIMM_PLAY_STORE_URL } from "@/lib/data/links";

export const metadata: Metadata = {
  title: "About Paul Kreations",
  description:
    "Paul Kreations is a solo app studio in Kolkata, India, run by Debapriyo Paul. Learn who writes the blog, what it covers and how to contact us.",
  alternates: { canonical: `${BASE_URL}/about` },
  openGraph: {
    title: "About Paul Kreations",
    url: `${BASE_URL}/about`,
    type: "website",
    siteName: "Paul Kreations",
  },
  robots: { index: true, follow: true },
};

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";
const H2 = "mt-10 mb-3 text-xl font-semibold text-[#111c2d]";
const P = "my-3 text-base leading-7 text-[#2b3445]";
const LINK = "text-[#c41e3a] underline underline-offset-2 hover:text-[#9e0027]";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-[720px] flex-1 px-6 pt-32 pb-24">
        <p className={`${MONO} text-[11px] text-[#c41e3a] uppercase`}>About</p>
        <h1 className="mt-2 text-3xl leading-tight font-semibold text-[#111c2d] sm:text-4xl">
          Paul Kreations
        </h1>

        <p className={P}>
          Paul Kreations is a small, independent app studio based in Kolkata,
          India. We build and publish Android apps on Google Play, and this
          website is where we share what we are building and what we have
          learned.
        </p>

        <h2 className={H2}>Who writes this blog</h2>
        <p className={P}>
          The studio is run by <strong>Debapriyo Paul</strong>, a Flutter
          developer who founded Paul Kreations in 2023 and holds a B.Tech in
          Computer Science and Engineering. He builds, tests and supports the
          apps himself, and he is the editor and publisher of the guides on this
          blog. Each post shows its author and, when someone else edited it, who
          reviewed it.
        </p>

        <h2 className={H2}>How the guides are made</h2>
        <p className={P}>
          We use AI tools to help draft our guides. Every guide is then
          reviewed, edited and approved by Debapriyo Paul before it is
          published. AI can still get things wrong, which is why a person checks
          each guide, and why we ask you to tell us if you find a mistake (see
          below).
        </p>

        <h2 className={H2}>What the blog covers</h2>
        <p className={P}>
          The main subject is everyday personal finance for people in India —
          tracking spending, budgeting, saving habits and understanding where
          your money goes — written in plain language with worked examples. We
          also publish app updates and notes on how our products are made.
        </p>

        <h2 className={H2}>Our own app, and a note on bias</h2>
        <p className={P}>
          We make{" "}
          <Link href="/wimm" className={LINK}>
            Where Is My Money? (WIMM)
          </Link>
          , a free personal finance app for Android that keeps your data in an
          encrypted database on your own device. Some guides show how to follow
          the steps in WIMM and link to it on{" "}
          <a
            href={WIMM_PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK}
          >
            Google Play
          </a>
          . Because it is our own product, take those mentions as what they are:
          a suggestion from the people who made it. Every method in a guide also
          works with a notebook or a spreadsheet.
        </p>

        <h2 className={H2}>Not financial advice</h2>
        <p className={P}>
          Our guides are for general education. They are not personal financial,
          tax, investment or legal advice, and we are not licensed advisers.
          Please read our{" "}
          <Link href="/disclaimer" className={LINK}>
            Disclaimer
          </Link>{" "}
          and speak to a qualified professional before making major decisions.
        </p>

        <h2 className={H2}>Corrections and contact</h2>
        <p className={P}>
          If you spot a mistake, an outdated figure or something unclear, email{" "}
          <a href={`mailto:${SITE_CONTACT_EMAIL}`} className={LINK}>
            {SITE_CONTACT_EMAIL}
          </a>{" "}
          with a link to the post. We correct errors and update the post&apos;s
          &ldquo;Updated&rdquo; date when we do. You can also read our{" "}
          <Link href="/privacy" className={LINK}>
            Privacy Policy
          </Link>{" "}
          to see how the site handles your data.
        </p>
      </main>
      <Footer />
    </>
  );
}
