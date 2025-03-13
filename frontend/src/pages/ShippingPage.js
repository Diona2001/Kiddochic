import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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

    const initializeRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const createRazorpayOrder = async (amount) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch('http://localhost:8080/api/cart/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    amount: parseFloat(amount),
                    currency: 'INR'
                })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Failed to create order');
            }

            if (!data.success || !data.order) {
                throw new Error('Invalid response from server');
            }

            return data.order;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    };

    const handlePayment = async () => {
        try {
            const res = await initializeRazorpay();
            if (!res) {
                toast.error('Razorpay SDK failed to load');
                return;
            }

            // Create order first
            const order = await createRazorpayOrder(orderDetails.totalPrice);
            console.log('Created order:', order);

            const options = {
                key: 'rzp_test_uY6QoIId6fbO0e',
                amount: order.amount,
                currency: order.currency,
                name: 'Your Company Name',
                description: 'Transaction',
                order_id: order.id,
                handler: async function (response) {
                    try {
                        // Create order in database
                        const orderResponse = await fetch('http://localhost:8080/api/orders/create', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            },
                            body: JSON.stringify({
                                items: orderDetails.items,
                                shippingInfo,
                                paymentInfo: {
                                    paymentId: response.razorpay_payment_id,
                                    orderId: response.razorpay_order_id,
                                    signature: response.razorpay_signature
                                },
                                totalAmount: orderDetails.totalPrice
                            })
                        });

                        const orderData = await orderResponse.json();

                        if (orderData.success) {
                            toast.success('Payment Successful!');
                            navigate('/order-success', {
                                state: {
                                    paymentId: response.razorpay_payment_id,
                                    orderId: response.razorpay_order_id,
                                    signature: response.razorpay_signature,
                                    shippingInfo,
                                    orderDetails
                                }
                            });
                        } else {
                            toast.error('Failed to create order');
                        }
                    } catch (error) {
                        console.error('Error creating order:', error);
                        toast.error('Failed to create order');
                    }
                },
                prefill: {
                    name: shippingInfo.fullName,
                    email: shippingInfo.email,
                    contact: shippingInfo.phoneNumber
                },
                notes: {
                    address: shippingInfo.address
                },
                theme: {
                    color: '#9333EA'
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('Payment error:', error);
            toast.error('Failed to initialize payment. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form
        const newErrors = {};
        if (!shippingInfo.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!shippingInfo.email.trim()) newErrors.email = 'Email is required';
        if (!shippingInfo.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
        if (!shippingInfo.address.trim()) newErrors.address = 'Address is required';
        if (!shippingInfo.city.trim()) newErrors.city = 'City is required';
        if (!shippingInfo.state.trim()) newErrors.state = 'State is required';
        if (!shippingInfo.pincode.trim()) newErrors.pincode = 'Pincode is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // If validation passes, proceed to payment
        handlePayment();
    };

    if (!orderDetails) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">No order details found. Please start your order again.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold mb-6">Shipping Information</h1>
                <form onSubmit={handleSubmit}>
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
                            {orderDetails.items.map((item, index) => (
                                <div key={index} className="flex justify-between items-center mb-2">
                                    <span>{item.product.name} x {item.quantity}</span>
                                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="text-right mt-4">
                                <p className="text-lg font-semibold">
                                    Total: ₹{orderDetails.totalPrice}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-all duration-300"
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