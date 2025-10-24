import React, { useState, useEffect } from "react";
import HeaderBook from "../components/BookDetailPage/HeaderBook";
import Footer from "../components/SharedComponents/Footer";
import BookInfo from "../components/BookDetailPage/BookInfo";
import CommentSection from "../components/BookDetailPage/CommentSection";
import SimilarBooks from "../components/BookDetailPage/SimilarBooks";
import defaultCover from "../assets/book-cover-blank.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // state login
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // lắng nghe thay đổi localStorage
  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    window.addEventListener("storage", checkLogin);
    const interval = setInterval(checkLogin, 500);

    return () => {
      window.removeEventListener("storage", checkLogin);
      clearInterval(interval);
    };
  }, []);

  // 🔹 Gọi API lấy chi tiết truyện
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch("https://be-ink-realm-c7jk.vercel.app/novel/novelId", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ novelId: id }), // id lấy từ useParams
        });

        if (!res.ok) {
          throw new Error("Không thể tải dữ liệu truyện");
        }

        const data = await res.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching novel:", error);
        setError("Lỗi khi tải dữ liệu truyện!");
      } finally {
        setLoading(false); // 🔹 Dù lỗi hay thành công đều thoát trạng thái loading
      }
    };

    fetchBook();
  }, [id]);

  const similarBooks = [
    { id: 1, title: "Đấu Phá Thương Khung", author: "Thiên Tàm Thổ Đậu", cover: "https://truyenaudio.org/upload/pro/Dau-pha-thuong-khung2.png?quality=100&mode=crop&anchor=topleft&width=450&height=675" },
    { id: 2, title: "Tiên Nghịch", author: "Nhĩ Căn", cover: "https://photo2.tinhte.vn/data/attachment-files/2024/07/8406860_watermark-f33a7772d8593ea458c203104b4dbb41-7.jpeg" },
    { id: 3, title: "Phàm Nhân Tu Tiên", author: "Vong Ngữ", cover: "https://dtv-ebook.com.vn/images/files_2/2025/062025/pham-nhan-tu-tien.jpg" },
  ];

    if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex items-center space-x-3">
          {/* Spinner SVG */}
          <svg
            className="animate-spin h-6 w-6 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="text-xl font-semibold text-gray-700">
            Đang tải dữ liệu...
          </span>
        </div>
      </div>
    );
  }
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!book) return <div className="p-6">❌ Không tìm thấy truyện</div>;

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <HeaderBook isLoggedIn={isLoggedIn} />
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      <BookInfo
        book={book}
        isFollowing={isFollowing}
        setIsFollowing={setIsFollowing}
        defaultCover={defaultCover}/>
        <CommentSection />
        <SimilarBooks books={similarBooks} />
      </div>
      <Footer />
    </div>
  );
}
