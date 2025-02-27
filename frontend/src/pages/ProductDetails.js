import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { findKNearestNeighbors } from '../helpers/recommendationSystem';
import ProductCard from '../components/ProductCard';
import { FaShare, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Adjust path as needed

const ProductDetails = () => {
    const [data, setData] = useState({
        name: "",
        // category: "",
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
    const [recommendations, setRecommendations] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

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
            if (dataResponse.data) {
                console.log('Fetched product details:', dataResponse.data);
                setData(dataResponse.data);
            } else {
                throw new Error('No product data received');
            }
        } catch (err) {
            console.error('Error fetching product details:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllProducts = async () => {
        try {
            const response = await fetch(SummaryApi.getAllProducts.url, {
                method: SummaryApi.getAllProducts.method,
                headers: { 'Content-Type': 'application/json' },
            });
            const result = await response.json();
            if (response.ok && result.data) {
                console.log('Fetched all products:', result.data);
                setAllProducts(result.data);
            } else {
                throw new Error('Failed to fetch all products');
            }
        } catch (error) {
            console.error('Error fetching all products:', error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchProductDetails();
            await fetchAllProducts();
        };
        loadData();
    }, [params.id]);

    useEffect(() => {
        if (data && data._id && allProducts.length > 0) {
            console.log('Product Details for Recommendation:', {
                id: data._id,
                name: data.name,
                category: data.category,
                subcategory: data.subcategory,
                price: data.discountPrice
            });
            
            console.log('Total available products:', allProducts.length);
            
            const recommendedProducts = findKNearestNeighbors(data, allProducts);
            setRecommendations(recommendedProducts);
        }
    }, [data, allProducts]);

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

    const handleBuyNow = async () => {
        try {
            if (!user) {
                toast.error('Please login to continue');
                navigate('/login');
                return;
            }

            // You might want to show a shipping address form here
            // For now, we'll use user's default address
            const orderData = {
                userId: user._id,
                productId: data._id,
                size,
                quantity: 1,
                email: user.email,
                shippingAddress: user.address || 'Default Address' // You should collect this
            };

            const response = await fetch('http://localhost:8080/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(orderData)
            });

            const result = await response.json();

            if (result.success) {
                toast.success('Order placed successfully! Check your email for confirmation.');
                navigate(`/order-confirmation/${result.data.order.orderNumber}`);
            } else {
                toast.error(result.message || 'Error placing order');
            }

        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Error placing order');
        }
    };

    // const renderStars = (rating) => {
    //     const stars = [];
    //     const fullStars = Math.floor(rating);
    //     const hasHalfStar = rating % 1 !== 0;

    //     for (let i = 0; i < fullStars; i++) {
    //         stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
    //     }
    //     if (hasHalfStar) {
    //         stars.push(<FaStarHalfAlt key="half-star" className="text-yellow-400" />);
    //     }
    //     return stars;
    // };

    if (loading) return <div className="text-center text-xl">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-4">
            {/* Breadcrumb
            <div className="text-sm text-gray-600 mb-4">
                <span className="hover:text-blue-500 cursor-pointer">Clothing</span> {' › '}
                <span className="hover:text-blue-500 cursor-pointer">{data.category}</span> {' › '}
                <span className="hover:text-blue-500 cursor-pointer">{data.subcategory}</span>
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Image Section */}
                <div className="md:col-span-5">
                    <div className="sticky top-4">
                        <div className="relative group">
                            <img
                                src={data.imageUrl}
                                alt={data.name}
                                className="w-full rounded-lg cursor-zoom-in"
                                ref={imageRef}
                                onMouseMove={handleImageZoom}
                                onMouseLeave={handleImageLeave}
                            />
                            <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md">
                                <FaShare className="text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Info Section */}
                <div className="md:col-span-4">
                    <h1 className="text-2xl font-medium mb-2">{data.name}</h1>
                    
                    {/* <div className="flex items-center mb-4">
                        <div className="flex items-center">
                            {renderStars(3.4)}
                            <span className="ml-2 text-blue-500 hover:underline cursor-pointer">
                                147 ratings
                            </span>
                        </div>
                    </div> */}

                    <div className="border-t border-b py-4 my-4">
                        <div className="flex items-baseline mb-2">
                            <span className="text-3xl font-medium">₹{data.discountPrice}</span>
                            <span className="ml-2 text-gray-500 line-through">₹{data.originalPrice}</span>
                            <span className="ml-2 text-red-600">-{data.discount}%</span>
                        </div>
                        <p className="text-sm text-gray-500">Inclusive of all taxes</p>
                    </div>

                    {/* Size Selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Size:</label>
                        <select 
                            value={size} 
                            onChange={(e) => setSize(e.target.value)}
                            className="w-full p-2 border rounded-md"
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

                    <div className="space-y-3">
                        <button 
                            onClick={handleAddToCart}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-full font-medium"
                        >
                            Add to Cart
                        </button>
                        <button 
                            onClick={handleBuyNow}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-medium"
                        >
                            Buy Now
                        </button>
                    </div>

                    {/* Product Features */}
                    <div className="mt-6">
                        <h3 className="font-medium mb-2">About this item:</h3>
                        <p className="text-sm text-gray-600">{data.description}</p>
                    </div>
                </div>

                {/* Right Side Section */}
                <div className="md:col-span-3">
                    <div className="border rounded-lg p-4">
                        <p className="text-xl font-medium mb-2">₹{data.discountPrice}</p>
                        <p className="text-blue-500 mb-4">FREE delivery</p>
                        <p className="text-green-600 font-medium mb-4">
                            {data.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </p>
                        <div className="space-y-3">
                            <button 
                                onClick={handleAddToCart}
                                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg font-medium"
                            >
                                Add to Cart
                            </button>
                            <button 
                                onClick={handleBuyNow}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium"
                            >
                                Buy Now
                            </button>
                        </div>
                        <div className="mt-4 text-sm">
                            <div className="flex items-center text-gray-600 mb-2">
                                <span className="mr-2">🔒</span>
                                Secure transaction
                            </div>
                            <div className="flex items-center text-gray-600">
                                <span className="mr-2">🚚</span>
                                Ships from and sold by Kids Fashion
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recommendations Section */}
            {recommendations.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-2xl font-medium mb-6">Similar items to consider</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {recommendations.map(product => (
                            <ProductCard 
                                key={product._id} 
                                product={product}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
