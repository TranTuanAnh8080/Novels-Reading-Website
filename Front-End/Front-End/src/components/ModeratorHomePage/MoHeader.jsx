import React from "react";
import inkrealmLogo from "../../assets/inkrealm_logo.png";

const MoHeader = () => {

    return (
        <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-lg 
        sticky top-0 z-30 border-b border-gray-100">
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

                {/* Nút Đăng Bài (Call to Action)
                    <button className="hidden sm:inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <svg className="w-5 h-5 mr-1 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        Đăng Truyện
                    </button> */}

                {/* Avatar/Profile - Thêm hiệu ứng hover */}
                <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-lg cursor-pointer ring-2 ring-indigo-500 ring-offset-2 hover:bg-indigo-600 transition duration-200">
                    M
                </div>
            </div>
        </header>
    );
};

export default MoHeader;