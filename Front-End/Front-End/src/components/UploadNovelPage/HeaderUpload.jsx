import React from 'react';
import logo from "../../assets/inkrealm_logo.png";
import { Link } from "react-router-dom";

const HeaderUpload = () => {
  return (
    <header className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/HomeLoggedIn" className="flex items-center space-x-4">
          <img src={logo} alt="InkRealm" className="h-10 w-auto" />
        </Link>

        {/* Navigation */}
        <nav className="flex gap-6 text-gray-700 font-medium">
          <a href="/HomeLoggedIn" className="hover:text-sky-600">Trang chủ</a>
          <a href="/categories" className="hover:text-sky-600">Thể loại</a>
          <a href="/ranking" className="hover:text-sky-600">Bảng xếp hạng</a>
        </nav>
      </div>
    </header>
  );
};

export default HeaderUpload;