
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from './api';

// Define the base URL for the API
const BASE_URL = `${API_BASE_URL}/artists`;

// Artist API service
const artistApi = {
  /**
   * Fetch all artists
   * @returns {Promise<Array>} - List of artists
   */
  getAllArtists: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching artists:', error);
      toast.error(`Failed to fetch artists: ${error.message}`);
      return [];
    }
  },

  /**
   * Fetch an artist by ID
   * @param {string} id - Artist ID
   * @returns {Promise<Object>} - Artist data
   */
  getArtistById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching artist:', error);
      toast.error(`Failed to fetch artist: ${error.message}`);
      return null;
    }
  },

  /**
   * Create a new artist
   * @param {Object} artistData - Artist data object
   * @returns {Promise<Object>} - Saved artist data
   */
  createArtist: async (artistData) => {
    try {
      const response = await axios.post(BASE_URL, artistData);
      toast.success('Artist created successfully');
      return response.data;
    } catch (error) {
      console.error('Error creating artist:', error);
      toast.error(`Failed to create artist: ${error.message}`);
      return null;
    }
  },

  /**
   * Delete an artist
   * @param {string} id - Artist ID to delete
   * @returns {Promise<boolean>} - Success status
   */
  deleteArtist: async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      toast.success('Artist deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting artist:', error);
      toast.error(`Failed to delete artist: ${error.message}`);
      return false;
    }
  }
};

// Export individual functions for direct imports
export const { getAllArtists, getArtistById, createArtist, deleteArtist } = artistApi;

// Also export the entire API object as default
export default artistApi;
