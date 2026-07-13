import { NextRequest, NextResponse } from "next/server";

const MIN_COMPLETE_MS = 4000;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const { honeypot, ...payload } = body as Record<string, unknown>;

  // Anti-spam: a filled honeypot or a too-fast completion is silently
  // accepted (so bots don't learn what tripped) but never forwarded.
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }
  const meta = payload.meta as { ms_to_complete?: unknown } | undefined;
  if (typeof meta?.ms_to_complete === "number" && meta.ms_to_complete < MIN_COMPLETE_MS) {
    return NextResponse.json({ ok: true });
  }

  const webhookUrl = process.env.FORM_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("FORM_WEBHOOK_URL is not configured");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!upstream.ok) {
      return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "network" }, { status: 502 });
  }
}
