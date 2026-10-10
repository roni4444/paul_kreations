import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/wimm/legal-shell";
import { LegalTable } from "@/components/wimm/legal-table";
import { BASE_URL } from "@/lib/config";
import {
  WIMM_LEGAL_LAST_UPDATED,
  WIMM_SUPPORT_EMAIL,
} from "@/lib/data/wimm-legal";

// Written from an audit of what www.paulkreations.com/wimm actually sets or
// loads (code review + a live page load). If the site's scripts, analytics or
// auth change, update the tables below in the same change.

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookie Policy for the Where is My Money? website — the cookies and similar browser storage it uses.",
  alternates: { canonical: `${BASE_URL}/wimm/cookies` },
};

export default function WimmCookiesPage() {
  return (
    <LegalShell title="Cookie Policy" lastUpdated={WIMM_LEGAL_LAST_UPDATED}>
      <section>
        <h2 id="summary">In short</h2>
        <p>
          <strong>
            This website does not set cookies for visitors, and we do not use
            advertising or marketing cookies.
          </strong>{" "}
          Because of that we do not show a cookie banner. The website does keep
          one small item in your browser&apos;s session storage for error
          diagnostics, and it loads a few services described below.
        </p>
        <p>
          This page covers the website at paulkreations.com/wimm only. The
          analytics, attribution and crash-reporting tools inside the app are
          not cookies and are described in the{" "}
          <Link href="/wimm/privacy#third-party-services">Privacy Policy</Link>.
        </p>
      </section>

      <section>
        <h2 id="cookies-and-browser-storage">Cookies and browser storage</h2>
        <LegalTable
          caption="Cookies and browser storage used by the website"
          columns={["Name", "Provider", "Purpose", "Lifetime", "Essential"]}
          rows={[
            [
              <code key="n">sentryReplaySession</code>,
              "Sentry, through our own /monitoring address",
              "Session storage item, not a cookie. Marks a visit so that, for a sample of visits and whenever an error occurs, we can see what led to the error and fix it.",
              "Until you close the tab",
              "No (diagnostics)",
            ],
            [
              <code key="n">admin_session</code>,
              "Paul Kreations (Appwrite sign-in)",
              "Keeps site staff signed in to the staff area. Only set after a staff member signs in; never set for visitors.",
              "Until the staff member signs out or the session expires",
              "Yes",
            ],
            [
              <code key="n">sb-…-auth-token</code>,
              "Paul Kreations (Supabase sign-in)",
              "Keeps WIMM administrators signed in to the admin area. Only set after an administrator signs in; never set for visitors.",
              "Until the administrator signs out or the session expires",
              "Yes",
            ],
          ]}
        />
      </section>

      <section>
        <h2 id="other-technologies">Other services the website loads</h2>
        <p>None of these set a cookie of our own on your device.</p>
        <LegalTable
          caption="Other services loaded by the website"
          columns={["Service", "Provider", "Purpose", "Where"]}
          rows={[
            [
              "Web Analytics",
              "Vercel",
              "Counts page views. Does not use cookies.",
              "All pages",
            ],
            [
              "Speed Insights",
              "Vercel",
              "Measures page loading speed. Does not use cookies.",
              "All pages",
            ],
            [
              "Turnstile",
              "Cloudflare",
              "Checks that a form is being filled in by a person, not a program. It loads from Cloudflare and may store data it needs to run the check, under Cloudflare's own policies.",
              "Delete-account page only",
            ],
          ]}
        />
        <p>
          Website fonts are served from this site itself, not from a font
          provider.
        </p>
      </section>

      <section>
        <h2 id="managing-cookies-and-storage">Managing cookies and storage</h2>
        <p>
          Browsers let you view and delete cookies and site storage, block
          third-party content, or clear everything when you close the browser.
          Blocking the diagnostics item above does not affect how the website
          works. Blocking Turnstile may stop the delete-account form from
          working; you can email us instead.
        </p>
      </section>

      <section>
        <h2 id="changes-to-this-cookie-policy">
          Changes to This Cookie Policy
        </h2>
        <p>
          If the website starts using cookies or other storage, we will update
          this page and its &quot;Last Updated&quot; date before we do.
        </p>
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
