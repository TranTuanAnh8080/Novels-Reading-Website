import React from "react";
import HeaderProfile from "../components/ProfilePage/HeaderProfile";
import SidebarLibrary from "../components/LibraryPage/SidebarLibrary";
import UploadBookCard from "../components/UploadPage/UploadBookCard";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function UploadPage() {
  const books = [
    {
      title: "Quỷ Bí Chi Chủ",
      status: "Đã hoàn thành",
      cover: "https://www.nae.vn/ttv/ttv/public/images/story/23b9f814404ee0a32d03f7d09d762075ef88b0730b0537c8f70ee36c1b37af5e.jpg",
    },
    {
      title: "Chuyển Sinh Thành Slime",
      status: "Đang đăng",
      cover: "https://img4.thuthuatphanmem.vn/uploads/2020/11/10/chuyen-sinh-thanh-slime-tensei-shitara-slime-datta-ken_015456993.jpg",
    },
    {
      title: "Solo Leveling",
      status: "Đang xét duyệt",
      cover: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/solo-leveling-sung-jin-woo-featured-image.jpg",
    },
    {
      title: "Đấu Phá Thương Khung",
      status: "Đang đăng",
      cover: "https://i.ytimg.com/vi/9E1GHEleL2A/maxresdefault.jpg",
    },
    {
      title: "Overlord",
      status: "Đang xét duyệt",
      cover: "https://m.media-amazon.com/images/S/pv-target-images/e755f8df130f1e1d2f8ac706e12dbe6273ab6db94df65303c9ce769639c99854.jpg",
    },
    {
      title: "Hoàn Mỹ Thế Giới",
      status: "Đã hoàn thành",
      cover: "https://i.ytimg.com/vi/9-NLpjAr5qo/maxresdefault.jpg",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <HeaderProfile />

      <div className="flex flex-1">
        {/* Sidebar */}
        <SidebarLibrary />

        {/* Main */}
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Truyện đã đăng</h1>

            <Link to= "/UploadNovel" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
              + Đăng truyện mới
            </Link>
          </div>

          {/* Filters */}
          <div className="flex space-x-4 mb-6">
            <select className="border rounded-md px-3 py-2 text-sm">
              <option>Tất cả trạng thái</option>
              <option>Đã hoàn thành</option>
              <option>Đang đăng</option>
              <option>Đang xét duyệt</option>
            </select>
            <select className="border rounded-md px-3 py-2 text-sm">
              <option>Mới đăng nhất</option>
              <option>Cũ nhất</option>
              <option>Tên A-Z</option>
              <option>Tên Z-A</option>
            </select>
          </div>

          {/* Book grid */}
          <div className="grid grid-cols-3 gap-6">
            {books.map((book, idx) => (
              <UploadBookCard key={idx} {...book} />
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default UploadPage;
