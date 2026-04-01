import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router';

const Rootlayout = () => {
    return (
        <div className='app'>
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default Rootlayout;