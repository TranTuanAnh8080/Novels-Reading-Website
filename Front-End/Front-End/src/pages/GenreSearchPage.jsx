import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderBook from "../components/BookDetailPage/HeaderBook";
import Footer from "../components/SharedComponents/Footer";
import BookCard from "../components/LibraryPage/BookCard";
import { Filter, Search, X, BookOpen } from "lucide-react";

export default function GenreSearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const searchParams = new URLSearchParams(location.search);
  const keywordFromUrl = searchParams.get("keyword") || "";

  const [allCategories, setAllCategories] = useState([]);
  const [selectedGenreIds, setSelectedGenreIds] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get("https://be-ink-realm-c7jk.vercel.app/novel/genre/all");
        setAllCategories(res.data || []);
      } catch (error) {
        console.error("Lỗi lấy danh sách thể loại:", error);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const executeSearch = async () => {
      setLoading(true);
      try {
        let sourceData = [];

        if (selectedGenreIds.length > 0) {
          const genreRes = await axios.post(
            "https://be-ink-realm-c7jk.vercel.app/novel/genre/search",
            { genreList: selectedGenreIds },
            { headers: { "Content-Type": "application/json" } }
          );
          sourceData = genreRes.data || [];
        } else {
          const allRes = await axios.post(
            "https://be-ink-realm-c7jk.vercel.app/novel/all",
            {},
            { headers: { "Content-Type": "application/json" } }
          );
          sourceData = allRes.data || [];
        }

        if (keywordFromUrl.trim()) {
          const lowerKeyword = keywordFromUrl.toLowerCase();
          sourceData = sourceData.filter((book) => {
            const titleMatch = book.novelTitle?.toLowerCase().includes(lowerKeyword);
            const authorMatch = book.author?.toLowerCase().includes(lowerKeyword);
            return titleMatch || authorMatch;
          });
        }

        setResults(sourceData);

      } catch (error) {
        console.error("Lỗi tìm kiếm:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(() => {
      executeSearch();
    }, 300);

    return () => clearTimeout(timeout);
  }, [selectedGenreIds, keywordFromUrl]);

  const toggleGenre = (id) => {
    setSelectedGenreIds((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const clearAllFilters = () => {
    setSelectedGenreIds([]);
    navigate("/Search"); 
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
      <HeaderBook isLoggedIn={localStorage.getItem("isLoggedIn") === "true"} />

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Search className="w-6 h-6 text-blue-600" />
                {keywordFromUrl 
                    ? `Kết quả tìm kiếm cho: "${keywordFromUrl}"`
                    : "Khám phá kho truyện"
                }
            </h1>
            {keywordFromUrl && (
                <p className="text-gray-500 text-sm mt-1 dark:text-gray-400">
                    Tìm thấy {results.length} kết quả phù hợp
                </p>
            )}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <Filter className="w-5 h-5 text-blue-600" /> Thể loại
                </h2>
                {(selectedGenreIds.length > 0 || keywordFromUrl) && (
                  <button 
                    onClick={clearAllFilters}
                    className="text-xs text-red-500 hover:underline flex items-center font-medium"
                  >
                    Xóa bộ lọc <X className="w-3 h-3 ml-1"/>
                  </button>
                )}
              </div>

              {initialLoading ? (
                <div className="text-sm text-gray-400 text-center py-4">Đang tải thể loại...</div>
              ) : (
                <div className="space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
                  {allCategories.map((category) => (
                    <div key={category.categoryId}>
                      <h3 className="font-bold text-gray-700 dark:text-gray-300 text-xs mb-2 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-1">
                        {category.categoryName}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {category.genres.map((genre) => {
                          const isSelected = selectedGenreIds.includes(genre.genreId);
                          return (
                            <button
                              key={genre.genreId}
                              onClick={() => toggleGenre(genre.genreId)}
                              className={`px-3 py-1 text-xs rounded-full border transition-all duration-200 font-medium
                                ${isSelected
                                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200 dark:shadow-none"
                                  : "bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                                }`}
                            >
                              {genre.genreName}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>

          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                 {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-xl h-[320px] animate-pulse border border-gray-100 dark:border-gray-700">
                        <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-xl w-full"></div>
                        <div className="p-4 space-y-3">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                        </div>
                    </div>
                 ))}
              </div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {results.map((book) => (
                  <div key={book.novelId || book._id} className="h-full">
                      <BookCard book={book} /> 
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-center min-h-[400px]">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Không tìm thấy truyện nào
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md">
                  {keywordFromUrl 
                    ? `Không có kết quả nào cho từ khóa "${keywordFromUrl}".` 
                    : "Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm."}
                </p>
                <button 
                    onClick={clearAllFilters}
                    className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/30"
                >
                    Xóa hết bộ lọc
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}