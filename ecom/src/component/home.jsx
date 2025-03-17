import React, { useState, useEffect } from "react";
import Navbar from './navbar.jsx';
import './home.css';
import bgImg from "./images/backround-removebg.png";
import { Link } from "react-router-dom";
import Product from "./productList.jsx";

function Home() {
    const [showProducts, setShowProducts] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowProducts(true);
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
            });
        }, 3000); 

        return () => clearTimeout(timer); 
    }, []);

    const handleShowProducts = () => {
        setShowProducts(true);
        setTimeout(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
            });
        }, 100);
    };

    return (
        <>
            <div className="container-home">
                <img src={bgImg} alt="bg" className="img-1" />
                <div className="text-container">
                    <p className="title">Welcome to <br /> M & B Shop Store</p>
                    <button className="btn1" onClick={handleShowProducts}>
                        Shop now
                    </button>
                </div>
            </div>
            {showProducts && <Product />}
        </>
    );
}

export default Home;