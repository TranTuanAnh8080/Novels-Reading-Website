import React from "react";
import { Link } from "react-router-dom"; // 👈 1. Import Link

// 2. Nhận nguyên object 'book'
function BookCard({ book }) {
  
  // 3. Lấy thông tin từ object book
  // (Tôi giả định object book trong localStorage của bạn có 'id')
  const { id, title, status, image } = book;

  // 4. Tạo URL động KHỚP VỚI FILE ROUTER CỦA BẠN
  const storyUrl = `/BookDetail/${id}`;

  return (
    <div className="bg-white rounded-lg shadow p-3 flex flex-col">
      {/* 5. Bọc ảnh bằng Link */}
      <Link to={storyUrl} className="aspect-[3/2] w-full mb-3 overflow-hidden rounded-md bg-gray-200">
        <img
          src={image || defaultCover}
          alt={title}
          className="w-full h-full object-cover"
        />
      </Link>

      {/* Info */}
      <h2 className="text-sm font-medium">
        {/* 5. Bọc tiêu đề bằng Link */}
        <Link to={storyUrl} className="hover:text-blue-600">{title}</Link>
      </h2>
      <p className="text-xs text-gray-500 mb-2">{status || "Chưa đọc"}</p>
      
      {/* 6. THAY THẾ <button> BẰNG <Link> */}
      <Link
        to={storyUrl}
        className={`px-3 py-1 rounded-md text-white text-xs font-medium bg-[#2E5BFF] hover:bg-blue-600 text-center`}
      >
        Đọc truyện
      </Link>
    </div>
  );
}

export default BookCard;