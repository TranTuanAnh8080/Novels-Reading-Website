import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  Search,
  Filter,
  BookOpen,
  User,
  Clock,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import logo from "../assets/inkrealm_logo.png";
import Footer from "../components/SharedComponents/Footer";
import defaultCover from "../assets/book-cover-blank.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../components/SharedComponents/ThemeContext";

export default function ChapterList() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { theme, toggleTheme } = useTheme();

  const [novel, setNovel] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const novelRes = await axios.post(
          "https://be-ink-realm-c7jk.vercel.app/novel/novelId",
          { novelId: Number(id) }
        );

        const chapterRes = await axios.get(
          `https://be-ink-realm-c7jk.vercel.app/chapter/list/${Number(id)}`
        );

        setNovel(novelRes.data);
        setChapters(chapterRes.data.chapters || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Lỗi khi tải danh sách chương!");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  return (
    <div className="bg-[#F9FAFB] min-h-screen dark:bg-gray-900">
      <header className="bg-white text-gray-900 border-b border-gray-200 shadow-md sticky top-0 z-50
                           dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 dark:text-white dark:border-gray-800 dark:shadow-lg">
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between gap-6">
          {/* LOGO */}
          <div className="flex items-center space-x-3">
            <Link
              to={isLoggedIn ? "/HomeLoggedIn" : "/HomePage"}
              className="flex items-center space-x-2 group"
            >
              <span className="text-2xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                INKREALM
              </span>
            </Link>
          </div>

          {/* NAVIGATION */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium flex-1 justify-center">
            <Link
              to={isLoggedIn ? "/HomeLoggedIn" : "/HomePage"}
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
            >
              Trang chủ
            </Link>
            <Link to="/the-loai" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              Thể loại
            </Link>
            <Link to="/xep-hang" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              Xếp hạng
            </Link>
            <Link
              to="/moi-cap-nhat"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
            >
              Mới cập nhật
            </Link>
            <Link to="/sang-tac" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              Sáng tác
            </Link>
          </nav>

          {/* SEARCH + USER */}
          <div className="flex items-center gap-4">
            {/* Search box */}
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm truyện..."
                className="rounded-full bg-gray-100 border border-gray-300 pl-4 pr-10 py-1.5 
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                                 placeholder-gray-500 text-sm w-56
                                 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {/* USER AREA */}
            {!isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link to="/LoginPage">
                  <button className="px-4 py-1.5 text-sm rounded-full border border-gray-300 hover:bg-gray-100 transition
                                           dark:border-gray-700 dark:hover:bg-gray-800">
                    Đăng nhập
                  </button>
                </Link>
                <Link to="/RegisterPage">
                  <button className="px-4 py-1.5 text-sm rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:brightness-110 transition">
                    Đăng ký
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/Profile">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="user avatar"
                    className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-700 cursor-pointer hover:opacity-90 transition"
                  />
                </Link>
                <button
                  onClick={() => {
                    sessionStorage.clear();
                    window.dispatchEvent(new Event("loginStateChanged"));
                    window.location.href = "/HomePage";
                  }}
                  className="flex items-center gap-1 text-red-500 hover:text-red-600 dark:hover:text-red-400 text-sm font-medium transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="py-6 max-w-5xl mx-auto">
        {/* Loading + Error */}
        {loading && <p className="text-center text-gray-600 dark:text-gray-300">Đang tải...</p>}
        {error && (
          <p className="text-center text-red-500 font-semibold dark:text-red-400">{error}</p>
        )}

        {/* Book info */}
        {novel && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm
                        dark:bg-gray-800 dark:border-gray-700">
            <div className="flex gap-4 items-start">
              <img
                src={novel.novel_img_url || defaultCover}
                alt={novel.novelTitle || "Book cover"}
                className="w-24 h-32 object-cover rounded-md shadow dark:border dark:border-gray-700"
              />
              <div className="flex flex-col gap-1">
                <h1 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2 dark:text-white">
                  Mục lục - {novel.novelTitle || "Đang tải..."}
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 text-xs font-medium rounded-full
                                   dark:bg-green-900 dark:text-green-300">
                    Truyện dịch
                  </span>
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4 text-[#2E5BFF] dark:text-blue-400" />
                    <span className="font-medium text-gray-500 dark:text-gray-400">
                      {chapters.length} chương
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4 text-[#2E5BFF] dark:text-blue-400" />
                    <span className="font-medium text-gray-500 dark:text-gray-400">
                      {novel.author || "Không rõ"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#2E5BFF] dark:text-blue-400" />
                    <span className="font-medium text-gray-500 dark:text-gray-400">
                      Cập nhật: {novel.createDate || "Không rõ"}
                    </span>
                  </div>
                </div>

                <p className="text-gray-500 text-sm mt-3 line-clamp-1 dark:text-gray-400">
                  {novel.description ||
                    "Truyện chưa có mô tả..."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Danh sách chương */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-4
                      dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-between items-center p-4">
            <h2 className="font-bold text-gray-800 dark:text-white">
              Danh sách chương{" "}
              <span className="font-medium text-gray-500 dark:text-gray-400">
                ({chapters.length} chương)
              </span>
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">Sắp xếp:</span>
              <select className="text-sm border border-gray-300 rounded-md px-2 py-1
                               dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option>Tăng dần</option>
                <option>Giảm dần</option>
              </select>
              <button className="flex items-center gap-1 text-sm bg-[#2E5BFF] text-white px-3 py-1.5 rounded-md hover:bg-indigo-600
                                 dark:bg-blue-500 dark:hover:bg-blue-600">
                <Filter className="w-4 h-4" />
                Lọc
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm
                      dark:bg-gray-800 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 border-b border-gray-200
                              dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
                <tr>
                  <th className="px-4 py-3 font-medium w-20">Chương</th>
                  <th className="px-4 py-3 font-medium">Tiêu đề</th>
                  <th className="px-4 py-3 font-medium w-40">Người đăng</th>
                  <th className="px-4 py-3 font-medium w-40">Thời gian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {chapters.length > 0 ? (
                  chapters.map((chapter, index) => (
                    <tr key={chapter.id || index} className="hover:bg-gray-50
                      cursor-pointer dark:hover:bg-gray-700"
                      onClick={() => navigate(`/ReadPage/${chapter.chapterId}`, { state: { storyId: novel?.novelId } })}>
                      <td className="px-4 py-3 text-[#2E5BFF] font-medium dark:text-blue-400">
                        {chapter.chapterIndex || index + 1}
                      </td>
                      <td className="px-4 py-3 text-gray-800 font-semibold dark:text-white">
                        {chapter.chapterTitle || "Chưa có tiêu đề"}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {chapter.uploader || "TransTeam"}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {chapter.createDate
                          ? new Date(chapter.createDate).toLocaleDateString()
                          : "Không rõ"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-6 text-gray-500 italic dark:text-gray-400"
                    >
                      Không có chương nào để hiển thị.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center px-4 py-3 text-sm text-gray-700 border-t border-gray-200
                          dark:text-gray-300 dark:border-gray-700">
            <span>Hiển thị {chapters.length} chương</span>
            <div className="flex gap-1">
              <button className="px-2 py-1 border rounded-md hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
                {"<"}
              </button>
              <button className="px-2 py-1 border rounded-md hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
                {">"}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}