import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ShippingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const orderDetails = location.state?.orderDetails;

    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!shippingInfo.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }
        
        if (!shippingInfo.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^\d{10}$/.test(shippingInfo.phoneNumber)) {
            newErrors.phoneNumber = 'Invalid phone number';
        }
        
        if (!shippingInfo.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(shippingInfo.email)) {
            newErrors.email = 'Invalid email format';
        }
        
        if (!shippingInfo.address.trim()) {
            newErrors.address = 'Address is required';
        }
        
        if (!shippingInfo.city.trim()) {
            newErrors.city = 'City is required';
        }
        
        if (!shippingInfo.state.trim()) {
            newErrors.state = 'State is required';
        }
        
        if (!shippingInfo.pincode.trim()) {
            newErrors.pincode = 'Pincode is required';
        } else if (!/^\d{6}$/.test(shippingInfo.pincode)) {
            newErrors.pincode = 'Invalid pincode';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const completeOrder = {
            ...orderDetails,
            shippingInfo
        };

        console.log('Complete order:', completeOrder);
        // Navigate to payment page or process order
        navigate('/payment', { state: { orderData: completeOrder } });
    };

    if (!orderDetails) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">No order details found. Please start your order again.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shipping Information</h1>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={shippingInfo.fullName}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md ${
                                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.fullName && (
                                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={shippingInfo.phoneNumber}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md ${
                                    errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.phoneNumber && (
                                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={shippingInfo.email}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Address
                            </label>
                            <textarea
                                name="address"
                                value={shippingInfo.address}
                                onChange={handleInputChange}
                                rows="3"
                                className={`w-full px-3 py-2 border rounded-md ${
                                    errors.address ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.address && (
                                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                City
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={shippingInfo.city}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md ${
                                    errors.city ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.city && (
                                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                State
                            </label>
                            <input
                                type="text"
                                name="state"
                                value={shippingInfo.state}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md ${
                                    errors.state ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.state && (
                                <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Pincode
                            </label>
                            <input
                                type="text"
                                name="pincode"
                                value={shippingInfo.pincode}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md ${
                                    errors.pincode ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.pincode && (
                                <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        <div className="border-t border-b py-4">
                            {/* Display order items here */}
                            <div className="text-right">
                                <p className="text-lg font-semibold">
                                    Total: ₹{orderDetails.totalPrice}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700"
                        >
                            Proceed to Payment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ShippingPage; 