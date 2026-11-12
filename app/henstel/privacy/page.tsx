import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/henstel/legal-shell";
import { LegalTable } from "@/components/henstel/legal-table";
import { BASE_URL } from "@/lib/config";
import {
  HENSTEL_BACKUP_RETENTION,
  HENSTEL_GRIEVANCE_OFFICER,
  HENSTEL_LEGAL_LAST_UPDATED,
  HENSTEL_MIN_AGE,
  HENSTEL_PUBLIC_URL,
  HENSTEL_SUPPORT_EMAIL,
} from "@/lib/data/henstel-legal";

// Written from the Henstel app's actual behaviour (code review of the app and
// its Supabase functions). Headings carry stable ids so the app can deep-link
// to them, e.g. /henstel/privacy#account-deletion-and-data-retention. Do not
// rename a heading without keeping its old id available.

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Henstel — what personal data we collect, why, who we share it with, how long we keep it, and the choices you have.",
  alternates: { canonical: `${BASE_URL}/henstel/privacy` },
};

export default function HenstelPrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" lastUpdated={HENSTEL_LEGAL_LAST_UPDATED}>
      <section
        aria-labelledby="changes-in-this-version"
        className="border border-[#E6DCC6] bg-white px-4 py-4"
      >
        <h2 id="changes-in-this-version">
          Changes in this version ({HENSTEL_LEGAL_LAST_UPDATED})
        </h2>
        <ul>
          <li>
            Rewritten to describe accounts, profiles, cloud sync, AI recipe
            features, subscriptions and every service provider we use
          </li>
          <li>Account deletion and data retention details added</li>
          <li>Amazon affiliate disclosure added</li>
          <li>Minimum age of {HENSTEL_MIN_AGE} stated</li>
        </ul>
        <p>
          Previous version:{" "}
          <Link href="/henstel/privacy/archive/2025-06-01">1 June 2025</Link>
        </p>
      </section>

      <section>
        <h2 id="introduction">Introduction</h2>
        <p>
          Henstel (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is a
          kitchen companion app for Android published by Paul Kreations. This
          policy covers the Henstel mobile app and the website at{" "}
          <a href={HENSTEL_PUBLIC_URL}>{HENSTEL_PUBLIC_URL}</a> (together, the
          &quot;Service&quot;). It explains what personal data we collect, why,
          who we share it with, how long we keep it, and the choices you have.
          If you do not agree with it, please do not use the Service.
        </p>
        <p>
          <strong>In short:</strong> Henstel needs an account, because your
          profile, pantry and cookbooks are saved to the cloud so they are not
          lost if you change phone. We do not sell your personal data.
        </p>
      </section>

      <section>
        <h2 id="who-is-responsible-for-your-data">
          Who is responsible for your data
        </h2>
        <p>
          For the data described in this policy, Henstel (operated by Paul
          Kreations) is the &quot;Data Fiduciary&quot; under India&apos;s
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
            <strong>Account and profile</strong> — your name, date of birth,
            sex, country of origin, country of residence, favourite cuisines and
            a profile picture, together with the sign-in details needed to
            create and secure your account. You choose what to enter; we use
            these details to run your account and to tailor the app to you.
          </li>
          <li>
            <strong>Kitchen content</strong> — the ingredients you add to your
            pantry, recipes and cookbook content you save, and related
            preferences. This is stored in our cloud database so it follows your
            account.
          </li>
          <li>
            <strong>Photos</strong> — only if you choose to add one, for example
            a profile picture. The app asks for camera or photo access at that
            moment; you can refuse and carry on.
          </li>
          <li>
            <strong>Support messages and feedback</strong> — what you write to
            us in in-app support chat or feedback, and any screenshot you choose
            to attach.
          </li>
          <li>
            <strong>Subscription information</strong> — if you buy Henstel Pro,
            payment is taken by Google Play. We do not receive or store your
            card or bank details; we receive confirmation that a purchase was
            made, its status, its price and currency, and a subscription
            identifier.
          </li>
        </ul>

        <h3 id="information-collected-automatically">
          Information collected automatically
        </h3>
        <ul>
          <li>
            <strong>Usage data (analytics)</strong> — which screens and features
            you use, recorded as event names and simple categories, plus device
            and app details such as device model, operating system and app
            version.
          </li>
          <li>
            <strong>Crash and diagnostic data</strong> — technical information
            when the app fails: app version, device model, operating system, the
            screen or feature involved and the error text.
          </li>
          <li>
            <strong>App integrity signals</strong> — checks that requests to our
            servers come from the genuine Henstel app on a genuine device.
          </li>
          <li>
            <strong>Push notification identifiers</strong> — if you allow
            notifications, an identifier linked to your account so we can
            deliver them, such as ingredient-expiry reminders.
          </li>
          <li>
            <strong>Remote configuration</strong> — the app downloads settings
            from us (for example to switch a feature on or off); this uses your
            installation identifier.
          </li>
        </ul>
      </section>

      <section>
        <h2 id="how-we-use-your-information">How We Use Your Information</h2>
        <ul>
          <li>Provide, operate and maintain the Service</li>
          <li>Save and sync your profile, pantry and cookbooks</li>
          <li>
            Send the notifications you allow, such as ingredient-expiry
            reminders
          </li>
          <li>Process your Henstel Pro subscription</li>
          <li>Provide AI-assisted recipe features you ask for</li>
          <li>Understand and improve how the Service is used</li>
          <li>Diagnose and fix crashes and errors</li>
          <li>Provide customer support</li>
          <li>Find and prevent fraud or abuse</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p>
          We do <strong>not</strong> sell your personal data.
        </p>
      </section>

      <section>
        <h2 id="ai-features">AI recipe features</h2>
        <p>
          Henstel uses Google&apos;s AI services through Firebase to help
          prepare and beautify recipes. When you use these features, the recipe
          content you ask Henstel to work on is sent to Google&apos;s AI
          service, which returns the prepared version. Please do not enter
          anything into recipe text that you would not want processed by such a
          service. AI output can contain mistakes — always check ingredients,
          quantities, allergens and cooking times yourself.
        </p>
      </section>

      <section>
        <h2 id="biometric-sign-in">Biometric unlock</h2>
        <p>
          If you use fingerprint or face unlock in Henstel, the check is done by
          your device&apos;s operating system. Henstel only receives a yes-or-no
          result. We never receive, see or store your biometric data.
        </p>
      </section>

      <section>
        <h2 id="subscriptions">Henstel Pro subscriptions</h2>
        <p>
          Henstel is free to download and use for a number of free-usage days.
          To keep using the app afterwards you subscribe to Henstel Pro. There
          is no conventional free trial. Purchases are made through Google Play
          and managed with RevenueCat, which receives your account identifier
          and purchase and subscription status so that we can tell whether Pro
          is active. Prices and plans can vary by country. Subscriptions are
          managed and cancelled in Google Play; deleting your Henstel account
          does not cancel a Google Play subscription.
        </p>
      </section>

      <section>
        <h2 id="amazon-affiliate-links">Amazon affiliate links</h2>
        <p>
          Some products shown in Henstel link to Amazon. As an Amazon Associate
          we earn from qualifying purchases. If you follow a link you leave
          Henstel and Amazon&apos;s own privacy notice applies. We do not give
          Amazon your Henstel account details.
        </p>
      </section>

      <section>
        <h2 id="permissions">Device permissions</h2>
        <p>Henstel may ask for the following, only when a feature needs it:</p>
        <ul>
          <li>
            <strong>Internet access</strong> — to sync your data and load
            content
          </li>
          <li>
            <strong>Notifications</strong> — to send expiry reminders and other
            updates you allow
          </li>
          <li>
            <strong>Camera / photos</strong> — to add a picture, such as a
            profile photo
          </li>
          <li>
            <strong>Biometrics</strong> — for fingerprint or face unlock
          </li>
        </ul>
        <p>
          You can change any permission in your phone&apos;s settings. The rest
          of the app keeps working if you say no.
        </p>
      </section>

      <section>
        <h2 id="third-party-services">Third-Party Services</h2>
        <p>
          We use the following service providers (&quot;processors&quot;) to
          operate the app. Each processes the data described in this policy on
          our behalf under its own terms and data-protection commitments.
        </p>
        <LegalTable
          caption="Service providers (processors) we use"
          columns={["Provider", "What it does", "Data involved"]}
          rows={[
            [
              <strong key="p">Supabase</strong>,
              "Database, file storage, sign-in and server functions for accounts, profiles, pantry, cookbooks and notifications",
              "Account and profile details, kitchen content, profile pictures, subscription status",
            ],
            [
              <strong key="p">
                Firebase Analytics &amp; Crashlytics (Google)
              </strong>,
              "Usage analytics and crash reports",
              "Event names, device and app details, installation identifier, crash diagnostics",
            ],
            [
              <strong key="p">Firebase AI (Google)</strong>,
              "AI-assisted recipe preparation and beautification",
              "The recipe content you ask Henstel to prepare or beautify",
            ],
            [
              <strong key="p">
                Firebase App Check &amp; Remote Config (Google)
              </strong>,
              "Verifies requests come from the genuine app; delivers app settings",
              "Device integrity signals, installation identifier",
            ],
            [
              <strong key="p">RevenueCat</strong>,
              "Manages Henstel Pro subscriptions bought through Google Play",
              "Account identifier, purchase and subscription status, price and currency",
            ],
            [
              <strong key="p">Google Play</strong>,
              "Distributes the app and processes payments",
              "Handled under Google Play's own terms; we do not receive your card details",
            ],
            [
              <strong key="p">OneSignal</strong>,
              "Push notification delivery",
              "Notification identifier, account identifier, device type",
            ],
            [
              <strong key="p">Sentry</strong>,
              "Crash and error reporting",
              "Technical diagnostics: app version, device model, operating system, error details",
            ],
            [
              <strong key="p">Stream Chat</strong>,
              "In-app support chat",
              "Your account identifier, display name and the messages you send",
            ],
            [
              <strong key="p">Wiredash</strong>,
              "In-app feedback",
              "Your message and an optional screenshot you choose to send",
            ],
            [
              <strong key="p">Amazon (Associates)</strong>,
              "Affiliate product links",
              "Nothing from your account; Amazon's own policy applies once you follow a link",
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
          <a href={`${HENSTEL_PUBLIC_URL}/delete-account`}>
            {HENSTEL_PUBLIC_URL}/delete-account
          </a>
          . Deletion is permanent.
        </p>
        <p>
          <strong>What is deleted when you delete your account:</strong>
        </p>
        <ul>
          <li>Your profile and sign-in account</li>
          <li>
            Your pantry, cookbook content and saved preferences in the cloud
          </li>
          <li>Your profile picture and other files you uploaded</li>
          <li>Your support chat history and feedback linked to your account</li>
        </ul>
        <p>
          <strong>What is not deleted, or not immediately:</strong>
        </p>
        <ul>
          <li>
            <strong>Data on your own device</strong>, which you control; remove
            it by uninstalling the app or clearing its data.
          </li>
          <li>
            <strong>Purchase and subscription records</strong>, which we, Google
            Play and our subscription provider must keep under tax and
            accounting law. A Google Play subscription is not cancelled by
            deleting your account — cancel it in Google Play.
          </li>
          <li>
            <strong>Routine hosting backups.</strong> Our hosting provider takes
            encrypted backups. Deleted records may remain in those backups until
            they are overwritten in the normal cycle — currently up to{" "}
            <strong>{HENSTEL_BACKUP_RETENTION}</strong>. We do not restore a
            deleted account&apos;s data.
          </li>
          <li>
            <strong>Analytics, crash and push-notification records.</strong>{" "}
            These are kept under a pseudonymous account or device identifier,
            only as long as needed to improve the Service or as the
            provider&apos;s retention settings allow. You can ask us to delete
            or anonymise those linked to you by contacting us.
          </li>
        </ul>
        <p>
          <strong>Other retention.</strong> Account and kitchen data is kept
          until you delete it or your account.
        </p>
      </section>

      <section>
        <h2 id="data-security">Data Security</h2>
        <p>
          Data in transit between the app and our servers is encrypted, and our
          hosting provider encrypts stored data. Access to each person&apos;s
          records is restricted by database access rules, and we limit which
          people at Paul Kreations can reach production systems. No method of
          transmission or storage is 100% secure, and we cannot guarantee
          absolute security. If a breach affecting your personal data occurs, we
          will notify you and the relevant authority as required by law.
        </p>
      </section>

      <section>
        <h2 id="children">Children</h2>
        <p>
          Henstel is for people aged {HENSTEL_MIN_AGE} and over. We do not
          knowingly collect personal data from children under {HENSTEL_MIN_AGE}.
          If you believe a child under {HENSTEL_MIN_AGE} has given us personal
          data, contact us and we will delete it. Where the law requires a
          parent or guardian&apos;s consent for a person under 18, that consent
          must be given before the person uses Henstel.
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
          <li>
            withdraw your consent at any time, as easily as you gave it; for
            example by switching off notifications in your phone&apos;s
            settings. Withdrawal does not affect what happened before;
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
          You can exercise most rights in the app; for anything else contact us
          using the details below. We aim to respond within 30 days.
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
            <strong>Name:</strong> {HENSTEL_GRIEVANCE_OFFICER.name}
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${HENSTEL_GRIEVANCE_OFFICER.email}`}>
              {HENSTEL_GRIEVANCE_OFFICER.email}
            </a>
          </li>
          <li>
            <strong>Address:</strong> {HENSTEL_GRIEVANCE_OFFICER.address}
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
            <a href={`mailto:${HENSTEL_SUPPORT_EMAIL}`}>
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
