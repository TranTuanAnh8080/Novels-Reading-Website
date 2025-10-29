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
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// 🔹 ===================================================================
// 🔹 HÀM GỌI API UPLOAD COVER
// 🔹 ===================================================================
const uploadNovelCoverApi = async (novelId, coverFile, token) => {
  const formData = new FormData();
  formData.append("novelId", novelId);
  formData.append("cover", coverFile);

  try {
    const response = await axios.post(
      "https://be-ink-realm-c7jk.vercel.app/uploader/novel/upload-cover",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // { message, coverUrl }
  } catch (error) {
    console.error("Lỗi khi upload cover:", error.response?.data || error.message);
    throw error.response?.data || new Error("Upload ảnh bìa thất bại");
  }
};

const UploadItem = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [coverPreview1, setCoverPreview1] = useState(null);
  const [coverPreview2, setCoverPreview2] = useState(null);

  // 🔹 State mới để lưu trữ đối tượng File
  const [coverFile1, setCoverFile1] = useState(null);
  const [coverFile2, setCoverFile2] = useState(null);

  // 🔹 Dữ liệu form
  const [novelTitle, setNovelTitle] = useState("");
  const [novelDescription, setNovelDescription] = useState("");
  const [author, setAuthor] = useState("");

  // 🔹 State loading
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // 🔹 Dùng để chuyển hướng

  // 🔹 ===================================================================
  // 🔹 HÀM GỌI API
  // 🔹 ===================================================================
  const handleCreateNovel = async (coverFile) => {
    // 1. Kiểm tra file ảnh trước
    if (!coverFile) {
      alert("⚠️ Vui lòng chọn ảnh bìa!");
      return;
    }

    if (!novelTitle || !novelDescription || !author) {
      alert("⚠️ Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("❌ Bạn chưa đăng nhập!");
      return;
    }

    setIsLoading(true);

    try {
      // --- BƯỚC 1: TẠO TRUYỆN (TEXT DATA) ---
      const createResponse = await axios.post(
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

      // --- BƯỚC 2: UPLOAD COVER (NẾU BƯỚC 1 THÀNH CÔNG) ---
      if (createResponse.status === 200) {
        const novelId = createResponse.data.novelId;
        if (!novelId) {
          alert("❗ Lỗi: Không nhận được novelId từ server.");
          setIsLoading(false);
          return;
        }

        console.log(
          "Tạo truyện thành công, đang upload cover cho novelId:",
          novelId
        );

        try {
          // Gọi API upload cover
          const coverResponse = await uploadNovelCoverApi(
            novelId,
            coverFile,
            token
          );

          alert("✅ Đã tạo truyện và upload ảnh bìa thành công!");
          console.log("Upload cover thành công:", coverResponse.coverUrl);
          setIsLoading(false);

          navigate("/UploadPage"); // Quay về trang Uploader
        } catch (uploadError) {
          // Lỗi ở bước 2 (upload cover)
          console.error("Lỗi khi upload cover:", uploadError);
          alert(
            "✅ Tạo truyện thành công, nhưng upload ảnh bìa thất bại! Vui lòng thử lại ở trang chỉnh sửa."
          );
          setIsLoading(false);
          navigate("/UploadPage"); // Vẫn quay về trang Uploader
        }
      }
    } catch (error) {
      // Lỗi ở bước 1 (tạo truyện)
      console.error("Lỗi khi tạo truyện:", error);
      if (error.response?.status === 400) {
        alert("⚠️ Thiếu dữ liệu hoặc truyện đã tồn tại!");
      } else if (error.response?.status === 401) {
        alert("🚫 Token không hợp lệ hoặc chưa đăng nhập!");
      } else {
        alert("❗ Lỗi server, vui lòng thử lại sau!");
      }
      setIsLoading(false);
    }
  };

  // 🔹 xử lý upload ảnh + preview + lưu file
  const handleImageUpload = (e, setPreview, setFile) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFile(file); // 🔹 Lưu đối tượng File vào state
    }
  };

  // 🔹 Cập nhật renderUploadBox để nhận setFile
  const renderUploadBox = (coverPreview, setPreview, setFile) => (
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
            type="button" // Thêm type để tránh reload
            onClick={(e) => {
              e.stopPropagation(); // Ngăn click vào card
              setPreview(null);
              setFile(null); // 🔹 Reset cả file khi nhấn
            }}
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
        onChange={(e) => handleImageUpload(e, setPreview, setFile)} // 🔹 Truyền setFile
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
              {/* 🔹 Truyền setCoverFile1 vào */}
              {renderUploadBox(coverPreview1, setCoverPreview1, setCoverFile1)}
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
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleCreateNovel(coverFile1); // 🔹 Truyền coverFile1
            }}
            disabled={isLoading} // 🔹 Thêm disabled
            className="mt-5 w-full py-4 rounded-xl bg-green-600 hover:bg-green-700
             text-white font-semibold shadow flex justify-center items-center gap-2 text-md transition
             disabled:bg-gray-400 disabled:cursor-not-allowed" // 🔹 Thêm style disabled
          >
            {isLoading ? (
              "Đang xử lý..."
            ) : (
              <>
                <PenTool size={20} /> Đăng truyện sáng tác
              </>
            )}
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
              {/* 🔹 Truyền setCoverFile2 vào */}
              {renderUploadBox(coverPreview2, setCoverPreview2, setCoverFile2)}
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
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleCreateNovel(coverFile2); // 🔹 Truyền coverFile2
            }}
            disabled={isLoading} // 🔹 Thêm disabled
            className="mt-6 w-full py-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold
             shadow flex justify-center items-center gap-2 text-md transition
             disabled:bg-gray-400 disabled:cursor-not-allowed" // 🔹 Thêm style disabled
          >
            {isLoading ? (
              "Đang xử lý..."
            ) : (
              <>
                <BookOpen size={20} /> Đăng truyện dịch
              </>
            )}
          </button>
        </motion.div>
      </div>

      {/* Support Section */}
      <div className="max-w-2xl mx-auto mt-16">
        <div className="p-10 rounded-3xl shadow-lg border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-gray-100 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>

          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-sky-500/10 text-sky-600">
              💡
            </div>
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