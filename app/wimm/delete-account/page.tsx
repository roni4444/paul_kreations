import type { Metadata } from "next";
import { LegalShell } from "@/components/wimm/legal-shell";
import { WimmDeleteAccountForm } from "@/components/wimm/delete-account-form";
import { BASE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Delete Your Account",
  description:
    "Request deletion of your Where Is My Money? account and data — by Paul Kreations.",
  alternates: { canonical: `${BASE_URL}/wimm/delete-account` },
};

const HEADING = "font-[family-name:var(--font-wimm-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export default function WimmDeleteAccountPage() {
  return (
    <LegalShell title="Delete Your Account" lastUpdated="August 10, 2026">
      <section>
        <p>
          <strong>Where Is My Money?</strong>, by developer{" "}
          <strong>Paul Kreations</strong>, lets you request deletion of your
          account and associated data at any time — whether or not you still
          have the app installed.
        </p>
      </section>

      {/* ── Steps — kept prominent and first, per Play Store's requirement ── */}
      <section>
        <h2>How to request deletion</h2>
        <p>There are two ways to delete your account:</p>
        <ul>
          <li>
            <strong>In the app</strong> — go to Settings → Account → Delete
            Account, confirm, and your account and synced data are deleted
            immediately.{" "}
            <em>
              (This in-app flow ships in an upcoming app update — until then,
              use the form below.)
            </em>
          </li>
          <li>
            <strong>From this page</strong> — fill out the form below with the
            email address (and, if different, the username or phone number) you
            used to sign up. We&apos;ll verify and process your request.
          </li>
        </ul>
      </section>

      {/* ── Data specifics — the part Play Store checks most carefully ──── */}
      <section>
        <h2>What gets deleted</h2>
        <p>
          Where Is My Money? is local-first: most of your financial data
          (transactions, budgets, vehicle records, and so on) lives only on your
          device and is never sent to our servers unless you turn on cloud sync.
          Deleting the app from your device, or clearing its storage in your
          device settings, permanently removes that on-device data immediately —
          we have no copy of it and cannot delete what we never received.
        </p>
        <p>For data that does reach our servers, a deletion request removes:</p>
        <ul>
          <li>Your account profile (name, email, authentication record)</li>
          <li>
            Any cloud-synced backup of your financial data, if cloud sync was
            enabled
          </li>
          <li>
            Family sharing group memberships and allowances tied to your account
          </li>
          <li>
            Your entry in our waitlist/newsletter list, if you signed up with
            the same email
          </li>
        </ul>
      </section>

      <section>
        <h2>What may be retained, and for how long</h2>
        <p>
          <span className={`${MONO} text-[10px] text-[#B27B1F] uppercase`}>
            Confirm before relying on this section
          </span>
        </p>
        <p>
          We may retain limited data for a short period after deletion for
          operational and legal reasons, for example:
        </p>
        <ul>
          <li>
            Backup snapshots may persist for up to 90 days as part of routine
            backup rotation, after which they are automatically purged
          </li>
          <li>
            Records required for tax, billing, or fraud-prevention obligations
            (e.g. payment/subscription history) may be retained for as long as
            applicable law requires
          </li>
          <li>
            Aggregated, de-identified analytics that can no longer be linked
            back to you are not considered personal data and are not deleted
          </li>
        </ul>
        <p>
          We aim to process every deletion request within{" "}
          <strong>30 days</strong> and will email you once it&apos;s done.
        </p>
      </section>

      <section>
        <h2>Submit a request</h2>
        <WimmDeleteAccountForm />
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>Questions about this process:</p>
        <ul>
          <li>
            By email:{" "}
            <a href="mailto:support@mail.paulkreations.com">
              support@mail.paulkreations.com
            </a>
          </li>
        </ul>
      </section>
    </LegalShell>
  );
}
