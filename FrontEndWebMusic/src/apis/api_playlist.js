// api_playlist.js

const BASE_URL = 'http://localhost:8080/api/playlists';
const IMAGE_BASE_URL = 'http://localhost:8080/api/images';

// Helper function to handle JSON responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
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
    return handleResponse(response);
  } catch (error) {
    throw error;
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
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

// Get image by ID from ImageController
export const getImageById = async (imageId) => {
  try {
    const response = await fetch(`${IMAGE_BASE_URL}/${imageId}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }
    const blob = await response.blob();
    return URL.createObjectURL(blob); // Returns a URL that can be used in an img tag
  } catch (error) {
    throw error;
  }
};

// Fetch playlist with cover image
export const getPlaylistWithImage = async (id) => {
  try {
    const playlistResponse = await getPlaylist(id);
    const playlistData = playlistResponse.data;
    
    if (playlistData.coverImageId) { // Use coverImageId as specified in JSON
      const imageUrl = await getImageById(playlistData.coverImageId);
      return {
        ...playlistResponse,
        data: {
          ...playlistData,
          imageUrl // Add image URL to the playlist data
        }
      };
    }
    return playlistResponse;
  } catch (error) {
    throw error;
  }
};

// Fetch all playlists with their cover images
export const getAllPlaylistsWithImages = async () => {
  try {
    const playlistsResponse = await getAllPlaylists();
    const playlistsData = playlistsResponse.data;

    const playlistsWithImages = await Promise.all(
      playlistsData.map(async (playlist) => {
        if (playlist.coverImageId) { // Use coverImageId as specified in JSON
          const imageUrl = await getImageById(playlist.coverImageId);
          return { ...playlist, imageUrl };
        }
        return playlist;
      })
    );

    return {
      ...playlistsResponse,
      data: playlistsWithImages
    };
  } catch (error) {
    throw error;
  }
};