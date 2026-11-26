import { Heart } from "lucide-react"

const readings = [
  { time: "06:30", bpm: 62, status: "Nghỉ ngơi" },
  { time: "09:15", bpm: 74, status: "Sinh hoạt" },
  { time: "12:40", bpm: 88, status: "Sau bữa ăn" },
  { time: "15:05", bpm: 112, status: "Vận động" },
  { time: "18:20", bpm: 79, status: "Sinh hoạt" },
  { time: "22:10", bpm: 66, status: "Nghỉ ngơi" },
]

export function HeartRateTable() {
  const average = Math.round(readings.reduce((sum, r) => sum + r.bpm, 0) / readings.length)
  const max = Math.max(...readings.map((r) => r.bpm))
  const min = Math.min(...readings.map((r) => r.bpm))

  return (
    <section aria-labelledby="heart-title" className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-[0_4px_20px_rgba(31,41,55,0.06)]">
      <header className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Heart className="size-5 text-destructive" aria-hidden="true" />
          <h2 id="heart-title" className="text-base font-semibold text-foreground">
            Bảng nhịp tim minh họa
          </h2>
        </div>
        <span className="text-sm text-muted-foreground">Mẫu giả định</span>
      </header>

      <dl className="grid grid-cols-3 divide-x divide-border border-b border-border text-center">
        <div className="p-3">
          <dt className="text-sm text-muted-foreground">Thấp nhất</dt>
          <dd className="text-xl font-semibold text-foreground">{min}</dd>
        </div>
        <div className="p-3">
          <dt className="text-sm text-muted-foreground">Trung bình</dt>
          <dd className="text-xl font-semibold text-destructive">{average}</dd>
        </div>
        <div className="p-3">
          <dt className="text-sm text-muted-foreground">Cao nhất</dt>
          <dd className="text-xl font-semibold text-foreground">{max}</dd>
        </div>
      </dl>

      <table className="w-full text-left text-sm">
        <caption className="sr-only">Các số đo nhịp tim giả định (nhịp/phút)</caption>
        <thead>
          <tr className="border-b border-border bg-muted text-muted-foreground">
            <th scope="col" className="px-4 py-2 font-medium">Giờ</th>
            <th scope="col" className="px-4 py-2 font-medium">Nhịp/phút</th>
            <th scope="col" className="px-4 py-2 font-medium">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {readings.map((r) => (
            <tr key={r.time} className="border-b border-border last:border-b-0">
              <td className="px-4 py-3 text-foreground">{r.time}</td>
              <td className="px-4 py-3 font-semibold text-foreground">{r.bpm}</td>
              <td className="px-4 py-3 text-muted-foreground">{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
