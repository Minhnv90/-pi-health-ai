"use client"

import { useId, useState } from "react"

const lists = [
  { title: "Việc nhà", items: ["Chọn việc ưu tiên hôm nay", "Chuẩn bị đồ dùng cần thiết", "Dọn và cất đồ sau khi xong"] },
  { title: "Chuẩn bị đi khám", items: ["Kiểm tra giờ hẹn và địa chỉ", "Hỏi nơi khám cần mang giấy tờ gì", "Sắp xếp đường đi và thời gian dự phòng"] },
  { title: "Kế hoạch học tại nhà", items: ["Chọn một bài hoặc môn để luyện", "Chuẩn bị góc học và đồ dùng", "Dành vài phút xem lại phần chưa hiểu"] },
] as const

export function FamilyRoutine() {
  const id = useId()
  const [list, setList] = useState(0)
  const [marked, setMarked] = useState<number[]>([0, 0, 0])
  return (
    <details className="rounded-xl border border-border bg-card px-3 py-2">
      <summary className="cursor-pointer py-1 text-sm font-semibold">Việc gia đình · Checklist</summary>
      <p className="my-2 text-xs text-muted-foreground">Mẫu để tự đánh dấu. Không nhập thông tin riêng, không lưu sau khi rời trang hoặc gửi nhắc việc.</p>
      <label htmlFor={id} className="block text-sm font-medium">Chọn danh sách</label>
      <select id={id} value={list} onChange={e => setList(Number(e.target.value))} className="my-2 min-h-11 w-full rounded-lg border border-border bg-background px-2 text-sm">
        {lists.map(({ title }, i) => <option value={i} key={title}>{title}</option>)}
      </select>
      <fieldset className="space-y-1">
        <legend className="text-sm font-semibold">{lists[list].title}</legend>
        {lists[list].items.map((task, i) => (
          <label className="flex min-h-11 cursor-pointer items-center gap-2 border-b border-border text-sm" key={task}>
            <input type="checkbox" checked={Boolean(marked[list] & (1 << i))} onChange={() => setMarked(values => values.map((v,k) => k === list ? v ^ (1 << i) : v))} />
            {task}
          </label>
        ))}
      </fieldset>
      <button type="button" disabled={!marked[list]} className="min-h-11 px-1 text-sm underline disabled:opacity-50" onClick={() => setMarked(values => values.map((v,i) => i === list ? 0 : v))}>Bỏ đánh dấu danh sách này</button>
    </details>
  )
}
