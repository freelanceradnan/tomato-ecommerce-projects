import React, { useContext, useState } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { StoreContext, useAuth } from '../../contexts/StoreContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase';
import { BotMessageSquare, Heart, LogOut, MapPin, MessageSquareMore, NotepadText, Package2, UserRoundPen } from 'lucide-react';

const MyDashboard = () => {
    const {currentUser}=useContext(StoreContext)
    return (
        <div>
            <div style={{ display: "flex", minHeight: "100vh",width:"100%"}}>
      <nav style={{ 
        width: "250px", 
        backgroundColor: "#0F172A", 
        color: "white", 
        padding: "20px"
      }} className=''>
        <h2 className='text-[#CBD5E1] py-2'>Welcome Back {currentUser?.email?.split('@gmail.com')[0]}!</h2>
        <ul style={{ listStyle: "none", padding: 0 }} className='flex flex-col gap-3'>
          <li className='hover:bg-[#FF6347] text-[#CBD5E1]'><Link to="/myDashboard/myProfile" style={{ color: "white" }} className='flex gap-2'>
          
          <UserRoundPen />
         <span> My Profile</span></Link></li>
          <li className='hover:bg-[#FF6347] text-[#CBD5E1]'><Link to="/myDashboard/address" style={{ color: "white" }} className='flex gap-2'>
          
          <MapPin />
         <span> Address Book</span></Link></li>
          
          <li className='hover:bg-[#FF6347] text-[#CBD5E1]'><Link to="/myDashboard/wishlist" style={{ color: "white" }} className='flex gap-2'>
          
          <Heart />
         <span> Wishlist Items</span></Link></li>
          <li className='hover:bg-[#FF6347] text-[#CBD5E1]'><Link to="/myDashboard/orders" style={{ color: "white" }} className='flex gap-2'>
          
          <Package2 />
         <span> My Orders</span></Link></li>
          <li className='hover:bg-[#FF6347] text-[#CBD5E1]'><Link to="/myDashboard/feedback" style={{ color: "white" }} className='flex gap-2'>
          
        <MessageSquareMore />
         <span>Feedback</span></Link></li>
          <li className='hover:bg-[#FF6347] text-[#CBD5E1]'><Link to="/myDashboard/chatwithus" style={{ color: "white" }} className='flex gap-2'>
          
          <BotMessageSquare />
         <span> Chat with us</span></Link></li>
         <li className='hover:bg-[#FF6347] text-[#CBD5E1]'><Link to="/myDashboard/policies" style={{ color: "white" }} className='flex gap-2'>
          
          <NotepadText />
         <span>Policies</span></Link></li>
          <li className='hover:bg-[#FF6347] text-[#CBD5E1]'><Link to="/" style={{ color: "white" }} className='flex gap-2' onClick={()=>signOut(auth)}>
          
          <LogOut />
         <span> Logout</span></Link></li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <main style={{ flexGrow: 1, padding: "20px", backgroundColor: "#f4f4f4" }}>
        
        <Outlet />
      </main>
    </div>
        </div>
    );
};

export default MyDashboard;