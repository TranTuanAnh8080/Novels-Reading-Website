import React from "react";
import HeaderProfile from "../components/ProfilePage/HeaderProfile";
import SidebarProfile from "../components/LibraryPage/SidebarLibrary";
import Footer from "../components/SharedComponents/Footer";
import TransactionPaymentItem from "../components/TransactionPayment/TransactionPaymentItem";

const TransactionPayment = () => {
    return (
        <div className="min-h-screen bg-white text-white dark:bg-gray-900 dark:text-white">
            <HeaderProfile className="bg-gray-900 text-white" />
            <div className="flex">
                <SidebarProfile className="bg-gray-900 text-white" />
                <main className="flex-1 p-6">
                    <TransactionPaymentItem />
                </main>
            </div>
            <Footer className="bg-gray-900 text-white" />
        </div>
    );

};


export default TransactionPayment;
