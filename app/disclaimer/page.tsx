// app/disclaimer/page.tsx
// Site-wide disclaimer. Mainly protects and informs readers of the blog,
// whose posts are about personal finance. Linked from the footer and from
// the Terms of Service.

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
} from "@/components/legal/site-legal-shell";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Paul Kreations blog and website content is for general education only — not financial, tax, investment or legal advice.",
  alternates: { canonical: `${BASE_URL}/disclaimer` },
  openGraph: {
    title: "Disclaimer — Paul Kreations",
    url: `${BASE_URL}/disclaimer`,
    type: "website",
    siteName: "Paul Kreations",
  },
  robots: { index: true, follow: true },
};

export default function DisclaimerPage() {
  return (
    <SiteLegalShell title="Disclaimer" lastUpdated={SITE_LEGAL_LAST_UPDATED}>
      <LegalSection n="01" title="Educational content only" id="education">
        <p>
          The articles on our blog and the other content on paulkreations.com
          are for general information and education. They are{" "}
          <strong>
            not financial, tax, investment, accounting or legal advice
          </strong>
          , and nothing here is a recommendation to buy, sell or hold any
          product. Our authors are software developers and writers, not licensed
          financial advisers or investment advisers.
        </p>
        <p>
          Your circumstances are different from anyone else&apos;s. Please
          consider them carefully and speak to a qualified professional before
          making financial decisions.
        </p>
      </LegalSection>

      <LegalSection n="02" title="Examples and numbers" id="examples">
        <p>
          Worked examples, such as a sample salary or budget, are illustrative.
          They are not averages, benchmarks, forecasts or promises of any
          result. Rules, rates and thresholds change; each post shows when it
          was last verified. We try to keep content accurate and correct
          mistakes openly, but we cannot guarantee that every post is complete
          or current.
        </p>
      </LegalSection>

      <LegalSection n="03" title="Our own products" id="own-products">
        <p>
          Some posts mention Where Is My Money? (WIMM), an app we make. We have
          an interest in it, and we say so when it appears. It is an example of
          a tool, not the only or necessarily the best one for you.
        </p>
      </LegalSection>

      <LegalSection n="04" title="Advertisements" id="ads">
        <p>
          Blog posts show, or may show, ads from third parties through Google
          AdSense. We do not choose which ads you see, and an ad is not an
          endorsement or recommendation by us. Please do your own checks before
          buying or signing up for anything you see advertised. How ads use data
          is explained in our <Link href="/privacy">Privacy Policy</Link> and{" "}
          <Link href="/cookies">Cookie Policy</Link>.
        </p>
      </LegalSection>

      <LegalSection n="05" title="Comments and external links" id="external">
        <p>
          Comments express the views of the people who write them, not ours. We
          review comments before they appear but cannot verify what they say.
          Links to other websites are provided for convenience; we do not
          control those sites and are not responsible for their content or
          practices.
        </p>
      </LegalSection>

      <LegalSection n="06" title="Limitation of liability" id="liability">
        <p>
          To the fullest extent permitted by law, Paul Kreations is not liable
          for any loss or damage arising from your reliance on the content of
          this website. See also our <Link href="/tos">Terms of Service</Link>.
        </p>
      </LegalSection>

      <LegalSection n="07" title="Report an error" id="contact">
        <p>
          Spotted a mistake? Email{" "}
          <a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a> with
          the link to the page and we will review it.
        </p>
      </LegalSection>
    </SiteLegalShell>
  );
}
