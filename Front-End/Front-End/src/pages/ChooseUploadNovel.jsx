import React from 'react';
import UploadItem from '../components/UploadNovelPage.jsx/UploadItem';
import HeaderProfile from "../components/ProfilePage/HeaderProfile";
import Footer from '../components/Footer';
import SidebarLibrary from '../components/LibraryPage/SidebarLibrary';
const ChooseUploadNovel = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <HeaderProfile />
            <div className="flex flex-1">
                <SidebarLibrary />
                <UploadItem />
            </div>
            <Footer />
        </div>
    );
}

export default ChooseUploadNovel;