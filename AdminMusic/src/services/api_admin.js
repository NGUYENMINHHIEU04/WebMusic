
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Get all admins
export const getAllAdmins = async () => {
  try {
    const response = await apiClient.get('/admins');
    return response.data;
  } catch (error) {
    console.error('Error fetching admins:', error);
    throw error;
  }
};

// Get admin by ID
export const getAdminById = async (id) => {
  try {
    const response = await apiClient.get(`/admins/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching admin with ID ${id}:`, error);
    throw error;
  }
};

// Create a new admin
export const createAdmin = async (adminData) => {
  try {
    const response = await apiClient.post('/admins', adminData);
    return response.data;
  } catch (error) {
    console.error('Error creating admin:', error);
    throw error;
  }
};

// Update an admin
export const updateAdmin = async (id, adminData) => {
  try {
    const response = await apiClient.put(`/admins/${id}`, adminData);
    return response.data;
  } catch (error) {
    console.error(`Error updating admin with ID ${id}:`, error);
    throw error;
  }
};

// Delete an admin
export const deleteAdmin = async (id) => {
  try {
    await apiClient.delete(`/admins/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting admin with ID ${id}:`, error);
    throw error;
  }
};

// Login admin
export const loginAdmin = async (email, password) => {
  try {
    console.log('Attempting login with:', { email, password });
    
    // Call the new login endpoint
    const response = await apiClient.post('/admins/login', { email });
    console.log('Login response:', response.data);
    
    if (response.data.success) {
      const admin = response.data.admin;
      
      // Login is successful if:
      // 1. The entered password matches the stored password in the database (hashed or not)
      // 2. OR the entered password matches our test password
      const testPassword = "123456"; // Default test password for development
      
      if (admin.password === password || password === testPassword) {
        // Return admin data without the password for security
        const { password, ...adminData } = admin;
        console.log('Login successful for admin:', adminData);
        return adminData;
      }
      
      console.error('Invalid password for email:', email);
      throw new Error('Invalid credentials');
    } else {
      console.error('Login failed:', response.data.message);
      throw new Error(response.data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
