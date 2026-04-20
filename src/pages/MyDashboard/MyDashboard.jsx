import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { StoreContext, useAuth } from '../../contexts/StoreContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase';
import { BotMessageSquare, ChevronRight, Heart, LogOut, MapPin, MessageSquareMore, NotepadText, Package2, UserRoundPen } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../Footer/Footer';

const MyDashboard = () => {
   const [active,isActive]=useState("")
   const [hiddenText,setHiddenText]=useState(false)
    const {currentUser}=useContext(StoreContext)
    //hidden bar automatic
   useEffect(()=>{
   const mediaQuery = window.matchMedia('(min-width: 768px)');
   const handler=()=>{
   const md=mediaQuery.matches //true
   if (md) {
        setHiddenText(false);
      } else {
        setHiddenText(true);
      }
   }
   handler()
   mediaQuery.addEventListener('change',handler)
   return ()=>mediaQuery.removeEventListener('change',handler)
   },[])
    return (
        <div>
            <div style={{ display: "flex",width:"100%"}} className='min-h-[90vh]'>
      <nav style={{  
        backgroundColor: "#0F172A", 
        color: "white", 
        
      }} className='max-w-30 md:max-w-60 p-2 md:p-5'>
        
        <ul style={{ listStyle: "none", padding: 0 }} className='flex flex-col gap-3'>
          <button>
            <abbr title="Full Menu">
              <ChevronRight onClick={()=>setHiddenText(!hiddenText)}/>
            </abbr>
          </button>
          <li className={active==="myDashboard"?"bg-[#FF6347]":'hover:bg-[#FF6347] text-[#CBD5E1]'} onClick={()=>isActive("myProfile")}><Link to="/myDashboard/" style={{ color: "white" }} className='flex gap-1 md:gap-2 items-center'>
          <abbr title="profile">
           <UserRoundPen />
          </abbr>
          
         <span className='text-sm md:text-xl'> {!hiddenText && <h2 className='md:px-2'>My Profile</h2>}</span></Link></li>
          <li className={active==="address"?"bg-[#FF6347]":'hover:bg-[#FF6347] text-[#CBD5E1]'} onClick={()=>isActive("address")}><Link to="/myDashboard/address" style={{ color: "white" }} className='flex gap-1 md:gap-2 items-center'>
          
         <abbr title="Location">
           <MapPin />
         </abbr>
         <span className='text-sm md:text-xl'> {!hiddenText && <h2 className='md:px-2'>Address Book</h2>}</span></Link></li>
          
          {/* <li  className={active==="wishlist"?"bg-[#FF6347]":'hover:bg-[#FF6347] text-[#CBD5E1]' } onClick={()=>isActive("wishlist")}><Link to="/myDashboard/wishlist" style={{ color: "white" }} className='flex gap-1 md:gap-2 items-center'>
          
          <abbr title="WishList">
            <Heart />
          </abbr>
         <span className='text-sm md:text-xl'> {!hiddenText && <h2 className='md:px-2'>Wishlist Items</h2>}</span></Link></li> */}

          <li className={active==="order"?"bg-[#FF6347]":'hover:bg-[#FF6347] text-[#CBD5E1]'} onClick={()=>isActive("order")}><Link to="/myDashboard/orders" style={{ color: "white" }} className='flex gap-1 md:gap-2 items-center'>
          
         <abbr title="Orders">
           <Package2 />
         </abbr>
         <span className='text-sm md:text-xl'> {!hiddenText &&<h2 className='md:px-2'>My Orders</h2>}</span></Link></li>
          <li className={active==="feedback"?"bg-[#FF6347]":'hover:bg-[#FF6347] text-[#CBD5E1]'} onClick={()=>isActive("feedback")}><Link to="/myDashboard/feedback" style={{ color: "white" }} className='flex gap-1 md:gap-2 items-center'>
          
       <abbr title="Feedback">
         <MessageSquareMore />
       </abbr>
         <span className='text-sm md:text-xl'>{!hiddenText && <h2 className='md:px-2'>Feedback</h2>}</span></Link></li>
          <li  className={active==="chatwithus"?"bg-[#FF6347]":'hover:bg-[#FF6347] text-[#CBD5E1]'} onClick={()=>isActive("chatwithus")}><Link to="/myDashboard/chatwithus" style={{ color: "white" }} className='flex gap-1 md:gap-2 items-center'>
          
          <abbr title="Feedback">
            <BotMessageSquare />
          </abbr>
         <span className='text-sm md:text-xl'> {!hiddenText && <h2 className='md:px-2'>Chat with us</h2>}</span></Link></li>
         <li  className={active==="policies"?"bg-[#FF6347]":'hover:bg-[#FF6347] text-[#CBD5E1]'} onClick={()=>isActive("policies")}><Link to="/myDashboard/policies" style={{ color: "white" }} className='flex gap-1 md:gap-2 items-center'>
          
          <abbr title="Chat">
            <NotepadText />
          </abbr>
         <span className='text-sm md:text-xl'>{!hiddenText && <h2 className='md:px-2'>Policies</h2>}</span></Link></li>
          <li  ><Link to="/" style={{ color: "white" }} className='flex gap-1 md:gap-2 items-center' onClick={()=>signOut(auth)}>
          
         <abbr title="Logout">
           <LogOut />
         </abbr>
         <span className='text-sm md:text-xl'> {!hiddenText && <h2 className='md:px-2'>Logout</h2>}</span></Link></li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <main style={{ flexGrow: 1, padding: "5px", backgroundColor: "#f4f4f4" }}>
        
        <Outlet />
      </main>
    </div>
    <Footer/>
        </div>
        
    );
};

export default MyDashboard;