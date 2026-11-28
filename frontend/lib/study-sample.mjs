import { practiceLessons } from "./study-practice.mjs"

export const lessons = [
  { grade: 1, topic: "Phép cộng", prompt: "Có 5 quả cam, được thêm 3 quả. Có tất cả bao nhiêu quả cam?", hints: ["Bắt đầu từ 5 rồi đếm thêm.", "Đếm tiếp 6, 7, rồi đến số nào?"], answer: 8, explanation: "5 + 3 = 8." },
  { grade: 2, topic: "Nhóm bằng nhau", prompt: "Có 3 nhóm bút chì, mỗi nhóm có 4 cây. Tất cả có bao nhiêu cây bút chì?", hints: ["Có ba nhóm bằng nhau. Hãy đếm thêm 4 cây mỗi lần.", "Lấy 4 cộng 4 cho hai nhóm, rồi cộng thêm 4 cho nhóm cuối."], answer: 12, explanation: "4 + 4 + 4 = 12 cây bút chì." },
  { grade: 3, topic: "Chia đều", prompt: "Chia đều 36 nhãn dán cho 4 bạn. Mỗi bạn nhận mấy nhãn dán?", hints: ["Tìm một số nhân với 4 thì được 36.", "Thử dùng bảng nhân 4; kết quả phải nhỏ hơn 10."], answer: 9, explanation: "36 chia 4 được 9 nhãn dán." },
  { grade: 4, topic: "Diện tích", prompt: "Tấm bìa hình chữ nhật dài 9 cm và rộng 6 cm. Diện tích là bao nhiêu xăng-ti-mét vuông?", hints: ["Diện tích hình chữ nhật bằng chiều dài nhân chiều rộng.", "Có thể tính 10 nhân 6 rồi bớt đi một nhóm 6."], answer: 54, explanation: "9 × 6 = 54 cm²." },
  { grade: 5, topic: "Phần trăm", prompt: "Lớp có 40 bạn. Có 25 phần trăm số bạn chọn vẽ. Có bao nhiêu bạn chọn vẽ?", hints: ["25 phần trăm là một phần tư.", "Chia 40 thành bốn phần bằng nhau rồi lấy một phần."], answer: 10, explanation: "40 chia 4 được 10 bạn." },
  { grade: 6, topic: "Số nguyên", prompt: "Nhiệt độ ban đầu là −3°C. Nếu tăng thêm 7°C thì nhiệt độ mới là bao nhiêu độ C?", hints: ["Tăng nhiệt độ là đi sang phải trên trục số.", "Từ −3 đến 0 đi 3 bước. Còn mấy bước nữa trong tổng 7 bước?"], answer: 4, explanation: "−3 + 7 = 4°C." },
  { grade: 7, topic: "Tỉ lệ thuận", prompt: "Ba cuốn vở cùng giá có tổng giá 24 nghìn đồng. Năm cuốn như vậy giá bao nhiêu nghìn đồng?", hints: ["Tìm giá của một cuốn trước.", "Lấy 24 chia 3, rồi nhân kết quả với 5."], answer: 40, explanation: "24 chia 3 rồi nhân 5 được 40 nghìn đồng." },
  { grade: 8, topic: "Phương trình", prompt: "Tìm x biết 3x + 5 = 26.", hints: ["Trừ 5 ở cả hai vế để tách số hạng chứa x.", "Sau đó chia cả hai vế cho 3."], answer: 7, explanation: "3x bằng 21, vậy x bằng 7." },
  { grade: 9, topic: "Căn bậc hai", prompt: "Hình vuông có diện tích 121 m². Độ dài mỗi cạnh là bao nhiêu mét?", hints: ["Diện tích hình vuông bằng cạnh nhân với chính nó.", "Tìm căn bậc hai số học của 121; độ dài phải dương."], answer: 11, explanation: "11 × 11 = 121, nên mỗi cạnh dài 11 m." },
  { grade: 10, topic: "Hàm số bậc hai", prompt: "Biết f(x) = x² − 3x + 4. Tính f(4).", hints: ["Thay mọi chữ x trong biểu thức bằng 4.", "Tính 4 bình phương và 3 nhân 4 trước, rồi thực hiện cộng trừ."], answer: 8, explanation: "16 − 12 + 4 = 8." },
  { grade: 11, topic: "Cấp số cộng", prompt: "Cấp số cộng có số hạng đầu là 5 và công sai là 3. Số hạng thứ sáu bằng bao nhiêu?", hints: ["Từ số hạng thứ nhất tới thứ sáu có 5 bước.", "Mỗi bước tăng 3; cộng tổng phần tăng vào số hạng đầu."], answer: 20, explanation: "5 + 5 × 3 = 20." },
  { grade: 12, topic: "Ứng dụng đạo hàm", prompt: "Cho f(x) = x³ − 2x. Tính f′(2).", hints: ["Tính đạo hàm từng số hạng trước khi thay x.", "Đạo hàm là 3x² − 2. Thay x bằng 2 rồi tính."], answer: 10, explanation: "3 × 2² − 2 = 10." },
]

const alternateStrategies = [
  "Giơ 5 ngón ở một bàn tay, rồi thêm 3 ngón ở bàn tay kia và đếm tất cả.",
  "Vẽ 3 vòng tròn, mỗi vòng có 4 chấm; đếm tất cả các chấm.",
  "Vẽ 4 nhóm rồi chia từng nhãn vào từng nhóm theo vòng cho đến hết.",
  "Vẽ một ô lưới 9 cột và 6 hàng; mỗi ô nhỏ có diện tích một xăng-ti-mét vuông.",
  "Vẽ 4 ô đại diện cho 100 phần trăm, rồi chia đều 40 vào 4 ô.",
  "Vẽ trục số và đánh một dấu sau mỗi bước sang phải kể từ âm 3.",
  "Lập bảng hai dòng: số vở và giá tiền. Đi qua cột 1 cuốn trước khi tính 5 cuốn.",
  "Kiểm tra kết quả bằng cách thế số vừa tìm vào biểu thức 3x cộng 5.",
  "Thử bình phương các số nguyên gần 10 rồi so với diện tích đã cho.",
  "Viết riêng giá trị của ba hạng: 4 bình phương, âm 3 nhân 4, và 4; sau đó cộng lại.",
  "Viết sáu ô; điền 5 vào ô đầu rồi thêm 3 mỗi khi sang một ô.",
  "Đánh dấu riêng hai hạng tử: đạo hàm của x lập phương và đạo hàm của âm 2x, rồi thay 2."
]

const commonMistakes = {
  2: { 7: "Nếu em vừa cộng 3 với 4, hãy để ý: 3 là số nhóm, không phải số cây trong một nhóm." },
  5: { 25: "Hãy phân biệt tỉ lệ 25 phần trăm với số bạn chọn vẽ." },
  8: { 21: "Nếu em đã trừ 5, em đang có giá trị của 3x, chưa phải giá trị của x." },
  10: { 4: "Khi thay x bằng 4, nhớ thay cả x bình phương lẫn x trong hạng tử còn lại." },
  11: { 23: "Em đã tính luôn số hạng đầu ở vị trí thứ nhất chưa? Đếm số lần bước sang ô mới." },
}

export { practiceLessons }
export const getLesson = (grade, variant = "original") => {
  const bank = variant === "practice" ? practiceLessons : lessons
  return bank.find((lesson) => lesson.grade === grade) ?? bank[1]
}
export const startStudy = (grade = 2, variant = "original") => ({
  grade: getLesson(grade, variant).grade, variant: variant === "practice" ? "practice" : "original", level: 0, done: false,
  message: "Chào em! Em thử trả lời trước hoặc bấm Nhận gợi ý để cùng làm từng bước.",
})

export function nextStudy(state, value) {
  if (state.done) return state
  const lesson = getLesson(state.grade, state.variant)
  const input = typeof value === "string" ? value.trim() : ""
  if (input !== "hint" && !/^[-−]?\d{1,3}$/.test(input)) {
    return { ...state, message: lesson.choices ? "Em chọn một phương án trong bài, hoặc bấm Nhận gợi ý nhé." : "Em chỉ nhập đáp số hoặc bấm Nhận gợi ý. Không cần nhập tên hay thông tin riêng." }
  }
  const number = Number(input.replace("−", "-"))
  if (input !== "hint" && lesson.choices && (number < 1 || number > lesson.choices.length)) {
    return { ...state, message: "Em chọn một phương án trong bài, hoặc bấm Nhận gợi ý nhé." }
  }
  if (number === lesson.answer) {
    return { ...state, done: true, message: "Đúng rồi! " + lesson.explanation }
  }
  const level = Math.min(state.level + 1, lesson.hints.length)
  const lead = input === "hint" ? "" : "Chưa đúng rồi, em thử lại nhé. "
  if (state.level >= lesson.hints.length) {
    return { ...state, message: lead + "Thử cách khác: " + (lesson.alternate ?? alternateStrategies[lesson.grade - 1]) }
  }
  const targetedHint = state.variant === "practice" ? undefined : commonMistakes[lesson.grade]?.[number]
  return { ...state, level, message: lead + "Gợi ý " + level + ": " + (targetedHint ?? lesson.hints[level - 1]) }
}
