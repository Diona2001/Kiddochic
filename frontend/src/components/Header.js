import React, { useContext, useState } from 'react';
import logoImg from '../assets/logo.svg'; // Ensure the path is correct
import { CiSearch } from "react-icons/ci";
import { FaUserCircle, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context'; // Import AuthContext
import { ShoppingCartContext } from './ShoppingCartContext'; // Import ShoppingCartContext

const Header = () => {
  const { auth, logout } = useContext(AuthContext); // Consume AuthContext
  const { cartItems } = useContext(ShoppingCartContext); // Consume ShoppingCartContext
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

  const handleLogout = () => {
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
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <>
      <header className={`${isSellerPage ? 'fixed top-0 left-0 right-0 z-50' : ''} h-16 shadow-md bg-white`}>
        <div className='h-full container mx-auto flex items-center px-4 justify-between'>
          <div>
            {/* Wrap the logo image inside a Link component */}
            <Link to="/">
              <img src={logoImg} alt="Logo" width={50} height={45} />
            </Link>
          </div>

          <div className='hidden lg:flex items-center gap-4 w-full justify-between max-w-xl'>
            <div className='flex items-center w-full border rounded-full focus-within:shadow pl-2'>
              <input 
                type='text' 
                placeholder='Search product here...' 
                className='w-full outline-none' 
                onChange={handleSearch}
                aria-label='Search products'
              />
              <button 
                className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white' 
                aria-label='Search button'
              >
                <CiSearch />
              </button>
            </div>
            
            {/* Show different buttons based on page */}
            <div className='flex items-center gap-4'>
              {!isSellerPage ? (
                <>
                  <Link 
                    to="/become-seller" 
                    className='whitespace-nowrap px-4 py-1.5 bg-red-600 text-white hover:bg-red-700 rounded-full font-medium transition-all duration-200 shadow-sm hover:shadow-md'
                  >
                    Become a Seller
                  </Link>

                  <Link 
                    to="/charity" 
                    className='whitespace-nowrap px-4 py-1.5 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-full font-medium transition-all duration-200'
                  >
                    Charity
                  </Link>
                </>
              ) : (
                <button 
                  type="submit"
                  className='whitespace-nowrap px-6 py-2 bg-red-600 text-white hover:bg-red-700 rounded-full font-medium transition-all duration-200 shadow-sm hover:shadow-md'
                >
                  Start Selling
                </button>
              )}
            </div>
          </div>

          <div className='flex items-center gap-7'>
            {/* Only show user icon when not on seller page */}
            {auth.user && !isSellerPage && (
              <div 
                className='text-3xl cursor-pointer relative' 
                onMouseEnter={() => setShowUserInfo(true)} 
                onMouseLeave={() => setShowUserInfo(false)}
              >
                <FaUserCircle />
                
                {showUserInfo && (
                  <div className='absolute top-10 right-0 bg-white shadow-md p-4 rounded'>
                    <p>Welcome, {auth.user.firstName}</p>
                    <p>{auth.user.email}</p>
                  </div>
                )}
              </div>
            )}

            {/* Only show cart when not on seller page */}
            {!isSellerPage && (
              <div className='text-2xl relative'>
                <span onClick={handleCartClick} className="cursor-pointer">
                  <FaShoppingCart />
                </span>
                <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                  <p className='text-sm'>{cartCount}</p>
                </div>
              </div>
            )}

            {/* Only show login/logout when not on seller page */}
            {!isSellerPage && (
              <div className='flex items-center gap-2'>
                <Link to="/login" className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-800'>
                  Login
                </Link>
                
                {auth.user && (
                  <button 
                    onClick={handleLogout} 
                    className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-800'
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Only show categories nav when NOT on seller page */}
      {!isSellerPage && (
        <nav className="bg-gray-100 shadow-sm relative">
          <div className="container mx-auto px-4">
            <ul className="flex items-center justify-center space-x-8 py-3">
              {categories.map((category) => (
                <li key={category} 
                    className="relative"
                    onMouseEnter={() => setActiveCategory(category)}
                    onMouseLeave={() => setActiveCategory(null)}
                >
                  <Link
                    to={category === 'Maternity Wear' ? '/maternity' : '/moments'}
                    className="text-gray-700 hover:text-red-600 transition-colors duration-200 flex items-center gap-1"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
      
      {/* Add spacing only when header is fixed and categories are hidden */}
      {isSellerPage && <div className="h-16"></div>}
    </>
  );
};

export default Header;
