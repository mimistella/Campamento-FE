import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/Admin/AdminSidebar';

const AdminHomePage = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            <AdminSidebar />
            <main className="flex-1 p-6 md:p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminHomePage;
