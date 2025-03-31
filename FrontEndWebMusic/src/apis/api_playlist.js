// api_playlist.js

const BASE_URL = 'http://localhost:8080/api/playlists';
const IMAGE_BASE_URL = 'http://localhost:8080/api/images'; // Adjust if different

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

// Existing playlist functions remain unchanged
export const getAllPlaylists = async () => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching all playlists:', error);
    throw error;
  }
};

export const getPlaylistById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching playlist:', error);
    throw error;
  }
};

export const createPlaylist = async (playlistData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playlistData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error creating playlist:', error);
    throw error;
  }
};

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
    console.error('Error updating playlist:', error);
    throw error;
  }
};

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
    console.error('Error deleting playlist:', error);
    throw error;
  }
};

// New function to fetch image by ID
export const getImageUrl = (imageId) => {
  return `${IMAGE_BASE_URL}/${imageId}`;
};