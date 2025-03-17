import { useState, useEffect } from "react";
import './carte.css';

const Carte = () => {
    const [cart, setCart] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("carte")) || [];
        console.log('Initial cart loaded from localStorage:', savedCart);
        setCart(savedCart);
    }, []);

    const removeFromCart = (productId) => {
        console.log('Attempting to remove product with ID:', productId);
        console.log('Current cart:', cart);

        const idToRemove = String(productId);
        const updatedCart = cart.filter((item) => {
            const itemId = String(item.id || item._id);
            console.log(`Comparing: itemId=${itemId} with idToRemove=${idToRemove}`);
            return itemId !== idToRemove;
        });

        console.log('Updated cart after removal:', updatedCart);
        setCart(updatedCart);
        localStorage.setItem("carte", JSON.stringify(updatedCart));
    };

    const handleBuy = () => {
        setShowForm(true);
        setErrorMessage("");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simulate a successful purchase without sending data to the backend
        setShowForm(false); // Hide the form
        setSuccessMessage("Your order has been placed successfully!"); // Show success message
        setCart([]); // Clear the cart
        localStorage.removeItem("carte"); // Remove cart data from localStorage
        setFormData({ name: "", lastname: "", email: "", phone: "", address: "" }); // Reset form data
    };

    return (
        <div>
            <div className="cart-container">
                <h1>Your Cart</h1>
                {successMessage && (
                    <div className="success-message">
                        <p>{successMessage}</p>
                        <button
                            className="close-success-btn"
                            onClick={() => setSuccessMessage("")}
                        >
                            Close
                        </button>
                    </div>
                )}
                {errorMessage && (
                    <div className="error-message">
                        <p>{errorMessage}</p>
                        <button
                            className="close-error-btn"
                            onClick={() => setErrorMessage("")}
                        >
                            Close
                        </button>
                    </div>
                )}
                {cart.length > 0 ? (
                    <ul className="cart-list">
                        {cart.map((item) => (
                            <li key={item.id || item._id} className="cart-item">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="cart-item-image"
                                />
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>${item.price}</p>
                                </div>
                                <div className="cart-item-actions">
                                    <button
                                        className="cart-remove-btn"
                                        onClick={() => removeFromCart(item.id || item._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    !successMessage && <p>Your cart is empty.</p>
                )}

                {cart.length > 0 && (
                    <button className="cart-buy-btn" onClick={handleBuy}>
                        Buy Now
                    </button>
                )}

                {showForm && (
                    <div className="order-form-overlay">
                        <div className="order-form">
                            <h2>Order Information</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-actions">
                                    <button type="submit" className="submit-btn">
                                        Place Order
                                    </button>
                                    <button
                                        type="button"
                                        className="cancel-btn"
                                        onClick={() => setShowForm(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Carte;