import React, { useState, useEffect } from 'react';
// Giả định bạn đã import các icon này từ thư viện (ví dụ: react-icons)
import { HiOutlineMenu, HiOutlinePencilAlt, HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineBan, HiOutlineXCircle, HiOutlineClock, HiOutlineEye } from 'react-icons/hi';
import { HiOutlineSparkles } from 'react-icons/hi';
import MoHeader from '../components/ModeratorHomePage/MoHeader';
import Footer from '../components/Footer';
import { LuSquareMenu } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa";
import { Search, ChevronDown } from 'lucide-react';

import { useDarkMode } from "../pages/DarkModeContext";
import { IoMdSunny } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";

// --- Dữ liệu giả định và StatusTab Component (Giữ nguyên) ---
const mockData = [
    // ... dữ liệu của bạn ...
    { id: 2001, content: "Chương 1: Khởi đầu mới tại học viện", author: "Tác giả ẩn danh", date: "2025-10-02", description: "Truyện sáng tác, phong cách ngôn tình. Cần kiểm tra lỗi chính tả/văn phong.", status: "Pending" },
    { id: 2002, content: "Chương 15: Bí mật của Long Thần", author: "Bắc Phong", date: "2025-10-01", description: "Truyện bị nghi ngờ đạo văn (plagiarism). Đang trong quá trình so sánh.", status: "Moderating" },
    { id: 2003, content: "Chương 3: Hành trình tu tiên", author: "Vũ Thiên", date: "2025-09-28", description: "Văn phong sơ sài, quá nhiều lỗi ngữ pháp. Đã từ chối và gửi gợi ý chỉnh sửa.", status: "Rejected" },
    { id: 2004, content: "Chương 50: Hôn lễ thế kỷ", author: "Hạ Du", date: "2025-09-25", description: "Truyện đạt chất lượng tốt, đã xuất bản. Theo dõi tương tác độc giả.", status: "Published" },
    { id: 2005, content: "Chương 2: Lời nguyền cổ xưa", author: "Tác giả ẩn danh", date: "2025-10-03", description: "Chương mới, cần check nội dung nhạy cảm theo quy định cộng đồng.", status: "Approved" },
];

// Component cho từng tab trạng thái
const StatusTab = ({ label, count, color, isActive, onClick }) => (
    <button
        onClick={onClick}
        // Loại bỏ shadow từ đây, sẽ có shadow khi active
        className={`flex items-center justify-center 
                    min-w-[100px] px-4 py-2 rounded-md 
                    font-bold text-sm transition-all duration-200 
                    ${isActive
                ? `${color.bgActive} ${color.textActive} ring-2 ${color.ring} ring-offset-2 shadow-lg` // Thêm shadow khi active
                : `${color.bgInactive} ${color.textInactive} hover:${color.bgHover} hover:shadow-md` // Thêm shadow nhẹ khi hover
            }`}
    >
        {label}
        <span
            className={`ml-2 px-2 py-0.5 text-xs rounded-full 
                        ${isActive ? "bg-white text-gray-800" : "bg-gray-200 text-gray-600"} 
                        font-extrabold shadow-sm`}
        >
            {count}
        </span>
    </button>
);

const ModerateOriginalNovels = () => {

    const { darkMode, setDarkMode } = useDarkMode();


    // Khai báo state cho tìm kiếm và sắp xếp
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('latest'); // Mặc định sắp xếp theo mới nhất

    const [activeTab, setActiveTab] = useState('Pending');
    const [currentPage, setCurrentPage] = useState(1);

    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // ... (logic statusCounts, filteredData, renderActionButton, statusColors, pages giữ nguyên) ...
    const statusCounts = { Pending: 1, Moderating: 2, Approved: 3, Rejected: 4, Published: 5 };
    const filteredData = mockData.filter(item => activeTab === 'Pending' ? item.status === 'Pending' || item.status === 'Moderating' : item.status === activeTab);
    const statusColors = { Pending: { text: "text-yellow-700", bg: "bg-yellow-100", dot: "bg-yellow-500" }, Moderating: { text: "text-indigo-700", bg: "bg-indigo-100", dot: "bg-indigo-500" }, Approved: { text: "text-green-700", bg: "bg-green-100", dot: "bg-green-500" }, Rejected: { text: "text-red-700", bg: "bg-red-100", dot: "bg-red-500" }, Published: { text: "text-blue-700", bg: "bg-blue-100", dot: "bg-blue-500" }, };
    const totalPages = 5;
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const renderActionButton = (status, id) => {
        switch (status) {
            case 'Pending': return (<button className="px-3 py-1 text-sm font-semibold rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition flex items-center gap-1">
                <HiOutlinePencilAlt className="w-4 h-4" /> Bắt đầu duyệt</button>);
            case 'Moderating': return (<button className="px-3 py-1 text-sm font-semibold rounded-md bg-indigo-500 text-white hover:bg-indigo-600 transition flex items-center gap-1">
                <HiOutlineEye className="w-4 h-4" /> Tiếp tục duyệt</button>);
            case 'Approved': return (<button className="px-3 py-1 text-sm font-semibold rounded-md bg-green-500 text-white hover:bg-green-600 transition flex items-center gap-1">
                <HiOutlineCheckCircle className="w-4 h-4" /> Chuẩn bị xuất bản</button>);
            case 'Rejected': return (<button className="px-3 py-1 text-sm font-semibold rounded-md bg-red-500 text-white hover:bg-red-600 transition flex items-center gap-1">
                <HiOutlineXCircle className="w-4 h-4" /> Xem Lý do</button>);
            case 'Published': return (<button className="px-3 py-1 text-sm font-semibold rounded-md bg-blue-500 text-white hover:bg-blue-600 transition flex items-center gap-1">
                <HiOutlineCheckCircle className="w-4 h-4" />Đã hoàn thành</button>);
            default: return null;
        }
    };

    // Bắt đầu thay đổi: div ngoài cùng chỉ dùng flex và min-h
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <MoHeader />

            <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full dark:bg-gray-700 
                               border border-gray-200 dark:border-gray-600
                              hover:scale-110 transform transition fixed top-50 right-2 m-4 bg-white"
                aria-label="Toggle Dark Mode"
            >
                {darkMode ? (
                    <IoMdSunny className="text-yellow-300 w-6 h-6" />
                ) : (
                    <MdDarkMode className="text-indigo-700 w-6 h-6 " />
                )}
            </button>

            <div className="absolute left-6 top-27 z-40">
                <button
                    aria-label="Open moderator menu"
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-3 rounded-xl bg-white shadow-lg border border-gray-100 
                                       hover:shadow-indigo-300/50
                                        hover:border-indigo-500 transition duration-300 scale-100 
                                        hover:scale-105 fixed focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:border-indigo-400 dark:focus:ring-indigo-400"
                >

                    <LuSquareMenu size={24} className="text-indigo-600 w-6 h-6" />
                </button>

                {menuOpen && (
                    <div className="w-64 bg-white/95 backdrop-blur-sm 
                                                shadow-2xl rounded-xl p-4 mt-9 ml-5
                                                text-gray-700 font-medium fixed
                                                border border-gray-100 animate-fadeIn dark:bg-gray-800/95 dark:text-gray-700 dark:border-gray-700">

                        {/* Mục 1: Kiểm duyệt Nội dung (Đã tối ưu) */}
                        <div>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                // Thêm gap-2 và làm cho button rõ ràng hơn
                                className="flex items-center justify-between w-full px-3 py-2 rounded-lg 
                                                       hover:bg-indigo-400 text-base font-semibold transition dark:text-white"
                            >
                                Kiểm duyệt nội dung
                                <FaChevronDown
                                    size={12} // Icon nhỏ gọn hơn
                                    className={`ml-2 transition transform ${dropdownOpen ? "rotate-180 text-indigo-600" : "text-gray-400"}`}
                                />
                            </button>
                            {dropdownOpen && (
                                <div className="pl-2 mt-2 flex flex-col gap-1 text-sm font-medium">
                                    {/* Truyện Sáng Tác */}
                                    <a
                                        href="/ModerateOriginalNovels"
                                        className="px-3 py-2 rounded-lg hover:bg-indigo-100 hover:text-indigo-700
                                                               transition duration-150 dark:text-white flex items-center gap-3"
                                    >
                                        <span className="w-2 h-2  bg-indigo-500 rounded-full flex-shrink-0"></span>
                                        Truyện Sáng Tác
                                    </a>
                                    {/* Truyện Dịch */}
                                    <a
                                        href="/ModerateTranslatedNovels"
                                        className="px-3 py-2 rounded-lg dark:text-white hover:bg-green-100 hover:text-green-700 transition duration-150 flex items-center gap-3"
                                    >
                                        {/* Đổi màu chấm tròn cho dễ phân biệt */}
                                        <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                                        Truyện Dịch
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Thêm đường phân cách tinh tế */}
                        <div className="border-t border-gray-100 my-2"></div>

                        {/* Các mục khác */}
                        <a
                            href="#overview"
                            className="block dark:text-white px-3 py-2 rounded-lg hover:bg-green-300 font-medium text-gray-700"
                        >
                            Dashboard thống kê
                        </a>
                        <a
                            href="/logout"
                            className="block px-3 py-2 mt-1 rounded-lg text-red-500 font-medium hover:bg-red-300"
                        >
                            Đăng xuất
                        </a>
                    </div>
                )}
            </div>
            {/* Nội dung chính: Áp dụng padding tại đây */}
            <div className="flex-grow p-6 sm:p-10 mt-20">
                {/* Thanh tiêu đề chính */}
                <header className="flex items-center justify-center mb-8">
                    <h2 className="text-4xl font-medium italic flex items-center gap-3 mr-4 bg-gradient-to-r 
                       from-indigo-600 via-purple-600 to-pink-500 
                       text-transparent bg-clip-text">
                        <p className="w-8 h-8 text-indigo-600" />
                        Trạm Phát Hành Truyện Sáng Tác
                    </h2>
                </header>

                {/* Status Tabs Navigation */}
                <div className="flex flex-wrap gap-3 mb-8 justify-center"> {/* Đổi gap-4 thành gap-3 cho gọn hơn */}
                    <StatusTab
                        label="Chờ Duyệt"
                        count={statusCounts.Pending}
                        color={{ bgActive: "bg-yellow-500", textActive: "text-white", bgInactive: "bg-yellow-100", textInactive: "text-yellow-800", bgHover: "bg-yellow-200", ring: "ring-yellow-500" }}
                        isActive={activeTab === 'Pending'}
                        onClick={() => setActiveTab('Pending')}
                    />
                    <StatusTab
                        label="Đang Duyệt"
                        count={statusCounts.Moderating}
                        color={{ bgActive: "bg-indigo-500", textActive: "text-white", bgInactive: "bg-indigo-200", textInactive: "text-indigo-800", bgHover: "bg-indigo-200", ring: "ring-indigo-500" }}
                        isActive={activeTab === 'Moderating'}
                        onClick={() => setActiveTab('Moderating')}
                    />
                    <StatusTab
                        label="Đã Duyệt"
                        count={statusCounts.Approved}
                        color={{ bgActive: "bg-green-500", textActive: "text-white", bgInactive: "bg-green-100", textInactive: "text-green-800", bgHover: "bg-green-200", ring: "ring-green-500" }}
                        isActive={activeTab === 'Approved'}
                        onClick={() => setActiveTab('Approved')}
                    />
                    <StatusTab
                        label="Từ Chối"
                        count={statusCounts.Rejected}
                        color={{ bgActive: "bg-red-500", textActive: "text-white", bgInactive: "bg-red-100", textInactive: "text-red-800", bgHover: "bg-red-200", ring: "ring-red-500" }}
                        isActive={activeTab === 'Rejected'}
                        onClick={() => setActiveTab('Rejected')}
                    />
                    <StatusTab
                        label="Đã Xuất bản"
                        count={statusCounts.Published}
                        color={{ bgActive: "bg-blue-500", textActive: "text-white", bgInactive: "bg-blue-100", textInactive: "text-blue-800", bgHover: "bg-blue-200", ring: "ring-blue-500" }}
                        isActive={activeTab === 'Published'}
                        onClick={() => setActiveTab('Published')}
                    />
                </div>

                {/* --- BỘ LỌC VÀ TÌM KIẾM MỚI --- */}
                <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 p-4">

                    {/* 1. Thanh Tìm Kiếm (Search Input) */}
                    <div className="relative w-full sm:w-2/5 md:w-1/3 flex items-center dark:text-white ">
                        <Search className="absolute left-3 w-4 h-5 dark:text-white text-gray-400" />
                        <input
                            className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                                  focus:ring-indigo-500 focus:border-indigo-500 
                                    transition duration-150 text-sm
                                    text-gray-900 dark:text-white 
                                    placeholder-gray-400 dark:placeholder-gray-300"
                            type="text"
                            placeholder="Tìm kiếm theo Tên truyện hoặc Tác giả..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* 2. Bộ lọc Sắp xếp (Sort Dropdown) */}
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                        <label htmlFor="sort-by" className="text-sm dark:text-white font-bold text-gray-700 whitespace-nowrap">
                            Sắp xếp theo:
                        </label>
                        <div className="relative">
                            <select
                                id="sort-by"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none block w-full bg-white border border-gray-300 
                                rounded-xl shadow-sm pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer transition duration-150"
                            >
                                <option value="latest">Ngày tạo (Mới nhất)</option>
                                <option value="oldest">Ngày tạo (Cũ nhất)</option>
                                <option value="chapter-count">Số chương (Nhiều nhất)</option>
                                <option value="writer">Tác giả</option>
                                <option value="last-activity">Hoạt động gần nhất</option>
                            </select>
                            {/* Icon mũi tên tùy chỉnh để thay thế appearance-none */}
                            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Bảng Dữ liệu Chính */}
                <div className="bg-white rounded-xs shadow-md overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">

                        <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr>
                                {['ID', 'NỘI DUNG', 'TÁC GIẢ', 'NGÀY TẠO', 'MÔ TẢ', 'TRẠNG THÁI', 'HÀNH ĐỘNG'].map((header) => (
                                    <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-bold
                                    dark:text-white  text-gray-500uppercase tracking-wider">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100 dark:text-white dark:bg-gray-800">
                            {filteredData.length > 0 ? (
                                filteredData.map((item) => {
                                    const statusInfo = statusColors[item.status] || statusColors.Pending;
                                    return (<tr key={item.id} className="hover:bg-indigo-50  transition duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{item.id}</td>
                                        <td className="px-6 py-4 max-w-xs truncate text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer" title={item.content}>
                                            <a href={`/moderator/original/${item.id}/edit`}>{item.content}</a>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.author}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                                        <td className="px-6 py-4 max-w-sm truncate text-sm text-gray-500" title={item.description}>{item.description}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 inline-flex text-xs leading-5 font-semibold rounded-full ${statusInfo.bg} ${statusInfo.text} flex items-center gap-1`}>
                                                <span className={`w-2 h-2 rounded-full ${statusInfo.dot}`}></span>
                                                {item.status === 'Pending' ? 'Chờ duyệt' : item.status === 'Moderating' ? 'Đang duyệt' : item.status === 'Approved' ? 'Đã duyệt' : item.status === 'Rejected' ? 'Từ chối' : 'Xuất bản'}</span></td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{renderActionButton(item.status)}</td>

                                    </tr>);
                                })
                            ) : (
                                <tr><td colSpan="7" className="px-6 py-10 text-center dark:text-white text-gray-700 
                                text-lg font-medium italic">Tuyệt vời! Không còn truyện nào cần xử lý.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Phân trang */}
                <div className="mt-8 flex items-center justify-between max-w-screen px-4 py-3 sm:px-6">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Trước đó</button>
                        <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Tiếp theo</button>
                    </div>

                    {/* ... (Phần phân trang cho màn hình lớn giữ nguyên) ... */}
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400
                             ring-1 ring-inset ring-gray-300 hover:bg-gray-50 
                              dark:text-white focus:z-20 focus:outline-offset-0">Trước đó</button>
                            {pages.map((page) => (<button key={page} onClick={() => setCurrentPage(page)}
                                aria-current={page === currentPage ? 'page' : undefined}
                                className={`relative inline-flex dark:text-white items-center px-4 py-2 text-sm font-semibold focus:z-20
                             ${page === currentPage ? 'z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : 'text-gray-900 ring-1 ring-inset ring-gray-300 dark:hover:bg-indigo-700 hover:bg-gray-200 focus:outline-offset-0'}`}>{page}</button>))}
                            <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300
                             hover:bg-gray-50 focus:z-20 focus:outline-offset-0
                              dark:text-white">Tiếp theo</button>
                        </nav>
                    </div>
                </div>
            </div>



            {/* Phần giới thiệu vai trò Moderator & Workflow */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* Role & Workflow */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
                    {/* Vai trò */}
                    <div className="p-6 bg-orange-50 rounded-xl shadow-sm dark:bg-gray-800">
                        <p className="text-base text-gray-700 leading-relaxed mb-6 dark:text-white">
                            <strong className="font-medium italic">Moderator (Kiểm duyệt viên)</strong> đóng vai trò là cổng kiểm soát nội dung cho toàn bộ hệ thống InkRealm.
                            Bạn chịu trách nhiệm xem xét các tác phẩm,
                            đảm bảo chúng phù hợp với chính sách cộng đồng và tiêu chuẩn chất lượng của nền tảng đã được đề ra.
                        </p>

                        <h4 className="font-bold text-lg text-yellow-800 mb-3 dark:text-yellow-300">Các Trách Nhiệm Chính:</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-1 gap-4 text-sm text-gray-700">
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
                                <div>
                                    <strong className="font-medium text-gray-900 dark:text-white">Tuân thủ Pháp luật & Quy định</strong>
                                    <p className="text-xs text-gray-500">Ngăn chặn tuyệt đối nội dung vi phạm pháp luật và các quy định cộng đồng nghiêm cấm.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 flex-shrink-0 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2-3 .895-3 2.5 1.343 2 3 2 3 .895 3 2"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6a3 3 0 016 0v13"></path></svg>
                                <div>
                                    <strong className="font-medium text-gray-900 dark:text-white">Xác thực Nguồn gốc & Bản quyền</strong>
                                    <p className="text-xs text-gray-500">Kiểm tra tính hợp pháp, đặc biệt với tác phẩm dịch thuật/fanfic để bảo vệ quyền sở hữu.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 flex-shrink-0 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.276a1.996 1.996 0 011.094 2.846l-2.072 6.216a1 1 0 01-.192.308l-4 4a1 1 0 01-.707.293H7.5a1 1 0 01-.707-.293l-4-4a1 1 0 01-.192-.308l-2.072-6.216a1.996 1.996 0 011.094-2.846 1.996 1.996 0 012.846 1.094L7.5 7.5l-.293-.293a1 1 0 010-1.414l2-2a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-.293.293 1.094-2.846a1.996 1.996 0 012.846-1.094z"></path></svg>
                                <div>
                                    <strong className="font-medium text-gray-900 dark:text-white">Đảm bảo Trải nghiệm Đọc</strong>
                                    <p className="text-xs text-gray-500">Giữ môi trường đọc an toàn, lành mạnh, không có nội dung gây khó chịu hoặc xúc phạm.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 flex-shrink-0 text-amber-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-4a2 2 0 012-2h2a2 2 0 012 2v4"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11V3m0 0l-4 4m4-4l4 4"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                <div>
                                    <strong className="font-medium text-gray-900  dark:text-white">Ghi Log & Minh bạch</strong>
                                    <p className="text-xs text-gray-500">Ghi log chi tiết mọi quyết định từ chối hoặc yêu cầu chỉnh sửa để tối đa hóa sự minh bạch.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 flex-shrink-0 text-purple-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.848 5.232a2 2 0 002.304 0L21 8m-7 11V11a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2z"></path></svg>
                                <div>
                                    <strong className="font-medium text-gray-900  dark:text-white">Phản hồi & Hỗ trợ Tác giả</strong>
                                    <p className="text-xs text-gray-500">Cung cấp phản hồi mang tính xây dựng, giúp tác giả hiểu rõ lỗi và cải thiện chất lượng tác phẩm.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 flex-shrink-0 text-teal-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2h2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v2M7 7h10"></path></svg>
                                <div>
                                    <strong className="font-medium text-gray-900 dark:text-white">Quản lý Thể loại & Tag</strong>
                                    <p className="text-xs text-gray-500">Đảm bảo việc phân loại thể loại và gắn tag chính xác, giúp độc giả dễ dàng tìm kiếm.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Workflow */}
                    <ol className="relative border-l border-gray-200 ml-4 space-y-6">
                        <li className="mb-4 ml-6">
                            <span className="absolute flex items-center justify-center w-6 h-6 bg-yellow-100 rounded-full -left-3 ring-4 ring-white">
                                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                            </span>
                            <div className="p-3 bg-yellow-50 rounded-lg shadow-sm dark:bg-gray-800">
                                <h4 className="font-medium text-md text-yellow-700 dark:text-yellow-300">1. Pending (Chờ Xử Lý)</h4>
                                <p className="text-sm text-gray-600 dark:text-white">
                                    Tác phẩm vừa được tác giả nộp lên. Bài viết nằm trong hàng đợi, chưa có Moderator nào tiếp nhận.
                                </p>
                            </div>
                        </li>


                        <li className="mb-4 ml-6">
                            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-4 ring-white">
                                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                            </span>
                            <div className="p-3 bg-blue-50 rounded-lg shadow-sm dark:bg-gray-800">
                                <h4 className="font-medium text-md text-blue-700 dark:text-blue-400">2. Moderating (Đang Kiểm Tra)</h4>
                                <p className="text-sm text-gray-600 dark:text-white">
                                    Bạn đã tiếp nhận tác phẩm và đang tiến hành kiểm tra chi tiết theo Checklist (Metadata, Nội dung cấm, Bản quyền, Ngôn ngữ...).
                                </p>
                            </div>
                        </li>


                        <li className="mb-4 ml-6">
                            <span className="absolute flex items-center justify-center w-6 h-6 bg-green-100  rounded-full -left-3 ring-4 ring-white">
                                <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            </span>
                            <div className="p-3 bg-green-50 rounded-lg shadow-sm dark:bg-gray-800">
                                <h4 className="font-medium text-md text-green-700 dark:text-green-400">3. Approved (Đã Duyệt)</h4>
                                <p className="text-sm text-gray-600 dark:text-white">
                                    Nội dung đạt chuẩn. Tác phẩm được chuyển sang bộ phận biên tập hoặc chờ hệ thống lên lịch xuất bản.
                                </p>
                            </div>
                        </li>

                        <li className="mb-4 ml-6">
                            <span className="absolute flex items-center justify-center w-6 h-6 bg-red-100 rounded-full -left-3 ring-4 ring-white">
                                <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </span>
                            <div className="p-3 bg-red-50 rounded-lg shadow-sm dark:bg-gray-800">
                                <h4 className="font-medium text-md text-red-700 dark:text-red-500">4. Rejected (Từ Chối)</h4>
                                <p className="text-sm text-gray-600 dark:text-white">
                                    Tác phẩm vi phạm quy định. Bắt buộc phải kèm theo lý do rõ ràng và chi tiết để tác giả có thể chỉnh sửa.
                                </p>
                            </div>
                        </li>

                        {/* Step 5: Published */}
                        <li className="ml-6">
                            <span className="absolute flex items-center justify-center w-6 h-6 bg-indigo-100 rounded-full -left-3 ring-4 ring-white">
                                <svg className="w-3 h-3 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path></svg>
                            </span>
                            <div className="p-3 bg-indigo-50 rounded-lg shadow-sm dark:bg-gray-800">
                                <h4 className="font-medium text-md text-indigo-700 dark:text-indigo-400">5. Published (Xuất Bản)</h4>
                                <p className="text-sm text-gray-600 dark:text-white">
                                    Truyện đã chính thức được đăng tải và có thể tiếp cận độc giả trên toàn hệ thống.
                                </p>
                            </div>
                        </li>

                        <div className="mt-6 p-3 border-t border-gray-100">
                            <p className="text-xs text-blue-500 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Tip: Luôn theo dõi timeline trạng thái trong giao diện quản trị để nắm bắt chính xác tiến trình của từng tác phẩm.
                            </p>
                        </div>

                    </ol>



                    {/* Ưu tiên */}
                    <div className="p-6 bg-green-50 rounded-xl shadow-sm font-medium dark:bg-gray-800">
                        <div className="flex items-center gap-3 mb-4">
                            <HiOutlineExclamationCircle className="w-7 h-7 text-green-600 dark:text-green-500" />
                            <h3 className="text-lg font-bold text-green-700 dark:text-green-500">Ưu tiên xử lý</h3>
                        </div>
                        <p className="text-base text-gray-700 leading-relaxed mb-6 dark:text-white">
                            Moderator cần phân loại mức độ khẩn cấp để đảm bảo các nội dung tiềm ẩn rủi ro hoặc quan trọng về mặt cộng đồng được xử lý trước, tránh ảnh hưởng đến trải nghiệm chung.
                        </p>

                        <div className="flex flex-col gap-3 text-sm">
                            {/* Priority 1: Reported (Highest Priority) */}
                            <div className="flex justify-between items-center p-3 bg-red-100 dark:bg-gray-800 rounded-lg border border-red-300">
                                <span className="font-medium text-red-800 flex items-center gap-2 dark:text-red-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.368 17c-.77 1.333.192 3 1.732 3z"></path></svg>
                                    Mức 01 (Khẩn Cấp): Bài Bị Báo Cáo Vi Phạm Nghiêm Trọng
                                </span>
                            </div>

                            {/* Priority 2: System Flagged */}
                            <div className="flex justify-between items-center p-3 bg-orange-100 dark:bg-gray-800 rounded-lg border border-orange-300">
                                <span className="font-medium text-orange-800 flex items-center gap-2 dark:text-orange-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                                    Mức 02 (Hệ Thống): Nội dung bị AI/Hệ thống Flag
                                </span>
                            </div>

                            {/* Priority 3: Financial/Premium */}
                            <div className="flex justify-between items-center p-3 bg-purple-100 dark:bg-gray-800 rounded-lg border border-purple-300">
                                <span className="font-medium text-purple-800 flex items-center gap-2 dark:text-purple-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2v-4a2 2 0 10-4 0v4m4 0a2 2 0 10-4 0v4m4-4a2 2 0 10-4 0"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    Mức 03 (Tài Chính): Bài dành cho Tác giả trả phí / Truyện Premium
                                </span>
                            </div>

                            {/* Priority 4: Long Pending */}
                            <div className="flex justify-between items-center p-3 bg-indigo-50 dark:bg-gray-800 rounded-lg border border-indigo-200">
                                <span className="font-medium text-indigo-800 flex items-center gap-2 dark:text-indigo-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    Mức 04 (Thời Gian): Bài Pending Lâu Ngày (Quá 48 giờ)
                                </span>
                            </div>

                            {/* Priority 5: Author History */}
                            <div className="flex justify-between items-center p-3 bg-amber-50 dark:bg-gray-800 rounded-lg border border-amber-200">
                                <span className="font-medium text-amber-800 flex items-center gap-2 dark:text-amber-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.866-2.91 7-6.5 7H6a2 2 0 01-2-2V7a2 2 0 012-2h1.5C8.823 5 10 6.177 10 7.5c0 1.323-1.177 2.5-2.5 2.5H6.5c-1.323 0-2.5 1.177-2.5 2.5s1.177 2.5 2.5 2.5H12"></path></svg>
                                    Mức 05 (Cảnh Báo): Tác Giả Có Lịch Sử Vi Phạm
                                </span>
                            </div>

                            {/* Priority 6: Trending */}
                            <div className="flex justify-between items-center p-3 bg-emerald-50 dark:bg-gray-800 rounded-lg border border-emerald-200">
                                <span className="font-medium text-emerald-800 flex items-center gap-2 dark:text-emerald-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                    Mức 06 (Thị Trường): Truyện Trending cần tốc độ duyệt
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Checklist & Common Rejects */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 ">
                    <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl p-8 shadow-2xl border border-gray-100">
                        <h4 className="text-xl font-bold mb-6 flex items-center gap-3 text-green-700 dark:text-green-500">
                            <HiOutlineCheckCircle className="w-7 h-7 text-teal-600 dark:text-green-600" />
                            6 Yếu Tố Bắt Buộc Cần Kiểm Tra
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 text-sm text-gray-700">
                            {/* Check 1: Metadata */}
                            <li className="flex items-start gap-4">
                                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center
                                     bg-green-100 text-green-600 rounded-full border border-green-300">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <div>
                                    <div className="font-medium text-md dark:text-white">1. Metadata Chính Xác</div>
                                    <p className="text-xs text-gray-500">Kiểm tra Tiêu đề, Tác giả, Tag, Nguồn gốc phải rõ ràng, trung thực và không bị sai lệch thông tin cơ bản.</p>
                                </div>
                            </li>

                            {/* Check 2: Cấm */}
                            <li className="flex items-start gap-4">
                                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center
                                     bg-red-100 text-red-600 rounded-full border border-red-300">
                                    <HiOutlineBan className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="font-medium text-md text-gray-900 dark:text-white">2. Loại Trừ Nội Dung Cấm</div>
                                    <p className="text-xs text-gray-500">Tuyệt đối không có nội dung bạo lực cực đoan, ấu dâm, hoặc nội dung khuyến khích tự hại/phạm pháp.</p>
                                </div>
                            </li>

                            {/* Check 3: Ngôn ngữ */}
                            <li className="flex items-start gap-4">
                                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full border border-indigo-300">
                                    <HiOutlineSparkles className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="font-medium text-md text-gray-900 dark:text-white">3. Ngôn Ngữ Chất Lượng</div>
                                    <p className="text-xs text-gray-500">Đảm bảo không mắc lỗi chính tả nghiêm trọng, không sử dụng ngôn từ thù ghét hoặc xúc phạm.</p>
                                </div>
                            </li>

                            {/* Check 4: Báo cáo */}
                            <li className="flex items-start gap-4">
                                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-amber-100 text-amber-600 rounded-full border border-amber-300">
                                    <HiOutlineExclamationCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="font-medium text-md text-gray-900 dark:text-white">4. Ưu Tiên Kiểm Tra Báo Cáo</div>
                                    <p className="text-xs text-gray-500">Luôn xem xét và xử lý các bài viết đã bị báo cáo từ người dùng một cách ưu tiên và cẩn trọng.</p>
                                </div>
                            </li>

                            {/* Check 5: Thể loại */}
                            <li className="flex items-start gap-4">
                                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-teal-100 text-teal-600 rounded-full border border-teal-300">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h10M7 11h10M7 15h7"></path></svg>
                                </div>
                                <div>
                                    <div className="font-medium text-md text-gray-900 dark:text-white">5. Phân Loại Thể Loại Đúng</div>
                                    <p className="text-xs text-gray-500">Bài viết phải được gắn đúng thể loại (Genre) và tag phù hợp, không gây hiểu lầm cho độc giả.</p>
                                </div>
                            </li>

                            {/* Check 6: Nhất quán */}
                            <li className="flex items-start gap-4">
                                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full border border-blue-300">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                </div>
                                <div>
                                    <div className="font-medium text-md text-gray-900 dark:text-white">6. Tính Nhất Quán Sơ Khai</div>
                                    <p className="text-xs text-gray-500">Kiểm tra nội dung chương đầu/tóm tắt không bị mâu thuẫn hoặc thiếu logic cơ bản.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Lý do từ chối phổ biến */}
                    <aside className="bg-white rounded-xl p-6 shadow-md dark:bg-gray-900 border border-gray-100">

                        <h4 className="text-xl font-bold mb-6 flex items-center gap-3 text-red-600">
                            <HiOutlineCheckCircle className="w-7 h-7 text-red-600" />
                            Lý do từ chối phổ biến
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            {[
                                "Nội dung nhạy cảm vượt mức cho phép",
                                "Vi phạm bản quyền / nguồn dịch không rõ",
                                "Spam / quảng cáo trá hình",
                                "Ngôn ngữ sơ sài, nhiều lỗi",
                                "Sai thể loại hoặc tag",
                                "Không tuân thủ quy định cộng đồng",
                                "Nội dung không phù hợp với đối tượng độc giả"
                            ].map((reason) => (
                                <span
                                    key={reason}
                                    className="px-3 py-1 text-xs bg-red-50 text-red-700 rounded-full shadow-sm"
                                >
                                    {reason}
                                </span>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-4 dark:text-blue-700">
                            Khi từ chối, hãy cung cấp <strong className="text-bold">lý do rõ ràng</strong> và gợi ý chỉnh sửa để tác giả có thể cải thiện nội dung.
                        </p>
                    </aside>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ModerateOriginalNovels;