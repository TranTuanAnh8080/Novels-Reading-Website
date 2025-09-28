import React, { useState } from "react";
import HeaderBook from "../components/BookDetailPage/HeaderBook";
import Footer from "../components/Footer";
import BookInfo from "../components/BookDetailPage/BookInfo";
import CommentSection from "../components/BookDetailPage/CommentSection";
import SimilarBooks from "../components/BookDetailPage/SimilarBooks";
import { useParams } from "react-router-dom";
import { sampleNovels } from "../components/HomePage/HeroSection";

// Khi login thành công
localStorage.setItem("isLoggedIn", "true");

// Khi logout
localStorage.removeItem("isLoggedIn");

// Ở BookDetail.jsx hoặc HeaderBook.jsx
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

export default function BookDetail() {
  const { id } = useParams();
  const book = sampleNovels.find((b) => b.id === parseInt(id));
  const [isFollowing, setIsFollowing] = useState(false);

  const similarBooks = [
    { id: 1, title: "Đấu Phá Thương Khung", author: "Thiên Tàm Thổ Đậu", cover: "https://truyenaudio.org/upload/pro/Dau-pha-thuong-khung2.png?quality=100&mode=crop&anchor=topleft&width=450&height=675" },
    { id: 2, title: "Tiên Nghịch", author: "Nhĩ Căn", cover: "https://photo2.tinhte.vn/data/attachment-files/2024/07/8406860_watermark-f33a7772d8593ea458c203104b4dbb41-7.jpeg" },
    { id: 3, title: "Phàm Nhân Tu Tiên", author: "Vong Ngữ", cover: "https://dtv-ebook.com.vn/images/files_2/2025/062025/pham-nhan-tu-tien.jpg" },
    { id: 4, title: "Ngã Dục Phong Thiên", author: "Nhĩ Căn", cover: "https://www.nae.vn/ttv/ttv/public/images/story/9ed1b2e3f120d2dc3e84b3a2ed3cbb141f88ae7772542b2825f756adbcead4e6.jpg" },
    { id: 5, title: "Thần Đạo Đan Tôn", author: "Cổ Đơn Địa Phi", cover: "https://www.nae.vn/ttv/ttv/public/images/story/3ec1c27d66a1706bdf278b07637d332eb77906c7b4312326491c22c38dd9cfbb.jpg" },
    { id: 6, title: "Vũ Động Càn Khôn", author: "Thiên Tàm Thổ Đậu", cover: "https://thegioidienanh.vn/stores/news_dataimages/thanhtan/082018/07/12/3237_poster-ngo-ton.jpg" },
  ];

  if (!book) {
    return <div className="p-6">❌ Không tìm thấy truyện</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <HeaderBook isLoggedIn={isLoggedIn} />
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <BookInfo
          title={book.title}
          desc={book.desc}
          img={book.img}
          rating={4.7}
          isFollowing={isFollowing}
          setIsFollowing={setIsFollowing}
        />
        <CommentSection />
        <SimilarBooks books={similarBooks} />
      </div>
      <Footer />
    </div>
  );
}
