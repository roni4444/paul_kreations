import type { Metadata } from "next";
import { LegalShell } from "@/components/wimm/legal-shell";
import { BASE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Where Is My Money? — the rules that govern use of the app and website.",
  alternates: { canonical: `${BASE_URL}/wimm/terms` },
};

export default function WimmTermsPage() {
  return (
    <LegalShell title="Terms of Service" lastUpdated="August 10, 2026">
      <section>
        <h2>Agreement to Terms</h2>
        <p>
          By accessing or using the services provided by Where Is My Money? at
          paulkreations.com/wimm (the &quot;Service&quot;), you agree to be
          bound by these Terms of Service (&quot;Terms&quot;). If you disagree
          with any part of these terms, you may not access the Service.
        </p>
      </section>

      <section>
        <h2>Use of Service</h2>
        <p>
          You agree to use the Service only for lawful purposes and in
          accordance with these Terms. You agree not to:
        </p>
        <ul>
          <li>
            Use the Service in any way that violates any applicable law or
            regulation
          </li>
          <li>
            Use the Service to transmit any harmful, threatening, abusive, or
            otherwise objectionable material
          </li>
          <li>
            Attempt to gain unauthorized access to any portion of the Service
          </li>
          <li>Use the Service to infringe upon the rights of others</li>
          <li>
            Use any automated system to access the Service in a manner that
            sends more requests than a human can reasonably produce
          </li>
        </ul>
      </section>

      <section>
        <h2>Intellectual Property</h2>
        <p>
          The Service and its original content, features, and functionality are
          and will remain the exclusive property of Where Is My Money?. The
          Service is protected by copyright, trademark, and other laws. Our
          trademarks may not be used in connection with any product or service
          without our prior written consent.
        </p>
      </section>

      <section>
        <h2>User Content</h2>
        <p>
          You retain ownership of any content you submit to or through the
          Service. By submitting content, you grant Where Is My Money? a
          non-exclusive, worldwide, royalty-free license to use, reproduce, and
          display such content in connection with operating the Service.
        </p>
      </section>

      <section>
        <h2>Payments and Billing</h2>
        <p>
          Certain aspects of the Service may require payment. You agree to
          provide accurate billing information. All payments are non-refundable
          unless otherwise stated. We reserve the right to change our pricing at
          any time with reasonable notice.
        </p>
      </section>

      <section>
        <h2>Termination</h2>
        <p>
          We may terminate or suspend your access to the Service immediately,
          without prior notice or liability, for any reason, including without
          limitation if you breach the Terms.
        </p>
        <p>
          Upon termination, your right to use the Service will cease
          immediately.
        </p>
      </section>

      <section>
        <h2>Limitation of Liability</h2>
        <p>
          In no event shall Where Is My Money?, nor its directors, employees,
          partners, agents, suppliers, or affiliates, be liable for any
          indirect, incidental, special, consequential, or punitive damages,
          including without limitation, loss of profits, data, use, goodwill, or
          other intangible losses, resulting from:
        </p>
        <ul>
          <li>
            Your access to or use of (or inability to access or use) the Service
          </li>
          <li>Any conduct or content of any third party on the Service</li>
          <li>Any content obtained from the Service</li>
          <li>
            Unauthorized access, use, or alteration of your transmissions or
            content
          </li>
        </ul>
      </section>

      <section>
        <h2>Disclaimer</h2>
        <p>
          The Service is provided on an &quot;AS IS&quot; and &quot;AS
          AVAILABLE&quot; basis. The Service is provided without warranties of
          any kind, whether express or implied, including, but not limited to,
          implied warranties of merchantability, fitness for a particular
          purpose, non-infringement, or course of performance.
        </p>
      </section>

      <section>
        <h2>Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the
          laws of the jurisdiction in which Where Is My Money? operates, without
          regard to its conflict of law provisions.
        </p>
      </section>

      <section>
        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to modify or replace these Terms at any time. If
          a revision is material, we will try to provide at least 30 days&apos;
          notice prior to any new terms taking effect.
        </p>
        <p>
          By continuing to access or use our Service after those revisions
          become effective, you agree to be bound by the revised terms.
        </p>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          If you have any questions about these Terms of Service, please contact
          us:
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
