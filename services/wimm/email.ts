// services/wimm/email.ts
// All Where Is My Money?-specific email logic — never imported directly in
// UI or routes. Called only from server/actions/waitlist.ts.
//
// Uses the mail.paulkreations.com sending domain you verified in Resend
// (Domain → mail.paulkreations.com → Verified, Cloudflare DNS, Tokyo region).
// Because that subdomain — not the bare root domain — is what's verified,
// every "from" address here must end in @mail.paulkreations.com.
//
// This template intentionally uses the product's own green/gold palette
// (not the parent site's crimson) — see the brand notes at the top of
// lib/data/wimm.ts for the full rationale.

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS = "Where Is My Money? <waitlist@mail.paulkreations.com>";

type WelcomeEmailInput = {
  fullName: string;
  email: string;
};

function buildWelcomeHtml({ fullName }: WelcomeEmailInput): string {
  const firstName = fullName.trim().split(" ")[0] || fullName;

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F6FAF8;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F6FAF8;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #D8E8E0;max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#0F7A4E;padding:20px 24px;">
            <span style="color:#ffffff;font-family:monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;">
              Where Is My Money? &nbsp;·&nbsp; by Paul Kreations
            </span>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 28px;">
            <h1 style="margin:0 0 12px;font-size:22px;color:#0E2A20;">
              You're on the list, ${firstName}.
            </h1>
            <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#3A4A42;">
              Thanks for signing up for early access to <strong>Where Is My
              Money?</strong> — your complete personal finance operating
              system: banking, cards, investments, debt, tax, travel,
              vehicles, and family budgets, all in one dashboard.
            </p>
            <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#3A4A42;">
              We're targeting launch around <strong>22 August 2026</strong>.
              We'll email you the moment early access opens — no spam, just
              the launch notice and (after that) at most one email a month.
            </p>
            <div style="margin:24px 0;padding:16px;background:#FBF1DD;border:1px solid #EAD9AE;">
              <span style="font-family:monospace;font-size:10px;color:#B27B1F;text-transform:uppercase;letter-spacing:0.05em;">
                What happens next
              </span>
              <p style="margin:8px 0 0;font-size:14px;color:#3A4A42;line-height:1.6;">
                Nothing needed from you right now. We'll reach out only when
                there's something worth telling you — a launch date, early
                access, or a feature update.
              </p>
            </div>
            <p style="margin:0;font-size:13px;color:#5B6E64;">
              — The Paul Kreations team
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:16px 28px;border-top:1px solid #D8E8E0;background:#F6FAF8;">
            <span style="font-family:monospace;font-size:10px;color:#7C9187;letter-spacing:0.05em;">
              paulkreations.com/wimm &nbsp;·&nbsp; One email per month, max. Unsubscribe anytime.
            </span>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim();
}

export async function sendWaitlistWelcomeEmail(
  input: WelcomeEmailInput,
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: input.email,
      subject: "You're on the Where Is My Money? early access list",
      html: buildWelcomeHtml(input),
    });

    if (error) {
      console.error("[sendWaitlistWelcomeEmail] Resend error:", error);
      return { success: false, error: "Failed to send welcome email." };
    }

    return { success: true };
  } catch (err) {
    console.error("[sendWaitlistWelcomeEmail] Unexpected error:", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}
