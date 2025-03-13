import React, { useContext, useState } from 'react';
import logoImg from '../assets/logo.svg'; // Ensure the path is correct
import { CiSearch } from "react-icons/ci";
import { FaUserCircle, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context'; // Import AuthContext
import { ShoppingCartContext } from './ShoppingCartContext'; // Import ShoppingCartContext

const Header = () => {
  const { auth, logout } = useContext(AuthContext); // Consume AuthContext
  const { cartItems, clearCart } = useContext(ShoppingCartContext); // Consume ShoppingCartContext and add clearCart
  const navigate = useNavigate();
  const location = useLocation();
  const isSellerPage = location.pathname === '/become-seller';
  const [showUserInfo, setShowUserInfo] = useState(false); // Add this line
  const [activeCategory, setActiveCategory] = useState(null);

  // Update categories array to include Maternity Wear and Moments
  const categories = [
    'Maternity Wear',
    'Moments'
  ];

  // Update categoryMenus if needed
  const categoryMenus = {
    'Maternity Wear': {
      'Maternity Essentials': [
        {
          name: 'EXPLORE MATERNITY',
          path: '/maternity'
        }
      ]
    },
    'Moments': {
      'Moments Collection': [
        {
          name: 'EXPLORE MOMENTS',
          path: '/moments'
        }
      ]
    }
  };

  const handleLogout = async () => {
    await clearCart(); // Clear cart in backend and local state
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    const { value } = e.target;

    if(value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  const handleCartClick = () => {
    navigate('/cart'); // Navigate to the cart page
  };

  // Calculate the total number of items in the cart
  const cartCount = cartItems?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;

  return (
    <>
      <header className={`${isSellerPage ? 'fixed top-0 left-0 right-0 z-50' : ''} bg-white`}>
        {/* Announcement Bar */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2">
          <div className="container mx-auto text-center text-sm font-medium">
            Free Shipping on Orders Over $50 | Use Code: WELCOME20
          </div>
        </div>

        <div className='h-20 shadow-sm bg-white/80 backdrop-blur-md'>
          <div className='h-full container mx-auto flex items-center px-4 justify-between'>
            {/* Logo Section */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <img src={logoImg} alt="Logo" className="h-12 w-auto transform hover:scale-105 transition-transform duration-200" />
              </Link>
            </div>

            {/* Search Section */}
            <div className='hidden lg:flex items-center gap-4 w-full justify-between max-w-xl'>
              <div className='flex items-center w-full bg-gray-50 border rounded-full hover:shadow-md transition-all duration-300 focus-within:shadow-lg focus-within:border-purple-300'>
                <input 
                  type='text' 
                  placeholder='Search product here...' 
                  className='w-full px-4 py-2.5 bg-transparent outline-none rounded-l-full' 
                  onChange={handleSearch}
                  aria-label='Search products'
                />
                <button 
                  className='px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-r-full hover:shadow-lg transition-all duration-300 flex items-center justify-center' 
                  aria-label='Search button'
                >
                  <CiSearch className="text-xl" />
                </button>
              </div>
            </div>

            {/* Actions Section */}
            <div className='flex items-center gap-6'>
              {/* Show different buttons based on page */}
              <div className='hidden lg:flex items-center gap-4'>
                {!isSellerPage ? (
                  <>
                    <Link 
                      to="/become-seller" 
                      className='whitespace-nowrap px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg rounded-full font-medium transition-all duration-300'
                    >
                      Become a Seller
                    </Link>

                    <Link 
                      to="/charity" 
                      className='whitespace-nowrap px-4 py-2 border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white rounded-full font-medium transition-all duration-300'
                    >
                      Charity
                    </Link>
                  </>
                ) : (
                  <button 
                    type="submit"
                    className='whitespace-nowrap px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg rounded-full font-medium transition-all duration-300'
                  >
                    Start Selling
                  </button>
                )}
              </div>

              {/* Profile Section */}
              {auth.user ? (
                <div 
                  className='relative group'
                  onMouseEnter={() => setShowUserInfo(true)} 
                  onMouseLeave={() => setShowUserInfo(false)}
                >
                  <div className="flex items-center gap-2 cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all duration-300">
                      {auth.user.firstName?.charAt(0).toUpperCase()}
                    </div>
                    <FaChevronDown className="text-gray-600 group-hover:text-purple-500 transition-colors duration-300" />
                  </div>
                  
                  {showUserInfo && (
                    <div className='absolute top-12 right-0 bg-white rounded-xl shadow-xl w-72 py-3 z-50 transform transition-all duration-300 ease-in-out border border-gray-100'>
                      <div className='px-6 py-4 border-b border-gray-100'>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-semibold shadow-md">
                            {auth.user.firstName?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className='font-semibold text-gray-800'>{auth.user.firstName} {auth.user.lastName}</p>
                            <p className='text-sm text-gray-500'>{auth.user.email}</p>
                          </div>
                        </div>
                      </div>

                      <div className='px-2 py-2'>
                        <Link 
                          to="/orders" 
                          className='flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors duration-200'
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          <span>My Orders</span>
                        </Link>

                        <Link 
                          to="/profile" 
                          className='flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors duration-200'
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>Profile Settings</span>
                        </Link>

                        <button 
                          onClick={handleLogout}
                          className='w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 rounded-lg transition-colors duration-200'
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span className="text-red-600">Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className='px-4 py-2 rounded-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg transition-all duration-300 flex items-center gap-2'
                >
                  <FaUserCircle />
                  <span>Login</span>
                </Link>
              )}

              {/* Cart Icon */}
              {!isSellerPage && (
                <div className='text-2xl relative'>
                  <span onClick={handleCartClick} className="cursor-pointer text-gray-700 hover:text-purple-500 transition-colors duration-300">
                    <FaShoppingCart />
                  </span>
                  <div className='bg-gradient-to-r from-purple-500 to-pink-500 text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3 text-xs font-medium shadow-md'>
                    {cartCount}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Categories Navigation */}
        {!isSellerPage && (
          <nav className="bg-white border-t border-gray-100 shadow-sm">
            <div className="container mx-auto px-4">
              <ul className="flex items-center justify-center space-x-8 py-3">
                {categories.map((category) => (
                  <li key={category} 
                      className="relative group"
                      onMouseEnter={() => setActiveCategory(category)}
                      onMouseLeave={() => setActiveCategory(null)}
                  >
                    <Link
                      to={category === 'Maternity Wear' ? '/maternity' : '/moments'}
                      className="text-gray-600 hover:text-purple-600 transition-colors duration-200 flex items-center gap-1 font-medium"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}
      </header>
      
      {isSellerPage && <div className="h-16"></div>}
    </>
  );
};

export default Header;
