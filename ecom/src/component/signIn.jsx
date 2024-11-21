import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signIn.css'
import Navbar from './navbar';
const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Sign In Successful!');
  };

  return (
    <>
    <Navbar/>
    <div className="S-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required
          />
        </div>
        <button ><Link to="/"  className='aa'>Sign In</Link></button>
        <Link to="/signUp" className='s-link' >If you don't have an account, create a new account:Sign Up</Link>
        
      </form>
      
    </div>
    </>
  );
};

export default Signin;