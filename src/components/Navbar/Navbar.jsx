import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { href, Link } from 'react-router';

const Navbar = () => {
    const [navSelect,setNavSelect]=useState("")
    const menuItems=[
    {name:"home",label:"HOME",to:'/'},
    {name:"menu",label:"MENU",to:'/'},
    {name:"mobile-app",label:"MOBILE-APP",to:'/'},
    {name:"contact",label:"CONTACTUS",to:'/'}
    ]
    return (
        <div className="flex items-center justify-between py-[15px]"> 

        <Link to="/"><img src={assets.logo} alt="navbar-logo" className='w-30'/></Link>

        <ul className="flex gap-4 color-[#4957e] text-[15px]">
        {menuItems.map((item)=>(
            <Link
            to={item.to}
            key={item.name}
            onClick={() => setNavSelect(item.name)}
            className={`cursor-pointer transition-all duration-300 hover:text-tomato ${
              navSelect === item.name ? "border-b-2 border-[#49557e] text-black" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
        </ul>

        <div className="flex items-center gap-10">
        <img src={assets.search_icon} alt="" />
        <div className="relative">
        <img src={assets.basket_icon} alt="" />
        <div
    className="absolute 
               bg-red-500 text-white 
               text-[11px] font-bold 
               min-w-[18px] min-h-[18px] 
               flex items-center justify-center 
               rounded-full 
               -top-2 -right-3"
  >
    1
  </div>
        
        </div>
        <button className='bg-transparent text-[16px] text-[#49557e] border border-solid border-[#49557e] hover:border-tomato py-[6px] px-[20px] rounded-[20px] transition-all hover:bg-tomato hover:text-white cursor-pointer'>
  Sign In
</button>
        </div>
        </div>
    );
};

export default Navbar;