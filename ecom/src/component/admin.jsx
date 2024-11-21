import React from "react";
import { Link } from "react-router-dom";
import "./admin.css"; 
import Navbar from "./navbar";

const Admin = () => {
    return (
        <>
        <Navbar/>
        <div className="admin-dashboard">
            <div className="sidebar">
                <h2>Admin Panel</h2>
                <ul>
                    <li><Link to="/manage">Manage Products</Link></li>
                    
                </ul>
            </div>

            <div className="main-content">
                <h1>Welcome to the Admin Dashboard</h1>
                <div className="overview">
                    <div className="stat-card">
                        <h3>Total Sales</h3>
                        <p>$50,000</p>
                    </div>
                    <div className="stat-card">
                        <h3>New Orders</h3>
                        <p>120</p>
                    </div>
                    <div className="stat-card">
                        <h3>Active Products</h3>
                        <p>350</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Admin;
