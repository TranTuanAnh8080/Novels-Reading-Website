import React from "react";
import { Link } from "react-router-dom";
import { PlusCircle, BookOpen } from "lucide-react";

function UploadBookCard({
  novelId,
  novelTitle,
  author,
  novelDescription,
  novel_img_url,
}) {
  return (
    <div
      className="group relative bg-white rounded-xl shadow-lg overflow-hidden 
                 flex flex-col h-full transform transition-all duration-300
                 hover:shadow-xl hover:scale-[1.02] hover:ring-2 hover:ring-blue-400/50"
    >
      <Link to={`/BookDetail/${novelId}`} className="relative block group">
        <div className="aspect-[3/4] w-full bg-gray-200 overflow-hidden">
          <img
            src={
              novel_img_url ||
              "https://via.placeholder.com/300x400/e0e0e0/ffffff?text=No+Cover"
            }
            alt={novelTitle}
            className="object-cover w-full h-full transition-opacity duration-300 group-hover:opacity-85"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/300x400?text=Error"; }}
          />
          <div
            className="absolute inset-0 bg-black/30 flex items-center justify-center
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <BookOpen className="text-white" size={32} />
          </div>
        </div>
      </Link>

      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-3">
          <h3 
            className="text-lg font-bold text-gray-900 leading-snug line-clamp-2 mb-1"
            title={novelTitle}
          >
            {novelTitle}
          </h3>

          <p className="text-sm text-gray-600 font-medium mb-3">
            của <span className="text-blue-600 hover:underline">{author}</span>
          </p>

          <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
            {novelDescription}
          </p>
        </div>

        <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center gap-2">
          <Link
            to={`/ModerationStatusPage/${novelId}`}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 
                     text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg 
                     transition duration-200 font-semibold text-sm"
          >
            <BookOpen size={18} />
            Xem chi tiết
          </Link>
          <Link
            to={`/AddChapterPage/${novelId}`}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 
                     text-white bg-green-600 hover:bg-green-700 rounded-lg 
                     transition duration-200 font-semibold text-sm"
          >
            <PlusCircle size={18} />
            Thêm chương
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UploadBookCard;