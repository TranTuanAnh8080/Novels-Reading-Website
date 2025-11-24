import React, { useState } from "react";
import { Link } from "react-router-dom";
import defaultCover from "../../assets/book-cover-blank.jpg";

export default function SimilarBooks({ books }) {
  if (!books || books.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6
                  dark:bg-gray-800 dark:border-gray-700">
      <h2 className="font-bold text-xl text-gray-800 mb-6 dark:text-white border-l-4 border-blue-500 pl-3">
        Có thể bạn cũng thích
      </h2>
        
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {books.map((book) => (
          <Link 
            to={`/BookDetail/${book.novelId}`} 
            key={book.novelId} 
            className="group flex flex-col"
          >
            <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden mb-3 shadow-sm group-hover:shadow-md transition-all duration-300">
                <img 
                    src={book.novel_img_url && book.novel_img_url.trim() !== "" ? book.novel_img_url : defaultCover}
                    alt={book.novelTitle}
                    onError={(e) => {e.target.onerror = null; e.target.src = defaultCover}}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />
            </div>
            
            <div className="px-1">
                <h3 className="text-sm font-bold text-gray-800 truncate dark:text-white group-hover:text-blue-600 transition-colors" title={book.novelTitle}>
                {book.novelTitle}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                {book.author || "Đang cập nhật"}
                </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}