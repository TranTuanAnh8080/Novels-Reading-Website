import React, { useState, useMemo } from 'react';
import 
{ Search, 
  Bell, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  Clock, 
  Check,
  BookOpen,
  CheckCircle,
  File, 
  FileText } from 'lucide-react';
import Footer from "../components/SharedComponents/Footer";
import logo from '../assets/inkrealm_logo.png';
import { Link } from "react-router-dom";

export default function InkRealmNovelPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('published');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddChapter, setShowAddChapter] = useState(false);
  
  const itemsPerPage = 5;

  // Dữ liệu chương đầy đủ
  const [allChapters, setAllChapters] = useState([
    { id: 1, number: 245, title: 'Bí mật cuối cùng', date: '15/01/2025', status: 'published', views: 1234, isPaid: false },
    { id: 2, number: 244, title: 'Cuộc chiến cuối cùng', date: '14/01/2025', status: 'published', views: 2341, isPaid: false },
    { id: 3, number: 243, title: 'Sự thật được hé lộ', date: '13/01/2025', status: 'reviewed', views: 3452, isPaid: true },
    { id: 4, number: 242, title: 'Đối mặt với quá khứ', date: '12/01/2025', status: 'reviewing', views: 2156, isPaid: true },
    { id: 5, number: 241, title: 'Kế hoạch bí mật', date: '11/01/2025', status: 'draft', views: 0, isPaid: false },
    { id: 6, number: 240, title: 'Sức mạnh ẩn giấu', date: '10/01/2025', status: 'published', views: 4521, isPaid: false },
    { id: 7, number: 239, title: 'Trận chiến định mệnh', date: '09/01/2025', status: 'published', views: 3876, isPaid: true },
    { id: 8, number: 238, title: 'Người hùng xuất hiện', date: '08/01/2025', status: 'reviewed', views: 2987, isPaid: false },
    { id: 9, number: 237, title: 'Bí ẩn được giải mã', date: '07/01/2025', status: 'reviewing', views: 1654, isPaid: true },
    { id: 10, number: 236, title: 'Khởi đầu hành trình', date: '06/01/2025', status: 'draft', views: 0, isPaid: false },
  ]);

  const [notifications] = useState([
    { id: 1, message: 'Chương 245 đã được phê duyệt', time: '5 phút trước', read: false },
    { id: 2, message: 'Có 12 bình luận mới', time: '1 giờ trước', read: false },
    { id: 3, message: 'Truyện của bạn đạt 10K lượt xem', time: '2 giờ trước', read: true },
  ]);

  // Lọc chương theo tab và tìm kiếm
  const filteredChapters = useMemo(() => {
    let filtered = allChapters;

    // Lọc theo tab
    if (activeTab === 'published') {
      filtered = filtered.filter(ch => ch.status === 'published');
    } else if (activeTab === 'reviewed') {
      filtered = filtered.filter(ch => ch.status === 'reviewed' || ch.status === 'reviewing');
    } else if (activeTab === 'draft') {
      filtered = filtered.filter(ch => ch.status === 'draft');
    }

    // Lọc theo tìm kiếm
    if (searchQuery.trim()) {
      filtered = filtered.filter(ch => 
        ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ch.number.toString().includes(searchQuery)
      );
    }

    return filtered;
  }, [allChapters, activeTab, searchQuery]);

  // Phân trang
  const totalPages = Math.ceil(filteredChapters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentChapters = filteredChapters.slice(startIndex, startIndex + itemsPerPage);

  // Đếm số lượng theo tab
  const publishedCount = allChapters.filter(ch => ch.status === 'published').length;
  const reviewedCount = allChapters.filter(ch => ch.status === 'reviewed' || ch.status === 'reviewing').length;
  const draftCount = allChapters.filter(ch => ch.status === 'draft').length;

  // Xử lý đổi tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Xử lý phân trang
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Xử lý xóa chương
  const handleDeleteChapter = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa chương này?')) {
      setAllChapters(allChapters.filter(ch => ch.id !== id));
    }
  };

  // Xử lý đổi trạng thái chương
  const handleStatusChange = (id, newStatus) => {
    setAllChapters(allChapters.map(ch => 
      ch.id === id ? { ...ch, status: newStatus } : ch
    ));
  };

  // Xử lý thêm chương mới
  const handleAddChapter = () => {
    const newChapter = {
      id: Math.max(...allChapters.map(ch => ch.id)) + 1,
      number: Math.max(...allChapters.map(ch => ch.number)) + 1,
      title: 'Chương mới',
      date: new Date().toLocaleDateString('vi-VN'),
      status: 'draft',
      views: 0,
      isPaid: false
    };
    setAllChapters([newChapter, ...allChapters]);
    setShowAddChapter(false);
    setActiveTab('draft');
    setCurrentPage(1);
  };

  // Render trạng thái
  const getStatusDisplay = (status) => {
    const statusMap = {
      published: { text: 'Đã đăng', color: 'text-green-600', icon: Check },
      reviewed: { text: 'Đã kiểm duyệt', color: 'text-blue-600', icon: Check },
      reviewing: { text: 'Đang kiểm duyệt', color: 'text-yellow-600', icon: Clock },
      draft: { text: 'Nháp', color: 'text-gray-500', icon: FileText }
    };
    const { text, color, icon: Icon } = statusMap[status] || statusMap.draft;
    return (
      <span className={`inline-flex items-center gap-2 ${color} text-sm font-medium`}>
        <Icon className="w-4 h-4" />
        {text}
      </span>
    );
  };

  // Render số trang
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages.map((page, index) => 
      page === '...' ? (
        <span key={`ellipsis-${index}`} className="px-2 text-gray-400">...</span>
      ) : (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 rounded-md text-sm border ${
            currentPage === page 
              ? 'bg-[#2E5BFF] text-white border-[#2E5BFF]' 
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      )
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/HomeLoggedIn" className="flex items-center space-x-2">
          <img src={logo} alt="InkRealm" className="h-10 w-auto" />
        </Link>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Tìm kiếm chương..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-300 text-sm px-4 py-2 pr-10 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-[#2E5BFF]"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-full hover:bg-gray-100"
                aria-label="Thông báo"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-medium text-gray-800">Thông báo</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map(notif => (
                      <div 
                        key={notif.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                          !notif.read ? 'bg-gray-50' : ''
                        }`}
                      >
                        <p className="text-sm text-gray-800">{notif.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User */}
            <div className="flex items-center gap-3">
              <Link to="/Profile">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="User Avatar"
                className="w-9 h-9 rounded-full border border-gray-200"
              />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          {/* Novel Info Section */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex gap-6 items-start">
              {/* Ảnh bìa */}
              <img
                src="https://www.nae.vn/ttv/ttv/public/images/story/23b9f814404ee0a32d03f7d09d762075ef88b0730b0537c8f70ee36c1b37af5e.jpg"
                alt="Quỷ Bí Chi Chủ"
                className="w-36 h-48 object-cover rounded-md shadow-sm border border-gray-100"
                onError={(e) => {
                  e.target.src =
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="200"%3E%3Crect fill="%23e6edf3" width="150" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23666" font-size="14"%3EQuỷ Bí%3C/text%3E%3C/svg%3E';
                }}
              />

              {/* Thông tin */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <h1 className="text-2xl font-bold text-gray-900">Quỷ Bí Chi Chủ</h1>
                </div>

                {/* Thông tin chi tiết */}
                <div className="mt-3 grid grid-cols-2 gap-y-2 text-sm text-gray-700">
                  <div>
                    <span className="font-semibold text-gray-800">Tác giả:</span>{" "}
                    <span className="font-medium text-gray-500">NguyenVanA</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Loại truyện:</span>{" "}
                    <span className="font-medium text-[#2E5BFF]">Dịch</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Trạng thái:</span>{" "}
                    <span className="inline-block px-2 py-0.5 rounded bg-green-50 text-green-700 text-xs font-medium">
                      Đang viết
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Tổng số chương:</span>{" "}
                    <span className="font-medium text-gray-500">{allChapters.length}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold text-gray-800">Tổng lượt xem:</span>{" "}
                    <span className="font-medium text-gray-500">
                      {allChapters
                        .reduce((sum, ch) => sum + ch.views, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Từ khóa */}
                <div className="mt-4">
                  <span className="text-gray-800 text-sm font-semibold">Từ khóa:</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 rounded text-xs text-gray-800">
                      Huyền bí
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded text-xs text-gray-800">
                      Siêu nhiên
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded text-xs text-gray-800">
                      Trinh thám
                    </span>
                  </div>
                </div>

                {/* Nút chỉnh sửa mô tả */}
                <div className="mt-5">
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-900 font-semibold bg-gray-50 hover:bg-gray-200 transition">
                    <Edit className="w-4 h-4" />
                    Chỉnh sửa mô tả truyện
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter List Section */}
          <div className="border-t border-gray-100 pt-6">
            {/* Header + Add button */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Danh sách chương
              </h2>

              <button
                  onClick={handleAddChapter}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm shadow"
                >
                  <Plus className="w-4 h-4" />
                  Thêm chương mới
              </button>
            </div>

            <div className="border-b border-gray-200 mb-4"></div>

            {/* Tabs */}
            <div className="flex items-center justify-between mb-4 pb-3">
              <div className="flex items-center gap-6">
                <button
                  className={`pb-2 text-sm flex items-center gap-2 transition ${
                    activeTab === "published"
                      ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => handleTabChange("published")}
                >
                  <BookOpen className="w-4 h-4" />
                  Đã đăng ({publishedCount})
                </button>
                <button
                  className={`pb-2 text-sm flex items-center gap-2 transition ${
                    activeTab === "reviewed"
                      ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => handleTabChange("reviewed")}
                >
                  <CheckCircle className="w-4 h-4" />
                  Đã kiểm duyệt ({reviewedCount})
                </button>
                <button
                  className={`pb-2 text-sm flex items-center gap-2 transition ${
                    activeTab === "draft"
                      ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => handleTabChange("draft")}
                >
                  <File className="w-4 h-4" />
                  Nháp ({draftCount})
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              {currentChapters.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-60" />
                  <p>Không tìm thấy chương nào</p>
                </div>
              ) : (
                <table className="w-full bg-white">
                  <thead>
                    <tr className="border-b border-gray-200 text-sm text-gray-600">
                      <th className="text-left py-4 font-medium">Chương</th>
                      <th className="text-left py-4 font-medium">Tiêu đề</th>
                      <th className="text-left py-4 font-medium">Ngày đăng</th>
                      <th className="text-left py-4 font-medium">Lượt xem</th>
                      <th className="text-left py-4 font-medium">Trạng thái</th>
                      <th className="text-left py-4 font-medium">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentChapters.map((chapter) => (
                      <tr key={chapter.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                        <td className="py-3 text-sm text-gray-800">Chương {chapter.number}</td>
                        <td className="py-3 text-sm text-gray-800">{chapter.title}</td>
                        <td className="py-3 text-sm text-gray-500">{chapter.date}</td>
                        <td className="py-3 text-sm text-gray-500">{chapter.views.toLocaleString()}</td>
                        <td className="py-3 text-sm">
                          {getStatusDisplay(chapter.status)}
                        </td>
                        <td className="py-3 text-sm">
                          <div className="flex gap-3 items-center">
                            <button 
                              className="text-blue-600 hover:text-blue-500 flex items-center gap-1 transition"
                              title="Xem"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              className="text-gray-700 hover:text-gray-900 flex items-center gap-1 transition"
                              title="Chỉnh sửa"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            {chapter.status === 'draft' && (
                              <button 
                                onClick={() => handleStatusChange(chapter.id, 'reviewing')}
                                className="text-yellow-600 hover:text-yellow-500 text-xs transition"
                              >
                                Gửi duyệt
                              </button>
                            )}
                            {chapter.status === 'reviewing' && (
                              <button 
                                onClick={() => handleStatusChange(chapter.id, 'reviewed')}
                                className="text-blue-600 hover:text-blue-500 text-xs transition"
                              >
                                Duyệt
                              </button>
                            )}
                            {chapter.status === 'reviewed' && (
                              <button 
                                onClick={() => handleStatusChange(chapter.id, 'published')}
                                className="text-green-600 hover:text-green-500 text-xs transition"
                              >
                                Đăng
                              </button>
                            )}
                            <button 
                              onClick={() => handleDeleteChapter(chapter.id)}
                              className="text-red-600 hover:text-red-500 flex items-center gap-1 transition"
                              title="Xóa"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-gray-500">
                  Hiển thị {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredChapters.length)} của {filteredChapters.length} chương
                </p>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {renderPageNumbers()}
                  <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-md border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
