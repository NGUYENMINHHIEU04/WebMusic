
import axios from 'axios';
import { toast } from 'react-toastify';

// Define the base URL for the API
const BASE_URL = `${API_BASE_URL}/songs`;

// Song API service
const songApi = {
  /**
   * Create a new song
   * @param {Object} song - Song data object with title, artistIds, idAudio, idImage, category, lyrics
   * @returns {Promise<Object>} - The created song
   */
  createSong: async (song) => {
    try {
      const response = await axios.post(BASE_URL, song);
      
      if (response.data && response.data.status === 200) {
        toast.success('Song created successfully');
        return response.data.data;
      } else {
        throw new Error(response.data?.message || 'Failed to create song');
      }
    } catch (error) {
      console.error('Error creating song:', error);
      toast.error(`Failed to create song: ${error.response?.data?.message || error.message}`);
      throw error;
    }
  },

  /**
   * Get all songs
   * @returns {Promise<Array>} - Array of songs
   */
  getAllSongs: async () => {
    try {
      const response = await axios.get(BASE_URL);
      
      if (response.data && response.data.status === 200) {
        return response.data.data;
      } else {
        throw new Error(response.data?.message || 'Failed to fetch songs');
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
      toast.error(`Failed to fetch songs: ${error.response?.data?.message || error.message}`);
      throw error;
    }
  },

  /**
   * Get a song by ID
   * @param {string} id - Song ID
   * @returns {Promise<Object>} - Song data
   */
  getSongById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      
      if (response.data && response.data.status === 200) {
        return response.data.data;
      } else {
        throw new Error(response.data?.message || 'Failed to fetch song');
      }
    } catch (error) {
      console.error(`Error fetching song with ID ${id}:`, error);
      toast.error(`Failed to fetch song: ${error.response?.data?.message || error.message}`);
      throw error;
    }
  },

  /**
   * Update a song
   * @param {string} id - Song ID
   * @param {Object} song - Updated song data
   * @returns {Promise<Object>} - Updated song
   */
  updateSong: async (id, song) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, song);
      
      if (response.data && response.data.status === 200) {
        toast.success('Song updated successfully');
        return response.data.data;
      } else {
        throw new Error(response.data?.message || 'Failed to update song');
      }
    } catch (error) {
      console.error(`Error updating song with ID ${id}:`, error);
      toast.error(`Failed to update song: ${error.response?.data?.message || error.message}`);
      throw error;
    }
  },

  /**
   * Delete a song
   * @param {string} id - Song ID
   * @returns {Promise<boolean>} - Whether the deletion was successful
   */
  deleteSong: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      
      if (response.data && response.data.status === 200) {
        toast.success('Song deleted successfully');
        return true;
      } else {
        throw new Error(response.data?.message || 'Failed to delete song');
      }
    } catch (error) {
      console.error(`Error deleting song with ID ${id}:`, error);
      toast.error(`Failed to delete song: ${error.response?.data?.message || error.message}`);
      return false;
    }
  },

  /**
   * Get the audio data for a song
   * @param {string} id - Song ID
   * @returns {Promise<Object>} - Audio data including Base64 encoded audio
   */
  getSongAudio: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}/audios`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching audio for song with ID ${id}:`, error);
      toast.error(`Failed to fetch audio: ${error.response?.data?.message || error.message}`);
      throw error;
    }
  },

  /**
   * Get audio URL for a song (for direct audio element use)
   * @param {string} id - Song ID
   * @returns {string} - Audio URL
   */
  getSongAudioUrl: (id) => {
    return `${BASE_URL}/${id}/audios`;
  }
};

// Export individual functions for direct import
export const createSong = songApi.createSong;
export const getAllSongs = songApi.getAllSongs;
export const getSongById = songApi.getSongById;
export const updateSong = songApi.updateSong;
export const deleteSong = songApi.deleteSong;
export const getSongAudio = songApi.getSongAudio;
export const getSongAudioUrl = songApi.getSongAudioUrl;

// Export the whole API object as default
export default songApi;
