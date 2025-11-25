import { useEffect, useState, useMemo } from "react";
import HeaderProfile from "../components/ProfilePage/HeaderProfile";
import SidebarLibrary from "../components/LibraryPage/SidebarLibrary";
import UploadBookCard from "../components/UploadPage/UploadBookCard";
import { Link } from "react-router-dom";
import Footer from "../components/SharedComponents/Footer";
import axios from "axios";

function UploadPage() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortFilter, setSortFilter] = useState("newest");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchNovels = async () => {
            setIsLoading(true);

            const currentAccountId = sessionStorage.getItem("accountId");

            if (!currentAccountId) {
                console.log("Chưa đăng nhập hoặc hết phiên làm việc");
                setBooks([]); 
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.post(
                    "https://be-ink-realm-c7jk.vercel.app/novel/all"
                );
                
                const allNovels = response.data;

                const myNovels = allNovels.filter(novel => 
                    String(novel.accountId) === String(currentAccountId)
                );

                setBooks(myNovels);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách truyện:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNovels();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [statusFilter, sortFilter]);

    const processedBooks = useMemo(() => {
        let filteredBooks = [...books];

        if (statusFilter !== "all") {
            filteredBooks = filteredBooks.filter(
                (book) => book.status === statusFilter
            );
        }

        switch (sortFilter) {
            case "newest":
                filteredBooks.sort(
                    (a, b) => new Date(b.createDate) - new Date(a.createDate)
                );
                break;
            case "oldest":
                filteredBooks.sort(
                    (a, b) => new Date(a.createDate) - new Date(b.createDate)
                );
                break;
            case "name-az":
                filteredBooks.sort((a, b) => a.novelTitle.localeCompare(b.novelTitle));
                break;
            case "name-za":
                filteredBooks.sort((a, b) => b.novelTitle.localeCompare(a.novelTitle));
                break;
            default:
                break;
        }

        return filteredBooks;
    }, [books, statusFilter, sortFilter]);

    const totalPages = Math.ceil(processedBooks.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBooks = processedBooks.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <HeaderProfile />

            <div className="flex flex-1 max-w-[1600px] mx-auto w-full">
                <SidebarLibrary />

                <main className="flex-1 p-4 md:p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                                Truyện Đã Đăng
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Quản lý tất cả các tác phẩm bạn đã tải lên nền tảng
                            </p>
                        </div>

                        <Link
                            to="/UploadNovel"
                            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-lg hover:bg-blue-700 hover:shadow-blue-500/30 transition-all active:scale-95"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                            Đăng truyện mới
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8 flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                            <div className="relative">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="appearance-none pl-4 pr-10 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer min-w-[160px]"
                                >
                                    <option value="all">Tất cả trạng thái</option>
                                    <option value="completed">Đã hoàn thành</option>
                                    <option value="ongoing">Đang đăng</option>
                                    <option value="pending">Đang xét duyệt</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                </div>
                            </div>

                            <div className="relative">
                                <select
                                    value={sortFilter}
                                    onChange={(e) => setSortFilter(e.target.value)}
                                    className="appearance-none pl-4 pr-10 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer min-w-[160px]"
                                >
                                    <option value="newest">Mới đăng nhất</option>
                                    <option value="oldest">Cũ nhất</option>
                                    <option value="name-az">Tên A-Z</option>
                                    <option value="name-za">Tên Z-A</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                            Hiển thị {processedBooks.length} tác phẩm
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((n) => (
                                <div key={n} className="bg-white dark:bg-gray-800 rounded-xl h-[320px] animate-pulse border border-gray-100 dark:border-gray-700">
                                    <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-xl w-full"></div>
                                    <div className="p-4 space-y-3">
                                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : currentBooks.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentBooks.map((book) => (
                                <div key={book._id || book.novelId} className="transform transition-all duration-300 hover:-translate-y-1">
                                    <UploadBookCard {...book} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Bạn chưa đăng truyện nào</h3>
                            <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                                Hãy bắt đầu sáng tác tác phẩm đầu tiên của bạn ngay hôm nay.
                            </p>
                        </div>
                    )}

                    {!isLoading && processedBooks.length > itemsPerPage && (
                        <div className="flex justify-center mt-10">
                            <nav className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`p-2 rounded-md transition-colors ${
                                        currentPage === 1
                                            ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                                </button>

                                <div className="flex gap-1 px-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-all ${
                                                currentPage === page
                                                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                                                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`p-2 rounded-md transition-colors ${
                                        currentPage === totalPages
                                            ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                                </button>
                            </nav>
                        </div>
                    )}
                </main>
            </div>

            <Footer />
        </div>
    );
}

export default UploadPage;