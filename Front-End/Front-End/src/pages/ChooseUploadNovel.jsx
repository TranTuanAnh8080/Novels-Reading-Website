import React from 'react';
import UploadItem from '../components/UploadNovelPage/UploadItem';
import HeaderUpload from "../components/UploadNovelPage/HeaderUpload";
import Footer from '../components/Footer';

const ChooseUploadNovel = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <HeaderUpload />
            <div className="flex flex-1 justify-center items-center">
            <UploadItem />
            </div>
            <Footer />
        </div>
    );
}

export default ChooseUploadNovel;