import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/natural-farming/legal-shell";
import { LegalTable } from "@/components/natural-farming/legal-table";
import { BASE_URL } from "@/lib/config";
import {
  NATURAL_FARMING_BACKUP_RETENTION,
  NATURAL_FARMING_GRIEVANCE_OFFICER,
  NATURAL_FARMING_LEGAL_LAST_UPDATED,
  NATURAL_FARMING_MIN_AGE,
  NATURAL_FARMING_PUBLIC_URL,
  NATURAL_FARMING_SUPPORT_EMAIL,
} from "@/lib/data/natural-farming-legal";

// Written from the Natural Farming app's actual behaviour (code review of the
// Android app). Headings carry stable ids so the app can deep-link to them,
// e.g. /natural-farming/privacy#account-deletion-and-data-retention. Do not
// rename a heading without keeping its old id available.

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Natural Farming — what personal data we collect, why, who we share it with, how long we keep it, and the choices you have.",
  alternates: { canonical: `${BASE_URL}/natural-farming/privacy` },
};

export default function NaturalFarmingPrivacyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      lastUpdated={NATURAL_FARMING_LEGAL_LAST_UPDATED}
    >
      <section
        aria-labelledby="changes-in-this-version"
        className="border border-[#D6E6D6] bg-[#FFFFFF] px-4 py-4"
      >
        <h2 id="changes-in-this-version">
          Changes in this version ({NATURAL_FARMING_LEGAL_LAST_UPDATED})
        </h2>
        <ul>
          <li>
            Rewritten to describe the anonymous device identifier, community
            profiles, optional location, analytics, advertising and every
            service provider we use
          </li>
          <li>Data deletion process and retention details added</li>
          <li>Minimum age of {NATURAL_FARMING_MIN_AGE} stated</li>
        </ul>
        <p>
          Previous version:{" "}
          <Link href="/natural-farming/privacy/archive/2025-06-01">
            1 June 2025
          </Link>
        </p>
      </section>

      <section>
        <h2 id="introduction">Introduction</h2>
        <p>
          Natural Farming (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
          is an educational Android app published by Paul Kreations. This policy
          covers the Natural Farming app and the website at{" "}
          <a href={NATURAL_FARMING_PUBLIC_URL}>{NATURAL_FARMING_PUBLIC_URL}</a>{" "}
          (together, the &quot;Service&quot;). It explains what personal data we
          collect, why, who we share it with, how long we keep it, and the
          choices you have. If you do not agree with it, please do not use the
          Service.
        </p>
        <p>
          <strong>In short:</strong> you can learn without registering. The app
          creates an anonymous identifier for your device and uses it to
          remember your progress. If you join the Community, your profile and
          posts are visible to other users. The app shows ads. We do not sell
          your personal data.
        </p>
      </section>

      <section>
        <h2 id="who-is-responsible-for-your-data">
          Who is responsible for your data
        </h2>
        <p>
          For the data described in this policy, Natural Farming (operated by
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
            <strong>Community profile (optional)</strong> — if you join the
            Community, a display name, the kind of user you are (for example a
            farmer, and which kind of farmer), and optionally a place name and
            its coordinates, a phone number and an email address. Your display
            name, user type and place name are shown to other users with your
            posts. A phone number and email address are optional, are stored by
            us, and are used only by our administrators to contact you if
            needed; they are not shown to other users.
          </li>
          <li>
            <strong>Posts, replies and photos</strong> — what you write in the
            Community and any photo you attach. These are visible to other users
            of the app.
          </li>
          <li>
            <strong>Reports</strong> — if you flag a post or reply, the reason
            you choose.
          </li>
          <li>
            <strong>Contact messages</strong> — what you send through the in-app
            contact form, including any contact details you type.
          </li>
          <li>
            <strong>Quiz answers and progress</strong> — your answers to lesson
            and daily quizzes, results, badges and streaks.
          </li>
        </ul>

        <h3 id="information-collected-automatically">
          Information collected automatically
        </h3>
        <ul>
          <li>
            <strong>Anonymous device identifier</strong> — generated by the app
            for your installation. It links your progress, quiz results,
            community profile and notification settings to your device, and is
            used when you take part in the Community. It is not your Android
            advertising ID, and the app does not show it to you.
          </li>
          <li>
            <strong>Approximate location (optional)</strong> — if you allow it,
            the app records your approximate location once each time you open
            it, to understand which regions use the app. You are asked on first
            launch and can turn it off any time in Settings → Location Sharing.
            If you add a place to your Community profile, the app may use your
            device&apos;s location and Google Places to suggest it.
          </li>
          <li>
            <strong>Usage analytics</strong> — events such as app launches,
            session length, screens viewed, time on screen, lessons opened and
            completed (with lesson titles), scroll depth, quiz activity and
            Community actions, linked to the anonymous identifier, together with
            device and app details.
          </li>
          <li>
            <strong>Crash and performance diagnostics</strong> — technical
            information when the app fails or runs slowly. We configure our
            error-reporting tool to include default personal data such as IP
            address, to attach a screenshot and the on-screen view hierarchy
            when an error occurs, to record sessions of what happened on screen
            for a sample of sessions and whenever an error occurs, and to record
            performance traces and profiles. Anything shown on screen at that
            moment — which may include text you typed — can be part of a report.
          </li>
          <li>
            <strong>Notification identifiers</strong> — if you allow
            notifications, an identifier and settings so we can send learning
            reminders. We register your anonymous identifier with our
            notification provider.
          </li>
          <li>
            <strong>Advertising data</strong> — the app shows ads from Google
            AdMob. Google and its advertising partners may use your Android
            advertising ID and device data to select and measure ads, as
            described in the Advertising section below.
          </li>
        </ul>
      </section>

      <section>
        <h2 id="how-we-use-your-information">How We Use Your Information</h2>
        <ul>
          <li>Provide, operate and maintain the Service</li>
          <li>Remember your progress, streaks and badges</li>
          <li>Run and moderate the Community</li>
          <li>
            Understand which regions use the app and how, and improve lessons
            and quizzes
          </li>
          <li>Send learning reminders you have allowed</li>
          <li>Show advertising that helps fund the app</li>
          <li>Diagnose and fix crashes and errors</li>
          <li>Reply to your messages and provide support</li>
          <li>Find and prevent abuse, spam and fraud</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p>
          We do <strong>not</strong> sell your personal data.
        </p>
      </section>

      <section>
        <h2 id="community">The Community and what others can see</h2>
        <p>
          Your display name, user type, place name, posts, replies and photos
          are visible to other users of the app and may be stored for as long as
          the Service runs unless you ask us to delete them. Other users may
          copy or screenshot what you post. Please do not post personal or
          sensitive information. We may review reports and remove content or
          block a device from posting.
        </p>
      </section>

      <section>
        <h2 id="advertising">Advertising</h2>
        <p>
          Natural Farming is supported by ads served by Google AdMob. Where the
          law requires it (for example in the EEA and UK), the app shows
          Google&apos;s consent form before loading personalised ads, and you
          can change your choice later from the app&apos;s privacy options. You
          can also reset or opt out of ads personalisation in your Android
          settings (Settings → Google → Ads). We do not control what data Google
          and advertisers collect; see Google&apos;s privacy policy.
        </p>
      </section>

      <section>
        <h2 id="third-party-services">Third-Party Services</h2>
        <p>
          We use the following service providers to operate the app. Each
          processes the data described in this policy under its own terms and
          data-protection commitments.
        </p>
        <LegalTable
          caption="Service providers we use"
          columns={["Provider", "What it does", "Data involved"]}
          rows={[
            [
              <strong key="p">Supabase</strong>,
              "Database, file storage and server functions for community profiles, posts, replies, photos, quiz data, contact messages and location records",
              "Anonymous device identifier, community profile, posts and photos, quiz results, contact messages, approximate location",
            ],
            [
              <strong key="p">PostHog</strong>,
              "Product analytics",
              "Event names and properties (screens, lessons, quizzes), anonymous identifier, device and app details",
            ],
            [
              <strong key="p">Sentry</strong>,
              "Crash, performance and error reporting, including session replay, screenshots and view hierarchy",
              "Technical diagnostics, IP address and other default personal data, on-screen content at the time of an error",
            ],
            [
              <strong key="p">OneSignal</strong>,
              "Push notification delivery",
              "Notification identifier, anonymous identifier, device type and tags",
            ],
            [
              <strong key="p">
                Google AdMob &amp; User Messaging Platform
              </strong>,
              "Advertising and the ad-consent form",
              "Advertising ID, device and ad-interaction data, consent choices",
            ],
            [
              <strong key="p">Google Maps / Places</strong>,
              "Place suggestions for your Community profile",
              "Text you search and your approximate location, only if you use that feature",
            ],
            [
              <strong key="p">Google Play</strong>,
              "Distributes the app and handles app updates and reviews",
              "Handled under Google Play's own terms",
            ],
          ]}
        />
        <p>
          Several of these providers store data outside India. Where personal
          data is transferred outside India we rely on the provider&apos;s
          contractual safeguards, and the DPDP Act permits such transfers except
          to countries the Government of India restricts. We may also disclose
          information if required by law or to protect rights, safety and
          security.
        </p>
      </section>

      <section>
        <h2 id="permissions">Device permissions</h2>
        <ul>
          <li>
            <strong>Internet access</strong> — to update lessons, run the
            Community and send analytics
          </li>
          <li>
            <strong>Notifications</strong> — to send learning reminders you
            allow
          </li>
          <li>
            <strong>Location (approximate)</strong> — optional; to understand
            regional use and suggest places for your profile
          </li>
          <li>
            <strong>Photos / camera</strong> — only when you attach a photo to a
            post
          </li>
        </ul>
        <p>
          You can change any permission in your phone&apos;s settings. The
          lessons keep working if you say no.
        </p>
      </section>

      <section>
        <h2 id="account-deletion-and-data-retention">
          Account Deletion and Data Retention
        </h2>
        <p>
          <strong>How to delete.</strong> Natural Farming has no email-and-
          password account. Clearing the app&apos;s data on your phone removes
          only the copy on your device. To delete what we hold on our servers,
          use the form at{" "}
          <a href={`${NATURAL_FARMING_PUBLIC_URL}/delete-account`}>
            {NATURAL_FARMING_PUBLIC_URL}/delete-account
          </a>{" "}
          or email{" "}
          <a href={`mailto:${NATURAL_FARMING_SUPPORT_EMAIL}`}>
            {NATURAL_FARMING_SUPPORT_EMAIL}
          </a>
          , and tell us the display name (and any phone number or email) on your
          Community profile so we can find it. Because profiles are anonymous,
          we may ask you to confirm something only its owner would know.
          Deletion is permanent.
        </p>
        <p>
          <strong>What is deleted:</strong> your Community profile; your posts,
          replies and uploaded photos; quiz results, streaks, badges and
          progress linked to your identifier; contact messages you sent; and
          approximate-location records and notification tags we can link to your
          profile. We also ask our analytics and notification providers to
          delete data linked to your identifier.
        </p>
        <p>
          <strong>What is not deleted, or not immediately:</strong>
        </p>
        <ul>
          <li>
            <strong>Data on your own device</strong>, which you control.
          </li>
          <li>
            <strong>Moderation and abuse records</strong> (for example reports
            and decisions to remove content), kept as long as needed to keep the
            Community safe.
          </li>
          <li>
            <strong>Routine hosting backups.</strong> Deleted records may remain
            in encrypted backups until they are overwritten in the normal cycle
            — currently up to{" "}
            <strong>{NATURAL_FARMING_BACKUP_RETENTION}</strong>. We do not
            restore deleted data.
          </li>
          <li>
            <strong>Anonymous or aggregated analytics and diagnostics</strong>{" "}
            that cannot reasonably be linked back to you, and records held by
            third-party providers until their own retention periods end.
          </li>
          <li>
            <strong>Usage without a profile.</strong> If you never created a
            Community profile, we may hold little more than an anonymous
            identifier, which we cannot match to you without the identifier
            itself.
          </li>
        </ul>
      </section>

      <section>
        <h2 id="data-security">Data Security</h2>
        <p>
          Data in transit between the app and our servers is encrypted, and our
          hosting provider encrypts stored data. We limit which people at Paul
          Kreations can reach production systems. No method of transmission or
          storage is 100% secure, and we cannot guarantee absolute security. If
          a breach affecting your personal data occurs, we will notify you and
          the relevant authority as required by law.
        </p>
      </section>

      <section>
        <h2 id="children">Children</h2>
        <p>
          Natural Farming is for people aged {NATURAL_FARMING_MIN_AGE} and over.
          We do not knowingly collect personal data from children under{" "}
          {NATURAL_FARMING_MIN_AGE}. If you believe a child under{" "}
          {NATURAL_FARMING_MIN_AGE} has given us personal data, contact us and
          we will delete it. Where the law requires a parent or guardian&apos;s
          consent for a person under 18, that consent must be given before the
          person joins the Community.
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
          <li>correct or update it (for example by editing your profile);</li>
          <li>erase it (see Account Deletion and Data Retention);</li>
          <li>
            withdraw your consent at any time, as easily as you gave it — for
            example by turning off location sharing in Settings, changing your
            ad choices in the app&apos;s privacy options, or switching off
            notifications. Withdrawal does not affect what happened before;
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
          For any request, contact us using the details below. We aim to respond
          within 30 days.
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
            <strong>Name:</strong> {NATURAL_FARMING_GRIEVANCE_OFFICER.name}
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${NATURAL_FARMING_GRIEVANCE_OFFICER.email}`}>
              {NATURAL_FARMING_GRIEVANCE_OFFICER.email}
            </a>
          </li>
          <li>
            <strong>Address:</strong>{" "}
            {NATURAL_FARMING_GRIEVANCE_OFFICER.address}
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
            <a href={`mailto:${NATURAL_FARMING_SUPPORT_EMAIL}`}>
              {NATURAL_FARMING_SUPPORT_EMAIL}
            </a>
          </li>
          <li>
            By visiting:{" "}
            <a href={NATURAL_FARMING_PUBLIC_URL}>
              {NATURAL_FARMING_PUBLIC_URL}
            </a>
          </li>
        </ul>
      </section>
    </LegalShell>
  );
}
