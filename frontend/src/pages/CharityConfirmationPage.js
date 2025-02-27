import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CharityConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const charity = location.state?.charity;
  const shippingDetails = location.state?.shippingDetails;
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

  const generateReceipt = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();

    // Add logo or header
    doc.setFontSize(20);
    doc.setTextColor(44, 62, 80);
    doc.text('Charity Donation Receipt', 105, 20, { align: 'center' });

    // Order information
    doc.setFontSize(12);
    doc.text(`Order Number: #${orderNumber}`, 20, 40);
    doc.text(`Date: ${currentDate}`, 20, 50);

    // Donation Details
    doc.setFontSize(14);
    doc.setTextColor(41, 128, 185);
    doc.text('Item Details', 20, 70);

    doc.setFontSize(12);
    doc.setTextColor(44, 62, 80);
    doc.text(`Item Name: ${charity?.name}`, 20, 85);
    doc.text(`Age Group: ${charity?.ageGroup}`, 20, 95);
    doc.text(`Quality: ${charity?.quality}`, 20, 105);
    doc.text(`Gender: ${charity?.gender}`, 20, 115);

    // Shipping Information
    doc.setFontSize(14);
    doc.setTextColor(41, 128, 185);
    doc.text('Shipping Details', 20, 135);

    doc.setFontSize(12);
    doc.setTextColor(44, 62, 80);
    doc.text(`Name: ${shippingDetails?.fullName}`, 20, 150);
    doc.text(`Address: ${shippingDetails?.address}`, 20, 160);
    doc.text(`${shippingDetails?.city}, ${shippingDetails?.state} ${shippingDetails?.zipCode}`, 20, 170);
    doc.text(`Phone: ${shippingDetails?.phone}`, 20, 180);
    doc.text(`Email: ${shippingDetails?.email}`, 20, 190);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(127, 140, 141);
    doc.text('Thank you for your charity donation!', 105, 270, { align: 'center' });
    doc.text('This is an automatically generated receipt.', 105, 275, { align: 'center' });

    // Save the PDF
    doc.save(`charity-receipt-${orderNumber}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <span className="bg-green-100 text-green-800 text-xl font-semibold px-4 py-2 rounded-full">
                Donation Confirmed ✓
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank You!</h1>
            <p className="text-gray-600">Your charity donation request has been confirmed</p>
          </div>

          {/* Order Number */}
          <div className="bg-blue-50 rounded-lg p-4 mb-8 text-center">
            <p className="text-sm text-blue-600 font-medium">Order Number</p>
            <p className="text-lg font-bold text-blue-800">#{orderNumber}</p>
          </div>

          {/* Order Details */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">Item Details</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex gap-4">
                  <img
                    src={`http://localhost:8080/uploads/${charity?.image}`}
                    alt={charity?.name}
                    className="w-24 h-24 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/96?text=No+Image';
                    }}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{charity?.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{charity?.description}</p>
                    <div className="mt-2 flex gap-2">
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                        {charity?.ageGroup}
                      </span>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                        {charity?.quality}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">Shipping Details</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  <p className="font-semibold text-gray-800">{shippingDetails?.fullName}</p>
                  <p className="text-sm text-gray-600">{shippingDetails?.address}</p>
                  <p className="text-sm text-gray-600">
                    {shippingDetails?.city}, {shippingDetails?.state} {shippingDetails?.zipCode}
                  </p>
                  <p className="text-sm text-gray-600">{shippingDetails?.phone}</p>
                  <p className="text-sm text-gray-600">{shippingDetails?.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={generateReceipt}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
            >
              <span>Download Receipt</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => navigate('/charity')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Back to Charity List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityConfirmationPage; 