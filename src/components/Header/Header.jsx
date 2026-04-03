import React, { useState } from 'react';

const Header = () => {
   
    return (
        <div className="bg-[url('./assets/header_img.png')] h-[50vw] md:h-[36vw] md:w-auto bg-cover md:bg-contain bg-no-repeat my-[10px] mx-auto relative" id="home">
        <div className="absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw]" style={{animation:"fadeIn 3s"}}>
            <h2 className='text-white font-[#500] text-[max(4.2vw,20px)]'>
  Order Your Favourite Food Here
</h2>
            <p className='text-white text-[1.2vw] hidden md:block'>Choose from a diverse menu featureing a delectable arroay of dishes crafter with satisty your cravings and elevate your dining experience, one delicious meal at a time.dishes crafter with satisty your cravings and elevate your dining experience, one delicious meal</p>
            <button className='border-none color-[#747474] font-[500] py-[1vw] px-[2.3vw] bg-white text-[max(1vw,13px)] rounded-[50px]'>View Menu</button>
        </div>
        </div>
    );
};

export default Header;