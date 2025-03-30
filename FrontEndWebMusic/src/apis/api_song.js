// api_song.js

const BASE_URL = 'http://localhost:8080/api/songs'; // Adjust the base URL as per your Spring Boot server

// Helper function to handle fetch responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

// Helper function to handle audio response
const handleAudioResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  const blob = await response.blob();
  const duration = response.headers.get('X-Duration');
  const filename = response.headers.get('Content-Disposition')?.split('filename=')[1] || 'song.mp3';
  return { blob, duration, filename };
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

// Get song audio
export const getSongAudio = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}/audios`, {
      method: 'GET',
    });
    const { blob, duration, filename } = await handleAudioResponse(response);
    return {
      audioUrl: URL.createObjectURL(blob),
      duration,
      filename
    };
  } catch (error) {
    throw error;
  }
};