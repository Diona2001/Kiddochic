import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../../common/index';

const SupplierDashboard = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    category: '',
    subcategory: '',
    stock: '',
    image: null
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setProductData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.keys(productData).forEach(key => {
        formData.append(key, productData[key]);
      });

      const response = await fetch(SummaryApi.addProduct.url, {
        method: SummaryApi.addProduct.method,
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Product added successfully!');
        // Reset form
        setProductData({
          name: '',
          description: '',
          price: '',
          discount: '',
          category: '',
          subcategory: '',
          stock: '',
          image: null
        });
      } else {
        toast.error(data.message || 'Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error adding product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Hi, {localStorage.getItem('businessName')}</h1>
        <button
          onClick={() => {/* Add logout logic */}}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Add Product Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Product Name*</label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-1">Price*</label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Discount */}
            <div>
              <label className="block text-sm font-medium mb-1">Discount (%)</label>
              <input
                type="number"
                name="discount"
                value={productData.discount}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium mb-1">Stock*</label>
              <input
                type="number"
                name="stock"
                value={productData.stock}
                onChange={handleChange}
                required
                min="0"
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1">Category*</label>
              <input
                type="text"
                name="category"
                value={productData.category}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Subcategory */}
            <div>
              <label className="block text-sm font-medium mb-1">Subcategory*</label>
              <input
                type="text"
                name="subcategory"
                value={productData.subcategory}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description*</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Product Image*</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              required
              accept="image/*"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors
              ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupplierDashboard; 