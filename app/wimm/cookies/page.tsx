import type { Metadata } from "next";
import { LegalShell } from "@/components/wimm/legal-shell";
import { BASE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookie Policy for Where Is My Money? — what cookies we use and how to manage them.",
  alternates: { canonical: `${BASE_URL}/wimm/cookies` },
};

export default function WimmCookiesPage() {
  return (
    <LegalShell title="Cookie Policy" lastUpdated="August 10, 2026">
      <section>
        <h2>What Are Cookies</h2>
        <p>
          Cookies are small text files that are stored on your computer or
          mobile device when you visit a website. They are widely used to make
          websites work more efficiently and to provide information to the
          owners of the site.
        </p>
        <p>
          Where Is My Money? uses cookies and similar technologies on
          paulkreations.com/wimm (the &quot;Service&quot;) to enhance your
          browsing experience and analyze how the Service is used.
        </p>
      </section>

      <section>
        <h2>Types of Cookies We Use</h2>
        <p>We use the following types of cookies:</p>
        <ul>
          <li>
            <strong>Essential Cookies</strong> — These cookies are necessary for
            the Service to function properly. They enable basic features like
            page navigation and access to secure areas.
          </li>
          <li>
            <strong>Preference Cookies</strong> — These cookies allow the
            Service to remember choices you make (such as your language or
            region) and provide enhanced, personalized features.
          </li>
          <li>
            <strong>Analytics Cookies</strong> — These cookies help us
            understand how visitors interact with the Service by collecting and
            reporting information anonymously.
          </li>
          <li>
            <strong>Marketing Cookies</strong> — These cookies are used to track
            visitors across websites to display relevant advertisements.
          </li>
        </ul>
      </section>

      <section>
        <h2>Third-Party Cookies</h2>
        <p>We use cookies from the following third-party services:</p>
        <ul>
          <li>
            Google Analytics — Uses cookies to collect anonymous usage
            statistics and website traffic data.
          </li>
        </ul>
      </section>

      <section>
        <h2>Managing Cookies</h2>
        <p>
          You can control and manage cookies in several ways. Most browsers
          allow you to:
        </p>
        <ul>
          <li>View what cookies are stored and delete them individually</li>
          <li>Block third-party cookies</li>
          <li>Block cookies from specific sites</li>
          <li>Block all cookies</li>
          <li>Delete all cookies when you close your browser</li>
        </ul>
        <p>
          Please note that if you choose to block or delete cookies, some
          features of the Service may not function properly.
        </p>
        <p>
          To manage cookies in your browser, check your browser&apos;s help
          section or visit the browser&apos;s settings.
        </p>
      </section>

      <section>
        <h2>Changes to This Cookie Policy</h2>
        <p>
          We may update this Cookie Policy from time to time to reflect changes
          in technology, regulation, or our business practices. Any changes will
          be posted on this page with an updated &quot;Last Updated&quot; date.
        </p>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Cookie Policy, please contact us:
        </p>
        <ul>
          <li>
            By email:{" "}
            <a href="mailto:support@mail.paulkreations.com">
              support@mail.paulkreations.com
            </a>
          </li>
          <li>
            By visiting:{" "}
            <a href="https://paulkreations.com/wimm">paulkreations.com/wimm</a>
          </li>
        </ul>
      </section>
    </LegalShell>
  );
}
