import axios from 'axios';
import { API_BASE_URL } from './api';

const BASE_URL = `${API_BASE_URL}/admins`;

const adminApi = {
  getAllAdmins: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching admins:', error);
      throw error;
    }
  },

  getAdminById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching admin by ID:', error);
      throw error;
    }
  },

  createAdmin: async (admin) => {
    try {
      const response = await axios.post(BASE_URL, admin);
      return response.data;
    } catch (error) {
      console.error('Error creating admin:', error);
      throw error;
    }
  },

  updateAdmin: async (id, admin) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, admin);
      return response.data;
    } catch (error) {
      console.error('Error updating admin:', error);
      throw error;
    }
  },

  deleteAdmin: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting admin:', error);
      throw error;
    }
  },

  loginAdmin: async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}`, { email, password });
      console.log('Login response:', response.data); // Debugging
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error.response?.data || { success: false, message: 'Login failed' };
    }
  },

  checkAuthStatus: () => {
    const admin = JSON.parse(localStorage.getItem('admin') || 'null');
    const token = localStorage.getItem('admin_token');
    return { isAuthenticated: !!token, admin };
  },

  logoutAdmin: () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('admin_token');
  }
};

export default adminApi;