import React from "react";
import { Star, BookOpen, Bookmark, Headphones } from "lucide-react";

export default function BookInfo({ rating }) {
  const chapters = [
    { title: "Chương 1250: Chúa Tể Quỷ Bí", time: "1 ngày trước" },
    { title: "Chương 1249: Đại Chiến Hỗn Điện", time: "3 ngày trước" },
    { title: "Chương 1248: Bí Mật Hỗn Điện", time: "5 ngày trước" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        Trang chủ / Truyện dịch / Tiên Hiệp /{" "}
        <span className="text-gray-800 font-medium">Quỷ Bí Chi Chủ</span>
      </div>

      {/* Layout 2 cột */}
      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar trái */}
        <div className="col-span-4">
          <img
            src="https://www.nae.vn/ttv/ttv/public/images/story/23b9f814404ee0a32d03f7d09d762075ef88b0730b0537c8f70ee36c1b37af5e.jpg"
            alt="Book cover"
            className="w-full aspect-[3/4] object-cover rounded-lg shadow-md mb-4"
          />

          {/* Buttons */}
          <div className="flex flex-col gap-3 mb-4">
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#1A73E8] text-white rounded-lg hover:bg-blue-700">
              <BookOpen className="w-4 h-4" />
              Đọc truyện
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <Bookmark className="w-4 h-4" />
              Theo dõi
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#8B3DFF] text-white rounded-lg hover:bg-purple-700">
              <Headphones className="w-4 h-4" />
              Nghe đọc (TTS)
            </button>
          </div>

          {/* Stats */}
          <div className="border-t pt-4 flex justify-around text-center text-sm">
            <div>
              <div className="font-semibold text-gray-800">1.2M</div>
              <div className="text-gray-500 text-xs">Lượt đọc</div>
            </div>
            <div>
              <div className="font-semibold text-gray-800">45K</div>
              <div className="text-gray-500 text-xs">Theo dõi</div>
            </div>
            <div>
              <div className="font-semibold text-gray-800">12K</div>
              <div className="text-gray-500 text-xs">Đề cử</div>
            </div>
          </div>
        </div>

        {/* Content phải */}
        <div className="col-span-8 flex flex-col gap-6">
          {/* Title & Author */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Quỷ Bí Chi Chủ
            </h1>
            <div className="text-sm text-gray-700 mb-3">
              Tác giả:{" "}
              <button className="text-blue-600 hover:underline font-medium">
                Ái Tiêu Đích Sủng Vật
              </button>{" "}
              · Dịch giả:{" "}
              <button className="text-blue-600 hover:underline font-medium">
                Team Truyện Hay
              </button>
            </div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap mb-3">
              {["Tiên Hiệp", "Huyền Huyễn", "Dị Giới", "Tu Tiên", "Mạnh Mẽ"].map(
                (tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    rating >= i
                      ? "text-yellow-400 fill-yellow-400"
                      : rating >= i - 0.5
                      ? "text-yellow-400 fill-yellow-200"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 font-medium text-gray-800">
                {rating}/5
              </span>
              <span className="ml-1 text-gray-500 text-sm">
                (2,156 đánh giá)
              </span>
            </div>
          </div>

          {/* Giới thiệu */}
          <div className="mt-6">
            <h2 className="font-bold text-gray-800 mb-2">Giới thiệu</h2>
            <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50 shadow-sm">
              <p className="text-gray-800 text-sm leading-relaxed"> Hơi nước cũng mây mọc thủy triều bên trong, ai có thể chạm đến phi phàm? Lịch sử cùng hắc ám trong sương mù, là ai tại thì thầm? Ta theo quỷ bí bên trong thì thầm, mở mắt trông thấy cái thế giới này... 
                <br /><br /> Súng ống, dao phẫu, cự hạm, khinh khí cầu, máy vi sai; ma dược, bối toán, nguyên rùa, người treo ngược, phong ấn vật… Quang minh vĩnh viễn chiếu rọi, huyền bí chưa bao giờ rời xa, đây là một đoạn “Ngu giả” truyền thuyết... 
              </p>
            </div>
          </div>

          {/* Chương mới nhất */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold text-gray-800">Chương mới nhất</h2>
              <button className="text-xs text-blue-600 hover:underline">
                Xem mục lục
              </button>
            </div>
            <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg">
              {chapters.map((chapter, idx) => (
                <div
                  key={idx}
                  className="flex justify-between py-3 px-4 text-sm text-gray-800"
                >
                  <p>{chapter.title}</p>
                  <span className="text-gray-500">{chapter.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Thông tin thêm */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Thông tin chi tiết */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
              <h2 className="font-semibold text-gray-800 mb-4">
                Thông tin chi tiết
              </h2>
              <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-700">
                <div className="text-gray-500">Tình trạng:</div>
                <div className="font-medium">Hoàn thành (1250 chương)</div>
                <div className="text-gray-500">Nguồn:</div>
                <div className="font-medium">Dịch từ tiếng Trung</div>
                <div className="text-gray-500">Cập nhật:</div>
                <div className="font-medium">26/06/2023</div>
                <div className="text-gray-500">Độ dài:</div>
                <div className="font-medium">Trên 5 triệu chữ</div>
              </div>
            </div>

            {/* Dịch bởi */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
              <h2 className="font-semibold text-gray-800 mb-4">Dịch bởi</h2>
              <div className="flex items-center space-x-4">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Translator"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">Team Truyện Hay</p>
                  <p className="text-sm text-gray-500">Nhóm dịch từ 2018</p>
                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:underline font-medium"
                  >
                    Xem tất cả truyện
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
