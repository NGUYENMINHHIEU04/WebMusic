
import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Change to your actual API URL

// Tạo bài hát mới
export const createSong = async (songData) => {
  try {
    const response = await axios.post(`${API_URL}/api/songs`, songData);
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error creating song');
  }
};

// Lấy tất cả bài hát
export const getAllSongs = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/songs`);
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error fetching songs');
  }
};

// Lấy bài hát theo ID
export const getSongById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/songs/${id}`);
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error fetching song');
  }
};

// Cập nhật bài hát
export const updateSong = async (id, songData) => {
  try {
    const response = await axios.put(`${API_URL}/api/songs/${id}`, songData);
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error updating song');
  }
};

// Xóa bài hát
export const deleteSong = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/songs/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error deleting song');
  }
};

// Lấy file MP3 và duration của bài hát
export const getSongAudio = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/songs/${id}/audios`, {
      responseType: 'arraybuffer',
    });
    
    // Extract duration from headers
    const duration = response.headers['x-duration'];
    
    // Create blob from audio data
    const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
    const audioUrl = URL.createObjectURL(audioBlob);
    
    return {
      audioUrl,
      duration: parseFloat(duration || '0'),
      blob: audioBlob
    };
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error fetching song audio');
  }
};
