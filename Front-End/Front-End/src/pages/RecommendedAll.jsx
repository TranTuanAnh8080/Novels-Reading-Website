import { React, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  BookOpen,
  Flame,
  Eye,
  Plus,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import HeaderLoggedIn from "../components/HomeLoggedInPage/HeaderLoggedIn";
import Footer from "../components/SharedComponents/Footer";

export default function RecommendedAll() {
  // ref cho custom navigation
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <div className="w-full">
        <HeaderLoggedIn />
      </div>

      {/* Container */}
      <div className="w-full max-w-[1280px] mx-auto">
        {/* Banner */}
        <div className="w-full rounded-[16px] overflow-hidden mt-[24px] mb-[32px]">
          <img
            src="https://wallpapercave.com/wp/wp7050559.jpg"
            alt="Banner"
            className="w-full h-[260px] object-cover"
          />
        </div>

        {/* Title */}
        <h2 className="text-[28px] font-medium text-[#111827] mb-[32px]">
          Truyện đề cử cho bạn
        </h2>

        {/* Section: Trọng sinh */}
        <Section title="Truyện trọng sinh - xuyên không" books={trongSinh} />

        {/* Section: Hệ thống */}
        <Section title="Truyện hệ thống" books={heThong} />

        {/* Section: Đồng nhân */}
        <Section title="Truyện đồng nhân" books={dongNhan} />

        {/* Section: Đang đọc gần đây */}
        <SectionHeader
          title="Truyện đang đọc gần đây"
          icon={<BookOpen className="w-5 h-5 text-[#2E5BFF]" />}
        />
        <div className="relative px-8">
          <Swiper
            modules={[Navigation]}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
            className="pb-[40px]"
          >
            {recentBooks.map((b, i) => (
              <SwiperSlide key={i}>
                <BookCardSmall {...b} showContinue />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <button
            ref={prevRef}
            className="absolute top-1/2 -left-8 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5 text-[#111827]" />
          </button>
          <button
            ref={nextRef}
            className="absolute top-1/2 -right-8 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
          >
            <ChevronRight className="w-5 h-5 text-[#111827]" />
          </button>
        </div>

        {/* Section: Nổi bật năm */}
        <SectionHeader
          title="Truyện nổi bật năm"
          icon={<Flame className="w-5 h-5 text-[#F97316]" />}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
          {highlightBooks.map((b, i) => (
            <BookCardHighlight key={i} {...b} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="w-full mt-[48px]">
        <Footer />
      </div>
    </div>
  );
}

/* ---------------- Component ---------------- */

function Section({ title, books }) {
  return (
    <div className="mb-[48px]">
      <div className="flex justify-between items-center mb-[16px]">
        <h3 className="text-[22px] font-medium text-[#111827]">{title}</h3>
        <a
          href="#"
          className="text-[14px] font-medium text-[#2E5BFF] flex items-center gap-1"
        >
          Xem tất cả <ChevronRight className="w-4 h-4" />
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[24px]">
        {books.map((b, i) => (
          <BookCardSmall key={i} {...b} />
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ title, icon }) {
  return (
    <div className="flex justify-between items-center mb-[16px] mt-[40px]">
      <h3 className="flex items-center gap-2 text-[22px] font-medium text-[#111827]">
        {icon}
        {title}
      </h3>
      <a
        href="#"
        className="text-[14px] font-medium text-[#2E5BFF] flex items-center gap-1"
      >
        Xem tất cả <ChevronRight className="w-4 h-4" />
      </a>
    </div>
  );
}

function BookCardSmall({ img, title, desc, status, rating, showContinue }) {
  return (
    <div className="bg-white border border-gray-200 rounded-[12px] p-[12px] flex flex-col hover:shadow-md transition">
      <img
        src={img}
        alt={title}
        className="w-full h-[160px] object-cover rounded-[8px] mb-[12px]"
      />
      <h4 className="font-medium text-[15px] text-[#111827] mb-[6px] line-clamp-1">
        {title}
      </h4>
      <p className="text-[13px] text-[#6B7280] mb-[8px] line-clamp-2">{desc}</p>
      {showContinue ? (
        <button className="mt-auto flex items-center justify-center gap-1 text-[13px] font-medium bg-[#2E5BFF] text-white px-[10px] py-[6px] rounded-[6px]">
          <BookOpen className="w-4 h-4" />
          {status}
        </button>
      ) : (
        <p className="text-[13px] text-[#F59E0B]">{rating}</p>
      )}
    </div>
  );
}

function BookCardHighlight({ img, title, desc, rank, readers, following }) {
  return (
    <div className="bg-white border border-gray-200 rounded-[12px] overflow-hidden hover:shadow-md transition flex flex-col">
      <div className="relative">
        <img src={img} alt={title} className="w-full h-[200px] object-cover" />
        <span className="absolute bottom-2 left-2 bg-[#FACC15] text-[#111827] text-[12px] font-semibold px-[8px] py-[2px] rounded-[6px]">
          {rank}
        </span>
      </div>
      <div className="p-[14px] flex flex-col flex-grow">
        <h4 className="font-semibold text-[16px] text-[#111827] mb-[6px] line-clamp-1">
          {title}
        </h4>
        <p className="text-[13px] text-[#6B7280] mb-[10px] line-clamp-2">{desc}</p>
        <div className="flex justify-between items-center mt-auto text-[13px]">
          <span className="flex items-center gap-1 text-[#6B7280]">
            <Eye className="w-4 h-4" /> {readers}
          </span>
          {following ? (
            <button className="flex items-center gap-1 text-[#2563EB] font-medium">
              <Check className="w-4 h-4" /> Đang theo dõi
            </button>
          ) : (
            <button className="flex items-center gap-1 text-[#2E5BFF] font-medium">
              <Plus className="w-4 h-4" /> Theo dõi
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Mock data ---------------- */

const trongSinh = [
  { img: "https://m.media-amazon.com/images/S/pv-target-images/e755f8df130f1e1d2f8ac706e12dbe6273ab6db94df65303c9ce769639c99854.jpg", title: "Overlord", desc: "Câu chuyện bắt đầu khi Yggdrasil, một game MMORPG nổi tiếng ...", rating: "4.8/5", },
  { img: "https://i.ytimg.com/vi/bzoqpDgHhl0/maxresdefault.jpg", title: "Ngã Dục Phong Thiên", desc: "Mạnh Phàm, một thanh niên bình thường với ước mơ trở thành võ giả ...", rating: "4.6/5" },
  { img: "https://cdn.beahero.gg/2025/06/The-Beginning-After-the-End-temporada-2.jpg", title: "The Beginning After The End", desc: "King Grey có tất cả sức mạnh, sự giàu có và địa vị trong một thế giới được...", rating: "4.9/5" },
  { img: "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2025/01/09/4rhx560i_w2r86nwi_1920x1080-phamnhantutien1_296_168.webp", title: "Phàm Nhân Tu Tiên", desc: "Hàn Lập, một cậu bé nông thôn bình thường, có cơ hội tham gia một ...", rating: "4.7/5" },
];

const heThong = [
  { img: "https://m.media-amazon.com/images/S/pv-target-images/e755f8df130f1e1d2f8ac706e12dbe6273ab6db94df65303c9ce769639c99854.jpg", title: "Overlord", desc: "Câu chuyện bắt đầu khi Yggdrasil, một game MMORPG nổi tiếng ...", rating: "4.8/5" },
  { img: "https://i.ytimg.com/vi/bzoqpDgHhl0/maxresdefault.jpg", title: "Ngã Dục Phong Thiên", desc: "Mạnh Phàm, một thanh niên bình thường với ước mơ trở thành võ giả ...", rating: "4.6/5" },
  { img: "https://cdn.beahero.gg/2025/06/The-Beginning-After-the-End-temporada-2.jpg", title: "The Beginning After The End", desc: "King Grey có tất cả sức mạnh, sự giàu có và địa vị trong một thế giới được...", rating: "4.9/5" },
  { img: "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2025/01/09/4rhx560i_w2r86nwi_1920x1080-phamnhantutien1_296_168.webp", title: "Phàm Nhân Tu Tiên", desc: "Hàn Lập, một cậu bé nông thôn bình thường, có cơ hội tham gia một ...", rating: "4.7/5" },
];

const dongNhan = [
  { img: "https://m.media-amazon.com/images/S/pv-target-images/e755f8df130f1e1d2f8ac706e12dbe6273ab6db94df65303c9ce769639c99854.jpg", title: "Overlord", desc: "Câu chuyện bắt đầu khi Yggdrasil, một game MMORPG nổi tiếng ...", rating: "4.8/5" },
  { img: "https://i.ytimg.com/vi/bzoqpDgHhl0/maxresdefault.jpg", title: "Ngã Dục Phong Thiên", desc: "Mạnh Phàm, một thanh niên bình thường với ước mơ trở thành võ giả ...", rating: "4.6/5" },
  { img: "https://cdn.beahero.gg/2025/06/The-Beginning-After-the-End-temporada-2.jpg", title: "The Beginning After The End", desc: "King Grey có tất cả sức mạnh, sự giàu có và địa vị trong một thế giới được...", rating: "4.9/5" },
  { img: "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2025/01/09/4rhx560i_w2r86nwi_1920x1080-phamnhantutien1_296_168.webp", title: "Phàm Nhân Tu Tiên", desc: "Hàn Lập, một cậu bé nông thôn bình thường, có cơ hội tham gia một ...", rating: "4.7/5" },
];

const recentBooks = [
  { img: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/solo-leveling-sung-jin-woo-featured-image.jpg", title: "Solo Leveling", desc: "Cập nhật 2 giờ trước", status: "Tiếp tục đọc" },
  { img: "https://img4.thuthuatphanmem.vn/uploads/2020/11/10/chuyen-sinh-thanh-slime-tensei-shitara-slime-datta-ken_015456993.jpg", title: "Chuyển Sinh Thành Slime", desc: "Cập nhật 1 ngày trước", status: "Tiếp tục đọc" },
  { img: "https://thegioidienanh.vn/stores/news_dataimages/thanhtan/082018/07/12/3237_poster-ngo-ton.jpg", title: "Vũ Động Càn Khôn", desc: "Cập nhật 3 ngày trước", status: "Tiếp tục đọc" },
  { img: "https://www.nae.vn/ttv/ttv/public/images/story/23b9f814404ee0a32d03f7d09d762075ef88b0730b0537c8f70ee36c1b37af5e.jpg", title: "Quỷ Bí Chi Chủ", desc: "Cập nhật 1 tuần trước", status: "Tiếp tục đọc" },
  { img: "https://images-na.ssl-images-amazon.com/images/I/915HXbY+w8L._RI_.jpg", title: "Classroom of the Elite", desc: "Cập nhật 2 tuần trước", status: "Tiếp tục đọc" },
];

const highlightBooks = [
  { img: "https://images.alphacoders.com/996/996134.jpg", title: "Sword Art Online", desc: "Năm 2022, game thực tế ảo MMORPG Sword Art Online (SAO) đã được phát hành. Với Nerve Gear,...", rank: "Top #1", readers: "89.4K", following: true },
  { img: "https://cdn.sforum.vn/sforum/wp-content/uploads/2024/01/lich-chieu-phim-tien-nghich-1.jpg", title: "Tiên Nghịch", desc: "Wang Lin là một cậu bé nông thôn bình thường, cho đến một ngày cậu được chọn làm đệ tử của một ...", rank: "Top #2", readers: "75.6K", following: false },
  { img: "https://image.tmdb.org/t/p/original/gcvJgJScIt0a5sRt8uLIkGM9IhI.jpg", title: "Tower of God", desc: "Ở một thế giới nơi mọi thứ được quyết định bởi một tòa tháp bí ẩn, một cậu bé mở cánh cửa tòa tháp ...", rank: "Top #3", readers: "64.2K", following: false },
];
