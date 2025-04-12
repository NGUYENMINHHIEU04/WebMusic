const BASE_URL = 'http://localhost:8080/api/history';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

// 1. Add a new history entry
export const addHistory = async (historyData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(historyData), // Expects a history object
    });
    const result = await handleResponse(response);
    return result.data; // Returns the saved History object
  } catch (error) {
    console.error('Error adding history:', error);
    throw error;
  }
};

// 2. Get history by userId (up to 10 most recent unique songs)
export const getHistoryByUserId = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await handleResponse(response);
    return result.data; // Returns a list of history entries
  } catch (error) {
    console.error('Error fetching history by userId:', error);
    throw error;
  }
};

// 3. Get all history
export const getAllHistory = async () => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await handleResponse(response);
    return result.data; // Returns a list of all history entries
  } catch (error) {
    console.error('Error fetching all history:', error);
    throw error;
  }
};

// 4. Delete a history entry by id
export const deleteHistory = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await handleResponse(response);
    return result.message; // Returns success message
  } catch (error) {
    console.error('Error deleting history:', error);
    throw error;
  }
};

// Ghi nhận khi user nghe bài hát
export const recordListen = async (userId, songId) => {
  try {
      const response = await fetch('http://localhost:8080/api/history/listen', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, songId })
      });
      return await response.json();
  } catch (error) {
      console.error('Error recording listen:', error);
      throw error;
  }
};

// Ghi nhận khi user đánh giá bài hát
export const rateSong = async (userId, songId, rating) => {
  try {
      const response = await fetch('http://localhost:8080/api/history/rate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, songId, rating })
      });
      return await response.json();
  } catch (error) {
      console.error('Error rating song:', error);
      throw error;
  }
};