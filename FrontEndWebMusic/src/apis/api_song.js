// api_song.js

import { API_BASE_URL } from "./api";

const BASE_URL = `${API_BASE_URL}/songs`; // Ensure API_BASE_URL is correctly set (e.g., http://localhost:8080/api)

// Helper function to handle fetch responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }
  const data = await response.json();
  return data.data; // Extract 'data' from ResponseObject
};

// Helper function to handle audio responses
const handleAudioResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }
  const data = await response.json();

  // Convert base64 to blob for audio URL
  const byteCharacters = atob(data.audioBase64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "audio/mpeg" });

  return {
    audioUrl: URL.createObjectURL(blob),
    duration: data.duration || "0:00",
    filename: data.filename || "song.mp3",
    title: data.title || "Unknown Title",
    category: data.category || "Unknown Category",
    artist: data.artist || "Unknown Artist",
    idImage: data.idImage || null, // Handle missing idImage gracefully
  };
};

// Recommend songs based on mood
export const recommendSongs = async (userId, mood) => {
  try {
    const response = await fetch(`${BASE_URL}/recommend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, mood }),
    });
    const data = await handleResponse(response);
    return data; // List of recommended songs
  } catch (error) {
    throw error;
  }
};

// Create a new song
export const createSong = async (songData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(songData),
    });
    const data = await handleResponse(response);
    return data; // Return the created song
  } catch (error) {
    throw error;
  }
};

// Get all songs
export const getAllSongs = async () => {
  try {
    const response = await fetch(BASE_URL);
    const data = await handleResponse(response);
    return data; // Return list of songs
  } catch (error) {
    throw error;
  }
};

// Get song by ID
export const getSongById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    const data = await handleResponse(response);
    return data; // Return song details
  } catch (error) {
    throw error;
  }
};

// Update song
export const updateSong = async (id, songData) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(songData),
    });
    const data = await handleResponse(response);
    return data; // Return updated song
  } catch (error) {
    throw error;
  }
};

// Delete song
export const deleteSong = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    const data = await handleResponse(response);
    return data; // Return success message (null in ResponseObject)
  } catch (error) {
    throw error;
  }
};

// Get song audio
export const getSongAudio = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}/audios`, {
      method: "GET",
    });
    return await handleAudioResponse(response);
  } catch (error) {
    throw error;
  }
};

// Note: The following endpoints (getLikedSongs, addToLikedSongs, removeFromLikedSongs)
// are not present in SongController.java. They need corresponding backend endpoints.

// Get Liked Songs for a user (requires backend implementation)
export const getLikedSongs = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/liked-songs/${userId}`, {
      method: "GET",
    });
    const data = await handleResponse(response);
    return data || []; // Return songIds or empty array
  } catch (error) {
    throw error;
  }
};

// Add a song to Liked Songs (requires backend implementation)
export const addToLikedSongs = async (userId, songId) => {
  try {
    const response = await fetch(`${BASE_URL}/liked-songs/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ songId }),
    });
    const data = await handleResponse(response);
    return data; // Return updated songIds
  } catch (error) {
    throw error;
  }
};

// Remove a song from Liked Songs (requires backend implementation)
export const removeFromLikedSongs = async (userId, songId) => {
  try {
    const response = await fetch(`${BASE_URL}/liked-songs/${userId}/${songId}`, {
      method: "DELETE",
    });
    const data = await handleResponse(response);
    return data; // Return updated songIds
  } catch (error) {
    throw error;
  }
};