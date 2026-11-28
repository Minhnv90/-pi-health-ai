"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

type PaymentDTO = { identifier: string }

type PiPaymentWindow = {
  Pi: {
    createPayment: (
      data: { amount: number; memo: string; metadata: Record<string, unknown> },
      callbacks: {
        onReadyForServerApproval: (paymentId: string) => void
        onReadyForServerCompletion: (paymentId: string, txid: string) => void
        onCancel: (paymentId: string) => void
        onError: (error: Error, payment?: PaymentDTO) => void
      },
    ) => void
  }
}

type Status = "idle" | "processing" | "success" | "error"

async function post(url: string, body: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error("Request failed")
}

export function PayPiButton({ onSuccess }: { onSuccess?: () => void }) {
  const [status, setStatus] = useState<Status>("idle")

  const pay = () => {
    const pi = (window as unknown as PiPaymentWindow).Pi
    if (!pi) {
      setStatus("error")
      return
    }
    setStatus("processing")
    pi.createPayment(
      {
        amount: 0.1,
        memo: "Sàng lọc sức khỏe bằng Trí tuệ Nhân tạo (AI Screening)",
        metadata: { service: "ai_health_screening" },
      },
      {
        onReadyForServerApproval: (paymentId) => {
          post("/api/payments/approve", { paymentId }).catch(() => setStatus("error"))
        },
        onReadyForServerCompletion: (paymentId, txid) => {
          post("/api/payments/complete", { paymentId, txid })
            .then(() => {
              setStatus("success")
              onSuccess?.()
            })
            .catch(() => setStatus("error"))
        },
        onCancel: () => setStatus("idle"),
        onError: () => setStatus("error"),
      },
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={pay}
        disabled={status === "processing"}
        className="h-12 w-full rounded-xl text-base font-semibold shadow-[0_6px_16px_rgba(127,96,249,0.28)]"
      >
        {status === "processing" ? "Đang xử lý..." : "Khám Bệnh Với AI Ngay (0.1 Pi)"}
      </Button>
      <p role="status" className="min-h-5 text-center text-sm text-muted-foreground">
        {status === "success" && "Thanh toán thành công. Cảm ơn bạn!"}
        {status === "error" && "Thanh toán chưa hoàn tất. Vui lòng thử lại."}
      </p>
    </div>
  )
}
