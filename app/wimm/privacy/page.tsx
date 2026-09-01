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
    <LegalShell title="Privacy Policy" lastUpdated="September 1, 2026">
      <section>
        <h2>Introduction</h2>
        <p>
          Where Is My Money? (&quot;we,&quot; &quot;us,&quot; or
          &quot;our&quot;) operates the Where Is My Money? mobile application
          and paulkreations.com/wimm (together, the &quot;Service&quot;). This
          Privacy Policy explains how we collect, use, disclose, and safeguard
          your information when you use our Service. Please read this privacy
          policy carefully. If you do not agree with the terms of this privacy
          policy, please do not access the Service.
        </p>
        <p>
          <strong>A note on how this app is built:</strong> by default, your
          financial data — expenses, income, investments, debts, budgets, and
          everything else you enter — is stored only on your device, encrypted,
          and never transmitted anywhere. It only leaves your device if you
          explicitly turn on Premium cloud sync, or take one of the specific
          actions described below (like enrolling in the Referral Program). This
          Privacy Policy describes what happens in every case, including that
          offline-by-default one.
        </p>
      </section>

      <section>
        <h2>Information We Collect</h2>
        <p>
          <strong>Information you provide directly</strong>
        </p>
        <ul>
          <li>
            <strong>Financial data</strong> — expenses, income, bank/card/
            investment/debt records, budgets, goals, and similar entries you
            create in the app. Stored locally, encrypted, on your device by
            default. Only transmitted to our servers if you turn on Premium
            cloud sync, in which case it&apos;s stored to keep your data
            available across your own devices — see &quot;Premium Cloud
            Sync&quot; below.
          </li>
          <li>
            <strong>Account identity</strong> — if you sign in (for Premium
            cloud sync, to enroll in the Referral Program, or to view or apply a
            Promo Offer), we receive your name, email address, and profile photo
            from your chosen sign-in method (Google Sign-In, or email/OTP).
          </li>
          <li>
            <strong>Financial profile details</strong> — job type, income
            stability, years in current role, marital status, number of
            dependents, and similar fields you may optionally fill in under
            Financial Profile, used to power in-app affordability calculations.
            Local-only unless you turn on Premium cloud sync or enroll in the
            Referral Program (see below).
          </li>
          <li>
            <strong>Payment information</strong> — if you subscribe to Premium,
            your payment is processed by Apple, Google Play, or RevenueCat
            (Android/iOS/macOS), or by Razorpay (India, alternate platforms). We
            do not receive or store your card/bank details ourselves — we
            receive confirmation that a payment was made, a subscription
            identifier, and its status.
          </li>
          <li>
            <strong>Attachments</strong> — receipts, invoices, certificates, and
            similar documents you choose to upload against an expense, income
            entry, investment, or tax record. Stored in encrypted cloud storage
            (Supabase Storage) only if you upload one — this is a Premium
            feature.
          </li>
          <li>
            <strong>Location data</strong> — only if you use the Trip Journal
            feature and choose to search for or confirm a place; used to log
            your trip&apos;s locations, never collected in the background.
          </li>
        </ul>
        <p>
          <strong>Information collected automatically</strong>
        </p>
        <ul>
          <li>
            <strong>Usage data</strong> — which screens and features you use,
            for the purposes described below. Free-tier: only if you opt in (a
            one-time consent prompt, reversible anytime in Settings). Premium:
            mandatory, since some Premium features depend on knowing what&apos;s
            being used to keep them working correctly.
          </li>
          <li>
            <strong>Crash and diagnostic data</strong> — same opt-in/mandatory
            split as usage data above.
          </li>
        </ul>
      </section>

      <section>
        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, operate, and maintain the Service</li>
          <li>
            Keep your data available across your own devices, if you&apos;ve
            enabled Premium cloud sync
          </li>
          <li>Process your Premium subscription and payment</li>
          <li>
            Send you notifications you&apos;ve asked for (reminders, referral
            program updates)
          </li>
          <li>Understand and improve how the Service is used</li>
          <li>Diagnose and fix crashes and errors</li>
          <li>Provide customer support</li>
          <li>Operate the Referral Program (see its own section below)</li>
          <li>Operate Promo Offers (see its own section below)</li>
          <li>Find and prevent fraud or abuse</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section>
        <h2>Premium Cloud Sync</h2>
        <p>
          Turning on Premium cloud sync uploads your financial data to our
          database, hosted on Supabase, so it stays available and current across
          every device you&apos;re signed into. This is entirely optional — the
          app is fully functional without it, for anyone who prefers their data
          to never leave their device. You can turn cloud sync off, and delete
          your cloud account and data, at any time from Settings.
        </p>
      </section>

      <section>
        <h2>Referral Program</h2>
        <p>
          If you choose to enroll in the Referral Program (during onboarding, or
          later from Settings), we collect and store, on our servers:
        </p>
        <ul>
          <li>
            Your name, date of birth, gender, and profile photo, as set in your
            app profile at the moment you enroll
          </li>
          <li>
            Your Financial Profile details, as described above, as set at the
            moment you enroll
          </li>
          <li>
            A shareable referral code we generate for you, and — if you redeem
            one — the referral code you entered
          </li>
          <li>
            Which account (if any) referred you, and which accounts (if any)
            you&apos;ve referred
          </li>
        </ul>
        <p>
          This is a one-time snapshot taken at enrollment, not a continuous copy
          of your data (unless you&apos;re also a Premium subscriber with cloud
          sync on, in which case your Financial Profile is kept current the same
          way the rest of your Premium data is — see &quot;Premium Cloud
          Sync&quot; above).{" "}
          <strong>
            Your everyday financial transactions — expenses, income,
            investments, debts — are never collected for the Referral Program,
            regardless of whether you&apos;re a Premium subscriber.
          </strong>
        </p>
        <p>
          A person you refer can see that you referred them and the date you
          joined — nothing else about your enrollment (not your financial
          profile, not any other personal detail) is ever shown to anyone else,
          including someone you&apos;ve referred or who referred you.
        </p>
        <p>
          <strong>What happens if you delete your account:</strong> your
          Referral Program enrollment record — your referral code and referral
          history (who referred you, who you&apos;ve referred) — is retained
          even after you delete your account, so that signing back in with the
          same Google account automatically reconnects you to it instead of
          losing your code and starting over. Every other part of your account
          (financial data, attachments, settings) is permanently deleted. See
          &quot;Data Retention&quot; below.
        </p>
      </section>

      <section>
        <h2>Promo Offers</h2>
        <p>
          Where Is My Money? may, at our sole discretion, grant free Premium
          access to specific accounts through a Promo Offer — for example, to
          collaborators, partners, or other accounts we select. This is a
          separate, invitation-based program, distinct from the self-service
          Referral Program described above.
        </p>
        <ul>
          <li>
            <strong>What we collect.</strong> Which offer (if any) your account
            has applied, and when. We do not collect any additional financial or
            personal information as part of applying a Promo Offer beyond
            what&apos;s already described elsewhere in this policy (your account
            identity, from signing in).
          </li>
          <li>
            <strong>How eligibility is decided.</strong> Each offer is either
            visible to every signed-in account, or restricted to specific
            accounts we select in advance. We do not use any automated criteria
            (your financial data, activity, or profile) to decide eligibility —
            it&apos;s set manually. To restrict an offer to specific people, we
            may look up an account by the email address associated with it, so
            that account can be granted visibility into that offer; we do not
            use this lookup for any other purpose.
          </li>
          <li>
            <strong>Administrative access.</strong> A small number of authorized
            administrators (currently, the app&apos;s developer) can view Promo
            Offer eligibility and redemption records — including the email
            address associated with an account — to create, manage, and
            troubleshoot offers, and to look into a specific account&apos;s
            redemption at that account holder&apos;s request (for example, to
            correct a mistaken redemption). This access is limited to
            what&apos;s needed for that purpose and does not extend to your
            financial data, which remains encrypted and inaccessible to us
            unless you&apos;ve separately enabled Premium cloud sync for it.
          </li>
          <li>
            <strong>Data retention.</strong> Unlike the Referral Program above,
            your Promo Offer redemption record is deleted along with the rest of
            your account when you delete it, and is not retained afterward. If
            you sign up again with the same Google account, your eligibility for
            any offer (and whether you can apply one) is re-evaluated as if you
            were a new account — nothing about a prior redemption carries over.
          </li>
        </ul>
      </section>

      <section>
        <h2>Third-Party Services</h2>
        <p>We use the following third-party services to operate the app:</p>
        <ul>
          <li>
            <strong>Supabase</strong> — our database and file storage provider,
            for Premium cloud sync, attachments, the Referral Program, and Promo
            Offers.
          </li>
          <li>
            <strong>Google Sign-In</strong> — for account authentication. We
            encourage Google Sign-In as the primary way to sign in; an
            email/OTP-based alternative is also available.
          </li>
          <li>
            <strong>RevenueCat</strong> — manages Premium subscriptions
            purchased through the Apple App Store or Google Play Store.
          </li>
          <li>
            <strong>Razorpay</strong> — processes Premium subscription payments
            on platforms/regions where App Store/Play billing isn&apos;t
            available (currently Windows and Linux, India only).
          </li>
          <li>
            <strong>Amplitude</strong> — analytics, for the usage data described
            above.
          </li>
          <li>
            <strong>Sentry</strong> — crash and error reporting.
          </li>
          <li>
            <strong>OneSignal</strong> — push notification delivery.
          </li>
          <li>
            <strong>Google Maps / Places</strong> — only used if you use the
            Trip Journal&apos;s place search feature.
          </li>
        </ul>
        <p>
          Each of these processes the specific data described in this policy on
          our behalf; none of them are permitted to use it for their own
          independent purposes.
        </p>
      </section>

      <section>
        <h2>Data Retention</h2>
        <p>We retain your data as follows:</p>
        <ul>
          <li>
            <strong>Financial data (Premium cloud sync)</strong> — retained
            until you turn off cloud sync or delete your account, at which point
            it&apos;s permanently deleted from our servers (your local,
            on-device copy is unaffected).
          </li>
          <li>
            <strong>Referral Program enrollment</strong> — retained even after
            account deletion, specifically so the same Google account can be
            automatically reconnected to it later — see &quot;Referral
            Program&quot; above for exactly what this includes.
          </li>
          <li>
            <strong>Promo Offer redemption</strong> — deleted along with the
            rest of your account when you delete it; not retained afterward —
            see &quot;Promo Offers&quot; above.
          </li>
          <li>
            <strong>Usage/crash data</strong> — retained for as long as
            necessary to improve the Service, or until you withdraw consent
            (free tier) or delete your account (Premium).
          </li>
          <li>
            <strong>Payment records</strong> — retained as required by
            applicable tax and financial recordkeeping law, independent of
            whether you delete your account.
          </li>
        </ul>
      </section>

      <section>
        <h2>Data Security</h2>
        <p>
          We use encryption both on your device (your local financial data is
          stored encrypted) and in transit to our servers. No method of
          transmission over the internet or electronic storage is 100% secure,
          and while we use commercially reasonable measures to protect your
          information, we cannot guarantee its absolute security.
        </p>
      </section>

      <section>
        <h2>Your Rights</h2>
        <p>
          Depending on where you live, you may have rights to access, correct,
          delete, or export your personal data, and to object to or restrict
          certain processing. You can exercise most of these directly in the app
          (Settings → Data Management, and Settings → Delete Account); for
          anything else, contact us using the details below.
        </p>
      </section>

      <section>
        <h2>Grievance Officer (India)</h2>
        <p>
          In accordance with the Digital Personal Data Protection Act, 2023 and
          applicable Indian law, the following Grievance Officer can be
          contacted regarding any complaints or concerns about how your personal
          data is handled:
        </p>
        <ul>
          <li>
            <strong>Name:</strong> [GRIEVANCE OFFICER NAME — required before
            publishing]
          </li>
          <li>
            <strong>Email:</strong> [GRIEVANCE OFFICER EMAIL — required before
            publishing]
          </li>
          <li>
            <strong>Address:</strong> [REGISTERED ADDRESS — required before
            publishing]
          </li>
        </ul>
      </section>

      <section>
        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page and
          updating the &quot;Last Updated&quot; date. Material changes —
          anything that meaningfully changes what we collect or how we use it —
          will also be shown to you directly in the app.
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
