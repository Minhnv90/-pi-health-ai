import { Droplets, Heart, Moon } from "lucide-react"

export type WearableValues = {
  heartRate: string
  bloodPressure: string
  sleep: string
}

export function WearableMetrics({ values }: { values: WearableValues | null }) {
  const metrics = [
    { label: "Tim mạch", unit: "nhịp/phút", icon: Heart, value: values?.heartRate },
    { label: "Huyết áp", unit: "mmHg", icon: Droplets, value: values?.bloodPressure },
    { label: "Giấc ngủ", unit: "giờ", icon: Moon, value: values?.sleep },
  ]

  return (
    <section aria-labelledby="wearable-title" className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-[0_4px_20px_rgba(31,41,55,0.06)]">
      <h2
        id="wearable-title"
        className="border-b border-border p-4 text-base font-semibold text-foreground"
      >
        Chỉ số minh họa
      </h2>
      <ul className="grid grid-cols-3 divide-x divide-border" aria-live="polite">
        {metrics.map(({ label, unit, icon: Icon, value }) => (
          <li key={label} className="flex flex-col items-center gap-1 p-3 text-center">
            <Icon className="size-5 text-primary" aria-hidden="true" />
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="text-xl font-semibold text-foreground">{value ?? "--"}</span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
