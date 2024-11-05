import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import SummaryApi from '../common';

const ProductDetails = () => {
    const [data, setData] = useState({
        name: "",
        category: "",
        subcategory: "",
        description: "",
        originalPrice: "",
        discountPrice: "",
        discount: "",
        stock: "",
        imageUrl: ""
    });
    
    const [size, setSize] = useState("0 months - 3 months");
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const imageRef = useRef(null);
    const [zoomStyle, setZoomStyle] = useState({});

    const fetchProductDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.getProductById(params.id).url, {
                method: SummaryApi.getProductById(params.id).method,
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                throw new Error('Error fetching product');
            }

            const dataResponse = await response.json();
            setData(dataResponse.data);
        } catch (err) {
            console.error('Error fetching product details:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductDetails();
    }, []);

    const handleImageZoom = (e) => {
        if (imageRef.current) {
            const { left, top, width, height } = imageRef.current.getBoundingClientRect();
            const x = (e.clientX - left) / width * 100;
            const y = (e.clientY - top) / height * 100;
            setZoomStyle({
                backgroundImage: `url(${data.imageUrl})`,
                backgroundPosition: `${x}% ${y}%`,
                backgroundSize: '200%',
                backgroundRepeat: 'no-repeat'
            });
        }
    };

    const handleImageLeave = () => {
        setZoomStyle({});
    };

    const handleAddToCart = () => {
        console.log(`Added to cart: ${data.name}, Size: ${size}`);
    };

    const handleBuyNow = () => {
        console.log(`Buy now: ${data.name}, Size: ${size}`);
    };

    if (loading) return <div className="text-center text-xl">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>{data.name}</h1>
            <div style={{ display: 'flex', gap: '40px' }}>
                <div style={{ flex: '1', maxWidth: '500px' }}>
                    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <div
                            ref={imageRef}
                            onMouseMove={handleImageZoom}
                            onMouseLeave={handleImageLeave}
                            style={{
                                width: '100%',
                                paddingTop: '100%', // 1:1 Aspect Ratio
                                backgroundImage: `url(${data.imageUrl})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                cursor: 'zoom-in',
                                ...zoomStyle
                            }}
                        />
                    </div>
                </div>
                <div style={{ flex: '1' }}>
                    <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>Category: {data.category}</p>
                    <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>Subcategory: {data.subcategory}</p>
                    <p style={{ color: '#666', marginBottom: '15px' }}>Description: {data.description}</p>
                    <p style={{ fontSize: '18px', textDecoration: 'line-through', color: '#888' }}>Original Price: ₹{data.originalPrice}</p>
                    <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#e53e3e', marginBottom: '10px' }}>Discount Price: ₹{data.discountPrice}</p>
                    <p style={{ fontSize: '18px', fontWeight: '600', color: '#38a169' }}>Discount: {data.discount}% off</p>
                    <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>Stock: {data.stock} available</p>

                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="size" style={{ display: 'block', fontSize: '18px', fontWeight: '600', marginBottom: '5px' }}>Select Size:</label>
                        <select 
                            id="size" 
                            value={size} 
                            onChange={(e) => setSize(e.target.value)} 
                            style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
                        >
                            <option value="0 months - 3 months">0 months - 3 months</option>
                            <option value="3 months - 6 months">3 months - 6 months</option>
                            <option value="6 months - 12 months">6 months - 12 months</option>
                            <option value="1 year - 2 years">1 year - 2 years</option>
                            <option value="2 years - 3 years">2 years - 3 years</option>
                            <option value="3 years - 4 years">3 years - 4 years</option>
                            <option value="4 years - 5 years">4 years - 5 years</option>
                            <option value="5 years - 6 years">5 years - 6 years</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button 
                            onClick={handleAddToCart} 
                            style={{
                                flex: '1', 
                                padding: '12px', 
                                fontSize: '16px', 
                                fontWeight: 'bold', 
                                color: 'white', 
                                backgroundColor: '#ff69b4', // Pink background
                                border: 'none', 
                                borderRadius: '4px', 
                                cursor: 'pointer', 
                                transition: 'background-color 0.3s'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#ff4794'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#ff69b4'}
                        >
                            Add to Cart
                        </button>
                        <button 
                            onClick={handleBuyNow} 
                            style={{
                                flex: '1', 
                                padding: '12px', 
                                fontSize: '16px', 
                                fontWeight: 'bold', 
                                color: '#ff69b4', // Pink text color
                                backgroundColor: 'transparent', 
                                border: '2px solid #ff69b4', // Pink border
                                borderRadius: '4px', 
                                cursor: 'pointer', 
                                transition: 'border-color 0.3s, color 0.3s'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = '#ff69b4';
                                e.target.style.color = 'white';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = '#ff69b4';
                            }}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
