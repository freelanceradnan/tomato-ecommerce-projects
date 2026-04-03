import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react'; 
import { assets } from '../../assets/assets';
import SignModal from '../SignModal/SignModal';

const Navbar = () => {
  const [modal,setModal]=useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [navSelect, setNavSelect] = useState('Home');
  const [close,setClose]=useState(false)

  const menuItems = [
    { name: 'Home', label: 'Home', to: '#home' },
    { name: 'Menu', label: 'Menu', to: '#menu' },
    { name: 'Mobile-App', label: 'Mobile-App', to: '#mobileApp' },
    { name: 'Contact-us', label: 'Contact-us', to: '#contactUs' }
    
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
  {menuItems.map((item) => (
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
  ))}
</div>

          {/* 3. Utility Icons (Search, User, Cart) */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-tomato">
              <Search size={20} />
            </button>
            
            <Link to="/cart" className="p-2 text-gray-600 hover:text-tomato relative">
              <ShoppingBag size={20} />
              <span className="absolute top-1 right-1 bg-tomato text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </Link>
         
            <button className='hidden md:block border px-3 py-1 text-gray-600 hover:bg-tomato hover:border hover:border-tomato hover:text-white text-sm' style={{borderRadius:"50px"}} onClick={() => setModal(prev => !prev)}>sign in</button>
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-1 transition-all">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              onClick={() => {
                setNavSelect(item.name);
                setIsOpen(false);
              }}
              className="block px-3 py-2 text-base font-medium text-[#49557e] hover:bg-gray-50 hover:text-tomato rounded-md"
            >
              {item.label}
            </Link>
            
          ))}
          <Link className="block px-3 py-2 text-base font-medium text-[#49557e] hover:bg-gray-50 hover:text-tomato rounded-md">Sing in</Link>
          
        </div>
      )}
    </nav>
    {/* {modal} */}
    {modal && <SignModal modal={modal} setModal={setModal}/>}
   </>

  );
};

export default Navbar;