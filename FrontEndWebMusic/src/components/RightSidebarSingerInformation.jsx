// import React from "react";

// const RightSidebarSingerInformation = ({ singer }) => {
//   return (
//     <>
//       <style>
//         {`
//           /* Custom scrollbar styling inspired by Spotify */
//           .custom-scrollbar::-webkit-scrollbar {
//             width: 8px;
//           }

//           .custom-scrollbar::-webkit-scrollbar-track {
//             background: transparent;
//           }

//           .custom-scrollbar::-webkit-scrollbar-thumb {
//             background: #4a5568;
//             border-radius: 4px;
//           }

//           .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//             background: #6b7280;
//           }
//         `}
//       </style>
//       <div className=" bg-gray-900 text-white p-5 rounded-lg h-screen overflow-y-auto custom-scrollbar">
//         <div className="mb-6">
//           <h2 className="text-xl font-bold">Thông tin ca sĩ</h2>
//         </div>
//         <div className="flex flex-col items-center">
//           <img
//             src={singer.image}
//             alt={singer.name}
//             className="w-24 h-24 rounded-full mb-4"
//           />
//           <h3 className="text-lg font-semibold">{singer.name}</h3>
//           <p className="text-sm text-gray-400">{singer.bio}</p>
//           <img
//             src={singer.image}
//             alt={singer.name}
//             className="w-24 h-24 rounded-full mb-4"
//           />
//           <h3 className="text-lg font-semibold">{singer.name}</h3>
//           <p className="text-sm text-gray-400">{singer.bio}</p>
//           <img
//             src={singer.image}
//             alt={singer.name}
//             className="w-24 h-24 rounded-full mb-4"
//           />
//           <h3 className="text-lg font-semibold">{singer.name}</h3>
//           <p className="text-sm text-gray-400">{singer.bio}</p>
//           <img
//             src={singer.image}
//             alt={singer.name}
//             className="w-24 h-24 rounded-full mb-4"
//           />
//           <h3 className="text-lg font-semibold">{singer.name}</h3>
//           <p className="text-sm text-gray-400">{singer.bio}</p>
//           <img
//             src={singer.image}
//             alt={singer.name}
//             className="w-24 h-24 rounded-full mb-4"
//           />
//           <h3 className="text-lg font-semibold">{singer.name}</h3>
//           <p className="text-sm text-gray-400">{singer.bio}</p>

//         </div>
//       </div>
//     </>
//   );
// };

// export default RightSidebarSingerInformation;

import React, { useEffect, useState } from 'react';
import { getImage } from '../apis/api_image'; // Thêm import từ api_image.js

const RightSidebarSingerInformation = ({ selectedArtist }) => {
  const [artistImage, setArtistImage] = useState('https://via.placeholder.com/150'); // Default image

  useEffect(() => {
    const fetchArtistImage = async () => {
      if (selectedArtist && selectedArtist.imageId) {
        try {
          const imageUrl = await getImage(selectedArtist.imageId);
          setArtistImage(imageUrl);
        } catch (error) {
          console.error('Error fetching artist image:', error);
          setArtistImage('https://via.placeholder.com/150'); // Fallback image
        }
      }
    };

    fetchArtistImage();
  }, [selectedArtist]);

  return (
    <>
      <style>
        {`
          /* Custom scrollbar styling inspired by Spotify */
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #4a5568;
            border-radius: 4px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #6b7280;
          }
        `}
      </style>
      <div className="bg-gray-900 text-white p-5 rounded-lg h-screen overflow-y-auto custom-scrollbar">
        <div className="mb-6">
          <h2 className="text-xl font-bold">Thông tin ca sĩ</h2>
        </div>
        {selectedArtist ? (
          <div className="flex flex-col items-center">
            <img
              src={artistImage}
              alt={selectedArtist.name}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold">{selectedArtist.name}</h3>
            <p className="text-sm text-gray-400">{selectedArtist.description || 'No description available'}</p>
          </div>
        ) : (
          <p className="text-gray-400">Select a song to view artist information.</p>
        )}
      </div>
    </>
  );
};

export default RightSidebarSingerInformation;