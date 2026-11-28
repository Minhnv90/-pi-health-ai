"use client";
import { useId, useState } from "react";
import { SpeechControls } from "@/components/si-speech-controls";

const templates={
 portway:"Chào anh/chị, bên tôi đang chuẩn bị một lô hàng từ Cái Mép đến Jebel Ali. Anh/chị có thể cho biết cần cung cấp thông tin gì để nhận báo giá, báo giá gồm những phụ phí nào và có hiệu lực đến khi nào không? Cảm ơn anh/chị.",
 health:"Chào phòng khám, tôi muốn hỏi cách đặt lịch khám. Phòng khám còn khung giờ nào và tôi cần chuẩn bị giấy tờ gì khi đến? Cảm ơn anh/chị."
};
const cases=[
 {label:"Chọn robot hút bụi", turns:[
   ["Health SI","Nhà có trẻ nhỏ thì mình muốn kiểm tra nút khóa và cách đặt vùng cấm. PortWay, giữa hai mẫu, mình nên so gì ngoài giá?"],
   ["PortWay SI","Mình sẽ so bảo hành, phụ tùng và chi phí thay chổi. Nếu một mẫu không có vùng cấm thì giá rẻ hơn cũng chưa chắc phù hợp."],
   ["Chốt chung","Chọn ra hai mẫu có khóa nút và vùng cấm, rồi yêu cầu cửa hàng xác nhận bảo hành và giá phụ tùng bằng văn bản. Chưa chốt mua."]
 ]},
 {label:"Chuẩn bị buổi học tại nhà", turns:[
   ["Health SI","Khi phụ huynh bận, mình đề xuất bài 10 phút và cho con thử trước khi gợi ý. PortWay, làm sao tránh mua thêm thiết bị không cần thiết?"],
   ["PortWay SI","Thử với thiết bị đang có trước. Nếu gia đình cần mua thêm, ghi rõ vấn đề gặp phải rồi so chi phí và thời gian cài đặt."],
   ["Chốt chung","Thử ba buổi ngắn với thiết bị sẵn có. Sau đó xem con có tự giải được bài tương tự không, rồi mới quyết định có cần mua thêm."]
 ]}
] as const;
export function CollaborationTools({app}:{app:"portway"|"health"}){
 const id=useId();
 const [tab,setTab]=useState<"draft"|"dialog"|null>(null);
 const [draft,setDraft]=useState(""),[notice,setNotice]=useState(""),[scenario,setScenario]=useState(0),[visible,setVisible]=useState(0);
 const show=(next:"draft"|"dialog")=>{setTab(next===tab?null:next);setNotice("");};
 const copy=async()=>{try{await navigator.clipboard.writeText(draft);setNotice("Đã sao chép. Bạn tự chọn nơi gửi.");}catch{setNotice("Chưa sao chép được. Hãy chọn văn bản và sao chép thủ công.");}};
 return <details className="rounded-xl border border-border bg-card p-3" onToggle={e=>{if(!e.currentTarget.open){setTab(null);setVisible(0);setDraft("");setNotice("");}}}>
   <summary className="cursor-pointer py-2 text-sm font-semibold">Soạn tin và đối thoại mẫu</summary>
   <div className="mt-2 flex flex-wrap gap-2">
    <button type="button" aria-pressed={tab==="draft"} onClick={()=>show("draft")} className="min-h-11 rounded-lg border px-3 text-sm">Soạn tin</button>
    <button type="button" aria-pressed={tab==="dialog"} onClick={()=>show("dialog")} className="min-h-11 rounded-lg border px-3 text-sm">Mời AI kia (mẫu)</button>
   </div>
   {tab==="draft"&&<div className="mt-3 space-y-2">
    <p className="text-sm text-muted-foreground">Mẫu chỉnh được, không lưu sau khi thoát và không tự gửi. Không nhập thông tin riêng tư.</p>
    {!draft&&<button type="button" onClick={()=>{setDraft(templates[app]);setNotice("");}} className="min-h-11 rounded-lg border px-3 text-sm">Điền tin mẫu</button>}
    <label htmlFor={id+"draft"} className="block text-sm font-medium">Tin nháp</label>
    <textarea id={id+"draft"} rows={4} maxLength={800} value={draft} onChange={e=>{setDraft(e.target.value);setNotice("");}} className="w-full rounded-lg border bg-background p-2 text-sm"/>
    <button type="button" disabled={!draft.trim()} onClick={copy} className="min-h-11 rounded-lg border px-3 text-sm disabled:opacity-50">Sao chép tin</button>
    {notice&&<p role="status" className="text-sm">{notice}</p>}
   </div>}
   {tab==="dialog"&&<div className="mt-3 space-y-2">
    <p className="text-sm text-muted-foreground">Hội thoại giả lập, không kết nối hai AI và không chuyển dữ liệu giữa các app.</p>
    <label htmlFor={id+"topic"} className="block text-sm font-medium">Chọn tình huống</label>
    <select id={id+"topic"} className="max-w-full rounded-lg border bg-background p-2 text-sm" value={scenario} onChange={e=>{setScenario(Number(e.target.value));setVisible(0);}}>
     {cases.map((item,i)=><option value={i} key={item.label}>{item.label}</option>)}
    </select>
    <ol className="space-y-2" aria-live="polite">
     {cases[scenario].turns.slice(0,visible).map(([name,line])=><li key={name} className="rounded-lg bg-muted p-2 text-sm"><strong>{name}:</strong> {line}<SpeechControls allowMic={false} speechText={line} voiceStyle={name==="Health SI"?"health":"portway"}/></li>)}
    </ol>
    {visible<3&&<button type="button" onClick={()=>setVisible(v=>Math.min(3,v+1))} className="min-h-11 rounded-lg border px-3 text-sm">{!visible?"Bắt đầu":"Lượt tiếp theo"}</button>}
    {!!visible&&<button type="button" onClick={()=>setVisible(0)} className="ml-2 min-h-11 px-2 text-sm underline">Bắt đầu lại</button>}
   </div>}
 </details>;
}
