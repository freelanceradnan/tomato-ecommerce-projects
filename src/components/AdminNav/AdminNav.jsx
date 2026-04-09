import { Box, CircleChevronRight, House, MenuIcon, Plus, Settings, Truck, Users, X } from 'lucide-react';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';

const AdminNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)');

   
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* MOBILE TOGGLE BUTTON (Floating) */}
            {isMobile && (
                <button 
                    onClick={toggleSidebar}
                    className="fixed top-4 right-10 z-50 p-2 bg-white rounded-full shadow-md border border-gray-200"
                >
                    {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
                </button>
            )}

            {/* SIDEBAR */}
            <nav className={`
                admin-sidebar bg-white min-h-screen border-r border-[#e5e7eb] fixed z-40 transition-transform duration-300
                ${isMobile ? (isOpen ? "translate-x-0 w-64" : "-translate-x-full") : "translate-x-0 w-64"}
            `}> 
                
                <div className="p-6">
                    <div className="nav-brand text-xl font-bold py-3 mb-6 border-b">Admin Panel</div>
                    
                    <ul className='flex flex-col gap-4'>
                        <li>
                            <NavLink 
                                to="/admin-dashboard" 
                                className={({ isActive }) => `flex gap-3 items-center p-2 rounded-lg ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                                onClick={() => isMobile && setIsOpen(false)}
                                end
                            >
                                <House size={20}/> Dashboard
                            </NavLink>
                        </li>
                        
                        <li className="nav-label text-xs font-semibold text-gray-400 uppercase mt-4">Storefront</li>
                        <li>
                            <NavLink to="inventory" className="flex gap-3 items-center p-2 text-gray-600" onClick={() => isMobile && setIsOpen(false)}>
                                <Box size={20} /> Inventory
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="addProduct" className="flex gap-3 items-center p-2 text-gray-600" onClick={() => isMobile && setIsOpen(false)}>
                                <Plus size={20}/> Add Product
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="orderMangement" className="flex gap-3 items-center p-2 text-gray-600" onClick={() => isMobile && setIsOpen(false)}>
                                <Truck size={20} /> Order Management
                            </NavLink>
                        </li>

                        <li className="nav-label text-xs font-semibold text-gray-400 uppercase mt-4">Administration</li>
                        <li>
                            <NavLink to="userManagement" className="flex gap-3 items-center p-2 text-gray-600" onClick={() => isMobile && setIsOpen(false)}>
                                <Users size={20} /> User Management
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="settings" className="flex gap-3 items-center p-2 text-gray-600" onClick={() => isMobile && setIsOpen(false)}>
                                <Settings size={20} /> Settings
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* OVERLAY (Closes sidebar when clicking outside on mobile) */}
            {isMobile && isOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 z-30" 
                    onClick={toggleSidebar}
                />
            )}
        </>
    );
};

export default AdminNav;