import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import defaultCover from "../../assets/default-cover.png";

const SkeletonCard = () => (
  <div className="bg-white rounded-lg shadow overflow-hidden animate-pulse dark:bg-gray-800">
    <div className="w-full h-40 bg-gray-300 dark:bg-gray-700"></div>
    <div className="p-3">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2 dark:bg-gray-700"></div>
      <div className="h-3 bg-gray-300 rounded w-full mb-1 dark:bg-gray-700"></div>
      <div className="h-3 bg-gray-300 rounded w-5/6 mb-3 dark:bg-gray-700"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2 dark:bg-gray-700"></div>
    </div>
  </div>
);

const SkeletonGrid = () => (
  <section>
    <div className="h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse dark:bg-gray-700"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>

    <div className="h-6 bg-gray-200 rounded w-48 mt-8 mb-4 animate-pulse dark:bg-gray-700"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  </section>
);

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

  if (!novels.length) return <p className="text-gray-700 dark:text-gray-300">Không tìm thấy truyện nào.</p>;

  return (
    <section>
      {/* --- Truyện nổi bật Tháng --- */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">🔥 Các Thể Loại Truyện Nổi Bật</h2>
        <button className="text-sm text-[#2E5BFF] hover:underline dark:text-blue-400">
          Xem tất cả &gt;
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {novels.slice(0, 6).map((novel) => (
          <Link to={`/BookDetail/${novel.novelId}`} key={novel.novelId}>
            {/* Cập nhật thẻ truyện */}
            <div className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden cursor-pointer transition
                          dark:bg-gray-800 dark:hover:bg-gray-700">
              <div className="aspect-w-3 aspect-h-4 w-full">
                <img
                  src={
                    novel.novel_img_url && novel.novel_img_url.trim() !== ""
                      ? novel.novel_img_url
                      : defaultCover
                  }
                  alt={novel.novelTitle}
                  className="w-full h-full contrast-100 brightness-95 saturate-150 object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium truncate text-gray-900 dark:text-white">{novel.novelTitle}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mt-2 dark:text-gray-400">
                  {novel.novelDescription}
                </p>
                <p className="text-xs text-gray-400 mt-2 dark:text-gray-500">
                  Tác giả: {novel.author}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {novels.slice(6, 12).map((novel) => (
          <Link to={`/BookDetail/${novel.novelId}`} key={novel.novelId}>
            <div className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden cursor-pointer transition
                          dark:bg-gray-800 dark:hover:bg-gray-700">
              <img
                src={
                  novel.novel_img_url && novel.novel_img_url.trim() !== ""
                    ? novel.novel_img_url
                    : defaultCover
                }
                alt={novel.novelTitle}
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">{novel.novelTitle}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 dark:text-gray-400">
                  {novel.novelDescription}
                </p>
                <p className="text-xs text-gray-400 mt-1 dark:text-gray-500">
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