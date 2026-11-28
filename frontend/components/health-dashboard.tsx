import { AiScreening } from "@/components/ai-screening"
import { HeartRateTable } from "@/components/heart-rate-table"
import { ShareCard } from "@/components/share-card"
import { WearableMetrics, type WearableValues } from "@/components/wearable-metrics"

const demoValues: WearableValues = { heartRate: "72", bloodPressure: "118/76", sleep: "7.2" }

export function HealthDashboard() {
  return (
    <>
      <details className="space-y-3 rounded-xl border border-border bg-card p-4">
        <summary className="cursor-pointer text-sm font-semibold">Xem số liệu minh họa</summary>
        <p role="note" className="mt-2 text-sm text-muted-foreground">Số liệu tạo giả để thử giao diện. Không có kết nối thiết bị và không dùng để đánh giá sức khỏe.</p>
        <WearableMetrics values={demoValues} />
        <HeartRateTable />
      </details>
      <details className="space-y-3 rounded-xl border border-border bg-card p-4">
        <summary className="cursor-pointer text-sm font-semibold">Công cụ cũ · Không dùng để khám</summary>
        <AiScreening />
        <ShareCard />
      </details>
      <footer className="flex flex-col gap-1 pb-2 text-center text-sm leading-relaxed text-muted-foreground">
        <p className="text-pretty">Health SI là bản tham khảo, không thay thế chăm sóc y tế.</p>
        <p className="text-pretty">Nếu có triệu chứng nghiêm trọng, hãy đến cơ sở y tế gần nhất ngay.</p>
      </footer>
    </>
  )
}
