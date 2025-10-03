import React from "react";
import inkrealmLogo from "../../assets/inkrealm_logo.png";

const MoHeader = () => {

    return (
        <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md 
        sticky top-0 z-30 border-gray-50">
            <div className="flex items-center gap-3 flex-shrink-0">
                <a
                    href="/ModeratorHomePage"
                    title="Trở về Dashboard Quản trị"
                    className="block"
                >
                    <img
                        src={inkrealmLogo}
                        alt="InkRealm Logo"
                        className="w-36 h-12 object-contain cursor-pointer" // Thêm cursor-pointer để tăng UX
                    />
                </a>
            </div>
            <nav className="hidden lg:flex items-center gap-10 text-gray-800 font-medium flex-grow justify-center mr-20 text-md">
                <a href="#" className="hover:text-indigo-600 transition duration-150 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-indigo-500 after:transition-all after:duration-300 hover:after:w-full">Về chúng tôi</a>
                <a href="#" className="hover:text-indigo-600 transition duration-150 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-indigo-500 after:transition-all after:duration-300 hover:after:w-full">Chính sách</a>
                <a href="#" className="hover:text-indigo-600 transition duration-150 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-indigo-500 after:transition-all after:duration-300 hover:after:w-full">Quy định</a>
                <a href="#" className="hover:text-indigo-600 transition duration-150 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-indigo-500 after:transition-all after:duration-300 hover:after:w-full">Hỗ trợ</a>
                <a href="#" className="hover:text-indigo-600 transition duration-150 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-indigo-500 after:transition-all after:duration-300 hover:after:w-full">Liên hệ</a>
            </nav>

            {/* User Actions & Profile */}
            <div className="flex items-center gap-4 flex-shrink-0">

                {/* Avatar/Profile - Thiết kế lại với Gradient nhẹ */}
                <div
                    className="w-10 h-10 rounded-full 
                        bg-gradient-to-br from-indigo-500 to-purple-600 
                        text-white flex items-center justify-center 
                        font-extrabold text-lg cursor-pointer 
                        shadow-lg shadow-indigo-500/50 
                        transform hover:scale-[1.05] transition duration-300"
                    title="Menu tài khoản"
                >
                    M
                </div>
            </div>
        </header>
    );
};

export default MoHeader;