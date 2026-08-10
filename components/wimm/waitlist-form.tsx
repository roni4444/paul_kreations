"use client";

// components/wimm/waitlist-form.tsx
// Client component for interactivity. Submits via Server Action
// (server/actions/waitlist.ts). Follows the same validate-then-submit
// pattern as components/sections/contact.tsx, plus Turnstile + honeypot
// per PROJECT_RULES.md §9.
//
// Color note: the brand palette avoids red as a primary/semantic color
// (see lib/data/wimm.ts brand notes), but field-level validation errors
// still use a muted red — that's a universal UX convention for "something's
// wrong here," not a statement about the user's finances, so it stays.

import { useState, useTransition } from "react";
import { AlertCircle, CheckCircle, Loader2, Send } from "lucide-react";
import { waitlistSchema } from "@/schemas/waitlist";
import { submitWaitlistForm } from "@/server/actions/waitlist";
import { WIMM_INTEREST_OPTIONS, WIMM_PLATFORM_OPTIONS } from "@/lib/data/wimm";
import { TurnstileWidget } from "@/components/shared/turnstile-widget";

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

const FIELD =
  "w-full px-3 border border-[#D8E8E0] bg-white text-[#0E2A20] text-sm outline-none transition-all placeholder:text-[#8FA69B] focus:border-[#0F7A4E] focus:border-2 disabled:opacity-50 disabled:cursor-not-allowed";

type Status = "idle" | "success" | "error";

export function WimmWaitlistForm() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [formKey, setFormKey] = useState(0);
  const [turnstileToken, setTurnstileToken] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const raw = new FormData(e.currentTarget);
    const data = {
      fullName: (raw.get("fullName") as string) ?? "",
      email: (raw.get("email") as string) ?? "",
      useCase: (raw.get("useCase") as string) ?? "",
      platform: (raw.get("platform") as string) ?? "",
      turnstileToken,
      website: (raw.get("website") as string) ?? "", // honeypot
      source:
        typeof document !== "undefined"
          ? (new URLSearchParams(window.location.search).get("utm_source") ??
            document.referrer.replace(/^https?:\/\//, "").split("/")[0] ??
            "direct")
          : "direct",
    };

    const parsed = waitlistSchema.safeParse(data);
    if (!parsed.success) {
      setFieldErrors(
        parsed.error.flatten().fieldErrors as Record<string, string[]>,
      );
      if (!turnstileToken) {
        setStatus("error");
        setStatusMessage("Please complete the verification below.");
      }
      return;
    }
    setFieldErrors({});

    startTransition(async () => {
      const result = await submitWaitlistForm(data);

      if (result.success) {
        setStatus("success");
        setStatusMessage(
          result.alreadyExists
            ? "You're already on the list — we'll be in touch!"
            : "You're on the list! Check your inbox for a confirmation email.",
        );
        setFormKey((k) => k + 1);
        setTurnstileToken("");
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
    <form
      key={formKey}
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5 w-full max-w-[440px] mx-auto"
    >
      {/* Honeypot — hidden from real users via CSS, bots fill it anyway */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Full Name */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="fullName"
          className={`${MONO} text-[11px] text-[#4A5A52] uppercase`}
        >
          Full Name <span className="text-[#0F7A4E]">*</span>
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Your full name"
          className={`${FIELD} h-11`}
          disabled={isPending}
          autoComplete="name"
        />
        {fieldErrors.fullName && (
          <span className={`${MONO} text-[10px] text-[#C0392B]`}>
            {fieldErrors.fullName[0]}
          </span>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className={`${MONO} text-[11px] text-[#4A5A52] uppercase`}
        >
          Email Address <span className="text-[#0F7A4E]">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          className={`${FIELD} ${MONO} h-11 text-[13px]`}
          disabled={isPending}
          autoComplete="email"
        />
        {fieldErrors.email && (
          <span className={`${MONO} text-[10px] text-[#C0392B]`}>
            {fieldErrors.email[0]}
          </span>
        )}
      </div>

      {/* Use case */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="useCase"
          className={`${MONO} text-[11px] text-[#4A5A52] uppercase`}
        >
          Which best describes you? <span className="text-[#0F7A4E]">*</span>
        </label>
        <select
          id="useCase"
          name="useCase"
          defaultValue=""
          className={`${FIELD} ${MONO} h-11 text-[12px] cursor-pointer`}
          disabled={isPending}
        >
          <option value="" disabled>
            Select one
          </option>
          {WIMM_INTEREST_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {fieldErrors.useCase && (
          <span className={`${MONO} text-[10px] text-[#C0392B]`}>
            {fieldErrors.useCase[0]}
          </span>
        )}
      </div>

      {/* Platform */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="platform"
          className={`${MONO} text-[11px] text-[#4A5A52] uppercase`}
        >
          Preferred Platform <span className="text-[#0F7A4E]">*</span>
        </label>
        <select
          id="platform"
          name="platform"
          defaultValue=""
          className={`${FIELD} ${MONO} h-11 text-[12px] cursor-pointer`}
          disabled={isPending}
        >
          <option value="" disabled>
            Select one
          </option>
          {WIMM_PLATFORM_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {fieldErrors.platform && (
          <span className={`${MONO} text-[10px] text-[#C0392B]`}>
            {fieldErrors.platform[0]}
          </span>
        )}
      </div>

      {/* Turnstile */}
      <TurnstileWidget
        onVerify={setTurnstileToken}
        onExpire={() => setTurnstileToken("")}
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending || status === "success"}
        className="inline-flex items-center justify-center gap-2 h-11 px-6 bg-[#0F7A4E] hover:bg-[#0A5C3A] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
      >
        {isPending ? (
          <>
            <Loader2 size={14} className="animate-spin" aria-hidden="true" />
            Joining...
          </>
        ) : (
          <>
            <Send size={14} aria-hidden="true" />
            Join the Waitlist
          </>
        )}
      </button>

      {status === "success" && (
        <div className="flex items-center gap-2 justify-center">
          <CheckCircle
            size={14}
            className="text-[#0F7A4E] flex-shrink-0"
            aria-hidden="true"
          />
          <span className={`${MONO} text-[11px] text-[#0E2A20]`}>
            {statusMessage}
          </span>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-start gap-2 px-3 py-2.5 border border-[#C0392B] bg-[#FCEEEC]">
          <AlertCircle
            size={14}
            className="text-[#C0392B] flex-shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <span className={`${MONO} text-[11px] text-[#C0392B]`}>
            {statusMessage}
          </span>
        </div>
      )}

      <p className={`${MONO} text-center text-[10px] text-[#8FA69B]`}>
        We&apos;ll never spam you. One email per month, max.
      </p>
    </form>
  );
}
