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

// ─────────────────────────────────────────────────────────────────────────────
// Account deletion request emails
// Two emails fire per request: one notifies YOU (so a human reviews and
// performs the deletion — see services/wimm/delete-account.ts for why this
// isn't automatic), one confirms receipt to the person who asked.
// ─────────────────────────────────────────────────────────────────────────────

type DeletionOwnerNotificationInput = {
  email: string;
  accountIdentifier?: string;
  reason?: string;
  requestId: string;
};

export async function sendDeletionRequestOwnerNotification(
  input: DeletionOwnerNotificationInput,
): Promise<{ success: true } | { success: false; error: string }> {
  const notifyTo =
    process.env.DELETION_REQUESTS_EMAIL || process.env.CONTACT_EMAIL;

  if (!notifyTo) {
    console.error(
      "[sendDeletionRequestOwnerNotification] Neither DELETION_REQUESTS_EMAIL nor CONTACT_EMAIL is set.",
    );
    return { success: false, error: "No notification recipient configured." };
  }

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#F6FAF8;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F6FAF8;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #D8E8E0;max-width:600px;width:100%;">
        <tr>
          <td style="background:#0E2A20;padding:16px 24px;">
            <span style="color:#ffffff;font-family:monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;">
              Where Is My Money? — Account Deletion Request
            </span>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 28px;">
            <p style="margin:0 0 16px;font-size:14px;color:#3A4A42;">
              A new account deletion request was submitted and logged
              (status: <strong>pending</strong>). Please review and process
              it, then mark it <code>completed</code> in
              <code>account_deletion_requests</code>.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #D8E8E0;">
              <tr>
                <td style="padding:8px 12px;background:#F6FAF8;border-bottom:1px solid #D8E8E0;border-right:1px solid #D8E8E0;font-family:monospace;font-size:10px;color:#7C9187;text-transform:uppercase;width:120px;">Email</td>
                <td style="padding:8px 12px;border-bottom:1px solid #D8E8E0;font-size:14px;"><a href="mailto:${input.email}" style="color:#0F7A4E;">${input.email}</a></td>
              </tr>
              <tr>
                <td style="padding:8px 12px;background:#F6FAF8;border-bottom:1px solid #D8E8E0;border-right:1px solid #D8E8E0;font-family:monospace;font-size:10px;color:#7C9187;text-transform:uppercase;">Account ID</td>
                <td style="padding:8px 12px;border-bottom:1px solid #D8E8E0;font-size:14px;color:#0E2A20;">${input.accountIdentifier || "—"}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;background:#F6FAF8;border-right:1px solid #D8E8E0;font-family:monospace;font-size:10px;color:#7C9187;text-transform:uppercase;">Request ID</td>
                <td style="padding:8px 12px;font-size:12px;color:#0E2A20;font-family:monospace;">${input.requestId}</td>
              </tr>
            </table>
            ${input.reason ? `<div style="margin-top:16px;padding:12px;background:#F6FAF8;border:1px solid #D8E8E0;"><span style="font-family:monospace;font-size:10px;color:#7C9187;text-transform:uppercase;">Reason given</span><p style="margin:6px 0 0;font-size:13px;color:#3A4A42;white-space:pre-wrap;">${input.reason}</p></div>` : ""}
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim();

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: notifyTo,
      replyTo: input.email,
      subject: `[Action needed] Account deletion request — ${input.email}`,
      html,
    });

    if (error) {
      console.error(
        "[sendDeletionRequestOwnerNotification] Resend error:",
        error,
      );
      return { success: false, error: "Failed to send notification email." };
    }
    return { success: true };
  } catch (err) {
    console.error(
      "[sendDeletionRequestOwnerNotification] Unexpected error:",
      err,
    );
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function sendDeletionRequestConfirmation(
  email: string,
): Promise<{ success: true } | { success: false; error: string }> {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#F6FAF8;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F6FAF8;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #D8E8E0;max-width:600px;width:100%;">
        <tr>
          <td style="background:#0F7A4E;padding:20px 24px;">
            <span style="color:#ffffff;font-family:monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;">
              Where Is My Money?
            </span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 28px;">
            <h1 style="margin:0 0 12px;font-size:20px;color:#0E2A20;">
              We received your deletion request
            </h1>
            <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#3A4A42;">
              We'll review and process this within 30 days and won't email
              you again unless we need to confirm your identity first.
            </p>
            <p style="margin:0;font-size:13px;color:#5B6E64;">
              — The Paul Kreations team
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim();

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: "We received your deletion request",
      html,
    });

    if (error) {
      console.error("[sendDeletionRequestConfirmation] Resend error:", error);
      return { success: false, error: "Failed to send confirmation email." };
    }
    return { success: true };
  } catch (err) {
    console.error("[sendDeletionRequestConfirmation] Unexpected error:", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}
