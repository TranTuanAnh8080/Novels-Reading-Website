import React from "react";
import { Link } from "react-router-dom";

function BookCard({ book }) {
  const displayId = book.novelId || book.id || book._id;
  const displayTitle = book.novelTitle || book.title;
  
  const displayCover = book.novel_img_url || book.image || book.cover;
  
  const displayAuthor = book.author || "Tác giả ẩn danh";
  const displayStatus = book.status || "Đã hoàn thành";

  const storyUrl = `/BookDetail/${displayId}`;

  return (
    <div className="group relative flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      
      <Link to={storyUrl} className="relative w-full aspect-[2/3] overflow-hidden bg-gray-200 block">
        <img
          src={displayCover || "https://via.placeholder.com/300x450?text=No+Cover"}
          alt={displayTitle}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300x450?text=Error";
          }}
        />
        
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded text-white shadow-sm
                ${(displayStatus === 'Full' || displayStatus === 'Đã hoàn thành') ? 'bg-green-500' : 'bg-blue-500'}`}>
                {displayStatus}
            </span>
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-base font-bold text-gray-800 dark:text-white line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors" title={displayTitle}>
          <Link to={storyUrl}>{displayTitle || "Chưa có tên"}</Link>
        </h2>

        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            {displayAuthor}
        </p>
        
        <div className="mt-auto">
            <Link
            to={storyUrl}
            className="block w-full py-2 rounded-lg text-white text-sm font-semibold text-center
                        bg-gradient-to-r from-blue-600 to-indigo-600 
                        hover:from-blue-700 hover:to-indigo-700 
                        shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 
                        transition-all active:scale-95"
            >
            Đọc tiếp
            </Link>
        </div>
      </div>
    </div>
  );
}

export default BookCard;