
import HeaderPayment from "../components/PaymentItemPage/HeaderPayment";
import MainItem from "../components/PaymentItemPage/MainItem";
import Footer from "../components/Footer";

const PaymentItem = () => {
    return (
        <div className="min-h-screen flex flex-col
         bg-gradient-to-r from-sky-100 via-transparent to-rose-100">
            <HeaderPayment />
            <MainItem />
            <Footer />
        </div>
    );
}

export default PaymentItem;
