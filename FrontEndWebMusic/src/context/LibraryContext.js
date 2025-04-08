import React, { createContext, useState, useContext, useEffect } from 'react';
import { getImageUrl } from '../apis/api_playlistcard';
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
          console.log('Library data from API:', response.data); // Debug dữ liệu từ API
          const playlistCards = response.data || [];
          const formattedItems = await Promise.all(
            playlistCards.map(async (card) => {
              const imageUrl = await getImageUrl(card.coverImageId);
              return {
                id: card.id,
                title: card.name || 'Unnamed Playlist',
                type: 'Playlist',
                creator: card.creator || 'Spotify',
                image: imageUrl,
                coverImageId: card.coverImageId,
                description: card.description || 'No description available',
                songIds: card.songIds || [],
              };
            })
          );
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

    const imageUrl = await getImageUrl(playlist.coverImageId);
    const newItem = {
      id: playlist.id || `playlist-${Date.now()}`,
      title: playlist.name || playlist.title || 'Unnamed Playlist', // Đảm bảo tiêu đề được lấy đúng
      type: 'Playlist',
      creator: 'Spotify',
      image: imageUrl,
      coverImageId: playlist.coverImageId,
      description: playlist.description || 'No description available',
      songIds: playlist.songIds || [],
    };

    console.log('Adding to library:', newItem); // Debug dữ liệu khi thêm vào library

    if (!libraryItems.some((item) => item.id === newItem.id)) {
      try {
        await addPlaylistCard(userId, newItem.id);
        setLibraryItems((prevItems) => [...prevItems, newItem]);
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