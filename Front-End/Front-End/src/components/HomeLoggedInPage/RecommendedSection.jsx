import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { 
  Target, 
  BookOpen, 
  Clock, 
  User, 
  Sparkles,
  Zap
} from "lucide-react";
import defaultCover from "../../assets/default-cover.png";

// --- UTILS & HOOKS ---
const formatTimeAgo = (dateString) => {
  if (!dateString) return "Mới đây";
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
const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-3 animate-pulse">
    <div className="w-full aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-lg mb-3"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
    <div className="mt-4 pt-2 border-t border-gray-100 dark:border-gray-700 flex gap-2">
        <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  </div>
);

const RecommendedCard = ({ novel }) => {
  const [imgSrc, setImgSrc] = useState(novel.novel_img_url);
  const { count, latestTime, loading } = useNovelStats(novel.novelId);

  return (
    <Link 
      to={`/BookDetail/${novel.novelId}`} 
      className="group relative flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative w-full aspect-[2/3] overflow-hidden">
        <img
          src={imgSrc && imgSrc.trim() !== "" ? imgSrc : defaultCover}
          alt={novel.novelTitle}
          onError={() => setImgSrc(defaultCover)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        <div className="absolute top-2 left-2">
            <span className="bg-red-500/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> HOT
            </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>

        <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
             <span className="text-[10px] font-bold text-white bg-white/20 px-2 py-0.5 rounded backdrop-blur-md border border-white/10">
                Tiểu thuyết
             </span>
        </div>
      </div>

      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-[15px] font-bold text-gray-900 dark:text-white line-clamp-1 mb-1 group-hover:text-blue-600 transition-colors">
          {novel.novelTitle}
        </h3>
        
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
            <User className="w-3 h-3 mr-1" />
            <span className="truncate max-w-[150px]">{novel.author || "Tác giả ẩn danh"}</span>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 border-t border-gray-100 dark:border-gray-700 pt-3">
            <div className="flex items-center text-xs font-semibold text-gray-600 dark:text-gray-300">
                <BookOpen className="w-3 h-3 mr-1.5 text-blue-500" />
                {loading ? "..." : `${count} Chương`}
            </div>
            <div className="flex items-center justify-end text-xs font-semibold text-gray-600 dark:text-gray-300">
                <Clock className="w-3 h-3 mr-1.5 text-green-500" />
                {loading ? "..." : formatTimeAgo(latestTime)}
            </div>
        </div>
      </div>
    </Link>
  );
};

// --- MAIN COMPONENT ---
function RecommendedSection() {
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        const res = await axios.post(
          "https://be-ink-realm-c7jk.vercel.app/novel/all",
          {},
          { headers: { "Content-Type": "application/json" } }
        );
        
        const shuffled = res.data.sort(() => 0.5 - Math.random());
        setNovels(shuffled.slice(0, 4));

      } catch (error) {
        console.error("Lỗi tải truyện đề cử:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNovels();
  }, []);

  if (!loading && novels.length === 0) return null;

  return (
    <section className="my-12">
      <div className="flex items-center justify-between mb-6 px-1">
        <h2 className="flex items-center text-xl font-bold text-gray-900 dark:text-white gap-2">
          <div className="bg-red-100 dark:bg-red-900/30 p-1.5 rounded-lg">
             <Target className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
          <span className="relative">
            Truyện Đề Cử
            <span className="absolute -bottom-1 left-0 w-1/2 h-[3px] bg-red-500 rounded-full"></span>
          </span>
        </h2>
        
        <Link 
          to="/RecommendedAll" 
          className="group flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full"
        >
          Xem tất cả 
          <Zap className="w-3 h-3 ml-1 transition-transform group-hover:rotate-12" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {loading ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
            novels.map((novel) => (
                <RecommendedCard key={novel.novelId} novel={novel} />
            ))
        )}
      </div>
    </section>
  );
}

export default RecommendedSection;