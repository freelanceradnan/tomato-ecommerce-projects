import React from 'react';
import AdminNav from '../../components/AdminNav/AdminNav';
import { Outlet } from 'react-router';


const AdminPage = () => {
    return (
        <div className="flex max-w-7xl w-[95%] mx-auto ">
            <AdminNav />
            <main className="ml-64 p-4 w-full">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminPage;