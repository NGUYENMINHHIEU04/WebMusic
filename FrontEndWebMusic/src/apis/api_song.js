// api_song.js

import { API_BASE_URL } from "./api";

const BASE_URL = `${API_BASE_URL}/songs`; // Adjust the base URL as per your Spring Boot server

// Helper function to handle fetch responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

// In api_song.js, update the handleAudioResponse function
const handleAudioResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  const data = await response.json();

  // Chuyển base64 thành blob để tạo audio URL
  const byteCharacters = atob(data.audioBase64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'audio/mpeg' });

  return {
    audioUrl: URL.createObjectURL(blob),
    duration: data.duration || '0:00',
    filename: data.filename || 'song.mp3',
    title: data.title || 'Unknown Title',
    category: data.category || 'Unknown Category',
    artist: data.artist || 'Unknown Artist',
    idImage: data.idImage, // Extract idImage
  };
};

// Create a new song
export const createSong = async (songData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(songData),
    });
    const data = await handleResponse(response);
    return data.data; // Return the created song
  } catch (error) {
    throw error;
  }
};

// Get all songs
export const getAllSongs = async () => {
  try {
    const response = await fetch(BASE_URL);
    const data = await handleResponse(response);
    return data.data; // Return list of songs
  } catch (error) {
    throw error;
  }
};

// Get song by ID
export const getSongById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    const data = await handleResponse(response);
    return data.data; // Return song details
  } catch (error) {
    throw error;
  }
};

// Update song
export const updateSong = async (id, songData) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(songData),
    });
    const data = await handleResponse(response);
    return data.data; // Return updated song
  } catch (error) {
    throw error;
  }
};

// Delete song
export const deleteSong = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    const data = await handleResponse(response);
    return data.message; // Return success message
  } catch (error) {
    throw error;
  }
};

// Update getSongAudio to include idImage in the return value
export const getSongAudio = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}/audios`, {
      method: 'GET',
    });
    const { audioUrl, duration, filename, title, category, artist, idImage } = await handleAudioResponse(response);
    return {
      audioUrl,
      duration,
      filename,
      title,
      category,
      artist,
      idImage, // Include idImage
    };
  } catch (error) {
    throw error;
  }
};

// Get Liked Songs for a user
export const getLikedSongs = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/liked-songs/${userId}`, {
      method: 'GET',
    });
    const data = await handleResponse(response);
    return data.songIds || []; // Trả về danh sách songIds
  } catch (error) {
    throw error;
  }
};

// Add a song to Liked Songs
export const addToLikedSongs = async (userId, songId) => {
  try {
    const response = await fetch(`${BASE_URL}/liked-songs/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ songId }),
    });
    const data = await handleResponse(response);
    return data.songIds; // Trả về danh sách songIds đã cập nhật
  } catch (error) {
    throw error;
  }
};

// Remove a song from Liked Songs
export const removeFromLikedSongs = async (userId, songId) => {
  try {
    const response = await fetch(`${BASE_URL}/liked-songs/${userId}/${songId}`, {
      method: 'DELETE',
    });
    const data = await handleResponse(response);
    return data.songIds; // Trả về danh sách songIds đã cập nhật
  } catch (error) {
    throw error;
  }
};