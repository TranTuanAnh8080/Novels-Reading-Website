import React, { useState, useEffect } from 'react';
// Giả định bạn đã import các icon này từ thư viện (ví dụ: react-icons)
import { HiOutlineMenu, HiOutlinePencilAlt, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineClock, HiOutlineEye } from 'react-icons/hi';
import { HiOutlineSparkles } from 'react-icons/hi';
import MoHeader from '../components/ModeratorHomePage/MoHeader';
import Footer from '../components/Footer';

import { LuSquareMenu } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa";
import { IoMenuOutline } from 'react-icons/io5';
import { CheckCircle } from 'lucide-react';

const ModerateTranslatedNovels = () => {

    // --- Dữ liệu giả định và StatusTab Component (Giữ nguyên) ---
    const mockData = [
        { id: 2001, content: "Chương 1: Khởi đầu mới tại học viện", author: "Tác giả ẩn danh", date: "2025-10-02", description: "Truyện sáng tác, phong cách ngôn tình. Cần kiểm tra lỗi chính tả/văn phong.", status: "Approved" },
        { id: 2002, content: "Chương 15: Bí mật của Long Thần", author: "Bắc Phong", date: "2025-10-01", description: "Truyện bị nghi ngờ đạo văn (plagiarism). Đang trong quá trình so sánh.", status: "Moderating" },
        { id: 2003, content: "Chương 3: Hành trình tu tiên", author: "Vũ Thiên", date: "2025-09-28", description: "Văn phong sơ sài, quá nhiều lỗi ngữ pháp. Đã từ chối và gửi gợi ý chỉnh sửa.", status: "Rejected" },
        { id: 2004, content: "Chương 50: Hôn lễ thế kỷ", author: "Hạ Du", date: "2025-09-25", description: "Truyện đạt chất lượng tốt, đã xuất bản. Theo dõi tương tác độc giả.", status: "Published" },
        { id: 2005, content: "Chương 2: Lời nguyền cổ xưa", author: "Tác giả ẩn danh", date: "2025-10-03", description: "Chương mới, cần check nội dung nhạy cảm theo quy định cộng đồng.", status: "Pending" },
    ];

    // Component cho từng tab trạng thái
    const StatusTab = ({ label, count, color, isActive, onClick }) => (
        <button
            onClick={onClick}
            // Loại bỏ shadow từ đây, sẽ có shadow khi active
            className={`flex items-center justify-center 
                    min-w-[100px] px-4 py-2 rounded-lg 
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
            case 'Pending': return (<button className="px-3 py-1 text-sm font-semibold rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition flex items-center gap-1"><HiOutlinePencilAlt className="w-4 h-4" /> Bắt đầu duyệt</button>);
            case 'Moderating': return (<button className="px-3 py-1 text-sm font-semibold rounded-md bg-indigo-500 text-white hover:bg-indigo-600 transition flex items-center gap-1"><HiOutlineEye className="w-4 h-4" /> Tiếp tục duyệt</button>);
            case 'Rejected': return (<button className="px-3 py-1 text-sm font-semibold rounded-md bg-red-500 text-white hover:bg-red-600 transition flex items-center gap-1"><HiOutlineXCircle className="w-4 h-4" /> Xem Lý do</button>);
            case 'Approved': case 'Published': return (<span className="text-green-600 font-medium">Hoàn tất</span>);
            default: return null;
        }
    };


    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Header */}
            <MoHeader />

            <div className="absolute left-6 top-27 z-40">
                <button
                    aria-label="Open moderator menu"
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-3 rounded-full bg-white shadow-lg border border-gray-100 
               hover:shadow-indigo-300/50 hover:border-indigo-300 transition duration-300"
                >

                    <LuSquareMenu size={24} className="text-indigo-600 w-6 h-6" />
                </button>

                {menuOpen && (
                    <div className="mt-4 w-64 bg-white/95 backdrop-blur-sm 
                        shadow-2xl rounded-xl p-4 
                        text-gray-700 font-medium 
                        border border-gray-100 animate-fadeIn">

                        {/* Mục 1: Kiểm duyệt Nội dung (Đã tối ưu) */}
                        <div>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                // Thêm gap-2 và làm cho button rõ ràng hơn
                                className="flex items-center justify-between w-full px-3 py-2 rounded-lg 
                               hover:bg-indigo-50/70 text-base font-semibold transition"
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
                                       transition duration-150 flex items-center gap-3"
                                    >
                                        <span className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0"></span>
                                        Truyện Sáng Tác
                                    </a>
                                    {/* Truyện Dịch */}
                                    <a
                                        href="/ModerateTranslatedNovels"
                                        className="px-3 py-2 rounded-lg hover:bg-green-100 hover:text-green-700 transition duration-150 flex items-center gap-3"
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
                            className="block px-3 py-2 rounded-lg hover:bg-gray-100 font-medium text-gray-700"
                        >
                            Dashboard thống kê
                        </a>
                        <a
                            href="/logout"
                            className="block px-3 py-2 mt-1 rounded-lg text-red-500 font-medium hover:bg-red-50"
                        >
                            Đăng xuất
                        </a>
                    </div>
                )}
            </div>

            {/* Nội dung chính: Áp dụng padding tại đây */}
            <div className="flex-grow p-6 sm:p-10">
                {/* Thanh tiêu đề chính */}
                <header className="flex items-center justify-center mb-8">
                    <h2 className="text-4xl font-medium italic flex items-center gap-3 mr-4">
                        <p className="w-8 h-8 text-indigo-600" />
                        Trạm Kiểm Soát Bản Thảo Ngoại
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
                        color={{ bgActive: "bg-green-500", textActive: "text-white", bgInactive: "bg-green-200", textInactive: "text-green-800", bgHover: "bg-green-200", ring: "ring-green-500" }}
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

                {/* Bảng Dữ liệu Chính */}
                <div className="bg-white rounded-xl shadow-xl overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">

                        <thead className="bg-gray-50">
                            <tr>
                                {['ID', 'NỘI DUNG', 'TÁC GIẢ', 'NGÀY TẠO', 'MÔ TẢ', 'TRẠNG THÁI', 'HÀNH ĐỘNG'].map((header) => (
                                    <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-bold
                                     text-gray-500 uppercase tracking-wider">{header}</th>
                                ))}
                            </tr>
                        </thead>

                        {/*  */}
                        <tbody className="bg-white divide-y divide-gray-100">
                            {filteredData.length > 0 ? (
                                filteredData.map((item) => {
                                    const statusInfo = statusColors[item.status] || statusColors.Pending;
                                    return (<tr key={item.id} className="hover:bg-indigo-50 transition duration-150"><td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{item.id}</td><td className="px-6 py-4 max-w-xs truncate text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer" title={item.content}><a href={`/moderator/original/${item.id}/edit`}>{item.content}</a></td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.author}</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td><td className="px-6 py-4 max-w-sm truncate text-sm text-gray-500" title={item.description}>{item.description}</td><td className="px-6 py-4 whitespace-nowrap"><span className={`px-3 inline-flex text-xs leading-5 font-semibold rounded-full ${statusInfo.bg} ${statusInfo.text} flex items-center gap-1`}><span className={`w-2 h-2 rounded-full ${statusInfo.dot}`}></span>{item.status === 'Pending' ? 'Chờ duyệt' : item.status === 'Moderating' ? 'Đang duyệt' : item.status === 'Approved' ? 'Đã duyệt' : item.status === 'Rejected' ? 'Từ chối' : 'Xuất bản'}</span></td><td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{renderActionButton(item.status, item.id)}</td></tr>);
                                })
                            ) : (
                                <tr><td colSpan="7" className="px-6 py-10 text-center text-gray-700 text-lg font-medium italic">Tuyệt vời! Không còn truyện nào cần xử lý.</td></tr>
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
                            <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">Trước đó</button>
                            {pages.map((page) => (<button key={page} onClick={() => setCurrentPage(page)}
                                aria-current={page === currentPage ? 'page' : undefined}
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20
                             ${page === currentPage ? 'z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'}`}>{page}</button>))}
                            <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">Tiếp theo</button>
                        </nav>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ModerateTranslatedNovels;