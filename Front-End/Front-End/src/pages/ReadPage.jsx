import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  User,
  Clock,
  LogOut,
  Loader2,
  Volume2,
  StopCircle,
  Moon,
  Sun 
} from "lucide-react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/inkrealm_logo.png";
import defaultCover from "../assets/book-cover-blank.jpg"
import Footer from "../components/SharedComponents/Footer"; 
import { useTheme } from "../components/SharedComponents/ThemeContext";

export default function ReadPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  const storyId = location.state?.storyId;
  const commentsRef = useRef(null);

  const { theme, toggleTheme } = useTheme();

  const [chapter, setChapter] = useState(null);
  const [novel, setNovel] = useState(null);
  const [chapterText, setChapterText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalChapters, setTotalChapters] = useState(0);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [sortOrder, setSortOrder] = useState("new");
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn") === "true"
  );

  const [purchaseInfo, setPurchaseInfo] = useState(null);
  const [isBuying, setIsBuying] = useState(false);

  const [isSpeaking, setIsSpeaking] = useState(false);

  const fetchChapter = async () => {
    try {
      setLoading(true);
      setError("");
      setChapterText("");
      setPurchaseInfo(null);

      const detailRes = await axios.get(
        `https://be-ink-realm-c7jk.vercel.app/chapter/detail`,
        { params: { chapterId: id } }
      );
      setChapter(detailRes.data);

      const token = sessionStorage.getItem("token");
      if (!token) {
        setError("Bạn cần đăng nhập để đọc chương này 🔒");
        setLoading(false);
        return;
      }

      const textRes = await axios.get(
        `https://be-ink-realm-c7jk.vercel.app/chapter/text`,
        {
          params: { chapterId: id },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setChapterText(textRes.data.chapterText); 

      if (storyId) {
        const novelRes = await axios.post(
          "https://be-ink-realm-c7jk.vercel.app/novel/novelId",
          { novelId: storyId }
        );
        setNovel(novelRes.data);
      }

      try {
        const listRes = await axios.get(
          `https://be-ink-realm-c7jk.vercel.app/chapter/list/${storyId}`
        );
        if (Array.isArray(listRes.data)) {
          setTotalChapters(listRes.data.length);
        } else if (Array.isArray(listRes.data.chapters)) {
          setTotalChapters(listRes.data.chapters.length);
        }
      } catch (err) {
        console.warn("Không thể lấy danh sách chương:", err);
      }

      setComments([
        {
          user: "NguyenReader",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          text: "Chương này hay quá!",
          time: "2 giờ trước",
        },
        {
          user: "TruyenFan",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          text: "Dịch mượt quá",
          time: "5 giờ trước",
        },
      ]);
    } catch (err) {
      console.error(err);
      setChapterText("");
      if (err.response) {
        const { status, data } = err.response;
        if (status === 401) {
          setError("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại 🔑");
          localStorage.removeItem("token");
        } else if (status === 403) {
          setError(data?.error || "Chương này cần mua để đọc ❌");
          setPurchaseInfo(data);
        } else if (status === 404) {
          setError("Không tìm thấy chương này ❗");
        } else {
          setError("Đã xảy ra lỗi khi tải chương.");
        }
      } else {
        setError("Không thể kết nối đến máy chủ.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    fetchChapter();
  }, [id]);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleBuyChapter = async () => {
    if (!id) return;

    setIsBuying(true);
    setError("");
    const token = sessionStorage.getItem("token");

    if (!token) {
      setError("Bạn cần đăng nhập để thực hiện giao dịch. 🔑");
      setIsBuying(false);
      return;
    }

    try {
      await axios.post(
        `https://be-ink-realm-c7jk.vercel.app/chapter/${id}/buy`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Mua chương thành công! 🎉");
      setPurchaseInfo(null);
      setIsBuying(false);
      await fetchChapter();
    } catch (err) {
      console.error("Lỗi khi mua chương:", err);
      if (err.response) {
        setError(err.response.data?.message || "Đã xảy ra lỗi khi mua.");
      } else {
        setError("Không thể kết nối đến máy chủ.");
      }
      setIsBuying(false);
    }
  };

  const handleSpeak = () => {
    if (!("speechSynthesis" in window)) {
      alert("Xin lỗi, trình duyệt của bạn không hỗ trợ chức năng này.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      if (!chapterText) {
        alert("Nội dung chương chưa được tải hoặc chương này cần mua.");
        return;
      }

      const fullTextToSpeak = `${chapter?.chapterTitle || "Bắt đầu đọc"
        }. ${chapterText}`;

      const utterance = new SpeechSynthesisUtterance(fullTextToSpeak);

      utterance.lang = "vi-VN";

      const voices = window.speechSynthesis.getVoices();
      const vietnameseVoice = voices.find((voice) =>
        voice.lang.startsWith("vi")
      );
      if (vietnameseVoice) {
        utterance.voice = vietnameseVoice;
      }

      utterance.rate = 1;
      utterance.pitch = 1;

      utterance.onend = () => {
        setIsSpeaking(false);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        console.error("Đã xảy ra lỗi khi đọc TTS.");
      };

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    const newC = {
      user: "Bạn đọc mới",
      avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
      text: newComment.trim(),
      time: "Vừa xong",
    };
    setComments((prev) => [newC, ...prev]);
    setNewComment("");
    commentsRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const sortedComments =
    sortOrder === "new" ? comments : [...comments].reverse();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <header className="bg-white text-gray-900 border-b border-gray-200 shadow-md sticky top-0 z-50
                   dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 dark:text-white dark:border-gray-800 dark:shadow-lg">
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between gap-6">
          {/* LOGO */}
          <div className="flex items-center space-x-3">
            <Link
              to={isLoggedIn ? "/HomeLoggedIn" : "/HomePage"}
              className="flex items-center space-x-2 group"
            >
              <span className="text-2xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                INKREALM
              </span>
            </Link>
          </div>

          {/* NAVIGATION */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium flex-1 justify-center">
            <Link
              to={isLoggedIn ? "/HomeLoggedIn" : "/HomePage"}
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
            >
              Trang chủ
            </Link>
            <Link to="/the-loai" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              Thể loại
            </Link>
            <Link to="/xep-hang" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              Xếp hạng
            </Link>
            <Link
              to="/moi-cap-nhat"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
            >
              Mới cập nhật
            </Link>
            <Link to="/sang-tac" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              Sáng tác
            </Link>
          </nav>

          {/* SEARCH + USER */}
          <div className="flex items-center gap-4">
            {/* Search box */}
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm truyện..."
                className="rounded-full bg-gray-100 border border-gray-300 pl-4 pr-10 py-1.5 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         placeholder-gray-500 text-sm w-56
                         dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {/* USER AREA */}
            {!isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link to="/LoginPage">
                  <button className="px-4 py-1.5 text-sm rounded-full border border-gray-300 hover:bg-gray-100 transition
                                   dark:border-gray-700 dark:hover:bg-gray-800">
                    Đăng nhập
                  </button>
                </Link>
                <Link to="/RegisterPage">
                  <button className="px-4 py-1.5 text-sm rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:brightness-110 transition">
                    Đăng ký
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/Profile">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="user avatar"
                    className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-700 cursor-pointer hover:opacity-90 transition"
                  />
                </Link>
                <button
                  onClick={() => {
                    sessionStorage.clear();
                    window.dispatchEvent(new Event("loginStateChanged"));
                    window.location.href = "/HomePage";
                  }}
                  className="flex items-center gap-1 text-red-500 hover:text-red-600 dark:hover:text-red-400 text-sm font-medium transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto mt-8 p-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8
                      dark:bg-gray-800 dark:border-gray-700">
          {/* Title & meta */}
          <div className="flex gap-6">
            <div className="w-28 h-36 flex-shrink-0">
              <img
                src={novel?.novel_img_url || defaultCover}
                alt={novel?.novelTitle || "Book cover"}
                className="w-full h-full object-cover rounded-md border dark:border-gray-700"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {novel?.novelTitle || "Đang tải..."}
                  </h1>
                  <h1 className="mt-2 text-sm text-slate-600 dark:text-gray-300">
                    {chapter?.chapterTitle || "Đang tải..."}
                  </h1>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className="px-3 py-2 rounded-full bg-[#2E5BFF] text-white text-sm shadow-sm
                               dark:bg-blue-500 dark:hover:bg-blue-600"
                    title="Đọc"
                  >
                    Đọc truyện
                  </button>
                  <button className="px-3 py-2 rounded-full border border-gray-200 text-sm
                                     dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                    Theo dõi
                  </button>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-6">
                <span className="inline-flex items-center bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full
                                 dark:bg-emerald-900 dark:text-emerald-300">
                  Truyện dịch
                </span>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
                    <BookOpen className="w-4 h-4 text-[#2E5BFF] dark:text-blue-400" />
                    <span className="text-slate-600 dark:text-gray-400">
                      {totalChapters || 0} chương
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
                    <User className="w-4 h-4 text-[#2E5BFF] dark:text-blue-400" />
                    <span className="text-slate-600 dark:text-gray-400">{novel?.author || ""}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
                    <Clock className="w-4 h-4 text-[#2E5BFF] dark:text-blue-400" />
                    <span className="text-slate-600 dark:text-gray-400">
                      {novel?.createDate || ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter nav */}
          <div className="mt-8 flex justify-center items-center gap-3">
            <button
              disabled={!chapter?.pre?.chapterId}
              onClick={() =>
                chapter?.pre &&
                navigate(`/ReadPage/${chapter.pre.chapterId}`, {
                  state: { storyId },
                })
              }
              className="flex items-center gap-2 px-4 py-2 rounded-md border text-sm bg-white hover:shadow-sm disabled:opacity-50
                         dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 dark:disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" /> Chương trước
            </button>
            <button
              onClick={() => navigate(`/ChapterList/${storyId}`)}
              className="flex items-center gap-2 px-4 py-2 rounded-md border text-sm bg-white hover:shadow-sm
                         dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              <BookOpen className="w-4 h-4" /> Mục lục
            </button>

            <button
              onClick={handleSpeak}
              disabled={loading || !chapterText || purchaseInfo}
              className={`flex items-center gap-2 px-4 py-2 rounded-md border text-sm hover:shadow-sm disabled:opacity-50 ${isSpeaking
                  ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-700"
                  : "bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
            >
              {isSpeaking ? (
                <StopCircle className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
              {isSpeaking ? "Dừng đọc" : "Nghe đọc"}
            </button>

            <button
              disabled={!chapter?.next?.chapterId}
              onClick={() =>
                chapter?.next &&
                navigate(`/ReadPage/${chapter.next.chapterId}`, {
                  state: { storyId },
                })
              }
              className="flex items-center gap-2 px-4 py-2 rounded-md border text-sm bg-white hover:shadow-sm disabled:opacity-50
                         dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 dark:disabled:opacity-50"
            >
              Chương sau <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* CONTENT */}
          <article className="mt-8 text-gray-800 leading-8 prose max-w-none dark:text-gray-300">
            {loading ? (
              <div className="flex items-center justify-center gap-2 dark:text-gray-300">
                <Loader2 className="animate-spin w-5 h-5" /> Đang tải chương...
              </div>
            ) : error ? (
              <div className="text-center">
                {purchaseInfo ? (
                  <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg
                                dark:bg-yellow-900 dark:border-yellow-700">
                    <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                      {purchaseInfo.error || "Chương này cần mua"}
                    </h3>
                    <p className="text-yellow-700 mt-2 dark:text-yellow-300">
                      Vui lòng mua chương để tiếp tục đọc.
                    </p>
                    <button
                      onClick={handleBuyChapter}
                      disabled={isBuying}
                      className="mt-4 px-6 py-2 bg-[#2E5BFF] text-white rounded-full font-semibold hover:bg-indigo-600 disabled:bg-gray-400 flex items-center justify-center mx-auto shadow-md
                                 dark:bg-blue-500 dark:hover:bg-blue-600 dark:disabled:bg-gray-500"
                    >
                      {isBuying ? (
                        <Loader2 className="animate-spin w-4 h-4 mr-2" />
                      ) : null}
                      {isBuying
                        ? "Đang xử lý..."
                        : `Mua ngay (Giá: ${purchaseInfo.price} 🪙)`}
                    </button>

                    {!isBuying && error && error !== purchaseInfo.error && (
                      <p className="text-red-600 text-sm mt-3 dark:text-red-400">{error}</p>
                    )}
                  </div>
                ) : (
                  <div className="text-red-600 dark:text-red-400">{error}</div>
                )}
              </div>
            ) : (
              chapterText && (
                <>
                  <div className="whitespace-pre-line">{chapterText}</div>
                </>
              )
            )}
          </article>

          {/* Comments */}
          <section className="mt-10">
            <hr className="my-6 border-gray-200 dark:border-gray-700" />
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Bình luận</h3>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Viết bình luận..."
              className="w-full border border-gray-200 rounded-md p-3 text-sm resize-none h-24
                         dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
            <div className="flex justify-between mt-3">
              <button
                onClick={addComment}
                className="px-4 py-2 bg-[#2E5BFF] text-white rounded-md text-sm
                           dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Gửi bình luận
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortOrder("new")}
                  className={`px-3 py-1 rounded-md text-sm ${sortOrder === "new"
                      ? "bg-indigo-50 text-[#2E5BFF] font-medium dark:bg-blue-900 dark:text-blue-300"
                      : "bg-gray-50 text-slate-600 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    }`}
                >
                  Mới nhất
                </button>
                <button
                  onClick={() => setSortOrder("old")}
                  className={`px-3 py-1 rounded-md text-sm ${sortOrder === "old"
                      ? "bg-indigo-50 text-indigo-600 font-medium dark:bg-blue-900 dark:text-blue-300"
                      : "bg-gray-50 text-slate-600 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    }`}
                >
                  Cũ nhất
                </button>
              </div>
            </div>
            <div ref={commentsRef} className="space-y-6 mt-4">
              {sortedComments.map((c, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <img
                    src={c.avatar}
                    className="w-10 h-10 rounded-full object-cover"
                    alt={c.user}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="font-medium text-sm dark:text-white">{c.user}</div>
                      <div className="text-xs text-slate-500 dark:text-gray-400">· {c.time}</div>
                    </div>
                    <p className="text-sm text-slate-700 mt-1 dark:text-gray-300">{c.text}</p>
                    <div className="border-t border-gray-100 mt-3 dark:border-gray-700" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}