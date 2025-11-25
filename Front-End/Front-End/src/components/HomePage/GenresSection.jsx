import { useEffect, useState } from "react";
import axios from "axios";
import {
  Crown, Sword, Sparkles, Heart, Rocket, Globe2, Library,
  Building2, Ghost, Coffee, ChevronDown, ChevronUp, MoreHorizontal
} from "lucide-react";

const GENRE_STYLE_MAPPING = {
  "Tu tiên": { 
    icon: Crown, 
    color: "text-amber-500", 
    bg: "bg-amber-100 dark:bg-amber-900/30",
    border: "group-hover:border-amber-500"
  },
  "Cổ trang": { 
    icon: Sword, 
    color: "text-slate-600 dark:text-slate-400", 
    bg: "bg-slate-100 dark:bg-slate-800",
    border: "group-hover:border-slate-500"
  },
  "Fantasy": { 
    icon: Sparkles, 
    color: "text-purple-500", 
    bg: "bg-purple-100 dark:bg-purple-900/30",
    border: "group-hover:border-purple-500"
  },
  "Lãng mạn": { 
    icon: Heart, 
    color: "text-rose-500", 
    bg: "bg-rose-100 dark:bg-rose-900/30",
    border: "group-hover:border-rose-500"
  },
  "Khoa học viễn tưởng": { 
    icon: Rocket, 
    color: "text-cyan-500", 
    bg: "bg-cyan-100 dark:bg-cyan-900/30",
    border: "group-hover:border-cyan-500"
  },
  "Xuyên không": { 
    icon: Globe2, 
    color: "text-emerald-500", 
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    border: "group-hover:border-emerald-500"
  },
  "Đô thị": { 
    icon: Building2, 
    color: "text-blue-500", 
    bg: "bg-blue-100 dark:bg-blue-900/30",
    border: "group-hover:border-blue-500"
  },
  "Kinh dị": { 
    icon: Ghost, 
    color: "text-gray-800 dark:text-gray-200", 
    bg: "bg-gray-200 dark:bg-gray-700",
    border: "group-hover:border-gray-600"
  },
  "Đời thường": {
    icon: Coffee,
    color: "text-orange-500",
    bg: "bg-orange-100 dark:bg-orange-900/30",
    border: "group-hover:border-orange-500"
  }
};

const DEFAULT_STYLE = {
  icon: Library,
  color: "text-indigo-500",
  bg: "bg-indigo-50 dark:bg-indigo-900/20",
  border: "group-hover:border-indigo-300"
};

const GenresSection = () => {
  const [allGenres, setAllGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get("https://be-ink-realm-c7jk.vercel.app/novel/genre/all");
        const allCategories = res.data;
        const flatGenres = allCategories.flatMap(cat => cat.genres);
        
        const sortedGenres = flatGenres.sort((a, b) => {
            const aHasStyle = GENRE_STYLE_MAPPING[a.genreName] ? 1 : 0;
            const bHasStyle = GENRE_STYLE_MAPPING[b.genreName] ? 1 : 0;
            return bHasStyle - aHasStyle;
        });

        setAllGenres(sortedGenres);
      } catch (error) {
        console.error("Lỗi tải thể loại:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, []);

  const visibleGenres = isExpanded ? allGenres : allGenres.slice(0, 9);

  if (loading) return (
    <section className="py-8 px-2 animate-pulse">
       <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
             <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
          ))}
       </div>
    </section>
  );

  return (
    <section className="px-2">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg text-indigo-600 dark:text-indigo-400">
                    <Library className="w-6 h-6" />
                </div>
                <div className="relative">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-none pb-1">
                        Thể loại truyện ({allGenres.length})
                    </h2>
                    <span className="absolute -bottom-1 left-0 w-1/2 h-[3px] bg-indigo-500 rounded-full"></span>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          
          {visibleGenres.map((genre) => {
            const style = GENRE_STYLE_MAPPING[genre.genreName] || DEFAULT_STYLE;
            const Icon = style.icon;

            return (
              <button
                key={genre.genreId}
                className={`group relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-transparent p-4 transition-all duration-300
                            bg-white dark:bg-gray-800 shadow-sm hover:shadow-md hover:-translate-y-1
                            border-gray-50 dark:border-gray-700 ${style.border}`}
              >
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${style.bg.split(' ')[0].replace('100', '500')}`}></div>
                <div className={`w-12 h-12 flex items-center justify-center rounded-full transition-transform group-hover:scale-110 duration-300 ${style.bg} ${style.color}`}>
                   <Icon className="w-6 h-6" strokeWidth={2} />
                </div>
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white z-10 text-center line-clamp-1">
                  {genre.genreName}
                </span>
              </button>
            );
          })}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-4 transition-all duration-300
                       hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:-translate-y-1"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors group-hover:bg-indigo-100 group-hover:text-indigo-600 dark:group-hover:bg-indigo-900 dark:group-hover:text-indigo-400">
               {isExpanded ? <ChevronUp className="w-6 h-6" /> : <MoreHorizontal className="w-6 h-6" />}
            </div>
            <span className="text-sm font-bold text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
               {isExpanded ? "Thu gọn" : "Xem tất cả"}
            </span>
          </button>

        </div>
    </section>
  );
};

export default GenresSection;