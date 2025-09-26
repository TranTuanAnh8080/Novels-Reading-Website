import React from "react";
import { Search, Bell, Bookmark, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/inkrealm_logo.png";


function HeaderLoggedIn() {
  const handleLogout = () => {
    // Nếu có dùng token/session thì xóa
    localStorage.removeItem("token");
  }; 

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/HomeLoggedIn" className="flex items-center space-x-2">
          <img src={logo} alt="InkRealm" className="h-10 w-auto" />
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-xl mx-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm tên truyện, tác giả hoặc thể loại..."
              className="w-full rounded-full border border-gray-300 pl-4 pr-10 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* User actions */}
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <Link to="/Profile">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="user avatar"
            className="w-9 h-9 rounded-full border cursor-pointer hover:opacity-80"
          />
          </Link>

          {/* Icons */}
          <button className="text-gray-600 hover:text-blue-600">
            <Bell className="h-5 w-5" />
          </button>
          <button className="text-gray-600 hover:text-blue-600">
            <Bookmark className="h-5 w-5" />
          </button>

          {/* Logout */}
          <Link
            to="/HomePage"
            onClick={handleLogout}
            className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm font-medium"
          >
            <LogOut className="h-4 w-4" />
            <span>Đăng xuất</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default HeaderLoggedIn;
