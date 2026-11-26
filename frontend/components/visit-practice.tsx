"use client"

import { useId, useState } from "react"
import { SpeechControls } from "@/components/si-speech-controls"
import { visitDialogues } from "@/lib/visit-dialogue.mjs"

export function VisitPractice() {
  const choiceId = useId()
  const [selected, setSelected] = useState(visitDialogues[0].id)
  const scene = visitDialogues.find(item => item.id === selected) ?? visitDialogues[0]

  return (
    <details className="rounded-xl border border-border p-3">
      <summary className="cursor-pointer text-sm font-semibold">Tập nói với bác sĩ · 3 tình huống</summary>
      <div className="mt-2 space-y-2 text-sm">
        <p className="text-muted-foreground">Tình huống giả định dành cho người lớn. Không phải tư vấn y tế; không nhập hồ sơ hay thông tin thật. Không bật mic.</p>
        <label htmlFor={choiceId} className="block font-medium">Chọn tình huống</label>
        <select id={choiceId} value={selected} onChange={event => setSelected(event.target.value)} className="min-h-11 w-full rounded-lg border border-border bg-background px-2">
          {visitDialogues.map(({id, label}) => <option key={id} value={id}>{label}</option>)}
        </select>
        <div aria-live="polite">
          <p>{scene.lead}</p>
          <blockquote className="my-2 border-l-2 border-border pl-3">{scene.line}</blockquote>
        </div>
        <SpeechControls speechText={scene.line} language="vi-VN" allowMic={false} />
      </div>
    </details>
  )
}
