// api_image.js

// Base URL for your Spring Boot API
const BASE_URL = 'http://localhost:8080/api/images'; // Adjust this URL based on your Spring Boot server

// Helper function to handle fetch responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

// Get all image IDs
export const getAllImages = async () => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await handleResponse(response);
    return data.data; // Returns array of image IDs
  } catch (error) {
    console.error('Error fetching all images:', error);
    throw error;
  }
};

// Get single image by ID
export const getImage = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Image not found');
    }
    const blob = await response.blob();
    return URL.createObjectURL(blob); // Returns URL for displaying the image
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error;
  }
};

// Upload new image
export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      body: formData,
    });
    
    const data = await handleResponse(response);
    return data.data; // Returns the saved image ID
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Update existing image
export const updateImage = async (id, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      body: formData,
    });
    
    const data = await handleResponse(response);
    return data.data; // Returns the updated image ID
  } catch (error) {
    console.error('Error updating image:', error);
    throw error;
  }
};