import React, { useEffect, useState } from "react";
import { Search, LogOut } from "lucide-react";
import logo from "../../assets/inkrealm_logo.png";
import { Link } from "react-router-dom";

function HeaderBook() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    window.addEventListener("storage", checkLogin);
    const interval = setInterval(checkLogin, 500);

    return () => {
      window.removeEventListener("storage", checkLogin);
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link
            to={isLoggedIn ? "/HomeLoggedIn" : "/HomePage"}
            className="flex items-center space-x-2"
          >
            <img src={logo} alt="InkRealm" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Menu */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium flex-1 justify-center">
          <Link
            to={isLoggedIn ? "/HomeLoggedIn" : "/HomePage"}
            className="hover:text-blue-600"
          >
            Trang chủ
          </Link>
          <Link to="/the-loai" className="hover:text-blue-600">
            Thể loại
          </Link>
          <Link to="/xep-hang" className="hover:text-blue-600">
            Xếp hạng
          </Link>
          <Link to="/moi-cap-nhat" className="hover:text-blue-600">
            Mới cập nhật
          </Link>
          <Link to="/sang-tac" className="hover:text-blue-600">
            Sáng tác
          </Link>
        </nav>

        {/* Search + User */}
        <div className="flex items-center space-x-4">
          {/* Search box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm truyện..."
              className="rounded-full border border-gray-300 pl-4 pr-10 py-1.5 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-blue-500 text-sm w-56"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>

          {/* User / Login */}
          {!isLoggedIn ? (
            <Link
              to="/LoginPage"
              className="flex items-center bg-[#2E5BFF] hover:bg-indigo-600 
                         text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-sm"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Đăng nhập
            </Link>
          ) : (
            <div className="flex items-center space-x-6">
              <Link to="/Profile">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="user avatar"
                className="w-9 h-9 rounded-full border cursor-pointer hover:opacity-80"
              />
              </Link> 
              <button
                onClick={() => {
                  localStorage.removeItem("isLoggedIn"); // clear login
                  window.location.href = "/HomePage";    // reload lại
                }}
                className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm font-medium"
              >
                <LogOut className="w-4 h-4 mr-1" />
                <span>Đăng xuất</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default HeaderBook;
