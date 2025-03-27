// playlist.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Playlist = () => {
    // State variables
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newPlaylist, setNewPlaylist] = useState({
        name: '',
        description: ''
    });

    // API base URL (adjust according to your Spring Boot server)
    const API_URL = 'http://localhost:8080/api/playlists';

    // Fetch all playlists on component mount
    useEffect(() => {
        fetchPlaylists();
    }, []);

    // Function to fetch all playlists
    const fetchPlaylists = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL);
            setPlaylists(response.data);
            setError(null);
        } catch (err) {
            setError('Error fetching playlists: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch a single playlist by ID
    const fetchPlaylistById = async (id) => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/${id}`);
            // You might want to do something with this single playlist
            console.log('Single playlist:', response.data);
            setError(null);
        } catch (err) {
            setError('Error fetching playlist: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Function to create a new playlist
    const createPlaylist = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(API_URL, newPlaylist);
            setPlaylists([...playlists, response.data]);
            setNewPlaylist({ name: '', description: '' }); // Reset form
            setError(null);
        } catch (err) {
            setError('Error creating playlist: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPlaylist(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="playlist-container">
            <h2>Playlists</h2>

            {/* Create Playlist Form */}
            <form onSubmit={createPlaylist}>
                <div>
                    <input
                        type="text"
                        name="name"
                        value={newPlaylist.name}
                        onChange={handleInputChange}
                        placeholder="Playlist Name"
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="description"
                        value={newPlaylist.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Playlist'}
                </button>
            </form>

            {/* Error Display */}
            {error && <div style={{ color: 'red' }}>{error}</div>}

            {/* Playlists List */}
            {loading && <div>Loading playlists...</div>}
            <ul>
                {playlists.map(playlist => (
                    <li key={playlist.id}>
                        {playlist.name} 
                        <button onClick={() => fetchPlaylistById(playlist.id)}>
                            View Details
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Optional: Add some basic CSS
const styles = `
    .playlist-container {
        padding: 20px;
        max-width: 600px;
        margin: 0 auto;
    }
    form {
        margin-bottom: 20px;
    }
    input {
        margin: 5px 0;
        padding: 8px;
        width: 100%;
    }
    button {
        margin: 5px 0;
        padding: 8px 16px;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
    }
    button:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
    ul {
        list-style: none;
        padding: 0;
    }
    li {
        margin: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export default Playlist;