import React, { useEffect, useState } from "react";
import { Search, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/inkrealm_logo.png";

export default function HeaderBook() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "true");
    };
    window.addEventListener("loginStateChanged", checkLogin);
    window.addEventListener("storage", checkLogin);
    const interval = setInterval(checkLogin, 500);

    return () => {
      window.removeEventListener("loginStateChanged", checkLogin);
      window.removeEventListener("storage", checkLogin);
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-900 to-gray-900 text-white sticky top-0 z-50 border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between gap-6">
        {/* LOGO */}
        <div className="flex items-center space-x-3">
          <Link
            to={isLoggedIn ? "/HomeLoggedIn" : "/HomePage"}
            className="flex items-center space-x-2 group"
          >
            <span className="text-2xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              INKREALM
            </span>
          </Link>
        </div>

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium flex-1 justify-center">
          <Link
            to={isLoggedIn ? "/HomeLoggedIn" : "/HomePage"}
            className="hover:text-blue-400 transition-colors"
          >
            Trang chủ
          </Link>
          <Link to="/the-loai" className="hover:text-blue-400 transition-colors">
            Thể loại
          </Link>
          <Link to="/xep-hang" className="hover:text-blue-400 transition-colors">
            Xếp hạng
          </Link>
          <Link
            to="/moi-cap-nhat"
            className="hover:text-blue-400 transition-colors"
          >
            Mới cập nhật
          </Link>
          <Link to="/sang-tac" className="hover:text-blue-400 transition-colors">
            Sáng tác
          </Link>
        </nav>

        {/* SEARCH + USER */}
        <div className="flex items-center gap-4">
          {/* Search box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm truyện..."
              className="rounded-full bg-gray-800 border border-gray-700 pl-4 pr-10 py-1.5 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         placeholder-gray-400 text-sm w-56"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* USER AREA */}
          {!isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link to="/LoginPage">
                <button className="px-4 py-1.5 text-sm rounded-full border border-gray-700 hover:bg-gray-800 transition">
                  Đăng nhập
                </button>
              </Link>
              <Link to="/RegisterPage">
                <button className="px-4 py-1.5 text-sm rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:brightness-110 transition">
                  Đăng ký
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/Profile">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="user avatar"
                  className="w-9 h-9 rounded-full border border-gray-700 cursor-pointer hover:opacity-90 transition"
                />
              </Link>
              <button
                onClick={() => {
                  sessionStorage.clear();
                  window.dispatchEvent(new Event("loginStateChanged"));
                  window.location.href = "/HomePage";
                }}
                className="flex items-center gap-1 text-red-500 hover:text-red-400 text-sm font-medium transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Đăng xuất</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Animation (fadeIn) */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>
    </header>
  );
}
