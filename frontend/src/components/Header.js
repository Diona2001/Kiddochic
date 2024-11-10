import React, { useContext, useState } from 'react';
import logoImg from '../assets/logo.svg';
import { CiSearch } from "react-icons/ci";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context';
import { ShoppingCartContext } from './ShoppingCartContext';

const Header = () => {
  const { auth, logout } = useContext(AuthContext);
  const { cartItems, clearCart } = useContext(ShoppingCartContext); // Use clearCart from ShoppingCartContext
  const navigate = useNavigate();
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logout();
    clearCart();  // Clear the cart items on logout
    navigate('/login');
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <header className='h-16 shadow-md bg-white'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div>
          <Link to="/">
            <img src={logoImg} alt="Logo" width={50} height={45} />
          </Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input 
            type='text' 
            placeholder='Search product here...' 
            className='w-full outline-none'
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleSearch}
            aria-label='Search products'
          />
          <button 
            className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white' 
            aria-label='Search button'
            onClick={() => searchTerm.trim() && navigate(`/search?q=${searchTerm}`)}
          >
            <CiSearch />
          </button>
        </div>

        <div className='flex items-center gap-7'>
          {auth.user ? (
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
          ) : null}

          <div className='text-2xl relative'>
            <span onClick={handleCartClick} className="cursor-pointer">
              <FaShoppingCart />
            </span>
            {cartCount > 0 && (
              <div className='bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
                <p className='text-sm'>{cartCount}</p>
              </div>
            )}
          </div>

          <div>
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
