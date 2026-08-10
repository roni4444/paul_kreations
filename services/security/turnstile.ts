// services/security/turnstile.ts
// Server-side verification for Cloudflare Turnstile tokens.
// Required by PROJECT_RULES.md §9: "Cloudflare Turnstile for all public forms."
//
// Pair with the client widget at components/shared/turnstile-widget.tsx.
// Never trust a Turnstile token without verifying it here — the widget only
// proves the browser rendered the challenge, not that it passed.

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type TurnstileVerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
};

export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string,
): Promise<{ success: true } | { success: false; error: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    // Fail closed in production, fail open in local dev so the form
    // remains testable without a live Turnstile secret configured.
    console.error("[verifyTurnstileToken] TURNSTILE_SECRET_KEY is not set");
    if (process.env.NODE_ENV === "production") {
      return { success: false, error: "Verification is not configured." };
    }
    return { success: true };
  }

  if (!token) {
    return { success: false, error: "Missing verification token." };
  }

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp) body.set("remoteip", remoteIp);

    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    const data = (await res.json()) as TurnstileVerifyResponse;

    if (!data.success) {
      console.warn(
        "[verifyTurnstileToken] Turnstile rejected token:",
        data["error-codes"],
      );
      return { success: false, error: "Verification failed. Please retry." };
    }

    return { success: true };
  } catch (err) {
    console.error("[verifyTurnstileToken] Unexpected error:", err);
    return {
      success: false,
      error: "Could not verify you're human. Please try again.",
    };
  }
}
