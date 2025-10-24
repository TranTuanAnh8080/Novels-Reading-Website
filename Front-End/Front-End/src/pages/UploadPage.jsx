import { useEffect, useState, useMemo } from "react"; // Thêm useMemo
import HeaderProfile from "../components/ProfilePage/HeaderProfile";
import SidebarLibrary from "../components/LibraryPage/SidebarLibrary";
import UploadBookCard from "../components/UploadPage/UploadBookCard";
import { Link } from "react-router-dom";
import Footer from "../components/SharedComponents/Footer";
import axios from "axios";

function UploadPage() {
  const [books, setBooks] = useState([]);
  // 1. State cho các bộ lọc
  const [statusFilter, setStatusFilter] = useState("all"); // 'all', 'completed', 'ongoing', 'pending'
  const [sortFilter, setSortFilter] = useState("newest"); // 'newest', 'oldest', 'name-az', 'name-za'

  // Gọi API lấy danh sách truyện
  useEffect(() => {
    const fetchNovels = async () => {
      try {
        const response = await axios.post(
          "https://be-ink-realm-c7jk.vercel.app/novel/all"
        );
        setBooks(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách truyện:", error);
      }
    };
    fetchNovels();
  }, []);

  // 2. Dùng useMemo để xử lý lọc và sắp xếp
  const processedBooks = useMemo(() => {
    let filteredBooks = [...books];

    // --- Lọc theo trạng thái ---
    // Giả sử object 'book' của bạn có thuộc tính 'status'
    if (statusFilter !== "all") {
      filteredBooks = filteredBooks.filter(
        (book) => book.status === statusFilter
      );
    }

    // --- Sắp xếp ---
    // Giả sử object 'book' có 'createdAt' (cho mới/cũ) và 'novelTitle' (cho A-Z)
    switch (sortFilter) {
      case "newest":
        filteredBooks.sort(
          (a, b) => new Date(b.createDate) - new Date(a.createDate)
        );
        break;
      case "oldest":
        filteredBooks.sort(
          (a, b) => new Date(a.createDate) - new Date(b.createDate)
        );
        break;
      case "name-az":
        filteredBooks.sort((a, b) => a.novelTitle.localeCompare(b.novelTitle));
        break;
      case "name-za":
        filteredBooks.sort((a, b) => b.novelTitle.localeCompare(a.novelTitle));
        break;
      default:
        break;
    }

    return filteredBooks;
  }, [books, statusFilter, sortFilter]); // Chạy lại khi 1 trong 3 giá trị này thay đổi

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <HeaderProfile />

      <div className="flex flex-1">
        <SidebarLibrary />

        <main className="flex-1 p-6">
          <h1 className="text-xl font-bold mb-3">Truyện đã đăng</h1>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              {/* 3. Cập nhật JSX cho Filter Trạng thái */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm bg-white"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="completed">Đã hoàn thành</option>
                <option value="ongoing">Đang đăng</option>
                <option value="pending">Đang xét duyệt</option>
              </select>
              
              {/* 3. Cập nhật JSX cho Filter Sắp xếp */}
              <select
                value={sortFilter}
                onChange={(e) => setSortFilter(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm bg-white"
              >
                <option value="newest">Mới đăng nhất</option>
                <option value="oldest">Cũ nhất</option>
                <option value="name-az">Tên A-Z</option>
                <option value="name-za">Tên Z-A</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/UploadNovel"
                className="px-4 py-2 bg-[#2E5BFF] text-white rounded-md text-sm hover:bg-blue-700"
              >
                + Đăng truyện mới
              </Link>
            </div>
          </div>

          {/* 3. Render danh sách đã được xử lý */}
          <div className="grid grid-cols-3 gap-6">
            {processedBooks.map((book) => (
              // Sử dụng _id hoặc một ID duy nhất làm key
              <UploadBookCard key={book._id || book.novelId} {...book} />
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default UploadPage;