
import axios from 'axios';

// Define the base URL for the API
const BASE_URL = 'http://localhost:8080/api/users';

// Object containing API methods related to users
const userApi = {
  // Create a new user
  createUser: async (userData) => {
    try {
      const response = await axios.post(BASE_URL, userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Get all users
  getAllUsers: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }
  },

  // Update user by ID
  updateUser: async (id, userData) => {
    try {
      // If password is empty, remove it from the request to avoid changing it
      if (!userData.password) {
        delete userData.password;
      }
      
      const response = await axios.put(`${BASE_URL}/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
      throw error;
    }
  },

  // Delete user by ID
  deleteUser: async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      throw error;
    }
  }
};

export default userApi;
