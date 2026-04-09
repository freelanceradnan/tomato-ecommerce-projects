import React, { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { ShoppingBag, User, X, Search, MenuIcon, LogOut, CircleChevronRight } from 'lucide-react'; 
import { assets } from '../../assets/assets';
import SignModal from '../SignModal/SignModal';
import { StoreContext, useAuth } from '../../contexts/StoreContext';
import { Menu as HeadlessMenu, MenuButton, MenuItem, MenuItems,Menu } from '@headlessui/react';
import { auth } from '../../Firebase/Firebase';
import { signOut } from 'firebase/auth';
import { NavHashLink } from 'react-router-hash-link';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router';
const Navbar = () => {
  const navigate=useNavigate()
 const {currentUser}=useContext(StoreContext)
const handlerLogout=()=>{
  signOut(auth)
  .then(()=>{
    navigate("/")
  })
  .catch((error)=>console.log(error))
}
 const [isOpen, setIsOpen] = useState(false);
  
  const {isLogin,
       isLoading,
       role,}=useContext(StoreContext)
  const [modal,setModal]=useState(false)
  const [isSingupPage,setIsSignup]=useState(false)
  useEffect(() => {
   
    setIsOpen(false);
    
  }, [location.pathname]);
 
  const [navSelect, setNavSelect] = useState('Home');
  const [close,setClose]=useState(false)
 

  const menuItems = [
    { name: 'Home', label: 'Home', to: '/#home' },
    { name: 'Menu', label: 'Menu', to: '/#menu' },
    { name: 'Mobile-App', label: 'Mobile-App', to: '/#mobileApp' },
    { name: 'Contact-us', label: 'Contact-us', to: '/#contactUs' }
    
  ];

  return (
   <>
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* 1. Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-tomato tracking-tighter">
              <img src={assets.logo} alt="" className='w-[130px] md:w-[130px]'/>
            </Link>
          </div>

<div className="hidden md:flex space-x-8">
{isLogin && role==='admin'?"":

  menuItems.map((item) => (
    <a
      key={item.name}
      href={item.to}
      onClick={() => setNavSelect(item.name)}
      className={`text-[15px] font-medium transition-colors duration-200 hover:text-tomato py-1 ${
        navSelect === item.name ? "text-tomato border-b-2 border-tomato" : "text-[#49557e]"
      }`}
    >
      {item.label}
    </a>
  ))
}
</div>

          {/* 3. Utility Icons (Search, User, Cart) */}
          <div className="flex items-center space-x-4">
            {isLogin && role==='admin'?
            ""
          : <>
          <button className="p-2 text-gray-600 hover:text-tomato">
              <Search size={20} />
            </button>
            
            <Link to="/cart" className="p-2 text-gray-600 hover:text-tomato relative">
              <ShoppingBag size={20} />
              <span className="absolute top-1 right-1 bg-tomato text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </Link>
          </>
          }
           
      {/* profile icon /singup button */}
            {isLogin && role?

            isLogin && role=='user'? 
            <Menu as="div" className="hidden md:block relative ml-3"> 
              <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <User/>
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <a
                    href="/myDashboard"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    My Dashboard
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <button onClick={handlerLogout}>
                    <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Sign out
                  </a>
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>:  <Menu as="div" className="hidden md:block relative ml-3"> 
              <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <User/>
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <a
                    href="/admin-dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Admin Dashboard
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <button onClick={handlerLogout}>
                    <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Sign out
                  </a>
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
            :
            <button className='hidden md:block border px-3 py-1 text-gray-600 hover:bg-tomato hover:border hover:border-tomato hover:text-white text-sm' style={{borderRadius:"50px"}} onClick={() => setModal(prev => !prev)}>sign in</button> 
            }
          
            {/* Mobile Menu Button */}
           {isLogin && role==='admin'? 
           ""
           :
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
                {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
              </button>
            </div>
           }
          </div>
        </div>
      </div>

      {/* 4. Mobile Menu Drawer */}
      
      {isLogin && role==='admin'?
      isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-1 transition-all ">
          {isLogin && role==='admin'?
          ""
        :
        menuItems.map((item) => (
            <a
              key={item.name}
              href={item.to}
              onClick={() => {
                setNavSelect(item.name);
                setIsOpen(false);
              }}
              className="block px-3 py-2 text-base font-medium text-[#49557e] hover:bg-gray-200 hover:text-tomato rounded-md "
            >
              {item.label}
            </a>
            
          ))
        }
          {
            isLogin && role?
            isLogin && role==='user'? 
            (
              <>
              <Link to="/myDashboard" className="block px-3 py-2 text-base font-medium text-[#49557e] hover:bg-gray-50 hover:text-tomato rounded-md hover:bg-gray-200 py-2" onClick={()=> setIsOpen(false)}>My Dashboard</Link>
              <button className='w-full flex items-center justify-center hover:bg-gray-200 py-2 hover:text-tomato' onClick={()=>signOut(auth)}>
                <LogOut />
                <span>Sign Out</span>
                </button>
              </>
             
            )
            :
            (
              <>
              <Link to="/admin-dashboard" className="block px-3 py-2 text-base font-medium text-[#49557e] hover:bg-gray-50 hover:text-tomato rounded-md hover:bg-gray-200 py-2" onClick={()=> setIsOpen(false)}>Admin Dashboard</Link>
              <button className='w-full flex items-center justify-center hover:bg-gray-200 py-2 hover:text-tomato' onClick={()=>signOut(auth)}>
                <LogOut />
                <span>Sign Out</span>
                </button>
              </>
             
            )
            
            :
            <>
            <Link className="block px-3 py-2 text-base font-medium text-[#49557e] hover:bg-gray-50 hover:text-tomato rounded-md" to="/signup" 
            onClick={()=>setIsOpen(false)}>Signup</Link>
           
            </>
          }
          
        </div>
      )
      
      :
      
      ""}
    </nav>
    {/* {modal} */}
    {modal && <SignModal modal={modal} setModal={setModal}/>}
   </>

  );
};

export default Navbar;