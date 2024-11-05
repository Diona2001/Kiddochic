import React, { useEffect, useState } from 'react';
import SummaryApi from '../common'; // Ensure this file exports the necessary API endpoints

const ProductList = ({ onEdit }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products on component mount (active and inactive)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { url, method } = SummaryApi.getAllProducts;
        const response = await fetch(url, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();

        if (response.ok) {
          // Fetch all products (active and inactive)
          setProducts(data.data);
        } else {
          alert(`Error fetching products: ${data.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error fetching products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handler to delete a product
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const { url, method } = SummaryApi.deleteProduct(id);
        const response = await fetch(url, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (response.ok) {
          alert('Product deleted successfully!');
          setProducts(products.filter((product) => product._id !== id));
        } else {
          alert(`Error deleting product: ${data.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error deleting product');
      }
    }
  };

  // Handler to initiate editing a product
  const handleEditClick = (id) => {
    if (onEdit) {
      onEdit(id);
    }
  };

  // Handler to activate/deactivate a product
  const toggleActivation = async (id, isActive) => {
    try {
      const { url, method } = SummaryApi.toggleProductActivation(id, isActive);
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
      });
      
      const result = await response.json();
      if (response.ok) {
        // Update the local product list after activation/deactivation
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === id ? { ...product, status: isActive ? 'inactive' : 'active' } : product
          )
        );
        alert(result.message || 'Product status updated successfully!');
      } else {
        alert(`Error toggling product status: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error toggling product status:', error);
      alert('Error toggling product status');
    }
  };

  // Handler to show stock details on deactivation
  const showStockDetails = (product) => {
    alert(`Product: ${product.name}\nTotal Stock: ${product.stock}\nSold: ${product.sold}`);
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-semibold mb-3">Product List</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Subcategory</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Discount (%)</th>
              <th className="border border-gray-300 px-4 py-2">Stock</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                <td className="border border-gray-300 px-4 py-2">{product.category}</td>
                <td className="border border-gray-300 px-4 py-2">{product.subcategory}</td>
                <td className="border border-gray-300 px-4 py-2">${product.discountPrice.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2">{product.discount}%</td>
                <td className="border border-gray-300 px-4 py-2">{product.stock}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {/* Display product status */}
                  <span className={product.status === 'active' ? 'text-green-600' : 'text-red-600'}>
                    {product.status}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleEditClick(product._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                  <button
                    className={`px-2 py-1 rounded ${product.status === 'active' ? 'bg-green-500' : 'bg-gray-500'} text-white`}
                    onClick={() => {
                      if (product.status === 'active') {
                        showStockDetails(product); // Show stock details on deactivation
                      }
                      toggleActivation(product._id, product.status === 'active');
                    }}
                  >
                    {product.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
