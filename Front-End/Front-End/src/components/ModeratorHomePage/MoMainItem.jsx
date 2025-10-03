import React, { useState, useEffect } from "react";
import bgmoderator from "../../assets/bgmoderator.png"; // Hình nền 1
import bgmoderator2 from "../../assets/bgmoderator2.png"; // Hình nền 2
import bgmoderator4 from "../../assets/bgmoderator4.png"; // Hình nền 4

import { LuSquareMenu } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa";
import {
    HiOutlineClipboardList, HiOutlineUserGroup, HiOutlineExclamationCircle,
    HiOutlineCheckCircle, HiOutlineBan, HiOutlineSparkles,
} from "react-icons/hi";

const MoMainItem = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [currentBackground, setCurrentBackground] = useState(bgmoderator4); // Hình nền mặc định
    const backgrounds = React.useMemo(() => [bgmoderator2, bgmoderator, bgmoderator4], []); // Danh sách hình nền

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBackground((prev) => {
                const currentIndex = backgrounds.indexOf(prev);
                const nextIndex = (currentIndex + 1) % backgrounds.length;
                return backgrounds[nextIndex];
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [backgrounds]);


    return (

        <div>

            <div className="absolute left-6 top-27 z-40">
                <button
                    aria-label="Open moderator menu"
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-3 rounded-full bg-white shadow-lg border border-gray-100 
                           hover:shadow-indigo-300/50 hover:border-indigo-500 transition duration-300 scale-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                                           hover:bg-indigo-200 text-base font-semibold transition"
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
                            className="block px-3 py-2 rounded-lg hover:bg-green-300 font-medium text-gray-700"
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

            <main
                className="flex-1 flex items-center justify-center relative text-center px-6 min-h-screen"
                style={{
                    backgroundImage: `url(${currentBackground})`, // Hình ảnh HD
                    backgroundSize: "cover", // Đảm bảo hình ảnh bao phủ toàn bộ màn hình
                    backgroundPosition: "center", // Căn giữa hình ảnh
                    backgroundRepeat: "no-repeat", // Không lặp lại hình ảnh
                    imageRendering: "auto", // Hiển thị hình ảnh sắc nét
                }}
            >
                <div className="absolute inset-0 bg-black/55"></div>

                <div className="relative z-10 max-w-4xl text-gray-100 py-20">
                    <h1 className="text-5xl md:text-5xl font-extrabold mb-4">Trạm Quản Trị Nội Dung <span className="text-blue-700 font-bold">InkRealm</span></h1>
                    <p className="text-lg md:text-xl leading-relaxed mb-8">
                        Chào mừng bạn — moderator! <br /> Tại đây bạn có thể <span className="font-bold text-yellow-400">phê duyệt, đánh giá, theo dõi và xử lý báo cáo kịp thời</span> nhằm đảm bảo nội dung đến với độc giả là an toàn & chất lượng.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="/ModerateOriginalNovels"
                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
                        >
                            Bắt đầu duyệt nội dung
                        </a>
                        <a
                            href="#overview"
                            className="px-6 py-3 bg-white/10 text-gray-100 rounded-lg shadow hover:bg-white/20 transition"
                        >
                            Xem báo cáo & thống kê
                        </a>
                    </div>
                </div>
            </main>

            {/* === Content: detailed explanation, workflow, categories, checklist... === */}
            <section id="overview" className="bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-6 py-16">

                    {/* Role & Workflow */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
                        {/* Vai trò */}
                        <div className="p-6 bg-orange-50 rounded-xl shadow-sm">
                            <p className="text-base text-gray-700 leading-relaxed mb-6">
                                <strong className="font-medium italic">Moderator (Kiểm duyệt viên)</strong> đóng vai trò là cổng kiểm soát nội dung cho toàn bộ hệ thống InkRealm.
                                Bạn chịu trách nhiệm xem xét các tác phẩm,
                                đảm bảo chúng phù hợp với chính sách cộng đồng và tiêu chuẩn chất lượng của nền tảng đã được đề ra.
                            </p>

                            <h4 className="font-bold text-lg text-yellow-800 mb-3">Các Trách Nhiệm Chính:</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-1 gap-4 text-sm text-gray-700">
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
                                    <div>
                                        <strong className="font-medium text-gray-900">Tuân thủ Pháp luật & Quy định</strong>
                                        <p className="text-xs text-gray-500">Ngăn chặn tuyệt đối nội dung vi phạm pháp luật và các quy định cộng đồng nghiêm cấm.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 flex-shrink-0 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2-3 .895-3 2.5 1.343 2 3 2 3 .895 3 2"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6a3 3 0 016 0v13"></path></svg>
                                    <div>
                                        <strong className="font-medium text-gray-900">Xác thực Nguồn gốc & Bản quyền</strong>
                                        <p className="text-xs text-gray-500">Kiểm tra tính hợp pháp, đặc biệt với tác phẩm dịch thuật/fanfic để bảo vệ quyền sở hữu.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 flex-shrink-0 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.276a1.996 1.996 0 011.094 2.846l-2.072 6.216a1 1 0 01-.192.308l-4 4a1 1 0 01-.707.293H7.5a1 1 0 01-.707-.293l-4-4a1 1 0 01-.192-.308l-2.072-6.216a1.996 1.996 0 011.094-2.846 1.996 1.996 0 012.846 1.094L7.5 7.5l-.293-.293a1 1 0 010-1.414l2-2a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-.293.293 1.094-2.846a1.996 1.996 0 012.846-1.094z"></path></svg>
                                    <div>
                                        <strong className="font-medium text-gray-900">Đảm bảo Trải nghiệm Đọc</strong>
                                        <p className="text-xs text-gray-500">Giữ môi trường đọc an toàn, lành mạnh, không có nội dung gây khó chịu hoặc xúc phạm.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 flex-shrink-0 text-amber-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-4a2 2 0 012-2h2a2 2 0 012 2v4"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11V3m0 0l-4 4m4-4l4 4"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    <div>
                                        <strong className="font-medium text-gray-900">Ghi Log & Minh bạch</strong>
                                        <p className="text-xs text-gray-500">Ghi log chi tiết mọi quyết định từ chối hoặc yêu cầu chỉnh sửa để tối đa hóa sự minh bạch.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 flex-shrink-0 text-purple-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.848 5.232a2 2 0 002.304 0L21 8m-7 11V11a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2z"></path></svg>
                                    <div>
                                        <strong className="font-medium text-gray-900">Phản hồi & Hỗ trợ Tác giả</strong>
                                        <p className="text-xs text-gray-500">Cung cấp phản hồi mang tính xây dựng, giúp tác giả hiểu rõ lỗi và cải thiện chất lượng tác phẩm.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 flex-shrink-0 text-teal-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2h2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v2M7 7h10"></path></svg>
                                    <div>
                                        <strong className="font-medium text-gray-900">Quản lý Thể loại & Tag</strong>
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
                                <div className="p-3 bg-yellow-50 rounded-lg shadow-sm">
                                    <h4 className="font-medium text-md text-yellow-700">1. Pending (Chờ Xử Lý)</h4>
                                    <p className="text-sm text-gray-600">
                                        Tác phẩm vừa được tác giả nộp lên. Bài viết nằm trong hàng đợi, chưa có Moderator nào tiếp nhận.
                                    </p>
                                </div>
                            </li>


                            <li className="mb-4 ml-6">
                                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-4 ring-white">
                                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                                </span>
                                <div className="p-3 bg-blue-50 rounded-lg shadow-sm">
                                    <h4 className="font-medium text-md text-blue-700">2. Moderating (Đang Kiểm Tra)</h4>
                                    <p className="text-sm text-gray-600">
                                        Bạn đã tiếp nhận tác phẩm và đang tiến hành kiểm tra chi tiết theo Checklist (Metadata, Nội dung cấm, Bản quyền, Ngôn ngữ...).
                                    </p>
                                </div>
                            </li>


                            <li className="mb-4 ml-6">
                                <span className="absolute flex items-center justify-center w-6 h-6 bg-green-100 rounded-full -left-3 ring-4 ring-white">
                                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                </span>
                                <div className="p-3 bg-green-50 rounded-lg shadow-sm">
                                    <h4 className="font-medium text-md text-green-700">3. Approved (Đã Duyệt)</h4>
                                    <p className="text-sm text-gray-600">
                                        Nội dung đạt chuẩn. Tác phẩm được chuyển sang bộ phận biên tập hoặc chờ hệ thống lên lịch xuất bản.
                                    </p>
                                </div>
                            </li>

                            <li className="mb-4 ml-6">
                                <span className="absolute flex items-center justify-center w-6 h-6 bg-red-100 rounded-full -left-3 ring-4 ring-white">
                                    <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </span>
                                <div className="p-3 bg-red-50 rounded-lg shadow-sm">
                                    <h4 className="font-medium text-md text-red-700">4. Rejected (Từ Chối)</h4>
                                    <p className="text-sm text-gray-600">
                                        Tác phẩm vi phạm quy định. Bắt buộc phải kèm theo lý do rõ ràng và chi tiết để tác giả có thể chỉnh sửa.
                                    </p>
                                </div>
                            </li>

                            {/* Step 5: Published */}
                            <li className="ml-6">
                                <span className="absolute flex items-center justify-center w-6 h-6 bg-indigo-100 rounded-full -left-3 ring-4 ring-white">
                                    <svg className="w-3 h-3 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path></svg>
                                </span>
                                <div className="p-3 bg-indigo-50 rounded-lg shadow-sm">
                                    <h4 className="font-medium text-md text-indigo-700">5. Published (Xuất Bản)</h4>
                                    <p className="text-sm text-gray-600">
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
                        <div className="p-6 bg-green-50 rounded-xl shadow-sm font-medium">
                            <div className="flex items-center gap-3 mb-4">
                                <HiOutlineExclamationCircle className="w-7 h-7 text-green-600" />
                                <h3 className="text-lg font-bold text-green-700">Ưu tiên xử lý</h3>
                            </div>
                            <p className="text-base text-gray-700 leading-relaxed mb-6">
                                Moderator cần phân loại mức độ khẩn cấp để đảm bảo các nội dung tiềm ẩn rủi ro hoặc quan trọng về mặt cộng đồng được xử lý trước, tránh ảnh hưởng đến trải nghiệm chung.
                            </p>

                            <div className="flex flex-col gap-3 text-sm">
                                {/* Priority 1: Reported (Highest Priority) */}
                                <div className="flex justify-between items-center p-3 bg-red-100 rounded-lg border border-red-300">
                                    <span className="font-medium text-red-800 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.368 17c-.77 1.333.192 3 1.732 3z"></path></svg>
                                        Mức 01 (Khẩn Cấp): Bài Bị Báo Cáo Vi Phạm Nghiêm Trọng
                                    </span>
                                </div>

                                {/* Priority 2: System Flagged */}
                                <div className="flex justify-between items-center p-3 bg-orange-100 rounded-lg border border-orange-300">
                                    <span className="font-medium text-orange-800 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                                        Mức 02 (Hệ Thống): Nội dung bị AI/Hệ thống Flag
                                    </span>
                                </div>

                                {/* Priority 3: Financial/Premium */}
                                <div className="flex justify-between items-center p-3 bg-purple-100 rounded-lg border border-purple-300">
                                    <span className="font-medium text-purple-800 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2v-4a2 2 0 10-4 0v4m4 0a2 2 0 10-4 0v4m4-4a2 2 0 10-4 0"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        Mức 03 (Tài Chính): Bài dành cho Tác giả trả phí / Truyện Premium
                                    </span>
                                </div>

                                {/* Priority 4: Long Pending */}
                                <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                                    <span className="font-medium text-indigo-800 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        Mức 04 (Thời Gian): Bài Pending Lâu Ngày (Quá 48 giờ)
                                    </span>
                                </div>

                                {/* Priority 5: Author History */}
                                <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                                    <span className="font-medium text-amber-800 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.866-2.91 7-6.5 7H6a2 2 0 01-2-2V7a2 2 0 012-2h1.5C8.823 5 10 6.177 10 7.5c0 1.323-1.177 2.5-2.5 2.5H6.5c-1.323 0-2.5 1.177-2.5 2.5s1.177 2.5 2.5 2.5H12"></path></svg>
                                        Mức 05 (Cảnh Báo): Tác Giả Có Lịch Sử Vi Phạm
                                    </span>
                                </div>

                                {/* Priority 6: Trending */}
                                <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                                    <span className="font-medium text-emerald-800 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                        Mức 06 (Thị Trường): Truyện Trending cần tốc độ duyệt
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Checklist & Common Rejects */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        <div className="lg:col-span-2 bg-white rounded-xl p-8 shadow-2xl border border-gray-100">
                            <h4 className="text-xl font-bold mb-6 flex items-center gap-3 text-green-700">
                                <HiOutlineCheckCircle className="w-7 h-7 text-teal-600" />
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
                                        <div className="font-medium text-md">1. Metadata Chính Xác</div>
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
                                        <div className="font-medium text-md text-gray-900">2. Loại Trừ Nội Dung Cấm</div>
                                        <p className="text-xs text-gray-500">Tuyệt đối không có nội dung bạo lực cực đoan, ấu dâm, hoặc nội dung khuyến khích tự hại/phạm pháp.</p>
                                    </div>
                                </li>

                                {/* Check 3: Ngôn ngữ */}
                                <li className="flex items-start gap-4">
                                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full border border-indigo-300">
                                        <HiOutlineSparkles className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-md text-gray-900">3. Ngôn Ngữ Chất Lượng</div>
                                        <p className="text-xs text-gray-500">Đảm bảo không mắc lỗi chính tả nghiêm trọng, không sử dụng ngôn từ thù ghét hoặc xúc phạm.</p>
                                    </div>
                                </li>

                                {/* Check 4: Báo cáo */}
                                <li className="flex items-start gap-4">
                                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-amber-100 text-amber-600 rounded-full border border-amber-300">
                                        <HiOutlineExclamationCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-md text-gray-900">4. Ưu Tiên Kiểm Tra Báo Cáo</div>
                                        <p className="text-xs text-gray-500">Luôn xem xét và xử lý các bài viết đã bị báo cáo từ người dùng một cách ưu tiên và cẩn trọng.</p>
                                    </div>
                                </li>

                                {/* Check 5: Thể loại */}
                                <li className="flex items-start gap-4">
                                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-teal-100 text-teal-600 rounded-full border border-teal-300">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h10M7 11h10M7 15h7"></path></svg>
                                    </div>
                                    <div>
                                        <div className="font-medium text-md text-gray-900">5. Phân Loại Thể Loại Đúng</div>
                                        <p className="text-xs text-gray-500">Bài viết phải được gắn đúng thể loại (Genre) và tag phù hợp, không gây hiểu lầm cho độc giả.</p>
                                    </div>
                                </li>

                                {/* Check 6: Nhất quán */}
                                <li className="flex items-start gap-4">
                                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full border border-blue-300">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <div>
                                        <div className="font-medium text-md text-gray-900">6. Tính Nhất Quán Sơ Khai</div>
                                        <p className="text-xs text-gray-500">Kiểm tra nội dung chương đầu/tóm tắt không bị mâu thuẫn hoặc thiếu logic cơ bản.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Lý do từ chối phổ biến */}
                        <aside className="bg-white rounded-xl p-6 shadow-md">

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
                            <p className="text-xs text-gray-500 mt-4">
                                Khi từ chối, hãy cung cấp <strong className="text-bold">lý do rõ ràng</strong> và gợi ý chỉnh sửa để tác giả có thể cải thiện nội dung.
                            </p>
                        </aside>
                    </div>
                    {/* Categories */}
                    <div className="mt-16">
                        <h3 className="text-xl font-bold mb-8 text-gray-900">📖Chi Tiết Kiểm Duyệt Theo Từng Thể Loại Truyện</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                            {/* Truyện sáng tác */}
                            <article className="p-5 bg-white rounded-xl shadow-lg border-t-4 border-indigo-500 hover:shadow-xl transition-shadow duration-200">
                                <div className="flex items-start gap-3">
                                    <div className="p-3 bg-indigo-100 rounded-lg flex-shrink-0">
                                        <HiOutlineSparkles className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-800">Truyện Sáng Tác</h4>
                                        <p className="text-sm text-gray-600 mt-1">Kiểm tra độ nguyên bản, không copy từ nguồn khác. Chú ý văn phong và logic nội dung cốt truyện.</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-indigo-100 text-xs text-indigo-700 italic font-medium bg-indigo-50 p-2 rounded-md">
                                    Tip: Luôn đọc vài chương đầu để kiểm tra phong cách và xác minh nội dung là duy nhất.
                                </div>
                            </article>

                            {/* Truyện dịch */}
                            <article className="p-5 bg-white rounded-xl shadow-lg border-t-4 border-emerald-500 hover:shadow-xl transition-shadow duration-200">
                                <div className="flex items-start gap-3">
                                    <div className="p-3 bg-emerald-100 rounded-lg flex-shrink-0">
                                        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-800">Truyện Dịch</h4>
                                        <p className="text-sm text-gray-600 mt-1">Phải có dẫn chứng nguồn gốc, tên tác giả gốc. Kiểm tra chất lượng dịch, nghiêm cấm dịch máy kém.</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-emerald-100 text-xs text-emerald-700 italic font-medium bg-emerald-50 p-2 rounded-md">
                                    Tip: So sánh ngẫu nhiên vài đoạn với bản gốc nếu có để đánh giá độ chính xác.
                                </div>
                            </article>

                            {/* Fanfiction */}
                            <article className="p-5 bg-white rounded-xl shadow-lg border-t-4 border-pink-500 hover:shadow-xl transition-shadow duration-200">
                                <div className="flex items-start gap-3">
                                    <div className="p-3 bg-pink-100 rounded-lg flex-shrink-0">
                                        <HiOutlineUserGroup className="w-6 h-6 text-pink-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-800">Fanfiction</h4>
                                        <p className="text-sm text-gray-600 mt-1">Chú ý bản quyền nhân vật, vũ trụ gốc. Nội dung không được bôi nhọ hay xuyên tạc tiêu cực.</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-pink-100 text-xs text-pink-700 italic font-medium bg-pink-50 p-2 rounded-md">
                                    Tip: Kiểm tra disclaimers (tuyên bố từ chối trách nhiệm) phi thương mại.
                                </div>
                            </article>

                            {/* Ngôn tình / Lãng mạn */}
                            <article className="p-5 bg-white rounded-xl shadow-lg border-t-4 border-yellow-500 hover:shadow-xl transition-shadow duration-200">
                                <div className="flex items-start gap-3">
                                    <div className="p-3 bg-yellow-100 rounded-lg flex-shrink-0">
                                        <HiOutlineClipboardList className="w-6 h-6 text-yellow-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-800">Ngôn tình / Lãng mạn</h4>
                                        <p className="text-sm text-gray-600 mt-1">Cảnh người lớn (nếu có) cần được cảnh báo rõ. Chỉ duyệt khi có yếu tố consent (tự nguyện).</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-yellow-100 text-xs text-yellow-700 italic font-medium bg-yellow-50 p-2 rounded-md">
                                    Tip: Không duyệt cảnh tình dục với nhân vật chưa đủ tuổi hoặc có dấu hiệu cưỡng bức.
                                </div>
                            </article>

                            {/* Tiên hiệp */}
                            <article className="p-5 bg-white rounded-xl shadow-lg border-t-4 border-purple-500 hover:shadow-xl transition-shadow duration-200">
                                <div className="flex items-start gap-3">
                                    <div className="p-3 bg-purple-100 rounded-lg flex-shrink-0">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-800">Tiên Hiệp</h4>
                                        <p className="text-sm text-gray-600 mt-1">Chú ý yếu tố tu luyện, đạo pháp. Tránh nội dung cổ súy mê tín cực đoan hoặc phản khoa học.</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-purple-100 text-xs text-purple-700 italic font-medium bg-purple-50 p-2 rounded-md">
                                    Tip: Ưu tiên sáng tác có hệ thống tu luyện/logic rõ ràng, không mập mờ.
                                </div>
                            </article>

                            {/* Huyền Huyễn */}
                            <article className="p-5 bg-white rounded-xl shadow-lg border-t-4 border-teal-500 hover:shadow-xl transition-shadow duration-200">
                                <div className="flex items-start gap-3">
                                    <div className="p-3 bg-teal-100 rounded-lg flex-shrink-0">
                                        <HiOutlineSparkles className="w-6 h-6 text-teal-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-800">Huyền Huyễn</h4>
                                        <p className="text-sm text-gray-600 mt-1">Cảnh phép thuật, thế giới khác cần hợp lý trong bối cảnh. Không để yếu tố kỳ thị hay phân biệt chủng tộc.</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-teal-100 text-xs text-teal-700 italic font-medium bg-teal-50 p-2 rounded-md">
                                    Tip: Soát kỹ phần miêu tả thế giới (world-building) và văn hóa giả tưởng.
                                </div>
                            </article>

                            {/* Trinh thám */}
                            <article className="p-5 bg-white rounded-xl shadow-lg border-t-4 border-red-500 hover:shadow-xl transition-shadow duration-200">
                                <div className="flex items-start gap-3">
                                    <div className="p-3 bg-red-100 rounded-lg flex-shrink-0">
                                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-800">Trinh Thám / Hình Sự</h4>
                                        <p className="text-sm text-gray-600 mt-1">Cần logic chặt chẽ, không để lỗ hổng phá án vô lý. Nội dung bạo lực cần được kiểm soát và dán nhãn.</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-red-100 text-xs text-red-700 italic font-medium bg-red-50 p-2 rounded-md">
                                    Tip: Đọc kỹ các đoạn giải thích vụ án và motive (động cơ) của nhân vật.
                                </div>
                            </article>

                            {/* Hài hước */}
                            <article className="p-5 bg-white rounded-xl shadow-lg border-t-4 border-orange-500 hover:shadow-xl transition-shadow duration-200">
                                <div className="flex items-start gap-3">
                                    <div className="p-3 bg-orange-100 rounded-lg flex-shrink-0">
                                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-800">Hài Hước</h4>
                                        <p className="text-sm text-gray-600 mt-1">Không bôi nhọ cá nhân, sắc tộc, tôn giáo. Nội dung phải phù hợp cho đa số độc giả (General Audience).</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-orange-100 text-xs text-orange-700 italic font-medium bg-orange-50 p-2 rounded-md">
                                    Tip: Loại bỏ yếu tố tục tĩu hoặc châm biếm chính trị nhạy cảm.
                                </div>
                            </article>

                            {/* Kinh dị */}
                            <article className="p-5 bg-white rounded-xl shadow-lg border-t-4 border-gray-900 hover:shadow-xl transition-shadow duration-200">
                                <div className="flex items-start gap-3">
                                    <div className="p-3 bg-gray-200 rounded-lg flex-shrink-0">
                                        <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 21h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-800">Kinh Dị</h4>
                                        <p className="text-sm text-gray-600 mt-1">Phải gắn nhãn cảnh báo rõ ràng. Tránh chi tiết quá máu me, tra tấn hoặc gây ám ảnh bệnh hoạn.</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-gray-700 italic font-medium bg-gray-100 p-2 rounded-md">
                                    Tip: Không duyệt nội dung mang tính khủng bố hoặc bạo lực phi nhân tính.
                                </div>
                            </article>

                            {/* Siêu anh hùng */}
                            <article className="p-5 bg-white rounded-xl shadow-lg border-t-4 border-blue-500 hover:shadow-xl transition-shadow duration-200">
                                <div className="flex items-start gap-3">
                                    <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                                        <HiOutlineUserGroup className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-800">Siêu Anh Hùng</h4>
                                        <p className="text-sm text-gray-600 mt-1">Nội dung mang tính phiêu lưu, hành động. Không sao chép cốt truyện/nhân vật từ Marvel/DC.</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-blue-100 text-xs text-blue-700 italic font-medium bg-blue-50 p-2 rounded-md">
                                    Tip: Kiểm tra độ sáng tạo và độc đáo của siêu năng lực/thế giới.
                                </div>
                            </article>

                            {/* Đô thị */}
                            <article className="p-5 bg-white rounded-xl shadow-lg border-t-4 border-green-500 hover:shadow-xl transition-shadow duration-200">
                                <div className="flex items-start gap-3">
                                    <div className="p-3 bg-green-100 rounded-lg flex-shrink-0">
                                        <HiOutlineClipboardList className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-800">Đô Thị</h4>
                                        <p className="text-sm text-gray-600 mt-1">Cần thực tế, phản ánh xã hội hiện đại. Không khuyến khích bạo lực, xã hội đen một cách không kiểm soát.</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-green-100 text-xs text-green-700 italic font-medium bg-green-50 p-2 rounded-md">
                                    Tip: Chú ý tính giáo dục và văn minh trong cách giải quyết mâu thuẫn.
                                </div>
                            </article>

                            {/* Game / Hệ thống */}
                            <article className="p-5 bg-white rounded-xl shadow-lg border-t-4 border-cyan-500 hover:shadow-xl transition-shadow duration-200">
                                <div className="flex items-start gap-3">
                                    <div className="p-3 bg-cyan-100 rounded-lg flex-shrink-0">
                                        <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-4 4m0 0l-4-4m4 4V3"></path></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-800">Game / Hệ thống</h4>
                                        <p className="text-sm text-gray-600 mt-1">Có yếu tố nhập vai, trò chơi. Nội dung phải hợp lý, không hack cheat vô lý làm hỏng logic.</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-cyan-100 text-xs text-cyan-700 italic font-medium bg-cyan-50 p-2 rounded-md">
                                    Tip: Soát lại logic lên cấp/skill để đảm bảo sự nhất quán trong cơ chế trò chơi.
                                </div>
                            </article>

                            {/* Đấu trường / Cạnh tranh */}
                            <article className="p-5 bg-white rounded-xl shadow-lg border-t-4 border-rose-500 hover:shadow-xl transition-shadow duration-200">
                                <div className="flex items-start gap-3">
                                    <div className="p-3 bg-rose-100 rounded-lg flex-shrink-0">
                                        <HiOutlineSparkles className="w-6 h-6 text-rose-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-800">Đấu Trường / Cạnh Tranh</h4>
                                        <p className="text-sm text-gray-600 mt-1">Thường liên quan đến chiến đấu, giải đấu. Tránh bạo lực thái quá.</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-rose-100 text-xs text-rose-700 italic font-medium bg-rose-50 p-2 rounded-md">
                                    Tip: Kiểm tra mạch hành động rõ ràng, có mục tiêu cạnh tranh lành mạnh.
                                </div>
                            </article>

                            {/* Đại lục giả tưởng */}
                            <article className="p-5 bg-white rounded-xl shadow-lg border-t-4 border-sky-500 hover:shadow-xl transition-shadow duration-200">
                                <div className="flex items-start gap-3">
                                    <div className="p-3 bg-sky-100 rounded-lg flex-shrink-0">
                                        <HiOutlineUserGroup className="w-6 h-6 text-cyan-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-800">Đại Lục Giả Tưởng</h4>
                                        <p className="text-sm text-gray-600 mt-1">Thế giới riêng cần có quy tắc. Không copy thế giới nổi tiếng có sẵn (Middle-earth, Westeros).</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-sky-100 text-xs text-sky-700 italic font-medium bg-sky-50 p-2 rounded-md">
                                    Tip: Chú ý bản đồ, setting rõ ràng và độc đáo của đại lục.
                                </div>
                            </article>

                            {/* Khoa học viễn tưởng */}
                            <article className="p-5 bg-white rounded-xl shadow-lg border-t-4 border-blue-700 hover:shadow-xl transition-shadow duration-200">
                                <div className="flex items-start gap-3">
                                    <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                                        <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 12h2m10 0h2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z"></path></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-800">Khoa Học Viễn Tưởng</h4>
                                        <p className="text-sm text-gray-600 mt-1">Nội dung liên quan đến công nghệ, tương lai. Kiểm tra tính logic trong các yếu tố khoa học được đề cập.</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-blue-200 text-xs text-blue-800 italic font-medium bg-blue-50 p-2 rounded-md">
                                    Tip: Đảm bảo sự nhất quán trong việc áp dụng các quy tắc công nghệ/vũ trụ giả tưởng.
                                </div>
                            </article>

                            {/* Lịch sử hoang tưởng */}
                            <article className="p-5 bg-white rounded-xl shadow-lg border-t-4 border-yellow-700 hover:shadow-xl transition-shadow duration-200">
                                <div className="flex items-start gap-3">
                                    <div className="p-3 bg-yellow-100 rounded-lg flex-shrink-0">
                                        <HiOutlineClipboardList className="w-6 h-6 text-yellow-700" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-800">Lịch Sử Hoang Tưởng</h4>
                                        <p className="text-sm text-gray-600 mt-1">Dựa trên lịch sử nhưng có yếu tố giả tưởng. Không xuyên tạc lịch sử quá mức gây phản cảm/phẫn nộ.</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-yellow-200 text-xs text-yellow-800 italic font-medium bg-yellow-50 p-2 rounded-md">
                                    Tip: Cân bằng giữa yếu tố hư cấu và tôn trọng các sự kiện lịch sử cốt lõi.
                                </div>
                            </article>

                            {/* Thêm các thể loại còn lại vào đây để hoàn thiện */}

                            {/* Truyện Cổ Tích */}
                            <article className="p-5 bg-white rounded-xl shadow-lg border-t-4 border-pink-700 hover:shadow-xl transition-shadow duration-200">
                                <div className="flex items-start gap-3">
                                    <div className="p-3 bg-pink-100 rounded-lg flex-shrink-0">
                                        <svg className="w-6 h-6 text-pink-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21h.01M17 17l-5-5M17 17l-5 5M7 17h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-800">Truyện Cổ Tích</h4>
                                        <p className="text-sm text-gray-600 mt-1">Nội dung mang tính giáo dục, có yếu tố thần tiên, phép thuật. Mục đích là giải trí lành mạnh.</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-pink-200 text-xs text-pink-800 italic font-medium bg-pink-50 p-2 rounded-md">
                                    Tip: Đảm bảo nội dung phù hợp với trẻ em, không có yếu tố tiêu cực/kinh dị.
                                </div>
                            </article>

                            {/* Truyện Tâm Lý */}
                            <article className="p-5 bg-white rounded-xl shadow-lg border-t-4 border-purple-700 hover:shadow-xl transition-shadow duration-200">
                                <div className="flex items-start gap-3">
                                    <div className="p-3 bg-purple-100 rounded-lg flex-shrink-0">
                                        <HiOutlineUserGroup className="w-6 h-6 text-purple-700" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-800">Truyện Tâm Lý</h4>
                                        <p className="text-sm text-gray-600 mt-1">Tập trung vào cảm xúc, tâm lý nhân vật và mâu thuẫn nội tâm. Cần có sự sâu sắc.</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-purple-200 text-xs text-purple-800 italic font-medium bg-purple-50 p-2 rounded-md">
                                    Tip: Đảm bảo nội dung không gây ảnh hưởng tiêu cực (kích động tự hại) đến tâm lý người đọc.
                                </div>
                            </article>

                            {/* Truyện Trưởng Thành */}
                            <article className="p-5 bg-white rounded-xl shadow-lg border-t-4 border-green-700 hover:shadow-xl transition-shadow duration-200">
                                <div className="flex items-start gap-3">
                                    <div className="p-3 bg-green-100 rounded-lg flex-shrink-0">
                                        <HiOutlineCheckCircle className="w-6 h-6 text-green-700" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-800">Truyện Trưởng Thành</h4>
                                        <p className="text-sm text-gray-600 mt-1">Hành trình trưởng thành, học hỏi và phát triển cá nhân của nhân vật chính.</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-green-200 text-xs text-green-800 italic font-medium bg-green-50 p-2 rounded-md">
                                    Tip: Nội dung cần mang tính giáo dục và truyền cảm hứng tích cực.
                                </div>
                            </article>

                            {/* Truyện Truyền Kỳ */}
                            <article className="p-5 bg-white rounded-xl shadow-lg border-t-4 border-indigo-700 hover:shadow-xl transition-shadow duration-200">
                                <div className="flex items-start gap-3">
                                    <div className="p-3 bg-indigo-100 rounded-lg flex-shrink-0">
                                        <svg className="w-6 h-6 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.5l-4 4-4-4"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 17.5l-6-6-6 6"></path></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-800">Truyện Truyền Kỳ</h4>
                                        <p className="text-sm text-gray-600 mt-1">Câu chuyện kỳ bí, huyền thoại, hoặc các sự kiện siêu nhiên. Yếu tố văn hóa, lịch sử.</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-indigo-200 text-xs text-indigo-800 italic font-medium bg-indigo-50 p-2 rounded-md">
                                    Tip: Kiểm tra yếu tố kỳ ảo không quá phi logic so với bối cảnh truyện.
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </section>

        </div>


    );

};

export default MoMainItem;