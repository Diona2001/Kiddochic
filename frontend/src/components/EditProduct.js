// src/components/EditProduct.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';

const EditProduct = () => {
  const { id } = useParams(); // Extract product ID from URL
  const navigate = useNavigate(); // For navigation after edit
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
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { url } = SummaryApi.getProductById(id);
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setProduct({
            name: data.data.name,
            category: data.data.category,
            subcategory: data.data.subcategory,
            description: data.data.description,
            originalPrice: data.data.originalPrice,
            discountPrice: data.data.discountPrice,
            discount: data.data.discount,
            stock: data.data.stock,
            imageUrl: data.data.imageUrl,
          });
        } else {
          alert(`Error fetching product: ${data.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error fetching product');
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { url, method } = SummaryApi.updateProduct(id);
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Product updated successfully!');
        navigate('/admin/product-list'); // Navigate back to product list
      } else {
        alert(`Error updating product: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating product');
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-5 border rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-5">Edit Product</h1>
      <form onSubmit={handleSubmit}>
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
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
