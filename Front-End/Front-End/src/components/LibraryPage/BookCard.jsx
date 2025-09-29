import React from "react";

function BookCard({ title, status, btn, color, image }) {
  return (
    <div className="bg-white rounded-lg shadow p-3 flex flex-col">
      {/* Cover image 3:4 */}
      <div className="aspect-[3/2] w-full mb-3 overflow-hidden rounded-md bg-gray-200">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : null}
      </div>

      {/* Info */}
      <h2 className="text-sm font-medium">{title}</h2>
      <p className="text-xs text-gray-500 mb-2">{status}</p>
      <button
        className={`px-3 py-1 rounded-md text-white text-xs font-medium ${
          color === "blue"
            ? "bg-[#2E5BFF] hover:bg-blue-600"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {btn}
      </button>
    </div>
  );
}

export default BookCard;
