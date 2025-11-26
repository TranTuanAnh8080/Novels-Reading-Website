import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import landscapeImage from "../assets/landscape.jpg";
import Confetti from "react-confetti";
import image from "../assets/inkrealm_logo.png";
import vietnamFlag from "../assets/vietnam_flag.png";
import LoadingPage from "./LoadingPage";
const Popups = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false); // trạng thái load background

  const handleNavigateWithLoading = (path) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(path);
    }, 1500);
  };

  // preload background image
  useEffect(() => {
    const img = new Image();
    img.src = landscapeImage;
    img.onload = () => {
      setBgLoaded(true);
      setShowConfetti(true); // chỉ bật confetti khi ảnh nền sẵn sàng
    };
  }, []);

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 
      overflow-hidden transition-all duration-700"
      style={{
        backgroundImage: bgLoaded ? `url(${landscapeImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        filter: "contrast(1.0) brightness(1.05)", // Enhance image quality
        WebkitBackfaceVisibility: "hidden", // Improve performance
        MozBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden"
      }}
    >
      {/* Fallback blur background trong lúc ảnh chưa tải */}
      {!bgLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-sky-200 to-sky-100 animate-pulse blur-lg" />
      )}

      {/* Hiển thị trang LoadingPage khi đang ở trạng thái loading */}
      {loading && <LoadingPage />}

      {/* Hiệu ứng pháo giấy */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={1000}
          recycle={false}
        />
      )}

      {/* Nội dung popup */}
      <div className="relative bg-gradient-to-br from-sky-100 via-white to-rose-100 
        rounded-4xl p-8 text-center w-11/12 max-w-md shadow-md
        transform scale-100 hover:scale-105 transition-transform duration-300 z-10">

        <img
          src={vietnamFlag}
          alt="Vietnam Flag"
          className="absolute top-3 left-4 w-15 h-auto 
            contrast-125 brightness-150 saturate-150 scale-75 hover:scale-100 transition-transform duration-300"
        />

        <img
          src={image}
          alt="Inkrealm Logo"
          className="ml-27 mb-3 w-40 h-15 contrast-125 brightness-90 saturate-200"
        />
        <h1 className="text-3xl mb-7 text-blue-800 font-medium">
          Chào mừng bạn đã đến!
        </h1>
        <h2 className="text-sky-800 mb-4 text-md font-base">
          Thế giới truyện dành riêng cho bạn, nơi cảm xúc và câu chuyện hòa quyện.
          Hãy sẵn sàng khám phá những hành trình đầy thú vị!
        </h2>
        <h3 className="text-cyan-700 mb-3 text-md font-base">
          Inkrealm không chỉ là một nền tảng đọc truyện, mà còn là nơi bạn có thể
          kết nối với những người yêu thích truyện giống mình.
        </h3>
        <h4 className="text-red-400 font-base mb-3 text-md">
          Bạn có thể tìm thấy mọi thể loại truyện yêu thích, từ tiểu thuyết lãng
          mạn, phiêu lưu, kinh dị cho đến truyện ngắn đầy cảm xúc. Hãy tham gia
          cộng đồng Inkrealm để khám phá và chia sẻ những câu chuyện của riêng bạn nhé!
        </h4>
        <button
          onClick={() => handleNavigateWithLoading("/HomePage")}
          className=" animate-pulse bg-gradient-to-r from-cyan-200 via-sky-100 to-red-200
           px-8 py-3 rounded-full text-lg font-medium text-sky-800 
           shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-300"
        >
          🚀Khám phá ngay⭐
        </button>
      </div>
    </div>
  );
};

export default Popups;
