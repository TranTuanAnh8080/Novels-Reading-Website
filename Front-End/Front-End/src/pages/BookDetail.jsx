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
  const [similarBooks, setSimilarBooks] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const bookRes = await axios.post(
          "https://be-ink-realm-c7jk.vercel.app/novel/novelId",
          { novelId: id },
          { headers: { "Content-Type": "application/json" } }
        );
        setBook(bookRes.data);

        const allNovelsRes = await axios.post(
          "https://be-ink-realm-c7jk.vercel.app/novel/all",
          {},
          { headers: { "Content-Type": "application/json" } }
        );

        const allNovels = allNovelsRes.data;
        
        const related = allNovels
          .filter((n) => n.novelId !== Number(id))
          .sort(() => 0.5 - Math.random())
          .slice(0, 6);

        setSimilarBooks(related);

      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Lỗi khi tải dữ liệu truyện!");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
        window.scrollTo(0, 0); 
        fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Đang tải dữ liệu...
          </span>
        </div>
      </div>
    );
  }

  if (error) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 text-red-500 dark:text-red-400 flex justify-center items-center">
      {error}
    </div>
  );

  if (!book) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 text-gray-800 dark:text-gray-200 flex justify-center items-center">
      ❌ Không tìm thấy truyện
    </div>
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans">
      <HeaderBook isLoggedIn={isLoggedIn} />
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 space-y-8">
        <BookInfo
          book={book}
          isFollowing={isFollowing}
          setIsFollowing={setIsFollowing}
          defaultCover={defaultCover}
        />
        <CommentSection />
        <SimilarBooks books={similarBooks} />
      </div>
      <Footer />
    </div>
  );
}