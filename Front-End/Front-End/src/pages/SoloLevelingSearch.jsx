import { useState, useEffect } from 'react';
import 
{ Search, 
  Bell, 
  UserPlus,  
  Eye, 
  Heart, 
  Book, 
  ChevronLeft, 
  ChevronRight, 
  MessageCircle, 
  X, 
  Filter } 
  from 'lucide-react';
import Footer from '../components/Footer';
import logo from "../assets/inkrealm_logo.png";
import { Link } from "react-router-dom";

export default function SoloLevelingSearch() {
  const [selectedGenres, setSelectedGenres] = useState(['Manhwa']);
  const [selectedContext, setSelectedContext] = useState('Hiện đại');
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [searchQuery, setSearchQuery] = useState('Solo Leveling');
  const [displayLimit, setDisplayLimit] = useState(9);
  const [sortBy, setSortBy] = useState('Phù hợp');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filteredNovels, setFilteredNovels] = useState([]);
  const [showFilters, setShowFilters] = useState(true);

  const allNovels = [
    {
      id: 1,
      title: 'Solo Leveling',
      cover: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/solo-leveling-sung-jin-woo-featured-image.jpg',
      translator: 'TeamInkRealm',
      views: 10000000,
      rating: 4.9,
      chapters: 200,
      genres: ['Manhwa', 'Hành động', 'Giả tưởng'],
      context: 'Hiện đại',
      status: 'Hoàn thành',
      date: new Date('2024-01-15'),
      description: 'Trong một thế giới nơi các cổng thông sang chiều không gian khác xuất hiện, những người thợ săn với sức mạnh đặc biệt đã nổi lên. Sung Jin-Woo, một thợ săn hạng E yếu nhất...'
    },
    {
      id: 2,
      title: 'Solo Leveling: Ngoại truyện',
      cover: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/03/solo-leveling-arise-tier-list-3.jpg',
      translator: 'TeamInkRealm',
      views: 890000,
      rating: 4.8,
      chapters: 180,
      genres: ['Manhwa', 'Hành động', 'Giả tưởng'],
      context: 'Hiện đại',
      status: 'Đang tiến hành',
      date: new Date('2024-03-20'),
      description: 'Nội dung này theo chân câu chuyện về thế hệ kế tiếp sau Sung Jin-Woo. Một cuộc phiêu lưu hoàn toàn mới bắt đầu với những thử thách nguy hiểm hơn...'
    },
    {
      id: 3,
      title: 'Solo Leveling: Khởi đầu',
      cover: 'https://wallpapers.com/images/hd/anime-boys-cute-sung-jinwoo-solo-leveling-z8tgiexpniv0vb4e.jpg',
      translator: 'TeamInkRealm',
      views: 572000,
      rating: 4.7,
      chapters: 150,
      genres: ['Manhwa', 'Hành động'],
      context: 'Hiện đại',
      status: 'Đang tiến hành',
      date: new Date('2023-11-10'),
      description: 'Thợ săn cấp thấp với sức mạnh yếu đuối phải làm gì để tồn tại trong thế giới nguy hiểm này? Một câu chuyện về nỗ lực và quyết tâm...'
    },
    {
      id: 4,
      title: 'Solo Leveling: Anime Adaptation',
      cover: 'https://d.newsweek.com/en/full/2070597/solo-leveling.png?w=790&f=f2093969474506e99f13b94418398b11',
      translator: 'TeamInkRealm',
      views: 1200000,
      rating: 4.9,
      chapters: 12,
      genres: ['Manhwa', 'Hành động', 'Giả tưởng'],
      context: 'Hiện đại',
      status: 'Đang tiến hành',
      date: new Date('2024-06-01'),
      description: 'Phiên bản anime chuyển thể từ manhwa nổi tiếng. Câu chuyện được kể lại với hình ảnh sống động và âm thanh ấn tượng, mang đến trải nghiệm hoàn toàn mới...'
    },
    {
      id: 5,
      title: 'Solo Leveling: Hồi kết mới',
      cover: 'https://images.wallpapersden.com/image/download/statue-of-god-hd-solo-leveling-digital_bmdqZW6UmZqaraWkpJRnaW1lrWZubmc.jpg',
      translator: 'TeamInkRealm',
      views: 900000,
      rating: 4.8,
      chapters: 50,
      genres: ['Manhwa', 'Hành động', 'Giả tưởng'],
      context: 'Hiện đại',
      status: 'Hoàn thành',
      date: new Date('2024-02-28'),
      description: 'Những tập cuối cùng của hành trình Solo Leveling. Đi theo sự đi tìm kiếm sức mạnh tuyệt đối của Sung Jin-Woo và cuộc chiến cuối cùng...'
    },
    {
      id: 6,
      title: 'Solo Leveling: Tiền Truyện',
      cover: 'https://animotaku.fr/wp-content/uploads/2023/03/anime-solo-leveling-visuel-2-1.jpeg',
      translator: 'TeamInkRealm',
      views: 500000,
      rating: 4.6,
      chapters: 100,
      genres: ['Manhwa', 'Giả tưởng', 'Huyền bí'],
      context: 'Cổ đại',
      status: 'Hoàn thành',
      date: new Date('2023-08-15'),
      description: 'Câu chuyện về nguồn gốc của các cổng và những thợ săn đầu tiên. Khám phá bí ẩn đằng sau sự xuất hiện của các chiều không gian và những người có sức mạnh đặc biệt...'
    },
    {
      id: 7,
      title: 'Quỷ Bí Chi Chủ',
      cover: 'https://www.nae.vn/ttv/ttv/public/images/story/23b9f814404ee0a32d03f7d09d762075ef88b0730b0537c8f70ee36c1b37af5e.jpg',
      translator: 'TeamInkRealm',
      views: 750000,
      rating: 4.7,
      chapters: 250,
      genres: ['Võ thuật', 'Hành động', 'Xuyên không'],
      context: 'Cổ đại',
      status: 'Đang tiến hành',
      date: new Date('2024-04-10'),
      description: 'Một cao thủ võ lâm hiện đại xuyên không về quá khứ và trở thành minh chủ võ lâm với những kỹ năng và tri thức vượt trội...'
    },
    {
      id: 8,
      title: 'Chuyển Sinh Thành Slime',
      cover: 'https://img4.thuthuatphanmem.vn/uploads/2020/11/10/chuyen-sinh-thanh-slime-tensei-shitara-slime-datta-ken_015456993.jpg',
      translator: 'TeamInkRealm',
      views: 680000,
      rating: 4.5,
      chapters: 180,
      genres: ['Hành động', 'Giả tưởng'],
      context: 'Thế giới game',
      status: 'Đang tiến hành',
      date: new Date('2024-05-20'),
      description: 'Khi game trở thành hiện thực, một game thủ bình thường phát hiện ra mình có khả năng hồi sinh vô hạn trong thế giới mới này...'
    },
    {
      id: 9,
      title: 'Ngã Dục Phong Thiên',
      cover: 'https://i.ytimg.com/vi/bzoqpDgHhl0/maxresdefault.jpg',
      translator: 'TeamInkRealm',
      views: 680000,
      rating: 4.5,
      chapters: 180,
      genres: ['Võ thuật', 'Hành động'],
      context: 'Thế giới game',
      status: 'Đang tiến hành',
      date: new Date('2024-05-20'),
      description: 'Từ một kẻ yếu đuối, Lý Thừa Nhân đã vươn lên trở thành bá chủ tu tiên giới nhờ vào cơ duyên kỳ ngộ...'
    },
    {
      id: 10,
      title: 'Học Viện Siêu Năng',
      cover: 'https://genk.mediacdn.vn/2016/14942623-1479721108540.jpg',
      translator: 'TeamInkRealm',
      views: 680000,
      rating: 4.5,
      chapters: 180,  
      genres: ['Huyền bí', 'Giả tưởng'],
      context: 'Thế giới game',
      status: 'Đang tiến hành',
      date: new Date('2024-05-20'),
      description: 'Khi bước chân vào Học Viện Siêu Năng, Tanaka Yuji đã không ngờ rằng số phận của cả thế giới sẽ nằm trong tay cậu...'
    }
  ];

  const genres = ['Manhwa', 'Hành động', 'Giả tưởng', 'Huyền bí', 'Võ thuật', 'Ngôn tình', 'Xuyên không', 'Xem thêm'];
  const contexts = ['Hiện đại', 'Cổ đại', 'Tương lai', 'Trung cổ', 'Thế giới game'];
  const statuses = ['Đang tiến hành', 'Hoàn thành', 'Tạm dừng'];
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

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

  // Filter and search logic
  useEffect(() => {
    let filtered = allNovels;

    // Search by title
    if (searchQuery.trim()) {
      filtered = filtered.filter(novel => 
        novel.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by genres
    if (selectedGenres.length > 0) {
      filtered = filtered.filter(novel => 
        selectedGenres.some(genre => novel.genres.includes(genre))
      );
    }

    // Filter by context
    if (selectedContext) {
      filtered = filtered.filter(novel => novel.context === selectedContext);
    }

    // Filter by status
    if (selectedStatus.length > 0) {
      filtered = filtered.filter(novel => 
        selectedStatus.includes(novel.status)
      );
    }

    // Sort
    if (sortBy === 'Mới nhất') {
      filtered = [...filtered].sort((a, b) => b.date - a.date);
    } else if (sortBy === 'Cũ nhất') {
      filtered = [...filtered].sort((a, b) => a.date - b.date);
    } else if (sortBy === 'Xem nhiều') {
      filtered = [...filtered].sort((a, b) => b.views - a.views);
    } else if (sortBy === 'Rating cao') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    setFilteredNovels(filtered);
  }, [searchQuery, selectedGenres, selectedContext, selectedStatus, sortBy]);

  const formatViews = (views) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(0)}K`;
    return views; 
  };

  const totalPages = Math.ceil(filteredNovels.length / displayLimit);
  const displayedNovels = filteredNovels.slice((currentPage - 1) * displayLimit, currentPage * displayLimit);

  return (
    <div className="flex flex-col min-h-screen bg-white relative overflow-x-hidden">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden relative z-10 animate-fade-in">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 backdrop-blur-sm bg-white/95 sticky top-0 z-50">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0">
              <Link
                to={isLoggedIn ? "/HomeLoggedIn" : "/HomePage"}
                className="flex items-center space-x-2"
              >
                <img src={logo} alt="InkRealm" className="h-10 w-auto" />
              </Link>
            </div>
            
            <nav className="flex gap-8 items-center">
              {['Trang chủ', 'Thể loại', 'Bảng xếp hạng', 'Nạp coin', 'Mới cập nhật'].map((item, idx) => (
                <a 
                  key={item} 
                  href="#" 
                  className="text-sm text-gray-600 hover:text-[#2E5BFF] transition-all duration-300 hover:scale-110 relative group"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2E5BFF] group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-600 hover:text-[#2E5BFF] transition-all duration-300 hover:scale-110 hover:rotate-12"
              >
                <Search size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:text-[#2E5BFF] transition-all duration-300 hover:scale-110 hover:rotate-12 relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              </button>
              <button className="bg-[#2E5BFF] text-white px-6 py-2 rounded-full flex items-center gap-2 hover:shadow-lg hover:scale-105 transition-all duration-300 hover:from-purple-600 hover:to-purple-800">
                <UserPlus size={18} />
                <span className="text-sm font-medium">Đăng nhập</span>
              </button>
            </div>
          </div>

          {/* Search Bar Dropdown */}
          {isSearchOpen && (
            <div className="mt-4 animate-slide-down">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm truyện..."
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg focus:border-gray-400 focus:outline-none transition-all duration-300"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <div className="flex">
          {/* Sidebar */}
          <aside className={`${showFilters ? 'w-72' : 'w-0'} bg-gray-50 border-r border-gray-200 transition-all duration-500 overflow-hidden`}>
            <div className="p-6">
              {/* Bộ lọc */}
              <div className="mb-8 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-800 uppercase">Bộ lọc</h3>
                  {selectedGenres.length > 0 && (
                    <button
                      onClick={() => setSelectedGenres([])}
                      className="text-xs text-red-500 hover:text-red-700 transition-colors"
                    >
                      Xóa hết
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  {genres.map((genre, idx) => (
                    <label 
                      key={genre} 
                      className="flex items-center gap-2 cursor-pointer group animate-fade-in hover:bg-[#2E5BFF] p-2 rounded-lg transition-all duration-300"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedGenres.includes(genre)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedGenres([...selectedGenres, genre]);
                          } else {
                            setSelectedGenres(selectedGenres.filter(g => g !== genre));
                          }
                        }}
                        className="w-4 h-4 text-white rounded accent-white transition-transform group-hover:scale-110"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-white transition-colors">{genre}</span>
                      {selectedGenres.includes(genre) && (
                        <span className="ml-auto text-xs text-white animate-fade-in">✓</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Bối cảnh */}
              <div className="mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
                <h3 className="text-sm font-bold text-gray-800 uppercase mb-4">Bối cảnh</h3>
                <div className="space-y-3">
                  {contexts.map((context, idx) => (
                    <label 
                      key={context} 
                      className="flex items-center gap-2 cursor-pointer group hover:bg-[#2E5BFF] p-2 rounded-lg transition-all duration-300"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <input
                        type="radio"
                        name="context"
                        checked={selectedContext === context}
                        onChange={() => setSelectedContext(context)}
                        className="w-4 h-4 text-white accent-white transition-transform group-hover:scale-110"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-white transition-colors">{context}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tình trạng */}
              <div className="mb-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
                <h3 className="text-sm font-bold text-gray-800 uppercase mb-4">Tình trạng</h3>
                <div className="space-y-3">
                  {statuses.map((status, idx) => (
                    <label 
                      key={status} 
                      className="flex items-center gap-2 cursor-pointer group hover:bg-[#2E5BFF] p-2 rounded-lg transition-all duration-300"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedStatus.includes(status)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedStatus([...selectedStatus, status]);
                          } else {
                            setSelectedStatus(selectedStatus.filter(s => s !== status));
                          }
                        }}
                        className="w-4 h-4 text-white rounded accent-white transition-transform group-hover:scale-110"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-white transition-colors">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => {
                  setSelectedGenres([]);
                  setSelectedContext('');
                  setSelectedStatus([]);
                  setSearchQuery('');
                }}
                className="w-full bg-[#2E5BFF] text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 hover:from-purple-600 hover:to-purple-800"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          </aside>

          {/* Content Area */}
          <main className="flex-1 p-8">
            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="mb-4 flex items-center gap-2 text-sm text-gray-600 hover:text-[#2E5BFF] transition-colors"
            >
              <Filter size={16} />
              {showFilters ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
            </button>

            {/* Search Header */}
            <div className="mb-6 animate-fade-in">
              <h1 className="text-2xl font-bold text-gray-800 mb-3">Tìm kiếm truyện</h1>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Tìm thấy <span className="text-[#2E5BFF] font-semibold animate-pulse">{filteredNovels.length}</span> kết quả
                  {searchQuery && <> cho từ khóa "<span className="text-[#2E5BFF] font-semibold">{searchQuery}</span>"</>}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-600">Hiển thị:</span>
                  {[9, 18, 36].map((limit) => (
                    <button
                      key={limit}
                      onClick={() => {
                        setDisplayLimit(limit);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-1 text-xs rounded transition-all duration-300 hover:scale-110 ${
                        displayLimit === limit
                          ? 'bg-[#2E5BFF] text-white shadow-md'
                          : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {limit}
                    </button>
                  ))}
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded text-xs text-gray-600 hover:border-[#2E5BFF] transition-colors focus:outline-none focus:border-[#2E5BFF]"
                  >
                    <option>Phù hợp</option>
                    <option>Mới nhất</option>
                    <option>Cũ nhất</option>
                    <option>Xem nhiều</option>
                    <option>Rating cao</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Novel Grid */}
            {displayedNovels.length > 0 ? (
              <div className="grid grid-cols-3 gap-6 mb-8">
                {displayedNovels.map((novel, idx) => (
                  <div 
                    key={novel.id} 
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fade-in group cursor-pointer"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={novel.cover} 
                        alt={novel.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12 transform group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-white font-semibold text-lg group-hover:text-blue-300 transition-colors">{novel.title}</h3>
                        <span className="inline-block mt-2 px-2 py-1 bg-[#2E5BFF] text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-0 -translate-x-4">
                          {novel.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-400 mb-2">Dịch bởi {novel.translator}</p>
                      <div className="flex items-center gap-4 mb-3 text-xs text-gray-600">
                        <span className="flex items-center gap-1 group/stat hover:text-[#2E5BFF] transition-colors">
                          <Eye size={14} className="text-[#2E5BFF] group-hover/stat:scale-125 transition-transform" />
                          {formatViews(novel.views)}
                        </span>
                        <span className="flex items-center gap-1 group/stat hover:text-[#2E5BFF] transition-colors">
                          <Heart size={14} className="text-[#2E5BFF] group-hover/stat:scale-125 transition-transform" />
                          {novel.rating}
                        </span>
                        <span className="flex items-center gap-1 group/stat hover:text-[#2E5BFF] transition-colors">
                          <Book size={14} className="text-[#2E5BFF] group-hover/stat:scale-125 transition-transform" />
                          {novel.chapters}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {novel.genres.slice(0, 3).map((genre) => (
                          <span key={genre} className="px-2 py-1 bg-[#2E5BFF] text-white text-xs rounded-full hover:bg-blue-700 transition-colors">
                            {genre}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 mb-4 line-clamp-3 leading-relaxed">{novel.description}</p>
                      <button className="w-full bg-[#2E5BFF] text-white py-2 rounded-lg text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 hover:from-purple-600 hover:to-purple-800 group/btn">
                        <span className="group-hover/btn:scale-110 inline-block transition-transform">ĐỌC NGAY</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 animate-fade-in">
                <div className="text-6xl mb-4"></div> 
                <p className="text-xl text-gray-600 mb-2">Không tìm thấy truyện nào</p>
                <p className="text-sm text-gray-400">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 animate-fade-in">
                <button 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded hover:bg-[#2E5BFF] hover:text-white hover:border-[#2E5BFF] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 disabled:hover:scale-100"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded transition-all duration-300 ${
                        currentPage === page
                          ? 'bg-[#2E5BFF] text-white shadow-lg scale-110'
                          : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 hover:scale-105'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded hover:bg-[#2E5BFF] hover:text-white hover:border-[#2E5BFF] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 disabled:hover:scale-100"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </main>
        </div>
        </div>

      {/* Chat Button */}
      <button className="fixed bottom-8 left-8 w-16 h-16 bg-[#2E5BFF] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-2xl hover:rotate-12 animate-bounce-slow group">
        <MessageCircle size={28} className="group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
      </button>

      {/* Footer */}
        <Footer />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}