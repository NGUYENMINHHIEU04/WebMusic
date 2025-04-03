// api_library.js

const BASE_URL = 'http://localhost:8080/api/library'; // Adjust the base URL as per your Spring Boot server

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }
  return response.json();
};

// Add a PlaylistCard to the library
export const addPlaylistCard = async (userId, playlistCardId) => {
  try {
    const response = await fetch(`${BASE_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        playlistCardId,
      }),
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Error adding playlist card:', error);
    throw error;
  }
};

// Remove a PlaylistCard from the library
export const removePlaylistCard = async (userId, playlistCardId) => {
  try {
    const response = await fetch(`${BASE_URL}/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        userId,
        playlistCardId,
      }).toString(),
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Error removing playlist card:', error);
    throw error;
  }
};

// Get all PlaylistCards from the library for a user
export const getLibrary = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching library:', error);
    throw error;
  }
};