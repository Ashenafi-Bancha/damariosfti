import { Resend } from "resend";
import type { ApplyData } from "./applySchema";

export interface NotifyResult {
  emailSent: boolean;
  telegramSent: boolean;
  /** false = neither channel has credentials — surface this, never fake success */
  configured: boolean;
}

function formatLines(data: ApplyData): string[] {
  return [
    `Name: ${data.fullName}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email || "—"}`,
    `Programme: ${data.programme}`,
    `Preferred level: ${data.level}`,
    `Preferred start: ${data.intake}`,
    `Previous education: ${data.education}`,
    `Heard via: ${data.heard}`,
  ];
}

/**
 * Telegram first — it is the channel the staff actually read. Applicant
 * data is relayed and never stored anywhere in this prototype.
 */
export async function notifyInstitute(data: ApplyData): Promise<NotifyResult> {
  const {
    RESEND_API_KEY,
    RESEND_FROM,
    APPLY_TO_EMAIL,
    TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID,
  } = process.env;

  const emailConfigured = Boolean(RESEND_API_KEY && RESEND_FROM && APPLY_TO_EMAIL);
  const telegramConfigured = Boolean(TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID);
  const lines = formatLines(data);

  let telegramSent = false;
  if (telegramConfigured) {
    try {
      const res = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: `New application — Damarios FTI\n\n${lines.join("\n")}`,
          }),
        }
      );
      telegramSent = res.ok;
      if (!res.ok) {
        console.error("[apply] Telegram send failed:", res.status, await res.text());
      }
    } catch (err) {
      console.error("[apply] Telegram send failed:", err);
    }
  } else {
    console.warn(
      "[apply] Telegram not configured — set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID"
    );
  }

  let emailSent = false;
  if (emailConfigured) {
    try {
      const resend = new Resend(RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: RESEND_FROM as string,
        to: [APPLY_TO_EMAIL as string],
        subject: `New application: ${data.fullName} — ${data.programme}`,
        text: lines.join("\n"),
      });
      emailSent = !error;
      if (error) console.error("[apply] Resend send failed:", error);
    } catch (err) {
      console.error("[apply] Resend send failed:", err);
    }
  } else {
    console.warn(
      "[apply] Resend not configured — set RESEND_API_KEY, RESEND_FROM and APPLY_TO_EMAIL"
    );
  }

  return { emailSent, telegramSent, configured: emailConfigured || telegramConfigured };
}
