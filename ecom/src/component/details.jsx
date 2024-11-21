import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './details.css';
import Navbar from "./navbar";

const Details = () => {
    const { ID } = useParams();
    const [productInfo, setProductInfo] = useState({});
    const [cart, setCart] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false); // State for showing the confirmation modal
    const [purchaseSuccess, setPurchaseSuccess] = useState(false); // State to track if purchase is successful

    // Load the cart from localStorage on page load
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("carte")) || [];
        setCart(savedCart);
    }, []);

    // Fetch product details
    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${ID}`)
            .then((response) => response.json())
            .then((data) => {
                setProductInfo({
                    ...data,
                    rate: data.rating?.rate,
                    count: data.rating?.count,
                });
            });
    }, [ID]);

    // Add product to the cart
    const addToCart = () => {
        const updatedCart = [...cart, productInfo];
        setCart(updatedCart);
        localStorage.setItem("carte", JSON.stringify(updatedCart));
    };

    // Handle Buy Now button click
    const handleBuyNow = () => {
        setShowConfirm(true); // Show the confirmation modal
    };

    // Handle purchase confirmation
    const handleConfirmPurchase = (confirm) => {
        if (confirm) {
            // If the user confirms, show success message
            setPurchaseSuccess(true);
            // Optionally, you can clear the cart or perform other actions here
        }
        setShowConfirm(false); // Close the confirmation modal
    };

    return (
        <div>
            <Navbar />
            <div className="details-container">
                <div className="product-section">
                    <div className="image-container">
                        <img src={productInfo.image} alt={productInfo.title} className="product-image" />
                    </div>
                    <div className="details-card">
                        <h2 className="product-title">{productInfo.title}</h2>
                        <p className="product-description">{productInfo.description}</p>
                        <p className="product-price">${productInfo.price}</p>
                        <p className="product-rate">Rate: {productInfo.rate}</p>
                        <p className="product-count">Count: {productInfo.count}</p>
                        <div className="card-footer">
                            <button className="btn-buy" onClick={handleBuyNow}>Buy Now</button>
                            <button className="btn-add-to-shop" onClick={addToCart}>Add to Cart</button>
                        </div>
                    </div>
                </div>

                {/* Confirmation Modal */}
                {showConfirm && (
                    <div className="confirmation-modal">
                        <div className="modal-content">
                            <p>Are you sure you want to buy this product?</p>
                            <button onClick={() => handleConfirmPurchase(true)} className="btn-confirm">Yes</button>
                            <button onClick={() => handleConfirmPurchase(false)} className="btn-cancel">No</button>
                        </div>
                    </div>
                )}

                {/* Success Message */}
                {purchaseSuccess && (
                    <div className="success-message">
                        Purchase successful! Thank you for your order.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Details;
