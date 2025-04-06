// // import React, { createContext, useState, useContext } from 'react';
// // import { getImageUrl } from '../apis/api_playlist'; // Import getImageUrl

// // const LibraryContext = createContext();

// // export const LibraryProvider = ({ children }) => {
// //   const [libraryItems, setLibraryItems] = useState([
// //     // Các mục mặc định ban đầu
// //     // {
// //     //   id: 'liked-songs',
// //     //   title: 'Liked Songs',
// //     //   type: 'Playlist',
// //     //   creator: '1 song',
// //     //   image: 'https://via.placeholder.com/50/8b5cf6/ffffff?text=♥',
// //     // },
// //     // {
// //     //   id: 'son-tung-mtp',
// //     //   title: 'Sơn Tùng M-TP',
// //     //   type: 'Artist',
// //     //   creator: '',
// //     //   image: 'https://via.placeholder.com/50?text=Artist',
// //     // },
// //     // {
// //     //   id: 'chill-game',
// //     //   title: 'Chill để chơi game 😊',
// //     //   type: 'Playlist',
// //     //   creator: 'Buitrithanh',
// //     //   image: 'https://via.placeholder.com/50?text=Game',
// //     // },
// //     // {
// //     //   id: 'obito-mix',
// //     //   title: 'Obito Mix',
// //     //   type: 'Playlist',
// //     //   creator: 'Spotify',
// //     //   image: 'https://via.placeholder.com/50?text=Obito',
// //     // },
// //     // {
// //     //   id: 'obito',
// //     //   title: 'Obito',
// //     //   type: 'Artist',
// //     //   creator: '',
// //     //   image: 'https://via.placeholder.com/50?text=Obito',
// //     // },
// //   ]);

// //   const addToLibrary = (playlist) => {
// //     const newItem = {
// //       id: playlist.id || `playlist-${Date.now()}`, // Tạo ID duy nhất nếu không có
// //       title: playlist.name,
// //       type: 'Playlist',
// //       creator: 'Spotify',
// //       image: playlist.coverImageId
// //         ? getImageUrl(playlist.coverImageId) // Sử dụng getImageUrl đã import
// //         : 'https://via.placeholder.com/50?text=Playlist',
// //     };

// //     // Kiểm tra xem playlist đã tồn tại trong library chưa
// //     if (!libraryItems.some((item) => item.id === newItem.id)) {
// //       setLibraryItems((prevItems) => [...prevItems, newItem]);
// //     }
// //   };

// //   return (
// //     <LibraryContext.Provider value={{ libraryItems, addToLibrary }}>
// //       {children}
// //     </LibraryContext.Provider>
// //   );
// // };

// // export const useLibrary = () => useContext(LibraryContext);

// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { getImageUrl } from '../apis/api_playlist';
// import { getLibrary, addPlaylistCard } from '../apis/api_library'; // Import API functions
// import { AuthContext } from './AuthContext'; // Import AuthContext to get userId

// const LibraryContext = createContext();

// export const LibraryProvider = ({ children }) => {
//   const { userId, isLoggedIn } = useContext(AuthContext); // Get userId and isLoggedIn from AuthContext
//   const [libraryItems, setLibraryItems] = useState([]);

//   // Fetch library items when user logs in
//   useEffect(() => {
//     const fetchLibrary = async () => {
//       if (isLoggedIn && userId) {
//         try {
//           const response = await getLibrary(userId);
//           const playlistCards = response.data || []; // Assuming response.data is the list of PlaylistCards
//           const formattedItems = playlistCards.map((card) => ({
//             id: card.id,
//             title: card.name || 'Unnamed Playlist',
//             type: 'Playlist',
//             creator: card.creator || 'Spotify',
//             image: card.coverImageId
//               ? getImageUrl(card.coverImageId)
//               : 'https://via.placeholder.com/50?text=Playlist',
//           }));
//           setLibraryItems(formattedItems);
//         } catch (error) {
//           console.error('Failed to fetch library:', error);
//         }
//       }
//     };

//     fetchLibrary();
//   }, [isLoggedIn, userId]);

//   const addToLibrary = async (playlist) => {
//     if (!isLoggedIn || !userId) {
//       alert('Please log in to add to your library.');
//       return;
//     }

//     const newItem = {
//       id: playlist.id || `playlist-${Date.now()}`,
//       title: playlist.name,
//       type: 'Playlist',
//       creator: 'Spotify',
//       image: playlist.coverImageId
//         ? getImageUrl(playlist.coverImageId)
//         : 'https://via.placeholder.com/50?text=Playlist',
//     };

//     // Check if the playlist already exists in the library
//     if (!libraryItems.some((item) => item.id === newItem.id)) {
//       try {
//         // Call the backend API to add the playlist
//         await addPlaylistCard(userId, newItem.id);
//         setLibraryItems((prevItems) => [...prevItems, newItem]);
//         alert(`${playlist.name} has been added to Your Library!`);
//       } catch (error) {
//         console.error('Error adding to library:', error);
//         alert('Failed to add playlist to library.');
//       }
//     } else {
//       alert('This playlist is already in your library.');
//     }
//   };

//   return (
//     <LibraryContext.Provider value={{ libraryItems, addToLibrary }}>
//       {children}
//     </LibraryContext.Provider>
//   );
// };

// export const useLibrary = () => useContext(LibraryContext);

import React, { createContext, useState, useContext, useEffect } from 'react';
import { getImageUrl } from '../apis/api_playlist';
import { getLibrary, addPlaylistCard, removePlaylistCard } from '../apis/api_library';
import { AuthContext } from './AuthContext';

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const { userId, isLoggedIn } = useContext(AuthContext);
  const [libraryItems, setLibraryItems] = useState([]);

  useEffect(() => {
    const fetchLibrary = async () => {
      if (isLoggedIn && userId) {
        try {
          const response = await getLibrary(userId);
          const playlistCards = response.data || [];
          const formattedItems = playlistCards.map((card) => ({
            id: card.id,
            title: card.name || 'Unnamed Playlist',
            type: 'Playlist',
            creator: card.creator || 'Spotify',
            image: card.coverImageId
              ? getImageUrl(card.coverImageId)
              : 'https://via.placeholder.com/50?text=Playlist',
          }));
          setLibraryItems(formattedItems);
        } catch (error) {
          console.error('Failed to fetch library:', error);
        }
      }
    };

    fetchLibrary();
  }, [isLoggedIn, userId]);

  const addToLibrary = async (playlist) => {
    if (!isLoggedIn || !userId) {
      alert('Please log in to add to your library.');
      return;
    }

    const newItem = {
      id: playlist.id || `playlist-${Date.now()}`,
      title: playlist.name,
      type: 'Playlist',
      creator: 'Spotify',
      image: playlist.coverImageId
        ? getImageUrl(playlist.coverImageId)
        : 'https://via.placeholder.com/50?text=Playlist',
    };

    if (!libraryItems.some((item) => item.id === newItem.id)) {
      try {
        await addPlaylistCard(userId, newItem.id);
        setLibraryItems((prevItems) => [...prevItems, newItem]);
        // alert(`${playlist.name} has been added to Your Library!`);
      } catch (error) {
        console.error('Error adding to library:', error);
        alert('Failed to add playlist to library.');
      }
    }
  };

  const removeFromLibrary = async (playlistId) => {
    if (!isLoggedIn || !userId) {
      alert('Please log in to remove from your library.');
      return;
    }

    try {
      await removePlaylistCard(userId, playlistId);
      setLibraryItems((prevItems) => prevItems.filter((item) => item.id !== playlistId));
      // alert('Playlist removed from Your Library!');
    } catch (error) {
      console.error('Error removing from library:', error);
      alert('Failed to remove playlist from library.');
    }
  };

  return (
    <LibraryContext.Provider value={{ libraryItems, addToLibrary, removeFromLibrary }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => useContext(LibraryContext);