import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signIn.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    nom_user: '',
    email: '',
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
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({ name: formData.nom_user }));
        setMessage('Sign Up Successful!');
        navigate('/signin'); 
      } else {
        setMessage(data.error || 'Sign Up Failed');
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      setMessage('Sign Up Failed');
    }
  };

  return (
    <>
      <div className="S-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className="signin-form">
          <div className="form-group">
            <label htmlFor="nom_user">Name:</label>
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
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
          <button type="submit" className="aa">Sign Up</button>
          <Link to="/signin" className="s-link">
            If you already have an account, sign in here: Sign In
          </Link>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default SignUp;