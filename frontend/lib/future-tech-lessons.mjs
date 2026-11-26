const ai={label:"UNESCO • Năng lực AI cho học sinh",url:"https://www.unesco.org/en/articles/ai-competency-framework-students"};
const ledger={label:"NIST • Tổng quan blockchain",url:"https://csrc.nist.gov/pubs/ir/8202/final"};
const card=(title,body,question,answer,source)=>({title,body,question,answer,source});
const lessons=[
card("Robot làm theo thứ tự","Tưởng tượng một robot giấy trên ô vuông. Mỗi mũi tên bảo robot đi đúng một ô.","Robot cần đi 2 ô sang phải. Em xếp lệnh nào?","Xếp hai mũi tên sang phải, làm lần lượt.",null),
card("Cảm biến giúp robot nhận biết","Robot đồ chơi có cảm biến ánh sáng. Nó có thể phản ứng khác khi đèn bật hoặc tắt.","Cảm biến thường báo thông tin gì khi tắt đèn?","Mức sáng giảm. Robot chỉ biết điều đó nếu có cảm biến phù hợp.",null),
card("Lệnh nếu… thì…","Ta đặt luật cho robot tưởng tượng: nếu thấy vạch đỏ thì dừng, nếu không thì đi tiếp.","Gặp vạch đỏ, robot làm gì theo luật này?","Dừng lại. Cùng một luật được áp dụng ở mỗi bước.",null),
card("Tìm chỗ sai trong lệnh","Robot giấy đã đi sang trái ở bước 2, nhưng em muốn đi sang phải.","Em nên kiểm tra bước nào trước?","Bước 2. Sửa đúng bước rồi chạy lại từ đầu để kiểm chứng.",null),
card("AI học từ ví dụ","Một hệ thống học phân loại ảnh từ nhiều ví dụ đã được gắn nhãn; ví dụ thiếu đa dạng có thể làm nó đoán sai ảnh khác.","Nếu hệ thống chỉ thấy ô tô màu đỏ, có nên tin chắc nó nhận ra ô tô màu xanh không?","Không. Thử với ảnh chưa dùng khi học và có nhiều màu, góc nhìn.",ai),
card("AI không phải lúc nào cũng đúng","Một trợ lý AI đưa tên cuốn sách nghe hợp lý. Câu trả lời trôi chảy không phải bằng chứng cuốn sách tồn tại.","Em có thể kiểm tra ở đâu?","Tra danh mục thư viện hoặc trang của nhà xuất bản, rồi so tên sách và tác giả.",ai),
card("Dữ liệu và quyền riêng tư","Để luyện AI nhận dạng hình vuông, em có thể dùng hình do mình tự vẽ thay cho ảnh có thông tin cá nhân.","Dữ liệu nào đủ cho bài tập?","Các hình tự vẽ. Không cần địa chỉ, ảnh mặt người hay thông tin tài khoản.",ai),
card("Robot đo rồi điều chỉnh","Robot tưởng tượng muốn đi giữa hai vạch. Nó đọc cảm biến, so với vị trí mong muốn rồi điều chỉnh.","Vì sao phải đo lại sau khi điều chỉnh?","Để biết điều chỉnh có đưa robot về đúng vị trí hay cần sửa tiếp. Đó là phản hồi.",null),
card("Blockchain và sổ chung","Hãy tưởng tượng nhiều người giữ bản sao của một sổ chung. Trong blockchain, các nhóm bản ghi được nối theo cách giúp phát hiện việc sửa trái quy tắc.","Một bản ghi sai từ lúc nhập có tự thành đúng không?","Không. Sổ giúp đối chiếu lịch sử; phải kiểm chứng thông tin gốc và ghi sửa theo quy tắc.",ledger),
card("Web3 không chỉ là token","Một số ứng dụng Web3 dùng blockchain để nhiều bên đối chiếu bản ghi. Không phải tính năng nào cũng cần blockchain.","Danh sách bài tập của riêng em có nhất thiết phải ghi lên sổ chung không?","Không. Dữ liệu học cá nhân nên chỉ cho người được phép xem; sổ chung không tự tạo quyền riêng tư.",ledger),
card("Đo AI bằng dữ liệu chưa thấy","Hai công cụ phân loại hình ảnh cần được đánh giá trên cùng tập kiểm tra chưa dùng để học.","Cùng đạt 90%, nhưng một công cụ thường sai với ảnh tối. Em báo cáo gì thêm?","Báo riêng kết quả ảnh tối, số lượng mẫu và những lỗi quan sát được; điểm trung bình có thể che nhóm yếu.",ai),
card("Thiết kế robot và nhật ký có trách nhiệm","Robot mô phỏng ghi nhận đã giao hộp. Bản ghi có thể dùng để đối chiếu, nhưng cần biết cảm biến nào báo và ai xác nhận.","Nếu robot ghi đã giao mà kho chưa nhận, em có kết luận đã giao không?","Không. Tách hai trạng thái, giữ giờ và nguồn của mỗi bản ghi, rồi đối chiếu bên nhận.",ledger),
];
export function getFutureTechLesson(grade) {
 return Number.isInteger(grade)&&grade>=1&&grade<=12?lessons[grade-1]:null;
}
