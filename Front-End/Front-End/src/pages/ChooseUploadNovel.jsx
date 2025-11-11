import React, { useState, useEffect } from "react";
import UploadItem from '../components/UploadNovelPage/UploadItem';
import HeaderUpload from "../components/ProfilePage/HeaderProfile";
import Footer from "../components/SharedComponents/Footer"

const SkeletonUpload = () => {
  return (
    <div className="w-full max-w-lg p-6 space-y-4 animate-pulse">
      <div className="h-15 bg-gray-300 rounded w-2/3 mx-auto dark:bg-gray-700"></div>
      <div className="h-20 bg-gray-300 rounded dark:bg-gray-700"></div>
      <div className="h-24 bg-gray-300 rounded dark:bg-gray-700"></div>
      <div className="h-18 bg-gray-400 rounded w-1/2 mx-auto dark:bg-gray-600"></div>
    </div>
  );
};

const ChooseUploadNovel = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
  <div className="min-w-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-black">
    <HeaderUpload />
    <div className="flex flex-1 justify-center items-center">
      {loading ? <SkeletonUpload /> : <UploadItem />}
    </div>
    <Footer />
  </div>
);
};

export default ChooseUploadNovel;