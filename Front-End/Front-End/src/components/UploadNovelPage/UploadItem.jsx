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
    return response.data;
  } catch (error) {
    console.error("Lỗi khi upload cover:", error.response?.data || error.message);
    throw error.response?.data || new Error("Upload ảnh bìa thất bại");
  }
};

const UploadItem = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [coverPreview1, setCoverPreview1] = useState(null);
  const [coverPreview2, setCoverPreview2] = useState(null);

  const [coverFile1, setCoverFile1] = useState(null);
  const [coverFile2, setCoverFile2] = useState(null);

  const [novelTitle, setNovelTitle] = useState("");
  const [novelDescription, setNovelDescription] = useState("");
  const [author, setAuthor] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateNovel = async (coverFile) => {
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
          const coverResponse = await uploadNovelCoverApi(
            novelId,
            coverFile,
            token
          );

          alert("✅ Đã tạo truyện và upload ảnh bìa thành công!");
          console.log("Upload cover thành công:", coverResponse.coverUrl);
          setIsLoading(false);

          navigate("/UploadPage");
        } catch (uploadError) {
          console.error("Lỗi khi upload cover:", uploadError);
          alert(
            "✅ Tạo truyện thành công, nhưng upload ảnh bìa thất bại! Vui lòng thử lại ở trang chỉnh sửa."
          );
          setIsLoading(false);
          navigate("/UploadPage");
        }
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
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e, setPreview, setFile) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const renderUploadBox = (coverPreview, setPreview, setFile) => (
    <label className="block">
      {!coverPreview ? (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-sky-400 transition
                      dark:border-gray-600 dark:hover:border-sky-500">
          <Upload className="mx-auto mb-2 text-sky-500" size={36} />
          <p className="text-gray-500 text-sm dark:text-gray-400">
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
            onClick={(e) => {
              e.stopPropagation();
              setPreview(null);
              setFile(null);
            }}
            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow transition
                       dark:bg-gray-900/80 dark:hover:bg-gray-900 dark:text-gray-200"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleImageUpload(e, setPreview, setFile)}
      />
    </label>
  );

  return (
    <div className="min-h-screen flex flex-col font-medium px-6 py-12">
      {/* Nút Trở lại */}
      <div className="max-w-7xl mx-auto w-full px-6 py-4">
        <Link
          to="/UploadPage"
          className="flex items-center gap-2 text-sky-700 font-bold dark:text-sky-400"
        >
          <ArrowLeft size={18} /> Trở lại
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold text-sky-700 mb-3 flex justify-center items-center gap-2 dark:text-sky-400">
          Chọn loại truyện bạn muốn đăng
        </h1>
        <p className="text-gray-800 font-medium max-w-2xl mx-auto dark:text-gray-200">
          Hãy chọn loại truyện phù hợp để chúng tôi có thể hỗ trợ bạn tốt nhất
          trong quá trình đăng tải.
        </p>
        <p className="text-sm text-gray-500 mt-2 italic dark:text-gray-400">
          ✨ Tip: Nếu bạn là tác giả, hãy chọn{" "}
          <span className="text-green-600 font-semibold dark:text-green-400">Truyện sáng tác</span>.
          Nếu bạn dịch từ ngôn ngữ khác, hãy chọn{" "}
          <span className="text-sky-600 font-semibold dark:text-sky-400">Truyện dịch</span>.
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
              ? "border-green-500 bg-gradient-to-br from-green-50 to-green-100 dark:bg-gradient-to-br dark:from-gray-800 dark:to-green-900/50"
              : "border-gray-200 bg-white hover:shadow-xl dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600"
          }`}
        >
          <div>
            <div className="flex flex-col items-center mb-6">
              <PenTool className="text-green-600 mb-3 dark:text-green-400" size={42} />
              <h3 className="text-xl font-bold text-gray-800 text-center dark:text-white">
                Truyện sáng tác
              </h3>
            </div>

            <div className="space-y-5">
              {renderUploadBox(coverPreview1, setCoverPreview1, setCoverFile1)}
              <input
                type="text"
                placeholder="Tên truyện của bạn"
                value={novelTitle}
                onChange={(e) => setNovelTitle(e.target.value)}
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none
                           dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              />
              <input
                type="text"
                placeholder="Tên tác giả"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none
                           dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              />
              <textarea
                rows="4"
                placeholder="Mô tả ngắn gọn..."
                value={novelDescription}
                onChange={(e) => setNovelDescription(e.target.value)}
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none
                           dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleCreateNovel(coverFile1);
            }}
            disabled={isLoading}
            className="mt-5 w-full py-4 rounded-xl bg-green-600 hover:bg-green-700
             text-white font-semibold shadow flex justify-center items-center gap-2 text-md transition
             disabled:bg-gray-400 disabled:cursor-not-allowed dark:disabled:bg-gray-600"
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
              ? "border-sky-500 bg-gradient-to-br from-sky-50 to-sky-100 dark:bg-gradient-to-br dark:from-gray-800 dark:to-sky-900/50"
              : "border-gray-200 bg-white hover:shadow-xl dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600"
          }`}
        >
          <div>
            <div className="flex flex-col items-center mb-6">
              <BookOpen className="text-blue-700 mb-3 dark:text-blue-400" size={42} />
              <h3 className="text-xl font-bold text-gray-800 text-center dark:text-white">
                Truyện dịch
              </h3>
            </div>

            <div className="space-y-5">
              {renderUploadBox(coverPreview2, setCoverPreview2, setCoverFile2)}
              <input
                type="text"
                placeholder="Tên truyện tiếng Việt"
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none
                           dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              />
              <input
                type="text"
                placeholder="Tên tác giả gốc"
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none
                           dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              />
              <textarea
                rows="4"
                placeholder="Mô tả ngắn gọn..."
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none
                           dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleCreateNovel(coverFile2);
            }}
            disabled={isLoading}
            className="mt-6 w-full py-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold
             shadow flex justify-center items-center gap-2 text-md transition
             disabled:bg-gray-400 disabled:cursor-not-allowed dark:disabled:bg-gray-600"
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
        <div className="p-10 rounded-3xl shadow-lg border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-gray-100 text-center relative overflow-hidden
                      dark:border-gray-700 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-800 dark:to-gray-800/50">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-100 rounded-full blur-3xl opacity-50 dark:bg-sky-900/50"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-100 rounded-full blur-3xl opacity-50 dark:bg-indigo-900/50"></div>

          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-sky-500/10 text-sky-600
                          dark:bg-sky-500/20 dark:text-sky-400">
              💡
            </div>
          </div>

          <h2 className="text-2xl font-bold text-blue-900 mb-2 dark:text-blue-200">
            Cần hỗ trợ?
          </h2>
          <p className="text-gray-600 mb-6 text-xs sm:text-base dark:text-gray-300">
            Nếu gặp khó khăn trong quá trình đăng truyện, đừng lo. Đội ngũ của
            chúng tôi luôn sẵn sàng hỗ trợ bạn.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <button className="px-6 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 transition shadow-sm flex items-center gap-2 text-gray-700 font-medium text-sm
                             dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200">
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