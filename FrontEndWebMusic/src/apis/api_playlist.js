

const PLAYLIST_BASE_URL = 'http://localhost:8080/api/playlists';
const IMAGE_BASE_URL = 'http://localhost:8080/api/images';
const AUDIO_BASE_URL = 'http://localhost:8080/api/audios';
const SONG_BASE_URL = 'http://localhost:8080/api/songs';
const ARTIST_BASE_URL = 'http://localhost:8080/api/artists';

// Helper function to handle JSON responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

// Playlist APIs
export const getAllPlaylists = async () => {
  const response = await fetch(`${PLAYLIST_BASE_URL}`, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
  return handleResponse(response);
};

export const getPlaylist = async (id) => {
  const response = await fetch(`${PLAYLIST_BASE_URL}/${id}`, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
  return handleResponse(response);
};

export const getImageById = async (imageId) => {
  const response = await fetch(`${IMAGE_BASE_URL}/${imageId}`, { method: 'GET' });
  if (!response.ok) throw new Error('Failed to fetch image');
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

export const getPlaylistWithImage = async (id) => {
  const playlistResponse = await getPlaylist(id);
  const playlistData = playlistResponse.data;
  if (playlistData.coverImageId) {
    const imageUrl = await getImageById(playlistData.coverImageId);
    return { ...playlistResponse, data: { ...playlistData, imageUrl } };
  }
  return playlistResponse;
};

export const getAllPlaylistsWithImages = async () => {
  try {
    const playlistsResponse = await getAllPlaylists();
    const playlistsData = playlistsResponse.data;

    const playlistsWithImages = await Promise.all(
      playlistsData.map(async (playlist) => {
        if (playlist.coverImageId) {
          const imageUrl = await getImageById(playlist.coverImageId);
          return { ...playlist, imageUrl };
        }
        return playlist;
      })
    );

    return {
      ...playlistsResponse,
      data: playlistsWithImages
    };
  } catch (error) {
    throw error;
  }
};

// Audio APIs
// Fetch audio data by ID
export const getAudioData = async (audioId) => {
  try {
    const response = await fetch(`${AUDIO_BASE_URL}/${audioId}/data`, {
      method: 'GET',
      headers: {
        'Accept': 'audio/mpeg', // Ensure the client expects audio/mpeg
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch audio data: ${response.status} ${response.statusText}`);
    }

    const blob = await response.blob();
    const duration = response.headers.get('X-Duration');
    if (!blob || blob.size === 0) {
      throw new Error('Received empty audio data');
    }

    return { url: URL.createObjectURL(blob), duration };
  } catch (error) {
    console.error('Error in getAudioData:', error);
    throw error;
  }
};


// Song APIs
export const getSongById = async (songId) => {
  const response = await fetch(`${SONG_BASE_URL}/${songId}`, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
  return handleResponse(response);
};

export const getSongAudio = async (songId) => {
  const response = await fetch(`${SONG_BASE_URL}/${songId}/audios`, { method: 'GET' });
  if (!response.ok) throw new Error('Failed to fetch song audio');
  const blob = await response.blob();
  const duration = response.headers.get('X-Duration');
  return { url: URL.createObjectURL(blob), duration };
};

// Artist APIs
export const getArtistById = async (artistId) => {
  const response = await fetch(`${ARTIST_BASE_URL}/${artistId}`, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
  return handleResponse(response);
};

// Combined function to get song details with audio and artists
// api.js

export const getSongDetails = async (songId) => {
  const songResponse = await getSongById(songId);
  const songData = songResponse.data;

  console.log('Song data from API:', songData); // Kiểm tra dữ liệu từ Song

  const [audioData, artistData] = await Promise.all([
    songData.idAudio ? getAudioData(songData.idAudio) : null, // Lấy dữ liệu âm thanh từ idAudio
    Promise.all((songData.artistIds || []).map(id => getArtistById(id))),
  ]);

  const songDetails = {
    id: songId,
    title: songData.title,
    artists: artistData.map(artist => artist.data.name).join(', '),
    album: songData.category || 'Unknown Album',
    duration: audioData?.duration || '0:00',
    url: audioData?.url || '', // URL blob từ file .mp3
    imageUrl: songData.idImage ? await getImageById(songData.idImage) : null,
    idAudio: songData.idAudio, // Giữ idAudio để tham chiếu
    lyrics: songData.lyrics || '',
  };

  console.log('Song details after processing:', songDetails); // Kiểm tra dữ liệu sau xử lý
  return songDetails;
};

// Fetch all songs for a playlist
export const getPlaylistSongs = async (songIds) => {
  return Promise.all(songIds.map(songId => getSongDetails(songId)));
};


