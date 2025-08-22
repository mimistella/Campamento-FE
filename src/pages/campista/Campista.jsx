import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const CamperHomePage = () => {
	return (
		<div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
			<Sidebar />
			<main className="flex-1 p-6 md:p-8">
				<Outlet />
			</main>
		</div>
	);
};

export default CamperHomePage;
