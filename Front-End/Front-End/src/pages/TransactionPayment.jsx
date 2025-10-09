import React from "react";
import HeaderProfile from "../components/ProfilePage/HeaderProfile";
import SidebarProfile from "../components/LibraryPage/SidebarLibrary";
import Footer from "../components/SharedComponents/Footer";
import TransactionPaymentItem from "../components/TransactionPayment/TransactionPaymentItem";

const TransactionPayment = () => {
    return (
        <div>
            <HeaderProfile />
            <div className="flex ml-5">
                <SidebarProfile />
                <main className="flex-1 p-6">
                    <TransactionPaymentItem />
                </main>
            </div>
            <Footer />
        </div>
    );
};


export default TransactionPayment;
