import React from "react";
import { ThumbsUp, MessageCircle } from "lucide-react";

function CommentSection() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-800">Bình luận (124)</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm rounded-lg border border-gray-300 hover:bg-gray-50">
            Mới nhất
          </button>
          <button className="px-3 py-1 text-sm rounded-lg border border-gray-300 hover:bg-gray-50">
            Phổ biến
          </button>
        </div>
      </div>

      {/* Ô nhập bình luận */}
      <div className="flex items-start gap-3 mb-6">
        <img
          src="https://randomuser.me/api/portraits/men/45.jpg"
          alt="User avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <textarea
            placeholder="Viết bình luận của bạn..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring focus:ring-blue-200"
          />
          <div className="flex justify-end mt-2">
            <button className="px-4 py-2 bg-[#1A73E8] text-white text-sm rounded-lg hover:bg-blue-700">
              Đăng bình luận
            </button>
          </div>
        </div>
      </div>

      {/* Danh sách bình luận */}
      <div className="space-y-6">
        {/* Comment thường */}
        <div className="text-sm">
          <div className="mb-1">
            <span className="font-medium text-gray-800">TruyenHayFan123</span>
            <span className="ml-2 text-gray-500">2 ngày trước</span>
          </div>
          <p className="text-gray-700 mb-2">
            Truyện này hay quá! Mình đã đọc một mạch từ chương 1 đến chương mới
            nhất. Vương Lâm là một nhân vật chính rất có chiều sâu. Cảm ơn nhóm
            dịch đã mang đến tác phẩm tuyệt vời này.
          </p>
          <div className="flex items-center gap-4 text-gray-500 text-xs">
            <span className="flex items-center gap-1">
              <ThumbsUp className="w-3 h-3" /> 24
            </span>
            <span className="flex items-center gap-1 cursor-pointer hover:underline">
              <MessageCircle className="w-3 h-3" /> Trả lời
            </span>
          </div>
        </div>

        {/* Comment thường */}
        <div className="text-sm">
          <div className="mb-1">
            <span className="font-medium text-gray-800">TienHiepLover</span>
            <span className="ml-2 text-gray-500">5 ngày trước</span>
          </div>
          <p className="text-gray-700 mb-2">
            Truyện này là một trong những truyện tiên hiệp hay nhất mình từng
            đọc. Cốt truyện sâu sắc, thế giới quan rộng lớn. Rất đáng để đọc!
          </p>
          <div className="flex items-center gap-4 text-gray-500 text-xs">
            <span className="flex items-center gap-1">
              <ThumbsUp className="w-3 h-3" /> 18
            </span>
            <span className="flex items-center gap-1 cursor-pointer hover:underline">
              <MessageCircle className="w-3 h-3" /> Trả lời
            </span>
          </div>

          {/* Admin reply */}
          <div className="ml-6 mt-4 p-3 rounded-lg bg-white text-sm">
            <div className="mb-1 flex items-center gap-2">
              <span className="font-medium text-blue-700">Team Truyện Hay</span>
              <span className="px-2 py-0.5 text-xs bg-blue-600 text-white rounded-md">
                Admin
              </span>
              <span className="text-gray-500 text-xs">4 ngày trước</span>
            </div>
            <p className="text-blue-700 mb-2">
              Cảm ơn bạn đã ủng hộ! Chúng mình sẽ cố gắng duy trì chất lượng dịch
              thuật tốt nhất.
            </p>
            <div className="flex items-center gap-4 text-gray-500 text-xs">
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" /> 7
              </span>
              <span className="flex items-center gap-1 cursor-pointer hover:underline">
                <MessageCircle className="w-3 h-3" /> Trả lời
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Load more */}
      <div className="flex justify-center mt-6">
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
          Xem thêm bình luận
        </button>
      </div>
    </div>
  );
}

export default CommentSection;
