import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SummaryApi from '../common';

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]); // State to hold the product data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Extract the search query from the URL
  const searchQuery = new URLSearchParams(query.search).get('q');

  const fetchProducts = async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const response = await fetch(SummaryApi.searchProduct.url + '?q=' + searchQuery);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const dataResponse = await response.json();
      setData(dataResponse.data);
    } catch (err) {
      setError(err.message); // Set error message if fetch fails
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchProducts();
    }
  }, [searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}

      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((product) => (
            <div key={product._id} className="border rounded-lg shadow-lg p-4">
              <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded" />
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-gray-900 font-bold mt-2">
                Price: ${product.discountPrice} <span className="line-through text-gray-500">${product.originalPrice}</span>
              </p>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        !loading && <div className="text-center">No products found for "{searchQuery}"</div>
      )}
    </div>
  );
};

export default SearchProduct;
