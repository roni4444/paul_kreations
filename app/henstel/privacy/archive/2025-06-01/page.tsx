import type { Metadata } from "next";
import { ArchiveNotice } from "@/components/henstel/archive-notice";
import { LegalShell } from "@/components/henstel/legal-shell";
import { BASE_URL } from "@/lib/config";

// ARCHIVED COPY — the Privacy Policy as it stood on 1 June 2025 (the generic
// policy previously served at /apps/henstel/privacy), kept because people used
// the app under this version before it was replaced on 12 November 2026. Do
// not edit the body. It is excluded from search indexing and from the sitemap.
export const metadata: Metadata = {
  title: "Privacy Policy (archived 1 June 2025)",
  description:
    "Archived version of the Privacy Policy for Henstel, in effect until 12 November 2026.",
  alternates: { canonical: `${BASE_URL}/henstel/privacy/archive/2025-06-01` },
  robots: { index: false, follow: false },
};

export default function HenstelPrivacyArchive20250601Page() {
  return (
    <LegalShell title="Privacy Policy" lastUpdated="June 1, 2025">
      <ArchiveNotice
        document="Privacy Policy"
        currentHref="/henstel/privacy"
        supersededOn="12 November 2026"
        note="The current Privacy Policy describes the app as it now works, including accounts, service providers and data retention. This earlier version is kept as a record only."
      />

      <section>
        <h2>Introduction</h2>
        <p>
          This Privacy Policy explained how Henstel (published by Paul
          Kreations) handled information when you used the app. It applied to
          the app as published on Google Play.
        </p>
      </section>

      <section>
        <h2>Information collected</h2>
        <p>The policy listed the following:</p>
        <ul>
          <li>Anonymized usage statistics (screens visited, features used)</li>
          <li>
            Crash reports and error logs — no personal content is included
          </li>
          <li>
            Device information such as OS version and device model, used for
            compatibility
          </li>
        </ul>
      </section>

      <section>
        <h2>Permissions</h2>
        <ul>
          <li>
            INTERNET — Required to load recipes, sync data, and deliver app
            updates.
          </li>
          <li>
            ACCESS_NETWORK_STATE — Used to check connectivity before making
            network requests.
          </li>
        </ul>
      </section>

      <section>
        <h2>Third-party services</h2>
        <p>The policy named these third-party services:</p>
        <ul>
          <li>Google Firebase (Analytics &amp; Crashlytics)</li>
          <li>Google Play Services</li>
        </ul>
      </section>

      <section>
        <h2>Children</h2>
        <p>
          The app was not directed at children, and no personal data was
          knowingly collected from children.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about that policy could be sent to
          debapriyopaul.dp@gmail.com. For the current policy, please use
          support@paulkreations.com.
        </p>
      </section>
    </LegalShell>
  );
}
