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
  { id: 1, name: "Tiên Hiệp", icon: <Crown className="w-5 h-5 text-[#2E5BFF]" /> },
  { id: 2, name: "Kiếm Hiệp", icon: <Sword className="w-5 h-5 text-[#2E5BFF]" /> },
  { id: 3, name: "Huyền Huyễn", icon: <Sparkles className="w-5 h-5 text-[#2E5BFF]" /> },
  { id: 4, name: "Ngôn Tình", icon: <Heart className="w-5 h-5 text-[#2E5BFF]" /> },
  { id: 5, name: "Khoa Huyễn", icon: <Rocket className="w-5 h-5 text-[#2E5BFF]" /> },
  { id: 6, name: "Xuyên Không", icon: <Globe2 className="w-5 h-5 text-[#2E5BFF]" /> },
];

const GenresSection = () => {
  return (
    <section className="py-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            📚 Thể loại truyện
          </h2>
          <button className="text-sm text-[#2E5BFF] hover:underline">
            Xem tất cả
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {genres.map((genre) => (
            <button
              key={genre.id}
              className="flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white h-24 w-full shadow-sm hover:border-indigo-600 hover:bg-indigo-50 transitionflex flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white aspect-[4/3] shadow-sm hover:border-indigo-600 hover:bg-indigo-50 transition"
            >
              {genre.icon}
              <span className="text-sm font-semibold">{genre.name}</span>
            </button>
          ))}
        </div>
    </section>
  );
};

export default GenresSection;
