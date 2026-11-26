// Deliberately finite difficulty bands and selected skills, not a full curriculum.
const exercise = (topic, prompt, first, second, answer, explanation) =>
  ({ topic, prompt, hints: [first, second], answer, explanation });
const bands = [
  [
    (a,b) => exercise("Cộng trong phạm vi 20", "Có "+a+" quả cam, thêm "+b+" quả. Có tất cả bao nhiêu?", "Bắt đầu ở số quả cam ban đầu.", "Đếm tiến thêm một bước cho mỗi quả được thêm.", a+b, a+" + "+b+" = "+(a+b)+"."),
    (a,b) => exercise("Trừ trong phạm vi 20", "Có "+(a+b)+" viên bi, cho bạn "+b+" viên. Còn bao nhiêu?", "Bắt đầu ở số viên bi ban đầu.", "Đếm lùi một bước cho mỗi viên đã cho.", a, (a+b)+" − "+b+" = "+a+"."),
  ],
  [
    (a,b) => exercise("Nhóm bằng nhau", "Có "+a+" nhóm bút chì, mỗi nhóm "+b+" cây. Có bao nhiêu cây?", "Đếm thêm "+b+" cây mỗi lần.", "Cộng "+b+" đúng "+a+" lần.", a*b, a+" × "+b+" = "+(a*b)+"."),
    (a,b) => exercise("Cộng hai số có hai chữ số", "Tính "+(a+17)+" + "+(b+24)+".", "Cộng hàng đơn vị trước.", "Nếu đủ 10 đơn vị, đổi thành 1 chục rồi cộng hàng chục.", a+b+41, (a+17)+" + "+(b+24)+" = "+(a+b+41)+"."),
  ],
  [
    (a,b) => exercise("Chia đều", "Chia đều "+a*b+" nhãn cho "+b+" bạn. Mỗi bạn có mấy nhãn?", "Số mỗi bạn nhận là như nhau.", "Tìm số nhân với "+b+" thì được "+a*b+".", a, a*b+" ÷ "+b+" = "+a+"."),
    (a,b) => exercise("Chu vi hình vuông", "Một hình vuông có cạnh "+(a+b)+" cm. Chu vi bằng bao nhiêu cm?", "Hình vuông có 4 cạnh bằng nhau.", "Cộng độ dài của bốn cạnh.", 4*(a+b), "4 × "+(a+b)+" = "+4*(a+b)+" cm."),
  ],
  [
    (a,b) => exercise("Diện tích chữ nhật", "Hình chữ nhật dài "+(a+8)+" cm, rộng "+b+" cm. Diện tích bao nhiêu cm²?", "Diện tích đếm số ô vuông đơn vị.", "Nhân số ô trong một hàng với số hàng.", (a+8)*b, (a+8)+" × "+b+" = "+(a+8)*b+" cm²."),
    (a,b) => exercise("Đổi đơn vị độ dài", "Đổi "+a+" m "+(b+10)+" cm sang xăng-ti-mét.", "Một mét bằng 100 cm.", "Đổi phần mét trước, rồi cộng phần cm còn lại.", 100*a+b+10, a+" × 100 + "+(b+10)+" = "+(100*a+b+10)+" cm."),
  ],
  [
    (a,b) => exercise("Phần trăm", "25% của "+4*(a+b)+" bằng bao nhiêu?", "25% bằng một phần tư.", "Chia số đã cho thành bốn phần bằng nhau.", a+b, 4*(a+b)+" ÷ 4 = "+(a+b)+"."),
    (a,b) => exercise("Phân số của một lượng", "Tính 2/3 của "+3*(a+b)+".", "Tìm 1/3 trước.", "Nhân phần vừa tìm với 2.", 2*(a+b), "("+3*(a+b)+" ÷ 3) × 2 = "+2*(a+b)+"."),
  ],
  [
    (a,b) => exercise("Số nguyên", "Tính (−"+(a+8)+") + "+b+".", "Bắt đầu ở số âm trên trục số.", "Cộng số dương nghĩa là đi sang phải.", b-a-8, "−"+(a+8)+" + "+b+" = "+(b-a-8)+"."),
    (a,b) => exercise("Thứ tự phép tính", "Tính "+a+" + 3 × "+b+".", "Phép nhân đứng trước phép cộng.", "Tính 3 × "+b+" rồi cộng "+a+".", a+3*b, a+" + "+3*b+" = "+(a+3*b)+"."),
  ],
  [
    (a,b) => exercise("Tỉ lệ thuận", "Giá "+a+" quyển vở là "+a*(b+4)+" nghìn đồng. "+(a+3)+" quyển cùng loại giá bao nhiêu nghìn đồng?", "Tìm giá một quyển trước.", "Nhân đơn giá với "+(a+3)+".", (a+3)*(b+4), a*(b+4)+" ÷ "+a+" × "+(a+3)+" = "+(a+3)*(b+4)+" nghìn đồng."),
    (a,b) => exercise("Trung bình cộng", "Trung bình cộng của "+a+", "+(a+b)+" và "+(a+2*b)+" bằng bao nhiêu?", "Cộng cả ba số rồi chia cho 3.", "Hai số ngoài cách số giữa một khoảng bằng nhau.", a+b, "Tổng là "+3*(a+b)+", chia 3 được "+(a+b)+"."),
  ],
  [
    (a,b) => exercise("Phương trình bậc nhất", "Tìm x: 3x + "+b+" = "+(3*a+b)+".", "Trừ "+b+" ở hai vế.", "Chia cả hai vế cho 3.", a, "x = ("+(3*a+b)+" − "+b+") ÷ 3 = "+a+"."),
    (a,b) => exercise("Hằng đẳng thức", "Dùng bình phương một tổng để tính ("+a+" + "+b+")².", "Nhớ (u + v)² = u² + 2uv + v².", "Tính từng hạng rồi cộng lại; đừng bỏ hạng ở giữa.", (a+b)**2, a*a+" + "+2*a*b+" + "+b*b+" = "+(a+b)**2+"."),
  ],
  [
    (a,b) => exercise("Căn bậc hai số học", "Tính căn bậc hai số học của "+(a+b)**2+".", "Kết quả cần không âm.", "Tìm số nguyên dương nhân với chính nó ra số đã cho.", a+b, (a+b)+"² = "+(a+b)**2+", nên căn bằng "+(a+b)+"."),
    (a,b) => exercise("Hệ số góc", "Đường thẳng đi qua A(1; "+b+") và B(3; "+(b+2*a)+"). Hệ số góc bằng bao nhiêu?", "Lấy độ thay đổi tung độ chia độ thay đổi hoành độ.", "Hai hoành độ chênh nhau 2.", a, "("+ (b+2*a)+" − "+b+") ÷ (3 − 1) = "+a+"."),
  ],
  [
    (a,b) => exercise("Giá trị hàm bậc hai", "Cho f(x) = x² − "+b+"x + 2. Tính f("+a+").", "Thay x bằng "+a+" ở cả hai chỗ.", "Tính bình phương và tích trước khi cộng trừ.", a*a-b*a+2, a*a+" − "+b*a+" + 2 = "+(a*a-b*a+2)+"."),
    (a,b) => exercise("Trục đối xứng", "Parabol y = x² − "+2*a+"x + "+b+" có trục đối xứng x bằng bao nhiêu?", "Với y = Ax² + Bx + C, trục là x = −B/(2A).", "Ở đây A = 1 và B là số âm.", a, "x = "+2*a+" ÷ 2 = "+a+"."),
  ],
  [
    (a,b) => exercise("Số hạng cấp số cộng", "Cấp số cộng có u₁ = "+a+", công sai "+b+". Tính u₆.", "Từ vị trí 1 tới vị trí 6 có 5 bước.", "Cộng vào u₁ phần tăng của năm bước.", a+5*b, a+" + 5 × "+b+" = "+(a+5*b)+"."),
    (a,b) => exercise("Số hạng cấp số nhân", "Cấp số nhân có u₁ = "+a+", công bội "+b+". Tính u₃.", "Từ vị trí 1 tới vị trí 3 đi hai bước.", "Mỗi bước nhân với công bội.", a*b*b, a+" × "+b+"² = "+a*b*b+"."),
  ],
  [
    (a,b) => exercise("Giá trị đạo hàm", "Cho f(x) = x³ − "+b+"x. Tính f′("+a+").", "Lấy đạo hàm trước khi thay x.", "Đạo hàm của x³ là 3x²; đạo hàm của x là 1.", 3*a*a-b, "f′("+a+") = 3 × "+a+"² − "+b+" = "+(3*a*a-b)+"."),
    (a,b) => exercise("Tích phân xác định", "Tính tích phân của 2x + "+b+" từ 0 đến "+a+".", "Tìm nguyên hàm của từng số hạng.", "Lấy giá trị nguyên hàm ở cận trên trừ cận dưới.", a*a+b*a, "Nguyên hàm là x² + "+b+"x + C; hiệu hai cận bằng "+(a*a+b*a)+"."),
  ],
];

// Neutral worksheet contexts diversify the presentation without changing grade-level mathematics.
const formats = [
  "Bài khởi động", "Phiếu tự luyện", "Góc đố vui", "Thử thách đầu giờ",
  "Đố bạn cùng bàn", "Bài ôn cuối buổi", "Luyện nhẩm", "Sổ tay Toán",
  "Bài tập nhóm", "Góc khám phá", "Thử sức hôm nay", "Phiếu kiểm tra lại",
];
const gradeOneItems = [
  ["quả cam", "viên bi"], ["quả táo", "bút chì"], ["quả lê", "nhãn dán"],
  ["quả chuối", "khối gỗ"], ["quả quýt", "chiếc cốc"], ["quả mận", "quyển vở"],
  ["quả đào", "tấm thẻ"], ["bông hoa", "viên phấn"], ["chiếc bánh", "chiếc kẹp"],
  ["quả xoài", "quyển sách"], ["gói hạt giống", "chiếc cờ"], ["tấm bưu thiếp", "chiếc thìa"],
];

export function createMathExercise(grade, index) {
  if (!Number.isInteger(grade) || grade < 1 || grade > 12 || !Number.isSafeInteger(index) || index < 0) return null;
  const variation = Math.floor(index / 2);
  const a = 2 + variation % 8;
  const b = 2 + Math.floor(variation / 8) % 8;
  const pattern = index % 2;
  const version = Math.floor(variation / 64) % formats.length;
  const item = bands[grade - 1][pattern](a,b);
  if (grade === 1) {
    const [additionObject, subtractionObject] = gradeOneItems[version];
    if (pattern === 0) {
      item.prompt = `Có ${a} ${additionObject}, thêm ${b} ${additionObject}. Có tất cả bao nhiêu?`;
      item.hints[0] = "Bắt đầu ở số lượng ban đầu.";
    } else {
      item.prompt = `Có ${a+b} ${subtractionObject}, cho bạn ${b} ${subtractionObject}. Còn bao nhiêu?`;
      item.hints[0] = "Bắt đầu ở số lượng ban đầu.";
    }
  } else if (version > 0) {
    item.prompt = formats[version] + ": " + item.prompt;
  }
  return item;
}
