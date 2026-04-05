import React from 'react';
import { assets } from '../../assets/assets';

const AppDownload = () => {
    return (
        <div className='m-auto md:mt-25 mt-10 font-[max(3vw,20px)] text-center text-[500] md:mb-20 mb-10' id="mobileApp">
        <p className='md:text-3xl font-[500] text-[22px]'>For Better Experience Download</p>
        <p className='text-[22px] md:text-3xl font-[500]'>Tomato App</p>
        <div className='flex flex-col md:flex-row justify-center gap-[max(2vw,10px)] mt-4 md:mt-10 items-center'>
        <img src={assets.play_store} className='md:w-[max(30vw,120px)] md:max-w-[180px] transition-0.5s cursor-pointer hover:scale-[1.05] max-w-[50%]'/>
        <img src={assets.app_store} alt="" className='md:w-[max(30vw,120px)] md:max-w-[180px] transition-0.5s cursor-pointer hover:scale-[1.05] max-w-[50%]'/>
        </div>
        </div>
    );
};

export default AppDownload;