import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/wimm/legal-shell";
import { LegalTable } from "@/components/wimm/legal-table";
import { BASE_URL } from "@/lib/config";
import {
  WIMM_BACKUP_RETENTION,
  WIMM_GRIEVANCE_OFFICER,
  WIMM_LEGAL_LAST_UPDATED,
  WIMM_SUPPORT_EMAIL,
} from "@/lib/data/wimm-legal";

// Body text mirrors privacy-policy.md (10 October 2026) — the source of truth
// for wording. Headings carry stable ids so the app can deep-link to them,
// e.g. /wimm/privacy#account-deletion-and-data-retention. Do not rename a
// heading without keeping its old id available.

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Where is My Money? — what personal data we collect, why, who we share it with, how long we keep it, and the choices you have.",
  alternates: { canonical: `${BASE_URL}/wimm/privacy` },
};

export default function WimmPrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" lastUpdated={WIMM_LEGAL_LAST_UPDATED}>
      <section
        aria-labelledby="changes-in-this-version"
        className="border border-[#D8E8E0] bg-white px-4 py-4"
      >
        <h2 id="changes-in-this-version">
          Changes in this version ({WIMM_LEGAL_LAST_UPDATED})
        </h2>
        <ul>
          <li>Layers attribution added</li>
          <li>Wiredash (beta) added</li>
          <li>Account deletion details added</li>
          <li>Data hosting in Mumbai, India added</li>
          <li>18+ age rule added</li>
        </ul>
        <p>
          Previous version:{" "}
          <Link href="/wimm/privacy/archive/2026-09-01">1 September 2026</Link>
        </p>
      </section>

      <section>
        <h2 id="introduction">Introduction</h2>
        <p>
          Where is My Money? (&quot;we,&quot; &quot;us,&quot; or
          &quot;our&quot;) operates the Where is My Money? mobile and desktop
          application and the website at{" "}
          <a href="https://www.paulkreations.com/wimm">
            https://www.paulkreations.com/wimm
          </a>{" "}
          (together, the &quot;Service&quot;). This Privacy Policy explains what
          personal data we collect, why, who we share it with, how long we keep
          it, and the choices you have. Please read it carefully. If you do not
          agree with it, please do not use the Service.
        </p>
        <p>
          <strong>A note on how this app is built:</strong> by default, your
          financial data — expenses, income, investments, debts, budgets, and
          everything else you enter — is stored only on your device, encrypted,
          and is not sent to us. It leaves your device only if you explicitly
          turn on Premium cloud sync or take one of the specific actions
          described below (such as enrolling in the Referral Program or
          uploading an attachment). This policy describes what happens in every
          case, including that offline-by-default one.
        </p>
      </section>
      <section>
        <h2 id="who-is-responsible-for-your-data">
          Who is responsible for your data
        </h2>
        <p>
          For the data described in this policy, Where is My Money? (operated by
          Paul Kreations) is the &quot;Data Fiduciary&quot; under India&apos;s
          Digital Personal Data Protection Act, 2023 (DPDP Act) and the
          &quot;controller&quot; under comparable laws. Our Grievance
          Officer&apos;s details are at the end of this policy.
        </p>
      </section>
      <section>
        <h2 id="information-we-collect">Information We Collect</h2>
        <h3 id="information-you-provide-directly">
          Information you provide directly
        </h3>
        <ul>
          <li>
            <strong>Financial data</strong> — expenses, income,
            bank/card/investment/debt records, budgets, goals, events, gifts and
            similar entries you create in the app. Stored locally, encrypted, on
            your device by default. Sent to our servers only if you turn on
            Premium cloud sync (see &quot;Premium Cloud Sync&quot;).
          </li>
          <li>
            <strong>Account identity</strong> — if you sign in (for Premium
            cloud sync, the Referral Program, or a Promo Offer), we receive your
            name, email address and profile photo from your sign-in method
            (Google Sign-In, or email one-time code).
          </li>
          <li>
            <strong>Profile and financial profile details</strong> — name, date
            of birth, gender, religion (optional, &quot;Prefer not to say&quot;
            is available), job type, income stability, years in current role,
            marital status, number of dependents, family members you add, and
            similar fields you choose to fill in. Local-only unless you turn on
            Premium cloud sync or enroll in the Referral Program. The religion
            field is used only to show festivals and ceremonies that match you.
          </li>
          <li>
            <strong>Payment information</strong> — if you subscribe to Premium,
            payment is processed by Apple, Google Play, RevenueCat
            (Android/iOS/macOS) or Razorpay (India, Windows/Linux). We do not
            receive or store your card or bank details; we receive confirmation
            that a payment was made, a subscription identifier, its status and
            its price and currency.
          </li>
          <li>
            <strong>Attachments</strong> — receipts, invoices, tax documents and
            similar files you choose to upload against a record. This is a
            Premium feature and the files are stored in private cloud storage,
            readable only by your account.
          </li>
          <li>
            <strong>Location data</strong> — only if you use the Trip Journal
            and choose to search for or confirm a place. We never collect
            location in the background.
          </li>
          <li>
            <strong>Voice input</strong> — if you use voice entry, speech is
            converted to text by your device&apos;s built-in speech recognition.
            Depending on your device and its settings, your operating-system
            provider (for example Google on Android or Apple on iOS) may process
            the audio under its own privacy policy. We do not receive the audio.
          </li>
          <li>
            <strong>Support messages and feedback</strong> — what you write to
            us in Support or Feedback, if you choose to.
          </li>
        </ul>
        <h3 id="information-collected-automatically">
          Information collected automatically
        </h3>
        <ul>
          <li>
            <strong>Usage data (analytics)</strong> — which screens and features
            you use, recorded as event names and simple categories (for example
            &quot;expense added&quot; or the name of a screen).{" "}
            <strong>
              We design analytics so that it never includes amounts, balances,
              account or merchant names, descriptions, notes or other free text
              you type.
            </strong>{" "}
            If you are signed in, events are linked to your account ID so we can
            understand usage across your devices.
          </li>
          <li>
            <strong>Install and campaign attribution data</strong> — to measure
            which of our marketing campaigns lead to installs, we use an
            attribution provider. It receives device and install information,
            the campaign link that opened the app, and, for purchases, the price
            and currency of the subscription. On iOS, it can use the advertising
            identifier only if you allow tracking when the system asks.
          </li>
          <li>
            <strong>Crash and diagnostic data</strong> — technical information
            when the app fails: app version, device model, operating system, the
            screen or feature involved and the error text. We configure crash
            reporting not to collect IP address or other default personal data.
            Error text is written by software and we work to keep financial
            details out of it, but we cannot promise that no technical error
            message will ever mention a value.
          </li>
          <li>
            <strong>Push notification identifiers</strong> — if you allow
            notifications, a notification identifier linked to your account ID
            so we can deliver them.
          </li>
          <li>
            <strong>Bot-protection signals</strong> — when you sign in with
            email, a challenge from Cloudflare Turnstile checks that you are not
            an automated program.
          </li>
        </ul>
        <p>
          <strong>Free vs Premium:</strong> on the free tier, usage analytics
          and crash reports are off until you opt in, and you can change that
          any time in Settings. For Premium, usage data and crash reports are
          required because several Premium features rely on them to work and to
          be fixed quickly. If you do not want this, you can use the free tier
          or delete your account.
        </p>
      </section>
      <section>
        <h2 id="how-we-use-your-information">How We Use Your Information</h2>
        <ul>
          <li>Provide, operate and maintain the Service</li>
          <li>
            Keep your data available across your own devices, if you&apos;ve
            enabled Premium cloud sync
          </li>
          <li>Process your Premium subscription and payment</li>
          <li>
            Send notifications you have asked for (for example, referral updates
            or product announcements, which you can turn off)
          </li>
          <li>
            Understand and improve how the Service is used, and measure our own
            marketing
          </li>
          <li>Diagnose and fix crashes and errors</li>
          <li>Provide customer support</li>
          <li>
            Operate the Referral Program and Promo Offers (see their sections
            below)
          </li>
          <li>Find and prevent fraud or abuse</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p>
          We do <strong>not</strong> sell your personal data, and we do not use
          your financial records for advertising.
        </p>
        <p>
          <strong>Reminders on your device.</strong> Payment, EMI, premium and
          maturity reminders are created by the app on your own device. They are
          not sent through our servers or through the push-notification
          provider. Because they are shown by your phone, check your
          phone&apos;s lock-screen notification settings if you do not want
          amounts displayed there.
        </p>
      </section>
      <section>
        <h2 id="on-device-ai-features">On-device AI features</h2>
        <p>
          Where the app offers AI-assisted features, the AI model is downloaded
          to your device and runs there. What you type or say into those
          features is not sent to us or to an AI provider.
        </p>
      </section>
      <section>
        <h2 id="premium-cloud-sync">Premium Cloud Sync</h2>
        <p>
          Turning on Premium cloud sync uploads your financial data to our
          database, hosted on Supabase, so it stays current across every device
          you&apos;re signed into. This is optional; the app is fully functional
          without it.
        </p>
        <p>
          Each person&apos;s cloud data is protected by access rules in the
          database (row-level security), so an account can read or change only
          its own records, plus anything another account has deliberately shared
          with it, such as a family sharing grant. Our app contains only a
          public, limited-access key. The administrative key that can bypass
          those rules is held only on our server-side functions and is never
          placed in the app.
        </p>
        <p>
          Our database is currently hosted in{" "}
          <strong>Mumbai, India (AWS ap-south-1)</strong>. Supabase and its
          sub-processors may process data elsewhere as described in
          Supabase&apos;s Data Processing Addendum and sub-processor list. If we
          ever move data to a different region we will update this policy before
          doing so.
        </p>
      </section>
      <section>
        <h2 id="referral-program">Referral Program</h2>
        <p>
          If you choose to enroll in the Referral Program (during onboarding, or
          later from Settings), we collect and store on our servers:
        </p>
        <ul>
          <li>
            Your name, date of birth, gender and profile photo, as set in your
            app profile when you enroll
          </li>
          <li>Your Financial Profile details, as set when you enroll</li>
          <li>
            A shareable referral code we generate for you and, if you redeem
            one, the code you entered
          </li>
          <li>
            Which account (if any) referred you and which accounts (if any)
            you&apos;ve referred
          </li>
        </ul>
        <p>
          This is a one-time snapshot at enrollment, not a continuous copy of
          your data (unless you are also a Premium subscriber with cloud sync
          on, in which case your Financial Profile is kept current like the rest
          of your Premium data).{" "}
          <strong>
            Your everyday financial transactions are never collected for the
            Referral Program.
          </strong>
        </p>
        <p>
          A person you refer can see that you referred them and the date you
          joined — nothing else about you.
        </p>
        <p>
          <strong>What happens if you delete your account:</strong> your
          Referral Program enrollment record — your referral code and referral
          history — is retained after you delete your account, so that signing
          back in with the same Google account reconnects you to it. Every other
          part of your cloud account is permanently deleted (see &quot;Account
          Deletion and Data Retention&quot;). You can opt out of the Referral
          Program in the app, and you can ask us to delete the retained referral
          record by contacting us.
        </p>
      </section>
      <section>
        <h2 id="promo-offers">Promo Offers</h2>
        <p>
          We may grant free Premium access to specific accounts through a Promo
          Offer. This is invitation-based and separate from the Referral
          Program.
        </p>
        <ul>
          <li>
            <strong>What we collect.</strong> Which offer (if any) your account
            has applied, and when. Nothing beyond what is described elsewhere in
            this policy.
          </li>
          <li>
            <strong>How eligibility is decided.</strong> Each offer is either
            visible to every signed-in account or restricted to specific
            accounts we select in advance. We use no automated criteria (your
            financial data, activity or profile). To restrict an offer, we may
            look up an account by its email address so that account can see that
            offer; we use this lookup for nothing else.
          </li>
          <li>
            <strong>Administrative access.</strong> A small number of authorized
            administrators (currently the app&apos;s developer) can view Promo
            Offer eligibility and redemption records, including the email
            address associated with an account, to run offers and to help with a
            redemption at your request. This does not extend to your financial
            data in the cloud, which we do not browse.
          </li>
          <li>
            <strong>Data retention.</strong> Your Promo Offer redemption record
            is deleted with the rest of your account when you delete it. If you
            sign up again, eligibility is evaluated as if you were a new
            account.
          </li>
        </ul>
      </section>
      <section>
        <h2 id="third-party-services">Third-Party Services</h2>
        <p>
          We use the following service providers (&quot;processors&quot;) to
          operate the app. Each processes the data described in this policy on
          our behalf under its own terms and data-protection commitments, and
          none may use it for its own independent purposes beyond what those
          terms allow.
        </p>
        <LegalTable
          caption="Service providers (processors) we use"
          columns={["Provider", "What it does", "Data involved"]}
          rows={[
            [
              <>
                <strong>Supabase</strong> (hosting in Mumbai, India)
              </>,
              <>
                Database, file storage, sign-in and server functions for Premium
                cloud sync, attachments, referral and promo features
              </>,
              <>Account identity; the cloud data described above</>,
            ],
            [
              <>
                <strong>Google Sign-In</strong>
              </>,
              <>Sign-in</>,
              <>Name, email, profile photo</>,
            ],
            [
              <>
                <strong>RevenueCat</strong>
              </>,
              <>
                Manages Premium subscriptions bought through the Apple App Store
                or Google Play
              </>,
              <>Account ID, purchase and subscription status</>,
            ],
            [
              <>
                <strong>Razorpay</strong>
              </>,
              <>
                Subscription payments where store billing isn&apos;t available
                (Windows and Linux, India only)
              </>,
              <>Payment status; Razorpay handles your payment details</>,
            ],
            [
              <>
                <strong>Amplitude</strong>
              </>,
              <>Product analytics</>,
              <>
                Event names and categories, device identifiers, account ID when
                signed in
              </>,
            ],
            [
              <>
                <strong>Layers</strong>
              </>,
              <>Install and campaign attribution; purchase events</>,
              <>
                Device and install information, campaign link, subscription
                price and currency, account ID when signed in; advertising
                identifier on iOS only with your permission
              </>,
            ],
            [
              <>
                <strong>Sentry</strong>
              </>,
              <>Crash and error reporting</>,
              <>Technical diagnostics described above</>,
            ],
            [
              <>
                <strong>OneSignal</strong>
              </>,
              <>Push notification delivery</>,
              <>Notification identifier, account ID, device type</>,
            ],
            [
              <>
                <strong>Cloudflare Turnstile</strong>
              </>,
              <>Bot protection when signing in with email</>,
              <>Browser and device signals needed to run the challenge</>,
            ],
            [
              <>
                <strong>Google Maps / Places</strong>
              </>,
              <>
                Place search and map images in Trip Journal, requested through
                our server
              </>,
              <>
                The text you search or the place you pick, and an approximate
                area; only if you use that feature
              </>,
            ],
            [
              <>
                <strong>Wiredash</strong>
              </>,
              <>In-app feedback in test (beta) builds only</>,
              <>Your message and an optional screenshot you choose to send</>,
            ],
          ]}
        />
        <p>
          Several of these providers store data outside India. Where personal
          data is transferred outside India we rely on the provider&apos;s
          contractual safeguards, and the DPDP Act permits such transfers except
          to countries the Government of India restricts.
        </p>
        <p>
          We may also disclose information if required by law or to protect
          rights, safety and security.
        </p>
      </section>
      <section>
        <h2 id="account-deletion-and-data-retention">
          Account Deletion and Data Retention
        </h2>
        <p>
          <strong>How to delete.</strong> Open Settings → Delete Account in the
          app, or follow the instructions at{" "}
          <a href="https://www.paulkreations.com/wimm/delete-account">
            https://www.paulkreations.com/wimm/delete-account
          </a>
          . Deletion is permanent.
        </p>
        <p>
          <strong>What is deleted when you delete your account:</strong>
        </p>
        <ul>
          <li>
            All your cloud financial records, profile and settings, across every
            feature
          </li>
          <li>
            Your uploaded attachments and generated reports in cloud storage
          </li>
          <li>Your support chats and feedback</li>
          <li>Your Promo Offer redemption record</li>
          <li>Your sign-in account itself</li>
        </ul>
        <p>
          <strong>What is not deleted, or not immediately:</strong>
        </p>
        <ul>
          <li>
            <strong>Data on your own device</strong>, and any backup files you
            exported. You control these; delete the app or its data to remove
            them.
          </li>
          <li>
            <strong>Referral Program enrollment</strong>, as explained above,
            until you ask us to delete it.
          </li>
          <li>
            <strong>Payment and subscription records</strong>, which we and the
            app stores and payment processors must keep under tax and accounting
            law.
          </li>
          <li>
            <strong>Routine hosting backups.</strong> Our hosting provider takes
            encrypted backups of the database. Deleted records may remain in
            those backups until they are overwritten in the normal cycle —
            currently up to <strong>{WIMM_BACKUP_RETENTION}</strong>. We do not
            restore a deleted account&apos;s data.
          </li>
          <li>
            <strong>
              Analytics, attribution, crash and push-notification records.
            </strong>{" "}
            These are kept under a pseudonymous account or device ID, not in
            your financial records. They are kept only as long as needed to
            improve the Service (or as the provider&apos;s retention settings
            allow), and you can ask us to delete or anonymize those linked to
            you by contacting us. Withdrawing analytics consent in Settings
            stops further collection.
          </li>
          <li>
            <strong>If your account is blocked from deletion.</strong> If your
            account still owns shared data that other people depend on (for
            example a family, joint goal, shared budget, trip group or shared
            subscription), the app will tell you what to hand over or remove
            first, so that other people&apos;s data is not lost without notice.
          </li>
        </ul>
        <p>
          <strong>Other retention.</strong> Cloud financial data is kept until
          you turn off cloud sync or delete your account. Usage and crash data
          is kept as long as needed to improve the Service or until you withdraw
          consent (free tier) or delete your account (Premium).
        </p>
      </section>
      <section>
        <h2 id="data-security">Data Security</h2>
        <p>
          Your local financial data is stored encrypted on your device. Data in
          transit to our servers is encrypted, and our hosting provider encrypts
          stored data. Access to each person&apos;s cloud records is restricted
          by database access rules, and our server-side administrative key is
          kept out of the app. We limit which people at Paul Kreations can reach
          production systems. No method of transmission or storage is 100%
          secure, and we cannot guarantee absolute security. If a breach
          affecting your personal data occurs, we will notify you and the
          relevant authority as required by law.
        </p>
      </section>
      <section>
        <h2 id="children">Children</h2>
        <p>
          The Service is for adults aged 18 and over. We do not knowingly
          collect personal data from children. If you believe a child has given
          us personal data, contact us and we will delete it.
        </p>
      </section>
      <section>
        <h2 id="your-rights">Your Rights</h2>
        <p>
          Depending on where you live (including under the DPDP Act, 2023), you
          can:
        </p>
        <ul>
          <li>
            access the personal data we hold about you and get a summary of how
            it is used;
          </li>
          <li>correct or update it (most of it directly in the app);</li>
          <li>erase it (Settings → Delete Account);</li>
          <li>export your data (Settings → Data Management);</li>
          <li>
            withdraw your consent at any time, for example for analytics and
            crash reports in Settings, as easily as you gave it; withdrawal does
            not affect what happened before;
          </li>
          <li>
            nominate another person to exercise your rights if you die or become
            incapacitated; and
          </li>
          <li>
            complain to our Grievance Officer and, if unresolved, to the Data
            Protection Board of India.
          </li>
        </ul>
        <p>
          You can exercise most rights in the app (Settings → Data Management
          and Settings → Delete Account); for anything else contact us using the
          details below. We aim to respond within 30 days.
        </p>
      </section>
      <section>
        <h2 id="grievance-officer-india">Grievance Officer (India)</h2>
        <p>
          In accordance with the Digital Personal Data Protection Act, 2023 and
          applicable Indian law, the following Grievance Officer can be
          contacted about any complaint or concern about how your personal data
          is handled:
        </p>
        <ul>
          <li>
            <strong>Name:</strong> {WIMM_GRIEVANCE_OFFICER.name}
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${WIMM_GRIEVANCE_OFFICER.email}`}>
              {WIMM_GRIEVANCE_OFFICER.email}
            </a>
          </li>
          <li>
            <strong>Address:</strong> {WIMM_GRIEVANCE_OFFICER.address}
          </li>
        </ul>
      </section>
      <section>
        <h2 id="changes-to-this-privacy-policy">
          Changes to This Privacy Policy
        </h2>
        <p>
          We may update this policy from time to time. We will post the new
          version here and update the &quot;Last Updated&quot; date. Material
          changes — anything that meaningfully changes what we collect, who
          receives it or how we use it — will also be shown to you in the app.
          Changes are effective when posted.
        </p>
      </section>
      <section>
        <h2 id="contact-us">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact
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
