import { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search,
  Clock,
  Check,
  FileText,
  Edit3,
  DollarSign,
  PlusCircle,
  Sun,
  Moon,
  X,        
  Tag,      
  Save,     
  FolderOpen
} from 'lucide-react';
import Footer from "../components/SharedComponents/Footer";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useTheme } from "../components/SharedComponents/ThemeContext";

const uploadNovelCoverApi = async (novelId, coverFile, token) => {
  const formData = new FormData();
  formData.append("novelId", String(novelId));
  formData.append("cover", coverFile);
  try {
    const response = await axios.post(
      "https://be-ink-realm-c7jk.vercel.app/uploader/novel/upload-cover",
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error("Upload ảnh bìa thất bại");
  }
};

export default function ModerationStatusPage() {
  const { novelId } = useParams();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [novelData, setNovelData] = useState(null);
  const [allChapters, setAllChapters] = useState([]);
  
  const [currentGenres, setCurrentGenres] = useState([]);
  const [allSystemCategories, setAllSystemCategories] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('published');

  const [priceModalChapter, setPriceModalChapter] = useState(null);
  const [newPrice, setNewPrice] = useState(0);
  const [isUpdatingPrice, setIsUpdatingPrice] = useState(false);

  const fileInputRef = useRef(null);
  const [isUploadingCover, setIsUploadingCover] = useState(false);

  const [showGenreModal, setShowGenreModal] = useState(false);
  const [selectedGenreIds, setSelectedGenreIds] = useState([]); 
  const [isUpdatingGenre, setIsUpdatingGenre] = useState(false);

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

        try {
          const genreRes = await axios.get(
            `https://be-ink-realm-c7jk.vercel.app/novel/${novelId}/genre`
          );

          const flatGenres = [];
          if (Array.isArray(genreRes.data)) {
            genreRes.data.forEach(cat => {
              if (cat.genres) {
                cat.genres.forEach(g => flatGenres.push(g));
              }
            });
          }
          setCurrentGenres(flatGenres);
        } catch (e) {
          console.error("Lỗi lấy genre hiện tại:", e);
        }

        try {
          const allGenreRes = await axios.get(
            "https://be-ink-realm-c7jk.vercel.app/novel/genre/all"
          );
          setAllSystemCategories(allGenreRes.data || []);
        } catch (e) {
          console.error("Lỗi lấy danh sách hệ thống:", e);
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


  const handleOpenGenreModal = () => {
    const currentIds = currentGenres.map(g => g.genreId);
    setSelectedGenreIds(currentIds);
    setShowGenreModal(true);
  };

  const toggleGenreSelection = (id) => {
    setSelectedGenreIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id] 
    );
  };

  const findGenreNameById = (id) => {
    for (const cat of allSystemCategories) {
      if (cat.genres) {
        const found = cat.genres.find(g => g.genreId === id);
        if (found) return found.genreName;
      }
    }
    return "";
  };

  const handleSaveGenres = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập!");
      return;
    }

    setIsUpdatingGenre(true);

    const currentIds = currentGenres.map(g => g.genreId);
    
    const idsToAdd = selectedGenreIds.filter(id => !currentIds.includes(id));
    const listToAdd = idsToAdd.map(id => ({
      genreId: id, 
      genreName: findGenreNameById(id)
    }));

    const idsToRemove = currentIds.filter(id => !selectedGenreIds.includes(id));
    const listToRemove = idsToRemove.map(id => ({
       genreId: id, 
       genreName: findGenreNameById(id)
    }));

    if (listToAdd.length === 0 && listToRemove.length === 0) {
      setShowGenreModal(false);
      setIsUpdatingGenre(false);
      return;
    }

    try {
      const response = await axios.put(
        `https://be-ink-realm-c7jk.vercel.app/uploader/novel/${novelId}/update/genre`,
        { add: listToAdd, remove: listToRemove },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCurrentGenres(response.data.genres || []);
      alert("Cập nhật thể loại thành công!");
      setShowGenreModal(false);

    } catch (error) {
      console.error("Lỗi cập nhật genre:", error);
      alert(error.response?.data?.message || "Lỗi khi cập nhật thể loại");
    } finally {
      setIsUpdatingGenre(false);
    }
  };

  const openPriceModal = (chapter) => {
    setPriceModalChapter(chapter);
    setNewPrice(chapter.price || 0);
  };

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

      const res = await axios.put(
        `https://be-ink-realm-c7jk.vercel.app/uploader/${priceModalChapter.chapterId}/set-price`,
        { price: newPrice },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setAllChapters(prev =>
        prev.map(ch =>
          ch.chapterId === priceModalChapter.chapterId
            ? { ...ch, price: res.data.price }
            : ch
        )
      );

      alert(res.data.message || "Cập nhật giá thành công!");
      setPriceModalChapter(null);

    } catch (error) {
      console.error("❌ Lỗi đặt giá:", error?.response?.data || error.message);
      const msg = error?.response?.data?.message || "❌ Lỗi khi đặt giá";
      alert(msg);
    } finally {
      setIsUpdatingPrice(false);
    }
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập để thay đổi ảnh bìa!");
      return;
    }

    setIsUploadingCover(true);
    try {
      const data = await uploadNovelCoverApi(novelId, file, token);

      setNovelData(prevData => ({
        ...prevData,
        novel_img_url: data.coverUrl
      }));

      alert(data.message || "Cập nhật ảnh bìa thành công!");

    } catch (error) {
      console.error("Lỗi upload cover:", error.message);
      alert(error.message || "Upload ảnh bìa thất bại.");
    } finally {
      setIsUploadingCover(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    }
  };

  const triggerFileSelect = () => {
    if (isUploadingCover) return;
    fileInputRef.current.click();
  };

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

  const getStatusDisplay = (chapterStatusId) => {
    const statusMap = {
      1: { text: 'Đã đăng', color: 'text-green-600 dark:text-green-400', icon: Check },
      2: { text: 'Đang kiểm duyệt', color: 'text-yellow-600 dark:text-yellow-400', icon: Clock },
      3: { text: 'Bản nháp', color: 'text-gray-500 dark:text-gray-400', icon: FileText },
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
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/HomeLoggedIn" className="flex items-center space-x-2">
            <span className="text-2xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              INKREALM
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm chương..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 text-sm px-4 py-2 pr-10 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-[#2E5BFF]
                           dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>

            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <Link to="/Profile">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="User Avatar"
                className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {loading ? (
          <div className="text-center text-gray-500 py-20 dark:text-gray-400">Đang tải dữ liệu truyện...</div>
        ) : !novelData ? (
          <div className="text-center text-red-500 py-20 dark:text-red-400">Không tìm thấy thông tin truyện.</div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6
                       dark:bg-gray-800 dark:border-gray-700">

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              accept="image/png, image/jpeg, image/webp"
            />

            {/* Thông tin truyện */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative
                          dark:bg-gray-800 dark:border-gray-700">

              <button
                onClick={() => navigate(`/AddChapterPage/${novelId}`)}
                className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors shadow-sm
                           dark:bg-blue-500 dark:hover:bg-blue-600"
                title="Thêm chương mới"
              >
                <PlusCircle className="w-5 h-5" />
                Thêm chương
              </button>

              <div className="flex gap-6 items-start">
                <div
                  className="relative w-36 h-48 flex-shrink-0"
                  title="Nhấp để thay đổi ảnh bìa"
                >
                  <img
                    src={novelData.novel_img_url || "https://placehold.co/150x200/666/white?text=No+Cover"}
                    alt={novelData.novelTitle}
                    className={`w-36 h-48 object-cover rounded-md shadow-sm border border-gray-100 transition-opacity ${isUploadingCover ? 'opacity-50' : 'hover:opacity-80 cursor-pointer'
                      } dark:border-gray-700`}
                    onClick={triggerFileSelect}
                  />
                  {isUploadingCover && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{novelData.novelTitle}</h1>
                  <div className="mt-3 grid grid-cols-2 gap-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <div>
                      <span className="font-semibold text-gray-800 dark:text-gray-100">Tác giả:</span>{" "}
                      <span className="font-medium text-gray-500 dark:text-gray-400">{novelData.author}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800 dark:text-gray-100">Trạng thái:</span>{" "}
                      <span className="inline-block px-2 py-0.5 rounded bg-green-50 text-green-700 text-xs font-medium
                                    dark:bg-green-900 dark:text-green-300">
                        {novelData.status || "Đang viết"}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800 dark:text-gray-100">Tổng số chương:</span>{" "}
                      <span className="font-medium text-gray-500 dark:text-gray-400">{allChapters.length}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-start gap-2">
                      <Tag className="w-4 h-4 mt-1 text-gray-400" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="font-semibold text-gray-800 dark:text-gray-100">Thể loại:</span>
                            <button 
                                onClick={handleOpenGenreModal}
                                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-600 transition-colors"
                                title="Chỉnh sửa thể loại"
                            >
                                <Edit3 className="w-4 h-4" />
                            </button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {currentGenres && currentGenres.length > 0 ? (
                            currentGenres.map((genre) => (
                                <span key={genre.genreId || Math.random()} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                                  {genre.genreName}
                                </span>
                            ))
                          ) : (
                            <span className="text-sm text-gray-500 italic">Chưa có thể loại</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-3 mt-6 mb-4 border-b border-gray-200 pb-2 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('published')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'published'
                    ? 'bg-green-600 text-white dark:bg-green-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
              >
                Đã đăng ({allChapters.filter(ch => ch.chapterStatusId === 1).length})
              </button>

              <button
                onClick={() => setActiveTab('review')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'review'
                    ? 'bg-yellow-500 text-white dark:bg-yellow-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
              >
                Đang kiểm duyệt ({allChapters.filter(ch => ch.chapterStatusId === 2).length})
              </button>

              <button
                onClick={() => setActiveTab('draft')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'draft'
                    ? 'bg-gray-700 text-white dark:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
              >
                Bản nháp ({allChapters.filter(ch => ch.chapterStatusId === 3).length})
              </button>
            </div>

            {/* Danh sách chương */}
            {filteredChapters.length === 0 ? (
              <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-60" />
                <p>Không có chương nào trong mục này.</p>
              </div>
            ) : (
              <table className="w-full bg-white dark:bg-gray-800">
                <thead>
                  <tr className="border-b border-gray-200 text-sm text-gray-600
                                 dark:border-gray-700 dark:text-gray-300">
                    <th className="text-left py-4 font-medium">Chương</th>
                    <th className="text-left py-4 font-medium">Tiêu đề</th>
                    <th className="text-left py-4 font-medium">Ngày tạo</th>
                    <th className="text-left py-4 font-medium">Trạng thái</th>
                    <th className="text-right py-4 font-medium">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredChapters.map((ch) => (
                    <tr key={ch.chapterId} className="border-b border-gray-200 hover:bg-gray-50 transition
                                                    dark:border-gray-700 dark:hover:bg-gray-700">
                      <td className="py-3 text-sm text-gray-800 dark:text-gray-100">Chương {ch.chapterIndex}</td>
                      <td className="py-3 text-sm text-gray-800 dark:text-gray-100">
                        {ch.chapterTitle}
                        <span className="block text-xs text-green-700 font-medium mt-0.5 dark:text-green-400">
                          Giá: {ch.price || 0}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-500 dark:text-gray-400">
                        {new Date(ch.createDate).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="py-3 text-sm">{getStatusDisplay(ch.chapterStatusId)}</td>
                      <td className="py-3 text-right">
                        <div className="flex justify-end items-center gap-4">
                          <button
                            onClick={() => openPriceModal(ch)}
                            className="text-green-600 hover:underline flex items-center gap-1 text-sm
                                     dark:text-green-400 dark:hover:text-green-300"
                          >
                            <DollarSign className="w-4 h-4" /> Đặt giá
                          </button>
                          <button
                            onClick={() => navigate(`/EditChapterPage/${novelId}/${ch.chapterId}`)}
                            className="text-blue-600 hover:underline flex items-center gap-1 text-sm
                                     dark:text-blue-400 dark:hover:text-blue-300"
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

      {showGenreModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Tag className="w-5 h-5 text-blue-500" />
                Chỉnh sửa Thể loại
              </h3>
              <button onClick={() => setShowGenreModal(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800">
                 Chọn các thể loại phù hợp nhất với truyện của bạn.
              </p>
              
              <div className="space-y-8">
                {allSystemCategories.length > 0 ? (
                  allSystemCategories.map((category) => (
                    <div key={category.categoryId}>
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">
                            <FolderOpen className="w-5 h-5 text-gray-400" />
                            <h4 className="font-bold text-gray-700 dark:text-gray-200 text-base">
                                {category.categoryName}
                            </h4>
                            <span className="text-xs text-gray-400 font-normal ml-auto hidden sm:inline">
                                {category.categoryDescription}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {category.genres && category.genres.map((genre) => {
                                const isSelected = selectedGenreIds.includes(genre.genreId);
                                return (
                                    <div 
                                        key={genre.genreId}
                                        onClick={() => toggleGenreSelection(genre.genreId)}
                                        className={`cursor-pointer px-3 py-2 rounded-lg border text-sm font-medium flex items-center gap-2 transition-all select-none
                                            ${isSelected 
                                                ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-400 dark:text-blue-300 shadow-sm' 
                                                : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
                                            }`}
                                        title={genre.genreDescription}
                                    >
                                        <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors
                                            ${isSelected ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'}`}>
                                            {isSelected && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <span className="truncate">{genre.genreName}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400 py-4">Đang tải danh sách thể loại...</div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3 bg-gray-50 dark:bg-gray-900">
                <button 
                    onClick={() => setShowGenreModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors"
                >
                    Hủy bỏ
                </button>
                <button 
                    onClick={handleSaveGenres}
                    disabled={isUpdatingGenre}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:bg-blue-400 transition-colors shadow-sm"
                >
                    {isUpdatingGenre ? "Đang lưu..." : <><Save className="w-4 h-4" /> Lưu thay đổi</>}
                </button>
            </div>
          </div>
        </div>
      )}

      {priceModalChapter && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-[450px] p-6 rounded-lg shadow-lg
                        dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">
              Đặt giá cho: {priceModalChapter.chapterTitle}
            </h3>

            <label htmlFor="chapterPrice" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
              Giá chương
            </label>
            <input
              type="number"
              id="chapterPrice"
              value={newPrice}
              onChange={(e) => setNewPrice(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#2E5BFF]
                          dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Nhập giá (ví dụ: 50)"
            />
            <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">Nhập 0 để đặt là chương miễn phí.</p>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setPriceModalChapter(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md flex items-center gap-2
                           dark:bg-gray-600 dark:text-gray-200"
              >
                Hủy
              </button>
              <button
                onClick={handleSetPrice}
                disabled={isUpdatingPrice}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300
                           dark:bg-blue-500 dark:hover:bg-blue-600 dark:disabled:bg-blue-400"
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