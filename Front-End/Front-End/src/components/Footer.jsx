import React from "react";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
import logo from "../assets/inkrealm_logo.png";

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Mail, href: "mailto:contact@inkrealm.com" },
];

const exploreLinks = [
  "🔥 Truyện Hot",
  "🆕 Mới Cập Nhật",
  "✅ Hoàn Thành",
  "📚 Thể Loại",
  "✍️ Tác Giả",
];

const supportLinks = [
  "❓ Trợ Giúp",
  "📖 Điều Khoản",
  "🔒 Bảo Mật",
  "🐞 Báo Lỗi",
  "📩 Liên Hệ",
];

const paymentMethods = [
  { src: "https://play-lh.googleusercontent.com/uCtnppeJ9ENYdJaSL5av-ZL1ZM1f3b35u9k8EOEjK3ZdyG509_2osbXGH5qzXVmoFv0", alt: "Momo" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTlp4qW2M8xPofmuZHwEfGi9mNMWUG0zs53A&s", alt: "ZaloPay" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOK-ExH64w4vaz6r2HY7kpEc0SEZKmpq7CKg&s", alt: "Visa" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD7oa6-WXok1YXYt8GN4CWbzJOpeBf69159Q&s", alt: "MasterCard" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdhn3H76U6a2Mn_JcMJoT0btH7KSEDXrFtrXzRuQPSLqHEiiRJqKlr8L8ckFomlbYkLBc&usqp=CAU", alt: "MB" },
];

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 
    text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-10 py-10 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Logo + desc */}
        <div className="md:col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            <img src={logo} alt="InkRealm" className="h-10 w-auto" />
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            Nền tảng đọc truyện chất lượng cao ✨ <br />
            Khám phá hàng ngàn tác phẩm từ nhiều nền văn hoá, mọi lúc, mọi nơi. <br />
            InkRealm không chỉ là nơi để đọc truyện, mà còn là cầu nối giữa độc giả và tác giả,
            mang đến những trải nghiệm văn học trực tuyến tuyệt vời. <br />
            Hãy cùng chúng tôi khám phá thế giới truyện đầy cảm xúc và sáng tạo!
          </p>

          {/* Social */}
          <div className="flex space-x-4 mt-5">
            {socialLinks.map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="p-2 rounded-full bg-gray-700/40 hover:bg-indigo-600 transition"
              >
                <Icon className="h-5 w-5 text-gray-200 hover:text-white" />
              </a>
            ))}
          </div>
        </div>

        {/* Khám phá */}
        <div>
          <h3 className="font-semibold text-white mb-4">Khám Phá</h3>
          <ul className="space-y-2 text-sm">
            {exploreLinks.map((item, i) => (
              <li key={i} className="hover:text-white cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Hỗ trợ */}
        <div>
          <h3 className="font-semibold text-white mb-4">Hỗ Trợ</h3>
          <ul className="space-y-2 text-sm">
            {supportLinks.map((item, i) => (
              <li key={i} className="hover:text-white cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Về InkRealm + Thanh toán */}
        <div>
          <h3 className="font-semibold text-white mb-4">Về InkRealm</h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            InkRealm cam kết mang lại trải nghiệm đọc truyện nhanh chóng, mượt
            mà và hiện đại, dành cho mọi độc giả yêu thích văn học trực tuyến.
          </p>

          <h4 className="font-semibold text-white mb-3">
            Phương thức thanh toán
          </h4>
          <div className="flex space-x-3">
            {paymentMethods.map(({ src, alt }, i) => (
              <img
                key={i}
                src={src}
                alt={alt}
                className="h-10 w-auto p-1 rounded-xl shadow-sm"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700/70 text-center py-5 text-xs text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-blue-500">InkRealm</span>. Mọi quyền
        được bảo lưu.
      </div>
    </footer>
  );
}

export default Footer;
