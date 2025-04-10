
import axios from 'axios';
import { toast } from 'react-toastify';

// Define the base URL for the API
const BASE_URL = 'http://localhost:8080/api/images';

// Image API service
const imageApi = {
  /**
   * Fetch an image by its ID
   * @param {string} id - The image ID
   * @returns {Promise<string>} - The image URL or blob URL
   */
  getImage: async (id) => {
    try {
      // Using responseType 'blob' to handle binary image data
      const response = await axios.get(`${BASE_URL}/${id}`, {
        responseType: 'blob'
      });
      
      // Create a blob URL from the image data
      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    } catch (error) {
      console.error('Error fetching image:', error);
      console.error('Error details:', error.response?.data || 'No response data');
      console.error('Error status:', error.response?.status || 'No status code');
      toast.error(`Failed to fetch image: ${error.message}`);
      return null;
    }
  },

  /**
   * Upload a new image
   * @param {File} file - The image file to upload
   * @returns {Promise<string>} - The ID of the uploaded image
   */
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post(BASE_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      toast.success('Image uploaded successfully');
      // Return the image ID from the response
      return response.data.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error(`Failed to upload image: ${error.message}`);
      return null;
    }
  },

  /**
   * Update an existing image
   * @param {string} id - The ID of the image to update
   * @param {File} file - The new image file
   * @returns {Promise<boolean>} - Whether the update was successful
   */
  updateImage: async (id, file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      await axios.put(`${BASE_URL}/images/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      toast.success('Image updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating image:', error);
      toast.error(`Failed to update image: ${error.message}`);
      return false;
    }
  },

  /**
   * Delete an image by its ID
   * @param {string} id - The ID of the image to delete
   * @returns {Promise<boolean>} - Whether the deletion was successful
   */
  deleteImage: async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      toast.success('Image deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error(`Failed to delete image: ${error.message}`);
      return false;
    }
  },

  /**
   * Fetch all image IDs
   * @returns {Promise<string[]>} - An array of image IDs
   */
  getAllImages: async () => {
    try {
      const response = await axios.get(BASE_URL);
      console.log("Raw image response:", response);
      
      // Handle different response formats
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        return response.data.data; // Array of image IDs
      } else if (response.data && Array.isArray(response.data)) {
        return response.data;
      } else {
        console.warn("Unexpected response format from images API, returning empty array");
        return [];
      }
    } catch (error) {
      console.error('Error fetching image IDs:', error);
      toast.error(`Failed to fetch image IDs: ${error.message}`);
      return [];
    }
  },

  /**
   * Get direct image URL from ID
   * @param {string} id - The ID of the image
   * @returns {string} - The URL to the image
   */
  getImageUrl: (id) => {
    return `${BASE_URL}/${id}`;
  }
};

// Export individual functions for direct import
export const getImage = imageApi.getImage;
export const uploadImage = imageApi.uploadImage;
export const updateImage = imageApi.updateImage;
export const deleteImage = imageApi.deleteImage;
export const getAllImages = imageApi.getAllImages;
export const getImageUrl = imageApi.getImageUrl;

// Export the whole API object as default
export default imageApi;
