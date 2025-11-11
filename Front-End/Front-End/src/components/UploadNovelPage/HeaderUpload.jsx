import React from 'react';
import logo from "../../assets/inkrealm_logo.png";
import { Link } from "react-router-dom";
import { useTheme } from "../../components/SharedComponents/ThemeContext";
import { Sun, Moon } from "lucide-react";

const HeaderUpload = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full border-b border-gray-200 bg-white shadow-sm
                   dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/HomeLoggedIn" className="flex items-center space-x-4">
          <img src={logo} alt="InkRealm" className="h-10 w-auto" />
        </Link>

        <div className="flex items-center gap-6">
          {/* Navigation */}
          <nav className="flex gap-6 text-gray-700 font-medium dark:text-gray-300">
            <a href="/HomeLoggedIn" className="hover:text-sky-600 dark:hover:text-sky-400">Trang chủ</a>
            <a href="/categories" className="hover:text-sky-600 dark:hover:text-sky-400">Thể loại</a>
            <a href="/ranking" className="hover:text-sky-600 dark:hover:text-sky-400">Bảng xếp hạng</a>
          </nav>

          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderUpload;