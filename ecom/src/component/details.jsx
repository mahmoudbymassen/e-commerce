import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./details.css";

const Details = () => {
    const { ID } = useParams();
    const [productInfo, setProductInfo] = useState({});
    const [cart, setCart] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [purchaseSuccess, setPurchaseSuccess] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false); 

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("carte")) || [];
        setCart(savedCart);
    }, []);

    useEffect(() => {
        fetch(`http://localhost:3000/api/produits/${ID}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setProductInfo(data);
            })
            .catch((error) => {
                console.error("Error fetching product details:", error);
            });
    }, [ID]);

    const addToCart = () => {
        const updatedCart = [...cart, productInfo];
        setCart(updatedCart);
        localStorage.setItem("carte", JSON.stringify(updatedCart));
        setAddedToCart(true); 
        setTimeout(() => setAddedToCart(false), 3000); 
    };

    const handleBuyNow = () => {
        setShowConfirm(true);
    };

    const handleConfirmPurchase = (confirm) => {
        if (confirm) {
            setPurchaseSuccess(true);
        }
        setShowConfirm(false);
    };

    const sizes = [6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11];

    return (
        <div>
            <div className="details-container">
                <div className="product-section">
                    <div className="image-container">
                        <img
                            src={productInfo.image}
                            alt={productInfo.title}
                            className="product-image"
                        />
                        <div className="thumbnail-container">
                            <img
                                src={productInfo.image}
                                alt="thumbnail1"
                                className="thumbnail"
                            />
                            <img
                                src={productInfo.image}
                                alt="thumbnail2"
                                className="thumbnail"
                            />
                            <img
                                src={productInfo.image}
                                alt="thumbnail3"
                                className="thumbnail"
                            />
                            <img
                                src={productInfo.image}
                                alt="thumbnail4"
                                className="thumbnail"
                            />
                        </div>
                    </div>
                    <div className="details-card">
                        <h2 className="product-title">{productInfo.title}</h2>
                        <div className="size-selector">
                            <label htmlFor="size">Size</label>
                            <select id="size" className="size-dropdown">
                                {sizes.map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                            <a href="#" className="size-guide">
                                Size Guide
                            </a>
                        </div>
                        <p className="product-price">${productInfo.price}</p>
                        <button className="btn-add-to-bag" onClick={addToCart}>
                            Add to Bag
                        </button>
                        {addedToCart && (
                            <div className="added-to-cart-message">
                                Added to bag successfully!
                            </div>
                        )}
                    </div>
                    <div className="info-section">
                        <div className="info-item">
                            <h3>Size & Fit</h3>
                            <p>Free Shipping & Returns</p>
                        </div>
                        <div className="info-item">
                            <h3>Description</h3>
                            <p>{productInfo.description || "No description available."}</p>
                        </div>
                    </div>
                </div>

                {showConfirm && (
                    <div className="confirmation-modal">
                        <div className="modal-content">
                            <p>Are you sure you want to buy this product?</p>
                            <button
                                onClick={() => handleConfirmPurchase(true)}
                                className="btn-confirm"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => handleConfirmPurchase(false)}
                                className="btn-cancel"
                            >
                                No
                            </button>
                        </div>
                    </div>
                )}

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