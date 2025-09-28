import React from "react";

export default function SimilarBooks({ books }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="font-bold text-gray-800 mb-4">Truyện tương tự</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {books.map((book) => (
          <div key={book.id} className="flex flex-col">
            <div
              className="w-full aspect-[3/4] bg-gray-200 rounded-lg mb-2 overflow-hidden bg-center bg-cover flex items-center justify-center text-gray-400"
              style={{
                backgroundImage: book.cover ? `url(${book.cover})` : "none",
              }}
            >
              {!book.cover && "📘"}
            </div>
            <p className="text-sm font-medium text-gray-800 truncate">
              {book.title}
            </p>
            <p className="text-xs text-gray-500">{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
