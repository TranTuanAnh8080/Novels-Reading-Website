import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { 
  Search, 
  BookOpen, 
  Clock, 
  User, 
  Filter, 
  Zap,
  LayoutGrid,
  List
} from "lucide-react"; 
import HeaderLoggedIn from "../components/HomeLoggedInPage/HeaderLoggedIn";
import Footer from "../components/SharedComponents/Footer";

// --- UTILS & HOOKS ---
const formatTimeAgo = (dateString) => {
  if (!dateString) return "Mới lên";
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " năm";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " tháng";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " ngày";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " giờ";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " phút";
  return "Vừa xong";
};

const useNovelStats = (novelId) => {
  const [stats, setStats] = useState({ count: 0, latestTime: null, loading: true });

  useEffect(() => {
    if (!novelId) return;
    const fetchStats = async () => {
      try {
        const res = await axios.get(`https://be-ink-realm-c7jk.vercel.app/chapter/list/${novelId}`);
        if (res.data && res.data.chapters && res.data.chapters.length > 0) {
          const chapters = res.data.chapters;
          setStats({
            count: chapters.length,
            latestTime: chapters[chapters.length - 1].createDate,
            loading: false
          });
        } else {
            setStats({ count: 0, latestTime: null, loading: false });
        }
      } catch (error) {
        setStats({ count: 0, latestTime: null, loading: false });
      }
    };
    fetchStats();
  }, [novelId]);

  return stats;
};

// --- COMPONENTS ---
const NovelCard = ({ novel, index }) => {
  const [imgSrc, setImgSrc] = useState(novel.novel_img_url);
  const { count, latestTime, loading } = useNovelStats(novel.novelId);

  return (
    <Link 
      to={`/BookDetail/${novel.novelId}`} 
      className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 flex flex-col h-full relative"
    >
      {index < 3 && (
        <div className="absolute top-0 left-0 bg-yellow-400 text-black text-xs font-bold px-2 py-1 z-20 rounded-br-lg shadow-sm">
           #{index + 1}
        </div>
      )}

      <div className="relative w-full aspect-[2/3] overflow-hidden bg-gray-100">
        <img
          src={imgSrc && imgSrc.trim() !== "" ? imgSrc : defaultCover}
          alt={novel.novelTitle}
          onError={() => setImgSrc(defaultCover)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
        
        <div className="absolute bottom-2 left-2 flex gap-1">
            <span className="text-[10px] font-bold text-white bg-blue-600/90 px-2 py-0.5 rounded backdrop-blur-sm">
                Tiểu thuyết
            </span>
            {latestTime && (
                <span className="text-[10px] font-bold text-white bg-green-600/90 px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Mới
                </span>
            )}
        </div>
      </div>

      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-[15px] font-bold text-gray-900 dark:text-white line-clamp-1 mb-1 group-hover:text-blue-600 transition-colors" title={novel.novelTitle}>
          {novel.novelTitle}
        </h3>

        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
            <User className="w-3 h-3 mr-1" />
            <span className="truncate">{novel.author || "Đang cập nhật"}</span>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 border-t border-gray-100 dark:border-gray-700 pt-3">
            <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase font-semibold">Chương</span>
                <div className="flex items-center text-xs font-bold text-gray-700 dark:text-gray-300">
                    <BookOpen className="w-3 h-3 mr-1 text-blue-500" />
                    {loading ? "..." : count}
                </div>
            </div>

            <div className="flex flex-col pl-2 border-l border-gray-100 dark:border-gray-700">
                <span className="text-[10px] text-gray-400 uppercase font-semibold">Cập nhật</span>
                <div className="flex items-center text-xs font-bold text-gray-700 dark:text-gray-300">
                    <Clock className="w-3 h-3 mr-1 text-green-500" />
                    {loading ? "..." : formatTimeAgo(latestTime)}
                </div>
            </div>
        </div>
      </div>
    </Link>
  );
};

const SkeletonGrid = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {Array.from({ length: 10 }).map((_, i) => (
      <div key={i} className="bg-white rounded-xl border border-gray-200 p-3 h-80 animate-pulse">
        <div className="w-full aspect-[2/3] bg-gray-200 rounded-lg mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);

// --- MAIN PAGE ---
export default function RecommendedAll() {
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchNovels = async () => {
      try {
        const res = await axios.post(
          "https://be-ink-realm-c7jk.vercel.app/novel/all",
          {},
          { headers: { "Content-Type": "application/json" } }
        );
        const sorted = res.data.sort((a, b) => b.novelId - a.novelId);
        setNovels(sorted);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNovels();
  }, []);

  const filteredNovels = novels.filter((n) =>
    n.novelTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col font-sans dark:bg-gray-900">
      <HeaderLoggedIn />
      <div className="flex-grow w-full max-w-[1320px] mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                    <LayoutGrid className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Kho Truyện Đồ Sộ</h1>
                    <p className="text-sm text-gray-500">Cập nhật {novels.length} đầu truyện mới nhất</p>
                </div>
            </div>

            <div className="flex w-full md:w-auto gap-3">
                <div className="relative flex-grow md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Tìm kiếm truyện, tác giả..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                </div>
                
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                    <Filter className="w-4 h-4" />
                    <span className="hidden sm:inline">Lọc</span>
                </button>
            </div>
        </div>

        {loading ? (
          <SkeletonGrid />
        ) : filteredNovels.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {filteredNovels.map((novel, index) => (
              <NovelCard key={novel.novelId} novel={novel} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
             <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-gray-400">
                 <Search className="w-10 h-10" />
             </div>
             <h3 className="text-lg font-bold text-gray-700">Không tìm thấy truyện</h3>
             <p className="text-gray-500">Thử tìm kiếm với từ khóa khác xem sao.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}