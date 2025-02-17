// pages/Dashboard.js
import BodyDb from '../components/BodyDb';
import NavbarDb from '../components/NavbarDb';
import SidebarDb from '../components/SidebarDb';
import React from 'react';
import ThemeContextProvider from '../context/ThemeContextProvider';

function Dashboard() {
    return (
        <ThemeContextProvider>
            <div className='flex'>
                <SidebarDb />
                <div className='grow ml-16 md:ml-64 h-full lg:h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white'>
                    <NavbarDb />
                    <div>
                        <BodyDb />
                    </div>
                </div>
            </div>
        </ThemeContextProvider>
    );
}

export default Dashboard;