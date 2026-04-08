import { Box, House, Plus, Settings, Truck, Users } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNav = () => {
    return (
        <nav className="admin-sidebar w-64 bg-white min-h-screen border-r fixed border-[#e5e7eb]" > 
            <div className="nav-brand text-sm py-3">Admin Panel</div>
            
            <ul className='flex flex-col gap-3'>
                <li>
                   
                    <NavLink to="/admin-dashboard" className="flex gap-2" end>
                        <span className="icon">
                            <House size={20}/>
                            </span> Dashboard
                    </NavLink>
                </li>
                
                <li className="nav-label text-sm">Storefront</li>
                <li>
                    <NavLink to="inventory" className="flex gap-2">
                        <span className="icon"><Box /></span> Inventory
                    </NavLink>
                </li>
                <li>
                    <NavLink to="addProduct" className="flex gap-2">
                        <span className="icon"><Plus size={20}/></span> Add Product
                    </NavLink>
                </li>
                <li>
                    <NavLink to="orderMangement" className="flex gap-2">
                        <span className="icon"><Truck /></span> Order Management
                    </NavLink>
                </li>

                <li className="nav-label text-sm">Administration</li>
                <li>
                    <NavLink to="userManagement" className="flex gap-2">
                        <span className="icon"><Users /></span> User Management
                    </NavLink>
                </li>
                <li>
                    <NavLink to="settings" className="flex gap-2">
                        <span className="icon"><Settings /></span> Settings
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default AdminNav;