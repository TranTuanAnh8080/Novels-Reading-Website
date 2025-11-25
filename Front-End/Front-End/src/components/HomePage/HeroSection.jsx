import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  BookOpen, 
  Clock, 
  User, 
  ArrowRight, 
  Zap, 
  Flame 
} from "lucide-react";
import defaultCover from "../../assets/default-cover.png";

const formatTimeAgo = (dateString) => {
  if (!dateString) return "Mới đăng";
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " năm trước";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " tháng trước";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " ngày trước";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " giờ trước";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " phút trước";
  return "Vừa xong";
};

// --- HOOK LẤY DỮ LIỆU ---
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
const SkeletonHero = () => (
  <div className="w-full animate-pulse my-8">
    <div className="h-64 md:h-80 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-8 w-full"></div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       {[1,2,3,4].map(i => (
         <div key={i} className="flex gap-4 p-4 border border-gray-100 rounded-2xl">
            <div className="w-24 h-36 bg-gray-200 dark:bg-gray-700 rounded-lg shrink-0"></div>
            <div className="flex-1 space-y-3 py-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
         </div>
       ))}
    </div>
  </div>
);

const FeaturedHero = ({ novel }) => {
  const imgSrc = novel.novel_img_url && novel.novel_img_url.trim() !== "" ? novel.novel_img_url : defaultCover;
  const { count, latestTime, loading } = useNovelStats(novel.novelId);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20 mb-10 group border border-gray-100 dark:border-gray-800">
      <div 
        className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40 dark:opacity-20 scale-110 transition-transform duration-1000 group-hover:scale-125"
        style={{ backgroundImage: `url(${imgSrc})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-gray-900 dark:via-gray-900/90 dark:to-transparent"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start p-6 md:p-10 gap-6 md:gap-10">
        <Link to={`/BookDetail/${novel.novelId}`} className="shrink-0 w-40 md:w-48 shadow-2xl rounded-xl overflow-hidden border-4 border-white dark:border-gray-700 transform transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105">
          <img src={imgSrc} alt={novel.novelTitle} className="w-full h-auto object-cover aspect-[2/3]" />
        </Link>

        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
             <span className="inline-flex items-center px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg shadow-red-500/30">
                <Flame className="w-3 h-3 mr-1" fill="currentColor" />
                Đang Hot
             </span>
             <span className="inline-flex items-center px-3 py-1 text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded-full">
                Tiểu thuyết
             </span>
          </div>

          <Link to={`/BookDetail/${novel.novelId}`}>
            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight hover:text-blue-600 transition-colors">
                {novel.novelTitle}
            </h1>
          </Link>
          
          <p className="text-base mb-4 flex items-center justify-center md:justify-start gap-2 text-gray-600 dark:text-gray-300">
             <User className="w-4 h-4" />
             <span className="text-sm">Tác giả:</span>
             <span className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer">
                {novel.author}
             </span>
          </p>
          
          <div className="flex items-center justify-center md:justify-start gap-3 mb-5">
            <div className="flex items-center gap-1.5 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <BookOpen className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{loading ? "..." : `${count} Chương`}</span>
            </div>
            {latestTime && (
                <div className="flex items-center gap-1.5 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{formatTimeAgo(latestTime)}</span>
                </div>
            )}
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-[15px] line-clamp-3 mb-6 max-w-2xl leading-relaxed">
            {novel.novelDescription || "Chưa có mô tả cho truyện này..."}
          </p>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <Link 
              to={`/BookDetail/${novel.novelId}`}
              className="group/btn px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-1 flex items-center gap-2"
            >
              Đọc Ngay <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const RichCard = ({ novel }) => {
  const imgSrc = novel.novel_img_url && novel.novel_img_url.trim() !== "" ? novel.novel_img_url : defaultCover;
  const { count, latestTime, loading } = useNovelStats(novel.novelId);

  return (
    <Link to={`/BookDetail/${novel.novelId}`} className="group flex bg-white dark:bg-gray-800 rounded-2xl p-3 border border-gray-100 dark:border-gray-700 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300">
      <div className="shrink-0 w-24 md:w-28 relative rounded-xl overflow-hidden shadow-sm">
        <img 
            src={imgSrc} 
            alt={novel.novelTitle} 
            className="w-full h-full object-cover aspect-[2/3] transition-transform duration-500 group-hover:scale-110" 
            loading="lazy"
        />
      </div>

      <div className="flex-1 ml-4 flex flex-col justify-between py-1">
        <div>
          <div className="flex justify-between items-start">
             <h3 className="text-[16px] font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                {novel.novelTitle}
             </h3>
             <span className="text-[10px] px-2 py-0.5 bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-md font-bold uppercase tracking-wide shrink-0 ml-2 border border-green-100 dark:border-green-800">
                ĐANG RA
             </span>
          </div>

          <p className="text-xs mt-1.5 font-medium flex items-center gap-1 text-gray-500">
             <User className="w-3 h-3" />
             <span className="group-hover:text-blue-500 transition-colors">{novel.author || "Tác giả"}</span>
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 leading-relaxed">
            {novel.novelDescription}
          </p>
        </div>

        <div className="mt-3 flex items-center gap-4 text-xs border-t border-gray-50 dark:border-gray-700 pt-3">
          <div className="flex items-center text-gray-600 dark:text-gray-300 font-semibold">
             <BookOpen className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> 
             <span>{loading ? "..." : `${count} Chương`}</span>
          </div>
          
          <div className="flex items-center text-gray-500 dark:text-gray-400 font-medium">
             <Clock className="w-3.5 h-3.5 mr-1.5 text-green-500" /> 
             <span>{loading ? "..." : formatTimeAgo(latestTime)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// --- MAIN COMPONENT ---
function HeroSection() {
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
        const sorted = res.data.sort((a, b) => b.novelId - a.novelId);
        setNovels(sorted);
      } catch (error) {
        console.error("Lỗi khi tải danh sách truyện:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNovels();
  }, []);

  if (loading) return <SkeletonHero />;
  if (!novels.length) return null;

  const featuredNovel = novels[0];
  const listNovels = novels.slice(1, 7);

  return (
    <section className="py-10">
      {featuredNovel && <FeaturedHero novel={featuredNovel} />}
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400">
            <Sparkles className="w-6 h-6" fill="currentColor" />
          </div>

          <div className="relative">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-none pb-1">
              Mới Cập Nhật
            </h2>
            <span className="absolute -bottom-1 left-0 w-1/2 h-[3px] bg-blue-500 rounded-full"></span>
          </div>
        </div>
        
        <Link 
          to="/RecommendedAll" 
          className="group flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full"
        >
          Xem tất cả 
          <Zap className="w-3 h-3 ml-1 transition-transform group-hover:rotate-12" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {listNovels.map((novel) => (
          <RichCard key={novel.novelId} novel={novel} />
        ))}
      </div>
    </section>
  );
}

export default HeroSection;