import { Link } from "react-router-dom";
import { Sparkles, BookOpen, Headphones, Globe, ArrowRight } from "lucide-react";

function WelcomeSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl overflow-hidden shadow-sm border border-blue-100 mb-6 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
      
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-30 dark:opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-30 dark:opacity-10 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center p-6 md:p-8 gap-8">
        
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-4 dark:bg-blue-900/30 dark:text-blue-300">
              <Sparkles className="w-3 h-3 mr-1" /> Khám phá thế giới mới
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Chào mừng đến với <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                InkRealm
              </span>
            </h2>
          </div>

          <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            Nơi bạn có thể đọc truyện chữ và nghe bằng giọng nói với chất lượng cao nhất. Khám phá hàng ngàn tác phẩm từ nhiều quốc gia khác nhau: Việt Nam, Trung Quốc, Hàn Quốc, Nhật Bản.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 p-3 bg-white rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg dark:bg-blue-900 dark:text-blue-300"><BookOpen size={18}/></div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Truyện Chữ</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg dark:bg-purple-900 dark:text-purple-300"><Headphones size={18}/></div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Audio Hay</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg dark:bg-green-900 dark:text-green-300"><Globe size={18}/></div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Đa Quốc Gia</span>
            </div>
          </div>

          <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            Đăng ký để tạo tủ truyện cá nhân, theo dõi chương mới và đăng truyện của bạn!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center md:justify-start">
            <Link 
              to="/RegisterPage" 
              className="group flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300"
            >
              Đăng ký ngay <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700">
              Tìm hiểu thêm
            </button>
          </div>
        </div>

        <div className="flex-shrink-0 w-full md:w-1/2 lg:w-[45%] relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            
            <img
                src="https://images5.alphacoders.com/939/thumb-1920-939674.jpg" 
                alt="InkRealm Experience"
                className="relative w-full h-auto object-cover rounded-2xl shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02] border-4 border-white dark:border-gray-800"
            />
            
            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3 animate-bounce-slow">
                <div className="flex -space-x-2">
                    <img className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800" src="https://i.pravatar.cc/100?img=1" alt=""/>
                    <img className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800" src="https://i.pravatar.cc/100?img=2" alt=""/>
                    <img className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800" src="https://i.pravatar.cc/100?img=3" alt=""/>
                </div>
                <div className="text-xs">
                    <p className="font-bold text-gray-900 dark:text-white">10k+ Độc giả</p>
                    <p className="text-gray-500">Đang tham gia</p>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
}

export default WelcomeSection;