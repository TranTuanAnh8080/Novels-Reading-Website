import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import landscapeImage from "../assets/landscape.jpg";
// Thư viện pháo giấy
import Confetti from "react-confetti";
import image from "../assets/inkrealm_logo.png";
import vietnamFlag from "../assets/vietnam_flag.png";
import LoadingPage from "./LoadingPage";

const Popups = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  const handleNavigateWithLoading = (path) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(path);
    }, 1000); // Giữ trạng thái loading trong 1 giây
  };

  // tắt confetti sau 8 giây
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 
     flex justify-center items-center z-50 overflow-hidden"
      style={{
        backgroundImage: `url(${landscapeImage})`,
        backgroundSize: "cover", // Đảm bảo hình ảnh phủ toàn màn hình
        backgroundPosition: "center", // Căn giữa hình ảnh
        backgroundRepeat: "no-repeat", // Không lặp lại hình ảnh
        backgroundAttachment: "fixed", //
      }}
    >
      {/* Hiển thị trang LoadingPage khi đang ở trạng thái loading */}
      {loading && <LoadingPage />}


      {/* Hiệu ứng pháo giấy */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={1000}
          recycle={false} // chỉ rơi 1 lần
        />
      )}

      {/* Nội dung popup */}
      <div className="relative bg-gradient-to-br from-transparent via-sky-100 to-transparent 
      rounded-4xl p-8 text-center w-11/12 max-w-md shadow-2xl
       transform scale-100 hover:scale-105 transition-transform duration-300 z-10 font-mono">

        <img
          src={vietnamFlag}
          alt="Vietnam Flag"
          className="absolute top-3 left-4 w-12 h-auto 
          contrast-125 brightness-150 saturate-150 scale-75 hover:scale-100 transition-transform duration-300"
        />

        <img
          src={image}
          alt="Inkrealm Logo"
          className="ml-27 mb-3 w-40 h-15 contrast-125 brightness-90 saturate-200"
        />
        <h1 className="text-3xl mb-7 text-sky-800 font-extrabold font-mono">
          Chào mừng bạn đã đến!
        </h1>
        <h2 className="text-sky-800 mb-4 text-lg font-medium font-mono">
          Thế giới truyện dành riêng cho bạn, nơi cảm xúc và câu chuyện hòa quyện.
          Hãy sẵn sàng khám phá những hành trình đầy thú vị!
        </h2>
        <h3 className="text-cyan-700 mb-3 text-base font-medium font-mono">
          Inkrealm không chỉ là một nền tảng đọc truyện, mà còn là nơi bạn có thể
          kết nối với những người yêu thích truyện giống mình.
        </h3>
        <h4 className="text-red-400 font-medium mb-3 text-base font-mono">
          Bạn có thể tìm thấy mọi thể loại truyện yêu thích, từ tiểu thuyết lãng
          mạn, phiêu lưu, kinh dị cho đến truyện ngắn đầy cảm xúc. Hãy tham gia
          cộng đồng Inkrealm để khám phá và chia sẻ những câu chuyện của riêng bạn nhé!
        </h4>
        <button
          onClick={() => handleNavigateWithLoading("/RegisterPage")}
          className=" animate-pulse bg-gradient-to-r from-cyan-200 via-sky-100 to-red-200 px-8 py-3 rounded-full text-lg font-mono font-bold text-sky-800 shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-300"
        >
          🚀Khám phá ngay⭐
        </button>

      </div>
    </div>
  );
};

export default Popups;
