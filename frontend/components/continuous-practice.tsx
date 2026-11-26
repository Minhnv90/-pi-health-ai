"use client"

import { useState, type FormEvent } from "react"
import { createMathExercise } from "@/lib/continuous-math.mjs"

type Exercise = NonNullable<ReturnType<typeof createMathExercise>>
type State = { exercise: Exercise | null; nextIndex: number; recent: string[]; hintCount: number; done: boolean; feedback: string }
const initialState = (): State => ({ exercise: null, nextIndex: 0, recent: [], hintCount: 0, done: false, feedback: "" })
const draftPattern = /^[-−]?\d{0,9}(?:[.,]\d{0,6})?$/
const answerPattern = /^[-−]?\d{1,9}(?:[.,]\d{1,6})?$/

export function ContinuousPractice({ grade }: { grade: number }) {
  const [state, setState] = useState(initialState)
  const [draft, setDraft] = useState("")
  const { exercise, hintCount, done, feedback } = state

  function nextExercise() {
    setDraft("")
    setState((current) => {
      let index = current.nextIndex
      const next = (exercise: Exercise, nextIndex: number, recent = current.recent): State => ({
        exercise, nextIndex, recent: [...recent, exercise.prompt].slice(-40),
        hintCount: 0, done: false, feedback: "",
      })
      let fallback: { exercise: Exercise; nextIndex: number } | null = null
      for (let tried = 0; tried < 100; tried++, index++) {
        const candidate = createMathExercise(grade, index)
        if (!candidate) break
        if (candidate.prompt !== current.exercise?.prompt && !fallback) fallback = { exercise: candidate, nextIndex: index + 1 }
        if (current.recent.includes(candidate.prompt)) continue
        return next(candidate, index + 1)
      }
      // A smaller variant pool can start a fresh round, never repeat the immediately preceding prompt.
      if (fallback) return next(fallback.exercise, fallback.nextIndex, [])
      return { ...current, nextIndex: index, feedback: "Chưa có bài khác ở lớp này. Em có thể đổi lớp hoặc tiếp tục bài đang làm." }
    })
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!exercise || done) return
    if (!answerPattern.test(draft)) {
      setState((current) => ({ ...current, feedback: "Em chỉ nhập một đáp số rồi thử lại nhé." }))
      return
    }
    const correct = Number(draft.replace("−", "-").replace(",", ".")) === exercise.answer
    setState((current) => ({
      ...current, done: correct,
      feedback: correct ? "Đúng rồi! " + exercise.explanation : "Chưa đúng rồi. Em thử lại hoặc xem gợi ý nhé.",
    }))
    if (!correct) setDraft("")
  }

  return (
    <details id="continuous-practice" className="rounded-lg border border-border bg-card px-3">
      <summary className="cursor-pointer py-3 text-sm font-semibold">Luyện liên tục</summary>
      <div className="space-y-2 pb-3">
        <p className="text-sm text-muted-foreground">Bài Toán tự luyện lớp {grade}. Dạng bài có thể lặp lại với số liệu khác. Không cần tên hay thông tin riêng; đáp số không được gửi hoặc lưu.</p>
        {exercise && (
          <>
            <h3 className="text-sm font-semibold">{exercise.topic}</h3>
            <p id="continuous-prompt" className="text-sm">{exercise.prompt}</p>
            {hintCount > 0 && (
              <ol aria-label="Gợi ý bài luyện" className="list-decimal space-y-1 ps-5 text-sm">
                {exercise.hints.slice(0, hintCount).map((hint, i) => <li key={i}>{hint}</li>)}
              </ol>
            )}
            {!done && (
              <form id="continuous-answer-form" autoComplete="off" onSubmit={submit} className="space-y-2">
                <label htmlFor="continuous-answer" className="block text-sm font-medium">Đáp số bài luyện</label>
                <input
                  id="continuous-answer" type="text" inputMode="decimal" maxLength={17} autoComplete="off"
                  value={draft} onChange={(event) => setDraft(draftPattern.test(event.target.value) ? event.target.value : "")}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2"
                />
                <div className="flex flex-wrap gap-2">
                  <button type="submit" className="min-h-11 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground">Kiểm tra đáp số</button>
                  <button type="button" disabled={hintCount >= 2} onClick={() => setState((current) => ({ ...current, hintCount: Math.min(current.hintCount + 1, 2) }))} className="min-h-11 rounded-lg border border-border px-3 text-sm disabled:opacity-50">
                    {hintCount < 2 ? `Xem gợi ý ${hintCount + 1}` : "Đã xem 2 gợi ý"}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
        {feedback && <p role="status" className="rounded-lg bg-muted p-2 text-sm">{feedback}</p>}
        <button type="button" onClick={nextExercise} className="min-h-11 rounded-lg border border-border px-3 text-sm font-medium">{exercise ? "Bài tiếp theo" : "Bắt đầu luyện"}</button>
      </div>
    </details>
  )
}
