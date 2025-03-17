import React, { useState } from 'react';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const isLoggedIn = !!localStorage.getItem('token');
    const [showLogout, setShowLogout] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setShowLogout(false);
        navigate('/signIn');
    };

    const toggleLogout = () => {
        setShowLogout(!showLogout);
    };

    const handleCategoryClick = (category) => {
        let rowIndex;
        switch (category) {
            case 'Jackets': rowIndex = 0; break;
            case 'Shoes': rowIndex = 1; break;
            case 'Pants': rowIndex = 2; break;
            default: rowIndex = 0;
        }
        navigate(`/productList?row=${rowIndex}`);
    };

    return (
        <div className="nav1">
            <Link to="/" className="home-link"><h1>M & B</h1></Link>
            <ul className="list1">
                <li><Link to="/" className="aa">Home</Link></li>
                <li><Link to="/carte" className="aa">Cart</Link></li>
                <li className="user-menu">
                    {isLoggedIn ? (
                        <div className="user-dropdown">
                            <span 
                                className="aa user-name" 
                                onClick={toggleLogout}
                            >
                                Welcome, {user?.name}
                            </span>
                            {showLogout && (
                                <div className="logout-dropdown">
                                    <button 
                                        onClick={handleLogout} 
                                        className="logout-btn"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/signIn" className="aa">SignIn</Link>
                    )}
                </li>
                <li className="dropdown">
                    <span className="aa">Categories</span>
                    <div className="dropdown-menu">
                        <span 
                            onClick={() => handleCategoryClick('Jackets')} 
                            className="dropdown-item"
                        >
                            Jackets
                        </span>
                        <span 
                            onClick={() => handleCategoryClick('Shoes')} 
                            className="dropdown-item"
                        >
                            Shoes
                        </span>
                        <span 
                            onClick={() => handleCategoryClick('Pants')} 
                            className="dropdown-item"
                        >
                            Pants
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;