import React from "react";
import { BookOpen } from "lucide-react";

const readingData = [
  {
    id: 1,
    title: "Solo Leveling",
    img: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/solo-leveling-sung-jin-woo-featured-image.jpg",
    updated: "Cập nhật 2 giờ trước",
  },
  {
    id: 2,
    title: "Chuyển Sinh Thành Slime",
    img: "https://img4.thuthuatphanmem.vn/uploads/2020/11/10/chuyen-sinh-thanh-slime-tensei-shitara-slime-datta-ken_015456993.jpg",
    updated: "Cập nhật 1 ngày trước",
  },
  {
    id: 3,
    title: "Vũ Động Càn Khôn",
    img: "https://thegioidienanh.vn/stores/news_dataimages/thanhtan/082018/07/12/3237_poster-ngo-ton.jpg",
    updated: "Cập nhật 3 ngày trước",
  },
  {
    id: 4,
    title: "Quỷ Bí Chi Chủ",
    img: "https://www.nae.vn/ttv/ttv/public/images/story/23b9f814404ee0a32d03f7d09d762075ef88b0730b0537c8f70ee36c1b37af5e.jpg",
    updated: "Cập nhật 1 tuần trước",
  },
  {
    id: 5,
    title: "Classroom of the Elite",
    img: "https://images-na.ssl-images-amazon.com/images/I/915HXbY+w8L._RI_.jpg",
    updated: "Cập nhật 2 tuần trước",
  },
];

function ReadingSection() {
  return (
    <section className="my-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center text-lg font-bold text-gray-800">
          <BookOpen className="h-5 w-5 text-[#2E5BFF] mr-2" />
          Truyện đang đọc gần đây
        </h2>
        <button className="text-[#2E5BFF] text-sm hover:underline">
          Xem tất cả &gt;
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {readingData.map((novel) => (
          <div
            key={novel.id}
            className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden"
          >
            <img
              src={novel.img}
              alt={novel.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <h3 className="font-semibold text-sm">{novel.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{novel.updated}</p>
              <button className="mt-2 w-full bg-[#2E5BFF] text-white text-xs rounded-full py-1 hover:bg-blue-700">
                Tiếp tục đọc
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ReadingSection;
