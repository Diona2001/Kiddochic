// src/components/Header.js
import React, { useContext, useState } from 'react';
import logoImg from '../assets/logo.svg'; // Ensure the path is correct
import { CiSearch } from "react-icons/ci";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context'; // Import AuthContext
import { ShoppingCartContext } from './ShoppingCartContext'; // Import ShoppingCartContext

const Header = () => {
  const { auth, logout } = useContext(AuthContext); // Consume AuthContext
  const { cartItems } = useContext(ShoppingCartContext); // Consume ShoppingCartContext
  const navigate = useNavigate();
  const [showUserInfo, setShowUserInfo] = useState(false); // Add this line

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    const { value } = e.target

    if(value){
      navigate(`/search?q=${ value }`)
    }else{
      navigate("/search")
    }
  };

  const handleCartClick = () => {
    navigate('/cart'); // Navigate to the cart page
  };

  return (
    <header className='h-16 shadow-md bg-white'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div>
          {/* Wrap the logo image inside a Link component */}
          <Link to="/">
            <img src={logoImg} alt="Logo" width={50} height={45} />
          </Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input 
            type='text' 
            placeholder='Search product here...' 
            className='w-full outline-none' onChange={handleSearch}
            aria-label='Search products'
          />
          <button 
            className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white' 
            aria-label='Search button'
          >
            <CiSearch />
          </button>
        </div>

        <div className='flex items-center gap-7'>
          {auth.user && (
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

<div className='text-2xl relative'>
            <span onClick={handleCartClick} className="cursor-pointer">
              <FaShoppingCart />
            </span>
            <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
              {/* Display cart count, defaulting to 0 */}
              <p className='text-sm'>{cartItems.length}</p>
            </div>
          </div>

          <div>
            {/* Show login or logout button based on user state */}
            {auth.user ? (
              <button 
                onClick={handleLogout} 
                className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-800'
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-800'>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
