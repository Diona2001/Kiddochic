import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import SummaryApi from '../common';

const Products = () => {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { url, method } = SummaryApi.getProductsByCategory(category, subcategory);
        const response = await fetch(url, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();

        if (response.ok && data.success) {
          setProducts(data.data);
        } else {
          setError(data.message || 'Failed to fetch products');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subcategory]);

  if (loading) {
    return <div className="text-center text-xl mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 mt-10">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2
        className="text-3xl font-bold mb-6 text-center"
        style={{
          color: '#333',
          textTransform: 'capitalize',
          letterSpacing: '1px',
          borderBottom: '2px solid #ddd',
          paddingBottom: '10px',
        }}
      >
        {category} {subcategory ? `- ${subcategory}` : ''}
      </h2>

      {products.length === 0 ? (
        <div
          className="text-center text-gray-600"
          style={{
            fontSize: '1.2rem',
            color: '#555',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
          }}
        >
          No products available in this category.
        </div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          style={{
            rowGap: '20px',
            padding: '10px',
          }}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
