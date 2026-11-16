# Vật Lý Siêu Nhẩm · Thư viện đề

Trang web tĩnh cho giáo viên và trợ giảng: chọn bài, mở thư mục đề trên Google Drive để in, quét QR đáp án bằng TN Marker.

## Đưa lên GitHub Pages (không cần biết lập trình)

1. Đăng nhập GitHub, bấm **New repository**. Đặt tên (ví dụ `de-vat-ly`), chọn **Public**, bấm **Create repository**.
2. Ở trang repo vừa tạo, bấm **uploading an existing file**. Kéo thả **toàn bộ nội dung bên trong thư mục này** (index.html, style.css, app.js, và hai thư mục `assets`, `data`) vào, rồi bấm **Commit changes**.
3. Vào **Settings → Pages**. Ở mục **Branch** chọn `main` và thư mục `/ (root)`, bấm **Save**.
4. Đợi 1 đến 2 phút. Link trang sẽ hiện ở đầu trang Pages, có dạng `https://<tên-tài-khoản>.github.io/de-vat-ly/`.

## Thêm bài mới

1. Tạo ảnh QR cho bài mới, lưu vào thư mục `assets/qr/` (tên không dấu, ví dụ `bai-2-ten-bai.png`).
2. Mở file `data/exams.js`, sao chép khối `{ ... }` của bài mẫu, dán lên đầu danh sách, sửa `id`, `title`, `date`, `maDe`, `driveUrl`, `qr`. Nhớ có dấu phẩy giữa các khối.
3. Tải hai thay đổi này lên GitHub (nút **Add file → Upload files** rồi **Commit changes**).

## Lưu ý

- Repo công khai nên ai có đường link đều mở được trang. **Không đưa file key hoặc lời giải vào repo.**
- Thư mục Drive chứa đề cần đặt chia sẻ **Bất kỳ ai có đường liên kết** thì giáo viên mới mở được.
