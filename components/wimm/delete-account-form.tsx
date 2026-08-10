"use client";

// components/wimm/delete-account-form.tsx
// Submits via server/actions/delete-account.ts. Deliberately does not
// require the user to be logged in — Play Store requires this path to work
// for someone who has already uninstalled the app.

import { useState, useTransition } from "react";
import { AlertCircle, CheckCircle, Loader2, Send } from "lucide-react";
import { deleteAccountSchema } from "@/schemas/delete-account";
import { submitDeleteAccountRequest } from "@/server/actions/delete-account";
import { TurnstileWidget } from "@/components/shared/turnstile-widget";

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

const FIELD =
  "w-full px-3 border border-[#D8E8E0] bg-white text-[#0E2A20] text-sm outline-none transition-all placeholder:text-[#8FA69B] focus:border-[#0F7A4E] focus:border-2 disabled:opacity-50 disabled:cursor-not-allowed";

type Status = "idle" | "success" | "error";

export function WimmDeleteAccountForm() {
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
      email: (raw.get("email") as string) ?? "",
      accountIdentifier: (raw.get("accountIdentifier") as string) ?? "",
      reason: (raw.get("reason") as string) ?? "",
      turnstileToken,
      website: (raw.get("website") as string) ?? "",
    };

    const parsed = deleteAccountSchema.safeParse(data);
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
      const result = await submitDeleteAccountRequest(data);

      if (result.success) {
        setStatus("success");
        setStatusMessage(
          "Request received. We'll process it within 30 days and confirm by email.",
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
      className="flex flex-col gap-5 w-full max-w-[480px]"
    >
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

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className={`${MONO} text-[11px] text-[#4A5A52] uppercase`}
        >
          Email used for your account <span className="text-[#0F7A4E]">*</span>
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

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="accountIdentifier"
          className={`${MONO} text-[11px] text-[#4A5A52] uppercase`}
        >
          Username or phone number (optional)
        </label>
        <input
          id="accountIdentifier"
          name="accountIdentifier"
          type="text"
          placeholder="If different from the email above"
          className={`${FIELD} h-11`}
          disabled={isPending}
        />
        {fieldErrors.accountIdentifier && (
          <span className={`${MONO} text-[10px] text-[#C0392B]`}>
            {fieldErrors.accountIdentifier[0]}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="reason"
          className={`${MONO} text-[11px] text-[#4A5A52] uppercase`}
        >
          Reason (optional)
        </label>
        <textarea
          id="reason"
          name="reason"
          rows={3}
          placeholder="Optional — helps us improve"
          className={`${FIELD} py-2 resize-none`}
          disabled={isPending}
        />
        {fieldErrors.reason && (
          <span className={`${MONO} text-[10px] text-[#C0392B]`}>
            {fieldErrors.reason[0]}
          </span>
        )}
      </div>

      <TurnstileWidget
        onVerify={setTurnstileToken}
        onExpire={() => setTurnstileToken("")}
      />

      <button
        type="submit"
        disabled={isPending || status === "success"}
        className="inline-flex items-center justify-center gap-2 h-11 px-6 bg-[#0F7A4E] hover:bg-[#0A5C3A] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
      >
        {isPending ? (
          <>
            <Loader2 size={14} className="animate-spin" aria-hidden="true" />
            Submitting...
          </>
        ) : (
          <>
            <Send size={14} aria-hidden="true" />
            Submit Deletion Request
          </>
        )}
      </button>

      {status === "success" && (
        <div className="flex items-start gap-2">
          <CheckCircle
            size={14}
            className="text-[#0F7A4E] flex-shrink-0 mt-0.5"
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
    </form>
  );
}
