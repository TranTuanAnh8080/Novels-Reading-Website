import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  PenTool,
  BookOpen,
  RefreshCw,
  ArrowLeft,
  Info,
  Headset,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const UploadItem = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [coverPreview1, setCoverPreview1] = useState(null);
  const [coverPreview2, setCoverPreview2] = useState(null);

  // 🔹 Dữ liệu form
  const [novelTitle, setNovelTitle] = useState("");
  const [novelDescription, setNovelDescription] = useState("");
  const [author, setAuthor] = useState("");

  // 🔹 Hàm gọi API tạo truyện
  const handleCreateNovel = async () => {
    if (!novelTitle || !novelDescription || !author) {
      alert("⚠️ Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("❌ Bạn chưa đăng nhập!");
        return;
      }

      const response = await axios.post(
        "https://be-ink-realm-c7jk.vercel.app/uploader/novel/create",
        {
          novelTitle,
          novelDescription,
          author,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("✅ Truyện được tạo thành công!");
        console.log("Novel created:", response.data);
        // có thể chuyển hướng đến trang upload chương sau khi tạo
        // navigate(`/upload/${response.data.novelId}`);
      }
    } catch (error) {
      console.error("Lỗi khi tạo truyện:", error);
      if (error.response?.status === 400) {
        alert("⚠️ Thiếu dữ liệu hoặc truyện đã tồn tại!");
      } else if (error.response?.status === 401) {
        alert("🚫 Token không hợp lệ hoặc chưa đăng nhập!");
      } else {
        alert("❗ Lỗi server, vui lòng thử lại sau!");
      }
    }
  };

  // xử lý upload ảnh + preview
  const handleImageUpload = (e, setPreview) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const renderUploadBox = (coverPreview, setPreview) => (
    <label className="block">
      {!coverPreview ? (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-sky-400 transition">
          <Upload className="mx-auto mb-2 text-sky-500" size={36} />
          <p className="text-gray-500 text-sm">
            Kéo thả hoặc click để chọn ảnh bìa
          </p>
        </div>
      ) : (
        <div className="relative">
          <img
            src={coverPreview}
            alt="preview"
            className="w-full h-56 object-cover rounded-lg shadow"
          />
          <button
            type="button"
            onClick={() => setPreview(null)}
            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow transition"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleImageUpload(e, setPreview)}
      />
    </label>
  );

  return (
    <div className="min-h-screen flex flex-col font-medium px-6 py-12">
      {/* Nút Trở lại */}
      <div className="max-w-7xl mx-auto w-full px-6 py-4">
        <Link
          to="/UploadPage"
          className="flex items-center gap-2 text-sky-700 font-bold"
        >
          <ArrowLeft size={18} /> Trở lại
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold text-sky-700 mb-3 flex justify-center items-center gap-2">
          Chọn loại truyện bạn muốn đăng
        </h1>
        <p className="text-gray-800 font-medium max-w-2xl mx-auto">
          Hãy chọn loại truyện phù hợp để chúng tôi có thể hỗ trợ bạn tốt nhất
          trong quá trình đăng tải.
        </p>
        <p className="text-sm text-gray-500 mt-2 italic">
          ✨ Tip: Nếu bạn là tác giả, hãy chọn{" "}
          <span className="text-green-600 font-semibold">Truyện sáng tác</span>.
          Nếu bạn dịch từ ngôn ngữ khác, hãy chọn{" "}
          <span className="text-sky-600 font-semibold">Truyện dịch</span>.
        </p>
      </div>

      {/* 2 cột card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Card 1 - Sáng tác */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedType("sangtac")}
          className={`p-8 rounded-3xl shadow-lg border-2 transition-all cursor-pointer flex flex-col justify-between ${
            selectedType === "sangtac"
              ? "border-green-500 bg-gradient-to-br from-green-50 to-green-100"
              : "border-gray-200 bg-white hover:shadow-xl"
          }`}
        >
          <div>
            <div className="flex flex-col items-center mb-6">
              <PenTool className="text-green-600 mb-3" size={42} />
              <h3 className="text-xl font-bold text-gray-800 text-center">
                Truyện sáng tác
              </h3>
            </div>

            <div className="space-y-5">
              {renderUploadBox(coverPreview1, setCoverPreview1)}
              <input
                type="text"
                placeholder="Tên truyện của bạn"
                value={novelTitle}
                onChange={(e) => setNovelTitle(e.target.value)}
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Tên tác giả"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
              <textarea
                rows="4"
                placeholder="Mô tả ngắn gọn..."
                value={novelDescription}
                onChange={(e) => setNovelDescription(e.target.value)}
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleCreateNovel}
            className="mt-5 w-full py-4 rounded-xl bg-green-600 hover:bg-green-700
            text-white font-semibold shadow flex justify-center items-center gap-2 text-md transition"
          >
            <PenTool size={20} /> Đăng truyện sáng tác
          </button>
        </motion.div>

        {/* Card 2 - Dịch */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedType("dich")}
          className={`p-8 rounded-3xl shadow-lg border-2 transition-all cursor-pointer flex flex-col justify-between ${
            selectedType === "dich"
              ? "border-sky-500 bg-gradient-to-br from-sky-50 to-sky-100"
              : "border-gray-200 bg-white hover:shadow-xl"
          }`}
        >
          <div>
            <div className="flex flex-col items-center mb-6">
              <BookOpen className="text-blue-700 mb-3" size={42} />
              <h3 className="text-xl font-bold text-gray-800 text-center">
                Truyện dịch
              </h3>
            </div>

            <div className="space-y-5">
              {renderUploadBox(coverPreview2, setCoverPreview2)}
              <input
                type="text"
                placeholder="Tên truyện tiếng Việt"
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Tên tác giả gốc"
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none"
              />
              <textarea
                rows="4"
                placeholder="Mô tả ngắn gọn..."
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleCreateNovel}
            className="mt-6 w-full py-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold
            shadow flex justify-center items-center gap-2 text-md transition"
          >
            <BookOpen size={20} /> Đăng truyện dịch
          </button>
        </motion.div>
      </div>

      {/* Support Section */}
      <div className="max-w-2xl mx-auto mt-16">
        <div className="p-10 rounded-3xl shadow-lg border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-gray-100 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>

          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-sky-500/10 text-sky-600">💡</div>
          </div>

          <h2 className="text-2xl font-bold text-blue-900 mb-2">
            Cần hỗ trợ?
          </h2>
          <p className="text-gray-600 mb-6 text-xs sm:text-base">
            Nếu gặp khó khăn trong quá trình đăng truyện, đừng lo. Đội ngũ của
            chúng tôi luôn sẵn sàng hỗ trợ bạn.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <button className="px-6 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 transition shadow-sm flex items-center gap-2 text-gray-700 font-medium text-sm">
              <Info size={18} />
              Hướng dẫn
            </button>
            <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:opacity-90 text-white shadow-md transition flex items-center gap-2 font-medium text-sm">
              <Headset size={18} />
              Liên hệ hỗ trợ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadItem;
