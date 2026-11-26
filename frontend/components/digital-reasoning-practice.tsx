"use client"

import { useState } from "react"
import { getReasoningExercise } from "@/lib/digital-reasoning.mjs"

export function DigitalReasoningPractice({ grade }: { grade: number }) {
  const exercise = getReasoningExercise(grade)
  const [choice, setChoice] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)

  if (!exercise) return null

  return (
    <details className="rounded-lg border border-border bg-background p-3">
      <summary className="cursor-pointer font-medium">Kinh tế số &amp; Tư duy</summary>
      <div className="mt-3 space-y-2">
        <p className="text-sm text-muted-foreground">Tình huống giả định để tập suy nghĩ và giải thích lựa chọn. Không mua bán hay chuyển tiền thật.</p>
        <p className="text-sm font-semibold">{exercise.title}</p>
        <form className="space-y-2" onSubmit={(event) => {
          event.preventDefault()
          if (choice !== null) setChecked(true)
        }}>
          <fieldset className="space-y-2">
            <legend className="mb-2 text-sm font-medium">{exercise.question}</legend>
            {exercise.options.map((option, index) => (
              <label key={index} className="flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 text-sm">
                <input type="radio" name="digital-reasoning-option" checked={choice === index} onChange={() => { setChoice(index); setChecked(false) }} />
                <span>{option}</span>
              </label>
            ))}
          </fieldset>
          <button type="submit" disabled={choice === null} className="min-h-11 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground disabled:opacity-50">Kiểm tra lựa chọn</button>
          <p role="status" aria-live="polite" className="text-sm">
            {checked ? choice === exercise.correctIndex ? `Đúng rồi! ${exercise.explanation}` : "Chưa đúng. Em thử đọc lại tình huống và chọn phương án khác nhé." : ""}
          </p>
        </form>
      </div>
    </details>
  )
}
