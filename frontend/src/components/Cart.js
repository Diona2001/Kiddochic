import React, { useEffect, useState, useCallback, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { ShoppingCartContext } from './ShoppingCartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const { refreshCart } = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  const fetchCart = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to view your cart.");
        setLoading(false);
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      if (!userId) {
        toast.error("Invalid user ID. Please log in again.");
        setLoading(false);
        return;
      }

      const { url, method } = SummaryApi.getCart;
      const response = await fetch(`${url}?userId=${userId}`, { 
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart data.");
      }

      const data = await response.json();
      console.log("Fetched Cart Data:", data);

      if (data.success) {
        setCart(data.data);
        refreshCart(); // Refresh the cart context after fetching
      } else {
        toast.error(data.message || "Failed to load cart.");
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to load cart.");
    } finally {
      setLoading(false);
    }
  }, [refreshCart]);

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      const token = localStorage.getItem("token");
      const usertoken = localStorage.getItem("user");
      if (!token || !usertoken) {
        toast.error("Please log in to modify your cart.");
        return;
      }

      const user = JSON.parse(usertoken);
      const userId = user._id;
  
      const { url, method } = SummaryApi.updateCartQuantity(productId);
      
      const response = await fetch(`${url}?userId=${userId}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          quantity: newQuantity,
          usertoken // Include usertoken in the request body
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update quantity.");
      }
  
      const data = await response.json();
      if (data.success) {
        toast.success("Quantity updated successfully");
        fetchCart(); // Refresh cart after updating
      } else {
        toast.error(data.message || "Failed to update quantity.");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error(error.message || "Failed to update quantity.");
    }
  };
  

  const handleRemoveItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to modify your cart.");
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const { url, method } = SummaryApi.removeFromCart(productId);
      const deleteUrl = `${url}?userId=${userId}`;
      console.log("Delete URL:", deleteUrl);

      const response = await fetch(deleteUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete item from cart.");
      }

      const data = await response.json();
      console.log("Deleted Cart Item:", data);

      if (data.success) {
        toast.success("Item removed from cart.");
        fetchCart();
      } else {
        toast.error(data.message || "Failed to remove item.");
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
      toast.error("Failed to delete item from cart.");
    }
  };

  const handleCheckout = () => {
    const orderDetails = {
      items: cart.items,
      totalPrice: (totalAmount - discountAmount).toFixed(2),
      discount: discountAmount,
      subtotal: totalAmount.toFixed(2)
    };

    navigate('/shipping', { state: { orderDetails } });
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (loading) return <p>Loading...</p>;
  if (!cart || cart.items.length === 0) return <p>Your cart is empty.</p>;

  const totalAmount = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (totalAmount * 0.1).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="lg:w-2/3">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>
          <div className="space-y-4">
            {cart.items.map(item => (
              <div key={item.product._id} 
                   className="bg-white rounded-lg shadow-md p-4 transition-transform hover:scale-[1.02]">
                <div className="flex items-center space-x-4">
                  <img 
                    src={item.product.imageUrl} 
                    alt={item.product.name} 
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800">{item.product.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{item.product.description}</p>
                    <p className="text-indigo-600 font-medium mt-1">₹{item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center space-x-4 mt-3">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => item.quantity > 1 && handleUpdateQuantity(item.product._id, item.quantity - 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-x border-gray-200">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.product._id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <span className="text-sm">Remove</span>
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-800">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-4">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            {/* Price Breakdown */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between py-3 border-b border-dashed border-gray-100">
                <span className="text-gray-600">Items ({cart.items.length})</span>
                <span className="font-medium">₹{totalAmount.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-dashed border-gray-100">
                <div className="flex items-center gap-2 text-green-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>Discount Applied</span>
                </div>
                <span className="text-green-600 font-medium">-₹{discountAmount}</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-dashed border-gray-100">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                  </svg>
                  <span>Delivery</span>
                </div>
                <span className="text-green-600 font-medium">Free</span>
              </div>
            </div>

            {/* Total Amount */}
            <div className="bg-purple-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-purple-900 font-semibold">Total Amount</p>
                  <p className="text-sm text-purple-600">Including GST</p>
                </div>
                <span className="text-2xl font-bold text-purple-900">
                  ₹{(totalAmount - discountAmount).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button 
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 rounded-xl font-medium hover:from-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-[1.02] mb-4"
            >
              Proceed to Checkout
            </button>

            {/* Secure Payment Note */}
            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              <span>Secure Checkout</span>
            </div>

            {/* Payment Methods */}
            <div className="flex justify-center gap-3 mt-4 pt-4 border-t border-gray-100">
              <img src="https://cdn-icons-png.flaticon.com/512/349/349221.png" alt="Visa" className="h-6 w-auto opacity-50 hover:opacity-100 transition-opacity" />
              <img src="https://cdn-icons-png.flaticon.com/512/349/349228.png" alt="Mastercard" className="h-6 w-auto opacity-50 hover:opacity-100 transition-opacity" />
              <img src="https://cdn-icons-png.flaticon.com/512/349/349230.png" alt="PayPal" className="h-6 w-auto opacity-50 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
