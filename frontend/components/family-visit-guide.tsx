import { visitCards, type VisitCard } from "@/lib/family-visit.mjs"
import { literacyCards } from "@/lib/family-health-literacy.mjs"

function GuideCard({ title, notes, source, extraSource }: VisitCard) {
  return (
    <details className="rounded-lg border border-border px-3 py-2">
      <summary className="cursor-pointer text-sm font-medium">{title}</summary>
      <ul className="my-2 ml-4 list-disc space-y-1 text-sm">
        {notes.map(note => <li key={note}>{note}</li>)}
      </ul>
      {[source, ...(extraSource ? [extraSource] : [])].map(item => (
        <a key={item.url} className="block break-words py-1 text-xs underline underline-offset-2" href={item.url} target="_blank" rel="noopener noreferrer">{item.name} (tiếng Anh)</a>
      ))}
    </details>
  )
}

export function FamilyVisitGuide() {
  return (
    <section aria-labelledby="visit-guide-heading" className="space-y-2 rounded-xl border border-border bg-card p-4">
      <h2 id="visit-guide-heading" className="text-base font-semibold">Sức khỏe gia đình</h2>
      <p className="text-sm text-muted-foreground">Sắp đi khám? Mình chuẩn bị cùng gia đình nhé. Đây chỉ là gợi ý trao đổi với bác sĩ, không chẩn đoán hay điều trị. Không cần nhập thông tin cá nhân.</p>
      {visitCards.map(card => <GuideCard key={card.id} {...card} />)}
      <details className="rounded-lg border border-border px-3 py-2">
        <summary className="cursor-pointer text-sm font-semibold">Tìm hiểu thêm: hồ sơ, nhãn thuốc và tin sức khỏe</summary>
        <div className="mt-2 space-y-2">{literacyCards.map(card => <GuideCard key={card.id} {...card} />)}</div>
      </details>
    </section>
  )
}
