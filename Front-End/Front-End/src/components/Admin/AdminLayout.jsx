import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../Admin/AdminSideBar";
import { useDarkMode } from "../../pages/DarkModeContext";
import { IoMdSunny } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import inkrealm from "../../assets/inkrealm_logo.png";

const AdminLayout = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLogo(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-300 relative overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Nội dung chính */}
      <main
        className={`flex-1 transition-all duration-300 p-8 ${
          isCollapsed ? "ml-[80px]" : "ml-[250px]"
        } relative`}
      >
        {/* Logo overlay */}
        {showLogo && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 z-50 transition-opacity duration-700">
            <img
              src={inkrealm}
              alt="Inkrealm Logo"
              className="w-64 h-64 object-contain animate-pulse"
            />
          </div>
        )}

        {/* Nội dung trang (luôn hiển thị) */}
        <Outlet />
      </main>

      {/* Nút Dark Mode */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full dark:bg-gray-700 border border-gray-200 
                   dark:border-gray-600 hover:scale-110 transform transition 
                   fixed top-4 right-2 bg-white shadow-md z-[100]"
      >
        {darkMode ? (
          <IoMdSunny className="text-yellow-300 w-6 h-6" />
        ) : (
          <MdDarkMode className="text-blue-700 w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default AdminLayout;
