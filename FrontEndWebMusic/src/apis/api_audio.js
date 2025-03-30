// api_audio.js

const BASE_URL = 'http://localhost:8080/api/audios';

// Helper function to handle JSON responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

// Create a new audio file
export const createAudio = async (file, duration) => {
  try {
    const formData = new FormData();
    formData.append('file', file); // Append the audio file
    formData.append('duration', duration); // Append the duration

    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      body: formData, // No need to set Content-Type; fetch will set it automatically for FormData
    });

    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

// Get all audio files
export const getAllAudios = async () => {
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

// Get an audio file by ID
export const getAudioById = async (id) => {
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

// Update an audio file
export const updateAudio = async (id, file, duration) => {
  try {
    const formData = new FormData();
    formData.append('file', file); // Append the new audio file
    formData.append('duration', duration); // Append the new duration

    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      body: formData, // No need to set Content-Type; fetch will set it automatically for FormData
    });

    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

// Delete an audio file
export const deleteAudio = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

// Get audio data (MP3 and duration)
export const getAudioData = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}/data`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch audio data');
    }

    const blob = await response.blob();
    const duration = response.headers.get('X-Duration'); // Get duration from custom header
    const audioUrl = URL.createObjectURL(blob); // Create a URL for the audio blob

    return {
      audioUrl, // URL to use in an <audio> tag
      duration, // Duration of the audio
    };
  } catch (error) {
    throw error;
  }
};