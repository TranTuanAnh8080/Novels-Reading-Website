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
  } from "lucide-react";
  import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
  import axios from "axios";
  import logo from "../assets/inkrealm_logo.png";
  import defaultCover from "../assets/book-cover-blank.jpg";
  import Footer from "../components/SharedComponents/Footer";

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

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [sortOrder, setSortOrder] = useState("new");
    const [isLoggedIn, setIsLoggedIn] = useState(
      sessionStorage.getItem("isLoggedIn") === "true"
    );

    const fetchChapter = async () => {
      try {
        setLoading(true);
        setError("");
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
        setChapterText(textRes.data.chapterText);

        // ⚡️ 4. Gọi thêm API /novel/novelId để lấy tên truyện
        if (storyId) {
          const novelRes = await axios.post(
            "https://be-ink-realm-c7jk.vercel.app/novel/novelId",
            { storyId: storyId }
          );
          setNovel(novelRes.data);
        }

        // 5. Lấy comments (tạm giả lập, có thể fetch API thật)
        setComments([
          { user: "NguyenReader", avatar: "https://randomuser.me/api/portraits/men/32.jpg", text: "Chương này hay quá!", time: "2 giờ trước" },
          { user: "TruyenFan", avatar: "https://randomuser.me/api/portraits/women/44.jpg", text: "Dịch mượt quá", time: "5 giờ trước" }
        ]);
      } catch (err) {
        console.error(err);
        if (err.response) {
          const { status, data } = err.response;
          if (status === 401) {
            setError("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại 🔑");
            localStorage.removeItem("token");
          } else if (status === 403) {
            setError(data?.error || "Chương này cần mua để đọc ❌");
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
      fetchChapter();
    }, [id]);

    // Comment functions
    const addComment = () => {
      if (!newComment.trim()) return;
      const newC = { user: "Bạn đọc mới", avatar: "https://randomuser.me/api/portraits/lego/1.jpg", text: newComment.trim(), time: "Vừa xong" };
      setComments(prev => [newC, ...prev]);
      setNewComment("");
      commentsRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const sortedComments = sortOrder === "new" ? comments : [...comments].reverse();

    return (
      <div className="min-h-screen bg-white text-gray-900">
        {/* Header */}
        <header className="w-full bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                <ChevronLeft className="w-5 h-5" /> <span className="text-sm">Quay lại</span>
              </button>
              <img src={logo} alt="InkRealm" className="h-8 object-contain cursor-pointer" onClick={() => navigate(isLoggedIn ? "/HomeLoggedIn" : "/HomePage")} />
            </div>
            <div className="relative w-80">
              <input type="text" placeholder="Tìm truyện..." className="w-full border border-gray-300 rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
                  <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="user avatar" className="w-9 h-9 rounded-full border cursor-pointer hover:opacity-80" onClick={() => navigate("/Profile")} />
                  <button onClick={() => { sessionStorage.removeItem("isLoggedIn"); window.location.href = "/HomePage"; }} className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm font-medium">
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
                  src={novel?.coverImage || defaultCover}
                  alt={novel?.novelTitle || "Book cover"}
                  className="w-full h-full object-cover rounded-md border"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-extrabold text-slate-900">{novel?.novelTitle || "Đang tải..."}</h1>
                    <h1 className="mt-2 text-sm text-slate-600">{chapter?.chapterTitle || "Đang tải..."}</h1>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-3 py-2 rounded-full bg-[#2E5BFF] text-white text-sm shadow-sm" title="Đọc">Đọc truyện</button>
                    <button className="px-3 py-2 rounded-full border border-gray-200 text-sm">Theo dõi</button>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-6">
                  <span className="inline-flex items-center bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">Truyện dịch</span>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-slate-700"><BookOpen className="w-4 h-4 text-[#2E5BFF]" /><span className="text-slate-600">{chapter?.chapter || 0} chương</span></div>
                    <div className="flex items-center gap-2 text-slate-700"><User className="w-4 h-4 text-[#2E5BFF]" /><span className="text-slate-600">{chapter?.author || ""}</span></div>
                    <div className="flex items-center gap-2 text-slate-700"><Clock className="w-4 h-4 text-[#2E5BFF]" /><span className="text-slate-600">{chapter?.updatedAt || ""}</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chapter nav */}
            <div className="mt-8 flex justify-center items-center gap-3">
              <button disabled={!chapter?.pre?.chapterId} onClick={() => chapter?.pre && navigate(`/ReadPage/${chapter.pre.chapterId}`, { state: { storyId } })} className="flex items-center gap-2 px-4 py-2 rounded-md border text-sm bg-white hover:shadow-sm disabled:opacity-50"><ChevronLeft className="w-4 h-4" /> Chương trước</button>
              <button onClick={() => navigate(`/ChapterList/${storyId}`)} className="flex items-center gap-2 px-4 py-2 rounded-md border text-sm bg-white hover:shadow-sm"><BookOpen className="w-4 h-4" /> Mục lục</button>
              <button disabled={!chapter?.next?.chapterId} onClick={() => chapter?.next && navigate(`/ReadPage/${chapter.next.chapterId}`, { state: { storyId } })} className="flex items-center gap-2 px-4 py-2 rounded-md border text-sm bg-white hover:shadow-sm disabled:opacity-50">Chương sau <ChevronRight className="w-4 h-4" /></button>
            </div>

          {/* Content */}
          <article className="mt-8 text-gray-800 leading-8 prose max-w-none">
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin w-5 h-5" /> Đang tải chương...
              </div>
            ) : error ? (
              <div className="text-red-600 text-center">{error}</div>
            ) : (
              chapterText && (
                <>
                  {/* Nội dung còn lại của chương */}
                  <div className="whitespace-pre-line">
                    {chapterText.split('\n').slice(2).join('\n')}
                  </div>
                </>
              )
            )}
          </article>

            {/* Comments */}
            <section className="mt-10">
              <hr className="my-6 border-gray-200" />
              <h3 className="text-xl font-semibold mb-3">Bình luận</h3>
              <textarea value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Viết bình luận..." className="w-full border border-gray-200 rounded-md p-3 text-sm resize-none h-24" />
              <div className="flex justify-between mt-3">
                <button onClick={addComment} className="px-4 py-2 bg-[#2E5BFF] text-white rounded-md text-sm">Gửi bình luận</button>
                <div className="flex gap-2">
                  <button onClick={() => setSortOrder("new")} className={`px-3 py-1 rounded-md text-sm ${sortOrder==="new"?"bg-indigo-50 text-[#2E5BFF] font-medium":"bg-gray-50 text-slate-600 hover:bg-gray-100"}`}>Mới nhất</button>
                  <button onClick={() => setSortOrder("old")} className={`px-3 py-1 rounded-md text-sm ${sortOrder==="old"?"bg-indigo-50 text-indigo-600 font-medium":"bg-gray-50 text-slate-600 hover:bg-gray-100"}`}>Cũ nhất</button>
                </div>
              </div>
              <div ref={commentsRef} className="space-y-6 mt-4">
                {sortedComments.map((c, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <img src={c.avatar} className="w-10 h-10 rounded-full object-cover" alt={c.user} />
                    <div className="flex-1">
                      <div className="flex items-center gap-3"><div className="font-medium text-sm">{c.user}</div><div className="text-xs text-slate-500">· {c.time}</div></div>
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
