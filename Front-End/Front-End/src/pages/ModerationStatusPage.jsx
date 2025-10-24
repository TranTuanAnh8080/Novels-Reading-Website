import React, { useState, useMemo, useEffect } from 'react';
import { Search, Clock, Check, FileText, Edit3, X, DollarSign } from 'lucide-react'; // 1. Import thêm DollarSign
import Footer from "../components/SharedComponents/Footer";
import logo from '../assets/inkrealm_logo.png';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

export default function ModerationStatusPage() {
  const { novelId } = useParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [novelData, setNovelData] = useState(null);
  const [allChapters, setAllChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('published');

  // ✏️ Biến dùng cho chỉnh sửa chương
  const [editingChapter, setEditingChapter] = useState(null);
  const [chapterText, setChapterText] = useState('');
  const [updating, setUpdating] = useState(false);
  const [loadingChapterText, setLoadingChapterText] = useState(false);

  // 💲 2. THÊM MỚI: State cho modal đặt giá
  const [priceModalChapter, setPriceModalChapter] = useState(null); // Lưu chapter đang được set giá
  const [newPrice, setNewPrice] = useState(0); // Lưu giá trị đang nhập
  const [isUpdatingPrice, setIsUpdatingPrice] = useState(false); // Trạng thái loading

  // ✅ Gọi API lấy dữ liệu truyện và chương
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const novelRes = await axios.post(
          "https://be-ink-realm-c7jk.vercel.app/novel/novelId",
          { novelId: Number(novelId) }
        );
        setNovelData(novelRes.data || {});

        const chaptersRes = await axios.get(
          `https://be-ink-realm-c7jk.vercel.app/chapter/list/${novelId}`
        );

        if (chaptersRes.data.success) {
          setAllChapters(chaptersRes.data.chapters || []);
        } else {
          setAllChapters([]);
        }
      } catch (error) {
        console.error("❌ Lỗi tải dữ liệu:", error);
        setNovelData(null);
        setAllChapters([]);
      } finally {
        setLoading(false);
      }
    };

    if (novelId) fetchData();
  }, [novelId]);

  // ✅ Khi nhấn "Chỉnh sửa" -> mở modal và thử tải nội dung chương
  const openEditModal = async (chapter) => {
    setEditingChapter(chapter);
    setChapterText("");
    setLoadingChapterText(true);

    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("Bạn cần đăng nhập để chỉnh sửa chương.");
        setLoadingChapterText(false);
        return;
      }

      const res = await axios.get(
        `https://be-ink-realm-c7jk.vercel.app/chapter/text`,
        {
          params: { chapterId: chapter.chapterId },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setChapterText(res.data?.chapterText || "");
    } catch (err) {
      console.warn("Không thể lấy nội dung chương:", err?.response?.data || err.message);
      setChapterText(""); // vẫn cho nhập mới
    } finally {
      setLoadingChapterText(false);
    }
  };

  // ✅ Gửi request cập nhật nội dung chương
  const handleUpdateChapter = async () => {
    if (!editingChapter || !chapterText.trim()) return alert("Vui lòng nhập nội dung chương!");

    try {
      setUpdating(true);

      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("Bạn cần đăng nhập để cập nhật chương!");
        setUpdating(false);
        return;
      }

      const res = await axios.put(
        `https://be-ink-realm-c7jk.vercel.app/chapter/${editingChapter.chapterId}/text/update`,
        { chapterText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ " + (res.data.message || "Cập nhật thành công!"));

      setAllChapters(prev =>
        prev.map(ch =>
          ch.chapterId === editingChapter.chapterId
            ? { ...ch, chapterStatusId: 3, updateDate: new Date().toISOString() }
            : ch
        )
      );

      setEditingChapter(null);
      setChapterText('');
    } catch (error) {
      console.error("❌ Lỗi cập nhật:", error?.response?.data || error.message);
      const msg = error?.response?.data?.message || "❌ Lỗi khi cập nhật nội dung chương";
      alert(msg);
    } finally {
      setUpdating(false);
    }
  };
  
  // 💲 3. THÊM MỚI: Hàm mở modal đặt giá
  const openPriceModal = (chapter) => {
    setPriceModalChapter(chapter);
    setNewPrice(chapter.price || 0); // Lấy giá hiện tại của chương
  };

  // 💲 3. THÊM MỚI: Hàm gọi API đặt giá
  const handleSetPrice = async () => {
    if (newPrice < 0 || newPrice % 1 !== 0) {
      alert("Giá phải là số nguyên không âm.");
      return;
    }
    if (!priceModalChapter) return;

    setIsUpdatingPrice(true);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("Bạn cần đăng nhập để đặt giá!");
        setIsUpdatingPrice(false);
        return;
      }

      // 🚀 GỌI API ĐẶT GIÁ CỦA BẠN
      const res = await axios.put(
        `https://be-ink-realm-c7jk.vercel.app/uploader/${priceModalChapter.chapterId}/set-price`,
        { price: newPrice }, // Body: { "price": 50 }
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Cập nhật giá mới trong danh sách (state)
      setAllChapters(prev =>
        prev.map(ch =>
          ch.chapterId === priceModalChapter.chapterId
            ? { ...ch, price: res.data.price } // Cập nhật 'price' từ response
            : ch
        )
      );

      alert(res.data.message || "Cập nhật giá thành công!");
      setPriceModalChapter(null); // Đóng modal

    } catch (error) {
      console.error("❌ Lỗi đặt giá:", error?.response?.data || error.message);
      const msg = error?.response?.data?.message || "❌ Lỗi khi đặt giá";
      // Hiển thị lỗi từ server (400, 403, 404...)
      alert(msg);
    } finally {
      setIsUpdatingPrice(false);
    }
  };


  // ✅ Lọc theo tab và tìm kiếm
  const filteredChapters = useMemo(() => {
    let filtered = allChapters;

    if (activeTab === 'published') {
      filtered = filtered.filter((ch) => ch.chapterStatusId === 1);
    } else if (activeTab === 'review') {
      filtered = filtered.filter((ch) => ch.chapterStatusId === 2);
    } else if (activeTab === 'draft') {
      filtered = filtered.filter((ch) => ch.chapterStatusId === 3);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter((ch) =>
        ch.chapterTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ch.chapterIndex?.toString().includes(searchQuery)
      );
    }

    return filtered;
  }, [allChapters, activeTab, searchQuery]);

  // ✅ Hiển thị trạng thái chương
  const getStatusDisplay = (chapterStatusId) => {
    const statusMap = {
      1: { text: 'Đã đăng', color: 'text-green-600', icon: Check },
      2: { text: 'Đang kiểm duyệt', color: 'text-yellow-600', icon: Clock },
      3: { text: 'Bản nháp', color: 'text-gray-500', icon: FileText },
    };
    const { text, color, icon: Icon } = statusMap[chapterStatusId] || statusMap[3];
    return (
      <span className={`inline-flex items-center gap-2 ${color} text-sm font-medium`}>
        <Icon className="w-4 h-4" />
        {text}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/HomeLoggedIn" className="flex items-center space-x-2">
            <img src={logo} alt="InkRealm" className="h-10 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm chương..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 text-sm px-4 py-2 pr-10 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-[#2E5BFF]"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            <Link to="/Profile">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="User Avatar"
                className="w-9 h-9 rounded-full border border-gray-200"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {loading ? (
          <div className="text-center text-gray-500 py-20">Đang tải dữ liệu truyện...</div>
        ) : !novelData ? (
          <div className="text-center text-red-500 py-20">Không tìm thấy thông tin truyện.</div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            {/* Thông tin truyện */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex gap-6 items-start">
                <img
                  src={novelData.novel_img_url || "https://via.placeholder.com/150x200?text=No+Cover"}
                  alt={novelData.novelTitle}
                  className="w-36 h-48 object-cover rounded-md shadow-sm border border-gray-100"
                />
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-bold text-gray-900">{novelData.novelTitle}</h1>
                  <div className="mt-3 grid grid-cols-2 gap-y-2 text-sm text-gray-700">
                    <div>
                      <span className="font-semibold text-gray-800">Tác giả:</span>{" "}
                      <span className="font-medium text-gray-500">{novelData.author}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">Loại truyện:</span>{" "}
                      <span className="font-medium text-[#2E5BFF]">{novelData.type || "Không rõ"}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">Trạng thái:</span>{" "}
                      <span className="inline-block px-2 py-0.5 rounded bg-green-50 text-green-700 text-xs font-medium">
                        {novelData.status || "Đang viết"}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">Tổng số chương:</span>{" "}
                      <span className="font-medium text-gray-500">{allChapters.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-3 mt-6 mb-4 border-b border-gray-200 pb-2">
              <button
                onClick={() => setActiveTab('published')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'published'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Đã đăng ({allChapters.filter(ch => ch.chapterStatusId === 1).length})
              </button>

              <button
                onClick={() => setActiveTab('review')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'review'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Đang kiểm duyệt ({allChapters.filter(ch => ch.chapterStatusId === 2).length})
              </button>

              <button
                onClick={() => setActiveTab('draft')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'draft'
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Bản nháp ({allChapters.filter(ch => ch.chapterStatusId === 3).length})
              </button>
            </div>

            {/* Danh sách chương */}
            {filteredChapters.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-60" />
                <p>Không có chương nào trong mục này.</p>
              </div>
            ) : (
              <table className="w-full bg-white">
                <thead>
                  <tr className="border-b border-gray-200 text-sm text-gray-600">
                    <th className="text-left py-4 font-medium">Chương</th>
                    <th className="text-left py-4 font-medium">Tiêu đề</th>
                    <th className="text-left py-4 font-medium">Ngày tạo</th>
                    <th className="text-left py-4 font-medium">Trạng thái</th>
                    <th className="text-right py-4 font-medium">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredChapters.map((ch) => (
                    <tr key={ch.chapterId} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="py-3 text-sm text-gray-800">Chương {ch.chapterIndex}</td>
                      <td className="py-3 text-sm text-gray-800">
                        {ch.chapterTitle}
                        {/* 💲 4. THÊM MỚI: Hiển thị giá */}
                        <span className="block text-xs text-green-700 font-medium mt-0.5">
                          Giá: {ch.price || 0}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-500">
                        {new Date(ch.createDate).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="py-3 text-sm">{getStatusDisplay(ch.chapterStatusId)}</td>
                      <td className="py-3 text-right">
                        {/* 💲 5. THÊM MỚI: Bọc 2 nút vào div */}
                        <div className="flex justify-end items-center gap-4">
                          <button
                            onClick={() => openPriceModal(ch)}
                            className="text-green-600 hover:underline flex items-center gap-1 text-sm"
                          >
                            <DollarSign className="w-4 h-4" /> Đặt giá
                          </button>
                          
                          <button
                            onClick={() => openEditModal(ch)}
                            className="text-blue-600 hover:underline flex items-center gap-1 text-sm"
                          >
                            <Edit3 className="w-4 h-4" /> Chỉnh sửa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>

      {/* ✏️ Modal chỉnh sửa chương */}
      {editingChapter && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-[600px] p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Chỉnh sửa: {editingChapter.chapterTitle}
            </h3>

            {loadingChapterText ? (
              <div className="text-center py-6 text-gray-500">Đang tải nội dung chương...</div>
            ) : (
              <>
                <textarea
                  value={chapterText}
                  onChange={(e) => setChapterText(e.target.value)}
                  className="w-full h-48 border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#2E5BFF]"
                  placeholder="Nhập nội dung chương mới..."
                />
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => setEditingChapter(null)}
                    className="px-4 py-2 bg-gray-200 rounded-md flex items-center gap-2"
                  >
                    <X className="w-4 h-4" /> Hủy
                  </button>
                  <button
                    onClick={handleUpdateChapter}
                    disabled={updating}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {updating ? "Đang lưu..." : "Lưu thay đổi"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* 💲 6. THÊM MỚI: Modal đặt giá */}
      {priceModalChapter && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-[450px] p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Đặt giá cho: {priceModalChapter.chapterTitle}
            </h3>
            
            <label htmlFor="chapterPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Giá chương
            </label>
            <input
              type="number"
              id="chapterPrice"
              value={newPrice}
              onChange={(e) => setNewPrice(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#2E5BFF]"
              placeholder="Nhập giá (ví dụ: 50)"
            />
            <p className="text-xs text-gray-500 mt-1">Nhập 0 để đặt là chương miễn phí.</p>
            
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setPriceModalChapter(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md flex items-center gap-2"
              >
                Hủy
              </button>
              <button
                onClick={handleSetPrice}
                disabled={isUpdatingPrice}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
              >
                {isUpdatingPrice ? "Đang lưu..." : "Lưu giá"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}