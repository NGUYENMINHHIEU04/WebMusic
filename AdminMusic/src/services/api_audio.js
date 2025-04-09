
import axios from 'axios';
import { API_BASE_URL } from './api';

// URL cơ sở cho API
const BASE_URL = `${API_BASE_URL}/audios`;

// Object chứa các phương thức gọi API liên quan đến audio
const audioApi = {
  // Upload một file audio mới
  uploadAudio: async (file, duration) => {
    try {
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

  // Lấy tất cả file audio
  getAllAudios: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching audio files:', error);
      throw error;
    }
  },

  // Lấy file audio theo ID
  getAudioById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching audio by ID:', error);
      throw error;
    }
  },

  // Lấy dữ liệu MP3 và duration
  getAudioData: (id) => {
    return `${BASE_URL}/${id}/data`;
  },

  // Cập nhật file audio
  updateAudio: async (id, file, duration) => {
    try {
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

  // Xóa file audio
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
export const { getAllAudios, getAudioById, uploadAudio, updateAudio, deleteAudio, getAudioData } = audioApi;

// Also export the entire API object as default
export default audioApi;
