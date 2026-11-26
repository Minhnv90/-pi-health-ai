const medline = "https://medlineplus.gov/talkingwithyourdoctor.html"
const ahrq = "https://www.ahrq.gov/questions/be-engaged/index.html"

export const visitCards = [
  {
    id: "before", title: "Trước buổi khám: chọn điều cần hỏi",
    notes: [
      "Chọn tối đa ba điều muốn hỏi nhất và đưa điều quan trọng lên đầu.",
      "Nếu cần ghi chú riêng, dùng giấy của gia đình và mang đến buổi khám. Không nhập vào Health SI.",
      "Nếu cần phiên dịch, hỏi cơ sở khám trước buổi hẹn.",
    ],
    source: { name: "MedlinePlus · Thư viện Y khoa Quốc gia Hoa Kỳ", url: medline },
  },
  {
    id: "during", title: "Trong buổi khám: hỏi lại nếu chưa rõ",
    notes: [
      "Nhờ người khám giải thích bằng từ dễ hiểu. Nếu cần, xin hướng dẫn bằng văn bản.",
      "Thử nhắc lại bằng lời của mình: “Tôi hiểu bước tiếp theo là như vậy, đúng không ạ?”",
      "Nếu được chỉ định xét nghiệm, hỏi cần chuẩn bị gì và nhận kết quả qua đâu.",
    ],
    source: { name: "AHRQ · Cơ quan Nghiên cứu và Chất lượng Chăm sóc Sức khỏe Hoa Kỳ", url: ahrq },
    extraSource: { name: "AHRQ · Phương pháp nhắc lại để xác nhận đã hiểu", url: "https://www.ahrq.gov/health-literacy/improve/precautions/tool5.html" },
  },
  {
    id: "after", title: "Sau buổi khám: xác nhận bước tiếp theo",
    notes: [
      "Nếu chưa hiểu hướng dẫn khi về nhà, liên hệ lại cơ sở khám để hỏi rõ.",
      "Nếu quá thời điểm hẹn mà chưa nhận kết quả, liên hệ nơi chỉ định xét nghiệm và hỏi nên làm gì tiếp theo.",
    ],
    source: { name: "AHRQ · Cơ quan Nghiên cứu và Chất lượng Chăm sóc Sức khỏe Hoa Kỳ", url: ahrq },
  },
]
