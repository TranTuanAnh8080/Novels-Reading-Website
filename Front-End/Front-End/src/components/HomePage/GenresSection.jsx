import React from "react";
import {
  Crown,
  Sword,
  Sparkles,
  Heart,
  Rocket,
  Globe2,
} from "lucide-react";

const genres = [
  { id: 1, name: "Tiên Hiệp", icon: <Crown className="w-5 h-5 text-[#2E5BFF] dark:text-blue-400" /> },
  { id: 2, name: "Kiếm Hiệp", icon: <Sword className="w-5 h-5 text-[#2E5BFF] dark:text-blue-400" /> },
  { id: 3, name: "Huyền Huyễn", icon: <Sparkles className="w-5 h-5 text-[#2E5BFF] dark:text-blue-400" /> },
  { id: 4, name: "Ngôn Tình", icon: <Heart className="w-5 h-5 text-[#2E5BFF] dark:text-blue-400" /> },
  { id: 5, name: "Khoa Huyễn", icon: <Rocket className="w-5 h-5 text-[#2E5BFF] dark:text-blue-400" /> },
  { id: 6, name: "Xuyên Không", icon: <Globe2 className="w-5 h-5 text-[#2E5BFF] dark:text-blue-400" /> },
];

const GenresSection = () => {
  const buttonBaseClass = "flex flex-col items-center justify-center gap-2 rounded-lg border aspect-[4/3] shadow-sm transition";
  const buttonLightClass = "border-gray-200 bg-white hover:border-indigo-600 hover:bg-indigo-50";
  const buttonDarkClass = "dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-500 dark:hover:bg-gray-700";

  return (
    <section className="py-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            📚 Thể loại truyện
          </h2>
          <button className="text-sm text-[#2E5BFF] hover:underline dark:text-blue-400">
            Xem tất cả
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {genres.map((genre) => (
            <button
              key={genre.id}
              className={`${buttonBaseClass} ${buttonLightClass} ${buttonDarkClass}`}
            >
              {genre.icon}
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{genre.name}</span>
            </button>
          ))}
        </div>
    </section>
  );
};

export default GenresSection;