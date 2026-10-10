import type { Metadata } from "next";
import { LegalShell } from "@/components/wimm/legal-shell";
import { BASE_URL } from "@/lib/config";
import {
  WIMM_LEGAL_LAST_UPDATED,
  WIMM_SUPPORT_EMAIL,
} from "@/lib/data/wimm-legal";

// Body text mirrors terms-of-service.md (10 October 2026) — the source of
// truth for wording. Headings carry stable ids for deep links.

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Where is My Money? — the rules that govern use of the app and website.",
  alternates: { canonical: `${BASE_URL}/wimm/terms` },
};

export default function WimmTermsPage() {
  return (
    <LegalShell title="Terms of Service" lastUpdated={WIMM_LEGAL_LAST_UPDATED}>
      <section>
        <h2 id="agreement-to-terms">Agreement to Terms</h2>
        <p>
          By accessing or using the services provided by Where is My Money? (the
          &quot;Service&quot;), you agree to be bound by these Terms of Service
          (&quot;Terms&quot;). If you disagree with any part of these terms, you
          may not access the Service.
        </p>
      </section>
      <section>
        <h2 id="eligibility">Eligibility</h2>
        <p>
          You must be at least 18 years old to create an account, subscribe to
          Premium, or use cloud sync. The offline-only version of the app is not
          directed at children. If you believe a child has created an account,
          contact us and we will delete it.
        </p>
      </section>
      <section>
        <h2 id="use-of-service">Use of Service</h2>
        <p>
          You agree to use the Service only for lawful purposes and in
          accordance with these Terms. You agree not to:
        </p>
        <ul>
          <li>
            Use the Service in any way that violates any applicable law or
            regulation
          </li>
          <li>
            Use the Service to transmit any harmful, threatening, abusive, or
            otherwise objectionable material
          </li>
          <li>
            Attempt to gain unauthorized access to any portion of the Service
          </li>
          <li>Use the Service to infringe upon the rights of others</li>
          <li>
            Use any automated system to access the Service in a manner that
            sends more requests than a human can reasonably produce
          </li>
          <li>
            Attempt to abuse, defraud, or manipulate the Referral Program — see
            its own section below
          </li>
          <li>
            Attempt to abuse, defraud, or manipulate Promo Offers, including by
            misrepresenting your identity or eligibility, or by circumventing
            the one-offer-per-account limit — see its own section below
          </li>
        </ul>
      </section>
      <section>
        <h2 id="your-data-backups-and-account-deletion">
          Your Data, Backups and Account Deletion
        </h2>
        <p>
          By default your financial data stays on your device. You are
          responsible for keeping your own backups (Settings → Data Management).
          If you turn on Premium cloud sync, a copy is stored in the cloud so it
          stays available across your devices; this is a convenience, not a
          guaranteed archive.
        </p>
        <p>
          You can delete your cloud account at any time from Settings → Delete
          Account (or at{" "}
          <a href="https://www.paulkreations.com/wimm/delete-account">
            https://www.paulkreations.com/wimm/delete-account
          </a>
          ). Deletion permanently removes your cloud financial records,
          attachments and sign-in. It cannot be undone, and it does not remove
          the copy stored on your own device or backup files you exported
          yourself. If your account still owns shared data that other people
          depend on (for example a family, a joint goal or a shared budget), you
          will be asked to hand over or remove it first. The Privacy Policy
          explains exactly what is deleted, what is kept and for how long.
        </p>
      </section>
      <section>
        <h2 id="intellectual-property">Intellectual Property</h2>
        <p>
          The Service and its original content, features, and functionality are
          and will remain the exclusive property of Where is My Money?. The
          Service is protected by copyright, trademark, and other laws. Our
          trademarks may not be used in connection with any product or service
          without our prior written consent.
        </p>
      </section>
      <section>
        <h2 id="user-content">User Content</h2>
        <p>
          You retain ownership of any content you submit to or through the
          Service. By submitting content, you grant Where is My Money? a
          non-exclusive, worldwide, royalty-free license to use, reproduce, and
          display such content in connection with operating the Service.
        </p>
      </section>
      <section>
        <h2 id="payments-and-billing">Payments and Billing</h2>
        <p>
          Premium subscriptions are billed through one of the following,
          depending on your platform and region:
        </p>
        <ul>
          <li>
            <strong>Apple App Store / Google Play Store</strong>, via
            RevenueCat, on Android, iOS, and macOS.
          </li>
          <li>
            <strong>Razorpay</strong>, via a payment link, on Windows and Linux
            (India only).
          </li>
        </ul>
        <p>
          You agree to provide accurate billing information. All payments are
          non-refundable unless otherwise stated, or required by the
          platform/payment processor&apos;s own policies (App Store and Play
          Store refunds are governed by Apple&apos;s and Google&apos;s own
          terms, not ours). We reserve the right to change our pricing at any
          time with reasonable notice.
        </p>
        <p>
          Premium access may also be granted free of charge through a Promo
          Offer, at our sole discretion, without any payment — see &quot;Promo
          Offers&quot; below for how that works and how it interacts with a paid
          subscription.
        </p>
      </section>
      <section>
        <h2 id="referral-program">Referral Program</h2>
        <p>
          Where is My Money? may offer a Referral Program allowing you to invite
          others to the Service and, subject to eligibility, earn rewards.
        </p>
        <ul>
          <li>
            <strong>Eligibility.</strong> Enrollment requires signing in with a
            Google account (or an available alternative sign-in method). A
            Premium subscription is never required to enroll or to redeem a
            referral code, and referral rewards are never a discount on a
            Premium subscription.
          </li>
          <li>
            <strong>One referrer per account.</strong> Each account may be
            referred by, at most, one other account, for the lifetime of that
            account.
          </li>
          <li>
            <strong>Redemption window.</strong> A referral code must be redeemed
            within a limited time period of enrolling (see the Referral Program
            screen in-app for the current window). Codes cannot be redeemed
            after this window closes.
          </li>
          <li>
            <strong>Rewards.</strong> Referral rewards, if any, are feature
            unlocks or other non-monetary benefits, as described in-app at the
            time they&apos;re offered, and are subject to change. Rewards have
            no cash value and are not transferable, exchangeable, or redeemable
            for cash or credit.
          </li>
          <li>
            <strong>Fraud and abuse.</strong> We reserve the right to withhold,
            revoke, or reclaim any referral reward, and to suspend or terminate
            access to the Referral Program (or, in cases of serious abuse, the
            Service itself), if we reasonably believe an account has engaged in
            self-referral, the use of multiple/fraudulent accounts, or any other
            manipulation of the program.
          </li>
          <li>
            <strong>Data retention.</strong> See the Privacy Policy&apos;s
            &quot;Referral Program&quot; section for what&apos;s collected and
            what&apos;s retained after account deletion.
          </li>
        </ul>
      </section>
      <section>
        <h2 id="promo-offers">Promo Offers</h2>
        <p>
          Where is My Money? may, at our sole discretion, grant free Premium
          access to specific accounts through a Promo Offer (for example, to
          collaborators, partners, or other accounts we select).
        </p>
        <ul>
          <li>
            <strong>Invitation-based, not open enrollment.</strong> Unlike the
            Referral Program, Promo Offers are not something any account can opt
            into or generate — each offer is created and assigned by us, and is
            either visible to every signed-in account or restricted to specific
            accounts we designate. There is no code you can type in or request;
            an offer is either shown to your account in the app or it
            isn&apos;t.
          </li>
          <li>
            <strong>Eligibility.</strong> Viewing or applying a Promo Offer
            requires signing in with a Google account (or an available
            alternative sign-in method).
          </li>
          <li>
            <strong>One offer per account, ever.</strong> Each account may
            apply, at most, one Promo Offer, for the lifetime of that account.
            Offers cannot be stacked, combined, switched, or reapplied once one
            has been used.
          </li>
          <li>
            <strong>What it grants.</strong> Each offer grants Premium access
            for the specific period or benefit described in that offer at the
            time you apply it (for example, a specific calendar month). A Promo
            Offer is not a subscription — it does not renew, and does not
            continue automatically once its period ends.
          </li>
          <li>
            <strong>Interaction with a paid subscription.</strong> A paid
            Premium subscription always takes precedence over a Promo Offer. If
            you have an active paid subscription, applying a Promo Offer will
            have no additional effect while that subscription remains active;
            conversely, if a paid subscription you&apos;re on ever lapses while
            an applied offer&apos;s period is still current, Premium access
            through that offer resumes automatically. Applying a Promo Offer
            never affects, cancels, or interferes with a separate paid
            subscription.
          </li>
          <li>
            <strong>Changes and revocation.</strong> We may modify, deactivate,
            or revoke any Promo Offer, or any account&apos;s access to one, at
            any time and without notice — including after it has already been
            applied — for example in the event of an error, a change in
            eligibility, or suspected abuse.
          </li>
          <li>
            <strong>No cash value.</strong> Promo Offers have no cash value and
            are not transferable, exchangeable, sellable, or redeemable for cash
            or credit.
          </li>
          <li>
            <strong>Fraud and abuse.</strong> We reserve the right to withhold,
            revoke, or reclaim access granted through a Promo Offer, and to
            suspend or terminate access to Promo Offers (or, in cases of serious
            abuse, the Service itself), if we reasonably believe an account has
            engaged in fraud, misrepresentation, or any other manipulation of
            the program.
          </li>
          <li>
            <strong>Data retention.</strong> See the Privacy Policy&apos;s
            &quot;Promo Offers&quot; section for what&apos;s collected and
            what&apos;s retained after account deletion.
          </li>
        </ul>
      </section>
      <section>
        <h2 id="termination">Termination</h2>
        <p>
          We may terminate or suspend your access to the Service immediately,
          without prior notice or liability, for any reason, including without
          limitation if you breach the Terms.
        </p>
        <p>
          Upon termination, your right to use the Service will cease
          immediately.
        </p>
      </section>
      <section>
        <h2 id="limitation-of-liability">Limitation of Liability</h2>
        <p>
          In no event shall Where is My Money?, nor its directors, employees,
          partners, agents, suppliers, or affiliates, be liable for any
          indirect, incidental, special, consequential, or punitive damages,
          including without limitation, loss of profits, data, use, goodwill, or
          other intangible losses, resulting from:
        </p>
        <ul>
          <li>
            Your access to or use of (or inability to access or use) the Service
          </li>
          <li>Any conduct or content of any third party on the Service</li>
          <li>Any content obtained from the Service</li>
          <li>
            Unauthorized access, use, or alteration of your transmissions or
            content
          </li>
        </ul>
      </section>
      <section>
        <h2 id="disclaimer">Disclaimer</h2>
        <p>
          The Service is provided on an &quot;AS IS&quot; and &quot;AS
          AVAILABLE&quot; basis. The Service is provided without warranties of
          any kind, whether express or implied, including, but not limited to,
          implied warranties of merchantability, fitness for a particular
          purpose, non-infringement, or course of performance.
        </p>
        <p>
          Financial calculations, projections, and figures shown in the Service
          (including but not limited to expected returns, tax estimates, and
          affordability scores) are estimates for informational purposes only,
          are not financial, tax, or legal advice, and should not be relied upon
          as such.
        </p>
      </section>
      <section>
        <h2 id="governing-law">Governing Law</h2>
        <p>
          These Terms are governed by the laws of India. [CONFIRM: courts at
          Kolkata, West Bengal, India — replace with your preferred venue before
          publishing.]
        </p>
      </section>
      <section>
        <h2 id="changes-to-terms">Changes to Terms</h2>
        <p>
          We reserve the right to modify or replace these Terms at any time. If
          a revision is material, we will try to provide at least 30 days&apos;
          notice prior to any new terms taking effect.
        </p>
        <p>
          By continuing to access or use our Service after those revisions
          become effective, you agree to be bound by the revised terms.
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
            <a href={`mailto:${WIMM_SUPPORT_EMAIL}`}>{WIMM_SUPPORT_EMAIL}</a>
          </li>
          <li>
            By visiting:{" "}
            <a href="https://www.paulkreations.com/wimm">
              https://www.paulkreations.com/wimm
            </a>
          </li>
        </ul>
      </section>
    </LegalShell>
  );
}
