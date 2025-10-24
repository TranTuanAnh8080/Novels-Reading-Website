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
  Volume2, // Icon cho nút nghe
  StopCircle, // Icon cho nút dừng
} from "lucide-react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/inkrealm_logo.png"; // Đảm bảo đường dẫn này đúng
import defaultCover from "../assets/book-cover-blank.jpg"; // Đảm bảo đường dẫn này đúng
import Footer from "../components/SharedComponents/Footer"; // Đảm bảo đường dẫn này đúng

export default function ReadPage() {
  const { id } = useParams(); // chapterId
  const navigate = useNavigate();
  const location = useLocation();
  const storyId = location.state?.storyId;
  const commentsRef = useRef(null);

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

  // --- STATE MỚI ĐỂ QUẢN LÝ MUA CHƯƠNG ---
  const [purchaseInfo, setPurchaseInfo] = useState(null); // Lưu thông tin { error, price } khi cần mua
  const [isBuying, setIsBuying] = useState(false); // Trạng thái loading khi nhấn nút mua

  // --- STATE MỚI ĐỂ QUẢN LÝ TTS ---
  const [isSpeaking, setIsSpeaking] = useState(false); // Trạng thái đang đọc TTS

  const fetchChapter = async () => {
    try {
      setLoading(true);
      setError("");
      setChapterText(""); // Xóa nội dung chương cũ
      setPurchaseInfo(null); // Reset trạng thái cần mua

      // 1. Lấy chi tiết chương
      const detailRes = await axios.get(
        `https://be-ink-realm-c7jk.vercel.app/chapter/detail`,
        { params: { chapterId: id } }
      );
      setChapter(detailRes.data);

      // 2. Chuẩn bị token
      const token = sessionStorage.getItem("token");
      if (!token) {
        setError("Bạn cần đăng nhập để đọc chương này 🔒");
        setLoading(false);
        return;
      }

      // 3. Lấy nội dung chương
      const textRes = await axios.get(
        `https://be-ink-realm-c7jk.vercel.app/chapter/text`,
        {
          params: { chapterId: id },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setChapterText(textRes.data.chapterText); // Set nội dung nếu thành công

      // 4. Gọi thêm API /novel/novelId để lấy tên truyện
      if (storyId) {
        const novelRes = await axios.post(
          "https://be-ink-realm-c7jk.vercel.app/novel/novelId",
          { novelId: storyId }
        );
        setNovel(novelRes.data);
      }

      // 5. Lấy tổng số chương của truyện
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

      // 6. Lấy comments (tạm giả lập)
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
      setChapterText(""); // Đảm bảo không hiển thị nội dung cũ khi có lỗi
      if (err.response) {
        const { status, data } = err.response;
        if (status === 401) {
          setError("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại 🔑");
          localStorage.removeItem("token");
        } else if (status === 403) {
          // --- LOGIC MỚI KHI GẶP LỖI 403 ---
          setError(data?.error || "Chương này cần mua để đọc ❌");
          setPurchaseInfo(data); // Lưu thông tin { error, price }
          // --- KẾT THÚC LOGIC MỚI ---
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

  // Sẽ chạy lại mỗi khi `id` (chapterId) thay đổi
  useEffect(() => {
    // --- TÍCH HỢP TTS ---
    // Dừng đọc TTS nếu đang đọc khi chuyển chương
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    // --- KẾT THÚC TTS ---

    fetchChapter();
  }, [id]);

  // --- TÍCH HỢP TTS ---
  // Dừng đọc khi rời khỏi trang (unmount)
  useEffect(() => {
    // Cleanup function này sẽ chạy khi component bị unmount
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []); // Dependency rỗng nghĩa là nó chỉ chạy 1 lần lúc mount và cleanup lúc unmount
  // --- KẾT THÚC TTS ---

  // --- HÀM MỚI ĐỂ XỬ LÝ MUA CHƯƠNG ---
  const handleBuyChapter = async () => {
    if (!id) return; // Không có chapterId

    setIsBuying(true);
    setError(""); // Xóa lỗi cũ
    const token = sessionStorage.getItem("token");

    if (!token) {
      setError("Bạn cần đăng nhập để thực hiện giao dịch. 🔑");
      setIsBuying(false);
      return;
    }

    try {
      // Gọi API POST /chapter/{chapterId}/buy
      await axios.post(
        `https://be-ink-realm-c7jk.vercel.app/chapter/${id}/buy`,
        {}, // Body rỗng, vì chapterId đã có ở URL
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Mua thành công!
      alert("Mua chương thành công! 🎉");
      setPurchaseInfo(null); // Xóa thông tin cần mua
      setIsBuying(false);
      await fetchChapter(); // Tải lại dữ liệu chương (lần này sẽ có nội dung)
    } catch (err) {
      console.error("Lỗi khi mua chương:", err);
      if (err.response) {
        // Hiển thị lỗi từ server (ví dụ: "Số dư không đủ, vui lòng nạp thêm xu để mua đọc!")
        setError(err.response.data?.message || "Đã xảy ra lỗi khi mua.");
      } else {
        setError("Không thể kết nối đến máy chủ.");
      }
      setIsBuying(false);
    }
  };
  // --- KẾT THÚC HÀM MỚI ---

  // --- HÀM MỚI XỬ LÝ TTS ---
  const handleSpeak = () => {
    // Kiểm tra trình duyệt có hỗ trợ không
    if (!("speechSynthesis" in window)) {
      alert("Xin lỗi, trình duyệt của bạn không hỗ trợ chức năng này.");
      return;
    }

    if (isSpeaking) {
      // Nếu đang đọc -> Dừng
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      // Nếu chưa đọc -> Bắt đầu đọc
      if (!chapterText) {
        alert("Nội dung chương chưa được tải hoặc chương này cần mua.");
        return;
      }

      // Tạo một đối tượng phát âm
      // Thêm tiêu đề chương vào nội dung đọc
      const fullTextToSpeak = `${
        chapter?.chapterTitle || "Bắt đầu đọc"
      }. ${chapterText}`;

      const utterance = new SpeechSynthesisUtterance(fullTextToSpeak);

      // Cố gắng tìm giọng tiếng Việt
      // (Lưu ý: getVoices() có thể bất đồng bộ, nên set lang là cách an toàn)
      utterance.lang = "vi-VN";

      const voices = window.speechSynthesis.getVoices();
      const vietnameseVoice = voices.find((voice) =>
        voice.lang.startsWith("vi")
      );
      if (vietnameseVoice) {
        utterance.voice = vietnameseVoice;
      }

      // Tùy chỉnh tốc độ, cao độ (tùy chọn)
      utterance.rate = 1; // Tốc độ (1 là bình thường)
      utterance.pitch = 1; // Cao độ

      // Xử lý sự kiện khi đọc xong (hoặc bị lỗi)
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        console.error("Đã xảy ra lỗi khi đọc TTS.");
      };

      // Bắt đầu đọc
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };
  // --- KẾT THÚC HÀM TTS ---

  // Comment functions
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
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="w-full bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5" />{" "}
              <span className="text-sm">Quay lại</span>
            </button>
            <img
              src={logo}
              alt="InkRealm"
              className="h-8 object-contain cursor-pointer"
              onClick={() =>
                navigate(isLoggedIn ? "/HomeLoggedIn" : "/HomePage")
              }
            />
          </div>
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Tìm truyện..."
              className="w-full border border-gray-300 rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" />
          </div>
          <div className="flex items-center space-x-6">
            {!isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/LoginPage"
                  className="flex items-center bg-[#2E5BFF] hover:bg-indigo-600
                                       text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-sm"
                >
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Đăng nhập
                </Link>

                <Link
                  to="/RegisterPage"
                  className="flex items-center bg-[#2E5BFF] hover:bg-indigo-600
                                       text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-sm"
                >
                  <i className="fas fa-user-plus mr-2"></i>
                  Đăng ký
                </Link>
              </div>
            ) : (
              <>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="user avatar"
                  className="w-9 h-9 rounded-full border cursor-pointer hover:opacity-80"
                  onClick={() => navigate("/Profile")}
                />
                <button
                  onClick={() => {
                    sessionStorage.removeItem("isLoggedIn");
                    window.location.href = "/HomePage";
                  }}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  <LogOut className="w-4 h-4 mr-1" /> <span>Đăng xuất</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto mt-8 p-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {/* Title & meta */}
          <div className="flex gap-6">
            <div className="w-28 h-36 flex-shrink-0">
              <img
                src={novel?.novel_img_url || defaultCover}
                alt={novel?.novelTitle || "Book cover"}
                className="w-full h-full object-cover rounded-md border"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900">
                    {novel?.novelTitle || "Đang tải..."}
                  </h1>
                  <h1 className="mt-2 text-sm text-slate-600">
                    {chapter?.chapterTitle || "Đang tải..."}
                  </h1>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className="px-3 py-2 rounded-full bg-[#2E5BFF] text-white text-sm shadow-sm"
                    title="Đọc"
                  >
                    Đọc truyện
                  </button>
                  <button className="px-3 py-2 rounded-full border border-gray-200 text-sm">
                    Theo dõi
                  </button>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-6">
                <span className="inline-flex items-center bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
                  Truyện dịch
                </span>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-700">
                    <BookOpen className="w-4 h-4 text-[#2E5BFF]" />
                    <span className="text-slate-600">
                      {totalChapters || 0} chương
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <User className="w-4 h-4 text-[#2E5BFF]" />
                    <span className="text-slate-600">{novel?.author || ""}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Clock className="w-4 h-4 text-[#2E5BFF]" />
                    <span className="text-slate-600">
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
              className="flex items-center gap-2 px-4 py-2 rounded-md border text-sm bg-white hover:shadow-sm disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" /> Chương trước
            </button>
            <button
              onClick={() => navigate(`/ChapterList/${storyId}`)}
              className="flex items-center gap-2 px-4 py-2 rounded-md border text-sm bg-white hover:shadow-sm"
            >
              <BookOpen className="w-4 h-4" /> Mục lục
            </button>

            {/* --- NÚT TTS ĐÃ TÍCH HỢP --- */}
            <button
              onClick={handleSpeak}
              disabled={loading || !chapterText || purchaseInfo} // Không cho đọc khi đang load, chưa có text, hoặc đang ở màn hình mua
              className={`flex items-center gap-2 px-4 py-2 rounded-md border text-sm hover:shadow-sm disabled:opacity-50 ${
                isSpeaking
                  ? "bg-red-50 text-red-600 border-red-200" // Style khi đang đọc
                  : "bg-white" // Style bình thường
              }`}
            >
              {isSpeaking ? (
                <StopCircle className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
              {isSpeaking ? "Dừng đọc" : "Nghe đọc"}
            </button>
            {/* --- KẾT THÚC NÚT TTS --- */}

            <button
              disabled={!chapter?.next?.chapterId}
              onClick={() =>
                chapter?.next &&
                navigate(`/ReadPage/${chapter.next.chapterId}`, {
                  state: { storyId },
                })
              }
              className="flex items-center gap-2 px-4 py-2 rounded-md border text-sm bg-white hover:shadow-sm disabled:opacity-50"
            >
              Chương sau <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* --- CONTENT (LOGIC ĐÃ CẬP NHẬT) --- */}
          <article className="mt-8 text-gray-800 leading-8 prose max-w-none">
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin w-5 h-5" /> Đang tải chương...
              </div>
            ) : error ? (
              <div className="text-center">
                {purchaseInfo ? (
                  // Hiển thị giao diện Mua chương
                  <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h3 className="text-lg font-semibold text-yellow-800">
                      {purchaseInfo.error || "Chương này cần mua"}
                    </h3>
                    <p className="text-yellow-700 mt-2">
                      Vui lòng mua chương để tiếp tục đọc.
                    </p>
                    <button
                      onClick={handleBuyChapter}
                      disabled={isBuying}
                      className="mt-4 px-6 py-2 bg-[#2E5BFF] text-white rounded-full font-semibold hover:bg-indigo-600 disabled:bg-gray-400 flex items-center justify-center mx-auto shadow-md"
                    >
                      {isBuying ? (
                        <Loader2 className="animate-spin w-4 h-4 mr-2" />
                      ) : null}
                      {isBuying
                        ? "Đang xử lý..."
                        : `Mua ngay (Giá: ${purchaseInfo.price} 🪙)`}
                    </button>

                    {/* Hiển thị lỗi Mua hàng (vd: Số dư không đủ) */}
                    {!isBuying && error && error !== purchaseInfo.error && (
                      <p className="text-red-600 text-sm mt-3">{error}</p>
                    )}
                  </div>
                ) : (
                  // Hiển thị lỗi khác (vd: 404, 500)
                  <div className="text-red-600">{error}</div>
                )}
              </div>
            ) : (
              // Hiển thị nội dung chương
              chapterText && (
                <>
                  <div className="whitespace-pre-line">{chapterText}</div>
                </>
              )
            )}
          </article>
          {/* --- KẾT THÚC CONTENT --- */}

          {/* Comments */}
          <section className="mt-10">
            <hr className="my-6 border-gray-200" />
            <h3 className="text-xl font-semibold mb-3">Bình luận</h3>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Viết bình luận..."
              className="w-full border border-gray-200 rounded-md p-3 text-sm resize-none h-24"
            />
            <div className="flex justify-between mt-3">
              <button
                onClick={addComment}
                className="px-4 py-2 bg-[#2E5BFF] text-white rounded-md text-sm"
              >
                Gửi bình luận
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortOrder("new")}
                  className={`px-3 py-1 rounded-md text-sm ${
                    sortOrder === "new"
                      ? "bg-indigo-50 text-[#2E5BFF] font-medium"
                      : "bg-gray-50 text-slate-600 hover:bg-gray-100"
                  }`}
                >
                  Mới nhất
                </button>
                <button
                  onClick={() => setSortOrder("old")}
                  className={`px-3 py-1 rounded-md text-sm ${
                    sortOrder === "old"
                      ? "bg-indigo-50 text-indigo-600 font-medium"
                      : "bg-gray-50 text-slate-600 hover:bg-gray-100"
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
                      <div className="font-medium text-sm">{c.user}</div>
                      <div className="text-xs text-slate-500">· {c.time}</div>
                    </div>
                    <p className="text-sm text-slate-700 mt-1">{c.text}</p>
                    <div className="border-t border-gray-100 mt-3" />
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