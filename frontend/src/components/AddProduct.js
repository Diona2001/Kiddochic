import React, { useState } from 'react';
import SummaryApi from '../common';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    subcategory: '',
    description: '',
    originalPrice: '',
    discountPrice: '',
    discount: '',
    stock: '',
    imageUrl: '',
    status: 'active', // default to active
    age: '',
    color: '',
    style: '',
    fabric: '',
    sleeveLength: '',
    neckline: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.addProduct.url, {
        method: SummaryApi.addProduct.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Product added successfully!');
        setProduct({
          name: '',
          category: '',
          subcategory: '',
          description: '',
          originalPrice: '',
          discountPrice: '',
          discount: '',
          stock: '',
          imageUrl: '',
          status: 'active',
          age: '',
          color: '',
          style: '',
          fabric: '',
          sleeveLength: '',
          neckline: ''
        });
      } else {
        alert(`Error adding product: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded shadow">
      <h2 className="text-xl font-semibold mb-3">Add New Product</h2>
      <input
        className="block border border-gray-300 p-2 mb-4 w-full"
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        required
      />
      <input
        className="block border border-gray-300 p-2 mb-4 w-full"
        type="text"
        name="category"
        placeholder="Category"
        value={product.category}
        onChange={handleChange}
        required
      />
      <input
        className="block border border-gray-300 p-2 mb-4 w-full"
        type="text"
        name="subcategory"
        placeholder="Subcategory"
        value={product.subcategory}
        onChange={handleChange}
        required
      />
      <textarea
        className="block border border-gray-300 p-2 mb-4 w-full"
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        required
      />
      <input
        className="block border border-gray-300 p-2 mb-4 w-full"
        type="number"
        name="originalPrice"
        placeholder="Original Price"
        value={product.originalPrice}
        onChange={handleChange}
        required
        min="0"
        step="0.01"
      />
      <input
        className="block border border-gray-300 p-2 mb-4 w-full"
        type="number"
        name="discountPrice"
        placeholder="Discount Price"
        value={product.discountPrice}
        onChange={handleChange}
        required
        min="0"
        step="0.01"
      />
      <input
        className="block border border-gray-300 p-2 mb-4 w-full"
        type="number"
        name="discount"
        placeholder="Discount (%)"
        value={product.discount}
        onChange={handleChange}
        required
        min="0"
        max="100"
        step="0.01"
      />
      <input
        className="block border border-gray-300 p-2 mb-4 w-full"
        type="number"
        name="stock"
        placeholder="Stock"
        value={product.stock}
        onChange={handleChange}
        required
        min="0"
      />
      <input
        className="block border border-gray-300 p-2 mb-4 w-full"
        type="url"
        name="imageUrl"
        placeholder="Image URL"
        value={product.imageUrl}
        onChange={handleChange}
        required
      />
      
      {/* Additional Fields */}
      <input
        className="block border border-gray-300 p-2 mb-4 w-full"
        type="text"
        name="age"
        placeholder="Age"
        value={product.age}
        onChange={handleChange}
      />
      <input
        className="block border border-gray-300 p-2 mb-4 w-full"
        type="text"
        name="color"
        placeholder="Color"
        value={product.color}
        onChange={handleChange}
      />
      <input
        className="block border border-gray-300 p-2 mb-4 w-full"
        type="text"
        name="style"
        placeholder="Style"
        value={product.style}
        onChange={handleChange}
      />
      <input
        className="block border border-gray-300 p-2 mb-4 w-full"
        type="text"
        name="fabric"
        placeholder="Fabric"
        value={product.fabric}
        onChange={handleChange}
      />
      <input
        className="block border border-gray-300 p-2 mb-4 w-full"
        type="text"
        name="sleeveLength"
        placeholder="Sleeve Length"
        value={product.sleeveLength}
        onChange={handleChange}
      />
      <input
        className="block border border-gray-300 p-2 mb-4 w-full"
        type="text"
        name="neckline"
        placeholder="Neckline"
        value={product.neckline}
        onChange={handleChange}
      />

      {/* Status Dropdown */}
      <select
        className="block border border-gray-300 p-2 mb-4 w-full"
        name="status"
        value={product.status}
        onChange={handleChange}
        required
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        type="submit"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
