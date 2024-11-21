import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Product from './component/productList';
import Details from './component/details';
import Home from './component/home';
import Signin from './component/signIn';
import SignUp from './component/signUp';
import Admin from './component/admin';
import Adminauth from './component/adminAuth';
import ManageProducts from './component/manage';
import Cart from './component/carte';

function App() {
  return (
    <Router>
      
      <Routes>
      <Route path="/" element={<Home />} />
      
        <Route path="/productList" element={<Product />} />
        <Route path="/details/:ID" element={<Details />} />
        <Route path="/signIn" element={<Signin />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/adminAuth" element={<Adminauth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/manage" element={<ManageProducts />} />
        <Route path="/carte" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
