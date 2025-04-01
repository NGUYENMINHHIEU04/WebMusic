// // api_artist.js

// const BASE_URL = 'http://localhost:8080/api/artists'; // Adjust the base URL as needed

// // Function to get all artists
// export const getAllArtists = async () => {
//     try {
//         const response = await fetch(BASE_URL, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching all artists:', error);
//         throw error;
//     }
// };

// // Function to get artist by ID
// export const getArtistById = async (id) => {
//     try {
//         const response = await fetch(`${BASE_URL}/${id}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (!response.ok) {
//             if (response.status === 404) {
//                 throw new Error('Artist not found');
//             }
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching artist by ID:', error);
//         throw error;
//     }
// };

// // Function to create a new artist
// export const createArtist = async (artistData) => {
//     try {
//         const response = await fetch(BASE_URL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(artistData),
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error creating artist:', error);
//         throw error;
//     }
// };

// // Function to delete an artist
// export const deleteArtist = async (id) => {
//     try {
//         const response = await fetch(`${BASE_URL}/${id}`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         return true; // Return true if deletion is successful
//     } catch (error) {
//         console.error('Error deleting artist:', error);
//         throw error;
//     }
// };

// api_artist.js

const BASE_URL = 'http://localhost:8080/api/artists'; // Adjust the base URL as needed

// Function to get all artists
export const getAllArtists = async () => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching all artists:', error);
        throw error;
    }
};

// Function to get artist by ID
export const getArtistById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Artist not found');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching artist by ID:', error);
        throw error;
    }
};

// Function to get multiple artists by IDs
export const getArtistsByIds = async (ids) => {
    try {
        // Lấy tất cả artist từ API /api/artists
        const allArtists = await getAllArtists();
        
        // Lọc ra các artist có ID nằm trong danh sách ids
        const filteredArtists = allArtists.filter(artist => 
            ids.includes(String(artist.id)) // Chuyển id thành String để so sánh
        );

        return filteredArtists;
    } catch (error) {
        console.error('Error fetching artists by IDs:', error);
        throw error;
    }
};

// Function to create a new artist
export const createArtist = async (artistData) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(artistData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating artist:', error);
        throw error;
    }
};

// Function to delete an artist
export const deleteArtist = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return true; // Return true if deletion is successful
    } catch (error) {
        console.error('Error deleting artist:', error);
        throw error;
    }
};