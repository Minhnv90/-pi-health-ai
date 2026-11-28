import { familyKnowledge } from "@/lib/family-knowledge.mjs"

export function FamilyKnowledge() {
  return (
    <details className="rounded-xl border border-border bg-card px-3 py-2">
      <summary className="cursor-pointer py-1 text-sm font-semibold">Kiến thức sức khỏe hằng ngày · {familyKnowledge.length} chủ đề</summary>
      <p className="my-2 text-xs text-muted-foreground">Kiến thức chung cho gia đình, không thay bác sĩ. Không nhập hồ sơ hay thông tin cá nhân.</p>
      <div className="space-y-2">
        {familyKnowledge.map(card => (
          <details key={card.id} className="rounded-lg border border-border px-3 py-2">
            <summary className="cursor-pointer text-sm font-medium">{card.title}</summary>
            <p className="my-2 text-sm">{card.tip}</p>
            <p className="text-xs text-muted-foreground">{card.scope}</p>
            <a href={card.url} target="_blank" rel="noopener noreferrer" className="block break-words py-2 text-xs underline underline-offset-2">{card.source} (tiếng Anh)</a>
          </details>
        ))}
      </div>
    </details>
  )
}
