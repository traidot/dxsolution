import { NextResponse } from "next/server";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  if (!TOKEN || !CHAT_ID) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  const data = await request.json().catch(() => null);

  const name = typeof data?.name === "string" ? data.name.trim() : "";
  const phone = typeof data?.phone === "string" ? data.phone.trim() : "";
  if (!name || !phone) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot filled → bot. Pretend success, send nothing.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const company = typeof data.company === "string" ? data.company.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  const text =
    `<b>[DXBiz] Yêu cầu tư vấn mới</b>\n\n` +
    `<b>Họ tên:</b> ${esc(name)}\n` +
    `<b>SĐT:</b> <code>${esc(phone)}</code>\n` +
    `<b>Doanh nghiệp:</b> ${company ? esc(company) : "—"}\n` +
    `<b>Nội dung:</b> ${message ? esc(message) : "—"}`;

  const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    console.error("Telegram send failed", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
