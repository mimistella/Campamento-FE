import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '@components/Admin/AdminSidebar';
import {DashboardProvider} from '@providers/DashboardProvider'
import { PeriodosProvider } from '@providers/PeriodosProvider.jsx';

const AdminHomePage = () => {
    return (
        <DashboardProvider >
            <PeriodosProvider>
                <div className="flex flex-col md:flex-row h-screen bg-gray-50">
                    <AdminSidebar />
                    <main className="flex-1 p-2 sm:p-4 md:p-8 overflow-y-auto">
                        <Outlet />
                    </main>
                </div>
            </PeriodosProvider>
         </DashboardProvider>
    );
};

export default AdminHomePage;
