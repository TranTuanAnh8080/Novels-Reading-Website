import React, { useEffect, useState } from "react";
import { BookOpen, Bookmark, Headphones, SquareMenu, BookText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import defaultCover from "../../assets/book-cover-blank.jpg";
import axios from "axios";

export default function BookInfo({ book }) {
  const navigate = useNavigate();
  const [latestChapters, setLatestChapters] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn") === "true"
  );
  const [isFollowing, setIsFollowing] = useState(false);

  if (!book) return null;

  const {
    novelTitle: title,
    author,
    novelDescription: description,
    createDate,
    novel_img_url,
  } = book || {};

  useEffect(() => {
    const followed = JSON.parse(localStorage.getItem("followedBooks") || "[]");
    const exists = followed.some((b) => b.id === book.novelId);
    setIsFollowing(exists);
  }, [book]);

  const handleFollowToggle = () => {
    const saved = JSON.parse(localStorage.getItem("followedBooks") || "[]");
    let updated;

    if (isFollowing) {
      updated = saved.filter((b) => b.id !== book.novelId);
    } else {
      updated = [
        ...saved,
        {
          id: book.novelId,
          title: title,
          image: novel_img_url || defaultCover,
          status: "Chưa đọc",
        },
      ];
    }

    localStorage.setItem("followedBooks", JSON.stringify(updated));
    setIsFollowing(!isFollowing);
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    if (!book?.novelId) return;

    const fetchChapters = async () => {
      try {
        const res = await axios.get(
          `https://be-ink-realm-c7jk.vercel.app/chapter/list/${book.novelId}`
        );

      if (Array.isArray(res.data.chapters)) {
        const sorted = res.data.chapters
          .sort((a, b) => new Date(b.createDate) - new Date(a.createDate))
          .slice(0, 3);
        setLatestChapters(sorted);
      }
      } catch (err) {
        console.error("Lỗi khi tải danh sách chương:", err);
      }
    };

    fetchChapters();
  }, [book?.novelId]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6
                  dark:bg-gray-800 dark:border-gray-700">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6 dark:text-gray-400">
        <Link
          to={isLoggedIn ? "/HomeLoggedIn" : "/HomePage"}
          className="hover:underline text-gray-900 dark:text-gray-100"
        >
          Trang chủ
        </Link>{" "}
        / Truyện dịch /{" "}
        <span className="text-gray-900 font-medium dark:text-white">{title}</span>
      </div>

      {/* Layout 2 cột */}
      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar trái */}
        <div className="col-span-4">
          <div className="w-full aspect-[3/4] bg-gray-100 rounded-lg shadow-md mb-4 flex items-center justify-center text-gray-400 text-sm
                        dark:bg-gray-700 dark:text-gray-500">
            <img
              src={novel_img_url && novel_img_url.trim() !== "" ? novel_img_url : defaultCover}
              alt={title || "Bìa truyện"}
              className="w-full h-full object-cover rounded-md shadow"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 mb-4">
            <Link
              onClick={async (e) => {
                e.preventDefault();
                try {
                  const res = await axios.get(
                    `https://be-ink-realm-c7jk.vercel.app/chapter/list/${book.novelId}`
                  );
                if (res.data && Array.isArray(res.data.chapters) && res.data.chapters.length > 0) {
                  const firstChapterId = res.data.chapters[0].chapterId;
                  navigate(`/ReadPage/${firstChapterId}`, {
                    state: { storyId: book.novelId },
                  });
                } else {
                  console.warn("Truyện này chưa có chương nào!");
                }
                } catch (err) {
                  console.error("Lỗi khi lấy chương đầu tiên:", err);
                }
              }}
              to="#"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#2E5BFF] text-white rounded-lg hover:bg-blue-700
                         dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              <BookOpen className="w-4 h-4" />
              Đọc truyện
            </Link>

            <button
              onClick={handleFollowToggle}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition ${
                isFollowing
                  ? "bg-blue-50 text-[#2E5BFF] border-blue-400 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700"
                  : "text-[#2E5BFF] border-[#2E5BFF] hover:bg-gray-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700"
              }`}
            >
              <Bookmark className="w-4 h-4" />
              {isFollowing ? "Đang theo dõi" : "Theo dõi"}
            </button>

            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#8B3DFF] text-white rounded-lg hover:bg-purple-700
                             dark:bg-purple-600 dark:hover:bg-purple-700">
              <Headphones className="w-4 h-4" />
              Nghe đọc (TTS)
            </button>
          </div>
        </div>

        {/* Content phải */}
        <div className="col-span-8 flex flex-col gap-6">
          {/* Title & Author */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2 dark:text-white">{title}</h1>
            <div className="text-sm font-semibold text-gray-700 mb-3 dark:text-gray-300">
              Tác giả:{" "}
              <span className="text-[#2E5BFF] font-medium dark:text-blue-400">
                {author || "Đang cập nhật"}
              </span>
            </div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Ngày đăng: {new Date(createDate).toLocaleDateString("vi-VN")}
            </div>
          </div>

          {/* Giới thiệu */}
          <div className="mt-6">
            <h2 className="font-bold text-gray-800 mb-2 dark:text-white">Giới thiệu</h2>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm
                          dark:border-gray-700 dark:bg-gray-900">
              <p className="text-gray-600 text-sm leading-relaxed dark:text-gray-300">
                {description || "Chưa có mô tả cho truyện này."}
              </p>
            </div>
          </div>

          {/* 🔹 Chương mới nhất */}
          <div className="mt-37">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">Chương mới nhất</h2>
              <Link
                to={`/ChapterList/${book.novelId}`}
                className="text-sm text-[#2E5BFF] hover:underline flex items-center gap-1
                           dark:text-blue-400"
              >
                Xem mục lục <SquareMenu className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-200
                          dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700">
              {latestChapters.length > 0 ? (
                latestChapters.map((ch) => (
                  <div
                    key={ch.chapterId}
                    className="p-4 flex justify-between items-center hover:bg-gray-100 transition cursor-pointer
                               dark:hover:bg-gray-700"
                    onClick={() =>
                      navigate(`/ReadPage/${ch.chapterId}`, {
                        state: { storyId: book.novelId },
                      })
                    }
                  >
                    <div className="flex items-center gap-2 text-gray-800 text-sm dark:text-gray-100">
                      <BookText className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      {ch.chapterTitle}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(ch.createDate).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-4 text-gray-500 text-sm text-center dark:text-gray-400">
                  Chưa có chương nào được đăng.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}