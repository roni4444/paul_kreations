import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/wimm/legal-shell";
import { WimmDeleteAccountForm } from "@/components/wimm/delete-account-form";
import { BASE_URL } from "@/lib/config";
import {
  WIMM_BACKUP_RETENTION,
  WIMM_LEGAL_LAST_UPDATED,
  WIMM_RESPONSE_TARGET,
  WIMM_SUPPORT_EMAIL,
} from "@/lib/data/wimm-legal";

// Google Play's data-deletion form points here, so it must work for someone who
// no longer has the app. Wording follows the "Account Deletion and Data
// Retention" section of the Privacy Policy — keep the two in step.

export const metadata: Metadata = {
  title: "Delete Your Account",
  description:
    "Delete your Where is My Money? account and data — in the app, or by request if you no longer have the app.",
  alternates: { canonical: `${BASE_URL}/wimm/delete-account` },
};

export default function WimmDeleteAccountPage() {
  return (
    <LegalShell
      title="Delete Your Account"
      lastUpdated={WIMM_LEGAL_LAST_UPDATED}
    >
      <section>
        <p>
          <strong>Where is My Money?</strong>, by developer{" "}
          <strong>Paul Kreations</strong>, lets you delete your cloud account at
          any time, whether or not you still have the app installed. Deletion is
          permanent and cannot be undone.
        </p>
      </section>

      <section>
        <h2 id="how-to-delete-your-account">How to delete your account</h2>
        <ul>
          <li>
            <strong>In the app:</strong> open Settings → Delete Account.
          </li>
          <li>
            <strong>Without the app:</strong> use the request form below, or
            email{" "}
            <a href={`mailto:${WIMM_SUPPORT_EMAIL}`}>{WIMM_SUPPORT_EMAIL}</a>{" "}
            from the email address of the account. We confirm that the request
            comes from the account&apos;s email address before deleting
            anything, and we aim to reply within {WIMM_RESPONSE_TARGET}.
          </li>
        </ul>
      </section>

      <section>
        <h2 id="what-is-deleted">What is deleted</h2>
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
      </section>

      <section>
        <h2 id="what-is-not-deleted-or-not-immediately">
          What is not deleted, or not immediately
        </h2>
        <ul>
          <li>
            <strong>Referral Program enrollment.</strong> Your referral code and
            referral history are kept so that signing back in with the same
            Google account reconnects you to them. Ask us and we will delete
            this record.
          </li>
          <li>
            <strong>Payment and subscription records,</strong> which we and the
            app stores and payment processors must keep under tax and accounting
            law.
          </li>
          <li>
            <strong>Routine hosting backups.</strong> Deleted records may remain
            in our hosting provider&apos;s encrypted backups until they are
            overwritten in the normal cycle, currently up to{" "}
            <strong>{WIMM_BACKUP_RETENTION}</strong>. We do not restore a
            deleted account&apos;s data.
          </li>
          <li>
            <strong>
              Analytics, attribution, crash and push-notification records.
            </strong>{" "}
            These are kept under a pseudonymous account or device ID, not in
            your financial records, only as long as needed to improve the
            Service or as the provider&apos;s retention settings allow. You can
            ask us to delete or anonymize those linked to you.
          </li>
        </ul>
        <p>
          The full detail is in the{" "}
          <Link href="/wimm/privacy#account-deletion-and-data-retention">
            Privacy Policy
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="if-your-account-is-blocked-from-deletion">
          If your account is blocked from deletion
        </h2>
        <p>
          If your account still owns shared data that other people depend on
          (for example a family, joint goal, shared budget, trip group or shared
          subscription), the app will tell you what to hand over or remove
          first, so that other people&apos;s data is not lost without notice.
        </p>
      </section>

      <section>
        <h2 id="data-on-your-own-device">Data stored only on your device</h2>
        <p>
          By default your financial data stays on your device and is not on our
          servers, so we cannot delete it for you. Deleting the app, or its data
          in your device settings, removes it. Backup files you exported
          yourself are also yours to delete.
        </p>
      </section>

      <section>
        <h2 id="request-deletion">Request deletion without the app</h2>
        <p>
          Enter the email address you used for your account. We confirm the
          request comes from that address before deleting, and we aim to reply
          within {WIMM_RESPONSE_TARGET}.
        </p>
        <WimmDeleteAccountForm />
      </section>

      <section>
        <h2 id="contact-us">Contact Us</h2>
        <ul>
          <li>
            By email:{" "}
            <a href={`mailto:${WIMM_SUPPORT_EMAIL}`}>{WIMM_SUPPORT_EMAIL}</a>
          </li>
        </ul>
      </section>
    </LegalShell>
  );
}
