import React from "react";
import { BookOpen, Headphones, PenSquare, Bookmark, MessageSquare, Share2 } from "lucide-react";

const features = [
  { icon: BookOpen, title: "Giao diện đọc tùy chỉnh", desc: "Điều chỉnh font chữ, cỡ chữ, màu nền theo sở thích cá nhân để có trải nghiệm đọc thoải mái nhất." },
  { icon: Headphones, title: "Text-to-Speech", desc: "Nghe truyện với giọng đọc tự nhiên, có thể dừng, tua tới hoặc lùi dễ dàng khi bạn bận rộn." },
  { icon: PenSquare, title: "Đăng truyện sáng tác", desc: "Chia sẻ tác phẩm của bạn với cộng đồng, nhận phản hồi và xây dựng lượng người hâm mộ riêng." },
  { icon: Bookmark, title: "Đánh dấu tiến độ đọc", desc: "Tự động lưu vị trí đọc cuối cùng, đánh dấu chương đã đọc và tạo danh sách truyện yêu thích." },
  { icon: MessageSquare, title: "Bình luận và đánh giá", desc: "Thảo luận về truyện với cộng đồng, chia sẻ cảm nhận và đánh giá tác phẩm bạn yêu thích." },
  { icon: Share2, title: "Chia sẻ dễ dàng", desc: "Chia sẻ truyện yêu thích với bạn bè qua mạng xã hội hoặc tin nhắn với các liên kết thân thiện." },
];

function FeaturesSection() {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">✨ Tính năng nổi bật</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {features.map((f, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-4 flex items-start gap-3">
            <f.icon className="h-6 w-6 text-blue-600" />
            <div>
              <h3 className="text-sm font-semibold">{f.title}</h3>
              <p className="text-xs text-gray-500">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;
