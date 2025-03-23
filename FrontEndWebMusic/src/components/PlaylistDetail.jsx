import React from 'react';

const PlaylistDetail = ({ playlist, onBack, isPlaying, setIsPlaying, onTrackSelect }) => {
  const tracks = [
    {
      id: 1,
      title: 'Call Me Up - Braaten & Chrit Leaf Remix',
      artist: 'Braaheim, Braaten & Chrit Leaf',
      album: 'Call Me Up (Braaten & Chrit Leaf Remix)',
      duration: '2:48',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Thêm URL bài hát
    },
    {
      id: 2,
      title: 'This is What You Came For',
      artist: 'YES YES, Tesbter, H.I.S.E.',
      album: 'This is What You Came For',
      duration: '2:41',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', // Thêm URL bài hát
    },
    {
      id: 3,
      title: 'We Are The People',
      artist: 'BRAN',
      album: 'We Are The People',
      duration: '2:42',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', // Thêm URL bài hát
    },
  ];

  const handlePlayPauseClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTrackClick = (track) => {
    onTrackSelect(track); // Gọi callback để truyền thông tin bài hát lên Homepage
    setIsPlaying(true); // Tự động phát bài hát khi chọn
  };

  return (
    <div className="bg-gray-800 p-5 text-white rounded-lg h-screen overflow-y-auto custom-scrollbar font-sans">
      <div className="flex items-center mb-5">
        <button
          className="text-gray-400 hover:text-white mr-3"
          onClick={onBack}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <img
          src={playlist.image}
          alt={playlist.title}
          className="w-40 h-40 object-cover mr-5"
        />
        <div>
          <p className="text-sm text-gray-400">Playlist</p>
          <h1 className="text-4xl font-bold">{playlist.title}</h1>
          <p className="text-gray-400 mt-2">{playlist.artists}</p>
          <p className="text-gray-400 text-sm">
            Spotify • 50 songs, about 1 hr 45 min
          </p>
        </div>
      </div>

      <div className="flex items-center mb-5">
        <button
          className="bg-[#1DB954] rounded-full w-12 h-12 flex items-center justify-center mr-3 hover:bg-[#1ED760] transition-colors duration-200"
          onClick={handlePlayPauseClick}
        >
          {isPlaying ? (
            <svg
              className="w-6 h-6 text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button className="text-gray-400 hover:text-white mr-3">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
        <button className="text-gray-400 hover:text-white">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="text-gray-400">
        <div className="grid grid-cols-12 gap-4 border-b border-gray-700 pb-2 mb-3">
          <div className="col-span-1">#</div>
          <div className="col-span-5">Title</div>
          <div className="col-span-4">Album</div>
          <div className="col-span-2 text-right">⏳</div>
        </div>
        {tracks.map((track) => (
          <div
            key={track.id}
            className="grid grid-cols-12 gap-4 py-2 hover:bg-[#282828] rounded-md cursor-pointer"
            onClick={() => handleTrackClick(track)} // Thêm sự kiện onClick
          >
            <div className="col-span-1">{track.id}</div>
            <div className="col-span-5">
              <p className="text-white">{track.title}</p>
              <p className="text-sm text-gray-400">{track.artist}</p>
            </div>
            <div className="col-span-4">{track.album}</div>
            <div className="col-span-2 text-right">{track.duration}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistDetail;