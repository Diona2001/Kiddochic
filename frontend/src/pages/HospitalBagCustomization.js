import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalBagCustomization = () => {
    const navigate = useNavigate();
    const [selectedItems, setSelectedItems] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);

    const kitItems = {
        'For Mother': [
            { id: 1, name: 'Maternity Gowns', price: 899, description: 'Comfortable hospital wear' },
            { id: 2, name: 'Nursing Bras', price: 599, description: 'Easy nursing access' },
            { id: 3, name: 'Maternity Pads', price: 399, description: 'Pack of 10 pads' },
            { id: 4, name: 'Toiletries Kit', price: 699, description: 'Essential personal care items' }
        ],
        'For Baby': [
            { id: 5, name: 'Newborn Diapers', price: 499, description: 'Pack of 24 diapers' },
            { id: 6, name: 'Baby Clothes Set', price: 799, description: '4 piece set' },
            { id: 7, name: 'Baby Blanket', price: 599, description: 'Soft cotton blanket' },
            { id: 8, name: 'Baby Care Kit', price: 899, description: 'Essential care items' }
        ],
        'Hospital Essentials': [
            { id: 9, name: 'Hospital Bag', price: 1299, description: 'Spacious maternity bag' },
            { id: 10, name: 'Breast Pump', price: 2499, description: 'Manual breast pump' },
            { id: 11, name: 'Nursing Pillow', price: 899, description: 'Comfortable support' },
            { id: 12, name: 'Maternity Belt', price: 699, description: 'Postpartum support' }
        ]
    };

    const handleQuantityChange = (itemId, quantity) => {
        setSelectedItems(prev => ({
            ...prev,
            [itemId]: quantity
        }));

        const newTotal = Object.entries({...selectedItems, [itemId]: quantity}).reduce((total, [id, qty]) => {
            const item = Object.values(kitItems)
                .flat()
                .find(item => item.id === parseInt(id));
            return total + (item?.price * qty);
        }, 0);

        setTotalPrice(newTotal);
    };

    const handleAddToCart = () => {
        console.log('Added to cart:', selectedItems);
        navigate('/cart');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Customize Your Hospital Bag</h1>
            
            <div className="grid md:grid-cols-3 gap-8">
                {/* Left Column - Kit Items */}
                <div className="md:col-span-2 space-y-8">
                    {Object.entries(kitItems).map(([category, items]) => (
                        <div key={category} className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">{category}</h2>
                            <div className="space-y-4">
                                {items.map(item => (
                                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:border-blue-500 transition-colors">
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-500">{item.description}</p>
                                            <p className="text-blue-600 font-medium">₹{item.price}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <select
                                                value={selectedItems[item.id] || 0}
                                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                                className="border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500"
                                            >
                                                {[0, 1, 2, 3, 4, 5].map(num => (
                                                    <option key={num} value={num}>{num}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Column - Summary */}
                <div className="md:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Bag Summary</h2>
                        <div className="space-y-4 mb-4">
                            {Object.entries(selectedItems).map(([itemId, quantity]) => {
                                if (quantity > 0) {
                                    const item = Object.values(kitItems)
                                        .flat()
                                        .find(item => item.id === parseInt(itemId));
                                    return (
                                        <div key={itemId} className="flex justify-between">
                                            <span className="text-gray-600">
                                                {item.name} x {quantity}
                                            </span>
                                            <span className="font-medium">
                                                ₹{item.price * quantity}
                                            </span>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                        <div className="border-t pt-4">
                            <div className="flex justify-between mb-4">
                                <span className="font-semibold">Total:</span>
                                <span className="font-semibold">₹{totalPrice}</span>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                disabled={totalPrice === 0}
                                className={`w-full py-3 rounded-lg text-white font-medium ${
                                    totalPrice === 0 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HospitalBagCustomization; 