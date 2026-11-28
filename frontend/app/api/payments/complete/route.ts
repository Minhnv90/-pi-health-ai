import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { paymentId, txid } = await request.json()
  if (typeof paymentId !== "string" || typeof txid !== "string" || !paymentId || !txid) {
    return NextResponse.json({ error: "Invalid payment" }, { status: 400 })
  }

  const res = await fetch(`https://api.minepi.com/v2/payments/${encodeURIComponent(paymentId)}/complete`, {
    method: "POST",
    headers: {
      Authorization: `Key ${process.env.PI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ txid }),
  })
  return NextResponse.json({ ok: res.ok }, { status: res.ok ? 200 : 502 })
}
