"use client";

// components/wimm-admin/login-form.tsx
// Two independent sign-in methods, sharing one Turnstile verification:
// Google OAuth (primary) and email/password (sign-in only — there is no
// signup form; password accounts are created by hand in Supabase, same
// as the promo_admins row itself).

import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  signInWithGoogleAction,
  signInWithPasswordAction,
  type WimmAdminSignInState,
} from "@/server/actions/wimm-admin-auth";
import { TurnstileWidget } from "@/components/shared/turnstile-widget";

const HEADING = "font-[family-name:var(--font-wimm-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";
const FIELD =
  "w-full h-11 px-3 border border-[#D8E8E0] bg-white text-[#0E2A20] text-sm outline-none transition-all placeholder:text-[#8FA69B] focus:border-[#0F7A4E] focus:border-2 disabled:opacity-50 disabled:cursor-not-allowed";

const initialState: WimmAdminSignInState = { status: "idle" };

function ErrorBanner({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="flex items-start gap-2 px-3 py-2.5 border border-[#C0392B] bg-[#FCEEEC]">
      <span className={`${MONO} text-[11px] text-[#C0392B]`}>{message}</span>
    </div>
  );
}

export function WimmAdminLoginForm() {
  const [turnstileToken, setTurnstileToken] = useState("");

  const [googleState, googleFormAction, isGooglePending] = useActionState(
    signInWithGoogleAction,
    initialState,
  );
  const [passwordState, passwordFormAction, isPasswordPending] = useActionState(
    signInWithPasswordAction,
    initialState,
  );

  const isPending = isGooglePending || isPasswordPending;

  return (
    <div className="flex flex-col gap-5 w-full max-w-90">
      <TurnstileWidget
        onVerify={setTurnstileToken}
        onExpire={() => setTurnstileToken("")}
      />

      <form action={googleFormAction} className="flex flex-col gap-3">
        <input type="hidden" name="turnstileToken" value={turnstileToken} />

        <ErrorBanner
          message={
            googleState.status === "error" ? googleState.message : undefined
          }
        />

        <button
          type="submit"
          disabled={isPending || !turnstileToken}
          className={`${HEADING} inline-flex items-center justify-center gap-2 h-11 px-6 bg-[#0F7A4E] hover:bg-[#0A5C3A] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors`}
        >
          {isGooglePending ? (
            <>
              <Loader2 size={14} className="animate-spin" aria-hidden="true" />
              Redirecting…
            </>
          ) : (
            "Sign in with Google"
          )}
        </button>
      </form>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-[#D8E8E0]" />
        <span className={`${MONO} text-[10px] text-[#7C9187] uppercase`}>
          or
        </span>
        <div className="h-px flex-1 bg-[#D8E8E0]" />
      </div>

      <form action={passwordFormAction} className="flex flex-col gap-3">
        <input type="hidden" name="turnstileToken" value={turnstileToken} />

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className={`${MONO} text-[11px] text-[#4A5A52] uppercase`}
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={FIELD}
            disabled={isPending}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className={`${MONO} text-[11px] text-[#4A5A52] uppercase`}
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className={FIELD}
            disabled={isPending}
          />
        </div>

        <ErrorBanner
          message={
            passwordState.status === "error" ? passwordState.message : undefined
          }
        />

        <button
          type="submit"
          disabled={isPending || !turnstileToken}
          className="inline-flex items-center justify-center gap-2 h-11 px-6 border border-[#0F7A4E] hover:bg-[#EAF4EF] disabled:opacity-50 disabled:cursor-not-allowed text-[#0F7A4E] text-sm font-semibold transition-colors"
        >
          {isPasswordPending ? (
            <>
              <Loader2 size={14} className="animate-spin" aria-hidden="true" />
              Signing in…
            </>
          ) : (
            "Sign in with email"
          )}
        </button>
      </form>
    </div>
  );
}
