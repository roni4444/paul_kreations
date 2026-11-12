import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/henstel/legal-shell";
import { HenstelDeleteAccountForm } from "@/components/henstel/delete-account-form";
import { BASE_URL } from "@/lib/config";
import {
  HENSTEL_BACKUP_RETENTION,
  HENSTEL_LEGAL_LAST_UPDATED,
  HENSTEL_RESPONSE_TARGET,
  HENSTEL_SUPPORT_EMAIL,
} from "@/lib/data/henstel-legal";

// Google Play's data-deletion form points here, so it must work for someone who
// no longer has the app. Wording follows the "Account Deletion and Data
// Retention" section of the Privacy Policy — keep the two in step.

export const metadata: Metadata = {
  title: "Delete Your Data",
  description:
    "Delete your Henstel account and data — in the app, or by request if you no longer have the app.",
  alternates: { canonical: `${BASE_URL}/henstel/delete-account` },
};

export default function HenstelDeleteAccountPage() {
  return (
    <LegalShell
      title="Delete Your Account"
      lastUpdated={HENSTEL_LEGAL_LAST_UPDATED}
    >
      <section>
        <p>
          <strong>Henstel</strong>, by developer <strong>Paul Kreations</strong>
          , lets you delete your account and its data at any time, whether or
          not you still have the app installed. Deletion is permanent and cannot
          be undone.
        </p>
      </section>

      <section>
        <h2 id="how-to-delete-your-data">How to delete your data</h2>
        <ul>
          <li>
            <strong>In the app:</strong> open Settings → Delete Account.
          </li>
          <li>
            <strong>Without the app:</strong> use the request form below, or
            email{" "}
            <a href={"mailto:" + HENSTEL_SUPPORT_EMAIL}>
              {HENSTEL_SUPPORT_EMAIL}
            </a>{" "}
            from the email address of the account. We confirm that the request
            comes from the account&apos;s email address before deleting
            anything.
          </li>
        </ul>
      </section>

      <section>
        <h2 id="what-is-deleted">What is deleted</h2>
        <ul>
          <li>
            Your profile (name, date of birth, sex, countries, favourite
            cuisines) and your sign-in account
          </li>
          <li>
            Your pantry, cookbook content and saved preferences in the cloud
          </li>
          <li>Your profile picture and other files you uploaded</li>
          <li>Your support chat history and feedback linked to your account</li>
        </ul>
      </section>

      <section>
        <h2 id="what-is-not-deleted-or-not-immediately">
          What is not deleted, or not immediately
        </h2>
        <ul>
          <li>
            <strong>Purchase and subscription records,</strong> which we, Google
            Play and our subscription provider must keep under tax and
            accounting law. A Google Play subscription is not cancelled when you
            delete your account — cancel it in Google Play.
          </li>
          <li>
            <strong>Routine hosting backups.</strong> Deleted records may remain
            in our hosting provider&apos;s encrypted backups until they are
            overwritten in the normal cycle, currently up to{" "}
            <strong>{HENSTEL_BACKUP_RETENTION}</strong>. We do not restore a
            deleted account&apos;s data.
          </li>
          <li>
            <strong>Analytics, crash and push-notification records.</strong>{" "}
            These are kept under a pseudonymous account or device identifier,
            only as long as needed to improve the Service or as the
            provider&apos;s retention settings allow. You can ask us to delete
            or anonymise those linked to you.
          </li>
        </ul>
        <p>
          The full detail is in the{" "}
          <Link href="/henstel/privacy#account-deletion-and-data-retention">
            Privacy Policy
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="data-on-your-own-device">Data stored only on your device</h2>
        <p>
          Some data stays on your phone and is not on our servers, so we cannot
          delete it for you. Uninstalling the app, or clearing its data in your
          device settings, removes it.
        </p>
      </section>

      <section>
        <h2 id="request-deletion">Request deletion without the app</h2>
        <p>
          Enter the email address you used for your Henstel account. We confirm
          the request comes from that address before deleting. We aim to reply
          within {HENSTEL_RESPONSE_TARGET}.
        </p>
        <HenstelDeleteAccountForm />
      </section>

      <section>
        <h2 id="contact-us">Contact Us</h2>
        <ul>
          <li>
            By email:{" "}
            <a href={"mailto:" + HENSTEL_SUPPORT_EMAIL}>
              {HENSTEL_SUPPORT_EMAIL}
            </a>
          </li>
        </ul>
      </section>
    </LegalShell>
  );
}
