"use client"

import { SpeechControls } from "@/components/si-speech-controls"
import { ContinuousPractice } from "./continuous-practice"
import { GradeKnowledge } from "@/components/grade-knowledge"
import { DigitalReasoningPractice } from "@/components/digital-reasoning-practice"
import { useState, type FormEvent } from "react"
import { getLesson, lessons, nextStudy, startStudy, type StudyState, type StudyVariant } from "@/lib/study-sample.mjs"

export function StudyShowcase({ active = true }: { active?: boolean }) {
  const [study, setStudy] = useState<StudyState | null>(null)
  const [draft, setDraft] = useState("")
  const [grade, setGrade] = useState(2)
  const [variant, setVariant] = useState<StudyVariant>("original")
  const lesson = getLesson(grade, variant)

  const respond = (value: string) => {
    setStudy((current) => current ? nextStudy(current, value) : current)
    setDraft("")
  }
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    respond(draft)
  }

  return (
    <section aria-labelledby="study-heading" className="space-y-3 rounded-xl border border-border bg-card p-4">
      <div>
        <h2 id="study-heading" className="text-base font-semibold">Teacher · Góc kèm học</h2>
        <p className="text-sm text-muted-foreground">Chào em, mình cùng thử vài bài Toán, đọc hiểu và khoa học nhé! Mỗi lớp có hai bài mẫu để em tự luyện. Nếu bí, mình gợi ý từng bước. Đây không phải chương trình đầy đủ hay chat tự do. Không cần nhập tên hoặc thông tin riêng.</p>
      </div>
      <div>
        <label htmlFor="study-grade" className="block text-sm font-medium">Chọn lớp</label>
        <select id="study-grade" value={grade} onChange={(event) => {
          const selected = Number(event.target.value)
          setGrade(selected)
          setDraft("")
          if (study) setStudy(startStudy(selected, variant))
        }} className="mt-1 min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm">
          {lessons.map((item) => <option key={item.grade} value={item.grade}>Lớp {item.grade}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="study-variant" className="block text-sm font-medium">Chọn bài</label>
        <select id="study-variant" value={variant} onChange={(event) => {
          const selected: StudyVariant = event.target.value === "practice" ? "practice" : "original"
          setVariant(selected)
          setDraft("")
          if (study) setStudy(startStudy(grade, selected))
        }} className="mt-1 min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm">
          <option value="original">Bài 1 · {getLesson(grade).topic}</option>
          <option value="practice">Bài 2 · {getLesson(grade, "practice").topic}</option>
        </select>
      </div>
      {!study ? (
        <button type="button" onClick={() => setStudy(startStudy(grade, variant))} className="min-h-11 rounded-lg bg-primary px-4 font-semibold text-primary-foreground">Vào bài học</button>
      ) : (
        <div className="space-y-2">
          <p className="font-medium">{lesson.prompt}</p>
          {grade === 2 && variant === "original" && <div aria-hidden="true" className="flex flex-wrap gap-2">
            {[0, 1, 2].map((group) => <span key={group} className="rounded-md border border-border p-1.5 text-sm">✏️✏️✏️✏️</span>)}
          </div>}
          <p aria-live="polite" role="status" className="rounded-lg bg-muted p-3 text-sm">{study.message}</p>
          {active && <SpeechControls allowMic={false} voiceStyle="health" speechText={`${lesson.prompt} ${lesson.choices?.map((choice, i) => `Phương án ${i + 1}: ${choice}.`).join(" ") ?? ""} ${study.message}`} />}
          {!study.done && (
            <form onSubmit={submit} autoComplete="off" className="space-y-2">
              {lesson.choices ? (
                <fieldset className="space-y-2">
                  <legend className="text-sm font-medium">Chọn một đáp án</legend>
                  {lesson.choices.map((choice, index) => (
                    <label key={choice} className="flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 text-sm">
                      <input type="radio" name="study-option" value={index + 1} checked={draft === String(index + 1)} onChange={(event) => setDraft(event.target.value)} />
                      <span>{choice}</span>
                    </label>
                  ))}
                </fieldset>
              ) : (
                <>
                  <label htmlFor="study-answer" className="block text-sm font-medium">Đáp số</label>
                  <input id="study-answer" inputMode="numeric" maxLength={4} autoComplete="off" value={draft} onChange={(event) => setDraft(/^[-−]?\d{0,3}$/.test(event.target.value) ? event.target.value : "")} className="w-full rounded-lg border border-border bg-background px-3 py-2" />
                </>
              )}
              <div className="flex flex-wrap gap-2">
                <button type="submit" className="min-h-11 rounded-lg bg-primary px-3 font-semibold text-primary-foreground">{lesson.choices ? "Thử đáp án" : "Thử đáp số"}</button>
                <button type="button" onClick={() => respond("hint")} className="min-h-11 rounded-lg border border-border px-3">Nhận gợi ý</button>
              </div>
            </form>
          )}
          <div className="flex flex-wrap gap-4">
            <button type="button" onClick={() => { setStudy(startStudy(grade, variant)); setDraft("") }} className="min-h-11 text-sm underline">Làm lại từ đầu</button>
            <button type="button" onClick={() => { setStudy(null); setDraft("") }} className="min-h-11 text-sm underline">Đóng bài học</button>
          </div>
        </div>
      )}
      <ContinuousPractice key={grade} grade={grade} />
      <DigitalReasoningPractice key={`reasoning-${grade}`} grade={grade} />
      <GradeKnowledge key={`knowledge-${grade}`} grade={grade} />
    </section>
  )
}
