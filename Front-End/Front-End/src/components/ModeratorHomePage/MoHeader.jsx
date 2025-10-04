import React from "react";

const MoHeader = () => {

    return (
        <header className="w-full flex items-center justify-between px-6 py-4 shadow-md fixed
         top-0 z-30 bg-transparent">
            <div className="flex items-center gap-3 flex-shrink-0">
                <a
                    href="/ModeratorHomePage" // Link về Dashboard chính
                    title="Trở về Dashboard Quản trị"
                    className="flex items-center gap-3 flex-shrink-0 cursor-pointer"
                >
                    <span
                        className="text-2xl font-black tracking-widest uppercase 
                           text-transparent bg-clip-text 
                           bg-gradient-to-r from-indigo-700 via-rose-300 to-purple-600 
                           drop-shadow-md transition-all duration-300 hover:scale-[1.02]"
                    >
                        INKREALM
                    </span>
                </a>
            </div>
            <nav className="hidden lg:flex items-center gap-10 text-gray-800 font-medium flex-grow justify-center mr-20 text-md dark:text-white">
                <a href="#" className="hover:text-indigo-700 transition duration-150 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-indigo-500 after:transition-all after:duration-300 hover:after:w-full">Về chúng tôi</a>
                <a href="#" className="hover:text-indigo-700 transition duration-150 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-indigo-500 after:transition-all after:duration-300 hover:after:w-full">Chính sách</a>
                <a href="#" className="hover:text-indigo-700 transition duration-150 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-indigo-500 after:transition-all after:duration-300 hover:after:w-full">Quy định</a>
                <a href="#" className="hover:text-indigo-700 transition duration-150 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-indigo-500 after:transition-all after:duration-300 hover:after:w-full">Hỗ trợ</a>
                <a href="#" className="hover:text-indigo-700 transition duration-150 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-indigo-500 after:transition-all after:duration-300 hover:after:w-full">Liên hệ</a>
            </nav>

            {/* User Actions & Profile */}
            <div className="flex items-center gap-4 flex-shrink-0">
                <div
                    className="w-10 h-10 rounded-full 
                        bg-gradient-to-br from-indigo-500 to-purple-600 
                        text-white flex items-center justify-center 
                        font-extrabold text-lg cursor-pointer 
                        shadow-lg shadow-indigo-500/50 
                        transform hover:scale-[1.05] transition duration-300"
                    title="Menu tài khoản">
                    M
                </div>
            </div>
        </header>
    );
};

export default MoHeader;