import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import defaultCover from "../../assets/default-cover.png";

// ==========================================================
// Component cho một thẻ truyện giả
const SkeletonCard = () => (
  <div className="bg-white rounded-lg shadow overflow-hidden animate-pulse">
    <div className="w-full h-40 bg-gray-300"></div>
    <div className="p-3">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
      <div className="h-3 bg-gray-300 rounded w-5/6 mb-3"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
);

// Component cho cả lưới thẻ giả
const SkeletonGrid = () => (
  <section>
    {/* Tiêu đề giả cho "Truyện nổi bật Tháng" */}
    <div className="h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
    {/* Tiêu đề giả cho "Truyện nổi bật Năm" */}
    <div className="h-6 bg-gray-200 rounded w-48 mt-8 mb-4 animate-pulse"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  </section>
);
// ==========================================================

function HeroSection() {
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        const res = await axios.post(
          "https://be-ink-realm-c7jk.vercel.app/novel/all",
          {},
          { headers: { "Content-Type": "application/json" } }
        );
        setNovels(res.data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách truyện:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNovels();
  }, []);

  if (loading) return <SkeletonGrid />;

  if (!novels.length) return <p>Không tìm thấy truyện nào.</p>;

  return (
    <section>
      {/* --- Truyện nổi bật Tháng --- */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">🔥 Truyện nổi bật Tháng</h2>
        <button className="text-sm text-[#2E5BFF] hover:underline">
          Xem tất cả &gt;
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {novels.slice(0, 6).map((novel) => (
          <Link to={`/BookDetail/${novel.novelId}`} key={novel.novelId}>
            <div className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden cursor-pointer transition">
              <img
                src={
                  novel.coverImg && novel.coverImg.trim() !== ""
                    ? novel.coverImg
                    : defaultCover
                }
                alt={novel.novelTitle}
                className="w-full h-auto object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm font-medium">{novel.novelTitle}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mt-2">
                  {novel.novelDescription}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Tác giả: {novel.author}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* --- Truyện nổi bật Năm --- */}
      <div className="flex items-center justify-between mt-8 mb-4">
        <h2 className="text-lg font-bold">🔥 Truyện nổi bật Năm</h2>
        <button className="text-sm text-[#2E5BFF] hover:underline">
          Xem tất cả &gt;
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {novels.slice(6, 12).map((novel) => (
          <Link to={`/BookDetail/${novel.novelId}`} key={novel.novelId}>
            <div className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden cursor-pointer transition">
              <img
                src={
                  novel.coverImg && novel.coverImg.trim() !== ""
                    ? novel.coverImg
                    : defaultCover
                }
                alt={novel.novelTitle}
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm font-medium">{novel.novelTitle}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {novel.novelDescription}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Tác giả: {novel.author}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default HeroSection;