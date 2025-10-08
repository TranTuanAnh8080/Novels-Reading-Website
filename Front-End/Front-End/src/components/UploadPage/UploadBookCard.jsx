import React from "react";
import { Link } from "react-router-dom";

function UploadBookCard({ title, status, cover }) {
  return (
    <div className="bg-white rounded-lg shadow p-3 flex flex-col">
      {/* Cover */}
      <div className="aspect-[3/2] w-full mb-3 overflow-hidden rounded-md bg-gray-200">
        <img
          src={cover}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title */}
      <h2 className="text-sm font-medium mb-1">{title}</h2>

      {/* Status */}
      <p
        className={`text-xs font-medium mb-2 ${
          status === "Đã hoàn thành"
            ? "text-green-600"
            : status === "Đang đăng"
            ? "text-[#2E5BFF]"
            : "text-orange-500"
        }`}
      >
        ● {status}
      </p>

      {/* Action */}
      <Link to="/ModerationStatusPage" 
      className="px-3 py-1 border border-gray-300 rounded-md text-xs font-medium hover:bg-gray-100 flex-grow text-center">
        Xem chi tiết
      </Link>
    </div>
  );
}

export default UploadBookCard;
