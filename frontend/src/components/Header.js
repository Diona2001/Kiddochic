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

  // Add categories array
  const categories = [
    '0-9 months',
    '3-24 months',
    '1-6 years',
    'Baby Essentials',
    'Toy and Gaming',
    'Footwear',
  ];

  const categoryMenus = {
    '0-9 months': {
      'Shop by Month': [
        'TINY BABY',
        '0-1 MONTHS',
        '1-3 MONTHS',
        '3-6 MONTHS',
        '6-9 MONTHS'
      ],
      'Shop by gender': [
        'Boys',
        'Girls',
        'Unisex'
      ],
      'Shop by type': [
        'JHABLAS',
        'BODY SUITS',
        'SLEEP SUITS',
        'ROMPERS',
        'DRESSES',
        'DRESS & BLOOMER SETS',
        'BODYSUIT & SHORTS SETS',
        'JHABALA & PANT SETS',
        'SHIRT & PANT SETS',
        'SHIRT & SHORTS SETS'
      ]
    },
    '3-24 months': {
      'Shop by Month': [
        '3-6 MONTHS',
        '6-9 MONTHS',
        '9-12 MONTHS',
        '12-18 MONTHS',
        '18-24 MONTHS'
      ],
      'Shop by gender': [
        'Boys',
        'Girls',
        'Unisex'
      ],
      'Shop by type': [
        'JHABLAS',
        'BODY SUITS',
        'SLEEP SUITS',
        'ROMPERS',
        'DRESSES',
        'DRESS & BLOOMER SETS',
        'BODYSUIT & SHORTS SETS',
        'JHABALA & PANT SETS',
        'SHIRT & PANT SETS',
        'SHIRT & SHORTS SETS'
      ]
    },
    '1-6 years': {
      'Shop by Age': [
        '1-2 YEARS',
        '2-3 YEARS',
        '3-4 YEARS',
        '4-5 YEARS',
        '5-6 YEARS'
      ],
      'Shop by gender': [
        'Boys',
        'Girls',
        'Unisex'
      ],
      'Shop by type': [
        'JHABLAS',
        'BODY SUITS',
        'SLEEP SUITS',
        'ROMPERS',
        'DRESSES',
        'DRESS & BLOOMER SETS',
        'BODYSUIT & SHORTS SETS',
        'JHABALA & PANT SETS',
        'SHIRT & PANT SETS',
        'SHIRT & SHORTS SETS'
      ]
    },
    'Baby Essentials': {
      'Baby Care': [
        'BABY WIPES',
        'COMBO PACKS',
        'CLEANSERS & DETERGENTS',
        'GIFTING',
        'TRAINING',
        'HEALTH & HYGIENE',
        'BABY ORAL CARE',
        'SOAPS , SHAMPOOS &BODY WASHES',
        'LOTIONS , OILS &POWDERS',
        'GARMENT ACCESSORIES'
      ],
      'Bedding & Feeding': [
        'BEDDING',
        'FEEDING'
      ],
      'Protection': [
        'FACE MASKS',
        'HAND GLOVES',
        'KNEE PADS',
        'MOSQUITO PROTECTION',
        'SAFETY KITS'
      ],
      'Diapers': [
        'BUTTON DIAPERS',
        'CLOTH NAPPIES',
        'DIAPER INSERTS',
        'DIAPER PADS',
        'DISPOSIBLE DIAPERS',
        'NAPPIES',
        'NAPPIES COMBOS',
        'DIAPER BAGS'
      ],
      'Bath & Grooming': [
        'BABY BATH TUBS',
        'BABY BATHERS',
        'BATH SEATS',
        'BATH TOWELS',
        'BATH TUBS',
        'BRUSH & COMB SETS',
        'COTTON BUDS',
        'GROOMING KITS',
        'MANICURE SETS',
        'NAIL CUTTERS',
        'POWDER PUFFS'
      ]
    },
    'Toy and Gaming': {
      'All Toys & Gaming': [
        'BOARD GAMES',
        'GIFTING',
        'GUNS & WEAPONS',
        'INDOOR & OUTDOOR PLAY EQUIPMENTS',
        'FIGURES & COLLECTIBLES',
        'PUSH AND PULL ALONG TOYS',
        'FREE WHEELING VEHICLES',
        'INFANT TOYS'
      ],
      'Educational & Creative': [
        'LEARNING TOYS',
        'PLAY GYMS & PLAY MATS',
        'ART CRAFT & HOBBY KITS',
        'BUBBLE TUBES',
        'CARD GAMES',
        'EASELS',
        'FUN DOUGHS',
        'GIFT SETS',
        'MUSICAL TOYS',
        'QUILLERS',
        'STAMP ARTS',
        'WINDOW ARTS'
      ],
      'Play Sets': [
        'CHEF SETS',
        'DOCTOR SETS',
        'FISHING SETS',
        'KITCHEN SETS',
        'MAKE UP SETS'
      ],
      'Bath Toys': [
        'BATH SETS',
        'FLOATING TOYS',
        'GIFT SETS'
      ],
      'Soft Toys': [
        'ANIMAL MODELS',
        'PILLOWS',
        'PUPPETS',
        'SOFT BALLS'
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
                    to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-700 hover:text-red-600 transition-colors duration-200 flex items-center gap-1"
                  >
                    {category}
                    <FaChevronDown className="text-xs" />
                  </Link>

                  {/* Dropdown Menu */}
                  {activeCategory === category && categoryMenus[category] && (
                    <div className="absolute top-full left-0 bg-white shadow-lg rounded-b-lg p-4 z-50 w-[800px] grid grid-cols-3 gap-6">
                      {Object.entries(categoryMenus[category]).map(([section, items]) => (
                        <div key={section} className="space-y-3">
                          <h3 className="font-semibold text-gray-900 border-b pb-2">{section}</h3>
                          <ul className="space-y-2">
                            {items.map((item) => (
                              <li key={item}>
                                <Link
                                  to={`/category/${category.toLowerCase()}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                  className="text-gray-600 hover:text-red-600 text-sm block"
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
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
