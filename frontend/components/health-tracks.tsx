"use client"

import { useState, type ReactNode } from "react"
import { StudyShowcase } from "@/components/study-showcase"

export function HealthTracks({ family }: { family: ReactNode }) {
  const [track, setTrack] = useState<"family" | "teacher">("family")
  return (
    <>
      <fieldset className="grid grid-cols-1 gap-2 min-[340px]:grid-cols-2">
        <legend className="mb-2 text-sm font-semibold">Bạn muốn làm gì?</legend>
        <label className="flex min-h-14 cursor-pointer items-center gap-2 rounded-xl border border-border p-2 text-sm has-[:checked]:border-primary has-[:checked]:bg-muted">
          <input type="radio" name="health-track" value="family" checked={track === "family"} onChange={() => setTrack("family")} aria-controls="family-track" />
          <span><strong className="block">Sức khỏe gia đình</strong><span className="text-xs text-muted-foreground">Chuẩn bị đi khám và tìm hiểu thêm</span></span>
        </label>
        <label className="flex min-h-14 cursor-pointer items-center gap-2 rounded-xl border border-border p-2 text-sm has-[:checked]:border-primary has-[:checked]:bg-muted">
          <input type="radio" name="health-track" value="teacher" checked={track === "teacher"} onChange={() => setTrack("teacher")} aria-controls="teacher-track" />
          <span><strong className="block">Teacher</strong><span className="text-xs text-muted-foreground">Bài luyện lớp 1–12</span></span>
        </label>
      </fieldset>
      <section id="family-track" aria-label="Sức khỏe gia đình" hidden={track !== "family"}>
        {track === "family" && family}
      </section>
      <section id="teacher-track" aria-label="Teacher" hidden={track !== "teacher"}>
        <StudyShowcase active={track === "teacher"} />
      </section>
    </>
  )
}
