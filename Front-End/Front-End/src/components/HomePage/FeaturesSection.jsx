import {
  BookOpen,
  Headphones,
  PenSquare,
  Bookmark,
  MessageSquare,
  Share2,
  Zap 
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Giao diện đọc tùy chỉnh",
    desc: "Điều chỉnh font chữ, cỡ chữ, màu nền theo sở thích cá nhân để có trải nghiệm đọc thoải mái nhất.",
  },
  {
    icon: Headphones,
    title: "Text-to-Speech",
    desc: "Nghe truyện với giọng đọc tự nhiên, có thể dừng, tua tới hoặc lùi dễ dàng khi bạn bận rộn.",
  },
  {
    icon: PenSquare,
    title: "Đăng truyện sáng tác",
    desc: "Chia sẻ tác phẩm của bạn với cộng đồng, nhận phản hồi và xây dựng lượng người hâm mộ riêng.",
  },
  {
    icon: Bookmark,
    title: "Đánh dấu tiến độ đọc",
    desc: "Tự động lưu vị trí đọc cuối cùng, đánh dấu chương đã đọc và tạo danh sách truyện yêu thích.",
  },
  {
    icon: MessageSquare,
    title: "Bình luận và đánh giá",
    desc: "Thảo luận về truyện với cộng đồng, chia sẻ cảm nhận và đánh giá tác phẩm bạn yêu thích.",
  },
  {
    icon: Share2,
    title: "Chia sẻ dễ dàng",
    desc: "Chia sẻ truyện yêu thích với bạn bè qua mạng xã hội hoặc tin nhắn với các liên kết thân thiện.",
  },
];

function FeaturesSection() {
  return (
    <section className="py-10 px-2">
      
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-[#2E5BFF] dark:text-blue-400">
           <Zap className="w-6 h-6" fill="currentColor" />
        </div>

        <div className="relative">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-none pb-1">
              Tính năng nổi bật
            </h2>
            <span className="absolute -bottom-1 left-0 w-1/2 h-[3px] bg-[#2E5BFF] rounded-full"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 transition-all duration-300 
                       border border-gray-100 dark:border-gray-700
                       hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none dark:from-blue-900/10"></div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-[#2E5BFF] mb-4 transition-colors group-hover:bg-[#2E5BFF] group-hover:text-white dark:bg-gray-700 dark:text-blue-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white">
                <f.icon strokeWidth={2} className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-grow">
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;