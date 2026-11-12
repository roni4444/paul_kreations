import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/surround-it/legal-shell";
import { BASE_URL } from "@/lib/config";
import {
  SURROUND_IT_LEGAL_LAST_UPDATED,
  SURROUND_IT_MIN_AGE,
  SURROUND_IT_PUBLIC_URL,
  SURROUND_IT_SUPPORT_EMAIL,
} from "@/lib/data/surround-it-legal";

// Headings carry stable ids for deep links. Keep wording in step with the
// Privacy Policy (app/surround-it/privacy/page.tsx) wherever both mention the same
// thing (accounts, deletion, subscriptions, ads).

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Surround It — the rules that govern use of the app and website.",
  alternates: { canonical: `${BASE_URL}/surround-it/terms` },
};

export default function SurroundItTermsPage() {
  return (
    <LegalShell
      title="Terms of Service"
      lastUpdated={SURROUND_IT_LEGAL_LAST_UPDATED}
    >
      <section>
        <h2 id="agreement-to-terms">Agreement to Terms</h2>
        <p>
          By downloading, accessing or using Surround It (the
          &quot;Service&quot;), you agree to be bound by these Terms of Service
          (&quot;Terms&quot;). If you disagree with any part of these Terms, you
          may not use the Service.
        </p>
      </section>

      <section>
        <h2 id="eligibility">Eligibility</h2>
        <p>
          You must be at least {SURROUND_IT_MIN_AGE} years old to use Surround
          It. If you are under 18, you may use online features only with the
          permission of a parent or guardian where the law of your country
          requires it.
        </p>
      </section>

      <section>
        <h2 id="offline-and-online-play">Offline and Online Play</h2>
        <p>
          You can play Surround It against the computer offline. Online features
          such as leaderboards, matches against other players and cloud saves
          depend on our game server and Google Play Games, are optional, and are
          provided only when and where they are available. We are still building
          and rolling out the production game server, so some online features
          may be unavailable, limited or change without notice. If you choose to
          use them you will be asked to sign in and agree to the related data
          use (see the Privacy Policy).
        </p>
      </section>

      <section>
        <h2 id="your-account">Your Online Account</h2>
        <p>
          If you use online features, an account is created for you from your
          Google sign-in. You agree to keep your device and Google account
          secure and are responsible for activity under your account. You may
          ask for your data to be deleted at any time at{" "}
          <Link href="/surround-it/delete-account">
            paulkreations.com/surround-it/delete-account
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="fair-play">Fair Play and Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>
            Cheat, or use bots, scripts, emulators or modified versions of the
            app to gain an unfair advantage, especially in ranked matches and on
            leaderboards
          </li>
          <li>
            Exploit bugs or abuse matchmaking, for example by arranging matches
            to inflate scores
          </li>
          <li>Use offensive, hateful or impersonating player names</li>
          <li>
            Attempt to gain unauthorized access to any part of the Service or
            its servers
          </li>
          <li>
            Reverse engineer, decompile or interfere with the Service or its
            security features
          </li>
          <li>Use the Service in any way that violates applicable law</li>
        </ul>
        <p>
          We may remove scores, reset rankings, restrict online access or close
          accounts that break these rules, without notice.
        </p>
      </section>

      <section>
        <h2 id="virtual-progress">Scores, Progress and Rewards</h2>
        <p>
          Experience points (XP), tokens, achievements, leaderboard positions
          and similar progress in the game have no cash value and cannot be sold
          or transferred. Progress saved only on your device can be lost if you
          uninstall the app or clear its data. We may adjust, reset or
          discontinue scores and rewards, for example for balance, fairness or
          technical reasons.
        </p>
      </section>

      <section>
        <h2 id="advertising-and-purchases">Advertising and Purchases</h2>
        <p>
          The app shows ads (banners and interstitials) served by Google AdMob.
          Advertisers are independent third parties; we are not responsible for
          their products or claims. If optional purchases are offered in the
          app, they are processed by Google Play and managed with RevenueCat;
          refunds are governed by Google Play&apos;s policies unless the law
          requires otherwise.
        </p>
      </section>

      <section>
        <h2 id="intellectual-property">Intellectual Property</h2>
        <p>
          The Service and its original content, features and functionality
          (including the game board design, artwork, sounds and code) are and
          will remain the exclusive property of Paul Kreations and its
          licensors. The Service is protected by copyright, trademark and other
          laws. Our names, logos and trademarks may not be used in connection
          with any product or service without our prior written consent.
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
        <p>
          Surround It is a game provided for entertainment. We do not guarantee
          that it will be uninterrupted, error-free or that online features will
          always be available.
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
            <a href={"mailto:" + SURROUND_IT_SUPPORT_EMAIL}>
              {SURROUND_IT_SUPPORT_EMAIL}
            </a>
          </li>
          <li>
            By visiting:{" "}
            <a href={SURROUND_IT_PUBLIC_URL}>{SURROUND_IT_PUBLIC_URL}</a>
          </li>
        </ul>
      </section>
    </LegalShell>
  );
}
