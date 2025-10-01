import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const CamperHomePage = () => {
	return (
		<div className="flex flex-col md:flex-row h-screen bg-gray-50">
			<Sidebar />
			<main className="flex-1 p-0 md:p-8 overflow-y-auto min-h-screen">
				<Outlet />
			</main>
		</div>
	);
};

export default CamperHomePage;
