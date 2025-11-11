import React, { useState, useEffect } from "react";
import { Info, AlertTriangle, ArrowLeft, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import axios from 'axios';

const MainItem = () => {
    const packages = [
        {
            id: 1,
            coins: "10.000 xu",
            price: 10000,
            label: "Gói trải nghiệm",
            icon: "😍",
            description: "Phù hợp cho người mới bắt đầu, đọc thử một số truyện và trải nghiệm cơ bản.",
            perks: [
                "Truy cập truyện cơ bản",
                "Trải nghiệm thử hệ thống",
                "Không lo lắng rủi ro lớn"
            ]
        },
        {
            id: 2,
            coins: "25.000 xu",
            price: 25000,
            label: "Gói phổ thông",
            icon: "💰",
            description: "Gói phổ thông, đủ để đọc nhiều chương truyện và theo dõi nhiều tác phẩm yêu thích.",
            perks: [
                "Nhiều chương truyện mở khóa hơn",
                "Thích hợp cho người đọc thường xuyên",
                "Hỗ trợ tác giả nhiều hơn"
            ]
        },
        {
            id: 3,
            coins: "60.000 xu",
            price: 55000,
            label: "Gói tiện ích",
            icon: "🧨",
            description: "Gói tiết kiệm với ưu đãi đặc biệt, dành cho người đọc trung thành.",
            perks: [
                "Tiết kiệm 20% chi phí",
                "Trải nghiệm liền mạch không lo hết xu",
                "Khuyến nghị cho độc giả gắn bó"
            ]
        },
        {
            id: 4,
            coins: "120.000 xu",
            price: 100000,
            label: "Gói ưu đãi",
            icon: "🧧",
            description: "Gói cao cấp, đáp ứng nhu cầu đọc lâu dài với mức giá hợp lý.",
            perks: [
                "Nhiều ưu đãi dài hạn",
                "Thỏa sức đọc truyện không giới hạn",
                "Hỗ trợ nền tảng và tác giả nhiều hơn"
            ]
        },
        {
            id: 5,
            coins: "150.000 xu",
            price: 135000,
            label: "Gói nâng cấp",
            icon: "🌻",
            description: "Gói mở rộng giúp bạn duy trì trải nghiệm đọc liền mạch trong thời gian dài.",
            perks: [
                "Ưu đãi tốt hơn 15%",
                "Thích hợp cho người đọc mỗi ngày",
                "Nhận ưu tiên trong sự kiện tặng thưởng"
            ]
        },
        {
            id: 6,
            coins: "180.000 xu",
            price: 160000,
            label: "Gói tin cậy",
            icon: "🌸",
            description: "Gói dành cho người đam mê đọc, cung cấp nhiều xu với giá cực tốt.",
            perks: [
                "Giá trị cao, tiết kiệm 25%",
                "Đọc thoải mái không gián đoạn",
                "Ưu tiên hỗ trợ khách hàng"
            ]
        },
        {
            id: 7,
            coins: "200.000 xu",
            price: 185000,
            label: "Gói tri ân",
            icon: "🏮",
            description: "Gói chuyên nghiệp – phù hợp cho người đọc thường xuyên và ủng hộ tác giả.",
            perks: [
                "Ưu đãi thành viên thân thiết",
                "Nhận thông báo sớm truyện mới",
                "Hỗ trợ đặc biệt cho tài khoản lâu năm"
            ]
        },
        {
            id: 8,
            coins: "220.000 xu",
            price: 200000,
            label: "Gói thân thiết",
            icon: "🌟",
            description: "Gói siêu lợi ích, được thiết kế cho độc giả trung thành và yêu thích sưu tập.",
            perks: [
                "Tiết kiệm gần 30%",
                "Nhận quà tặng định kỳ theo sự kiện",
                "Tham gia group ưu tiên độc giả VIP"
            ]
        },
        {
            id: 9,
            coins: "250.000 xu",
            price: 235000,
            label: "Gói tin dùng",
            icon: "🔥",            
            description: "Lựa chọn tối ưu nhất – nhiều xu, nhiều ưu đãi và tiết kiệm lớn.",
            perks: [
                "Best choice cho độc giả VIP",
                "Tiết kiệm vượt trội",
                "Đọc truyện thoải mái trong thời gian dài"
            ]
        },
    ];


    const [selected, setSelected] = useState(null);
    const [showDetail, setShowDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [cancelNotification, setCancelNotification] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);

    const handleSelect = (pkg) => {
        setSelected(pkg.id);
        setErrorMessage('');
    };

    // Xử lý khi quay lại từ PayOS
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get('status');
        const cancel = urlParams.get('cancel');

        // Nếu URL hiện tại là /MainItem (lỗi từ backend), redirect về /PaymentItem
        if (window.location.pathname === '/MainItem') {
            const newUrl = window.location.href.replace('/MainItem', '/PaymentItem');
            window.location.href = newUrl;
            return;
        }

        if (cancel === 'true' || status === 'CANCELLED') {
            setCancelNotification(true);

            // Xóa query params khỏi URL
            window.history.replaceState({}, '', window.location.pathname);

            // Tự động ẩn thông báo sau 5 giây
            setTimeout(() => {
                setCancelNotification(false);
            }, 3000);
        }
    }, []);

    // Xử lý tạo link thanh toán PayOS
    const handlePaymentRequest = async () => {
        if (!selected) {
            setErrorMessage('Vui lòng chọn gói nạp xu');
            return;
        }

        setIsLoading(true);
        setErrorMessage('');

        try {
            // Lấy token từ sessionStorage
            const token = sessionStorage.getItem('token');

            if (!token) {
                setErrorMessage('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                setTimeout(() => {
                    window.location.href = "/LoginPage";
                }, 2000);
                return;
            }

            // Decode token để lấy accountId
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userId = payload.accountId;

            // Tìm gói được chọn
            const chosenPackage = packages.find((p) => p.id === selected);

            if (!chosenPackage) {
                setErrorMessage('Gói đã chọn không hợp lệ');
                return;
            }

            console.log('🚀 Đang tạo link thanh toán cho:', chosenPackage);

            // Gọi API tạo link thanh toán
            const response = await axios.post(
                'https://be-ink-realm-c7jk.vercel.app/payment/create-payment-link',
                {
                    amount: chosenPackage.price,
                    description: `uid${userId} ${chosenPackage.price}`,
                    returnUrl: window.location.origin + '/Profile',
                    cancelUrl: window.location.origin + '/PaymentItem'
                },
                {
                    headers: {
                        'accept': '*/*',
                        'Content-Type': 'application/json'
                    },
                    timeout: 15000
                }
            );

            // Kiểm tra response
            if (response.data.success && response.data.checkoutUrl) {
                console.log('✅ Tạo link thanh toán thành công:', response.data);

                // Lưu thông tin thanh toán vào sessionStorage
                const paymentInfo = {
                    orderCode: response.data.orderCode,
                    amount: response.data.data.amount,
                    description: response.data.data.description,
                    packageId: chosenPackage.id,
                    packageName: chosenPackage.coins,
                    checkoutUrl: response.data.checkoutUrl,
                    timestamp: Date.now()
                };
                sessionStorage.setItem('pendingPayment', JSON.stringify(paymentInfo));

                // Chuyển hướng trực tiếp đến trang checkout PayOS
                window.location.href = response.data.checkoutUrl;

            } else {
                setErrorMessage(response.data.message || 'Không thể tạo link thanh toán');
            }

        } catch (error) {
            console.error('❌ Lỗi tạo thanh toán:', error);

            let errorMsg = '';

            if (error.response) {
                const status = error.response.status;
                const errorData = error.response.data;

                switch (status) {
                    case 400:
                        errorMsg = errorData?.message || '❌ Thông tin thanh toán không hợp lệ';
                        break;
                    case 401:
                    case 403:
                        errorMsg = '❌ Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.';
                        setTimeout(() => {
                            sessionStorage.removeItem('token');
                            window.location.href = "/LoginPage";
                        }, 2000);
                        break;
                    case 404:
                        errorMsg = '❌ Không tìm thấy dịch vụ thanh toán';
                        break;
                    case 500:
                        errorMsg = '💥 Lỗi server! Vui lòng thử lại sau';
                        break;
                    default:
                        errorMsg = errorData?.message || `❌ Lỗi ${status}: Không thể tạo thanh toán`;
                }
            } else if (error.request) {
                errorMsg = '❌ Không thể kết nối đến server. Vui lòng kiểm tra mạng';
            } else if (error.code === 'ECONNABORTED') {
                errorMsg = '⏱️ Quá thời gian chờ. Vui lòng thử lại';
            } else {
                errorMsg = '⚠️ Có lỗi xảy ra: ' + error.message;
            }

            setErrorMessage(errorMsg);

        } finally {
            setIsLoading(false);
        }
    };

    return (
       <div>
    {/* Nội dung chính */}
    <main className="flex-grow py-12 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Nút Trở lại */}
        <div className="max-w-7xl mx-auto w-full px-6 py-4 text-lg">
            <Link
                to="/UploadPage"
                className="flex items-center gap-2 text-sky-800 dark:text-sky-600 font-bold"
            >
                <ArrowLeft size={18} /> Trở lại
            </Link>
        </div>

        <div className="max-w-4xl mx-auto">
            {/* Tiêu đề */}
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-sky-800 dark:text-sky-400 mb-2">
                    Nạp Xu Bằng Hình Thức Chuyển Khoản
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                    Bạn hãy chọn gói nạp xu phù hợp để mở ra nhiều tiện ích và trải nghiệm tốt hơn nhé 🌟
                </p>
            </div>

            {/* Thông báo */}
            <div className="bg-gradient-to-r from-violet-100 via-rose-50 to-yellow-100 dark:from-sky-900/30 dark:via-indigo-900/20 dark:to-gray-700/10 border border-sky-200 dark:border-sky-700 text-sky-800 dark:text-sky-300 rounded-xl px-4 py-3 flex items-start gap-2 mb-10 shadow-sm dark:shadow-sky-900/30">
                <Info className="w-5 h-5 text-sky-800 dark:text-sky-400 mt-0.5" />
                <p className="text-center w-full font-normal">
                    Thanh toán qua cổng <strong className="text-lg font-bold">PayOS</strong> an toàn, nhanh chóng. <br />
                    Xu sẽ được cộng tự động trong <b>1-5 phút</b> sau khi thanh toán thành công.
                </p>
            </div>

            {/* Hiển thị lỗi nếu có */}
            {errorMessage && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl px-4 py-3 flex items-start gap-2 mb-6">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                    <p className="text-red-700 dark:text-red-300 text-sm">{errorMessage}</p>
                </div>
            )}

            {/* Gói nạp xu */}
            <div className="space-y-10 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl mx-auto cursor-grab">
                    {packages.map((pkg) => (
                        <motion.div
                            key={pkg.id}
                            className={`relative rounded-4xl p-8 text-center transition-all duration-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md dark:shadow-sky-900/30 hover:shadow-2xl hover:-translate-y-1`}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                        >
                            {/* Badge */}
                            <span
                                className={`absolute top-3 right-3 text-white text-xs px-3 py-1 rounded-full shadow-md ${
                                    pkg.id === 1
                                        ? "bg-blue-500"
                                        : pkg.id === 2
                                        ? "bg-yellow-400"
                                        : pkg.id === 3
                                        ? "bg-rose-500"
                                        : pkg.id === 4
                                        ? "bg-pink-500"
                                        : pkg.id === 5
                                        ? "bg-green-500"
                                        : pkg.id === 6
                                        ? "bg-emerald-500"
                                        : pkg.id === 7
                                        ? "bg-blue-500"
                                        : pkg.id === 8
                                        ? "bg-purple-600"
                                        : "bg-red-600"
                                }`}
                            >
                                {pkg.label}
                            </span>

                            {/* Nội dung gói */}
                            <div className="text-3xl mb-3 mt-2">{pkg.icon}</div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{pkg.coins}</h3>
                            <p className="text-gray-800 dark:text-gray-300">
                                {pkg.price.toLocaleString("vi-VN")}đ
                            </p>

                            {/* Button chọn gói */}
                            <button
                                className={`relative mt-4 w-full py-3 rounded-2xl font-bold tracking-wide cursor-pointer transition-all duration-300 shadow-md 
                                    ${
                                        selected === pkg.id
                                            ? "bg-gradient-to-r from-sky-600 to-indigo-600 text-white ring-2 shadow-lg hover:shadow-sky-400/50 scale-[1.02]"
                                            : "bg-gradient-to-r from-sky-400 to-indigo-400 text-white hover:shadow-lg hover:shadow-indigo-400/40 active:scale-[0.98]"
                                    }`}
                                onClick={() => handleSelect(pkg)}
                                disabled={isLoading}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    {selected === pkg.id ? (
                                        <span className="text-md font-bold">Đã chọn</span>
                                    ) : (
                                        <>
                                            <span className="text-lg animate-pulse">⚡</span>
                                            <span>Chọn gói</span>
                                            <span className="text-lg">💵</span>
                                        </>
                                    )}
                                </span>

                                {!selected && (
                                    <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></span>
                                )}
                            </button>

                            {/* Nút xem chi tiết */}
                            <button
                                className="mt-3 text-md font-medium text-sky-700 dark:text-sky-300 cursor-pointer"
                                onClick={() => setShowDetail(pkg)}
                            >
                                Xem chi tiết
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Button xác nhận thanh toán */}
            <div className="text-center mt-3 mb-6">
                <button
                    disabled={!selected || isLoading}
                    className={`px-5 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 mx-auto ${
                        selected && !isLoading
                            ? "bg-gradient-to-r from-sky-600 to-sky-600 text-white cursor-grab hover:brightness-110 hover:scale-105"
                            : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-grab"
                    }`}
                    onClick={() => {
                        const chosenPackage = packages.find((p) => p.id === selected);
                        if (chosenPackage) {
                            setSelectedPackage(chosenPackage);
                            setShowConfirm(true);
                        }
                    }}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Đang xử lý...</span>
                        </>
                    ) : (
                        <>{selected ? "💰Thanh toán ngay💵" : "💵Chọn gói để tiếp tục"}</>
                    )}
                </button>
            </div>

            {/* Modal xác nhận thanh toán */}
            <AnimatePresence>
                {showConfirm && selectedPackage && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-3xl max-w-lg w-full p-6 relative animate-scaleIn border border-gray-200 dark:border-gray-700 transition-all">
                            <button
                                className="absolute top-4 right-4 text-blue-400 hover:text-blue-700 dark:hover:text-blue-400 transition"
                                onClick={() => setShowConfirm(false)}
                            >
                                ✖
                            </button>

                            <div className="flex justify-center mb-3">
                                <div className="w-16 h-16 flex items-center justify-center rounded-full text-4xl bg-transparent shadow-none">
                                    {selectedPackage.icon}
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-1">
                                {selectedPackage.coins}
                            </h2>
                            <p className="text-center text-lg text-blue-800 dark:text-blue-300 font-bold mb-4">
                                {selectedPackage.price.toLocaleString("vi-VN")}đ
                            </p>

                            <p className="text-center text-gray-800 dark:text-gray-300 mb-6 leading-relaxed">
                                Xác nhận thanh toán gói qua{" "}
                                <span className="text-sky-800 dark:text-sky-400 font-bold">PayOS</span>.<br />
                                {selectedPackage.description}
                                <br />
                                Giao dịch sẽ được xử lý tự động trong <b>1–5 phút</b>.
                            </p>

                            <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-8 justify-center items-center ml-22">
                                {selectedPackage.perks.map((perk, idx) => (
                                    <li key={idx} className="flex items-center space-x-2">
                                        <span className="text-violet-500">✔</span>
                                        <span>{perk}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                                <button
                                    onClick={() => setShowConfirm(false)}
                                    className="flex-1 sm:w-45 cursor-pointer py-3 rounded-xl text-md font-bold text-gray-800 dark:text-gray-200 bg-red-300 hover:bg-red-400 dark:bg-red-700 dark:hover:bg-red-600 shadow-sm transition-all"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={() => handlePaymentRequest()}
                                    disabled={isLoading}
                                    className={`flex-1 sm:w-45 py-3 cursor-pointer rounded-xl text-md font-bold shadow-md text-white bg-gradient-to-r from-sky-500 to-sky-600 hover:scale-[1.02] transition-transform disabled:opacity-60`}
                                >
                                    {isLoading ? "⏳ Đang xử lý..." : "Thanh toán"}
                                </button>
                            </div>

                            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-5">
                                Thanh toán an toàn qua PayOS – bảo mật, nhanh chóng và tiện lợi.
                            </p>
                        </div>
                    </div>
                )}
            </AnimatePresence>

            {/* Modal chi tiết gói */}
            {showDetail && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-scaleIn border border-gray-200 dark:border-gray-700 transition-all">
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 transition"
                            onClick={() => setShowDetail(null)}
                        >
                            ✖
                        </button>

                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-3xl shadow-lg">
                                {showDetail.icon}
                            </div>
                        </div>

                        <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-2">
                            {showDetail.coins}
                        </h2>
                        <p className="text-center text-lg text-blue-600 dark:text-blue-300 font-bold mb-4">
                            {showDetail.price.toLocaleString("vi-VN")}đ
                        </p>
                        <p className="text-center text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            {showDetail.description}
                        </p>

                        <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-8">
                            {showDetail.perks.map((perk, idx) => (
                                <li key={idx} className="flex items-center space-x-2">
                                    <span className="text-green-500">✔</span>
                                    <span>{perk}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            className="w-full py-4 rounded-3xl font-medium shadow-lg bg-gradient-to-r from-indigo-400 to-blue-400 text-white hover:scale-[1.02] transition-transform"
                            onClick={() => {
                                setSelected(showDetail.id);
                                setShowDetail(null);
                            }}
                        >
                            🚀 Chọn gói này
                        </button>
                    </div>
                </div>
            )}
        </div>
    </main>
</div>

    );
};

export default MainItem;