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
    coverImage,
  } = book || {};

  // 🔹 Check xem truyện này có đang được theo dõi không
  useEffect(() => {
    const followed = JSON.parse(localStorage.getItem("followedBooks") || "[]");
    const exists = followed.some((b) => b.id === book.novelId);
    setIsFollowing(exists);
  }, [book]);

  // 🔹 Toggle theo dõi / bỏ theo dõi
  const handleFollowToggle = () => {
    const saved = JSON.parse(localStorage.getItem("followedBooks") || "[]");
    let updated;

    if (isFollowing) {
      // Bỏ theo dõi
      updated = saved.filter((b) => b.id !== book.novelId);
    } else {
      // Theo dõi
      updated = [
        ...saved,
        {
          id: book.novelId,
          title: title,
          image: coverImage || defaultCover,
          status: "Chưa đọc",
        },
      ];
    }

    localStorage.setItem("followedBooks", JSON.stringify(updated));
    setIsFollowing(!isFollowing);
    window.dispatchEvent(new Event("storage")); // 🔄 Cập nhật LibraryPage realtime
  };

  // 🔹 Gọi API lấy 3 chương mới nhất
  useEffect(() => {
    if (!book?.novelId) return;

    const fetchChapters = async () => {
      try {
        const res = await axios.get(
          "https://be-ink-realm-c7jk.vercel.app/chapter/list",
          { params: { novelId: book.novelId } }
        );

        if (Array.isArray(res.data)) {
          const sorted = res.data
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link
          to={isLoggedIn ? "/HomeLoggedIn" : "/HomePage"}
          className="hover:underline text-gray-900"
        >
          Trang chủ
        </Link>{" "}
        / Truyện dịch /{" "}
        <span className="text-gray-900 font-medium">{title}</span>
      </div>

      {/* Layout 2 cột */}
      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar trái */}
        <div className="col-span-4">
          <div className="w-full aspect-[3/4] bg-gray-100 rounded-lg shadow-md mb-4 flex items-center justify-center text-gray-400 text-sm">
            <img
              src={coverImage && coverImage.trim() !== "" ? coverImage : defaultCover}
              alt={title || "Bìa truyện"}
              className="w-48 h-64 object-cover rounded-md shadow"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 mb-4">
            <Link
              onClick={async (e) => {
                e.preventDefault();
                try {
                  const res = await axios.get(
                    "https://be-ink-realm-c7jk.vercel.app/chapter/list",
                    { params: { novelId: book.novelId } }
                  );
                  if (res.data && res.data.length > 0) {
                    const firstChapterId = res.data[0].chapterId;
                    navigate(`/ReadPage/${firstChapterId}`, {
                      state: { storyId: book.novelId },
                    });
                  } else {
                    alert("Truyện này chưa có chương nào!");
                  }
                } catch (err) {
                  console.error("Lỗi khi lấy chương đầu tiên:", err);
                  alert("Không thể tải chương đầu tiên.");
                }
              }}
              to="#"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#2E5BFF] text-white rounded-lg hover:bg-blue-700"
            >
              <BookOpen className="w-4 h-4" />
              Đọc truyện
            </Link>

            <button
              onClick={handleFollowToggle}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition ${
                isFollowing
                  ? "bg-blue-50 text-[#2E5BFF] border-blue-400"
                  : "text-[#2E5BFF] border-[#2E5BFF] hover:bg-gray-50"
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
        </div>

        {/* Content phải */}
        <div className="col-span-8 flex flex-col gap-6">
          {/* Title & Author */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
            <div className="text-sm font-semibold text-gray-700 mb-3">
              Tác giả:{" "}
              <span className="text-[#2E5BFF] font-medium">
                {author || "Đang cập nhật"}
              </span>
            </div>
            <div className="text-sm font-medium text-gray-500">
              Ngày đăng: {new Date(createDate).toLocaleDateString("vi-VN")}
            </div>
          </div>

          {/* Giới thiệu */}
          <div className="mt-6">
            <h2 className="font-bold text-gray-800 mb-2">Giới thiệu</h2>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm">
              <p className="text-gray-600 text-sm leading-relaxed">
                {description || "Chưa có mô tả cho truyện này."}
              </p>
            </div>
          </div>

          {/* 🔹 Chương mới nhất */}
          <div className="mt-37">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Chương mới nhất</h2>
              <Link
                to={`/ChapterList/${book.novelId}`}
                className="text-sm text-[#2E5BFF] hover:underline flex items-center gap-1"
              >
                Xem mục lục <SquareMenu className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-200">
              {latestChapters.length > 0 ? (
                latestChapters.map((ch) => (
                  <div
                    key={ch.chapterId}
                    className="p-4 flex justify-between items-center hover:bg-gray-100 transition cursor-pointer"
                    onClick={() =>
                      navigate(`/ReadPage/${ch.chapterId}`, {
                        state: { storyId: book.novelId },
                      })
                    }
                  >
                    <div className="flex items-center gap-2 text-gray-800 text-sm">
                      <BookText className="w-4 h-4 text-gray-500" />
                      {ch.chapterTitle}
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(ch.createDate).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-4 text-gray-500 text-sm text-center">
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
