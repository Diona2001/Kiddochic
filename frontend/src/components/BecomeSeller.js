import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// If you don't have the seller image yet, you can comment this line out temporarily
// import sellerImage from '../assets/seller-image.png';

const BecomeSeller = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone || phone.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    
    try {
      // Store the phone number in localStorage or state management if needed
      localStorage.setItem('sellerPhone', phone);
      // Navigate to supplier registration form
      navigate('/supplier/register');
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Section */}
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Sell online to 14 Cr+ customers at{' '}
              <span className="text-pink-500">0% Commission</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Become a seller and grow your business across India
            </p>

            {/* GST Notice */}
            <div className="mb-8">
              <div className="inline-flex items-center bg-pink-100 px-3 py-1 rounded-full mb-2">
                <span className="text-pink-500 text-sm font-semibold mr-2">New!</span>
              </div>
              <p className="text-gray-700">
                Don't have a GSTIN or have a Composition GSTIN?{' '}
                <button className="text-pink-500 hover:underline">
                  Click here
                </button>{' '}
                to know more.
              </p>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
              <div className="flex">
                <div className="bg-gray-100 px-3 py-2 rounded-l-lg flex items-center">
                  <span className="text-gray-500">+91</span>
                </div>
                <input
                  type="tel"
                  placeholder="Enter your mobile number"
                  className="flex-1 px-4 py-2 border border-l-0 border-gray-300 rounded-r-lg focus:outline-none focus:border-pink-500"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  pattern="[0-9]{10}"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-500 text-white py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors duration-200"
              >
                Start Selling
              </button>
            </form>
          </div>

          {/* Right Section - Image */}
          <div className="lg:w-1/2">
            {/* Temporarily use a placeholder div until you have the image */}
            <div className="bg-pink-100 rounded-lg h-96 w-full flex items-center justify-center">
              <span className="text-pink-500">Seller Image Placeholder</span>
            </div>
            {/* Once you have the image, uncomment this:
            <img
              src={sellerImage}
              alt="Become a Seller"
              className="w-full h-auto"
            />
            */}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800">11 Lakh+</h3>
            <p className="text-gray-600">Suppliers</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800">14 Crore+</h3>
            <p className="text-gray-600">Customers</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800">19000+</h3>
            <p className="text-gray-600">Pincodes Served</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800">700+</h3>
            <p className="text-gray-600">Categories</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeSeller; 