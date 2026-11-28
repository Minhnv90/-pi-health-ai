import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { paymentId } = await request.json()
  if (typeof paymentId !== "string" || !paymentId) {
    return NextResponse.json({ error: "Invalid payment" }, { status: 400 })
  }

  const res = await fetch(`https://api.minepi.com/v2/payments/${encodeURIComponent(paymentId)}/approve`, {
    method: "POST",
    headers: { Authorization: `Key ${process.env.PI_API_KEY}` },
  })
  return NextResponse.json({ ok: res.ok }, { status: res.ok ? 200 : 502 })
}
