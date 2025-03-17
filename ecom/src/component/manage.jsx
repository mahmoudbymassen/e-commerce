import React, { useState } from "react";
import "./manageProducts.css";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productImage, setProductImage] = useState(null);

    const addProduct = () => {
        if (productName.trim() && productPrice.trim() && productImage && productDescription.trim()) {
            setProducts([
                ...products,
                {
                    id: Date.now(),
                    name: productName,
                    price: productPrice,
                    description: productDescription,
                    image: URL.createObjectURL(productImage),
                },
            ]);
            setProductName("");
            setProductPrice("");
            setProductDescription("");
            setProductImage(null);
        } else {
            alert("Please fill in all fields and upload a photo.");
        }
    };

    const removeProduct = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    return (
        <>
        <div className="manage-products">
            <h1>Manage Products</h1>
            <div className="form-container">
                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Product Price"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                />
                <textarea
                    placeholder="Product Description"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                ></textarea>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProductImage(e.target.files[0])}
                />
                <button onClick={addProduct}>Add Product</button>
            </div>

            <div className="product-list">
                <h2>Product List</h2>
                {products.length > 0 ? (
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                                <img src={product.image} alt={product.name} className="product-image" />
                                <div className="product-details">
                                    <h3>{product.name}</h3>
                                    <p>${product.price}</p>
                                    <p>{product.description}</p>
                                </div>
                                <button
                                    className="remove-btn"
                                    onClick={() => removeProduct(product.id)}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No products added yet.</p>
                )}
            </div>
        </div>
        </>
    );
};

export default ManageProducts;
