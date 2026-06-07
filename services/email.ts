// services/email.ts
// All email logic lives here — never imported directly in UI or route handlers.
// Called only from server/actions/contact.ts

import { Resend } from "resend";
import type { ContactFormData } from "@/schemas/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Subject line ─────────────────────────────────────────────────────────────
// Different subject depending on who the user is contacting.
// Makes Gmail filtering easy.

function buildSubject(data: ContactFormData): string {
  if (data.contactingTo.startsWith("Paul Kreations")) {
    return `[Paul Kreations] New message from ${data.fullName}`;
  }
  const recipientName = data.contactingTo.split(" — ")[0];
  return `[For ${recipientName}] New message from ${data.fullName}`;
}

// ─── HTML email template ──────────────────────────────────────────────────────
// Branded to match the Kinetic Precision design system.
// Recipient can reply directly — replyTo is set to the sender's email.

function buildHtml(data: ContactFormData): string {
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "long",
    timeStyle: "short",
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9f9ff;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9ff;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e3bebd;max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#c41e3a;padding:16px 24px;">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#ffffff;width:28px;height:28px;text-align:center;vertical-align:middle;margin-right:10px;">
                  <span style="color:#c41e3a;font-weight:900;font-size:13px;line-height:28px;display:block;">PK</span>
                </td>
                <td style="padding-left:10px;">
                  <span style="color:#ffffff;font-family:monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;">
                    Paul Kreations — New Contact Message
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:24px;">

            <!-- Meta table -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e3bebd;margin-bottom:20px;">
              <tr>
                <td style="padding:8px 12px;background:#fff5f5;border-bottom:1px solid #e3bebd;border-right:1px solid #e3bebd;font-family:monospace;font-size:10px;color:#8f6f6f;text-transform:uppercase;letter-spacing:0.05em;width:110px;white-space:nowrap;">
                  From
                </td>
                <td style="padding:8px 12px;border-bottom:1px solid #e3bebd;font-size:14px;color:#111c2d;">
                  ${data.fullName}
                </td>
              </tr>
              <tr>
                <td style="padding:8px 12px;background:#fff5f5;border-bottom:1px solid #e3bebd;border-right:1px solid #e3bebd;font-family:monospace;font-size:10px;color:#8f6f6f;text-transform:uppercase;letter-spacing:0.05em;">
                  Reply To
                </td>
                <td style="padding:8px 12px;border-bottom:1px solid #e3bebd;font-size:14px;">
                  <a href="mailto:${data.email}" style="color:#c41e3a;text-decoration:none;">${data.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 12px;background:#fff5f5;border-right:1px solid #e3bebd;font-family:monospace;font-size:10px;color:#8f6f6f;text-transform:uppercase;letter-spacing:0.05em;">
                  Contacting
                </td>
                <td style="padding:8px 12px;font-size:14px;color:#111c2d;">
                  ${data.contactingTo}
                </td>
              </tr>
            </table>

            <!-- Message -->
            <div style="font-family:monospace;font-size:10px;color:#8f6f6f;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">
              Message
            </div>
            <div style="border:1px solid #e3bebd;background:#f9f9ff;padding:16px;font-size:14px;color:#111c2d;line-height:1.7;white-space:pre-wrap;">
${data.message}
            </div>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:12px 24px;border-top:1px solid #e3bebd;background:#f9f9ff;">
            <span style="font-family:monospace;font-size:10px;color:#8f6f6f;letter-spacing:0.05em;">
              Sent via paulkreations.com contact form &nbsp;·&nbsp; ${timestamp} IST
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

// ─── Public API ───────────────────────────────────────────────────────────────

export async function sendContactEmail(
  data: ContactFormData,
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const { error } = await resend.emails.send({
      // onboarding@resend.dev can only deliver to the email address
      // you registered your Resend account with.
      // Replace with your own domain address once you have a custom domain:
      // from: "contact@paulkreations.com"
      from: "onboarding@resend.dev",
      to: process.env.CONTACT_EMAIL!,
      replyTo: data.email, // hitting Reply in Gmail goes straight to the sender
      subject: buildSubject(data),
      html: buildHtml(data),
    });

    if (error) {
      console.error("[sendContactEmail] Resend error:", error);
      return {
        success: false,
        error: "Failed to send your message. Please try again.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("[sendContactEmail] Unexpected error:", err);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
