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
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// ✅ TẠO MỘT MAP ĐỂ QUẢN LÝ TRẠNG THÁI
const STATUS_MAP = {
  DRAFT: 2,
  REVIEW: 5,
};

export default function AddChapterPage() {
  const { novelId, chapterId } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(chapterId);

  const [isTranslated, setIsTranslated] = useState(false);
  const [chapterNumber, setChapterNumber] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");

  const [chapterStatusId, setChapterStatusId] = useState(STATUS_MAP.DRAFT);

  const [releaseDate, setReleaseDate] = useState("");
  const [content, setContent] = useState("");
  const [translatedContent, setTranslatedContent] = useState("");
  const [novelTitle, setNovelTitle] = useState("");
  const token = sessionStorage.getItem("token");

  const [isLoadingData, setIsLoadingData] = useState(false); // State loading cho edit mode
  const [isSubmitting, setIsSubmitting] = useState(false); // State loading khi submit

  // 🔹 Load lại dữ liệu từ localStorage (CHỈ KHI THÊM MỚI)
  useEffect(() => {
    // Nếu là edit mode, không load local storage
    if (isEditMode) return;

    const saved = localStorage.getItem("addChapterDraft");
    if (saved) {
      const data = JSON.parse(saved);
      setIsTranslated(data.isTranslated || false);
      setChapterNumber(data.chapterNumber || "");
      setChapterTitle(data.chapterTitle || "");
      setChapterStatusId(data.chapterStatusId || STATUS_MAP.DRAFT);
      setReleaseDate(data.releaseDate || "");
      setContent(data.content || "");
      setTranslatedContent(data.translatedContent || "");
    }
  }, [isEditMode]); // Thêm dependency

  // Fetch thông tin truyện (cho breadcrumb)
  useEffect(() => {
    const fetchNovel = async () => {
      try {
        const response = await axios.post(
          "https://be-ink-realm-c7jk.vercel.app/novel/novelId",
          { novelId: Number(novelId) }
        );
        setNovelTitle(response.data.novelTitle);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin truyện:", error);
      }
    };
    if (novelId) fetchNovel();
  }, [novelId]);

  // useEffect để tải dữ liệu chương KHI Ở CHẾ ĐỘ EDIT
  useEffect(() => {
    if (!isEditMode) return; // Chỉ chạy khi edit

    const fetchChapterData = async () => {
      setIsLoadingData(true);
      try {
        if (!token) {
          alert("Bạn cần đăng nhập để chỉnh sửa.");
          navigate('/LoginPage');
          return;
        }

        // 1. Lấy nội dung text
        const textRes = await axios.get(
          `https://be-ink-realm-c7jk.vercel.app/chapter/text`,
          {
            params: { chapterId: Number(chapterId) },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setContent(textRes.data?.chapterText || "");

        // 2. Lấy thông tin (index, title)
        const listRes = await axios.get(
          `https://be-ink-realm-c7jk.vercel.app/chapter/list/${novelId}`
        );

        if (listRes.data.success) {
          const allChapters = listRes.data.chapters || [];
          const currentChapter = allChapters.find(ch => ch.chapterId === Number(chapterId));
          if (currentChapter) {
            setChapterNumber(currentChapter.chapterIndex.toString());
            setChapterTitle(currentChapter.chapterTitle);
          } else {
            alert("Không tìm thấy thông tin chương.");
            navigate(`/ModerationStatusPage/${novelId}`);
          }
        }
      } catch (err) {
        console.error("Lỗi tải dữ liệu chương:", err);
        if (err.response?.status === 403 || err.response?.status === 401) {
          alert("Bạn không phải uploader hoặc không có quyền sửa chương này.");
        } else if (err.response?.status === 404) {
          alert("Không tìm thấy chương này.");
        } else {
          alert("Lỗi tải dữ liệu. Vui lòng thử lại.");
        }
        navigate(`/ModerationStatusPage/${novelId}`);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchChapterData();
  }, [isEditMode, chapterId, novelId, navigate, token]);

  // 🔹 Lưu bản nháp (Lưu tạm vào trình duyệt)
  const handleSaveDraftLocal = () => {
    const draft = {
      isTranslated,
      chapterNumber,
      chapterTitle,
      chapterStatusId,
      releaseDate,
      content,
      translatedContent,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem("addChapterDraft", JSON.stringify(draft));
    alert("✅ Bản nháp đã được lưu tạm!");
  };

  // 🔹 Xóa bản nháp (Xóa khỏi trình duyệt)
  const handleDeleteDraftLocal = () => {
    if (window.confirm("🗑️ Bạn có chắc muốn xóa bản nháp lưu tạm này không?")) {
      localStorage.removeItem("addChapterDraft");
      setIsTranslated(false);
      setChapterNumber("");
      setChapterTitle("");
      setChapterStatusId(STATUS_MAP.DRAFT);
      setReleaseDate("");
      setContent("");
      setTranslatedContent("");
      alert("🧹 Bản nháp lưu tạm đã được xóa!");
    }
  };

  // ✅ Đổi tên hàm: Xử lý THÊM MỚI chương
  const handleAddNewChapter = async () => {
    if (!chapterNumber || !chapterTitle || !content) {
      alert("⚠️ Vui lòng điền đầy đủ: Số chương, Tiêu đề, và Nội dung!");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "https://be-ink-realm-c7jk.vercel.app/chapter/add",
        {
          novelId: Number(novelId),
          chapterIndex: Number(chapterNumber),
          chapterTitle,
          chapterText: content,
          chapterStatusId: chapterStatusId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        if (chapterStatusId === STATUS_MAP.DRAFT) {
          alert("✅ Đã lưu bản nháp thành công!");
        } else {
          alert("✅ Đã gửi chương đi kiểm duyệt thành công!");
        }
        // Reset form
        setChapterNumber("");
        setChapterTitle("");
        setContent("");
        setChapterStatusId(STATUS_MAP.DRAFT);
        // Chuyển về trang quản lý
        navigate(`/ModerationStatusPage/${novelId}`);
      }
    } catch (error) {
      console.error("Lỗi khi thêm chapter:", error);
      const msg = error?.response?.data?.message || "❌ Lỗi khi thêm chapter. Vui lòng thử lại!";
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Xử lý CẬP NHẬT nội dung chương (cho chế độ Edit)
  const handleUpdateChapter = async () => {
    if (!content) {
      alert("⚠️ Vui lòng điền nội dung chương!");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.put(
        `https://be-ink-realm-c7jk.vercel.app/chapter/${chapterId}/text/update`,
        { chapterText: content }, // API chỉ nhận chapterText
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("✅ " + (res.data.message || "Cập nhật thành công!"));
      navigate(`/ModerationStatusPage/${novelId}`);

    } catch (error) {
      console.error("❌ Lỗi cập nhật:", error.response)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/HomeLoggedIn" className="flex items-center space-x-2">
            <img src={logo} alt="InkRealm" className="h-10 w-auto" />
          </Link>
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
        <Link to="/Profile" className="hover:text-blue-600 hover:underline">
          Trang cá nhân
        </Link>
        <span className="mx-2">›</span>
        <Link to="/UploadPage" className="hover:text-blue-600 hover:underline">
          Đăng truyện
        </Link>
        <span className="mx-2">›</span>
        <Link
          to={`/ModerationStatusPage/${novelId}`}
          className="font-medium text-gray-800 hover:text-blue-600 hover:underline"
        >
          {novelTitle || "..."}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900 font-medium">
          {isEditMode ? "Chỉnh sửa chương" : "Thêm chương mới"}
        </span>
      </div>

      {isLoadingData ? (
        <div className="text-center py-20 text-gray-500">
          Đang tải dữ liệu chương, vui lòng chờ...
        </div>
      ) : (
        <main className="flex-grow">
          <div className="max-w-5xl mx-auto bg-white rounded-lg border border-gray-200 shadow-sm p-8 mb-16">
            <h1 className="text-2xl font-bold mb-2">
              {isEditMode ? "Chỉnh sửa chương" : "Thêm chương mới"}
            </h1>
            <p className="text-gray-600 mb-8">
              {isEditMode
                ? `Chỉnh sửa nội dung cho truyện "${novelTitle || "..."}"`
                : `Thêm chương mới cho truyện “${novelTitle || "..."}”`
              }
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
                    disabled={isEditMode}
                    readOnly={isEditMode}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                    disabled={isEditMode}
                    readOnly={isEditMode}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                {!isEditMode && (
                  <>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <FileText className="w-4 h-4 text-gray-700" />
                        Hành động
                      </label>
                      <select
                        value={chapterStatusId}
                        onChange={(e) => setChapterStatusId(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                      >
                        <option value={STATUS_MAP.DRAFT}>Lưu bản nháp</option>
                        <option value={STATUS_MAP.REVIEW}>Gửi kiểm duyệt</option>
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
                  </>
                )}
              </div>

              {!isEditMode && (
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
              )}
            </section>

            {/* --- Nội dung chương --- */}
            <section className="border border-gray-200 rounded-lg p-6">
              <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-6">
                <FileText className="w-5 h-5 text-gray-900" />
                Nội dung chương
              </h2>

              {isEditMode ? (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={15}
                  placeholder="Nhập nội dung chương..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />
              ) : (
                isTranslated ? (
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
                    rows={15}
                    placeholder="Nhập nội dung chương..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  />
                )
              )}
            </section>

            {/* --- Buttons --- */}
            <div className="flex justify-end gap-4 mt-6 flex-wrap">
              {!isEditMode && (
                <>
                  <button
                    onClick={handleDeleteDraftLocal}
                    className="flex items-center gap-2 px-6 py-2.5 text-red-600 bg-white border border-red-300 rounded-lg hover:bg-red-50 font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Xóa bản nháp
                  </button>
                  <button
                    onClick={handleSaveDraftLocal}
                    className="flex items-center gap-2 px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    <Save className="w-4 h-4" />
                    Lưu tạm bản nháp
                  </button>
                </>
              )}

              {/* ✅ Hiển thị nút bấm tùy theo chế độ */}
              {isEditMode ? (
                <button
                  onClick={handleUpdateChapter}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium disabled:bg-blue-300"
                >
                  <Save className="w-4 h-4" />
                  {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
              ) : (
                <button
                  onClick={handleAddNewChapter}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium disabled:bg-blue-300"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting
                    ? "Đang gửi..."
                    : chapterStatusId === STATUS_MAP.DRAFT
                      ? "Lưu bản nháp"
                      : "Gửi kiểm duyệt"
                  }
                </button>
              )}
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
} 