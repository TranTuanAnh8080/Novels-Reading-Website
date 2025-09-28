import React from "react";
import {
  ChevronLeft,
  Search,
  Filter,
  BookOpen,
  User,
  Clock,
} from "lucide-react";
import logo from "../assets/inkrealm_logo.png";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ChapterList() {
  const navigate = useNavigate();

  const chapters = [
    { id: "001", title: "Crimson", uploader: "TransTeam", time: "3 ngày trước" },
    { id: "002", title: "Cuộc họp Tarot", uploader: "TransTeam", time: "7 ngày trước" },
    { id: "003", title: "Beyonder", uploader: "TransTeam", time: "9 ngày trước" },
    { id: "004", title: "Sự khởi đầu", uploader: "TransTeam", time: "10 ngày trước" },
    { id: "005", title: "Ký ức", uploader: "TransTeam", time: "12 ngày trước" },
    { id: "006", title: "Antigonus", uploader: "TransTeam", time: "14 ngày trước" },
    { id: "007", title: "Trinkets", uploader: "TransTeam", time: "17 ngày trước" },
    { id: "008", title: "Welch", uploader: "TransTeam", time: "19 ngày trước" },
    { id: "009", title: "Naya", uploader: "TransTeam", time: "21 ngày trước" },
    { id: "010", title: "Justice", uploader: "TransTeam", time: "23 ngày trước" },
  ];

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      {/* Header */}
    <header className="bg-white border-b border-gray-200 shadow-sm">
    <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Left: Back + Logo */}
        <div className="flex items-center gap-6">
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-gray-900"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Quay lại</span>
        </div>

        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/HomePage" className="flex items-center space-x-2">
            <img src={logo} alt="InkRealm" className="h-10 w-auto" />
          </Link>
        </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-sm mx-6 relative">
        <input
            type="text"
            placeholder="Tìm kiếm truyện..."
            className="w-full border border-gray-300 rounded-md pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
        </div>

        {/* User */}
        <img
        src="https://randomuser.me/api/portraits/men/45.jpg"
        alt="user"
        className="w-9 h-9 rounded-full object-cover border"
        />
    </div>
    </header>

      <main className="py-6 max-w-5xl mx-auto">
        {/* Book info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <div className="flex gap-4 items-start">
            <img
              src="https://www.nae.vn/ttv/ttv/public/images/story/23b9f814404ee0a32d03f7d09d762075ef88b0730b0537c8f70ee36c1b37af5e.jpg"
              alt="Book cover"
              className="w-24 h-32 object-cover rounded-md shadow"
            />
            <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold text-gray-1000 mb-2 flex items-center gap-2">
            Mục lục - Quỷ Bí Chi Chủ
            <span className="bg-green-100 text-green-700 px-2 py-0.5 text-xs font-medium rounded-full">
                Truyện dịch
            </span>
            </h1>

              {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span className="font-medium text-gray-500">1.432 chương</span>
            </div>
            <div className="flex items-center gap-1">
                <User className="w-4 h-4 text-indigo-600" />
                <span className="font-medium text-gray-500">Cuttlefish That Loves Diving</span>
            </div>
            <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span className="font-medium text-gray-500">Cập nhật: 2 giờ trước</span>
            </div>
            </div>

              <p className="text-gray-500 text-sm mt-3 line-clamp-1">
                Trong thế giới đầy bí ẩn và siêu nhiên, Klein Moretti bước vào con đường phi thường đầy nguy hiểm...
              </p>
            </div>
          </div>
        </div>

        {/* Danh sách chương */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-4">
          <div className="flex justify-between items-center p-4">
            <h2 className="font-semibold text-gray-800">
              Danh sách chương <span className="text-gray-500">(1.432 chương)</span>
            </h2>
            <div className="flex items-center gap-2">
              <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                <option>Tăng dần</option>
                <option>Giảm dần</option>
              </select>
              <button className="flex items-center gap-1 text-sm bg-indigo-500 text-white px-3 py-1.5 rounded-md hover:bg-indigo-600">
                <Filter className="w-4 h-4" />
                Lọc
              </button>
            </div>
          </div>
        </div>

        {/* Table block riêng */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 font-medium w-20">Chương</th>
                  <th className="px-4 py-3 font-medium">Tiêu đề</th>
                  <th className="px-4 py-3 font-medium w-40">Người đăng</th>
                  <th className="px-4 py-3 font-medium w-40">Thời gian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {chapters.map((chapter) => (
                  <tr key={chapter.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-indigo-600 font-medium">{chapter.id}</td>
                    <td className="px-4 py-3 text-gray-800">{chapter.title}</td>
                    <td className="px-4 py-3 text-gray-600">{chapter.uploader}</td>
                    <td className="px-4 py-3 text-gray-600">{chapter.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center px-4 py-3 text-sm text-gray-600 border-t border-gray-200">
            <span>Hiển thị 1-10 của 1.432 chương</span>
            <div className="flex gap-1">
              <button className="px-2 py-1 border rounded-md hover:bg-gray-100">{"<"}</button>
              <button className="px-2 py-1 border rounded-md hover:bg-gray-100">{">"}</button>
            </div>
          </div>
        </div>
      </main>
    <Footer />
    </div>
  );
}
