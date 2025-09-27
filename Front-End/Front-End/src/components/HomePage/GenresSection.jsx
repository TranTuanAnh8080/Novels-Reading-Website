import React from "react";
import {
  BookOpen,
  Sword,
  Sparkles,
  Heart,
  Atom,
  Globe2,
} from "lucide-react";

const genres = [
  { id: 1, name: "Tiên Hiệp", icon: <BookOpen className="w-5 h-5 text-indigo-600" /> },
  { id: 2, name: "Kiếm Hiệp", icon: <Sword className="w-5 h-5 text-indigo-600" /> },
  { id: 3, name: "Huyền Huyễn", icon: <Sparkles className="w-5 h-5 text-indigo-600" /> },
  { id: 4, name: "Ngôn Tình", icon: <Heart className="w-5 h-5 text-indigo-600" /> },
  { id: 5, name: "Khoa Huyễn", icon: <Atom className="w-5 h-5 text-indigo-600" /> },
  { id: 6, name: "Xuyên Không", icon: <Globe2 className="w-5 h-5 text-indigo-600" /> },
];

const GenresSection = () => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span role="img" aria-label="books">
              📚
            </span>
            Thể loại truyện
          </h2>
          <button className="text-sm text-indigo-600 hover:underline">
            Xem tất cả &gt;
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {genres.map((genre) => (
            <button
              key={genre.id}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-3 shadow-sm hover:border-indigo-600 hover:bg-indigo-50 transition"
            >
              {genre.icon}
              <span className="text-sm font-medium">{genre.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GenresSection;
