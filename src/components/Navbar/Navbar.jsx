import React, { useState } from 'react';
import { assets } from '../../assets/assets';

const Navbar = () => {
    const [navSelect,setNavSelect]=useState("")
    const menuItems=[
    {name:"home",label:"HOME"},
    {name:"menu",label:"MENU"},
    {name:"mobile-app",label:"MOBILE-APP"},
    {name:"contact",label:"CONTACTUS"}
    ]
    return (
        <div className="flex items-center justify-between py-[15px]"> 

        <img src={assets.logo} alt="navbar-logo" className='w-35'/>

        <ul className="flex gap-4 color-[#4957e] text-[18px]">
        {menuItems.map((item)=>(
            <li
            key={item.name}
            onClick={() => setNavSelect(item.name)}
            className={`cursor-pointer transition-all duration-300 hover:text-tomato pb-1 ${
              navSelect === item.name ? "border-b-2 border-[#49557e] text-black" : ""
            }`}
          >
            {item.label}
          </li>
        ))}
        </ul>

        <div className="flex items-center gap-10">
        <img src={assets.search_icon} alt="" />
        <div className="">
        <img src={assets.basket_icon} alt="" />
        <div className="dot"></div>
        
        </div>
        <button className='bg-transparent text-[16px] text-[#49557e] border border-solid border-[#49557e] hover:border-tomato py-[6px] px-[20px] rounded-[20px] transition-all hover:bg-tomato hover:text-white cursor-pointer'>
  Sign In
</button>
        </div>
        </div>
    );
};

export default Navbar;