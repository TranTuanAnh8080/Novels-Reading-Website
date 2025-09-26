import React from "react";

const sampleNovels = [
  { id: 1, title: "Quỷ Bí Chi Chủ", desc: "Một câu truyện về hành trình khám phá sức mạnh của vị chủ nhân bí ẩn trong thế giới ưu tiên đầy nguy hiểm...", img: "https://www.nae.vn/ttv/ttv/public/images/story/23b9f814404ee0a32d03f7d09d762075ef88b0730b0537c8f70ee36c1b37af5e.jpg" },
  { id: 2, title: "Chuyển Sinh Thành Slime", desc: "Câu truyện về một người đàn ông bình thường bị đâm chết và tái sinh thành một con slime trong thế giới fantasy...", img: "https://img4.thuthuatphanmem.vn/uploads/2020/11/10/chuyen-sinh-thanh-slime-tensei-shitara-slime-datta-ken_015456993.jpg" },
  { id: 3, title: "Solo Leveling", desc: "Sung-Jin-Woo, thợ săn yếu nhất thế giới, đã trở thành người duy nhất hoàn thành một ngục tối bí ẩn...", img: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/solo-leveling-sung-jin-woo-featured-image.jpg" },
  { id: 4, title: "Ngã Dục Phong Thiên", desc: "Từ một kẻ yếu đuối, Lý Thừa Nhân đã vươn lên trở thành bá chủ tu tiên giới nhờ vào cơ duyên kỳ ngộ...", img: "https://i.ytimg.com/vi/bzoqpDgHhl0/maxresdefault.jpg" },
  { id: 5, title: "Học Viện Siêu Năng", desc: "Khi bước chân vào Học Viện Siêu Năng, Tanaka Yuji đã không ngờ rằng số phận của cả thế giới sẽ nằm trong tay cậu...", img: "https://genk.mediacdn.vn/2016/14942623-1479721108540.jpg" },
  { id: 6, title: "Thợ Săn Cổ Vật", desc: "Park Min-ho phát hiện ra khả năng nhìn thấy linh hồn cổ vật và bắt đầu cuộc phiêu lưu săn tìm những báu vật bị nguyền...", img: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/3/12/1022734/Un-7735.jpg" },
  { id: 7, title: "Kiếm Đạo Độc Tôn", desc: "Diệp Kiếm Vũ, một kiếm khách tài ba, phải đối mặt với sự phản bội và bắt đầu hành trình trả thù đầy gian nan...", img: "https://img7.thuthuatphanmem.vn/uploads/2023/09/23/kiem-dao-doc-ton_034730567.jpg" },
  { id: 8, title: "Tái Sinh Thành Hiệp Sĩ", desc: "Khi một người bình thường bị đưa đến thế giới game yêu thích, anh phải học cách sống sót và trở thành anh hùng...", img: "https://cdn.popsww.com/blog/sites/2/2022/05/truyen-tranh-ngon-tinh-trong-sinh-bao-thu-hien-dai.jpg" },
  { id: 9, title: "Cổng Săn Quái Vật", desc: "Khi những cổng kỳ lạ xuất hiện trên Trái đất, Kim Jun- ho trở thành người có khả năng chống lại quái vật...", img: "https://c.wallhere.com/photos/97/94/1920x1080_px_Monster_Hunter-1224283.jpg!d" },
  { id: 10, title: "Tiên Đạo Chí Tôn", desc: "Từ một linh hồn lạc lối, Dương Khai đã vượt qua muôn vàn khó khăn để trở thành bậc chí tôn trong giới tu tiên...", img: "https://canhgioi.com/wp-content/uploads/2024/06/so-luoc-tac-pham-dan-dao-chi-ton.jpg" },
  { id: 11, title: "Tình Yêu Và Phép Thuật", desc: "Ayame phát hiện ra năng lực đặc biệt của mình khi cô bước vào năm cuối cấp ba và gặp gỡ chàng trai bí ẩn...", img: "https://hokmoba.com/media/hok/3707-cantuongmacta_skin5.jpg" },
  { id: 12, title: "Thế Giới Ảo", desc: "Năm 2050, khi công nghệ thực tế ảo đạt đến đỉnh cao, Trần Minh phát hiện ra một âm mưu đe dọa cả nhân loại...", img: "https://mygpt.vn/wp-content/uploads/2023/12/music-metaverse.webp" },
];

function HeroSection() {
  return (
    <section>
      {/* Tháng */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          🔥 Truyện nổi bật Tháng
        </h2>
        <button className="text-sm text-blue-600 hover:underline">Xem tất cả</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sampleNovels.slice(0, 6).map((novel) => (
          <div key={novel.id} className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden">
            <img src={novel.img} alt={novel.title} className="w-full h-40 object-cover" />
            <div className="p-3">
              <h3 className="text-sm font-medium">{novel.title}</h3>
              <p className="text-xs text-gray-500">{novel.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Năm */}
      <div className="flex items-center justify-between mt-8 mb-4">
        <h2 className="text-lg font-semibold">🔥 Truyện nổi bật Năm</h2>
        <button className="text-sm text-blue-600 hover:underline">Xem tất cả</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sampleNovels.slice(6, 12).map((novel) => (
          <div key={novel.id} className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden">
            <img src={novel.img} alt={novel.title} className="w-full h-40 object-cover" />
            <div className="p-3">
              <h3 className="text-sm font-medium">{novel.title}</h3>
              <p className="text-xs text-gray-500">{novel.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HeroSection;
