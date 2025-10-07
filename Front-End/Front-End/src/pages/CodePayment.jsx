import React from "react";
import HeaderPayment from "../components/PaymentItemPage/HeaderPayment";
import CodePaymentItem from "../components/QRPayment/CodePaymentItem";
import Footer from "../components/SharedComponents/Footer"
const CodePayment = () => {
    return (
        <div className="min-h-screen flex flex-col max-
         bg-gradient-to-r from-sky-100 via-transparent to-rose-100">
            <HeaderPayment />
            <CodePaymentItem />
            <Footer />
        </div>
    );
}

export default CodePayment;