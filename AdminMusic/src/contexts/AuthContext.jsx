
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if admin is already logged in on initial load
  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (adminData) => {
    setAdmin(adminData);
    localStorage.setItem('admin', JSON.stringify(adminData));
    toast.success('Logged in successfully');
    navigate('/admin-panel');
  };

  // Logout function
  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
    toast.info('Logged out');
    navigate('/admin-login');
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!admin;
  };

  const value = {
    admin,
    login,
    logout,
    isAuthenticated,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
