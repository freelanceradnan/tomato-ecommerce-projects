import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';
import { Box, House, Plus, Settings, Truck, Users, X, MenuIcon, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase';

const AdminNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const closeMenu = () => {
    if (isMobile) setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 right-4 z-[70] bg-white p-2 shadow rounded"
        >
          {isOpen ? <X /> : <MenuIcon />}
        </button>
      )}

      {/* Sidebar */}
      <nav
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r
          z-[60] transition-transform duration-300 ease-in-out
          ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
        `}
      >
        <div className="p-6">

          <h2 className="font-bold mb-6">Admin Panel</h2>

          <NavLink onClick={closeMenu} to="/admin-dashboard" className="flex gap-2 p-2">
            <House /> Dashboard
          </NavLink>

          <NavLink onClick={closeMenu} to="inventory" className="flex gap-2 p-2">
            <Box /> Inventory
          </NavLink>

          <NavLink onClick={closeMenu} to="addProduct" className="flex gap-2 p-2">
            <Plus /> Add Product
          </NavLink>

          <NavLink onClick={closeMenu} to="orderMangement" className="flex gap-2 p-2">
            <Truck /> Orders
          </NavLink>

          <NavLink onClick={closeMenu} to="userManagement" className="flex gap-2 p-2">
            <Users /> Users
          </NavLink>

          <NavLink onClick={closeMenu} to="settings" className="flex gap-2 p-2">
            <Settings /> Settings
          </NavLink>
           <NavLink onClick={()=>signOut(auth)} to="settings" className="flex gap-2 p-2">
            <LogOut /> logout
          </NavLink>
        </div>
      </nav>

      {/* Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[50]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default AdminNav;