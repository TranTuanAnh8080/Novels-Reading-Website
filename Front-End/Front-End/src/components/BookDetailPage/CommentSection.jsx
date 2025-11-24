import React, { useState, useEffect } from "react";
import { ThumbsUp, MessageCircle, Send, MoreHorizontal, CornerDownRight } from "lucide-react";

const INITIAL_COMMENTS = [
  {
    id: 1,
    user: "TruyenHayFan123",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    content: "Truyện này hay quá! Mình đã đọc một mạch từ chương 1 đến chương mới nhất. Vương Lâm là một nhân vật chính rất có chiều sâu.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    isLiked: false,
    replies: []
  },
  {
    id: 2,
    user: "TienHiepLover",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    content: "Cốt truyện sâu sắc, thế giới quan rộng lớn. Rất đáng để đọc!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    isLiked: true,
    replies: [
      {
        id: 101,
        user: "Team Truyện Hay",
        isAdmin: true,
        avatar: "https://github.com/shadcn.png",
        content: "Cảm ơn bạn đã ủng hộ! Chúng mình sẽ cố gắng duy trì chất lượng dịch thuật tốt nhất.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
        likes: 7,
        isLiked: false
      }
    ]
  },
  {
    id: 3,
    user: "DocGiaVuiTinh",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    content: "Chương mới bao giờ ra vậy ad ơi? Hóng quá!",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    likes: 2,
    isLiked: false,
    replies: []
  }
];

const timeAgo = (dateString) => {
  const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " năm trước";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " tháng trước";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " ngày trước";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " giờ trước";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " phút trước";
  return "Vừa xong";
};

export default function CommentSection() {
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState("");
  const [sortType, setSortType] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(3);

  const handlePostComment = () => {
    if (!newComment.trim()) return;

    const newObj = {
      id: Date.now(),
      user: "Bạn",
      avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      replies: []
    };

    setComments([newObj, ...comments]);
    setNewComment("");
  };

  const toggleLike = (commentId, isReply = false, parentId = null) => {
    const updateLikeLogic = (list) => {
      return list.map(c => {
        if (c.id === commentId) {
          return {
            ...c,
            likes: c.isLiked ? c.likes - 1 : c.likes + 1,
            isLiked: !c.isLiked
          };
        }
        if (c.replies && c.replies.length > 0 && !isReply) {
           return { ...c, replies: updateLikeLogic(c.replies) };
        }
        return c;
      });
    };

    if (isReply && parentId) {
        setComments(prev => prev.map(parent => {
            if (parent.id === parentId) {
                return { ...parent, replies: updateLikeLogic(parent.replies) };
            }
            return parent;
        }));
    } else {
        setComments(prev => updateLikeLogic(prev));
    }
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortType === "newest") {
      return new Date(b.timestamp) - new Date(a.timestamp);
    } else {
      return b.likes - a.likes;
    }
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="font-bold text-xl text-gray-800 dark:text-white flex items-center gap-2">
          Bình luận <span className="text-sm font-normal text-gray-500">({comments.length})</span>
        </h2>
        <div className="flex bg-gray-100 p-1 rounded-lg dark:bg-gray-700">
          <button
            onClick={() => setSortType("newest")}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              sortType === "newest"
                ? "bg-white text-blue-600 shadow-sm dark:bg-gray-600 dark:text-white"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            Mới nhất
          </button>
          <button
            onClick={() => setSortType("popular")}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              sortType === "popular"
                ? "bg-white text-blue-600 shadow-sm dark:bg-gray-600 dark:text-white"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            Phổ biến
          </button>
        </div>
      </div>

      {/* --- INPUT BOX --- */}
      <div className="flex gap-4 mb-8">
        <img
          src="https://randomuser.me/api/portraits/lego/1.jpg"
          alt="User avatar"
          className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-600"
        />
        <div className="flex-1 relative">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
                if(e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handlePostComment();
                }
            }}
            placeholder="Chia sẻ suy nghĩ của bạn về chương này..."
            className="w-full min-h-[100px] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-y
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-all"
          />
          <div className="flex justify-between items-center mt-2">
             <p className="text-xs text-gray-400 hidden sm:block">Nhấn Enter để đăng</p>
             <button 
                onClick={handlePostComment}
                disabled={!newComment.trim()}
                className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
             >
                <Send className="w-4 h-4" /> Đăng
             </button>
          </div>
        </div>
      </div>

      {/* --- LIST COMMENTS --- */}
      <div className="space-y-6">
        {sortedComments.slice(0, visibleCount).map((comment) => (
          <div key={comment.id} className="animate-fade-in">
            <div className="flex gap-3">
              <img
                src={comment.avatar}
                alt={comment.user}
                className="w-10 h-10 rounded-full object-cover cursor-pointer hover:opacity-80"
              />
              <div className="flex-1">
                <div className="bg-gray-50 rounded-2xl p-4 dark:bg-gray-900/50 dark:border dark:border-gray-700">
                    <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-gray-900 dark:text-white cursor-pointer hover:underline">
                                {comment.user}
                            </span>
                            <span className="text-xs text-gray-400">• {timeAgo(comment.timestamp)}</span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed dark:text-gray-300">
                        {comment.content}
                    </p>
                </div>

                <div className="flex items-center gap-6 mt-2 ml-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                  <button 
                    onClick={() => toggleLike(comment.id)}
                    className={`flex items-center gap-1.5 hover:text-blue-600 transition-colors ${comment.isLiked ? 'text-blue-600' : ''}`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${comment.isLiked ? 'fill-current' : ''}`} /> 
                    {comment.likes > 0 ? comment.likes : 'Thích'}
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                    <MessageCircle className="w-3.5 h-3.5" /> Trả lời
                  </button>
                </div>

                {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 border-gray-100 dark:border-gray-700 space-y-4">
                        {comment.replies.map(reply => (
                            <div key={reply.id} className="flex gap-3">
                                <img src={reply.avatar} className="w-8 h-8 rounded-full object-cover" alt="" />
                                <div className="flex-1">
                                    <div className="bg-gray-50 rounded-2xl p-3 dark:bg-gray-900/50 dark:border dark:border-gray-700">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-sm font-bold ${reply.isAdmin ? 'text-blue-600' : 'text-gray-900 dark:text-white'}`}>
                                                {reply.user}
                                            </span>
                                            {reply.isAdmin && (
                                                <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] rounded border border-blue-200 font-semibold dark:bg-blue-900 dark:text-blue-200 dark:border-blue-800">
                                                    Admin
                                                </span>
                                            )}
                                            <span className="text-xs text-gray-400">• {timeAgo(reply.timestamp)}</span>
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">{reply.content}</p>
                                    </div>
                                    <div className="flex items-center gap-4 mt-1.5 ml-2 text-xs text-gray-500">
                                        <button 
                                            onClick={() => toggleLike(reply.id, true, comment.id)}
                                            className={`flex items-center gap-1 hover:text-blue-600 ${reply.isLiked ? 'text-blue-600' : ''}`}
                                        >
                                            Like {reply.likes > 0 && `(${reply.likes})`}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- LOAD MORE --- */}
      {visibleCount < comments.length && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={() => setVisibleCount(prev => prev + 3)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-all
                       dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <CornerDownRight className="w-4 h-4" />
            Xem thêm bình luận cũ hơn
          </button>
        </div>
      )}
    </div>
  );
}