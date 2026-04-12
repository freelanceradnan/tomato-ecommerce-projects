import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, X, Search, Menu as MenuIcon, LogOut } from 'lucide-react';
import { assets } from '../../assets/assets';
import SignModal from '../SignModal/SignModal';
import { StoreContext } from '../../contexts/StoreContext';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { auth } from '../../Firebase/Firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isLogin, role } = useContext(StoreContext);

  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [navSelect, setNavSelect] = useState('Home');

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate('/'))
      .catch(err => console.log(err));
  };

  const menuItems = [
    { name: 'Home', label: 'Home', to: '/#home' },
    { name: 'Menu', label: 'Menu', to: '/#menu' },
    { name: 'Mobile-App', label: 'Mobile-App', to: '/#mobileApp' },
    { name: 'Contact-us', label: 'Contact-us', to: '/#contactUs' }
  ];

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">

            {/* LOGO */}
            <Link to="/">
              <img src={assets.logo} alt="logo" className="w-[130px]" />
            </Link>

            {/* DESKTOP MENU */}
            {! (isLogin && role === 'admin') && (
              <div className="hidden md:flex space-x-8">
                {menuItems.map(item => (
                  <a
                    key={item.name}
                    href={item.to}
                    onClick={() => setNavSelect(item.name)}
                    className={`text-sm font-medium ${
                      navSelect === item.name
                        ? 'text-tomato border-b-2 border-tomato'
                        : 'text-gray-600'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}

            {/* RIGHT SIDE */}
            <div className="flex items-center space-x-4">

              {/* Search + Cart */}
              {! (isLogin && role === 'admin') && (
                <>
                  <Search className="cursor-pointer" size={20} />
                  <Link to="/cart" className="relative">
                    <ShoppingBag size={20} />
                    <span className="absolute -top-1 -right-1 bg-tomato text-white text-[10px] rounded-full px-1">
                      3
                    </span>
                  </Link>
                </>
              )}

              {/* DESKTOP USER MENU */}
              {isLogin ? (
                <Menu as="div" className="hidden md:block relative">
                  <MenuButton>
                    <User />
                  </MenuButton>

                  <MenuItems className="absolute right-0 mt-2 w-40 bg-white shadow rounded">
                    <MenuItem>
                      <Link
                        to={role === 'admin' ? '/admin-dashboard' : '/myDashboard'}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    </MenuItem>

                    <MenuItem>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              ) : (
                <button
                  onClick={() => setModal(true)}
                  className="hidden md:block border px-3 py-1 rounded-full hover:bg-tomato hover:text-white"
                >
                  Sign In
                </button>
              )}

              {/* MOBILE USER ICON */}
              {isLogin && (
                <div className="hidden">
                  <User size={22} />
                </div>
              )}

              {/* HAMBURGER */}
              <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)}>
                  {isOpen ? <X /> : <MenuIcon />}
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden bg-white px-4 py-4 space-y-2">

            {! (isLogin && role === 'admin') && (
              menuItems.map(item => (
                <a
                  key={item.name}
                  href={item.to}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-gray-600 hover:text-tomato"
                >
                  {item.label}
                </a>
              ))
            )}

            {/* USER OPTIONS */}
            {isLogin ? (
              <>
                <Link
                  to={role === 'admin' ? '/admin-dashboard' : '/myDashboard'}
                  onClick={() => setIsOpen(false)}
                  className="block py-2"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 py-2"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setModal(true);
                  setIsOpen(false);
                }}
                className="block py-2"
              >
                Sign In
              </button>
            )}

          </div>
        )}
      </nav>

      {/* MODAL */}
      {modal && <SignModal modal={modal} setModal={setModal} />}
    </>
  );
};

export default Navbar;