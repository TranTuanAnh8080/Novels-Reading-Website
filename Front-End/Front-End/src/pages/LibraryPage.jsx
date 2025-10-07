import React from "react";
import HeaderProfile from "../components/ProfilePage/HeaderProfile";
import SidebarLibrary from "../components/LibraryPage/SidebarLibrary";
import BookCard from "../components/LibraryPage/BookCard";
import Footer from "../components/SharedComponents/Footer";

function LibraryPage() {
  const books = [
    {
      title: "Quỷ Bí Chi Chủ",  
      status: "Đang đọc: Chương 125",
      btn: "Tiếp tục đọc",
      color: "blue",  
      image: "https://www.nae.vn/ttv/ttv/public/images/story/23b9f814404ee0a32d03f7d09d762075ef88b0730b0537c8f70ee36c1b37af5e.jpg"
    },
    {
      title: "Chuyển Sinh Thành Slime",
      status: "Đã hoàn thành",
      btn: "Đọc lại",
      color: "green",
      image: "https://img4.thuthuatphanmem.vn/uploads/2020/11/10/chuyen-sinh-thanh-slime-tensei-shitara-slime-datta-ken_015456993.jpg"
    },
    {
      title: "Solo Leveling",
      status: "Chưa đọc",
      btn: "Bắt đầu đọc",
      color: "blue",
      image: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/solo-leveling-sung-jin-woo-featured-image.jpg"
    },
    {
      title: "Đấu Phá Thương Khung",
      status: "Đang đọc: Chương 45",
      btn: "Tiếp tục đọc",
      color: "blue",
      image: "https://i.ytimg.com/vi/9E1GHEleL2A/maxresdefault.jpg"
    },
    {
      title: "Oregairu",
      status: "Đang đọc: Chương 8",
      btn: "Tiếp tục đọc",
      color: "blue",
      image: "https://wallpaperaccess.com/full/5387798.jpg"
    },
    {
      title: "Tower of God",
      status: "Đã hoàn thành",
      btn: "Đọc lại",
      color: "green",
      image: "https://image.tmdb.org/t/p/original/gcvJgJScIt0a5sRt8uLIkGM9IhI.jpg"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <HeaderProfile />

      <div className="flex flex-1">
        <SidebarLibrary />
    
        <main className="flex-1 p-6">
          <h1 className="text-xl font-bold mb-4">Tủ truyện của bạn</h1>

      {/* Filters */}
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

          {/* Book grid */}
          <div className="grid grid-cols-3 gap-6">
            {books.map((book, idx) => (
              <BookCard key={idx} {...book} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-2 mt-6">
            <button className="px-3 py-1 border rounded-md text-sm">&lt;</button>
            <button className="px-3 py-1 border rounded-md bg-[#2E5BFF] text-white text-sm">
              1
            </button>
            <button className="px-3 py-1 border rounded-md text-sm">2</button>
            <button className="px-3 py-1 border rounded-md text-sm">3</button>
            <button className="px-3 py-1 border rounded-md text-sm">&gt;</button>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default LibraryPage;
