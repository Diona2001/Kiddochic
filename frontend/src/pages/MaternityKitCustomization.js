import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';

const MaternityKitCustomization = () => {
    const navigate = useNavigate();
    const [selectedItems, setSelectedItems] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedNightwear, setSelectedNightwear] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    const nightwearOptions = [
        {
            id: 'nw1',
            image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/17671792a.webp",
            color: "Navy Blue Floral",
            description: "Front-open nursing nightwear"
        },
        {
            id: 'nw2',
            image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/15307238a.webp",
            color: "Pink Comfort",
            description: "Button-down maternity nightdress"
        },
        {
            id: 'nw3',
            image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/19675459a.webp",
            color: "Lavender Dreams",
            description: "Soft cotton nursing nightwear"
        },
        {
            id: 'nw4',
            image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/18932974a.webp",
            color: "Sage Green",
            description: "Breathable maternity sleepwear"
        }
    ];

    const nightwearSizes = [
        { id: 'S', label: 'Small' },
        { id: 'M', label: 'Medium' },
        { id: 'L', label: 'Large' },
        { id: 'XL', label: 'Extra Large' },
        { id: 'XXL', label: 'Double XL' }
    ];

    const kitItems = {
        'Delivery Essentials': [
            { 
                id: 1, 
                name: 'Maternity Nightwear', 
                price: 899, 
                description: 'Comfortable nursing nightdress',
                hasVariants: true,
                variantType: 'nightwear'
            },
            { id: 2, name: 'Maternity Pads', price: 299, description: 'Pack of 10 absorbent pads' },
            { id: 3, name: 'Delivery Kit Container', price: 499, description: 'Sterilized container' },
            { id: 4, name: 'Maternity Towels', price: 399, description: 'Soft, absorbent towels' },
            { id: 5, name: 'Disposable Underpads', price: 249, description: 'Pack of 10 underpads' }
        ],
        'Personal Care': [
            { id: 6, name: 'Perineal Wash Bottle', price: 199, description: 'Gentle cleansing bottle' },
            { id: 7, name: 'Sitz Bath', price: 299, description: 'Postpartum care' },
            { id: 8, name: 'Nipple Cream', price: 349, description: 'Soothing cream for nursing' },
            { id: 9, name: 'Breast Pads', price: 199, description: 'Pack of 12 disposable pads' }
        ],
        'Comfort Items': [
            { id: 10, name: 'Maternity Pillow', price: 1499, description: 'Full body support pillow' },
            { id: 11, name: 'Ice/Heat Pack', price: 299, description: 'Reusable therapy pack' },
            { id: 12, name: 'Nursing Cover', price: 599, description: 'Privacy while nursing' },
            { id: 13, name: 'Support Belt', price: 799, description: 'Pregnancy support belt' }
        ]
    };

    const handleQuantityChange = (itemId, quantity) => {
        // Update selected items
        const updatedItems = {
            ...selectedItems,
            [itemId]: quantity
        };
        setSelectedItems(updatedItems);

        // Calculate new total price
        const newTotal = Object.entries(updatedItems).reduce((total, [id, qty]) => {
            if (qty > 0) {
                const item = Object.values(kitItems)
                    .flat()
                    .find(item => item.id === parseInt(id));
                return total + (item?.price * qty);
            }
            return total;
        }, 0);

        setTotalPrice(newTotal);
    };

    const handleBuyNow = () => {
        // Validate if nightwear is selected and has size
        if (selectedItems[1] && (!selectedNightwear || !selectedSize)) {
            alert('Please select both style and size for the nightwear');
            return;
        }

        const orderDetails = {
            items: selectedItems,
            variants: {
                nightwear: selectedNightwear ? {
                    style: selectedNightwear,
                    size: selectedSize
                } : null
            },
            totalPrice: totalPrice
        };

        // Navigate to shipping page with order details
        navigate('/shipping', { state: { orderDetails } });
    };

    const handleNightwearSelect = (nightwearId) => {
        setSelectedNightwear(nightwearId);
    };

    const handleSizeSelect = (sizeId) => {
        setSelectedSize(sizeId);
    };

    const renderItemContent = (item) => {
        if (item.hasVariants) {
            const options = nightwearOptions;
            const selectedVariant = selectedNightwear;
            const handleSelect = handleNightwearSelect;

            return (
                <div>
                    <div className="flex-1 mb-4">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                        <p className="text-blue-600 font-medium">₹{item.price}</p>
                    </div>
                    
                    {/* Color/Style Selection */}
                    <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Select Style:</h4>
                        <div className="grid grid-cols-4 gap-2 mb-4">
                            {options.map((option) => (
                                <div 
                                    key={option.id}
                                    onClick={() => handleSelect(option.id)}
                                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                                        selectedVariant === option.id 
                                            ? 'border-blue-500' 
                                            : 'border-transparent'
                                    }`}
                                >
                                    <img 
                                        src={option.image} 
                                        alt={option.color}
                                        className="w-full h-20 object-cover"
                                    />
                                    {selectedVariant === option.id && (
                                        <div className="absolute top-0 right-0 p-1 bg-blue-500 rounded-bl-lg">
                                            <FaCheck className="text-white text-sm" />
                                        </div>
                                    )}
                                    <p className="text-xs text-center p-1">{option.color}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Size Selection */}
                    <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Select Size:</h4>
                        <div className="flex gap-2">
                            {nightwearSizes.map((size) => (
                                <button
                                    key={size.id}
                                    onClick={() => handleSizeSelect(size.id)}
                                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                                        selectedSize === size.id
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                    }`}
                                >
                                    {size.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Size Guide */}
                    <div className="mt-2">
                        <button 
                            className="text-sm text-blue-600 hover:text-blue-800 underline"
                            onClick={() => {/* Add size guide modal/popup logic */}}
                        >
                            View Size Guide
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
                <p className="text-blue-600 font-medium">₹{item.price}</p>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 py-16">
                {/* Hero Section with Animation */}
                <div className="text-center mb-16 animate-fade-in">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Customize Your 
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 ml-2">
                            Maternity Kit
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Select from our carefully curated collection of maternity essentials designed for your comfort and care.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-10">
                    {/* Left Column - Kit Items */}
                    <div className="md:col-span-2 space-y-10">
                        {Object.entries(kitItems).map(([category, items]) => (
                            <div key={category} 
                                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
                            >
                                {/* Category Header */}
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                                    <h2 className="text-2xl font-bold text-white">
                                        {category}
                                    </h2>
                                </div>

                                <div className="p-8 space-y-8">
                                    {items.map(item => (
                                        <div key={item.id} 
                                            className="bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100"
                                        >
                                            {/* Item Content */}
                                            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        {item.description}
                                                    </p>
                                                    <p className="text-blue-600 font-bold text-lg mt-2">
                                                        ₹{item.price.toLocaleString()}
                                                    </p>
                                                </div>

                                                {/* Quantity Selector */}
                                                <div className="flex items-center gap-4">
                                                    <select
                                                        value={selectedItems[item.id] || 0}
                                                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                                        className="border-2 border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-lg font-medium transition-all duration-300"
                                                    >
                                                        {[0, 1, 2, 3, 4, 5].map(num => (
                                                            <option key={num} value={num}>{num}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Variant Selection if applicable */}
                                            {item.hasVariants && (
                                                <div className="mt-6 border-t pt-6">
                                                    {renderItemContent(item)}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column - Summary */}
                    <div className="md:col-span-1">
                        <div className="sticky top-4 bg-white rounded-3xl shadow-xl p-8">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 -mx-8 -mt-8 p-8 rounded-t-3xl mb-6">
                                <h2 className="text-2xl font-bold text-white">Kit Summary</h2>
                            </div>

                            <div className="space-y-4 mb-8">
                                {Object.entries(selectedItems).map(([itemId, quantity]) => {
                                    if (quantity > 0) {
                                        const item = Object.values(kitItems)
                                            .flat()
                                            .find(item => item.id === parseInt(itemId));
                                        return (
                                            <div key={itemId} 
                                                className="flex justify-between py-3 border-b border-gray-100"
                                            >
                                                <span className="text-gray-700 font-medium">
                                                    {item.name} × {quantity}
                                                </span>
                                                <span className="font-bold text-gray-900">
                                                    ₹{(item.price * quantity).toLocaleString()}
                                                </span>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>

                            <div className="border-t border-gray-200 pt-6">
                                <div className="flex justify-between mb-8">
                                    <span className="text-xl font-bold text-gray-800">Total:</span>
                                    <span className="text-3xl font-bold text-blue-600">
                                        ₹{totalPrice.toLocaleString()}
                                    </span>
                                </div>

                                <button
                                    onClick={handleBuyNow}
                                    disabled={totalPrice === 0}
                                    className={`w-full py-4 rounded-2xl text-white font-bold text-lg transition-all duration-300 transform ${
                                        totalPrice === 0 
                                            ? 'bg-gray-300 cursor-not-allowed' 
                                            : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:-translate-y-1'
                                    }`}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaternityKitCustomization; 