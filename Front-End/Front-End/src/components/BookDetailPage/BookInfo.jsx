import React from "react";
import { Star, BookOpen, Bookmark, Headphones } from "lucide-react";
import { Link } from "react-router-dom";

export default function BookInfo({ title, img, rating, isFollowing, setIsFollowing }) {
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
        <span className="text-gray-800 font-medium">{title}</span>
      </div>

      {/* Layout 2 cột */}
      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar trái */}
        <div className="col-span-4">
          <img
            src={img}
            alt="Book cover"
            className="w-full aspect-[3/4] object-cover rounded-lg shadow-md mb-4"
          />

          {/* Buttons */}
          <div className="flex flex-col gap-3 mb-4">
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#1A73E8] text-white rounded-lg hover:bg-blue-700">
              <BookOpen className="w-4 h-4" />
              Đọc truyện
            </button>

            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border ${
                isFollowing
                  ? "bg-blue-50 text-blue-600 border-blue-400"
                  : "text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              <Bookmark className="w-4 h-4" />
              {isFollowing ? "Đang theo dõi" : "Theo dõi"}
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
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
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
              <span className="ml-2 font-medium text-gray-800">{rating}/5</span>
              <span className="ml-1 text-gray-500 text-sm">(2,156 đánh giá)</span>
            </div>
          </div>

          {/* Giới thiệu */}
          <div className="mt-6">
            <h2 className="font-bold text-gray-800 mb-2">Giới thiệu</h2>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm">
              <p className="text-gray-600 text-sm leading-relaxed">
                Hơi nước cùng máy móc thủy triều bên trong, ai có thể chạm đến phi phàm? 
                Lịch sử cùng hắc ám trong sương mù, là ai tại thì thầm? 
                Ta theo quỷ bí bên trong tỉnh lại, mở mắt trông thấy cái thế giới này:<br /><br />
                Súng ống, đại pháo, cự hạm, khinh khí cầu, máy vi sai; ma dược, bói toán, 
                nguyền rủa, người treo ngược, phong ấn vật... 
                Quang minh vẫn như cũ chiếu rọi, huyền bí chưa bao giờ rời xa, 
                đây là một đoạn "Ngu giả" truyền thuyết..
              </p>
            </div>
          </div>

          {/* Chương mới nhất */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold text-gray-800">Chương mới nhất</h2>
              <Link to="/ChapterList" className="text-xs text-blue-600 hover:underline">
                Xem mục lục
              </Link>
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

          {/* Thông tin chi tiết + Dịch bởi */}
          <div className="grid grid-cols-2 gap-4">
            {/* Thông tin chi tiết */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3">Thông tin chi tiết</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tình trạng:</span>
                  <span className="font-medium text-gray-800">Hoàn thành (1250 chương)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nguồn:</span>
                  <span className="font-medium text-gray-800">Dịch từ tiếng Trung</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cập nhật:</span>
                  <span className="font-medium text-gray-800">26/06/2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Độ dài:</span>
                  <span className="font-medium text-gray-800">Trên 5 triệu chữ</span>
                </div>
              </div>
            </div>

          {/* Dịch bởi */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3">Dịch bởi</h3>
            
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Translator"
                className="w-12 h-12 rounded-full object-cover"
              />

              {/* Info */}
              <div className="flex flex-col">
                <h4 className="font-semibold text-gray-800">Team Truyện Hay</h4>
                <p className="text-sm text-gray-600">Nhóm dịch từ 2018</p>
                <button className="mt-1 text-sm text-blue-600 hover:underline text-left">
                  Xem tất cả truyện
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
