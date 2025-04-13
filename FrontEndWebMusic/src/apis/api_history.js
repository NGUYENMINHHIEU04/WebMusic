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
        console.log('Sending addHistory request:', historyData);
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(historyData), // Expects a history object
        });
        const result = await handleResponse(response);
        console.log('addHistory response:', result);
        return result.data; // Returns the saved History object
    } catch (error) {
        console.error('Error adding history:', error);
        throw error;
    }
};

// 2. Get history by userId (up to 10 most recent unique songs)
export const getHistoryByUserId = async (userId) => {
    try {
        console.log(`Fetching history for userId: ${userId}`);
        const response = await fetch(`${BASE_URL}/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await handleResponse(response);
        console.log('getHistoryByUserId response:', result);
        return result.data; // Returns a list of history entries
    } catch (error) {
        console.error('Error fetching history by userId:', error);
        throw error;
    }
};

// 3. Get all history
export const getAllHistory = async () => {
    try {
        console.log('Fetching all history');
        const response = await fetch(BASE_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await handleResponse(response);
        console.log('getAllHistory response:', result);
        return result.data; // Returns a list of all history entries
    } catch (error) {
        console.error('Error fetching all history:', error);
        throw error;
    }
};

// 4. Record when a user listens to a song
export const recordListen = async (historyData) => {
    try {
        if (!historyData.userId || !historyData.songId) {
            throw new Error('Missing userId or songId in historyData');
        }
        console.log('Sending recordListen request:', historyData);
        const response = await fetch(`${BASE_URL}/listen`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(historyData), // Expects a full History object
        });
        const result = await handleResponse(response);
        console.log('recordListen response:', result);
        return result.data; // Returns the updated History object
    } catch (error) {
        console.error('Error recording listen:', error);
        throw error;
    }
};

// 5. Record when a user rates a song
export const rateSong = async (historyData) => {
    try {
        if (!historyData.userId || !historyData.songId || historyData.rating == null) {
            throw new Error('Missing userId, songId, or rating in historyData');
        }
        console.log('Sending rateSong request:', historyData);
        const response = await fetch(`${BASE_URL}/rate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(historyData), // Expects a full History object with rating
        });
        const result = await handleResponse(response);
        console.log('rateSong response:', result);
        return result.data; // Returns the updated History object
    } catch (error) {
        console.error('Error rating song:', error);
        throw error;
    }
};