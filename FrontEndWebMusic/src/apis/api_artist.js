// api_artist.js

const BASE_URL = 'http://localhost:8080/api/artists';
const IMAGE_BASE_URL = 'http://localhost:8080/api/images';

// Helper function to handle JSON responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

// Helper function to fetch image by ID and return a blob URL
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

// Get all artists
export const getAllArtists = async () => {
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

// Get an artist by ID
export const getArtistById = async (id) => {
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

// Create a new artist
export const createArtist = async (artistData) => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(artistData),
    });
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

// Delete an artist by ID
export const deleteArtist = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete artist');
    }
    return true; // Return true to indicate success
  } catch (error) {
    throw error;
  }
};

// Fetch all artists with their images
export const getAllArtistsWithImages = async () => {
  try {
    const artistsResponse = await getAllArtists();
    const artistsData = artistsResponse; // The response is already the array of artists

    const artistsWithImages = await Promise.all(
      artistsData.map(async (artist) => {
        if (artist.imageUrl) {
          const imageBlobUrl = await getImageById(artist.id); // Use artist.id to fetch the image
          return { ...artist, imageUrl: imageBlobUrl };
        }
        return artist;
      })
    );

    return artistsWithImages;
  } catch (error) {
    throw error;
  }
};

// Fetch a single artist with their image
export const getArtistWithImage = async (id) => {
  try {
    const artistResponse = await getArtistById(id);
    const artistData = artistResponse;

    if (artistData.imageUrl) {
      const imageBlobUrl = await getImageById(artistData.id); // Use artist.id to fetch the image
      return {
        ...artistData,
        imageUrl: imageBlobUrl,
      };
    }
    return artistData;
  } catch (error) {
    throw error;
  }
};