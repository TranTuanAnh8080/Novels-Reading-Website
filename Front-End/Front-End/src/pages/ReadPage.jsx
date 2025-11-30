import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  User,
  Clock,
  Loader2,
  Volume2,
  StopCircle,
  Heart,
  Check,
  SquareMenu,
  Tag,
} from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import defaultCover from "../assets/book-cover-blank.jpg";
import Footer from "../components/SharedComponents/Footer";
import { useTheme } from "../components/SharedComponents/ThemeContext";
import HeaderBook from "../components/BookDetailPage/HeaderBook";

const formatDate = (dateString) => {
  if (!dateString) return "Đang cập nhật";
  return new Date(dateString).toLocaleDateString("vi-VN");
};

export default function ReadPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  const storyId = location.state?.storyId;
  const commentsRef = useRef(null);

  const { theme } = useTheme();

  const [chapter, setChapter] = useState(null);
  const [novel, setNovel] = useState(null);
  const [genres, setGenres] = useState([]);
  const [chapterText, setChapterText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalChapters, setTotalChapters] = useState(0);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [sortOrder, setSortOrder] = useState("new");
  
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn") === "true" || 
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [purchaseInfo, setPurchaseInfo] = useState(null);
  const [isBuying, setIsBuying] = useState(false);
  const [buyResult, setBuyResult] = useState(null);

  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    if (storyId) {
      const library = JSON.parse(localStorage.getItem("followedBooks") || "[]");
      const exists = library.some((b) => String(b.id) === String(storyId));
      setIsFollowed(exists);
    }
  }, [storyId]);

  const fetchChapter = async () => {
    try {
      setLoading(true);
      setError("");
      setChapterText("");
      setPurchaseInfo(null);
      setBuyResult(null);

      const token = sessionStorage.getItem("token");

      const detailReq = axios.get(
        `https://be-ink-realm-c7jk.vercel.app/chapter/detail`,
        { params: { chapterId: id } }
      );

      const textReq = token
        ? axios.get(`https://be-ink-realm-c7jk.vercel.app/chapter/text`, {
            params: { chapterId: id },
            headers: { Authorization: `Bearer ${token}` },
          })
        : Promise.resolve(null);

      const [detailRes, textRes] = await Promise.all([detailReq, textReq]);

      setChapter(detailRes.data);

      if (!token) {
        setError("Bạn cần đăng nhập để đọc chương này 🔒");
        setLoading(false);
        return;
      }

      if (textRes && textRes.data) {
        setChapterText(textRes.data.chapterText);
      }

      if (storyId && !novel) {
        try {
          const [novelRes, genreRes, listRes] = await Promise.all([
            axios.post("https://be-ink-realm-c7jk.vercel.app/novel/novelId", {
              novelId: storyId,
            }),
            axios.get(
              `https://be-ink-realm-c7jk.vercel.app/novel/${storyId}/genre`
            ),
            axios.get(
              `https://be-ink-realm-c7jk.vercel.app/chapter/list/${storyId}`
            ),
          ]);

          setNovel(novelRes.data);

          if (Array.isArray(genreRes.data)) {
            const flatGenres = genreRes.data.flatMap((cat) => cat.genres || []);
            setGenres(flatGenres);
          }

          if (Array.isArray(listRes.data)) {
            setTotalChapters(listRes.data.length);
          } else if (Array.isArray(listRes.data.chapters)) {
            setTotalChapters(listRes.data.chapters.length);
          }
        } catch (err) {
          console.warn("Lỗi khi tải thông tin phụ của truyện:", err);
        }
      }

      if (comments.length === 0) {
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
      }
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
      window.scrollTo({ top: 0, behavior: "smooth" });
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
    setBuyResult(null);
    setError("");
    const token = sessionStorage.getItem("token");

    if (!token) {
      setError("Bạn cần đăng nhập để thực hiện giao dịch. 🔑");
      setIsBuying(false);
      setBuyResult("error");
      return;
    }

    try {
      await axios.post(
        `https://be-ink-realm-c7jk.vercel.app/chapter/${id}/buy`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBuyResult("success");
      setTimeout(() => {
        setPurchaseInfo(null);
        setIsBuying(false);
        fetchChapter();
      }, 1200);
    } catch (err) {
      console.error("Lỗi khi mua chương:", err);
      setBuyResult("error");
      setError(err.response?.data?.message || "Đã xảy ra lỗi khi mua.");
      setTimeout(() => {
        setIsBuying(false);
      }, 1200);
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

      const fullTextToSpeak = `${chapter?.chapterTitle || "Bắt đầu đọc"}. ${chapterText}`;
      const utterance = new SpeechSynthesisUtterance(fullTextToSpeak);
      utterance.lang = "vi-VN";

      const voices = window.speechSynthesis.getVoices();
      const vietnameseVoice = voices.find((voice) =>
        voice.lang.startsWith("vi")
      );
      if (vietnameseVoice) utterance.voice = vietnameseVoice;

      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => {
        setIsSpeaking(false);
        console.error("Đã xảy ra lỗi khi đọc TTS.");
      };

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleFollow = () => {
    if (!isLoggedIn) {
       alert("Bạn cần đăng nhập để theo dõi truyện!");
       return;
    }
    
    if (!novel || !storyId) return;

    const saved = JSON.parse(localStorage.getItem("followedBooks") || "[]");
    let updated;

    if (isFollowed) {
      updated = saved.filter((b) => String(b.id) !== String(storyId));
      setIsFollowed(false);
    } else {
      updated = [
        ...saved,
        {
          id: storyId,
          title: novel.novelTitle,
          image: novel.novel_img_url,
          status: "Đang đọc",
        },
      ];
      setIsFollowed(true);
    }

    localStorage.setItem("followedBooks", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
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

  const NavigationButtons = () => (
    <div className="flex justify-center items-center w-full gap-4 sm:gap-6">
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
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Chương trước</span>
        <span className="sm:hidden">Trước</span>
      </button>

      <button
        onClick={() => navigate(`/ChapterList/${storyId}`)}
        className="flex items-center gap-2 px-4 py-2 rounded-md border text-sm bg-white hover:shadow-sm
                  dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
      >
        <SquareMenu className="w-4 h-4" /> Mục lục
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
        <span className="hidden sm:inline">Chương sau</span>
        <span className="sm:hidden">Sau</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <HeaderBook />

      <main className="max-w-5xl mx-auto mt-8 p-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700 relative overflow-hidden">
          <div className="relative border-b border-gray-100 dark:border-gray-700">
            <div className="absolute inset-0 h-full bg-gradient-to-b from-gray-50/80 to-white dark:from-gray-900/80 dark:to-gray-800 z-0" />
            <div
              className="absolute inset-0 h-full blur-3xl opacity-20 pointer-events-none z-0"
              style={{
                backgroundImage: `url(${novel?.novel_img_url || defaultCover})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <div className="relative z-10 p-6 sm:p-8">
              <div className="flex gap-8 flex-col sm:flex-row items-center sm:items-start">
                <div className="w-32 h-48 sm:w-40 sm:h-60 flex-shrink-0 relative group shadow-lg rounded-lg overflow-hidden border border-white dark:border-gray-600">
                  <img
                    src={novel?.novel_img_url || defaultCover}
                    alt={novel?.novelTitle || "Book cover"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="flex-1 flex flex-col w-full text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight dark:text-white mb-2">
                    {novel?.novelTitle || "Đang tải tiêu đề..."}
                  </h1>
                  <h2 className="text-base text-slate-500 font-medium mb-4 dark:text-gray-400 flex flex-col sm:flex-row items-center sm:justify-start gap-1 sm:gap-2">
                    <span className="opacity-70">Đang đọc:</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      {chapter?.chapterTitle || "..."}
                    </span>
                  </h2>

                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
                    {genres.length > 0 ? (
                      genres.map((g, index) => (
                        <span
                          key={g.genreId || index}
                          className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600 border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 flex items-center gap-1"
                        >
                          <Tag className="w-3 h-3" /> {g.genreName}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400 italic">
                        Đang cập nhật thể loại...
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-4 border-y border-gray-100 py-4 mb-4 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/20 rounded-lg px-2 sm:px-4">
                    <div className="flex flex-col items-center sm:items-start">
                      <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mb-1">
                        Tác giả
                      </span>
                      <div className="flex items-center gap-2 font-medium text-sm sm:text-base">
                        <User className="w-4 h-4 text-[#2E5BFF]" />
                        <span className="truncate max-w-[80px] sm:max-w-full">
                          {novel?.author || "..."}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center sm:items-start border-l border-gray-200 dark:border-gray-600 pl-2 sm:pl-4">
                      <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mb-1">
                        Số chương
                      </span>
                      <div className="flex items-center gap-2 font-medium text-sm sm:text-base">
                        <BookOpen className="w-4 h-4 text-[#2E5BFF]" />
                        <span>{totalChapters}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center sm:items-start border-l border-gray-200 dark:border-gray-600 pl-2 sm:pl-4">
                      <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mb-1">
                        Cập nhật
                      </span>
                      <div className="flex items-center gap-2 font-medium text-sm sm:text-base">
                        <Clock className="w-4 h-4 text-[#2E5BFF]" />
                        <span>{formatDate(novel?.createDate)}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6 line-clamp-2 hidden sm:block text-left">
                    {novel?.novelDescription ||
                      novel?.description ||
                      "Chưa có mô tả cho truyện này."}
                  </p>

                  <div className="flex items-center justify-center sm:justify-start gap-3 mt-auto">
                    <button
                      onClick={handleSpeak}
                      disabled={loading || !chapterText || purchaseInfo}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:shadow-none
                                ${
                                  isSpeaking
                                    ? "bg-red-50 text-red-600 border border-red-200"
                                    : "bg-[#2E5BFF] text-white hover:bg-blue-600 shadow-blue-200 dark:shadow-none"
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
                      onClick={handleFollow}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all hover:-translate-y-0.5 active:translate-y-0
                                ${
                                  isFollowed
                                    ? "border-pink-200 bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:border-pink-800 dark:text-pink-300"
                                    : "border-gray-200 text-gray-700 hover:border-gray-300 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
                                }`}
                    >
                      {isFollowed ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Heart className="w-4 h-4" />
                      )}
                      {isFollowed ? "Đã theo dõi" : "Theo dõi"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 pt-6">
            <div className="mb-8">
              <NavigationButtons />
            </div>

            <article className="text-gray-800 leading-8 prose max-w-none dark:text-gray-300">
              {loading ? (
                <div className="flex items-center justify-center gap-2 dark:text-gray-300 min-h-[200px]">
                  <Loader2 className="animate-spin w-5 h-5" /> Đang tải chương...
                </div>
              ) : error ? (
                <div className="text-center">
                  {purchaseInfo ? (
                    <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg dark:bg-yellow-900 dark:border-yellow-700">
                      <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                        {purchaseInfo.error || "Chương này cần mua"}
                      </h3>
                      <p className="text-yellow-700 mt-2 italic dark:text-yellow-300">
                        Vui lòng mua chương để tiếp tục đọc.
                      </p>
                      <button
                        onClick={handleBuyChapter}
                        disabled={isBuying}
                        className="mt-4 px-6 py-2 bg-[#2E5BFF] text-white rounded-full font-semibold hover:bg-indigo-600 disabled:bg-gray-400 flex items-center justify-center mx-auto shadow-md dark:bg-blue-500 dark:hover:bg-blue-600 dark:disabled:bg-gray-500"
                      >
                        {isBuying ? (
                          <>
                            <Loader2 className="animate-spin w-4 h-4 mr-2" />
                            Đang xử lý...
                          </>
                        ) : (
                          `Mua ngay (Giá: ${purchaseInfo.price}🪙)`
                        )}
                      </button>
                      {buyResult === "success" && !isBuying && (
                        <p className="text-green-600 font-bold text-sm mt-3 dark:text-green-400">
                          Mua chương thành công! 🎉
                        </p>
                      )}
                      {buyResult === "error" && !isBuying && error && (
                        <p className="text-red-600 font-bold text-sm mt-3 dark:text-red-400">
                          {error}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="text-red-600 dark:text-red-400">{error}</div>
                  )}
                </div>
              ) : (
                chapterText && (
                  <div className="whitespace-pre-line">{chapterText}</div>
                )
              )}
            </article>

            {!loading && !error && chapterText && (
              <div className="mt-12 mb-6 pt-8 border-t border-gray-100 dark:border-gray-700">
                <NavigationButtons />
              </div>
            )}

            <section className="mt-10">
              <hr className="my-6 border-gray-200 dark:border-gray-700" />
              <h3 className="text-xl font-semibold mb-3 dark:text-white">
                Bình luận
              </h3>
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
                    className={`px-3 py-1 rounded-md text-sm ${
                      sortOrder === "new"
                        ? "bg-indigo-50 text-[#2E5BFF] font-medium dark:bg-blue-900 dark:text-blue-300"
                        : "bg-gray-50 text-slate-600 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    Mới nhất
                  </button>
                  <button
                    onClick={() => setSortOrder("old")}
                    className={`px-3 py-1 rounded-md text-sm ${
                      sortOrder === "old"
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
                        <div className="font-medium text-sm dark:text-white">
                          {c.user}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-gray-400">
                          · {c.time}
                        </div>
                      </div>
                      <p className="text-sm text-slate-700 mt-1 dark:text-gray-300">
                        {c.text}
                      </p>
                      <div className="border-t border-gray-100 mt-3 dark:border-gray-700" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}