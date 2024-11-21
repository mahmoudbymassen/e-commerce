import React, { useState } from "react";
import { Link } from "react-router-dom";
import './auth.css'
import Navbar from "./navbar";
const Adminauth = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const [isAuthenticated, setIsAuthenticated] = useState(false); 
    
    const handleVerify = () => {
        if (username === "admin" && password === "admin") {
            setIsAuthenticated(true); 
            setError("");
        } else {
            setIsAuthenticated(false); 
            setError("Invalid username or password!"); 
        }
    };

    return (
        <>
        <Navbar/>
        <div className="auth-container">
            <h2>Admin</h2>
            <label className="auth-label">User:</label>
            <input
                className="auth-input"
                type="text"
                placeholder="Enter the username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            /><br /><br />
            <label className="auth-label">Password:</label>
            <input
                className="auth-input"
                type="password"
                placeholder="Enter the password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /><br /><br />

            <button onClick={handleVerify} className="verify-btn">
                <Link to={isAuthenticated ? "/admin" : "#"} className="verify-btn-link">
                    Verify
                </Link>
            </button>

            {error && <p className="auth-error">{error}</p>}
        </div>
        </>
    );
};

export default Adminauth;
