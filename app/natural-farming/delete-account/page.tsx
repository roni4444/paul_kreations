import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/natural-farming/legal-shell";
import { NaturalFarmingDeleteAccountForm } from "@/components/natural-farming/delete-account-form";
import { BASE_URL } from "@/lib/config";
import {
  NATURAL_FARMING_BACKUP_RETENTION,
  NATURAL_FARMING_LEGAL_LAST_UPDATED,
  NATURAL_FARMING_RESPONSE_TARGET,
  NATURAL_FARMING_SUPPORT_EMAIL,
} from "@/lib/data/natural-farming-legal";

// Google Play's data-deletion form points here, so it must work for someone who
// no longer has the app. Wording follows the "Account Deletion and Data
// Retention" section of the Privacy Policy — keep the two in step.

export const metadata: Metadata = {
  title: "Delete Your Data",
  description:
    "Delete the data linked to your Natural Farming profile — by request, whether or not you still have the app.",
  alternates: { canonical: `${BASE_URL}/natural-farming/delete-account` },
};

export default function NaturalFarmingDeleteAccountPage() {
  return (
    <LegalShell
      title="Delete Your Data"
      lastUpdated={NATURAL_FARMING_LEGAL_LAST_UPDATED}
    >
      <section>
        <p>
          <strong>Natural Farming</strong>, by developer{" "}
          <strong>Paul Kreations</strong>, does not use email-and-password
          accounts. Your community profile, learning progress and analytics data
          are linked to an anonymous identifier generated for your device. You
          can ask us to delete the data linked to your device and profile,
          whether or not you still have the app installed. Deletion is permanent
          and cannot be undone.
        </p>
      </section>

      <section>
        <h2 id="how-to-delete-your-data">How to delete your data</h2>
        <ul>
          <li>
            <strong>Without any sign-in:</strong> use the request form below, or
            email{" "}
            <a href={"mailto:" + NATURAL_FARMING_SUPPORT_EMAIL}>
              {NATURAL_FARMING_SUPPORT_EMAIL}
            </a>
            . Tell us the <strong>display name</strong> on your community
            profile and, if you added them, the phone number or email shown in
            it, so we can find it.
          </li>
          <li>
            <strong>Verification:</strong> because profiles are anonymous, we
            may ask you for something only the profile&apos;s owner would know —
            for example, the content of a recent post — before deleting
            anything.
          </li>
          <li>
            <strong>Clearing the app on your phone</strong> (Settings → Apps →
            Natural Farming → Storage → Clear data, or uninstalling) removes the
            copy on your device only. It does not delete what is held on our
            servers, so please send a request as well.
          </li>
        </ul>
      </section>

      <section>
        <h2 id="what-is-deleted">What is deleted</h2>
        <ul>
          <li>
            Your community profile (display name and any phone number, email or
            place details you added)
          </li>
          <li>Your posts, replies and uploaded photos</li>
          <li>
            Your quiz results, streaks, badges and learning progress linked to
            your identifier
          </li>
          <li>Messages you sent through the in-app contact form</li>
          <li>
            Approximate-location records and notification tags that we can link
            to your profile; we also ask our analytics and notification
            providers to delete data linked to your identifier
          </li>
        </ul>
      </section>

      <section>
        <h2 id="what-is-not-deleted-or-not-immediately">
          What is not deleted, or not immediately
        </h2>
        <ul>
          <li>
            <strong>Moderation and abuse records</strong> — for example reports
            about content and decisions to remove it — kept as long as needed to
            keep the community safe.
          </li>
          <li>
            <strong>Routine hosting backups.</strong> Deleted records may remain
            in our hosting provider&apos;s encrypted backups until they are
            overwritten in the normal cycle, currently up to{" "}
            <strong>{NATURAL_FARMING_BACKUP_RETENTION}</strong>. We do not
            restore deleted data.
          </li>
          <li>
            <strong>Anonymous or aggregated analytics and crash reports</strong>{" "}
            that cannot reasonably be linked back to you, and records held by
            third-party providers until their own retention periods end.
          </li>
          <li>
            <strong>Anonymous usage when no profile was created.</strong> If you
            only used lessons and quizzes, we may have little more than an
            anonymous identifier. We cannot find it without your device&apos;s
            identifier, which the app does not show you.
          </li>
        </ul>
        <p>
          The full detail is in the{" "}
          <Link href="/natural-farming/privacy#account-deletion-and-data-retention">
            Privacy Policy
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="data-on-your-own-device">Data stored only on your device</h2>
        <p>
          Your lessons, language choice, reading settings and progress are also
          stored on your phone. We cannot delete that for you; uninstalling the
          app or clearing its data removes it.
        </p>
      </section>

      <section>
        <h2 id="request-deletion">Request deletion without the app</h2>
        <p>
          Enter an email address we can reply to, and — if you have a community
          profile — the display name or contact details that appear in it. We
          confirm the request is genuine before deleting. We aim to reply within{" "}
          {NATURAL_FARMING_RESPONSE_TARGET}.
        </p>
        <NaturalFarmingDeleteAccountForm />
      </section>

      <section>
        <h2 id="contact-us">Contact Us</h2>
        <ul>
          <li>
            By email:{" "}
            <a href={"mailto:" + NATURAL_FARMING_SUPPORT_EMAIL}>
              {NATURAL_FARMING_SUPPORT_EMAIL}
            </a>
          </li>
        </ul>
      </section>
    </LegalShell>
  );
}
