// api_playlist.js

const BASE_URL = 'http://localhost:8080/api/playlists'; // Adjust the base URL as per your Spring Boot server

// Get all playlists
export const getAllPlaylists = async () => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch playlists');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching playlists:', error);
        throw error;
    }
};

// Get playlist by ID
export const getPlaylistById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Playlist not found');
            }
            throw new Error('Failed to fetch playlist');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching playlist:', error);
        throw error;
    }
};

// Create new playlist
export const createPlaylist = async (playlistData) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playlistData),
        });

        if (!response.ok) {
            throw new Error('Failed to create playlist');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating playlist:', error);
        throw error;
    }
};