// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import AddProduct from '../components/AddProduct';
import ProductList from '../components/ProductList';
import EditProduct from '../components/EditProduct';

const AdminDashboard = () => {
  const [view, setView] = useState('list'); // 'add', 'list', 'edit'
  const [editProductId, setEditProductId] = useState(null); // ID of the product to edit

  // Handler to switch to Edit view
  const handleEdit = (productId) => {
    setEditProductId(productId);
    setView('edit');
  };

  // Handler to switch back to List view from Edit view
  const handleBackToList = () => {
    setEditProductId(null);
    setView('list');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-2xl font-bold mb-5">Admin Dashboard</h1>
      <div className="mb-5">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => setView('add')}
        >
          Add Product
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setView('list')}
        >
          View Products
        </button>
      </div>
      {/* Conditional Rendering Based on Current View */}
      {view === 'add' && <AddProduct />}
      {view === 'list' && <ProductList onEdit={handleEdit} />}
      {view === 'edit' && editProductId && (
        <div>
          <button
            className="bg-gray-500 text-white px-3 py-1 rounded mb-3"
            onClick={handleBackToList}
          >
            Back to Product List
          </button>
          <EditProduct productId={editProductId} />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
