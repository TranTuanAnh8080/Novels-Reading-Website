import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import logo from "../../assets/chatbotlogo.png";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Xin chào 👋! Bạn muốn biết bộ truyện nào sắp ra không?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const botReply = getBotReply(input.trim());
      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: "bot", text: botReply }]);
    }, 800);
  };

  const getBotReply = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes("solo leveling"))
      return "Phần tiếp theo của *Solo Leveling* dự kiến ra mắt tháng 11/2025 nha!";
    if (lower.includes("truyện mới") || lower.includes("mới ra"))
      return "Sắp tới sẽ có nhiều truyện hành động mới 🔥";
    if (lower.includes("chào")) return "Xin chào bạn 😄! Mình là Ink Realm Bot.";
    return "Mình chưa hiểu lắm 🥺 — bạn có thể nói rõ hơn không?";
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {/* Chat Box */}
      <div
        className={`fixed bottom-28 right-8 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transform transition-all duration-500 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        } z-[9999]`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white font-bold text-gray-900">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Ink Realm" className="w-5 h-5 rounded-full" />
            <h3 className="font-semibold text-sm">Ink Realm Chat Bot</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:opacity-80 transition-opacity">
            <X size={18} />
          </button>
        </div>

        <div className="border-t border-gray-300" />

        {/* Messages */}
        <div className="p-4 space-y-3 max-h-60 overflow-y-auto scroll-smooth">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`px-3 py-2 rounded-xl text-sm ${
                  msg.sender === "bot"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-[#2E5BFF] text-white"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
        <div className="border-t border-gray-300 p-3 bg-gray-50 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Nhập tin nhắn..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2E5BFF]/50"
          />
          <button
            onClick={handleSend}
            className="bg-[#2E5BFF] text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 transition"
          >
            Gửi
          </button>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#2E5BFF] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-2xl hover:rotate-12 animate-bounce-slow group z-[9999]"
      >
        <img
          src={logo}
          alt="ChatBot Logo"
          className="w-8 h-8 rounded-full object-contain brightness-0 invert"
        />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
      </button>
    </>
  );
}
