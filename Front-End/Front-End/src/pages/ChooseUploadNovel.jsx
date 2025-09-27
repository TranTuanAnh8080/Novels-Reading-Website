import React, { useState, useEffect } from "react";
import UploadItem from '../components/UploadNovelPage/UploadItem';
import HeaderUpload from "../components/UploadNovelPage/HeaderUpload";
import Footer from "../components/Footer"

const SkeletonUpload = () => {
  return (
    <div className="w-full max-w-lg p-6 space-y-4 animate-pulse">
      {/* Tiêu đề giả */}
      <div className="h-15 bg-gray-300 rounded w-2/3 mx-auto"></div>

      {/* Input giả */}
      <div className="h-20 bg-gray-300 rounded"></div>

      {/* Textarea giả */}
      <div className="h-24 bg-gray-300 rounded"></div>

      {/* Button giả */}
      <div className="h-18 bg-gray-400 rounded w-1/2 mx-auto"></div>
    </div>
  );
};

const ChooseUploadNovel = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mô phỏng delay tải dữ liệu (ví dụ fetch từ server)
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <HeaderUpload />
      <div className="flex flex-1 justify-center items-center">
        {loading ? <SkeletonUpload /> : <UploadItem />}
      </div>
      <Footer />
    </div>
  );
};

export default ChooseUploadNovel;
