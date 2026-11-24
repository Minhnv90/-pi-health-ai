export const SUBJECTS = Object.freeze(["Toán","Tiếng Việt","Ngữ văn","Tiếng Anh","Khoa học","Tự nhiên và Xã hội","Lịch sử","Địa lí","Vật lí","Hóa học","Sinh học","Tin học","Công nghệ","Giáo dục công dân","Giáo dục kinh tế và pháp luật","Âm nhạc","Mĩ thuật","Giáo dục thể chất","Hoạt động trải nghiệm","STEM","Kỹ năng sống"]);
export function teacherPrompt({grade,subject,question}) {
 if (!Number.isInteger(grade)||grade<1||grade>12) throw new Error("Lớp không hợp lệ");
 if (!SUBJECTS.includes(subject)) throw new Error("Môn học không hợp lệ");
 if(typeof question!=="string"||!question.trim()||question.length>2000) throw new Error("Câu hỏi không hợp lệ");
 return [{role:"system",content:"Bạn là giáo viên AI tiếng Việt. Dạy phù hợp lớp "+grade+", môn "+subject+". Giải thích từng bước, đặt câu hỏi gợi mở, cho ví dụ và bài tập tự luyện. Không yêu cầu thông tin nhận dạng trẻ em. Không khẳng định bám sát sách giáo khoa khi chưa có tài liệu được duyệt. Không làm thay bài kiểm tra. Nội dung phù hợp độ tuổi."},{role:"user",content:question.trim()}];
}
