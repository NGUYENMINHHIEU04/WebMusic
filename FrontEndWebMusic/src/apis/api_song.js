// // api_song.js

import { API_BASE_URL } from "./api";

// const BASE_URL = 'http://localhost:8080/api/songs'; // Adjust the base URL as per your Spring Boot server

// // Helper function to handle fetch responses
// const handleResponse = async (response) => {
//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'Something went wrong');
//   }
//   return response.json();
// };

// // Helper function to handle audio response
// const handleAudioResponse = async (response) => {
//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'Something went wrong');
//   }
//   const blob = await response.blob();
//   const duration = response.headers.get('X-Duration');
//   const filename = response.headers.get('Content-Disposition')?.split('filename=')[1] || 'song.mp3';
//   return { blob, duration, filename };
// };

// // Create a new song
// export const createSong = async (songData) => {
//   try {
//     const response = await fetch(BASE_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(songData),
//     });
//     const data = await handleResponse(response);
//     return data.data; // Return the created song
//   } catch (error) {
//     throw error;
//   }
// };

// // Get all songs
// export const getAllSongs = async () => {
//   try {
//     const response = await fetch(BASE_URL);
//     const data = await handleResponse(response);
//     return data.data; // Return list of songs
//   } catch (error) {
//     throw error;
//   }
// };

// // Get song by ID
// export const getSongById = async (id) => {
//   try {
//     const response = await fetch(`${BASE_URL}/${id}`);
//     const data = await handleResponse(response);
//     return data.data; // Return song details
//   } catch (error) {
//     throw error;
//   }
// };

// // Update song
// export const updateSong = async (id, songData) => {
//   try {
//     const response = await fetch(`${BASE_URL}/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(songData),
//     });
//     const data = await handleResponse(response);
//     return data.data; // Return updated song
//   } catch (error) {
//     throw error;
//   }
// };

// // Delete song
// export const deleteSong = async (id) => {
//   try {
//     const response = await fetch(`${BASE_URL}/${id}`, {
//       method: 'DELETE',
//     });
//     const data = await handleResponse(response);
//     return data.message; // Return success message
//   } catch (error) {
//     throw error;
//   }
// };

// // Get song audio
// export const getSongAudio = async (id) => {
//   try {
//     const response = await fetch(`${BASE_URL}/${id}/audios`, {
//       method: 'GET',
//     });
//     const { blob, duration, filename } = await handleAudioResponse(response);
//     return {
//       audioUrl: URL.createObjectURL(blob),
//       duration,
//       filename
//     };
//   } catch (error) {
//     throw error;
//   }
// };

// api_song.js

const BASE_URL = `${API_BASE_URL}/songs`; // Adjust the base URL as per your Spring Boot server

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
  const data = await response.json();

  // Chuyển base64 thành blob để tạo audio URL
  const byteCharacters = atob(data.audioBase64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'audio/mpeg' });

  return {
    audioUrl: URL.createObjectURL(blob),
    duration: data.duration || '0:00', // Đảm bảo duration có giá trị mặc định
    filename: data.filename || 'song.mp3', // Đảm bảo filename có giá trị mặc định
    title: data.title || 'Unknown Title', // Trích xuất title
    category: data.category || 'Unknown Category', // Trích xuất category
    artist: data.artist || 'Unknown Artist', // Trích xuất artist
  };
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
    const { audioUrl, duration, filename, title, category, artist } = await handleAudioResponse(response);
    return {
      audioUrl,
      duration,
      filename,
      title, // Trả về title
      category, // Trả về category
      artist, // Trả về artist
    };
  } catch (error) {
    throw error;
  }
};