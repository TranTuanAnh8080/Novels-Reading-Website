import React from "react";
import { Target, Star } from "lucide-react";
import { Link } from "react-router-dom";

const recommendedData = [
  {
    id: 1,
    title: "Overlord",
    img: "https://m.media-amazon.com/images/S/pv-target-images/e755f8df130f1e1d2f8ac706e12dbe6273ab6db94df65303c9ce769639c99854.jpg",
    desc: "Câu chuyện bắt đầu khi Yggdrasil, một game MMORPG nổi tiếng ...",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Ngã Dục Phong Thiên",
    img: "https://i.ytimg.com/vi/bzoqpDgHhl0/maxresdefault.jpg",
    desc: "Mạnh Phàm, một thanh niên bình thường với ước mơ trở thành võ giả ...",
    rating: 4.6,
  },
  {
    id: 3,
    title: "The Beginning After The End",
    img: "https://cdn.beahero.gg/2025/06/The-Beginning-After-the-End-temporada-2.jpg",
    desc: "King Grey có tất cả sức mạnh, sự giàu có và địa vị trong một thế giới được...",
    rating: 4.9,
  },
  {
    id: 4,
    title: "Phàm Nhân Tu Tiên",
    img: "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2025/01/09/4rhx560i_w2r86nwi_1920x1080-phamnhantutien1_296_168.webp",
    desc: "Hàn Lập, một cậu bé nông thôn bình thường, có cơ hội tham gia một ...",
    rating: 4.7,
  },
];

function RecommendedSection() {
  return (
    <section className="my-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center text-lg font-semibold text-gray-800">
          <Target className="h-5 w-5 text-red-500 mr-2" />
          Truyện đề cử cho bạn
        </h2>
        <Link to="/RecommendedAll" className="text-blue-600 text-sm hover:underline">
          Xem tất cả &gt;
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendedData.map((novel) => (
          <div
            key={novel.id}
            className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden"
          >
            <img
              src={novel.img}
              alt={novel.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-base">{novel.title}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {novel.desc}
              </p>
              <div className="flex items-center justify-between mt-3">
                <p className="flex items-center text-yellow-500 text-sm">
                  <Star className="h-4 w-4 mr-1" />
                  {novel.rating}/5
                </p>
                <button className="text-sm text-purple-600 hover:underline">
                  + Theo dõi
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecommendedSection;
