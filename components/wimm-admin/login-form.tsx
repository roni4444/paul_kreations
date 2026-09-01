"use client";

// components/wimm-admin/login-form.tsx

import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  signInWithGoogleAction,
  type WimmAdminSignInState,
} from "@/server/actions/wimm-admin-auth";
import { TurnstileWidget } from "@/components/shared/turnstile-widget";

const HEADING = "font-[family-name:var(--font-wimm-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

const initialState: WimmAdminSignInState = { status: "idle" };

export function WimmAdminLoginForm() {
  const [state, formAction, isPending] = useActionState(
    signInWithGoogleAction,
    initialState,
  );
  const [turnstileToken, setTurnstileToken] = useState("");

  return (
    <form
      action={formAction}
      className="flex flex-col gap-5 w-full max-w-[360px]"
    >
      <input type="hidden" name="turnstileToken" value={turnstileToken} />

      <TurnstileWidget
        onVerify={setTurnstileToken}
        onExpire={() => setTurnstileToken("")}
      />

      {state.status === "error" && (
        <div className="flex items-start gap-2 px-3 py-2.5 border border-[#C0392B] bg-[#FCEEEC]">
          <span className={`${MONO} text-[11px] text-[#C0392B]`}>
            {state.message}
          </span>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending || !turnstileToken}
        className={`${HEADING} inline-flex items-center justify-center gap-2 h-11 px-6 bg-[#0F7A4E] hover:bg-[#0A5C3A] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors`}
      >
        {isPending ? (
          <>
            <Loader2 size={14} className="animate-spin" aria-hidden="true" />
            Redirecting…
          </>
        ) : (
          "Sign in with Google"
        )}
      </button>
    </form>
  );
}
