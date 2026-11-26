import { FamilyVisitGuide } from "@/components/family-visit-guide"
import { FamilyKnowledge } from "@/components/family-knowledge"
import { FamilyRoutine } from "@/components/family-routine"
import { HealthDashboard } from "@/components/health-dashboard"
import { HealthTracks } from "@/components/health-tracks"
import { VisitPractice } from "@/components/visit-practice"
import { CollaborationTools } from "@/components/si-collaboration-tools"

export default function Page() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-3 bg-background p-4">
      <header className="border-b border-border pb-3">
        <p className="text-xs font-medium text-muted-foreground">Bản thử riêng tư · v9</p>
        <h1 className="text-2xl font-bold text-foreground">Health SI</h1>
        <p className="text-sm text-muted-foreground">Hai góc riêng cho gia đình: kiến thức sức khỏe và luyện bài cùng Teacher.</p>
      </header>

      <HealthTracks family={
        <div className="space-y-3">
          <aside aria-label="An toàn và quyền riêng tư" className="space-y-1 rounded-xl border border-border bg-muted p-3 text-sm leading-relaxed">
            <p><strong>Không thay bác sĩ.</strong> Bản này không có AI tư vấn trực tiếp và không chẩn đoán.</p>
            <p>Không nhập hoặc gửi hồ sơ bệnh án, giấy tờ hoặc thông tin nhận dạng. Nếu có dấu hiệu cấp cứu, gọi cấp cứu địa phương; đừng chờ ứng dụng.</p>
          </aside>
          <FamilyVisitGuide />
          <FamilyKnowledge />
          <FamilyRoutine />
          <VisitPractice />
          <HealthDashboard />
        </div>
      } />
      <CollaborationTools app="health" />
    </main>
  )
}
