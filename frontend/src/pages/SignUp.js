import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import the icons
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value }); // Update state for each form field

    // Validate fields on change
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value) {
          newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        } else {
          delete newErrors[name];
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          newErrors.email = 'Email is required';
        } else if (!emailRegex.test(value)) {
          newErrors.email = 'Invalid email format';
        } else {
          delete newErrors.email;
        }
        break;

      case 'password':
        if (value.length < 6) {
          newErrors.password = 'Password must be at least 6 characters long';
        } else {
          delete newErrors.password;
        }
        break;

      case 'confirmPassword':
        if (value !== data.password) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      case 'phoneNumber':
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!value) {
          newErrors.phoneNumber = 'Phone number is required';
        } else if (!phoneRegex.test(value)) {
          newErrors.phoneNumber = 'Phone number must start with 6, 7, 8, or 9 and have 10 digits';
        } else {
          delete newErrors.phoneNumber;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for errors before submitting
    if (Object.keys(errors).length > 0) {
      toast.error("Please correct the errors before submitting.");
      return;
    }

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
      }

      console.log('Form data:', dataApi);
    } else {
      console.log("Please check the password and confirm password");
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <section
      id="signup"
      style={{
        backgroundImage: `url('https://www.azafashions.com/blog/wp-content/uploads/2024/07/Festive-Kidswear.jpg')`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className='mx-auto container p-4'>
        <div className='bg-white p-6 w-full max-w-md mx-auto text-center font-serif italic text-2xl border border-gray-300 shadow-lg rounded-lg'>
          <div className='font-bold'>SIGN UP</div>
          <form onSubmit={handleSubmit}>
            <div className='mt-4'>
              <label className='block text-left mb-2'>First Name:</label>
              <input
                type='text'
                name='firstName'
                value={data.firstName}
                onChange={handleOnChange}
                placeholder='Enter your first name'
                className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500'
              />
              {errors.firstName && <p className='text-red-500 text-sm'>{errors.firstName}</p>}
            </div>

            <div className='mt-4'>
              <label className='block text-left mb-2'>Last Name:</label>
              <input
                type='text'
                name='lastName'
                value={data.lastName}
                onChange={handleOnChange}
                placeholder='Enter your last name'
                className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500'
              />
              {errors.lastName && <p className='text-red-500 text-sm'>{errors.lastName}</p>}
            </div>

            <div className='mt-4'>
              <label className='block text-left mb-2'>Email:</label>
              <input
                type='email'
                name='email'
                value={data.email}
                onChange={handleOnChange}
                placeholder='Enter your email'
                className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500'
              />
              {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
            </div>

            <div className='mt-4 relative'>
              <label className='block text-left mb-2'>Password:</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={data.password}
                onChange={handleOnChange}
                placeholder='Enter your password'
                className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500'
              />
              {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
              <div
                className='absolute inset-y-0 right-3 top-9 flex items-center cursor-pointer'
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <div className='mt-4 relative'>
              <label className='block text-left mb-2'>Confirm Password:</label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name='confirmPassword'
                value={data.confirmPassword}
                onChange={handleOnChange}
                placeholder='Confirm your password'
                className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500'
              />
              {errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword}</p>}
              <div
                className='absolute inset-y-0 right-3 top-9 flex items-center cursor-pointer'
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <div className='mt-4'>
              <label className='block text-left mb-2'>Phone Number:</label>
              <input
                type='tel'
                name='phoneNumber'
                value={data.phoneNumber}
                onChange={handleOnChange}
                placeholder='Enter your phone number'
                className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500'
              />
              {errors.phoneNumber && <p className='text-red-500 text-sm'>{errors.phoneNumber}</p>}
            </div>

            {/* Sign Up Button */}
            <div className='mt-6'>
              <button
                type='submit'
                className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300'
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Already have an account? Login link */}
          <p className='mt-4'>
            Already have an account?{' '}
            <Link to="/login" className='text-blue-500 hover:underline'>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
