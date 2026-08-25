import { NextRequest, NextResponse } from "next/server";
import { applyServerSchema } from "@/lib/applySchema";
import { rateLimit } from "@/lib/rateLimit";
import { notifyInstitute } from "@/lib/notify";

export async function POST(request: NextRequest) {
  /* Vercel overwrites x-forwarded-for, so it is trustworthy there;
     x-vercel-forwarded-for is preferred in case a proxy ever sits in front.
     Off Vercel these headers are client-forgeable — the limiter is
     best-effort by design (see lib/rateLimit.ts). */
  const forwarded =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const parsed = applyServerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  /* Honeypot filled → almost certainly a bot. Pretend success, send
     nothing — but log it (no PII) so silent losses stay observable. */
  if (parsed.data.hp) {
    console.warn("[apply] honeypot tripped — submission discarded");
    return NextResponse.json({ ok: true });
  }

  const result = await notifyInstitute(parsed.data);

  if (!result.configured) {
    return NextResponse.json(
      { ok: false, error: "not_configured" },
      { status: 503 }
    );
  }
  if (!result.telegramSent && !result.emailSent) {
    return NextResponse.json(
      { ok: false, error: "send_failed" },
      { status: 502 }
    );
  }
  return NextResponse.json({ ok: true });
}
