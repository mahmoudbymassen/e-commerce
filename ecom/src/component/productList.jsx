import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import './productList.css';

const Product = () => {
    const [produits, setProduits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const rowRefs = useRef([]);
    const location = useLocation();

    useEffect(() => {
        fetch('http://localhost:3000/api/produits')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProduits(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setError('Failed to fetch products. Please try again later.');
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!loading && produits.length > 0) {
            const queryParams = new URLSearchParams(location.search);
            const rowIndex = parseInt(queryParams.get('row')) || 0;
            if (rowRefs.current[rowIndex]) {
                rowRefs.current[rowIndex].scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [loading, produits, location.search]);

    // Split products into rows of 4
    const productsPerRow = 4;
    const productRows = [];
    for (let i = 0; i < produits.length; i += productsPerRow) {
        productRows.push(produits.slice(i, i + productsPerRow));
    }

    const scrollToNextRow = (index) => {
        if (index + 1 < productRows.length) {
            rowRefs.current[index + 1].scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            {productRows.map((row, rowIndex) => (
                <div key={rowIndex} ref={el => rowRefs.current[rowIndex] = el}>
                    <div className="product-grid">
                        {row.map(elm => (
                            <div className="product-item" key={elm._id}>
                                <img src={elm.image} alt={elm.title} />
                                <p>{elm.title}</p>
                                <h3>${elm.price}</h3>
                                <Link to={`/details/${elm._id}`} className="aa">View Details</Link>
                            </div>
                        ))}
                    </div>
                    {rowIndex < productRows.length - 1 && (
                        <div className="next-row-button-container">
                            <button 
                                className="next-row-button" 
                                onClick={() => scrollToNextRow(rowIndex)}
                            >
                                more
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Product;