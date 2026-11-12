import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/henstel/legal-shell";
import { BASE_URL } from "@/lib/config";
import {
  HENSTEL_LEGAL_LAST_UPDATED,
  HENSTEL_MIN_AGE,
  HENSTEL_PUBLIC_URL,
  HENSTEL_SUPPORT_EMAIL,
} from "@/lib/data/henstel-legal";

// Headings carry stable ids for deep links. Keep wording in step with the
// Privacy Policy (app/henstel/privacy/page.tsx) wherever both mention the same
// thing (accounts, deletion, subscriptions, ads).

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Henstel — the rules that govern use of the app and website.",
  alternates: { canonical: `${BASE_URL}/henstel/terms` },
};

export default function HenstelTermsPage() {
  return (
    <LegalShell
      title="Terms of Service"
      lastUpdated={HENSTEL_LEGAL_LAST_UPDATED}
    >
      <section>
        <h2 id="agreement-to-terms">Agreement to Terms</h2>
        <p>
          By downloading, accessing or using Henstel (the &quot;Service&quot;),
          you agree to be bound by these Terms of Service (&quot;Terms&quot;).
          If you disagree with any part of these Terms, you may not use the
          Service.
        </p>
      </section>

      <section>
        <h2 id="eligibility">Eligibility</h2>
        <p>
          You must be at least {HENSTEL_MIN_AGE} years old to use Henstel. If
          you are under 18, you may use the Service only with the permission of
          a parent or guardian where the law of your country requires it. If you
          believe a child under {HENSTEL_MIN_AGE} has created an account,
          contact us and we will delete it.
        </p>
      </section>

      <section>
        <h2 id="your-account">Your Account</h2>
        <p>
          Henstel needs an account. You agree to provide accurate information,
          keep your sign-in details secure and tell us promptly if you suspect
          unauthorised use. You are responsible for activity under your account.
          You may delete your account at any time from Settings → Delete Account
          in the app, or at{" "}
          <Link href="/henstel/delete-account">
            paulkreations.com/henstel/delete-account
          </Link>
          . Deletion is permanent; the Privacy Policy explains what is deleted,
          what is kept and for how long.
        </p>
      </section>

      <section>
        <h2 id="use-of-service">Use of Service</h2>
        <p>
          You agree to use the Service only for lawful purposes. You agree not
          to:
        </p>
        <ul>
          <li>
            Use the Service in any way that violates applicable law or
            regulation
          </li>
          <li>
            Attempt to gain unauthorized access to any part of the Service, its
            servers or other users&apos; accounts
          </li>
          <li>
            Copy, scrape or redistribute cookbook or recipe content from the
            Service at scale
          </li>
          <li>
            Use automated systems to access the Service in a way that sends more
            requests than a person reasonably could
          </li>
          <li>
            Use the AI features to produce unlawful, harmful or abusive content
          </li>
          <li>
            Reverse engineer, decompile or interfere with the Service or its
            security features
          </li>
        </ul>
      </section>

      <section>
        <h2 id="henstel-pro">Henstel Pro and Billing</h2>
        <p>
          Henstel is free to download and can be used for a number of free-usage
          days. To continue using the app after those days you subscribe to
          Henstel Pro. There is no conventional free trial.
        </p>
        <ul>
          <li>
            <strong>How you pay.</strong> Henstel Pro is purchased through
            Google Play and managed with our subscription provider, RevenueCat.
            Plans and prices are shown in the app and can vary by country.
          </li>
          <li>
            <strong>Renewal and cancellation.</strong> Where a plan renews
            automatically, it renews until you cancel it in Google Play
            (Payments &amp; subscriptions). Deleting your Henstel account does
            not cancel a Google Play subscription.
          </li>
          <li>
            <strong>Refunds.</strong> Payments are non-refundable unless
            required by law or by Google Play&apos;s own policies; Google Play
            refunds are governed by Google&apos;s terms, not ours.
          </li>
          <li>
            <strong>Price changes.</strong> We may change prices or plans with
            reasonable notice; a change takes effect for you at your next
            renewal.
          </li>
        </ul>
      </section>

      <section>
        <h2 id="recipes-ai-and-food-safety">
          Recipes, AI Features and Food Safety
        </h2>
        <p>
          Cookbooks, recipes, expiry reminders and AI-assisted suggestions in
          Henstel are provided for convenience and inspiration only. They are
          not medical, nutritional or food-safety advice. AI features, which
          help prepare and beautify recipes, can produce mistakes. You are
          responsible for checking ingredients, quantities, cooking times and
          allergens, and for judging whether food is safe to eat. An expiry
          reminder is an aid, not a guarantee that food is safe or unsafe.
        </p>
      </section>

      <section>
        <h2 id="affiliate-links">Affiliate Links</h2>
        <p>
          Some products shown in the Service link to Amazon. As an Amazon
          Associate we earn from qualifying purchases. Following a link takes
          you to Amazon, whose terms and privacy notice then apply. Prices,
          availability and fulfilment are Amazon&apos;s responsibility.
        </p>
      </section>

      <section>
        <h2 id="intellectual-property">Intellectual Property</h2>
        <p>
          The Service and its original content, features and functionality
          (excluding content you provide) are and will remain the exclusive
          property of Paul Kreations and its licensors. The Service is protected
          by copyright, trademark and other laws. Our names, logos and
          trademarks may not be used in connection with any product or service
          without our prior written consent.
        </p>
      </section>

      <section>
        <h2 id="user-content">Your Content</h2>
        <p>
          You keep ownership of the content you add to the Service, such as
          pantry entries, saved recipes, profile details and support messages.
          By adding it you give us a non-exclusive, worldwide, royalty-free
          licence to store, process and display it as needed to operate the
          Service for you. You confirm you have the right to add it.
        </p>
      </section>

      <section>
        <h2 id="third-party-services">Third-Party Services and Links</h2>
        <p>
          The Service relies on, and may link to, services run by others (for
          example Google Play, Supabase and the other providers listed in the
          Privacy Policy). We do not control them and are not responsible for
          their content, availability or practices. Their own terms apply when
          you use them.
        </p>
      </section>

      <section>
        <h2 id="termination">Termination</h2>
        <p>
          We may suspend or terminate your access to the Service immediately,
          without prior notice or liability, if you breach these Terms or misuse
          the Service. You may stop using the Service at any time. When access
          ends, your right to use the Service ends immediately.
        </p>
      </section>

      <section>
        <h2 id="limitation-of-liability">Limitation of Liability</h2>
        <p>
          To the extent permitted by law, Paul Kreations, its directors,
          employees, partners, agents, suppliers and affiliates will not be
          liable for any indirect, incidental, special, consequential or
          punitive damages, including loss of profits, data, use, goodwill or
          other intangible losses, resulting from:
        </p>
        <ul>
          <li>
            Your access to or use of (or inability to access or use) the Service
          </li>
          <li>Any conduct or content of any third party on the Service</li>
          <li>Any content obtained from the Service</li>
          <li>
            Unauthorized access, use or alteration of your transmissions or
            content
          </li>
        </ul>
      </section>

      <section>
        <h2 id="disclaimer">Disclaimer</h2>
        <p>
          The Service is provided on an &quot;AS IS&quot; and &quot;AS
          AVAILABLE&quot; basis, without warranties of any kind, whether express
          or implied, including implied warranties of merchantability, fitness
          for a particular purpose, non-infringement or course of performance.
        </p>
      </section>

      <section>
        <h2 id="governing-law">Governing Law</h2>
        <p>
          These Terms are governed by the laws of India. Any dispute arising out
          of or in connection with them is subject to the exclusive jurisdiction
          of the courts at Kolkata, West Bengal, India.
        </p>
      </section>

      <section>
        <h2 id="changes-to-terms">Changes to Terms</h2>
        <p>
          We may modify or replace these Terms at any time. If a revision is
          material, we will try to give at least 30 days&apos; notice before the
          new terms take effect. By continuing to use the Service after
          revisions become effective, you agree to be bound by the revised
          terms.
        </p>
      </section>

      <section>
        <h2 id="contact-us">Contact Us</h2>
        <p>
          If you have any questions about these Terms of Service, please contact
          us:
        </p>
        <ul>
          <li>
            By email:{" "}
            <a href={"mailto:" + HENSTEL_SUPPORT_EMAIL}>
              {HENSTEL_SUPPORT_EMAIL}
            </a>
          </li>
          <li>
            By visiting: <a href={HENSTEL_PUBLIC_URL}>{HENSTEL_PUBLIC_URL}</a>
          </li>
        </ul>
      </section>
    </LegalShell>
  );
}
