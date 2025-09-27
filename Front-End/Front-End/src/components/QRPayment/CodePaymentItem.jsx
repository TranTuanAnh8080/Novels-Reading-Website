import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Copy,
    ArrowLeft,
    Banknote,
    FileText,
    Landmark,
    CreditCard,
    User,
    AlertTriangle
} from "lucide-react";

const CodePayment = () => {
    const [payment, setPayment] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Lấy dữ liệu từ localStorage
    useEffect(() => {
        const loadPaymentData = () => {
            const data = localStorage.getItem("paymentData");
            if (data) setPayment(JSON.parse(data));
            setIsLoading(false);
        };
        setTimeout(loadPaymentData, 400);
    }, []);

    // Copy + Toast thông báo
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        const toast = document.createElement("div");
        toast.innerText = `📋 Đã sao chép: ${text}`;
        toast.className =
            "fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeIn";
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add("animate-fadeOut");
            setTimeout(() => toast.remove(), 500);
        }, 2000);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-64 text-gray-600 space-y-3">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-400 border-t-transparent"></div>
                <span className="text-indigo-600">Đang tải dữ liệu thanh toán...</span>
            </div>
        );
    }

    if (!payment) {
        return (
            <div className="text-center p-8 bg-white rounded-xl shadow-lg m-auto max-w-sm">
                <p className="text-red-500 font-medium">
                    Không tìm thấy dữ liệu thanh toán. Vui lòng thử lại.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen 
         bg-gradient-to-r bg-rose-100 via-blue-50 to-yellow-50 p-4 sm:p-6">

            {/* Nút Trở lại */}
            <div className="max-w-7xl mx-auto w-full px-6 py-4">
                <Link to="/PaymentItem" className="flex items-center gap-2 text-sky-700 font-bold">
                    <ArrowLeft size={18} /> Trở lại
                </Link>
            </div>
            {/* Card chính */}
            <div className="relative
             bg-zinc-50 backdrop-blur-lg p-5 sm:p-6 rounded-4xl shadow-xl w-full 
             max-w-md space-y-6 border border-white/40">

                {/* Tiêu đề */}
                <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 to-blue-700 bg-clip-text text-transparent">
                    Thanh toán nạp xu
                </h2>
                <p className="text-md text-gray-700 text-center">
                    Quét mã QR để hoàn tất giao dịch trong vài giây.
                </p>

                {/* QR Code */}
                <div className="text-center p-6 rounded-2xl 
            bg-gradient-to-r bg-rose-100 via-blue-50 to-yellow-50 shadow-inner border border-indigo-100">
                    <p className="text-base font-bold text-blue-700 mb-3">
                        Mã QR Thanh Toán
                    </p>
                    <div className="inline-block p-3 rounded-4xl
                     bg-white/90 shadow-lg ring-2 ring-indigo-100">
                        <img
                            src={payment.qrUrl}
                            alt="QR code thanh toán"
                            className="w-52 h-52 sm:w-60 sm:h-60 object-contain"
                        />
                    </div>
                </div>

                {/* Thông tin */}
                <div className="space-y-3">
                    <InfoRow
                        label="Số tiền"
                        value={payment.amount?.toLocaleString("vi-VN") + " ₫"}
                        icon={<Banknote className="text-green-500" size={20} />}
                        highlight="amount"
                        onCopy={() => copyToClipboard(payment.amount)}
                    />
                    <InfoRow
                        label="Nội dung CK"
                        value={payment.content}
                        icon={<FileText className="text-red-500" size={20} />}
                        highlight="important"
                        onCopy={() => copyToClipboard(payment.content)}
                    />
                    <InfoRow
                        label="Ngân hàng"
                        value={payment.bank}
                        icon={<Landmark className="text-indigo-500" size={20} />}
                        onCopy={() => copyToClipboard(payment.bank)}
                    />
                    <InfoRow
                        label="Số tài khoản"
                        value={payment.accountNumber}
                        icon={<CreditCard className="text-sky-500" size={20} />}
                        onCopy={() => copyToClipboard(payment.accountNumber)}
                    />
                    <InfoRow
                        label="Chủ tài khoản"
                        value={payment.accountName}
                        icon={<User className="text-purple-500" size={20} />}
                        onCopy={() => copyToClipboard(payment.accountName)}
                    />
                </div>

                {/* Lưu ý */}
                <div className="bg-amber-50 border border-amber-200 rounded-3xl px-4 py-5 flex items-start gap-3 shadow-sm mt-10">
                    <AlertTriangle className="w-6 h-6 text-amber-500 mt-0.5" />
                    <div className="text-sm text-amber-800 space-y-1">
                        <p><b>Lưu ý quan trọng</b></p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Mỗi chuyển khoản chỉ dùng 1 lần, xu sẽ không được cộng tự động nếu sai nội dung.</li>
                            <li>Vui lòng chuyển khoản đúng số tiền theo gói đã chọn để tránh lỗi hệ thống.</li>
                            <li>Thời gian xử lý: <b>1-5 phút</b> sau khi chuyển khoản thành công.</li>
                            <li>Liên hệ hỗ trợ nếu gặp sự cố qua email: <b>support@inkrealm.com</b> hoặc hotline: <b>0901777888</b>.</li>
                            <li>Hệ thống chỉ hỗ trợ các <b>ngân hàng nội địa</b> . Vui lòng kiểm tra danh sách ngân hàng được hỗ trợ trước khi thực hiện giao dịch.</li>
                            <li>Đảm bảo nhập đúng nội dung chuyển khoản theo hướng dẫn để hệ thống tự động cộng xu.</li>
                            <li> <b>Giao dịch ngoài giờ hành chính</b> có thể mất thêm thời gian xử lý.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Component InfoRow
const InfoRow = ({ label, value, icon, highlight, onCopy }) => {
    let valueClasses = "flex-1 truncate font-medium text-gray-800";
    if (highlight === "amount") {
        valueClasses = "flex-1 font-extrabold text-green-600 text-lg";
    }
    if (highlight === "important") {
        valueClasses =
            "flex-1 font-bold text-red-600 text-base bg-red-50 px-2 py-1 rounded-md border border-red-200";
    }

    return (
        <div className="flex items-center gap-2 p-3 bg-white rounded-2xl shadow-sm border border-gray-100">
            {icon}
            <span className="text-sm text-gray-500 w-24">{label}</span>
            <span className={valueClasses}>{value}</span>
            <button
                onClick={onCopy}
                className="ml-1 text-indigo-500 hover:text-indigo-700 transition-colors"
                title="Sao chép"
            >
                <Copy size={18} />
            </button>
        </div>
    );
};

export default CodePayment;