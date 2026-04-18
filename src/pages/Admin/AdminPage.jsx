import React from 'react';
import AdminNav from '../../components/AdminNav/AdminNav';
import { Outlet } from 'react-router-dom';
import { CircleChevronRight } from 'lucide-react';

const AdminPage = () => {
    return (
        <div className="flex max-w-7xl mx-auto">
            <AdminNav />
           
            <main className="flex-1 md:ml-64 p-4 min-h-screen">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminPage;