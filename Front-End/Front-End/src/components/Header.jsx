import React from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/inkrealm_logo.png";

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/HomePage">
            <img src={logo} alt="InkRealm" className="h-8 w-auto cursor-pointer" />
          </Link>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xl mx-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm truyện, thể loại, tác giả..."
              className="w-full rounded-full border border-gray-300 pl-4 pr-10 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-3">
          <Link to="/LoginPage" className="text-gray-600 text-sm hover:text-blue-600">
            Đăng nhập
          </Link>
          <Link
            to="/RegisterPage"
            className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            Đăng ký
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
