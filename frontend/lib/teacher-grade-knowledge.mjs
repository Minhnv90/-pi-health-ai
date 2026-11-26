// Original offline examples; a sampler, not an official or complete curriculum.
const cards = [
  [
    ["Đọc theo thứ tự", "Na mở hộp, lấy bút rồi vẽ. Dùng từ “rồi” để biết việc nào theo sau.", "Na làm gì ngay trước khi vẽ?", "Na lấy bút. Mở hộp là bước đầu tiên."],
    ["Nhìn bóng", "Một chiếc cốc đặt trước đèn tạo bóng vì cốc chắn bớt ánh sáng.", "Đặt tấm bìa trước đèn thì phía sau tấm bìa có thể thấy gì?", "Có thể thấy bóng vì bìa chắn ánh sáng."]
  ],
  [
    ["Tìm ý chính", "Lớp Na nhặt giấy, gom chai và lau bàn. Ba việc cùng nói về việc dọn lớp.", "“Lau bàn” là ý chính hay một chi tiết?", "Đó là một chi tiết. Ý chính rộng hơn: lớp cùng dọn dẹp."],
    ["Nhóm theo dấu hiệu", "Ba hòn sỏi: tròn đỏ, tròn xám, dẹt đỏ. Nếu nhóm theo hình dạng, hai viên tròn đứng cùng nhóm.", "Nếu nhóm theo màu, hai viên nào đứng cùng nhóm?", "Viên tròn đỏ và viên dẹt đỏ. Mỗi cách nhóm dùng một dấu hiệu khác."]
  ],
  [
    ["Theo dấu vũng nước", "Một vũng nhỏ dưới nắng dần cạn. Một phần nước lỏng có thể bay hơi thành hơi nước trong không khí.", "Chỉ nhìn vũng cạn, em có biết chắc tất cả nước đều bay hơi không?", "Không. Nước cũng có thể thấm xuống đất hoặc chảy đi."],
    ["Đọc bảng kiểm đếm", "Hộp A có 5 viên bi, B có 8 viên, C có 5 viên.", "Hộp B nhiều hơn từng hộp còn lại bao nhiêu viên?", "3 viên, vì 8 trừ 5 bằng 3 cho cả A và C."]
  ],
  [
    ["Thử một yếu tố", "Để khảo sát ánh sáng ảnh hưởng thế nào đến cây cùng loại, giữ đất và lượng nước giống nhau, chỉ đổi lượng ánh sáng.", "Nếu đổi cả nước lẫn ánh sáng, vì sao khó giải thích kết quả?", "Vì ta không tách được yếu tố nào góp phần tạo khác biệt."],
    ["Lời kể và suy đoán", "“Mai thấy sân ướt” là lời kể về điều bạn nhìn thấy. “Chắc vừa mưa” là suy đoán.", "Có cách giải thích nào khác cho sân ướt?", "Có thể ai đó vừa tưới cây hoặc rửa sân. Một dấu hiệu có thể có nhiều nguyên nhân."]
  ],
  [
    ["Biểu đồ có đơn vị", "Trên biểu đồ sách mượn, mỗi ô là 2 cuốn. Thứ Hai có 3 ô, thứ Ba có 5 ô.", "Hai ngày chênh nhau bao nhiêu cuốn?", "4 cuốn: chênh 2 ô, mỗi ô là 2 cuốn."],
    ["Đường đi của ánh sáng", "Gương làm ánh sáng đổi hướng do phản xạ. Tờ giấy cũng phản xạ ánh sáng nhưng tán xạ nhiều hướng, nên không cho ảnh rõ như gương.", "Vì sao vẫn nhìn thấy giấy dù không soi được mặt mình vào đó?", "Ánh sáng từ giấy vẫn đến mắt; chỉ không phản xạ theo cách tạo ảnh rõ."]
  ],
  [
    ["Lời quảng cáo cần chứng cứ", "Một tờ rơi ghi “hộp giữ lạnh tốt nhất” nhưng không nêu so với hộp nào hay thử bao lâu.", "Em sẽ hỏi thêm điều gì trước khi tin?", "Ví dụ: thử trong điều kiện nào, trong bao lâu và với hộp đối chứng nào?"],
    ["So công bằng bằng tỉ lệ", "Nhóm A làm đúng 8/10, nhóm B đúng 12/20 trong cùng một bài.", "Nhóm nào có tỉ lệ đúng cao hơn?", "Nhóm A: 80% so với 60%. Đừng so riêng số câu đúng khi tổng khác nhau."]
  ],
  [
    ["Chuỗi thức ăn đơn giản", "Trong mô hình cỏ → châu chấu → ếch, mũi tên chỉ hướng chuyển năng lượng từ sinh vật bị ăn tới sinh vật ăn.", "Mũi tên từ châu chấu tới ếch nghĩa là gì?", "Ếch ăn châu chấu và nhận một phần năng lượng từ thức ăn."],
    ["Điều tra có đại diện không?", "Để hỏi cả lớp thích hoạt động nào, Nam chỉ hỏi các bạn trong nhóm bóng rổ.", "Vì sao kết quả có thể nghiêng về một lựa chọn?", "Nhóm được hỏi có chung sở thích; cần lấy ý kiến rộng hơn thay vì coi nhóm đó là cả lớp."]
  ],
  [
    ["Bảo toàn khối lượng", "Trong một hộp kín không thất thoát vật chất, đá tan thành nước nhưng tổng khối lượng của hộp và phần bên trong không đổi.", "Điều gì đổi và điều gì không đổi?", "Trạng thái của nước đổi từ rắn sang lỏng; tổng khối lượng hệ kín không đổi."],
    ["Kiểm tra trục biểu đồ", "Quầy A bán 98 hộp, B bán 100 hộp. Biểu đồ cột bắt đầu từ 97 nên trông như B vượt xa A.", "Cần xem gì để không bị hình vẽ đánh lừa?", "Xem mốc đầu trục, đơn vị và số gốc. Chênh lệch thực chỉ là 2 hộp."]
  ],
  [
    ["Cùng tăng chưa chắc gây ra", "Trong tuần nóng, thư viện bán nhiều nước hơn và sân trường có nhiều người đội mũ hơn.", "Có nên kết luận mua nước làm nhiều người đội mũ không?", "Không. Trời nóng có thể ảnh hưởng tới cả hai; cùng thay đổi chưa chứng minh quan hệ nhân quả."],
    ["Đọc hai góc nhìn", "Bài A kể xe buýt đông giờ tan học; bài B đếm khách trên một chuyến buổi trưa và thấy vắng.", "Hai bài có nhất thiết mâu thuẫn không?", "Không. Khung giờ và mẫu quan sát khác nhau; cần đối chiếu đúng đối tượng và điều kiện."]
  ],
  [
    ["Mô hình cần giả định", "Một xe giả định đi đều 12 km mỗi giờ. Ước tính đi 36 km hết 3 giờ nếu tốc độ giữ nguyên và không dừng.", "Nếu xe nghỉ 20 phút giữa đường, thời gian cả hành trình là bao lâu?", "3 giờ 20 phút, nếu thời gian chạy vẫn là 3 giờ."],
    ["Lập luận tìm phản ví dụ", "Có bạn nói “mọi vật bằng kim loại đều bị nam châm thông thường hút rõ rệt”.", "Một phản ví dụ nào đủ bác bỏ chữ “mọi”?", "Một miếng nhôm không bị nam châm tĩnh thông thường hút rõ rệt như sắt; chỉ cần một ngoại lệ cho khẳng định “mọi”."]
  ],
  [
    ["Số trung tâm và điểm cực đoan", "Thời gian chờ giả định là 4, 5, 5, 6 và 30 phút. Trung vị là 5; trung bình là 10.", "Số nào mô tả lượt chờ điển hình tốt hơn ở ví dụ này?", "Trung vị 5 phút ít bị kéo lên bởi lượt chờ 30 phút. Vẫn nên báo cả lượt bất thường nếu quan trọng."],
    ["Phân biệt nguồn gốc bằng chứng", "Nhóm báo trường đọc một bài nhận xét hội chợ và một bảng đếm người do ban tổ chức ghi tại cổng.", "Nếu cần biết lượt qua cổng đã ghi, tìm nguồn nào trước?", "Xem bảng đếm gốc và phương pháp đếm. Lượt qua cổng có thể không bằng số người riêng biệt."]
  ],
  [
    ["Phần trăm và điểm phần trăm", "Trong khảo sát giả định, tỷ lệ đồng ý từ 40% lên 50%. Hai cách diễn đạt: tăng 10 điểm phần trăm hoặc tăng 25% so với tỷ lệ ban đầu.", "Vì sao hai số cùng đúng?", "10 là hiệu 50 − 40; 25% là mức tăng tương đối: 10 chia cho 40."],
    ["Đánh giá thử nghiệm A/B", "Hai lớp dùng hai tài liệu khác nhau, nhưng lớp A đã có điểm đầu kỳ cao hơn. Cuối kỳ A vẫn cao hơn.", "Kết quả này có đủ để nói tài liệu A hiệu quả hơn không?", "Chưa. Cần xét điểm ban đầu và cách phân nhóm; nếu có thể, phân ngẫu nhiên và so mức thay đổi trong cùng điều kiện."]
  ],
]

export function getGradeKnowledge(grade) {
  if (!Number.isInteger(grade) || grade < 1 || grade > cards.length) return []
  return cards[grade - 1].map(([title, example, question, explanation]) => ({ title, example, question, explanation }))
}
