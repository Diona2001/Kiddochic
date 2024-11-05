import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context'; // Import AuthContext

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle input change
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Admin check logic
      if (data.email === 'admin@gmail.com' && data.password === 'admin1234') {
        toast.success('Admin login successful!');
        // Navigate to admin dashboard
        navigate('/admin-dashboard');
        return;
      }

      // Proceed with regular login
      const response = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data), 
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        localStorage.setItem('token', result.token);
        // Navigate to home page
        navigate('/');
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error('An error occurred while logging in.');
      console.error(err);
    }
  };

  return (
    <section
      id="login"
      style={{
        backgroundImage: `url('http://www.westside.com/cdn/shop/articles/summer_kidswear_by_westside.jpg?v=1652442923')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="mx-auto container p-4">
        <div className="bg-white p-6 w-full max-w-md mx-auto text-center font-serif italic text-2xl border border-gray-300 shadow-lg rounded-lg">
          <div className="font-bold">LOGIN</div>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block text-left mb-2">Email:</label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                placeholder="Enter your email"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                required
              />
            </div>

            <div className="mt-4 relative">
              <label className="block text-left mb-2">Password:</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={data.password}
                onChange={handleOnChange}
                placeholder="Enter your password"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                required
              />
              <div
                className="absolute inset-y-0 right-3 top-9 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {/* Login Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
              >
                Login
              </button>
            </div>
          </form>

          {/* Don't have an account? Signup link */}
          <p className="mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
