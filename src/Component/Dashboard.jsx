// src/components/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';


const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Dashboard</h1>
                <div className="ml-auto flex space-x-4">
                    
                    <Link to="/Login" className="text-white hover:text-gray-200 hover:bg">
                        Logout
                    </Link>
                   
                </div>
            </header>
            
                <h2 className="text-2xl font-semibold">Welcome to the Dashboard</h2>
                {/* Additional content for the Dashboard */}
            
        </div>
    );
};

export default Dashboard;
