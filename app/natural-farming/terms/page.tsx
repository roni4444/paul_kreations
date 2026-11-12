import type { Metadata } from "next";
import { LegalShell } from "@/components/natural-farming/legal-shell";
import { BASE_URL } from "@/lib/config";
import {
  NATURAL_FARMING_LEGAL_LAST_UPDATED,
  NATURAL_FARMING_MIN_AGE,
  NATURAL_FARMING_PUBLIC_URL,
  NATURAL_FARMING_SUPPORT_EMAIL,
} from "@/lib/data/natural-farming-legal";

// Headings carry stable ids for deep links. Keep wording in step with the
// Privacy Policy (app/natural-farming/privacy/page.tsx) wherever both mention the same
// thing (accounts, deletion, subscriptions, ads).

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Natural Farming — the rules that govern use of the app and website.",
  alternates: { canonical: `${BASE_URL}/natural-farming/terms` },
};

export default function NaturalFarmingTermsPage() {
  return (
    <LegalShell
      title="Terms of Service"
      lastUpdated={NATURAL_FARMING_LEGAL_LAST_UPDATED}
    >
      <section>
        <h2 id="agreement-to-terms">Agreement to Terms</h2>
        <p>
          By downloading, accessing or using Natural Farming (the
          &quot;Service&quot;), you agree to be bound by these Terms of Service
          (&quot;Terms&quot;). If you disagree with any part of these Terms, you
          may not use the Service.
        </p>
      </section>

      <section>
        <h2 id="eligibility">Eligibility</h2>
        <p>
          You must be at least {NATURAL_FARMING_MIN_AGE} years old to use
          Natural Farming. If you are under 18, you may use the community
          features only with the permission of a parent or guardian where the
          law of your country requires it.
        </p>
      </section>

      <section>
        <h2 id="no-account-profile">Profiles Without an Account</h2>
        <p>
          Natural Farming does not ask you to register with an email or
          password. The app generates an anonymous identifier for your device,
          and your learning progress, quiz streaks and, if you choose to take
          part, your community profile are linked to it. If you reinstall the
          app or clear its data, you may lose access to that profile and
          progress. Details are in the Privacy Policy.
        </p>
      </section>

      <section>
        <h2 id="use-of-service">Use of Service</h2>
        <p>
          You agree to use the Service only for lawful purposes. You agree not
          to:
        </p>
        <ul>
          <li>
            Use the Service in any way that violates applicable law or
            regulation
          </li>
          <li>
            Attempt to gain unauthorized access to any part of the Service or
            its servers
          </li>
          <li>
            Use automated systems to access the Service in a way that sends more
            requests than a person reasonably could
          </li>
          <li>
            Copy or redistribute the educational content or quiz bank at scale
          </li>
          <li>
            Interfere with, probe or reverse engineer the Service or its
            security features
          </li>
        </ul>
      </section>

      <section>
        <h2 id="community-forum">Community Forum Rules</h2>
        <p>
          The Community lets you ask questions, share farming tips and reply to
          others. By posting, you agree that your posts, replies and photos:
        </p>
        <ul>
          <li>are your own or you have the right to share them</li>
          <li>
            are not spam, advertising, offensive, abusive, hateful, harassing or
            unlawful
          </li>
          <li>
            do not contain misinformation presented as fact, or advice likely to
            cause harm
          </li>
          <li>
            do not include other people&apos;s personal information, or your own
            contact details in public text
          </li>
          <li>are relevant to farming and the topics of the app</li>
        </ul>
        <p>
          You can report a post or reply with the flag button. We may review
          reports, remove content, hide posts, suspend a profile or block a
          device from posting, at our discretion and without notice. We are not
          obliged to monitor the forum and do not endorse what other users post.
        </p>
      </section>

      <section>
        <h2 id="user-content">Your Content</h2>
        <p>
          You keep ownership of what you post. By posting, you give us a
          non-exclusive, worldwide, royalty-free licence to store, display,
          reproduce and distribute it within the Service, and to remove or edit
          it where needed for moderation. Posts and photos in the Community are
          visible to other users of the app.
        </p>
      </section>

      <section>
        <h2 id="educational-content">
          Educational Content, Quizzes and Advice
        </h2>
        <p>
          The lessons, quizzes and FAQs in Natural Farming are for general
          education about natural farming. They are not professional
          agricultural, financial, legal, environmental or safety advice.
          Results depend on soil, climate, crops, local rules and many other
          factors, and we do not promise any yield, income or outcome. Quiz
          questions may be generated with the help of AI and can contain errors;
          badges and streaks have no monetary value. Check important decisions
          with a qualified local expert.
        </p>
      </section>

      <section>
        <h2 id="advertising">Advertising</h2>
        <p>
          The app shows ads served by Google AdMob. Advertisers are independent
          third parties; we are not responsible for their products or claims.
          Where required, you can manage your ad choices through the consent
          options shown in the app (Privacy options) or your Android advertising
          settings.
        </p>
      </section>

      <section>
        <h2 id="intellectual-property">Intellectual Property</h2>
        <p>
          The Service and its original content, features and functionality
          (excluding content posted by users) are and will remain the exclusive
          property of Paul Kreations and its licensors. The Service is protected
          by copyright, trademark and other laws. Our names, logos and
          trademarks may not be used in connection with any product or service
          without our prior written consent.
        </p>
      </section>

      <section>
        <h2 id="third-party-services">Third-Party Services and Links</h2>
        <p>
          The Service relies on, and may link to, services run by others (for
          example Google Play, Supabase and the other providers listed in the
          Privacy Policy). We do not control them and are not responsible for
          their content, availability or practices. Their own terms apply when
          you use them.
        </p>
      </section>

      <section>
        <h2 id="termination">Termination</h2>
        <p>
          We may suspend or terminate your access to the Service immediately,
          without prior notice or liability, if you breach these Terms or misuse
          the Service. You may stop using the Service at any time. When access
          ends, your right to use the Service ends immediately.
        </p>
      </section>

      <section>
        <h2 id="limitation-of-liability">Limitation of Liability</h2>
        <p>
          To the extent permitted by law, Paul Kreations, its directors,
          employees, partners, agents, suppliers and affiliates will not be
          liable for any indirect, incidental, special, consequential or
          punitive damages, including loss of profits, data, use, goodwill or
          other intangible losses, resulting from:
        </p>
        <ul>
          <li>
            Your access to or use of (or inability to access or use) the Service
          </li>
          <li>Any conduct or content of any third party on the Service</li>
          <li>Any content obtained from the Service</li>
          <li>
            Unauthorized access, use or alteration of your transmissions or
            content
          </li>
        </ul>
      </section>

      <section>
        <h2 id="disclaimer">Disclaimer</h2>
        <p>
          The Service is provided on an &quot;AS IS&quot; and &quot;AS
          AVAILABLE&quot; basis, without warranties of any kind, whether express
          or implied, including implied warranties of merchantability, fitness
          for a particular purpose, non-infringement or course of performance.
        </p>
      </section>

      <section>
        <h2 id="governing-law">Governing Law</h2>
        <p>
          These Terms are governed by the laws of India. Any dispute arising out
          of or in connection with them is subject to the exclusive jurisdiction
          of the courts at Kolkata, West Bengal, India.
        </p>
      </section>

      <section>
        <h2 id="changes-to-terms">Changes to Terms</h2>
        <p>
          We may modify or replace these Terms at any time. If a revision is
          material, we will try to give at least 30 days&apos; notice before the
          new terms take effect. By continuing to use the Service after
          revisions become effective, you agree to be bound by the revised
          terms.
        </p>
      </section>

      <section>
        <h2 id="contact-us">Contact Us</h2>
        <p>
          If you have any questions about these Terms of Service, please contact
          us:
        </p>
        <ul>
          <li>
            By email:{" "}
            <a href={"mailto:" + NATURAL_FARMING_SUPPORT_EMAIL}>
              {NATURAL_FARMING_SUPPORT_EMAIL}
            </a>
          </li>
          <li>
            By visiting:{" "}
            <a href={NATURAL_FARMING_PUBLIC_URL}>
              {NATURAL_FARMING_PUBLIC_URL}
            </a>
          </li>
        </ul>
      </section>
    </LegalShell>
  );
}
