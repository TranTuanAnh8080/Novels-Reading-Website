import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import HeaderProfile from "../components/ProfilePage/HeaderProfile";
import SidebarLibrary from "../components/LibraryPage/SidebarLibrary";
import BookCard from "../components/LibraryPage/BookCard";
import Footer from "../components/SharedComponents/Footer";
import { Link } from "react-router-dom";

const BOOKS_PER_PAGE = 8;

function LibraryPage() {
  const [followedBooks, setFollowedBooks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [sortOrder, setSortOrder] = useState("Tên A-Z");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const syncLibraryData = async () => {
      setIsLoading(true);
      const localData = JSON.parse(localStorage.getItem("followedBooks") || "[]");
      
      if (localData.length === 0) {
        setFollowedBooks([]);
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.post("https://be-ink-realm-c7jk.vercel.app/novel/all");
        const allServerNovels = response.data;

        const freshBooks = allServerNovels.filter(serverBook => 
            localData.some(localBook => {
                const localId = localBook.novelId || localBook.id || localBook._id;
                return String(localId) === String(serverBook.novelId);
            })
        );

        setFollowedBooks(freshBooks);
        
      } catch (error) {
        console.error("Lỗi đồng bộ dữ liệu:", error);
        setFollowedBooks(localData);
      } finally {
        setIsLoading(false);
      }
    };

    syncLibraryData();
  }, []);

  const displayedBooks = useMemo(() => {
    let books = [...followedBooks];

    if (filterStatus !== "Tất cả") {
      books = books.filter((book) => (book.status || "Đã hoàn thành") === filterStatus);
    }

    if (sortOrder === "Tên A-Z") {
      books.sort((a, b) => (a.novelTitle || a.title || "").localeCompare(b.novelTitle || b.title || ""));
    } else if (sortOrder === "Tên Z-A") {
      books.sort((a, b) => (b.novelTitle || b.title || "").localeCompare(a.novelTitle || a.title || ""));
    }
    return books;
  }, [followedBooks, filterStatus, sortOrder]);

  const totalPages = Math.ceil(displayedBooks.length / BOOKS_PER_PAGE);
  const paginatedBooks = displayedBooks.slice(
    (currentPage - 1) * BOOKS_PER_PAGE,
    currentPage * BOOKS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
      <HeaderProfile />

      <div className="flex flex-1 max-w-[1600px] mx-auto w-full">
        <SidebarLibrary />

        <main className="flex-1 p-4 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Tủ Truyện Của Bạn
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Quản lý và theo dõi tiến độ đọc của các tác phẩm yêu thích.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="relative">
                <select
                  className="appearance-none pl-4 pr-10 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer min-w-[150px]"
                  value={filterStatus}
                  onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
                >
                  <option>Tất cả</option>
                  <option>Đang tiến hành</option>
                  <option>Đã hoàn thành</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>

              <div className="relative">
                <select
                  className="appearance-none pl-4 pr-10 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer min-w-[150px]"
                  value={sortOrder}
                  onChange={(e) => { setSortOrder(e.target.value); setCurrentPage(1); }}
                >
                  <option>Tên A-Z</option>
                  <option>Tên Z-A</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-gray-500 font-medium">
                {displayedBooks.length} tác phẩm
            </div>
          </div>

          {isLoading ? (
             <div className="text-center py-20 text-gray-500">Đang đồng bộ dữ liệu...</div>
          ) : displayedBooks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
               <div className="w-16 h-16 bg-blue-50 dark:bg-gray-700 text-blue-500 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {followedBooks.length === 0 ? "Tủ truyện trống" : "Không tìm thấy kết quả"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto mb-4">
                 Hãy thêm truyện vào tủ để theo dõi dễ dàng hơn nhé!
              </p>
              <Link to="/RecommendedAll" className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                  Khám phá truyện ngay
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8">
                {paginatedBooks.map((book) => (
                  <div key={book.novelId || book.id || Math.random()} className="h-full">
                      <BookCard book={book} />
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-10">
                    <nav className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                        <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-md transition-colors ${
                            currentPage === 1
                            ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                        >
                             &lt;
                        </button>

                        <div className="flex gap-1 px-2">
                        {[...Array(totalPages).keys()].map((num) => (
                            <button
                            key={num + 1}
                            onClick={() => handlePageChange(num + 1)}
                            className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-all ${
                                currentPage === num + 1
                                ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                            >
                            {num + 1}
                            </button>
                        ))}
                        </div>

                        <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-md transition-colors ${
                            currentPage === totalPages
                            ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                        >
                             &gt;
                        </button>
                    </nav>
                </div>
              )}
            </>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default LibraryPage;