import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  Search,
  Filter,
  BookOpen,
  User,
  Clock,
  LogOut,
} from "lucide-react";
import logo from "../assets/inkrealm_logo.png";
import Footer from "../components/SharedComponents/Footer";
import defaultCover from "../assets/book-cover-blank.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ChapterList() {
  const navigate = useNavigate();
  const { id } = useParams();

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

        // ✅ Lấy thông tin truyện
        const novelRes = await axios.post(
          "https://be-ink-realm-c7jk.vercel.app/novel/novelId",
          { storyId: Number(id) }
        );

        // ✅ Lấy danh sách chương
        const chapterRes = await axios.get(
          "https://be-ink-realm-c7jk.vercel.app/chapter/list",
          { params: { novelId: Number(id) } }
        );

        setNovel(novelRes.data);
        setChapters(chapterRes.data);
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
    <div className="bg-[#F9FAFB] min-h-screen">
        {/* Header */}
        <header className="w-full bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                <ChevronLeft className="w-5 h-5" /> <span className="text-sm">Quay lại</span>
              </button>
              <img src={logo} alt="InkRealm" className="h-8 object-contain cursor-pointer" onClick={() => navigate(isLoggedIn ? "/HomeLoggedIn" : "/HomePage")} />
            </div>
            <div className="relative w-80">
              <input type="text" placeholder="Tìm truyện..." className="w-full border border-gray-300 rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" />
            </div>
            <div className="flex items-center space-x-6">
              {!isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/LoginPage"
                    className="flex items-center bg-[#2E5BFF] hover:bg-indigo-600 
                              text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-sm"
                  >
                    <i className="fas fa-sign-in-alt mr-2"></i>
                    Đăng nhập
                  </Link>

                  <Link
                    to="/RegisterPage"
                    className="flex items-center bg-[#2E5BFF] hover:bg-indigo-600 
                              text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-sm"
                  >
                    <i className="fas fa-user-plus mr-2"></i>
                    Đăng ký
                  </Link>
                </div>
              ) : (
                <>
                  <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="user avatar" className="w-9 h-9 rounded-full border cursor-pointer hover:opacity-80" onClick={() => navigate("/Profile")} />
                  <button onClick={() => { sessionStorage.removeItem("isLoggedIn"); window.location.href = "/HomePage"; }} className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm font-medium">
                    <LogOut className="w-4 h-4 mr-1" /> <span>Đăng xuất</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </header>

      <main className="py-6 max-w-5xl mx-auto">
        {/* Loading + Error */}
        {loading && <p className="text-center text-gray-600">Đang tải...</p>}
        {error && (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        )}

        {/* Book info */}
        {novel && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
            <div className="flex gap-4 items-start">
              <img
                src={novel.coverImage || defaultCover}
                alt={novel.novelTitle || "Book cover"}
                className="w-24 h-32 object-cover rounded-md shadow"
              />
              <div className="flex flex-col gap-1">
                <h1 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  Mục lục - {novel.novelTitle || "Đang tải..."}
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 text-xs font-medium rounded-full">
                    Truyện dịch
                  </span>
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4 text-[#2E5BFF]" />
                    <span className="font-medium text-gray-500">
                      {chapters.length} chương
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4 text-[#2E5BFF]" />
                    <span className="font-medium text-gray-500">
                      {novel.author || "Không rõ"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#2E5BFF]" />
                    <span className="font-medium text-gray-500">
                      Cập nhật: {novel.updatedAt || "Không rõ"}
                    </span>
                  </div>
                </div>

                <p className="text-gray-500 text-sm mt-3 line-clamp-1">
                  {novel.description ||
                    "Truyện chưa có mô tả..."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Danh sách chương */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-4">
          <div className="flex justify-between items-center p-4">
            <h2 className="font-bold text-gray-800">
              Danh sách chương{" "}
              <span className="font-medium text-gray-500">
                ({chapters.length} chương)
              </span>
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sắp xếp:</span>
              <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                <option>Tăng dần</option>
                <option>Giảm dần</option>
              </select>
              <button className="flex items-center gap-1 text-sm bg-[#2E5BFF] text-white px-3 py-1.5 rounded-md hover:bg-indigo-600">
                <Filter className="w-4 h-4" />
                Lọc
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 font-medium w-20">Chương</th>
                  <th className="px-4 py-3 font-medium">Tiêu đề</th>
                  <th className="px-4 py-3 font-medium w-40">Người đăng</th>
                  <th className="px-4 py-3 font-medium w-40">Thời gian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {chapters.length > 0 ? (
                  chapters.map((chapter, index) => (
                    <tr key={chapter.id || index} className="hover:bg-gray-50
                    cursor-pointer" onClick={() => navigate(`/ReadPage/${chapter.chapterId}`, { state: { storyId: novel?.novelId } })}>
                      <td className="px-4 py-3 text-[#2E5BFF] font-medium">
                        {chapter.chapterNumber || index + 1}
                      </td>
                      <td className="px-4 py-3 text-gray-800 font-semibold">
                        {chapter.chapterTitle || "Chưa có tiêu đề"}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {chapter.uploader || "TransTeam"}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {chapter.createdAt
                          ? new Date(chapter.createdAt).toLocaleDateString()
                          : "Không rõ"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-6 text-gray-500 italic"
                    >
                      Không có chương nào để hiển thị.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center px-4 py-3 text-sm text-gray-700 border-t border-gray-200">
            <span>Hiển thị {chapters.length} chương</span>
            <div className="flex gap-1">
              <button className="px-2 py-1 border rounded-md hover:bg-gray-100">
                {"<"}
              </button>
              <button className="px-2 py-1 border rounded-md hover:bg-gray-100">
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
  