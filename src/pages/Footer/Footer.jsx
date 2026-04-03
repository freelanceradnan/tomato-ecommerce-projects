import React from 'react';
import { assets } from '../../assets/assets';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <div className="text-[#d9d9d9] bg-[#323232] md:mt-20 mt-10"id='contactUs'>
         <div className="w-[85%] md:grid md:gap-20 mx-auto py-8 flex flex-col gap-10" style={{gridTemplateColumns:"2fr 1fr 1fr"}}>
         <div className="flex flex-col gap-4">
        <Link to="/"><img src={assets.logo} alt="" className='w-30'/></Link>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, culpa. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum, necessitatibus.</p>
        <div  className="flex gap-4">
        <img src={assets.facebook_icon} alt="" className='w-10'/>
        <img src={assets.twt_icon} alt="" className='w-10'/>
        <img src={assets.linkedin_icon} alt="" className='w-10'/>
        </div>
         </div>

         <div className="flex flex-col gap-4">
            <h2 className='text-white font-semibold'>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
         </div>

         <div className="flex flex-col gap-4">
            <h2 className='text-white font-semibold'>GET IN TOUCH</h2>
            <ul className='list-none mb-2.5'>
                <li>+880 1305 140844</li>
                <li>adnanDev@gmail.com</li>
            </ul>
         </div>
         
         </div>
         <hr className='h-[1px] my-5 mx-0 border-none bg-gray-200 w-[85%] mx-auto'/>
         <p className='text-center'>Copyright 2026 &copy;Tomato.com -All Rights Reserved</p>
        </div>
    );
};

export default Footer;