import React, { useEffect, useState } from "react";
import HeaderProfile from "../components/ProfilePage/HeaderProfile";
import SidebarLibrary from "../components/LibraryPage/SidebarLibrary";
import BookCard from "../components/LibraryPage/BookCard";
import Footer from "../components/SharedComponents/Footer";

function LibraryPage() {
  const [followedBooks, setFollowedBooks] = useState([]);

  // 🔹 Lấy danh sách truyện đã theo dõi từ localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("followedBooks") || "[]");
    setFollowedBooks(saved);
  }, []);

  // 🔹 Cập nhật khi localStorage thay đổi (vd: theo dõi ở trang khác)
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = JSON.parse(localStorage.getItem("followedBooks") || "[]");
      setFollowedBooks(saved);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-black">
      <HeaderProfile />

      <div className="flex flex-1">
        <SidebarLibrary />

        <main className="flex-1 p-6">
          <h1 className="text-xl font-bold mb-4 dark:text-white">Tủ truyện của bạn</h1>

          {/* 🔹 Filters */}
          <div className="bg-white border border-gray-200 rounded-md p-4 flex items-center space-x-6 mb-6 shadow-sm">
            {/* Trạng thái */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Trạng thái:</label>
              <select className="border rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option>Tất cả</option>
                <option>Đang đọc</option>
                <option>Đã hoàn thành</option>
                <option>Chưa đọc</option>
              </select>
            </div>

            {/* Sắp xếp theo */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Sắp xếp theo:</label>
              <select className="border rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option>Thời gian đọc gần nhất</option>
                <option>Tên A-Z</option>
                <option>Tên Z-A</option>
              </select>
            </div>
          </div>

          {/* 🔹 Nếu chưa theo dõi truyện nào */}
          {followedBooks.length === 0 ? (
            <div className="text-gray-500 dark:text-zinc-50 dark:italic text-sm text-center mt-10">
              Bạn chưa theo dõi truyện nào.
            </div>
          ) : (
            <>
              {/* Grid hiển thị truyện */}
              <div className="grid grid-cols-3 gap-6">
                {followedBooks.map((book, idx) => (
                  <BookCard
                    key={idx}
                    title={book.title}
                    status={book.status || "Chưa đọc"}
                    btn="Đọc truyện"
                    color="blue"
                    image={book.image}
                  />
                ))}
              </div>

              {/* Pagination giữ nguyên */}
              <div className="flex justify-center items-center space-x-2 mt-6">
                <button className="px-3 py-1 border rounded-md text-sm">&lt;</button>
                <button className="px-3 py-1 border rounded-md bg-[#2E5BFF] text-white text-sm">
                  1
                </button>
                <button className="px-3 py-1 border rounded-md text-sm">2</button>
                <button className="px-3 py-1 border rounded-md text-sm">3</button>
                <button className="px-3 py-1 border rounded-md text-sm">&gt;</button>
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
