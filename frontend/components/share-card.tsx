"use client"

import { useState } from "react"
import { Check, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ShareCard() {
  const [copied, setCopied] = useState(false)

  const share = async () => {
    const text = "Health SI: chuẩn bị câu hỏi trước buổi khám và thử một bài học có gợi ý. Đây là bản thử, không dùng để chẩn đoán."

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section
      aria-labelledby="share-title"
      className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-4 shadow-[0_4px_20px_rgba(31,41,55,0.06)]"
    >
      <div className="flex flex-col gap-1">
        <h2 id="share-title" className="text-base font-semibold text-foreground">
          Lời giới thiệu mẫu
        </h2>
        <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
          Sao chép đoạn giới thiệu có sẵn. Không kèm liên kết riêng tư hoặc dữ liệu sức khỏe.
        </p>
      </div>
      <Button variant="outline" onClick={share} className="h-11 w-full rounded-xl text-base">
        {copied ? (
          <Check className="size-4" aria-hidden="true" />
        ) : (
          <Share2 className="size-4" aria-hidden="true" />
        )}
        {copied ? "Đã sao chép lời giới thiệu" : "Sao chép lời giới thiệu"}
      </Button>
      <p role="status" className="sr-only">
        {copied ? "Đã sao chép lời giới thiệu vào bộ nhớ tạm" : ""}
      </p>
    </section>
  )
}
