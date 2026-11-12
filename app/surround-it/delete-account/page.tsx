import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/surround-it/legal-shell";
import { SurroundItDeleteAccountForm } from "@/components/surround-it/delete-account-form";
import { BASE_URL } from "@/lib/config";
import {
  SURROUND_IT_BACKUP_RETENTION,
  SURROUND_IT_LEGAL_LAST_UPDATED,
  SURROUND_IT_RESPONSE_TARGET,
  SURROUND_IT_SUPPORT_EMAIL,
} from "@/lib/data/surround-it-legal";

// Google Play's data-deletion form points here, so it must work for someone who
// no longer has the app. Wording follows the "Account Deletion and Data
// Retention" section of the Privacy Policy — keep the two in step.

export const metadata: Metadata = {
  title: "Delete Your Data",
  description:
    "Delete your Surround It online account and data — by request, whether or not you still have the game.",
  alternates: { canonical: `${BASE_URL}/surround-it/delete-account` },
};

export default function SurroundItDeleteAccountPage() {
  return (
    <LegalShell
      title="Delete Your Data"
      lastUpdated={SURROUND_IT_LEGAL_LAST_UPDATED}
    >
      <section>
        <p>
          <strong>Surround It</strong>, by developer{" "}
          <strong>Paul Kreations</strong>, lets you ask for your online account
          and the data linked to it to be deleted, whether or not you still have
          the game installed. If you only played offline, nothing about you is
          stored on our servers. Deletion is permanent and cannot be undone.
        </p>
      </section>

      <section>
        <h2 id="how-to-delete-your-data">How to delete your data</h2>
        <ul>
          <li>
            <strong>Without the app:</strong> use the request form below, or
            email{" "}
            <a href={"mailto:" + SURROUND_IT_SUPPORT_EMAIL}>
              {SURROUND_IT_SUPPORT_EMAIL}
            </a>{" "}
            from the Google account email you play with. We confirm the request
            comes from that address before deleting anything.
          </li>
          <li>
            <strong>Signing out</strong> of the game (Settings → Sign Out) ends
            your session on the device but does not delete your server data, so
            please send a request as well.
          </li>
        </ul>
      </section>

      <section>
        <h2 id="what-is-deleted">What is deleted</h2>
        <ul>
          <li>
            Your online game account, which was created from your Google sign-in
          </li>
          <li>Your player name, leaderboard and ranked-match records</li>
          <li>Cloud-saved progress linked to your account</li>
          <li>Notification identifiers linked to your account</li>
        </ul>
      </section>

      <section>
        <h2 id="what-is-not-deleted-or-not-immediately">
          What is not deleted, or not immediately
        </h2>
        <ul>
          <li>
            <strong>Data held by Google.</strong> Google Play Games
            leaderboards, achievements and your Google account are run by
            Google, not by us — manage or delete them in Google Play Games and
            your Google account settings.
          </li>
          <li>
            <strong>Purchase records,</strong> if any, which we and Google Play
            must keep under tax and accounting law.
          </li>
          <li>
            <strong>Routine hosting backups.</strong> Deleted records may remain
            in encrypted backups until they are overwritten in the normal cycle,
            currently up to <strong>{SURROUND_IT_BACKUP_RETENTION}</strong>. We
            do not restore deleted data.
          </li>
          <li>
            <strong>Analytics, crash and advertising records</strong> held under
            pseudonymous identifiers by our service providers until their own
            retention periods end. You can ask us to delete or anonymise those
            linked to you.
          </li>
        </ul>
        <p>
          The full detail is in the{" "}
          <Link href="/surround-it/privacy#account-deletion-and-data-retention">
            Privacy Policy
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="data-on-your-own-device">Data stored only on your device</h2>
        <p>
          Your offline progress, settings and any locally stored XP or tokens
          stay on your phone, so we cannot delete them for you. Uninstalling the
          game, or clearing its data in your device settings, removes them.
        </p>
      </section>

      <section>
        <h2 id="request-deletion">Request deletion without the app</h2>
        <p>
          Enter the email address of the Google account you use to play Surround
          It. We confirm the request comes from that address before deleting. We
          aim to reply within {SURROUND_IT_RESPONSE_TARGET}.
        </p>
        <SurroundItDeleteAccountForm />
      </section>

      <section>
        <h2 id="contact-us">Contact Us</h2>
        <ul>
          <li>
            By email:{" "}
            <a href={"mailto:" + SURROUND_IT_SUPPORT_EMAIL}>
              {SURROUND_IT_SUPPORT_EMAIL}
            </a>
          </li>
        </ul>
      </section>
    </LegalShell>
  );
}
