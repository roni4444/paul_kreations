"use client";

// components/sections/contact.tsx
// Contact form — client component for interactivity.
// Submits via Server Action (server/actions/contact.ts).
// "Contacting" dropdown auto-populates from teamMembers in lib/data/index.ts.

import { useState, useTransition } from "react";
import { contactSchema } from "@/schemas/contact";
import { submitContactForm } from "@/server/actions/contact";
import { teamMembers } from "@/lib/data";
import { AlertCircle, CheckCircle, Loader2, Send } from "lucide-react";

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

// Dropdown options — stays in sync automatically as team members are added
const CONTACT_OPTIONS = [
  "Paul Kreations — General Inquiry",
  ...teamMembers.map((m) => `${m.name} — ${m.role}`),
];

type Status = "idle" | "success" | "error";

// Shared input/textarea class
const FIELD =
  "w-full px-3 border border-[#e3bebd] bg-white text-[#111c2d] text-sm outline-none transition-all placeholder:text-[#8f6f6f] font-[family-name:var(--font-sans)] focus:border-[#c41e3a] focus:border-2 disabled:opacity-50 disabled:cursor-not-allowed";

export function Contact() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [formKey, setFormKey] = useState(0); // resets form on success

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const raw = new FormData(e.currentTarget);
    const data = {
      fullName: (raw.get("fullName") as string) ?? "",
      email: (raw.get("email") as string) ?? "",
      contactingTo: (raw.get("contactingTo") as string) ?? "",
      message: (raw.get("message") as string) ?? "",
    };

    // Client-side validation for instant feedback
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      setFieldErrors(
        parsed.error.flatten().fieldErrors as Record<string, string[]>,
      );
      return;
    }
    setFieldErrors({});

    startTransition(async () => {
      const result = await submitContactForm(data);

      if (result.success) {
        setStatus("success");
        setStatusMessage("Message sent! We'll get back to you soon.");
        setFormKey((k) => k + 1); // unmounts and remounts form → clears all fields
      } else if ("fieldErrors" in result) {
        setFieldErrors(result.fieldErrors);
        setStatus("error");
        setStatusMessage("Please fix the errors above.");
      } else {
        setStatus("error");
        setStatusMessage(result.error);
      }
    });
  }

  return (
    <section id="contact" className="py-24 bg-[#f9f9ff]">
      <div className="max-w-[1280px] mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* ── Left: Header ─────────────────────── */}
          <div>
            <span
              className={`${MONO} inline-block text-[11px] text-[#c41e3a] uppercase mb-4`}
            >
              Get in Touch
            </span>
            <h2 className="text-[2rem] font-bold tracking-[-0.025em] text-[#111c2d] leading-tight mb-4">
              Contact Us
            </h2>
            <p className="font-[family-name:var(--font-sans)] text-[#5f5e5e] leading-relaxed mb-8">
              Have a project in mind, a collaboration idea, or just want to say
              hello? Fill in the form and we&apos;ll get back to you.
            </p>

            {/* Info chips */}
            <div className="flex flex-col gap-3">
              {[
                { label: "Response time", value: "Within 24–48 hours" },
                { label: "Email", value: "debapriyopaul.dp@gmail.com" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div
                    className="w-[2px] h-4 bg-[#c41e3a] flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span
                    className={`${MONO} text-[10px] text-[#8f6f6f] uppercase w-28 flex-shrink-0`}
                  >
                    {item.label}
                  </span>
                  <span className={`${MONO} text-[11px] text-[#111c2d]`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Form ──────────────────────── */}
          <form
            key={formKey}
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5"
          >
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="fullName"
                className={`${MONO} text-[11px] text-[#5f5e5e] uppercase`}
              >
                Full Name <span className="text-[#c41e3a]">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Your full name"
                className={`${FIELD} h-10`}
                disabled={isPending}
                autoComplete="name"
              />
              {fieldErrors.fullName && (
                <span className={`${MONO} text-[10px] text-[#c41e3a]`}>
                  {fieldErrors.fullName[0]}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className={`${MONO} text-[11px] text-[#5f5e5e] uppercase`}
              >
                Email Address <span className="text-[#c41e3a]">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                className={`${FIELD} ${MONO} h-10 text-[13px]`}
                disabled={isPending}
                autoComplete="email"
              />
              {fieldErrors.email && (
                <span className={`${MONO} text-[10px] text-[#c41e3a]`}>
                  {fieldErrors.email[0]}
                </span>
              )}
            </div>

            {/* Contacting To */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contactingTo"
                className={`${MONO} text-[11px] text-[#5f5e5e] uppercase`}
              >
                Contacting <span className="text-[#c41e3a]">*</span>
              </label>
              <select
                id="contactingTo"
                name="contactingTo"
                defaultValue=""
                className={`${FIELD} ${MONO} h-10 text-[12px] cursor-pointer`}
                disabled={isPending}
              >
                <option value="" disabled>
                  Select recipient
                </option>
                {CONTACT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {fieldErrors.contactingTo && (
                <span className={`${MONO} text-[10px] text-[#c41e3a]`}>
                  {fieldErrors.contactingTo[0]}
                </span>
              )}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className={`${MONO} text-[11px] text-[#5f5e5e] uppercase`}
              >
                Message <span className="text-[#c41e3a]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us what's on your mind..."
                className={`${FIELD} py-2.5 resize-none`}
                disabled={isPending}
              />
              {fieldErrors.message && (
                <span className={`${MONO} text-[10px] text-[#c41e3a]`}>
                  {fieldErrors.message[0]}
                </span>
              )}
            </div>

            {/* Submit */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={isPending || status === "success"}
                className="inline-flex items-center gap-2 h-10 px-6 bg-[#c41e3a] hover:bg-[#9e0027] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
              >
                {isPending ? (
                  <>
                    <Loader2
                      size={14}
                      className="animate-spin"
                      aria-hidden="true"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={14} aria-hidden="true" />
                    Send Message
                  </>
                )}
              </button>

              {status === "success" && (
                <div className="flex items-center gap-2">
                  <CheckCircle
                    size={14}
                    className="text-[#c41e3a] flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className={`${MONO} text-[11px] text-[#111c2d]`}>
                    {statusMessage}
                  </span>
                </div>
              )}
            </div>

            {/* Error banner */}
            {status === "error" && (
              <div className="flex items-start gap-2 px-3 py-2.5 border border-[#c41e3a] bg-[#fff5f5]">
                <AlertCircle
                  size={14}
                  className="text-[#c41e3a] flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span className={`${MONO} text-[11px] text-[#c41e3a]`}>
                  {statusMessage}
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
