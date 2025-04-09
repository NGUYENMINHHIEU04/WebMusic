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
          // Tạo "Liked Songs" mặc định trước khi lấy dữ liệu từ API
          const defaultLikedSongs = {
            id: `liked-songs-${userId}`, // ID duy nhất cho mỗi user
            title: 'Liked Songs',
            type: 'Playlist',
            creator: 'You',
            image: 'https://misc.scdn.co/liked-songs/liked-songs-300.png', // Hình ảnh mặc định cho "Liked Songs" (có thể thay đổi)
            coverImageId: null, // Không cần coverImageId vì không lưu vào backend
            description: 'Your favorite songs',
            songIds: [], // Danh sách bài hát yêu thích, ban đầu rỗng
          };

          // Lấy dữ liệu từ API
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
                creator: card.creator || 'LmhMusic',
                image: imageUrl,
                coverImageId: card.coverImageId,
                description: card.description || 'No description available',
                songIds: card.songIds || [],
              };
            })
          );

          // Kết hợp "Liked Songs" với dữ liệu từ API
          // Đảm bảo "Liked Songs" không bị ghi đè nếu đã tồn tại
          setLibraryItems((prevItems) => {
            const hasLikedSongs = prevItems.some((item) => item.id === defaultLikedSongs.id);
            const updatedItems = formattedItems.filter((item) => item.id !== defaultLikedSongs.id); // Loại bỏ "Liked Songs" từ API nếu có
            return hasLikedSongs
              ? [
                  prevItems.find((item) => item.id === defaultLikedSongs.id), // Giữ nguyên "Liked Songs" hiện tại
                  ...updatedItems,
                ]
              : [defaultLikedSongs, ...updatedItems]; // Thêm "Liked Songs" nếu chưa có
          });
        } catch (error) {
          console.error('Failed to fetch library:', error);
        }
      } else {
        // Nếu người dùng đăng xuất, reset libraryItems
        setLibraryItems([]);
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
      title: playlist.name || playlist.title || 'Unnamed Playlist',
      type: 'Playlist',
      creator: 'LmhMusic',
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

    // Không cho phép xóa "Liked Songs"
    if (playlistId === `liked-songs-${userId}`) {
      alert('Cannot remove "Liked Songs" from your library.');
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

  // Hàm để thêm bài hát vào "Liked Songs"
  const addToLikedSongs = (song) => {
    if (!isLoggedIn || !userId) {
      alert('Please log in to add to Liked Songs.');
      return;
    }

    setLibraryItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === `liked-songs-${userId}`) {
          // Kiểm tra xem bài hát đã có trong "Liked Songs" chưa
          const songExists = item.songIds.includes(song.id);
          if (!songExists) {
            return {
              ...item,
              songIds: [...item.songIds, song.id], // Thêm ID bài hát vào songIds
            };
          }
        }
        return item;
      });
    });
  };

  return (
    <LibraryContext.Provider value={{ libraryItems, addToLibrary, removeFromLibrary, addToLikedSongs }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => useContext(LibraryContext);