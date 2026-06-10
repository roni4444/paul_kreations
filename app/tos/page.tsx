// app/tos/page.tsx
// Terms of Service — minimal standalone page.
// Linked from the site footer.

import type { Metadata } from "next";
import Link from "next/link";
import { BASE_URL } from "@/lib/config";
import { ArrowLeft, FileText } from "lucide-react";

const UPDATED = "2025-06-10";
const CONTACT_EMAIL = "contact@paulkreations.com";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Paul Kreations — governing use of our website and engagement with our services.",
  alternates: { canonical: `${BASE_URL}/tos` },
  openGraph: {
    title: "Terms of Service — Paul Kreations",
    description:
      "Terms governing use of paulkreations.com and engagement with our services.",
    url: `${BASE_URL}/tos`,
    type: "website",
    siteName: "Paul Kreations",
  },
  robots: { index: true, follow: false },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const SECTIONS = [
  {
    n: "01",
    title: "Acceptance of Terms",
    body: `By accessing paulkreations.com or engaging Paul Kreations for any service, you confirm that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree, please do not use our website or engage our services.`,
  },
  {
    n: "02",
    title: "Services",
    body: `Paul Kreations provides the following services: Android application development, web development, mobile game development, digital marketing strategy, social media content creation, and CV/résumé optimisation. The scope, timeline, and deliverables for each engagement are agreed in writing before work begins.`,
  },
  {
    n: "03",
    title: "Engagement & Scope",
    body: `All service engagements begin with a written agreement (email or document) defining the scope of work, deliverables, timeline, and fees. Work outside the agreed scope is subject to a separate agreement and additional fees. Paul Kreations reserves the right to decline any engagement at its discretion.`,
  },
  {
    n: "04",
    title: "Payment",
    body: `Payment terms are agreed per project. Unless otherwise stated, a deposit may be required before work begins. Final deliverables are released upon receipt of full payment. Late payments may result in work being paused. All fees are exclusive of applicable taxes.`,
  },
  {
    n: "05",
    title: "Intellectual Property",
    body: `Upon receipt of full payment, the client owns all final deliverables produced specifically for their project. Paul Kreations retains ownership of all pre-existing code, frameworks, tools, and methodologies used in delivery. Paul Kreations may display completed work in its portfolio unless the client requests confidentiality in writing.`,
  },
  {
    n: "06",
    title: "Confidentiality",
    body: `Paul Kreations will treat all non-public client information shared during an engagement as confidential and will not disclose it to third parties without written consent, except where required by law.`,
  },
  {
    n: "07",
    title: "Client Responsibilities",
    body: `The client is responsible for providing accurate information, timely feedback, and any assets or access required for the work. Delays caused by the client may affect the timeline and are not the responsibility of Paul Kreations.`,
  },
  {
    n: "08",
    title: "Limitation of Liability",
    body: `Paul Kreations' total liability for any claim arising from a service engagement shall not exceed the total fees paid for that engagement. Paul Kreations is not liable for indirect, incidental, or consequential damages. No warranty is given for third-party services, platforms, or APIs used in delivery.`,
  },
  {
    n: "09",
    title: "Termination",
    body: `Either party may terminate an engagement with written notice. Upon termination, the client is responsible for fees corresponding to work completed up to the termination date. Deliverables for completed portions will be provided upon receipt of outstanding payment.`,
  },
  {
    n: "10",
    title: "Website Use",
    body: `You may browse paulkreations.com for personal, non-commercial purposes. You may not reproduce, distribute, or create derivative works from any content on this website without written permission. Paul Kreations reserves the right to modify or discontinue the website at any time.`,
  },
  {
    n: "11",
    title: "Privacy",
    body: `Use of this website and our apps is also governed by our individual app privacy policies, accessible via the Products section of this website. We do not sell personal data to third parties.`,
  },
  {
    n: "12",
    title: "Governing Law",
    body: `These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of West Bengal, India.`,
  },
  {
    n: "13",
    title: "Changes to These Terms",
    body: `Paul Kreations may update these Terms at any time. The "Last updated" date at the top of this page reflects the most recent revision. Continued use of the website or our services after changes are posted constitutes acceptance of the revised Terms.`,
  },
];

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white text-[#111c2d]">
      {/* ── Header ───────────────────────────────── */}
      <header className="border-b border-[#e3bebd] bg-white">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-[#5f5e5e] hover:text-[#c41e3a] transition-colors"
            aria-label="Back to Paul Kreations"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            <span className={`${MONO} text-[11px]`}>
              {BASE_URL.replace(/^https?:\/\//, "")}
            </span>
          </Link>
          <div className="flex items-center gap-1.5">
            <FileText size={15} className="text-[#c41e3a]" aria-hidden="true" />
            <span className={`${MONO} text-[11px] text-[#8f6f6f]`}>
              Terms of Service
            </span>
          </div>
        </div>
      </header>

      {/* ── Content ──────────────────────────────── */}
      <main className="max-w-2xl mx-auto px-6 py-12">
        {/* Title block */}
        <div className="mb-10 pb-8 border-b border-[#e3bebd]">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-4 border border-[#e3bebd] bg-[#ffdad9]">
            <span
              className={`${MONO} text-[11px] font-semibold text-[#c41e3a] uppercase`}
            >
              Legal
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-[-0.025em] text-[#111c2d] mb-2">
            Paul Kreations
          </h1>
          <p className="text-xl font-semibold text-[#111c2d] mb-3">
            Terms of Service
          </p>
          <p className={`${MONO} text-[11px] text-[#8f6f6f]`}>
            Last updated: {formatDate(UPDATED)}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {SECTIONS.map((s) => (
            <section key={s.n}>
              <h2 className="text-base font-bold text-[#111c2d] mb-3 flex items-center gap-2">
                <span className={`${MONO} text-[10px] text-[#c41e3a] w-5`}>
                  {s.n}
                </span>
                {s.title}
              </h2>
              <p className="pl-7 font-[family-name:var(--font-sans)] text-sm text-[#5f5e5e] leading-relaxed">
                {s.body}
              </p>
              <div className="mt-8 border-t border-[#e3bebd]" />
            </section>
          ))}
        </div>

        {/* Contact */}
        <section className="mt-8">
          <h2 className="text-base font-bold text-[#111c2d] mb-3 flex items-center gap-2">
            <span className={`${MONO} text-[10px] text-[#c41e3a] w-5`}>14</span>
            Contact
          </h2>
          <div className="pl-7 font-[family-name:var(--font-sans)] text-sm text-[#5f5e5e] leading-relaxed">
            <p className="mb-3">
              Questions or concerns about these Terms? Contact us:
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-3 border border-[#e3bebd] bg-[#fff5f5]">
              <span className="text-[#5f5e5e]">Email:</span>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className={`${MONO} text-[11px] text-[#c41e3a] hover:underline`}
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────── */}
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
