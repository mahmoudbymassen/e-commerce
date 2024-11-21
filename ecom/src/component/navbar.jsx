import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="nav1">
            <Link to="/" className="home-link"><h1>M & B</h1></Link>
            <ul className="list1">
                <li><Link to="/" className="aa">Home</Link></li>
                <li><Link to="/carte" className="aa">Cart</Link></li>
                <li><Link to="/signIn" className="aa">SignIn/SignUp</Link></li>
                <li><Link to="/adminAuth" className="aa">Admin</Link></li>
            </ul>
        </div>
    );
}

export default Navbar;
