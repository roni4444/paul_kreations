// app/privacy/page.tsx
// Privacy Policy for the paulkreations.com website (including the blog).
// App-specific policies live elsewhere: /wimm/privacy for Where Is My Money?
// and /apps/[slug]/privacy for the other apps. If the site starts using a new
// service or collecting new data, update this page and its date in the same
// change.

import type { Metadata } from "next";
import Link from "next/link";
import { BASE_URL } from "@/lib/config";
import {
  SITE_CONTACT_EMAIL,
  SITE_GRIEVANCE_OFFICER,
  SITE_LEGAL_LAST_UPDATED,
  SITE_RESPONSE_TARGET,
} from "@/lib/data/site-legal";
import {
  LegalSection,
  SiteLegalShell,
  SiteLegalTable,
} from "@/components/legal/site-legal-shell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How the Paul Kreations website and blog handle personal data: what we collect, why, who processes it, how long we keep it and your choices.",
  alternates: { canonical: `${BASE_URL}/privacy` },
  openGraph: {
    title: "Privacy Policy — Paul Kreations",
    url: `${BASE_URL}/privacy`,
    type: "website",
    siteName: "Paul Kreations",
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <SiteLegalShell
      title="Privacy Policy"
      lastUpdated={SITE_LEGAL_LAST_UPDATED}
    >
      <LegalSection n="01" title="Who we are and what this covers" id="scope">
        <p>
          Paul Kreations is a solo app and web studio run by Debapriyo Paul in
          Kolkata, India. This policy explains how the website at{" "}
          <a href={BASE_URL}>paulkreations.com</a> — including the{" "}
          <Link href="/blog">blog</Link>, the contact form and blog comments —
          handles personal data.
        </p>
        <p>
          Our apps have their own privacy policies:{" "}
          <Link href="/wimm/privacy">Where Is My Money?</Link> and the other
          apps listed on this site. Those policies, not this one, govern the
          apps and the <Link href="/wimm">/wimm</Link> pages.
        </p>
        <p>
          For the data described here, Paul Kreations is the &quot;Data
          Fiduciary&quot; under India&apos;s Digital Personal Data Protection
          Act, 2023 (DPDP Act) and the &quot;controller&quot; under comparable
          laws.
        </p>
      </LegalSection>

      <LegalSection n="02" title="What we collect" id="what-we-collect">
        <p>
          <strong>You do not need an account to read this website.</strong> We
          collect only what is below.
        </p>
        <ul>
          <li>
            <strong>Contact form.</strong> The details you type in (such as your
            name, email address and message) so we can reply.
          </li>
          <li>
            <strong>Blog comments.</strong> A name of your choice, your comment
            text and, only if you choose to give it, an email address. The email
            is optional, is never shown on the site and is used only so we can
            reply to you about your comment. Once a comment is approved, the
            name and text are public on the post.
          </li>
          <li>
            <strong>Likes, dislikes and views.</strong> Each post keeps running
            totals. To count one view or one reaction per visitor, your browser
            stores a small cookie (see the{" "}
            <Link href="/cookies">Cookie Policy</Link>). The totals are not
            linked to your identity. Likes and dislikes on individual comments
            work the same way.
          </li>
          <li>
            <strong>Currency display.</strong> Some guides show amounts in your
            local currency. We work out your country from your request (the
            hosting provider supplies it) to pick a default currency; we do not
            store it. If you pick a currency yourself, your browser remembers
            that choice on your device only.
          </li>
          <li>
            <strong>Technical data.</strong> When you load a page, our hosting
            and security providers receive standard request data such as your IP
            address, browser, device type and the page you asked for. Vercel Web
            Analytics and Speed Insights turn this into aggregated statistics
            without using cookies.
          </li>
          <li>
            <strong>Error monitoring.</strong> Sentry receives diagnostic
            information when something breaks, and records a sample of visits
            (and every visit where an error occurs) so we can see what led to
            the error. Text and form inputs are masked by default.
          </li>
          <li>
            <strong>Bot checks.</strong> Cloudflare Turnstile runs on the
            contact form and the blog comment form to tell people from programs.
          </li>
          <li>
            <strong>Advertising data.</strong> Our blog pages show, or may show,
            ads served by Google AdSense. Google and its advertising partners
            may use cookies and similar identifiers, and receive technical data
            such as your IP address, browser and approximate location, to show
            and measure ads. See section 05.
          </li>
        </ul>
        <p>
          Staff who sign in to our admin area also provide an email address for
          the sign-in link. This does not apply to visitors.
        </p>
      </LegalSection>

      <LegalSection n="03" title="Why we use it" id="why-we-use-it">
        <ul>
          <li>To reply to your messages and requests.</li>
          <li>To show, review and moderate comments, and to stop spam.</li>
          <li>To run, secure and improve the website, and fix errors.</li>
          <li>
            To understand, in aggregate, which pages are read and how fast they
            load.
          </li>
          <li>
            To show advertising on the blog, which helps pay for the site.
          </li>
          <li>To meet legal obligations and protect our rights.</li>
        </ul>
        <p>
          <strong>We do not sell your personal data.</strong> We do not use your
          messages or comments for advertising.
        </p>
      </LegalSection>

      <LegalSection n="04" title="Who processes data for us" id="processors">
        <p>
          We use the providers below to run the website. They process data on
          our behalf, or — in Google&apos;s case for ads — under their own
          policies.
        </p>
        <SiteLegalTable
          caption="Service providers used by the website"
          columns={["Provider", "What it does", "Data involved"]}
          rows={[
            [
              "Vercel",
              "Hosting, Web Analytics, Speed Insights",
              "Request data (IP address, browser, page); aggregated, cookie-free page statistics",
            ],
            [
              "Supabase",
              "Database for blog posts, comments, counters and staff accounts",
              "Comment name, text and optional email; reaction and view totals; staff email addresses",
            ],
            [
              "Cloudflare",
              "DNS, security, Turnstile bot checks",
              "Technical request data and challenge signals",
            ],
            [
              "Resend",
              "Sends email from the contact form and staff sign-in",
              "Your name, email address and message",
            ],
            [
              "Sentry",
              "Error and performance monitoring, sampled session replays",
              "Technical diagnostics, page address, masked interaction traces",
            ],
            [
              "Google AdSense",
              "Ads on blog pages",
              "Ad cookies and identifiers, browser, device and approximate location (see section 05)",
            ],
          ]}
        />
        <p>
          Some providers handle data outside India. Where they do, we rely on
          their published data-protection terms.
        </p>
      </LegalSection>

      <LegalSection n="05" title="Advertising" id="advertising">
        <p>
          Ads appear only on blog posts, never inside the Where Is My Money? app
          pages, our forms or the admin area. They are provided by Google
          AdSense. Google uses cookies and similar technology to serve ads based
          on your visits to this and other websites, and to measure them.
        </p>
        <ul>
          <li>
            You can manage personalised advertising at{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Ads Settings
            </a>
            , or opt out through{" "}
            <a
              href="https://www.aboutads.info"
              target="_blank"
              rel="noopener noreferrer"
            >
              aboutads.info
            </a>{" "}
            (or{" "}
            <a
              href="https://www.youronlinechoices.eu"
              target="_blank"
              rel="noopener noreferrer"
            >
              youronlinechoices.eu
            </a>{" "}
            in Europe).
          </li>
          <li>
            If you are in the European Economic Area, the United Kingdom or
            Switzerland, a consent message from Google lets you accept or refuse
            ad cookies before ads load, and you can change your choice later
            through the same message.
          </li>
          <li>
            Read how Google uses data from sites like ours at{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
            >
              policies.google.com/technologies/partner-sites
            </a>
            .
          </li>
        </ul>
        <p>
          We do not choose who sees which ad and we do not endorse advertised
          products. See our <Link href="/disclaimer">Disclaimer</Link>.
        </p>
      </LegalSection>

      <LegalSection n="06" title="Cookies" id="cookies">
        <p>
          The cookies and browser storage this website uses are listed, with
          purpose and lifetime, in our{" "}
          <Link href="/cookies">Cookie Policy</Link>.
        </p>
      </LegalSection>

      <LegalSection n="07" title="How long we keep it" id="retention">
        <ul>
          <li>
            <strong>Contact messages:</strong> as long as needed to deal with
            your request and for a reasonable period afterwards, then deleted.
          </li>
          <li>
            <strong>Comments:</strong> approved comments stay on the post until
            we remove them or you ask us to; an email address you gave stays
            private and is deleted with the comment. Comments we do not approve
            may be deleted at any time.
          </li>
          <li>
            <strong>Reaction and view totals:</strong> kept with the post; they
            are not personal data.
          </li>
          <li>
            <strong>Analytics, monitoring and ad data:</strong> kept by the
            providers under their own retention periods.
          </li>
        </ul>
      </LegalSection>

      <LegalSection n="08" title="Your choices and rights" id="your-rights">
        <p>
          You can ask us to tell you what personal data we hold about you,
          correct it, delete it, or withdraw consent you gave. To have a comment
          removed, email us with a link to the post and the name you used. If
          you are in the EEA or UK you also have the rights set out in the GDPR,
          including to complain to your data-protection authority.
        </p>
        <p>
          Write to{" "}
          <a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a>. We
          aim to reply within {SITE_RESPONSE_TARGET}.
        </p>
      </LegalSection>

      <LegalSection n="09" title="Grievance Officer (India)" id="grievance">
        <ul>
          <li>Name: {SITE_GRIEVANCE_OFFICER.name}</li>
          <li>
            Email:{" "}
            <a href={`mailto:${SITE_GRIEVANCE_OFFICER.email}`}>
              {SITE_GRIEVANCE_OFFICER.email}
            </a>
          </li>
          <li>Address: {SITE_GRIEVANCE_OFFICER.address}</li>
        </ul>
      </LegalSection>

      <LegalSection n="10" title="Children" id="children">
        <p>
          This website is not directed at children under 18 and we do not
          knowingly collect their personal data. If you believe a child has sent
          us personal data, contact us and we will delete it.
        </p>
      </LegalSection>

      <LegalSection n="11" title="Security" id="security">
        <p>
          Data is transmitted over HTTPS, stored with reputable providers, and
          access to the admin area is limited to signed-in staff. No online
          service can promise absolute security.
        </p>
      </LegalSection>

      <LegalSection n="12" title="Changes to this policy" id="changes">
        <p>
          When we change this policy we update the date at the top. If a change
          is significant — for example a new kind of data or a new provider — we
          will say so on this page.
        </p>
      </LegalSection>

      <LegalSection n="13" title="Contact" id="contact">
        <p>
          Questions about this policy:{" "}
          <a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a>.
        </p>
      </LegalSection>
    </SiteLegalShell>
  );
}
