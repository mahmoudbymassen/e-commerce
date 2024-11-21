import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import './productList.css'
import Navbar from './navbar.jsx'

const Product = () => {
    const [produits, setProduits] = useState([]);
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => setProduits(data));
    }, []);

    return (
        <div>
            <Navbar />
            
            <div className="product-grid">
                
                {produits.map(elm => {
                    return(
                        
                    <div className="product-item" key={elm.id}>
                        <img src={elm.image} alt={elm.title} />
                        <p>{elm.title}</p>
                        <h3>${elm.price}</h3>
                        
                        <Link to={`/details/${elm.id}`} className="aa">view details</Link>
                    </div>
                    )
                })}
            </div>
        </div>

    );
};

export default Product;
