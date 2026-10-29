// app/cookies/page.tsx
// Cookie Policy for the paulkreations.com website (including the blog).
// The /wimm pages have their own cookie policy at /wimm/cookies. Written from
// what the code actually sets — if cookies, scripts or analytics change,
// update the tables below in the same change.

import type { Metadata } from "next";
import Link from "next/link";
import { BASE_URL } from "@/lib/config";
import {
  SITE_CONTACT_EMAIL,
  SITE_LEGAL_LAST_UPDATED,
} from "@/lib/data/site-legal";
import {
  LegalSection,
  SiteLegalShell,
  SiteLegalTable,
} from "@/components/legal/site-legal-shell";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "The cookies and browser storage used by the Paul Kreations website and blog, why, for how long, and how to control them.",
  alternates: { canonical: `${BASE_URL}/cookies` },
  openGraph: {
    title: "Cookie Policy — Paul Kreations",
    url: `${BASE_URL}/cookies`,
    type: "website",
    siteName: "Paul Kreations",
  },
  robots: { index: true, follow: true },
};

export default function CookiePolicyPage() {
  return (
    <SiteLegalShell title="Cookie Policy" lastUpdated={SITE_LEGAL_LAST_UPDATED}>
      <LegalSection n="01" title="In short" id="summary">
        <p>
          Reading this website does not require an account. We set a couple of
          small first-party cookies on blog posts so your like or dislike is
          remembered and a post counts your visit once a day. Blog posts also
          show, or may show, ads from Google AdSense, which uses its own
          cookies. We use no other advertising or marketing cookies.
        </p>
        <p>
          This page covers paulkreations.com, including the blog. The{" "}
          <Link href="/wimm">Where Is My Money?</Link> pages have their own{" "}
          <Link href="/wimm/cookies">Cookie Policy</Link>. How we handle
          personal data is in our <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </LegalSection>

      <LegalSection n="02" title="Cookies we set" id="our-cookies">
        <SiteLegalTable
          caption="First-party cookies set by the website"
          columns={["Name", "Purpose", "Lifetime", "Type"]}
          rows={[
            [
              <code key="n">br_&lt;post id&gt;</code>,
              "Remembers whether you liked or disliked a blog post, so you can change or remove it and cannot react twice.",
              "1 year",
              "Functional",
            ],
            [
              <code key="n">bcr</code>,
              "Remembers which blog comments you liked or disliked, so you can change or remove a reaction and cannot react twice.",
              "1 year",
              "Functional",
            ],
            [
              <code key="n">bv_&lt;post id&gt;</code>,
              "Remembers that your visit to a blog post has been counted, so it counts once per day.",
              "24 hours",
              "Functional / statistics",
            ],
            [
              <code key="n">sb-…-auth-token</code>,
              "Keeps our staff signed in to the admin area. Set only after a staff member signs in — never for visitors.",
              "Until sign-out or expiry",
              "Essential",
            ],
          ]}
        />
        <p>
          These cookies are first-party, are not shared with anyone, and contain
          no name or email address.
        </p>
      </LegalSection>

      <LegalSection
        n="03"
        title="Browser storage and other services"
        id="other"
      >
        <SiteLegalTable
          caption="Other storage and services used by the website"
          columns={["Item", "Provider", "Purpose"]}
          rows={[
            [
              <code key="n">sentryReplaySession</code>,
              "Sentry",
              "Session storage item (not a cookie), cleared when you close the tab. Lets us see what led to an error, for a sample of visits and whenever an error occurs.",
            ],
            [
              <code key="n">pk_currency</code>,
              "This website",
              "Local storage item (not a cookie) that remembers the currency you chose for amounts in blog guides. It stays on your device.",
            ],
            [
              "Turnstile",
              "Cloudflare",
              "Checks that the contact form and the blog comment form are used by a person. It may store data it needs to run the check, under Cloudflare's own policies.",
            ],
            [
              "Web Analytics, Speed Insights",
              "Vercel",
              "Aggregated page-view and page-speed statistics. These do not use cookies.",
            ],
          ]}
        />
        <p>
          Website fonts are served from this site, not from a font provider.
        </p>
      </LegalSection>

      <LegalSection n="04" title="Advertising cookies" id="advertising">
        <p>
          Blog posts show, or may show, ads from Google AdSense. When ads are
          shown, Google and its partners may set or read cookies and similar
          identifiers (for example from the google.com and doubleclick.net
          domains) to show ads, limit how often you see them, measure them, and
          — if you allow it — personalise them. These cookies are controlled by
          Google, and some last up to about a year.
        </p>
        <p>
          Ads are never shown on the Where Is My Money? pages, our forms or the
          admin area, so these cookies are not set there.
        </p>
        <ul>
          <li>
            If you are in the EEA, the UK or Switzerland, a consent message from
            Google asks for your choice before ads load; you can reopen it to
            change your mind.
          </li>
          <li>
            Everywhere, you can manage personalised ads at{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              adssettings.google.com
            </a>{" "}
            or{" "}
            <a
              href="https://www.aboutads.info"
              target="_blank"
              rel="noopener noreferrer"
            >
              aboutads.info
            </a>
            .
          </li>
        </ul>
      </LegalSection>

      <LegalSection n="05" title="Managing cookies" id="managing">
        <p>
          Browsers let you view and delete cookies, block third-party cookies,
          or clear everything when you close the browser. If you block our
          first-party cookies, the site still works; your like or dislike just
          will not be remembered, and a post may count your visit again.
          Blocking Turnstile may stop the contact and comment forms from
          working; you can email us instead.
        </p>
      </LegalSection>

      <LegalSection n="06" title="Changes and contact" id="contact">
        <p>
          If we add or change cookies we update this page and its date.
          Questions:{" "}
          <a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a>.
        </p>
      </LegalSection>
    </SiteLegalShell>
  );
}
