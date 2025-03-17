import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signIn.css';

const Signin = () => {
  const [formData, setFormData] = useState({
    nom_user: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', { // Changed port from 5000 to 3000
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Server Response:', data); 
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({ name: data.nom_user || formData.nom_user }));
        setMessage('Sign In Successful!');
        navigate('/');
      } else {
        setMessage(data.error || 'Sign In Failed');
      }
    } catch (error) {
      console.error('Error during sign in:', error.message);
      setMessage('Unable to connect to the server. Please check if it’s running.');
    }
  };

  return (
    <>
      <div className="S-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit} className="signin-form">
          <div className="form-group">
            <label htmlFor="nom_user">Username:</label>
            <input
              type="text"
              id="nom_user"
              name="nom_user"
              value={formData.nom_user}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="aa">Sign In</button>
          <Link to="/signUp" className="s-link">
            If you don't have an account, create a new account: Sign Up
          </Link>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default Signin;