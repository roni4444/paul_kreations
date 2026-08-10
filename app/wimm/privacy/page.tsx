import type { Metadata } from "next";
import { LegalShell } from "@/components/wimm/legal-shell";
import { BASE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Where Is My Money? — how we collect, use, and protect your information.",
  alternates: { canonical: `${BASE_URL}/wimm/privacy` },
};

export default function WimmPrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" lastUpdated="August 10, 2026">
      <section>
        <h2>Introduction</h2>
        <p>
          Where Is My Money? (&quot;we,&quot; &quot;us,&quot; or
          &quot;our&quot;) operates paulkreations.com/wimm (the
          &quot;Service&quot;). This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you visit our
          Service. Please read this privacy policy carefully. If you do not
          agree with the terms of this privacy policy, please do not access the
          Service.
        </p>
      </section>

      <section>
        <h2>Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Usage data</li>
          <li>Payment information</li>
          <li>Location data</li>
        </ul>
        <p>
          We collect this information when you voluntarily provide it to us,
          when you use our Service, or through automated technologies.
        </p>
      </section>

      <section>
        <h2>How We Use Your Information</h2>
        <p>
          We may use the information we collect for various purposes, including
          to:
        </p>
        <ul>
          <li>Provide, operate, and maintain our Service</li>
          <li>Improve, personalize, and expand our Service</li>
          <li>Understand and analyze how you use our Service</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>
            Communicate with you for customer service, updates, and marketing
            purposes
          </li>
          <li>Process transactions and send related information</li>
          <li>Find and prevent fraud</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section>
        <h2>Third-Party Services</h2>
        <p>
          We may use third-party service providers to monitor and analyze the
          use of our Service, process payments, or assist with other business
          functions.
        </p>
        <p>
          We offer social login options. When you log in via a social platform,
          we may receive profile information as permitted by your social account
          settings.
        </p>
        <p>
          We use Google Analytics to analyze website traffic. Google Analytics
          uses cookies to collect anonymous usage data. For more information,
          visit Google&apos;s privacy policy.
        </p>
      </section>

      <section>
        <h2>Data Retention</h2>
        <p>
          We will retain your personal information only for as long as is
          necessary for the purposes set out in this Privacy Policy. We will
          retain and use your information to the extent necessary to comply with
          our legal obligations, resolve disputes, and enforce our policies.
        </p>
      </section>

      <section>
        <h2>Data Security</h2>
        <p>
          The security of your data is important to us, but remember that no
          method of transmission over the Internet or method of electronic
          storage is 100% secure. While we strive to use commercially acceptable
          means to protect your personal information, we cannot guarantee its
          absolute security.
        </p>
      </section>

      <section>
        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page and
          updating the &quot;Last Updated&quot; date.
        </p>
        <p>
          You are advised to review this Privacy Policy periodically for any
          changes. Changes to this Privacy Policy are effective when they are
          posted on this page.
        </p>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact
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
