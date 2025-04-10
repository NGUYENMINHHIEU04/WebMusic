
import axios from 'axios';
import { toast } from 'react-toastify';

// Define the base URL for the API
const BASE_URL = 'http://localhost:8080/api/playlistCards';

// Playlist Card API service
const playlistCardApi = {
  /**
   * Fetch a playlist by its ID
   * @param {string} id - The playlist ID
   * @returns {Promise<Object>} - The playlist object
   */
  getPlaylist: async (id) => {
    try {
      console.log(`Fetching playlist with ID: ${id}`);
      const response = await axios.get(`${BASE_URL}/${id}`);
      console.log('Playlist API response:', response);
      
      // Handle different response formats
      if (response.data && response.data.data) {
        return response.data.data;
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching playlist:', error);
      toast.error(`Failed to fetch playlist: ${error.message}`);
      return null;
    }
  },

  /**
   * Create a new playlist
   * @param {Object} playlistData - The playlist data
   * @returns {Promise<string>} - The ID of the created playlist
   */
  createPlaylist: async (playlistData) => {
    try {
      console.log('Creating playlist with data:', playlistData);
      const response = await axios.post(BASE_URL, playlistData);
      console.log('Create playlist response:', response);
      
      toast.success('Album created successfully');
      // Return the playlist ID from the response
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error creating playlist:', error);
      toast.error(`Failed to create album: ${error.message}`);
      return null;
    }
  },

  /**
   * Update an existing playlist
   * @param {string} id - The ID of the playlist to update
   * @param {Object} playlistData - The new playlist data
   * @returns {Promise<boolean>} - Whether the update was successful
   */
  updatePlaylist: async (id, playlistData) => {
    try {
      console.log(`Updating playlist ${id} with data:`, playlistData);
      const response = await axios.put(`${BASE_URL}/${id}`, playlistData);
      console.log('Update playlist response:', response);
      
      toast.success('Album updated successfully');
      return response.data.data || response.data || true;
    } catch (error) {
      console.error('Error updating playlist:', error);
      toast.error(`Failed to update album: ${error.message}`);
      return false;
    }
  },

  /**
   * Delete a playlist by its ID
   * @param {string} id - The ID of the playlist to delete
   * @returns {Promise<boolean>} - Whether the deletion was successful
   */
  deletePlaylist: async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      toast.success('Album deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting playlist:', error);
      toast.error(`Failed to delete album: ${error.message}`);
      return false;
    }
  },

  /**
   * Fetch all playlists
   * @returns {Promise<Array>} - An array of playlist objects
   */
  getAllPlaylists: async () => {
    try {
      const response = await axios.get(BASE_URL);
      console.log("Raw albums response:", response);
      
      // Handle different response formats
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        return response.data.data;
      } else if (response.data && Array.isArray(response.data)) {
        return response.data;
      } else {
        console.warn("Unexpected response format from album API, returning empty array");
        return [];
      }
    } catch (error) {
      console.error('Error fetching albums:', error);
      toast.error(`Failed to fetch albums: ${error.message}`);
      return [];
    }
  }
};

// Export individual functions for direct import
export const getPlaylist = playlistCardApi.getPlaylist;
export const createPlaylist = playlistCardApi.createPlaylist;
export const updatePlaylist = playlistCardApi.updatePlaylist;
export const deletePlaylist = playlistCardApi.deletePlaylist;
export const getAllPlaylists = playlistCardApi.getAllPlaylists;

// Export the whole API object as default
export default playlistCardApi;
