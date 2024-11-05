// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
  });

  
  const fetchUserDetails = async () => {
    if (!auth.token) return;

    try {
      const response = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        headers: {
          'Content-Type': 'application/json',
          ...(auth.token && { 'Authorization': `Bearer ${auth.token}` }),
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAuth((prev) => ({ ...prev, user: data.data }));
        localStorage.setItem('user', JSON.stringify(data.data));
      } else {
        toast.error(data.message || 'Failed to fetch user details');
        setAuth({ token: null, user: null });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      toast.error('An error occurred while fetching user details');
      setAuth({ token: null, user: null });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  // Fetch user details when token changes
  useEffect(() => {
    if (auth.token) {
      fetchUserDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.token]);

  // Function to handle login
  const login = (token, user) => {
    if (token) {
      localStorage.setItem('token', token);
    }
    localStorage.setItem('user', JSON.stringify(user));
    setAuth({ token, user });
  };

  // Function to handle logout
  const logout = async () => {
    try {
      // Prepare headers conditionally
      const headers = {
        ...(auth.token && { 'Authorization': `Bearer ${auth.token}` }),
      };

      const response = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: 'include',
        headers: headers,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message || 'Logged out successfully');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('An error occurred during logout');
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setAuth({ token: null, user: null });
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, fetchUserDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
