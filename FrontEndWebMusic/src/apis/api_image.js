// api_image.js

const BASE_URL = 'http://localhost:8080/api/images';

// Helper function to handle JSON responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

// Upload an image
export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file); // Append the file to the FormData object

    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      body: formData, // No need to set Content-Type; fetch will set it automatically for FormData
    });

    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

// Get an image by ID (returns a blob URL for use in <img> tags)
export const getImageById = async (imageId) => {
  try {
    const response = await fetch(`${BASE_URL}/${imageId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob); // Returns a URL that can be used in an <img> tag
  } catch (error) {
    throw error;
  }
};

// Update an image by ID
export const updateImage = async (imageId, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file); // Append the new file to the FormData object

    const response = await fetch(`${BASE_URL}/images/${imageId}`, {
      method: 'PUT',
      body: formData, // No need to set Content-Type; fetch will set it automatically for FormData
    });

    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};