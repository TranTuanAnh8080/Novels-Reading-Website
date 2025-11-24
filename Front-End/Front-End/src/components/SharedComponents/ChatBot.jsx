import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { X, Send, MessageCircle, Sparkles, ChevronDown, Coins } from "lucide-react";
import logo from "../../assets/chatbotlogo.png";

const STATIC_SCRIPTS = [
  {
    keywords: ["chào", "hi", "hello", "alo", "bắt đầu"],
    response: "Xin chào! 👋 Mình là AI của Ink Realm. Mình có thể giúp đỡ gì cho bạn không nhỉ?",
  },
  {
    keywords: ["nạp", "xu", "mua", "tiền", "vip", "giá"],
    response: "💰 Hướng dẫn Nạp Xu:\n\n- Bạn vào Profile chọn \"Nạp xu\".\n- Sau đó lựa chọn gói nạp phù hợp.\n- Sau khi xác nhận chọn gói, bạn sẽ được đưa tới trang thông tin chuyển khoản.\n- Sau khi chuyển khoản xong, bạn vui lòng đợi 5-10 phút để admin xử lý giao dịch.",
  },
  {
    keywords: ["lỗi", "lag", "bug", "không đọc được"],
    response: "Ouch 🤕. Nếu gặp lỗi, bạn thử F5 lại trang xem sao. Nếu vẫn bị, hãy nhắn ID tài khoản để Admin kiểm tra nhé.",
  },
  {
    keywords: ["đăng ký", "tài khoản", "login"],
    response: "Nút \"Đăng nhập/Đăng ký\" nằm ngay góc trên bên phải màn hình đó ạ. Chỉ mất 30s thôi! 🚀",
  },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: "bot", 
      text: "Chào bạn 👋! Mình có thể giúp đỡ gì cho bạn không nhỉ?" 
    },
  ]);
  const [input, setInput] = useState("");
  
  const [novels, setNovels] = useState([]);
  const [suggestions, setSuggestions] = useState(["Hướng dẫn nạp Xu 💰"]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        const res = await axios.post(
          "https://be-ink-realm-c7jk.vercel.app/novel/all",
          {},
          { headers: { "Content-Type": "application/json" } }
        );
        if (res.data && Array.isArray(res.data)) {
          setNovels(res.data);
          
          const randomNovels = res.data.sort(() => 0.5 - Math.random()).slice(0, 2);
          const dynamicSuggestions = [
            "Hướng dẫn nạp Xu 💰",
            "Truyện gì đang Hot? 🔥",
            ...randomNovels.map(n => `Review ${n.novelTitle} 📖`)
          ];
          setSuggestions(dynamicSuggestions);
        }
      } catch (error) {
        console.error("Bot không tải được dữ liệu truyện:", error);
      }
    };
    fetchNovels();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getBotReply = (text) => {
    const lowerText = text.toLowerCase();

    const foundNovel = novels.find(n => 
        lowerText.includes(n.novelTitle.toLowerCase())
    );

    if (foundNovel) {
        return `📖 **${foundNovel.novelTitle}**\n\n👤 Tác giả: ${foundNovel.author}\n📝 Nội dung: ${foundNovel.novelDescription ? foundNovel.novelDescription.substring(0, 100) + "..." : "Đang cập nhật"}\n\n👉 Bạn có thể tìm trên thanh tìm kiếm để đọc ngay nhé!`;
    }

    if (['hot', 'mới', 'đề cử', 'gợi ý', 'hay'].some(k => lowerText.includes(k))) {
        if (novels.length > 0) {
            const randomPicks = novels.sort(() => 0.5 - Math.random()).slice(0, 3);
            const listText = randomPicks.map(n => `- **${n.novelTitle}** (${n.author})`).join("\n");
            return `Thử đọc mấy bộ này xem, đang được đọc nhiều trên web đó:\n\n${listText}`;
        }
    }

    const staticMatch = STATIC_SCRIPTS.find((item) => 
      item.keywords.some((keyword) => lowerText.includes(keyword))
    );
    if (staticMatch) return staticMatch.response;

    return "Hic, mình chưa hiểu ý bạn lắm 🥺. Bạn thử nhập đúng tên truyện hoặc hỏi về 'Nạp Xu' xem sao?";
  };

  const handleSend = (text = input) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), sender: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botReplyText = getBotReply(text.trim());
      const botMsg = { id: Date.now() + 1, sender: "bot", text: botReplyText };
      
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      <div
        className={`fixed bottom-24 right-6 w-[360px] max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-500 cubic-bezier(0.25, 0.8, 0.25, 1) ${
          isOpen 
            ? "opacity-100 translate-y-0 scale-100" 
            : "opacity-0 translate-y-10 scale-95 pointer-events-none"
        } z-[9999]`}
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-3">
            <div className="relative">
                <img src={logo} alt="Bot" className="w-10 h-10 rounded-full border-2 border-white/30 bg-white p-0.5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-blue-600 rounded-full"></span>
            </div>
            <div className="text-white">
              <h3 className="font-bold text-base">Ink Realm AI</h3>
              <p className="text-xs text-blue-100 flex items-center gap-1">
                <Sparkles size={10} /> Xin chào quý đọc giả!
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-white/80 hover:text-white hover:bg-white/20 p-1.5 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="h-[380px] bg-[#F3F4F6] p-4 overflow-y-auto scroll-smooth flex flex-col gap-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}
            >
              {msg.sender === "bot" && (
                 <img src={logo} alt="Bot" className="w-7 h-7 rounded-full mr-2 self-end mb-1 shadow-sm" />
              )}
              <div
                className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[13.5px] shadow-sm leading-relaxed whitespace-pre-line ${
                  msg.sender === "bot"
                    ? "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                    : "bg-blue-600 text-white rounded-br-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
               <img src={logo} alt="Bot" className="w-7 h-7 rounded-full mr-2 self-end mb-1" />
               <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {!isTyping && (
            <div className="bg-[#F3F4F6] px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
                {suggestions.map((text, idx) => (
                    <button 
                        key={idx}
                        onClick={() => handleSend(text.replace("Review ", "").replace(" 📖", "").replace(" 💰", "").replace(" 🔥", ""))} // Clean text khi gửi
                        className="whitespace-nowrap px-3 py-1.5 bg-white border border-blue-100 text-blue-600 text-xs font-medium rounded-full hover:bg-blue-50 transition shadow-sm active:scale-95"
                    >
                        {text}
                    </button>
                ))}
            </div>
        )}

        <div className="p-3 bg-white border-t border-gray-100">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-1 py-1 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all">
            <input
              type="text"
              placeholder="Nhập tên truyện hoặc hỏi 'Nạp Xu'..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 bg-transparent text-sm text-gray-700 px-4 py-2 focus:outline-none placeholder-gray-400"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className={`p-2 rounded-full transition-all m-1 ${
                  input.trim() 
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md transform hover:scale-105" 
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Send size={18} className={input.trim() ? "ml-0.5" : ""} />
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(37,99,235,0.3)] transition-all duration-300 z-[9999] group ${
            isOpen 
            ? "bg-gray-800 rotate-90 hover:bg-gray-700" 
            : "bg-blue-600 hover:bg-blue-700 hover:scale-110 hover:-translate-y-1"
        }`}
      >
        {isOpen ? (
            <ChevronDown size={32} className="text-white" />
        ) : (
            <>
                <img
                    src={logo}
                    alt="Chat"
                    className="w-9 h-9 object-contain invert brightness-0 group-hover:hidden transition-all"
                />
                <MessageCircle size={32} className="text-white hidden group-hover:block transition-all" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
                </span>
            </>
        )}
      </button>
    </>
  );
}