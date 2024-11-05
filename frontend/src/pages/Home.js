import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import kidsImage from '../assets/kids.jpg'; // Import the image

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/categories');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data.data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  const handleCategoryClick = (category, subcategory) => {
    navigate(`/products/${category}/${subcategory}`);
  };

  const boysCategories = categories.filter((category) => category.gender === 'Boy');
  const girlsCategories = categories.filter((category) => category.gender === 'Girl');
  const occasionCategories = categories.filter((category) => category.gender === 'Unisex');

  return (
    <div style={{
      backgroundImage: `url('https://img.freepik.com/free-vector/pastel-color-watercolor-stain-background_52683-12283.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      padding: '20px'
    }}>
      {/* Hero Section with Image */}
      <div style={{
        position: 'relative',
        height: '700px',
        marginBottom: '40px',
        backgroundImage: `url(${kidsImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '10px',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.2)', // Slightly reduced opacity
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Increased opacity for stronger contrast
            padding: '40px', // Increased padding
            borderRadius: '15px', // Slightly increased border radius
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), 0 6px 12px rgba(0, 0, 0, 0.22)', // Enhanced shadow
            maxWidth: '600px',
            textAlign: 'center'
          }}>
            <h1 style={{ 
              fontSize: '3.5rem', // Slightly increased font size
              marginBottom: '20px',
              color: '#333', // Dark text color for contrast
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)' // Subtle text shadow
            }}>Welcome to KiddoChic</h1>
            <p style={{ 
              fontSize: '1.3rem', // Slightly increased font size
              color: '#555', // Slightly lighter text color for the description
              lineHeight: '1.6' // Improved line height for readability
            }}>
              Discover the perfect blend of style and comfort for your little ones. 
              From playful everyday wear to adorable occasion outfits, we've got everything to make your kids shine!
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-6" style={{ color: '#333' }}>Categories</h2>

      {/* Boys Wardrobe Section */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-4" style={{ color: '#333' }}>Boys' Wardrobe</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {boysCategories.map((category) => (
            <div
              key={category._id}
              onClick={() => handleCategoryClick('Boys', category.name)}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
              style={{ width: '150px', height: '200px' }}
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <h4 className="text-sm font-semibold text-center p-2" style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{category.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Girls Wardrobe Section */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-4" style={{ color: '#333' }}>Girls' Wardrobe</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {girlsCategories.map((category) => (
            <div
              key={category._id}
              onClick={() => handleCategoryClick('Girls', category.name)}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
              style={{ width: '150px', height: '200px' }}
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <h4 className="text-sm font-semibold text-center p-2" style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{category.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Occasions Section */}
      <section>
        <h3 className="text-xl font-semibold mb-4" style={{ color: '#333' }}>Shop for Occasions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {occasionCategories.map((category) => (
            <div
              key={category._id}
              onClick={() => handleCategoryClick('Unisex', category.name)}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
              style={{ width: '150px', height: '200px' }}
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <h4 className="text-sm font-semibold text-center p-2" style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{category.name}</h4>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
