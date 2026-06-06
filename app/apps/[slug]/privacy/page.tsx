// Minimal standalone page — no navbar/footer, safe for Play Store Console links.
// Route: /apps/[slug]/privacy
// e.g.  /apps/henstel/privacy
//       /apps/natural-farming/privacy
//       /apps/surround-it/privacy

import { apps } from "@/lib/data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, ExternalLink, ArrowLeft } from "lucide-react";

// ─── Static generation ────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = apps.find((a) => a.slug === slug);
  if (!app) return { title: "Not Found" };
  return {
    title: `${app.name} — Privacy Policy`,
    description: `Privacy policy for ${app.name} by Paul Kreations.`,
    robots: { index: true, follow: false },
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = apps.find((a) => a.slug === slug);
  if (!app) notFound();

  const { privacyPolicy: pp } = app;

  return (
    <div className="min-h-screen bg-white text-[#111c2d]">
      {/* ── Minimal header ─────────────────────── */}
      <header className="border-b border-[#e3bebd] bg-white">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-[#5f5e5e] hover:text-[#c41e3a] transition-colors"
            aria-label="Back to Paul Kreations"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            <span className={`${MONO} text-[11px]`}>paulkreations.com</span>
          </Link>
          <div className="flex items-center gap-1.5 text-[#c41e3a]">
            <ShieldCheck size={15} aria-hidden="true" />
            <span className={`${MONO} text-[11px] text-[#8f6f6f]`}>
              Privacy Policy
            </span>
          </div>
        </div>
      </header>

      {/* ── Main content ───────────────────────── */}
      <main className="max-w-2xl mx-auto px-6 py-12">
        {/* Title block */}
        <div className="mb-10 pb-8 border-b border-[#e3bebd]">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-4 border border-[#e3bebd] bg-[#ffdad9]">
            <span
              className={`${MONO} text-[11px] font-semibold text-[#c41e3a] uppercase`}
            >
              {app.type === "game" ? "Game" : "App"}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-[-0.025em] text-[#111c2d] mb-2">
            {app.name}
          </h1>
          <p className="text-xl font-semibold text-[#111c2d] mb-3">
            Privacy Policy
          </p>
          <p className={`${MONO} text-[11px] text-[#8f6f6f]`}>
            Last updated: {formatDate(pp.lastUpdated)}
          </p>
        </div>

        {/* ── Section helper ──────────────────── */}
        {/* Sections are just rendered below — no component abstraction needed */}

        {/* 1. Introduction */}
        <section className="mb-8">
          <h2 className="text-base font-bold text-[#111c2d] mb-3 flex items-center gap-2">
            <span className={`${MONO} text-[10px] text-[#c41e3a] w-5`}>01</span>
            Introduction
          </h2>
          <div className="space-y-3 font-[family-name:var(--font-sans)] text-sm text-[#5f5e5e] leading-relaxed pl-7">
            <p>
              Paul Kreations (&quot;we&quot;, &quot;our&quot;, or
              &quot;us&quot;) operates the{" "}
              <strong className="text-[#111c2d]">{app.name}</strong> mobile
              application (the &quot;App&quot;). This Privacy Policy explains
              how we collect, use, and protect information when you use our App.
            </p>
            <p>
              By downloading or using {app.name}, you agree to the collection
              and use of information as described in this policy. If you do not
              agree, please do not use the App.
            </p>
          </div>
        </section>

        <div className="border-t border-[#e3bebd] mb-8" />

        {/* 2. Information We Collect */}
        <section className="mb-8">
          <h2 className="text-base font-bold text-[#111c2d] mb-3 flex items-center gap-2">
            <span className={`${MONO} text-[10px] text-[#c41e3a] w-5`}>02</span>
            Information We Collect
          </h2>
          <div className="pl-7 font-[family-name:var(--font-sans)] text-sm text-[#5f5e5e] leading-relaxed">
            <p className="mb-3">
              We collect only the minimum information necessary to operate and
              improve the App:
            </p>
            <ul className="space-y-2">
              {pp.dataCollected.map((item, i) => (
                <li key={i} className="flex gap-2.5">
                  <span
                    className="mt-1.5 size-1.5 bg-[#c41e3a] flex-shrink-0"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3">
              We do <strong className="text-[#111c2d]">not</strong> collect your
              name, email address, phone number, location, payment information,
              or any other personally identifiable information unless you
              explicitly provide it to us.
            </p>
          </div>
        </section>

        <div className="border-t border-[#e3bebd] mb-8" />

        {/* 3. How We Use Your Information */}
        <section className="mb-8">
          <h2 className="text-base font-bold text-[#111c2d] mb-3 flex items-center gap-2">
            <span className={`${MONO} text-[10px] text-[#c41e3a] w-5`}>03</span>
            How We Use Your Information
          </h2>
          <div className="pl-7 font-[family-name:var(--font-sans)] text-sm text-[#5f5e5e] leading-relaxed">
            <p className="mb-3">The information collected is used solely to:</p>
            <ul className="space-y-2">
              {[
                "Maintain and improve App stability, performance, and functionality",
                "Diagnose and fix bugs and crashes",
                "Understand how users interact with the App to guide future development",
                "Ensure compatibility across Android devices and OS versions",
              ].map((item, i) => (
                <li key={i} className="flex gap-2.5">
                  <span
                    className="mt-1.5 size-1.5 bg-[#c41e3a] flex-shrink-0"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="border-t border-[#e3bebd] mb-8" />

        {/* 4. Android Permissions (conditional — only shown if permissions exist) */}
        {pp.permissions.length > 0 && (
          <>
            <section className="mb-8">
              <h2 className="text-base font-bold text-[#111c2d] mb-3 flex items-center gap-2">
                <span className={`${MONO} text-[10px] text-[#c41e3a] w-5`}>
                  04
                </span>
                App Permissions
              </h2>
              <div className="pl-7 font-[family-name:var(--font-sans)] text-sm text-[#5f5e5e] leading-relaxed">
                <p className="mb-3">
                  {app.name} requests the following Android permissions:
                </p>
                <ul className="space-y-2">
                  {pp.permissions.map((perm, i) => {
                    const [name, ...rest] = perm.split(" — ");
                    return (
                      <li key={i} className="flex gap-2.5">
                        <span
                          className="mt-1.5 size-1.5 bg-[#c41e3a] flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span>
                          <span
                            className={`${MONO} text-[11px] text-[#111c2d] font-medium`}
                          >
                            {name}
                          </span>
                          {rest.length > 0 && (
                            <span className="text-[#5f5e5e]">
                              {" "}
                              — {rest.join(" — ")}
                            </span>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>
            <div className="border-t border-[#e3bebd] mb-8" />
          </>
        )}

        {/* 5. Third-Party Services */}
        <section className="mb-8">
          <h2 className="text-base font-bold text-[#111c2d] mb-3 flex items-center gap-2">
            <span className={`${MONO} text-[10px] text-[#c41e3a] w-5`}>
              {pp.permissions.length > 0 ? "05" : "04"}
            </span>
            Third-Party Services
          </h2>
          <div className="pl-7 font-[family-name:var(--font-sans)] text-sm text-[#5f5e5e] leading-relaxed">
            <p className="mb-3">
              The App uses the following third-party services that may collect
              information independently. Each service operates under its own
              privacy policy:
            </p>
            <ul className="space-y-2.5">
              {pp.thirdPartyServices.map((svc, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span
                    className="mt-1.5 size-1.5 bg-[#c41e3a] flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="text-[#111c2d]">{svc.name}</strong>
                    {" — "}
                    <a
                      href={svc.privacyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#c41e3a] hover:underline inline-flex items-center gap-1"
                    >
                      Privacy Policy
                      <ExternalLink size={10} aria-hidden="true" />
                    </a>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="border-t border-[#e3bebd] mb-8" />

        {/* 6. Data Retention & Security */}
        <section className="mb-8">
          <h2 className="text-base font-bold text-[#111c2d] mb-3 flex items-center gap-2">
            <span className={`${MONO} text-[10px] text-[#c41e3a] w-5`}>
              {pp.permissions.length > 0 ? "06" : "05"}
            </span>
            Data Retention &amp; Security
          </h2>
          <div className="pl-7 font-[family-name:var(--font-sans)] text-sm text-[#5f5e5e] leading-relaxed space-y-3">
            <p>
              Crash reports and analytics data collected through third-party
              services are retained according to those services&apos; own
              retention policies and are not stored on Paul Kreations&apos; own
              servers.
            </p>
            <p>
              We take commercially reasonable steps to protect information
              processed through our third-party providers. However, no method of
              electronic storage or internet transmission is 100% secure, and we
              cannot guarantee absolute security.
            </p>
          </div>
        </section>

        <div className="border-t border-[#e3bebd] mb-8" />

        {/* 7. Children's Privacy */}
        <section className="mb-8">
          <h2 className="text-base font-bold text-[#111c2d] mb-3 flex items-center gap-2">
            <span className={`${MONO} text-[10px] text-[#c41e3a] w-5`}>
              {pp.permissions.length > 0 ? "07" : "06"}
            </span>
            Children&apos;s Privacy
          </h2>
          <div className="pl-7 font-[family-name:var(--font-sans)] text-sm text-[#5f5e5e] leading-relaxed">
            {pp.isChildrenApp ? (
              <p>
                {app.name} is designed for children. We are committed to
                complying with the Children&apos;s Online Privacy Protection Act
                (COPPA). We do not knowingly collect personally identifiable
                information from children under 13. The App does not display
                behavioural advertising, does not share personal information
                with third parties for commercial purposes, and only collects
                data necessary for the App&apos;s core functionality.
              </p>
            ) : (
              <p>
                {app.name} does not address anyone under the age of 13. We do
                not knowingly collect personally identifiable information from
                children under 13. If you are a parent or guardian and believe
                your child has provided us with personal information, please
                contact us so we can take the appropriate action.
              </p>
            )}
          </div>
        </section>

        <div className="border-t border-[#e3bebd] mb-8" />

        {/* 8. Your Rights */}
        <section className="mb-8">
          <h2 className="text-base font-bold text-[#111c2d] mb-3 flex items-center gap-2">
            <span className={`${MONO} text-[10px] text-[#c41e3a] w-5`}>
              {pp.permissions.length > 0 ? "08" : "07"}
            </span>
            Your Rights
          </h2>
          <div className="pl-7 font-[family-name:var(--font-sans)] text-sm text-[#5f5e5e] leading-relaxed space-y-3">
            <p>
              You can stop all data collection by uninstalling {app.name} at any
              time using the standard uninstall process on your device.
            </p>
            <p>
              For requests to access, correct, or delete any data collected via
              third-party services (e.g. Firebase), please contact us at the
              address below and we will facilitate your request with the
              relevant service provider.
            </p>
          </div>
        </section>

        <div className="border-t border-[#e3bebd] mb-8" />

        {/* 9. Changes to This Policy */}
        <section className="mb-8">
          <h2 className="text-base font-bold text-[#111c2d] mb-3 flex items-center gap-2">
            <span className={`${MONO} text-[10px] text-[#c41e3a] w-5`}>
              {pp.permissions.length > 0 ? "09" : "08"}
            </span>
            Changes to This Privacy Policy
          </h2>
          <div className="pl-7 font-[family-name:var(--font-sans)] text-sm text-[#5f5e5e] leading-relaxed">
            <p>
              We may update this Privacy Policy from time to time. When we do,
              we will update the &quot;Last updated&quot; date at the top of
              this page. We encourage you to review this policy periodically.
              Continued use of the App after changes are posted constitutes your
              acceptance of the updated policy.
            </p>
          </div>
        </section>

        <div className="border-t border-[#e3bebd] mb-8" />

        {/* 10. Contact Us */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-[#111c2d] mb-3 flex items-center gap-2">
            <span className={`${MONO} text-[10px] text-[#c41e3a] w-5`}>
              {pp.permissions.length > 0 ? "10" : "09"}
            </span>
            Contact Us
          </h2>
          <div className="pl-7 font-[family-name:var(--font-sans)] text-sm text-[#5f5e5e] leading-relaxed">
            <p className="mb-3">
              If you have any questions about this Privacy Policy, please
              contact us:
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-3 border border-[#e3bebd] bg-[#fff5f5]">
              <span className="text-[#5f5e5e]">Email:</span>
              <a
                href={`mailto:${pp.contactEmail}`}
                className={`${MONO} text-[11px] text-[#c41e3a] hover:underline`}
              >
                {pp.contactEmail}
              </a>
            </div>
          </div>
        </section>

        {/* Additional notes if any */}
        {pp.additionalNotes && (
          <>
            <div className="border-t border-[#e3bebd] mb-8" />
            <section className="mb-10">
              <div className="pl-7 font-[family-name:var(--font-sans)] text-sm text-[#5f5e5e] leading-relaxed whitespace-pre-line">
                {pp.additionalNotes}
              </div>
            </section>
          </>
        )}
      </main>

      {/* ── Minimal footer ─────────────────────── */}
      <footer className="border-t border-[#e3bebd] bg-white">
        <div className="max-w-2xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="Paul Kreations home"
          >
            <div className="size-6 bg-[#c41e3a] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-[10px] tracking-tight select-none">
                PK
              </span>
            </div>
            <span className={`${MONO} text-[11px] text-[#5f5e5e]`}>
              Paul Kreations
            </span>
          </Link>
          <span className={`${MONO} text-[10px] text-[#8f6f6f]`}>
            © {new Date().getFullYear()} Paul Kreations. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
