import { getGradeKnowledge } from "@/lib/teacher-grade-knowledge.mjs"
import { getFutureTechLesson } from "@/lib/future-tech-lessons.mjs"

export function GradeKnowledge({ grade }: { grade: number }) {
  const cards = getGradeKnowledge(grade)
  const future = getFutureTechLesson(grade)
  if (!cards.length) return null

  return (
    <details id="grade-knowledge" className="rounded-lg border border-border bg-background p-3">
      <summary className="cursor-pointer font-medium">Kiến thức theo lớp</summary>
      <div className="mt-3 space-y-3">
        <p className="text-sm text-muted-foreground">Lớp {grade} · Vài ví dụ tự luyện, không thay thế chương trình học. Em thử nghĩ trước khi mở lời giải.</p>
        {cards.map((card) => (
          <article key={card.title} className="space-y-1 rounded-lg border border-border p-3 text-sm">
            <h3 className="font-semibold">{card.title}</h3>
            <p>{card.example}</p>
            <p><strong>Thử nghĩ:</strong> {card.question}</p>
            <details>
              <summary className="cursor-pointer py-2 font-medium">Xem giải thích</summary>
              <p>{card.explanation}</p>
            </details>
          </article>
        ))}
        {future && (
          <details className="rounded-lg border border-border p-3 text-sm">
            <summary className="cursor-pointer font-semibold">Web3, AI &amp; robot</summary>
            <div className="mt-2 space-y-1">
              <h3 className="font-semibold">{future.title}</h3>
              <p>{future.body}</p>
              <p><strong>Thử nghĩ:</strong> {future.question}</p>
              <details>
                <summary className="cursor-pointer py-2 font-medium">Xem giải thích</summary>
                <p>{future.answer}</p>
              </details>
            </div>
          </details>
        )}
      </div>
    </details>
  )
}
