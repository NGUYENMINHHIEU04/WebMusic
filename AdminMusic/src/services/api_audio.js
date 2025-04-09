
import axios from 'axios';
import { API_BASE_URL } from './api';

// URL cơ sở cho API
const BASE_URL = `${API_BASE_URL}/audios`;

// Utility to get duration from audio file
const getAudioDuration = (file) => {
  return new Promise((resolve, reject) => {
    try {
      const audioElement = document.createElement('audio');
      const objectUrl = URL.createObjectURL(file);
      
      audioElement.addEventListener('loadedmetadata', () => {
        const duration = audioElement.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        const formattedDuration = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        URL.revokeObjectURL(objectUrl);
        resolve(formattedDuration);
      });
      
      audioElement.addEventListener('error', (error) => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('Could not load audio file'));
      });
      
      audioElement.src = objectUrl;
    } catch (error) {
      reject(error);
    }
  });
};

// Object containing API methods related to audio
const audioApi = {
  // Upload a new audio file
  uploadAudio: async (file, providedDuration = null) => {
    try {
      // Auto-calculate duration if not provided
      const duration = providedDuration || await getAudioDuration(file);
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('duration', duration);
      
      const response = await axios.post(BASE_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading audio:', error);
      throw error;
    }
  },

  // Get all audio files
  getAllAudios: async () => {
    try {
      const response = await axios.get(BASE_URL);
      
      // Handle both array responses and object responses with a data property
      if (response.data && Array.isArray(response.data)) {
        return response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        return response.data;
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching audio files:', error);
      throw error;
    }
  },

  // Get audio by ID
  getAudioById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching audio by ID:', error);
      throw error;
    }
  },

  // Get audio data and duration
  getAudioData: (id) => {
    return `${BASE_URL}/${id}/data`;
  },

  // Update audio file
  updateAudio: async (id, file, providedDuration = null) => {
    try {
      // Auto-calculate duration if not provided
      const duration = providedDuration || await getAudioDuration(file);
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('duration', duration);
      
      const response = await axios.put(`${BASE_URL}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating audio:', error);
      throw error;
    }
  },

  // Delete audio file
  deleteAudio: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting audio:', error);
      throw error;
    }
  }
};

// Export individual functions for direct imports
export const getAllAudios = audioApi.getAllAudios;
export const getAudioById = audioApi.getAudioById;
export const uploadAudio = audioApi.uploadAudio;
export const updateAudio = audioApi.updateAudio;
export const deleteAudio = audioApi.deleteAudio;
export const getAudioData = audioApi.getAudioData;
export const getAudioDurationHelper = getAudioDuration;

// Also export the entire API object as default
export default audioApi;
