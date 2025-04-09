// api_playlist.js

const BASE_URL = 'http://localhost:8080/api/playlists'; // Adjust this URL based on your Spring Boot server

// Helper function to handle fetch responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

// Create a new playlist
export const createPlaylist = async (playlistData) => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playlistData),
    });
    return await handleResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get a specific playlist by ID
export const getPlaylist = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await handleResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all playlists
export const getAllPlaylists = async () => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await handleResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get playlists by card ID
export const getPlaylistsByCardId = async (playlistCardId) => {
  try {
    const response = await fetch(`${BASE_URL}/card/${playlistCardId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await handleResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update a playlist
export const updatePlaylist = async (id, playlistData) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playlistData),
    });
    return await handleResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Add a playlist card
export const addPlaylistCard = async (id, playlistCardId) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}/add-card/${playlistCardId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await handleResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Remove a playlist card
export const removePlaylistCard = async (id, playlistCardId) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}/remove-card/${playlistCardId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await handleResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete a playlist
export const deletePlaylist = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await handleResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};