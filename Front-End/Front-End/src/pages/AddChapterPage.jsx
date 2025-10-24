import React, { useState, useEffect } from "react";
import {
  Calendar,
  Hash,
  Type,
  FileText,
  Clock,
  Save,
  Send,
  Trash2,
} from "lucide-react";
import Footer from "../components/SharedComponents/Footer";
import logo from "../assets/inkrealm_logo.png";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function AddChapterPage() {
  const [isTranslated, setIsTranslated] = useState(false);
  const [chapterNumber, setChapterNumber] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterStatus, setChapterStatus] = useState("Bản nháp");
  const [releaseDate, setReleaseDate] = useState("");
  const [content, setContent] = useState("");
  const [translatedContent, setTranslatedContent] = useState("");
  const { novelId } = useParams(); // Lấy novelId từ URL
  const [novelTitle, setNovelTitle] = useState("");
  const token = sessionStorage.getItem("token");

  // 🔹 Load lại dữ liệu từ localStorage khi mở trang
  useEffect(() => {
    const saved = localStorage.getItem("addChapterDraft");
    if (saved) {
      const data = JSON.parse(saved);
      setIsTranslated(data.isTranslated || false);
      setChapterNumber(data.chapterNumber || "");
      setChapterTitle(data.chapterTitle || "");
      setChapterStatus(data.chapterStatus || "Bản nháp");
      setReleaseDate(data.releaseDate || "");
      setContent(data.content || "");
      setTranslatedContent(data.translatedContent || "");
    }
  }, []);

  // Fetch thông tin truyện từ API dựa trên novelId
  useEffect(() => {
    const fetchNovel = async () => {
      try {
        const response = await axios.post(
          "https://be-ink-realm-c7jk.vercel.app/novel/novelId",
          { novelId: Number(novelId) } // gửi storyId trong body
        );
        setNovelTitle(response.data.novelTitle);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin truyện:", error);
      }
    };
    if (novelId) fetchNovel();
  }, [novelId]);

  // 🔹 Lưu bản nháp
  const handleSaveDraft = () => {
    const draft = {
      isTranslated,
      chapterNumber,
      chapterTitle,
      chapterStatus,
      releaseDate,
      content,
      translatedContent,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem("addChapterDraft", JSON.stringify(draft));
    alert("✅ Bản nháp đã được lưu tạm!");
  };

  // 🔹 Xóa bản nháp
  const handleDeleteDraft = () => {
    if (confirm("🗑️ Bạn có chắc muốn xóa bản nháp này không?")) {
      localStorage.removeItem("addChapterDraft");
      setIsTranslated(false);
      setChapterNumber("");
      setChapterTitle("");
      setChapterStatus("Bản nháp");
      setReleaseDate("");
      setContent("");
      setTranslatedContent("");
      alert("🧹 Bản nháp đã được xóa!");
    }
  };

  const handleAddChapter = async () => {
  if (!chapterNumber || !chapterTitle || !content) {
    alert("⚠️ Vui lòng điền đầy đủ thông tin chương!");
    return;
  }

  try {
      const response = await axios.post(
        "https://be-ink-realm-c7jk.vercel.app/chapter/add",
        {
          novelId: Number(novelId),
          chapterIndex: Number(chapterNumber),
          chapterTitle, 
          chapterText: content
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("✅ Chapter mới được tạo thành công!");
        // Reset form
        setChapterNumber("");
        setChapterTitle("");
        setContent("");
      }
    } catch (error) {
      console.error("Lỗi khi thêm chapter:", error);
      alert("❌ Lỗi khi thêm chapter. Vui lòng thử lại!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          {/* Logo */}
        <Link to="/HomeLoggedIn" className="flex items-center space-x-2">
          <img src={logo} alt="InkRealm" className="h-10 w-auto" />
        </Link>

          {/* User */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Tác giả</span>
            <Link to="/Profile" className="flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="User Avatar"
              className="w-9 h-9 rounded-full border border-gray-200"
            />
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto w-full px-6 py-6 text-sm text-gray-500">
        <span>Trang cá nhân</span> <span className="mx-1">›</span>
        <span>Đăng truyện</span> <span className="mx-1">›</span>
        <span>Quỷ Bí Chi Chủ</span> <span className="mx-1">›</span>
        <span className="text-gray-900 font-medium">Thêm chương mới</span>
      </div>

      {/* Main */}
      <main className="flex-grow">
        <div className="max-w-5xl mx-auto bg-white rounded-lg border border-gray-200 shadow-sm p-8 mb-16">
          <h1 className="text-2xl font-bold mb-2">Thêm chương mới</h1>
          <p className="text-gray-600 mb-8">
            Thêm chương mới cho truyện <strong>“{novelTitle || "..." }”</strong>
          </p>

          {/* --- Thông tin chương --- */}
          <section className="border border-gray-200 rounded-lg p-6 mb-6">
            <h2 className="text-base font-semibold text-gray-900 mb-6">
              Thông tin chương
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Số chương */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Hash className="w-4 h-4 text-gray-700" />
                  Số chương
                </label>
                <input
                  type="text"
                  value={chapterNumber}
                  onChange={(e) => setChapterNumber(e.target.value)}
                  placeholder="Ví dụ: 12"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Tiêu đề chương */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Type className="w-4 h-4 text-gray-700" />
                  Tiêu đề chương
                </label>
                <input
                  type="text"
                  value={chapterTitle}
                  onChange={(e) => setChapterTitle(e.target.value)}
                  placeholder="Ví dụ: Khúc dạo đầu mới"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Trạng thái */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FileText className="w-4 h-4 text-gray-700" />
                  Trạng thái
                </label>
                <select
                  value={chapterStatus}
                  onChange={(e) => setChapterStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                >
                  <option>Bản nháp</option>
                  <option>Đang kiểm duyệt</option>
                  <option>Đã duyệt</option>
                </select>
              </div>

              {/* Thời gian đăng */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 text-gray-700" />
                  Thời gian đăng (tùy chọn)
                </label>
                <div className="relative">
                  <input
                    type="datetime-local"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
                  />
                  <Calendar className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isTranslated}
                  onChange={(e) => setIsTranslated(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 font-medium">
                  Là truyện dịch
                </span>
              </label>
            </div>
          </section>

          {/* --- Nội dung chương --- */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-6">
              <FileText className="w-5 h-5 text-gray-900" />
              Nội dung chương
            </h2>

            {isTranslated ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Nhập nội dung cần dịch
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={12}
                    placeholder="Nhập nội dung cần dịch..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Nội dung đã được dịch
                  </label>
                  <textarea
                    value={translatedContent}
                    onChange={(e) => setTranslatedContent(e.target.value)}
                    rows={12}
                    placeholder="Nhập nội dung bản dịch..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  />
                </div>
              </div>
            ) : (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                placeholder="Nhập nội dung chương..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              />
            )}
          </section>

          {/* --- Buttons --- */}
          <div className="flex justify-end gap-4 mt-6 flex-wrap">
            <button
              onClick={handleDeleteDraft}
              className="flex items-center gap-2 px-6 py-2.5 text-red-600 bg-white border border-red-300 rounded-lg hover:bg-red-50 font-medium"
            >
              <Trash2 className="w-4 h-4" />
              Xóa bản nháp
            </button>
            <button
              onClick={handleSaveDraft}
              className="flex items-center gap-2 px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
              <Save className="w-4 h-4" />
              Lưu bản nháp
            </button>
            <button
              onClick={handleAddChapter}
              className="flex items-center gap-2 px-6 py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium"
            >
              <Send className="w-4 h-4" />
              Gửi kiểm duyệt
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
