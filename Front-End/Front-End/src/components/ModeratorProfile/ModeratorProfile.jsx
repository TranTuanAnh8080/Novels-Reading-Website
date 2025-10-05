import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Edit3, LogOut, Copy, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialModerator = {
  id: "MOD-CN-047",
  name: "Nguyễn Minh Anh",
  title: "Content Guardian — Kiểm duyệt viên Cấp cao",
  avatarUrl:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
  bio:
    "Đồng hành cùng cộng đồng, giữ gìn một không gian đọc truyện văn minh và an toàn. Luôn lắng nghe và hỗ trợ.",
  location: "Hà Nội, Việt Nam",
  status: "active",
  joined: "2022-08-10",
  stats: {
    totalReviews: 100,
    avgQualityScore: 9.2,
    communityLove: 80,
    responseTime: "12 giờ"
  },
  expertise: [
    "Tiểu thuyết ngôn tình",
    "Viễn tưởng",
    "Chính sách cộng đồng",
    "Xử lý vi phạm",
    "Fanfiction review"
  ],
  contact: {
    email: "nguyenminhanh@inkrealm.vn",
    website: "community.inkrealm.vn/"
  }
};

const mockActivity = [
  {
    id: 1,
    time: "2025-10-21T09:32:00",
    title: "Duyệt chương: Chương 8 - Hồi ức cũ",
    type: "approve",
    detail: "Nội dung phù hợp, đã gắn tag chính xác, publish scheduled",
    meta: "Truyện: Hành trình phiêu bạt"
  },
  {
    id: 2,
    time: "2025-10-10T14:11:00",
    title: "Yêu cầu chỉnh sửa: Chương 2",
    type: "request_edit",
    detail: "Nhiều lỗi chính tả, đề nghị tác giả sửa lại phần mô tả",
    meta: "Truyện: Lối về nhà"
  },
  {
    id: 3,
    time: "2025-10-19T20:05:00",
    title: "Từ chối bài nộp: Fanfic (vi phạm bản quyền)",
    type: "reject",
    detail: "Phát hiện quá nhiều đoạn sao chép nguyên văn từ tác phẩm có bản quyền",
    meta: "Truyện: Hành tinh ký ức"
  }
];

// --------------------------
// Subcomponents
// --------------------------
const StatCard = ({ title, value, accent = "from-indigo-400 to-indigo-600" }) => (
  <div className={`rounded-xl shadow-sm overflow-hidden bg-gradient-to-br ${accent} text-white p-4`}>
    <p className="text-sm font-medium opacity-90">{title}</p>
    <p className="mt-2 text-2xl font-extrabold">{value}</p>
  </div>
);

const InfoRow = ({ label, children, copyable }) => (
  <div className="flex items-center justify-between gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-100 dark:border-gray-700">
    <div className="text-sm text-gray-600 dark:text-gray-300">{label}</div>
    <div className="flex items-center gap-3">
      <div className="text-sm font-medium break-words">{children}</div>
      {copyable && (
        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(children);
              // small accessible feedback could be added here
            } catch (e) {
              // silently fail
            }
          }}
          className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label={`Sao chép ${label}`}
        >
          <Copy className="w-4 h-4 text-gray-400" />
        </button>
      )}
    </div>
  </div>
);

const ActivityItem = ({ item }) => {
  const colors = {
    approve: "bg-green-50 text-green-700",
    request_edit: "bg-yellow-50 text-yellow-700",
    reject: "bg-red-50 text-red-700",
    info: "bg-indigo-50 text-indigo-700"
  };
  return (
    <div className="flex gap-4 items-start py-3 border-b border-gray-100 dark:border-gray-800">
      <div className="w-10 text-center mt-1">
        <span className={` w-9 h-9 rounded-full bg-white/60 dark:bg-black/40 border border-gray-200 flex items-center justify-center`}>
          <Activity className="w-4 h-4 text-gray-600" />
        </span>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">{item.title}</div>
          <div className={`text-xs px-2 py-1 rounded ${colors[item.type] || colors.info}`}>{new Date(item.time).toLocaleString()}</div>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{item.detail}</div>
        {item.meta && <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">{item.meta}</div>}
      </div>
    </div>
  );
};

// Modal for editing profile
const EditProfileModal = ({ open, onClose, profile, onSave }) => {
  const [form, setForm] = useState(profile);

  useEffect(() => setForm(profile), [profile]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative z-10 w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold mb-4">Cập Nhật Hồ Sơ Cá Nhân</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="flex flex-col text-sm">
            <span className="text-gray-500 mb-1">Họ tên</span>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/60 text-sm" />
          </label>
          <label className="flex flex-col text-sm">
            <span className="text-gray-500 mb-1">Email</span>
            <input value={form.contact?.email || ''} onChange={(e) => setForm({ ...form, contact: { ...form.contact, email: e.target.value } })} className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/60 text-sm" />
          </label>
          <label className="flex flex-col text-sm md:col-span-2">
            <span className="text-gray-500 mb-1">Bio</span>
            <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/60 text-sm min-h-[80px]" />
          </label>
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700">Hủy</button>
          <button onClick={() => { onSave(form); onClose(); }} className="px-4 py-2 rounded-md bg-indigo-600 text-white">Lưu</button>
        </div>
      </motion.div>
    </div>
  );
};

// --------------------------
// Page component
// --------------------------
export default function ModeratorProfilePage() {
  const [profile, setProfile] = useState(initialModerator);
  const [activity, setActivity] = useState(mockActivity);
  const [tab, setTab] = useState("overview");
  const [openEdit, setOpenEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // example: could fetch real data here
  }, []);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // you can replace with toast later
    } catch (e) {
      console.error("Failed to copy text: ", e);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 
    dark:text-gray-100 transition-colors duration-300 py-8 px-4 mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Top header row */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-indigo-700">Hồ sơ Moderator</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Quản lý tài khoản & lịch sử hành động — giao diện tối ưu cho kiểm duyệt viên</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/ModeratorHomePage")}
              className="px-3 py-2 rounded-md bg-gray-100 dark:bg-green-600 text-md hover:scale-105 transform transition duration-200"
            >
              Quay lại
            </button>
            <button
              onClick={() => setOpenEdit(true)}
              className="px-3 py-2 rounded-md bg-indigo-600 text-white flex items-center gap-2 hover:scale-105 transform transition duration-200"
            >
              <Edit3 className="w-4 h-4" /> Chỉnh sửa
            </button>
            <button
              onClick={() => {
                /* logout */
                navigate("/");
              }}
              className="px-3 py-2 rounded-md bg-red-500 text-white flex items-center gap-2 hover:scale-105 transform transition duration-200"
            >
              <LogOut className="w-4 h-4" /> Đăng xuất
            </button>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: profile card */}
          <aside className="col-span-1 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-32 h-32 mb-4">
                <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover rounded-xl shadow-md" />
                <span className={`${profile.status === 'active' ? 'bg-green-400' : 'bg-gray-400'} w-3 h-3 rounded-full absolute top-2 right-2 ring-2 ring-white dark:ring-gray-900`} />
              </div>

              <h2 className="text-xl font-bold">{profile.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{profile.title}</p>

              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 max-w-[20rem]">{profile.bio}</p>

              <div className="w-full mt-5 grid grid-cols-2 gap-3">
                <StatCard title="Đã duyệt" value={profile.stats.totalReviews.toLocaleString()} accent="from-emerald-400 to-emerald-600" />
                <StatCard title="Điểm TB" value={`${profile.stats.avgQualityScore}/10`} accent="from-amber-400 to-amber-600" />
                <StatCard title="Yêu thích" value={profile.stats.communityLove} accent="from-pink-400 to-pink-600" />
                <StatCard title="Phản hồi" value={profile.stats.responseTime} accent="from-indigo-400 to-indigo-600" />
              </div>

              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {profile.expertise.map((s) => (
                  <span key={s} className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-200">{s}</span>
                ))}
              </div>

              <div className="w-full mt-6 space-y-2">
                <InfoRow label="Email" copyable>{profile.contact.email}</InfoRow>
                <InfoRow label="Website">{profile.contact.website}</InfoRow>
                <InfoRow label="Ngày tham gia">{new Date(profile.joined).toLocaleDateString('vi-VN')}</InfoRow>
              </div>

            </div>
          </aside>

          {/* RIGHT: Tabs & content */}
          <div className="col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-4 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <button onClick={() => setTab('overview')} className={`px-3 py-2 rounded-md ${tab === 'overview' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'} text-sm`}>Tổng quan</button>
                <button onClick={() => setTab('activity')} className={`px-3 py-2 rounded-md ${tab === 'activity' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'} text-sm`}>Hoạt động</button>
                <button onClick={() => setTab('settings')} className={`px-3 py-2 rounded-md ${tab === 'settings' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'} text-sm`}>Cài đặt</button>
              </div>
            </div>

            {/* Tab content */}
            {tab === 'overview' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold mb-4">Tổng quan nhanh</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Số liệu và hoạt động gần đây giúp bạn nắm bắt được hiệu suất – tiện để audit và báo cáo.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="col-span-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                        <div className="text-sm text-gray-500">Tổng lượt duyệt</div>
                        <div className="text-2xl font-bold mt-2">{profile.stats.totalReviews.toLocaleString()}</div>
                        <div className="text-xs text-gray-400 mt-1">Số nội dung đã xác nhận / xử lý</div>
                      </div>
                      <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                        <div className="text-sm text-gray-500">Tỷ lệ đồng ý</div>
                        <div className="text-2xl font-bold mt-2">{(profile.stats.avgQualityScore * 10).toFixed(0)}%</div>
                        <div className="text-xs text-gray-400 mt-1">Chỉ số chất lượng (ước lượng)</div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-md font-semibold mb-3">Gần đây</h4>
                      <div className="divide-y divide-gray-100 dark:divide-gray-800">
                        {activity.map((a) => (
                          <ActivityItem key={a.id} item={a} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-500">Thời gian phản hồi trung bình</div>
                          <div className="text-xl font-bold mt-1">{profile.stats.responseTime}</div>
                        </div>
                        <div className="text-sm text-gray-500">Hoạt động</div>
                      </div>

                      <div className="mt-2">
                        <button onClick={() => copy(profile.contact.email)} className="w-full dark:bg-indigo-500 bg-indigo-600 text-white font-medium mt-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700">Sao chép email</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab === 'activity' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold mb-4">Lịch sử hoạt động (Timeline)</h3>
                <p className="text-sm text-gray-500 mb-4">Mọi thao tác đều có log. Dùng bộ lọc để thu hẹp kết quả.</p>
                <div className="space-y-3 divide-y divide-gray-100 dark:divide-gray-800">
                  {activity.map((a) => (
                    <ActivityItem key={a.id} item={a} />
                  ))}
                </div>
              </div>
            )}

            {tab === 'settings' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold mb-4">Cài đặt & Quyền</h3>
                <p className="text-sm text-gray-500 mb-4">Quản lý quyền truy cập, mật khẩu và tùy chọn tài khoản.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-md bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                    <div className="text-sm text-gray-500">Quyền hiện tại</div>
                    <div className="mt-2 font-medium">Moderator - full content moderation</div>
                    <div className="text-xs text-gray-400 mt-1">Có thể cấp / thu quyền cho từng module (sẽ dùng role-based access later)</div>
                  </div>

                  <div className="p-4 rounded-md bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                    <div className="text-sm text-gray-500">Bảo mật</div>
                    <div className="mt-2 font-medium">Mật khẩu: ********</div>
                    <div className="mt-3 flex gap-2">
                      <button className="px-3 py-2 rounded-md bg-indigo-600 text-white">Đổi mật khẩu</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <EditProfileModal open={openEdit}
        onClose={() => setOpenEdit(false)} profile={profile} onSave={(p) => setProfile(p)} />

    </div>
  );
}
