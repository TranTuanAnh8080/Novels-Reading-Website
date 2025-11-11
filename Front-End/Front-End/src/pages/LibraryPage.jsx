// file: pages/LibraryPage.js

import React, { useEffect, useState, useMemo } from "react";
import HeaderProfile from "../components/ProfilePage/HeaderProfile";
import SidebarLibrary from "../components/LibraryPage/SidebarLibrary";
import BookCard from "../components/LibraryPage/BookCard"; // 👈 Import BookCard đã sửa
import Footer from "../components/SharedComponents/Footer";

// ... (Toàn bộ code useEffect, useMemo, ... của bạn giữ nguyên) ...
const BOOKS_PER_PAGE = 6;

function LibraryPage() {
  const [followedBooks, setFollowedBooks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [sortOrder, setSortOrder] = useState("Tên A-Z");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("followedBooks") || "[]");
    setFollowedBooks(saved);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = JSON.parse(localStorage.getItem("followedBooks") || "[]");
      setFollowedBooks(saved);
      setCurrentPage(1); 
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const displayedBooks = useMemo(() => {
    let books = [...followedBooks];
    if (filterStatus !== "Tất cả") {
      books = books.filter(book => (book.status || "Chưa đọc") === filterStatus);
    }
    if (sortOrder === "Tên A-Z") {
      books.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "Tên Z-A") {
      books.sort((a, b) => b.title.localeCompare(a.title));
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
    }
  };
// ... (Code đến phần return giữ nguyên) ...

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <HeaderProfile />

      <div className="flex flex-1">
        <SidebarLibrary />

        <main className="flex-1 p-6">
          <h1 className="text-xl font-bold mb-4 dark:text-white">Tủ truyện của bạn</h1>

          {/* 🔹 Filters (Giữ nguyên code) */}
          <div className="bg-white border border-gray-200 rounded-md p-4 flex items-center space-x-6 mb-6 shadow-sm">
            {/* ... (code select 'Trạng thái' giữ nguyên) ... */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Trạng thái:</label>
              <select
                className="border rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setCurrentPage(1); 
                }}
              >
                <option>Tất cả</option>
                <option>Đang đọc</option>
                <option>Đã hoàn thành</option>
                <option>Chưa đọc</option>
              </select>
            </div>
            {/* ... (code select 'Sắp xếp theo' giữ nguyên) ... */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Sắp xếp theo:</label>
              <select
                className="border rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  setCurrentPage(1); 
                }}
              >
                <option>Tên A-Z</option>
                <option>Tên Z-A</option>
              </select>
            </div>
          </div>

          {/* 🔹 Grid hiển thị */}
          {displayedBooks.length === 0 ? (
            <div className="text-gray-500 dark:text-zinc-50 dark:italic text-sm text-center mt-10">
              {followedBooks.length === 0 
                ? "Bạn chưa theo dõi truyện nào."
                : "Không tìm thấy truyện nào phù hợp với bộ lọc."
              }
            </div>
          ) : (
            <>
              {/* Grid hiển thị truyện (dùng paginatedBooks) */}
              <div className="grid grid-cols-3 gap-6">
                
                {/* 👇👇👇 THAY ĐỔI DUY NHẤT Ở ĐÂY 👇👇👇 */}
                {paginatedBooks.map((book) => (
                  <BookCard
                    key={book.id} // 👈 Dùng 'id' làm key (quan trọng)
                    book={book}   // 👈 Truyền cả object 'book'
                  />
                ))}
                {/* 👆👆👆 KẾT THÚC THAY ĐỔI 👆👆👆 */}

              </div>

              {/* Pagination (Giữ nguyên code) */}
              <div className="flex justify-center items-center space-x-2 mt-6">
                {/* ... (code các nút <, 1, 2, 3, > giữ nguyên) ... */}
                <button
                  className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                {[...Array(totalPages).keys()].map(num => (
                  <button
                    key={num + 1}
                    className={`px-3 py-1 border rounded-md text-sm ${
                      currentPage === num + 1
                        ? "bg-[#2E5BFF] text-white"
                        : ""
                    }`}
                    onClick={() => handlePageChange(num + 1)}
                  >
                    {num + 1}
                  </button>
                ))}
                <button
                  className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
            </>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default LibraryPage;