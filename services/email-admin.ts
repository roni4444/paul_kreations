// services/email-admin.ts
// Sends the admin sign-in link. Kept separate from services/email.ts (the
// public contact form) since the audience, content, and failure handling
// differ enough not to share a function.

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAdminSignInEmail(
  email: string,
  link: string,
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your Paul Kreations admin sign-in link",
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:32px 16px;background:#f9f9ff;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;margin:0 auto;background:#ffffff;border:1px solid #e3bebd;">
    <tr>
      <td style="background:#c41e3a;padding:14px 20px;font-family:monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#ffffff;">
        Paul Kreations — Admin sign-in
      </td>
    </tr>
    <tr>
      <td style="padding:24px;font-size:14px;color:#111c2d;line-height:1.6;">
        <p>Click below to sign in. This link works once and expires shortly.</p>
        <p style="margin:20px 0;">
          <a href="${link}" style="display:inline-block;background:#c41e3a;color:#ffffff;text-decoration:none;padding:10px 20px;font-weight:600;font-size:14px;">
            Sign in to admin
          </a>
        </p>
        <p style="color:#5f5e5e;font-size:12px;">
          If you didn't request this, you can ignore this email — no
          account changes happen until the link above is opened.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
      `.trim(),
    });

    if (error) {
      return { success: false, error: "Failed to send the sign-in email." };
    }
    return { success: true };
  } catch {
    return { success: false, error: "Failed to send the sign-in email." };
  }
}
