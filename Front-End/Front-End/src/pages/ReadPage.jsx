import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  User,
  Clock,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/inkrealm_logo.png";
import Footer from "../components/Footer";

const sampleChapters = [
  {
    id: 1,
    title: "Chương 1: Khởi đầu bí ẩn",
    content: `Trong căn phòng tối tăm, ánh sáng lờ mờ rọi xuống đôi mắt nhắm hờ của một người đang nằm bất động trên chiếc giường cũ kỹ. Klein Moretti ngồi trước chiếc bàn gỗ cũ kỹ, đôi mắt nhìn chằm chằm vào cuốn sách bí ẩn trước mặt.

"Đây là gì?" Anh thầm nghĩ khi lật từng trang giấy vàng ố. Những ký tự lạ lùng dường như nhảy múa trước mắt, tạo ra cảm giác choáng váng khó tả. Một luồng gió lạnh bất ngờ thổi qua, khiến ngọn nến rung rinh.

Đột nhiên, một tiếng thì thầm vang lên từ phía tủ không: "Ngươi có muốn biết sự thật không?" Klein giật mình, nhìn quanh phòng nhưng không thấy ai. Cuốn sách trong tay bỗng nóng lên, những dòng chữ phát sáng một cách kỳ lạ.

"Tôi... tôi muốn biết," Klein lầm bầm, không biết mình đang nói với ai. Ngay khi những từ này rời khỏi môi, thế giới xung quanh anh bắt đầu xoay tít. Mọi thứ trôi dần mờ ảo, như thể anh đang rơi vào một giấc mơ kỳ quái.

Khi tỉnh dậy, Klein thấy mình đang ở một nơi hoàn toàn khác. Đó là một căn phòng rộng lớn với những cột đá cổ kính, trần nhà cao vút biến mất trong bóng tối. Trên sàn, một vòng tròn phức tạp được vẽ bằng những ký hiệu ma thuật phát sáng.

"Chào mừng đến với Thế giới Bí Ẩn," một giọng nói trầm ấm vang lên. Klein quay người lại và thấy một bóng đen đang đứng ở góc phòng. "Ngươi đã được chọn để trở thành một Beyonder. Hành trình của ngươi bắt đầu từ đây."

"Chào mừng đến với Thế giới Bí Ẩn," một giọng nói trầm ấm vang lên. Klein quay người lại và thấy một bóng đen đang đứng ở góc phòng. "Ngươi đã được chọn để trở thành một Beyonder. Hành trình của ngươi bắt đầu từ đây."

"Đây là sức mạnh của con đường Diviner," bóng đen tiếp tục. "Ngươi có thể nhìn thấy tương lai, đọc được số phận. Nhưng hãy nhớ, mọi sức mạnh đều có cái giá của nó."`,

  },
  {
    id: 2,
    title: "Chương 2: Cuộc Họp Tarot",
    content: `Trong căn phòng tối tăm, ánh sáng lờ mờ rọi xuống đôi mắt nhắm hờ của một người đang nằm bất động trên chiếc giường cũ kỹ. Klein Moretti ngồi trước chiếc bàn gỗ cũ kỹ, đôi mắt nhìn chằm chằm vào cuốn sách bí ẩn trước mặt.

"Đây là gì?" Anh thầm nghĩ khi lật từng trang giấy vàng ố. Những ký tự lạ lùng dường như nhảy múa trước mắt, tạo ra cảm giác choáng váng khó tả. Một luồng gió lạnh bất ngờ thổi qua, khiến ngọn nến rung rinh.

Đột nhiên, một tiếng thì thầm vang lên từ phía tủ không: "Ngươi có muốn biết sự thật không?" Klein giật mình, nhìn quanh phòng nhưng không thấy ai. Cuốn sách trong tay bỗng nóng lên, những dòng chữ phát sáng một cách kỳ lạ.

"Tôi... tôi muốn biết," Klein lầm bầm, không biết mình đang nói với ai. Ngay khi những từ này rời khỏi môi, thế giới xung quanh anh bắt đầu xoay tít. Mọi thứ trôi dần mờ ảo, như thể anh đang rơi vào một giấc mơ kỳ quái.

Khi tỉnh dậy, Klein thấy mình đang ở một nơi hoàn toàn khác. Đó là một căn phòng rộng lớn với những cột đá cổ kính, trần nhà cao vút biến mất trong bóng tối. Trên sàn, một vòng tròn phức tạp được vẽ bằng những ký hiệu ma thuật phát sáng.

"Chào mừng đến với Thế giới Bí Ẩn," một giọng nói trầm ấm vang lên. Klein quay người lại và thấy một bóng đen đang đứng ở góc phòng. "Ngươi đã được chọn để trở thành một Beyonder. Hành trình của ngươi bắt đầu từ đây."

"Chào mừng đến với Thế giới Bí Ẩn," một giọng nói trầm ấm vang lên. Klein quay người lại và thấy một bóng đen đang đứng ở góc phòng. "Ngươi đã được chọn để trở thành một Beyonder. Hành trình của ngươi bắt đầu từ đây."

"Đây là sức mạnh của con đường Diviner," bóng đen tiếp tục. "Ngươi có thể nhìn thấy tương lai, đọc được số phận. Nhưng hãy nhớ, mọi sức mạnh đều có cái giá của nó."`,

  },
  {
    id: 3,
    title: "Chương 3: Siêu Phàm Giả",
    content: `Trong căn phòng tối tăm, ánh sáng lờ mờ rọi xuống đôi mắt nhắm hờ của một người đang nằm bất động trên chiếc giường cũ kỹ. Klein Moretti ngồi trước chiếc bàn gỗ cũ kỹ, đôi mắt nhìn chằm chằm vào cuốn sách bí ẩn trước mặt.

"Đây là gì?" Anh thầm nghĩ khi lật từng trang giấy vàng ố. Những ký tự lạ lùng dường như nhảy múa trước mắt, tạo ra cảm giác choáng váng khó tả. Một luồng gió lạnh bất ngờ thổi qua, khiến ngọn nến rung rinh.

Đột nhiên, một tiếng thì thầm vang lên từ phía tủ không: "Ngươi có muốn biết sự thật không?" Klein giật mình, nhìn quanh phòng nhưng không thấy ai. Cuốn sách trong tay bỗng nóng lên, những dòng chữ phát sáng một cách kỳ lạ.

"Tôi... tôi muốn biết," Klein lầm bầm, không biết mình đang nói với ai. Ngay khi những từ này rời khỏi môi, thế giới xung quanh anh bắt đầu xoay tít. Mọi thứ trôi dần mờ ảo, như thể anh đang rơi vào một giấc mơ kỳ quái.

Khi tỉnh dậy, Klein thấy mình đang ở một nơi hoàn toàn khác. Đó là một căn phòng rộng lớn với những cột đá cổ kính, trần nhà cao vút biến mất trong bóng tối. Trên sàn, một vòng tròn phức tạp được vẽ bằng những ký hiệu ma thuật phát sáng.

"Chào mừng đến với Thế giới Bí Ẩn," một giọng nói trầm ấm vang lên. Klein quay người lại và thấy một bóng đen đang đứng ở góc phòng. "Ngươi đã được chọn để trở thành một Beyonder. Hành trình của ngươi bắt đầu từ đây."

"Chào mừng đến với Thế giới Bí Ẩn," một giọng nói trầm ấm vang lên. Klein quay người lại và thấy một bóng đen đang đứng ở góc phòng. "Ngươi đã được chọn để trở thành một Beyonder. Hành trình của ngươi bắt đầu từ đây."

"Đây là sức mạnh của con đường Diviner," bóng đen tiếp tục. "Ngươi có thể nhìn thấy tương lai, đọc được số phận. Nhưng hãy nhớ, mọi sức mạnh đều có cái giá của nó."`,

  },
];

export default function ReadPageRefined() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [comments, setComments] = useState([
    {
      user: "NguyenReader",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "Chương này hay quá! Klein bắt đầu hành trình trở thành Beyonder rồi. Mong chờ chương tiếp theo!",
      time: "2 giờ trước",
    },
    {
      user: "TruyenFan",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "Dịch rất mượt mà và dễ hiểu. Cảm ơn team dịch đã mang đến trải nghiệm hay như vậy!",
      time: "5 giờ trước",
    },
    {
      user: "MysteryLover",
      avatar: "https://randomuser.me/api/portraits/men/12.jpg",
      text: "Không khí bí ẩn được xây dựng rất tốt. Tác giả rất biết cách tạo hồi hộp cho người đọc.",
      time: "1 ngày trước",
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [sortOrder, setSortOrder] = useState("new"); // "new" | "old"
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true" 
  );
  const commentsRef = useRef(null);

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

  const chapter = sampleChapters[current];

  function addComment() {
    if (!newComment.trim()) return;
    const newC = {
      user: "Bạn đọc mới",
      avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
      text: newComment.trim(),
      time: "Vừa xong",
    };
    setComments((prev) => [newC, ...prev]);
    setNewComment("");

    if (commentsRef.current) {
      commentsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  const sortedComments = sortOrder === "new" ? comments : [...comments].reverse();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="w-full bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo + back */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5" />
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

          {/* Search nhỏ */}
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Tìm truyện..."
              className="w-full border border-gray-300 rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" />
          </div>

          {/* User / Login */}
          <div className="flex items-center space-x-6">
            {!isLoggedIn ? (
              <button
                onClick={() => navigate("/LoginPage")}
                className="bg-[#2E5BFF] text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-sm hover:bg-[#0369A1]"
              >
                Đăng nhập
              </button>
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
                    localStorage.removeItem("isLoggedIn");
                    window.location.href = "/HomePage";
                  }}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  <span>Đăng xuất</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main white card centered */}
      <main className="max-w-5xl mx-auto mt-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {/* Header area: title, subtitle, badge & meta line */}
          <div className="flex gap-6">
            {/* cover (small) */}   
            <div className="w-28 h-36 flex-shrink-0">
              <img
                src="https://www.nae.vn/ttv/ttv/public/images/story/23b9f814404ee0a32d03f7d09d762075ef88b0730b0537c8f70ee36c1b37af5e.jpg"
                alt="Bìa Quỷ Bí Chi Chủ"
                className="w-full h-full object-cover rounded-md border"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900">
                    Quỷ Bí Chi Chủ
                  </h1>
                  <div className="mt-2 text-sm text-slate-600">{chapter.title}</div>
                </div>

                {/* small action group on the right (optional) */}
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

              {/* badge and meta */}
              <div className="mt-4 flex items-center gap-6">
                <span className="inline-flex items-center bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
                  Truyện dịch
                </span>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-700">
                    <BookOpen className="w-4 h-4 text-[#2E5BFF]" />
                    <span className="text-slate-600">1.432 chương</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <User className="w-4 h-4 text-[#2E5BFF]" />
                    <span className="text-slate-600">Cuttlefish That Loves Diving</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Clock className="w-4 h-4 text-[#2E5BFF]" />
                    <span className="text-slate-600">Cập nhật: 2 giờ trước</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter nav buttons (centered) */}
          <div className="mt-8 flex justify-center items-center gap-3">
            <button
              onClick={() => setCurrent((s) => Math.max(0, s - 1))}
              disabled={current === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-md border text-sm bg-white hover:shadow-sm disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" /> Chương trước
            </button>

            <button
              onClick={() => navigate("/ChapterList")}
              className="flex items-center gap-2 px-4 py-2 rounded-md border text-sm bg-white hover:shadow-sm"
            >
              <BookOpen className="w-4 h-4" /> Mục lục
            </button>

            <button
              onClick={() => setCurrent((s) => Math.min(sampleChapters.length - 1, s + 1))}
              disabled={current === sampleChapters.length - 1}
              className="flex items-center gap-2 px-4 py-2 rounded-md border text-sm bg-white hover:shadow-sm disabled:opacity-50"
            >
              Chương sau <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <article className="mt-8 text-gray-800 leading-8 prose max-w-none whitespace-pre-line">
            {chapter.content}
          </article>

          {/* Truyện đề cử */}
          <section className="mt-10">
            <h3 className="text-xl font-semibold mb-4">Truyện đề cử</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-gray-100 rounded-lg p-4">
                <h4 className="font-semibold">Solo Leveling</h4>
                <p className="text-sm text-slate-600 mt-2">
                  Sung Jin-Woo, một thợ săn hạng E yếu nhất, bất ngờ có được khả năng tăng cấp độ như trong game. Anh sẽ trở thành thợ săn mạnh nhất thế giới.
                </p>
                <button className="mt-4 px-3 py-2 bg-[#2E5BFF] text-white rounded-md text-sm">Đọc ngay</button>
              </div>

              <div className="bg-slate-50 border border-gray-100 rounded-lg p-4">
                <h4 className="font-semibold">Chuyển Sinh Thành Slime</h4>
                <p className="text-sm text-slate-600 mt-2">
                  Satoru Mikami chuyển sinh thành slime trong thế giới fantasy và dần xây dựng một quốc gia monster hùng mạnh với những đồng minh đáng tin cậy.
                </p>
                <button className="mt-4 px-3 py-2 bg-[#2E5BFF] text-white rounded-md text-sm">Đọc ngay</button>
              </div>
            </div>
          </section>

          {/* Comments area */}
          <section className="mt-10">
            <hr className="my-6 border-gray-200" />

            <h3 className="text-xl font-semibold mb-3">Bình luận</h3>

            <div className="mb-4">
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Viết bình luận của bạn..."
                className="w-full border border-gray-200 rounded-md p-3 text-sm resize-none h-24"
            />

            {/* Gửi + Sort chung 1 dòng */}
            <div className="flex justify-between items-center mt-3">
                {/* Nút gửi */}
                <button
                onClick={addComment}
                className="px-4 py-2 bg-[#2E5BFF] text-white rounded-md text-sm"
                >
                Gửi bình luận
                </button>

                {/* Sort buttons */}
                <div className="flex items-center gap-2">
                <button
                    onClick={() => setSortOrder("new")}
                    className={`px-3 py-1 rounded-md text-sm transition ${
                    sortOrder === "new"
                        ? "bg-indigo-50 text-[#2E5BFF] font-medium"
                        : "bg-gray-50 text-slate-600 hover:bg-gray-100"
                    }`}
                >
                    Mới nhất
                </button>
                <button
                    onClick={() => setSortOrder("old")}
                    className={`px-3 py-1 rounded-md text-sm transition ${
                    sortOrder === "old"
                        ? "bg-indigo-50 text-indigo-600 font-medium"
                        : "bg-gray-50 text-slate-600 hover:bg-gray-100"
                    }`}
                >
                    Cũ nhất
                </button>
                </div>
            </div>
            </div>

            <div ref={commentsRef} className="space-y-6">
              {sortedComments.map((c, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <img src={c.avatar} className="w-10 h-10 rounded-full object-cover" alt={c.user} />
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
