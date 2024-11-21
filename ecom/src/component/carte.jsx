import { useState, useEffect } from "react";
import Navbar from "./navbar";
import './carte.css';

const Carte = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("carte")) || [];
        setCart(savedCart);
    }, []);

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
        localStorage.setItem("carte", JSON.stringify(updatedCart));
    };

    return (
        <div>
            <Navbar />
            <div className="cart-container">
                <h1>Your Cart</h1>
                {cart.length > 0 ? (
                    <ul className="cart-list">
                        {cart.map((item) => (
                            <li key={item.id} className="cart-item">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="cart-item-image"
                                />
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>${item.price}</p>
                                </div>
                                <button
                                    className="cart-remove-btn"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
        </div>
    );
};

export default Carte;
