/*
  DANH SÁCH BÀI KIỂM TRA / ĐỀ LUYỆN THI
  Mỗi bài là một khối { ... }. Thêm bài mới: sao chép một khối, đổi nội dung, rồi thêm vào đầu danh sách.

  - id:       tên không dấu, không khoảng trắng (dùng đặt tên file QR)
  - group:    "15phut" (Kiểm tra 15 phút) hoặc "luyenthi" (Luyện thi)
  - title:    tên hiển thị, theo mẫu "Lớp 12 · 15 phút · Tên chủ đề"
  - date:     ngày đăng, dạng YYYY-MM-DD (bài mới hơn hiện lên trên)
  - maDe:     danh sách mã đề của bài
  - driveUrl: link thư mục Google Drive chứa các file đề (đặt chia sẻ "Bất kỳ ai có đường liên kết")
  - qr:       đường dẫn ảnh QR đáp án (chứa tất cả mã đề của bài)
*/
window.EXAMS = [
  {
    id: "bai-1-tu-truong-cam-ung-tu",
    group: "15phut",
    title: "Lớp 12 · 15 phút · Từ trường - Cảm ứng từ",
    date: "2026-11-17",
    maDe: ["101", "102"],
    driveUrl: "https://drive.google.com/drive/folders/17x2D2ZqSwsrDYNkhoNPfUpaRDESJXFSL?usp=drive_link",
    qr: "assets/qr/bai-1-tu-truong-cam-ung-tu.png"
  }
];
