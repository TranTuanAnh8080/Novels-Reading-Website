import React from "react";
import { Coins } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/inkrealm_logo.png";

const HeaderPayment = () => {
  return (
    <header className="bg-white border-gray-200 shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo + Nav */}
        <div className="flex items-center space-x-12">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <Link to="/HomeLoggedIn" className="flex items-center space-x-4">
              <img src={logo} alt="InkRealm" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
            <a href="/HomeLoggedIn" className="hover:text-blue-600 transition">
              Trang chủ
            </a>
            <a href="/categories" className="hover:text-blue-600 transition">
              Thể loại
            </a>
            <a href="/ranking" className="hover:text-blue-600 transition">
              Bảng xếp hạng
            </a>
            <a href="/sangtac" className="hover:text-blue-600 transition">
              Sáng tác
            </a>
          </nav>
        </div>

        {/* Xu + Avatar */}
        <div className="flex items-center space-x-6">
          {/* Coin */}
          <div className="flex items-center space-x-2 bg-gray-100 px-4 py-1.5 rounded-full shadow-sm">
            <Coins className="text-yellow-500" size={20} />
            <span className="text-gray-800 font-semibold">14,000 xu</span>
          </div>

          {/* Avatar */}
          <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-gray-200 cursor-pointer">
            <Link to= "/Profile">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="User Avatar"
                className="h-full w-full object-cover"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderPayment;
