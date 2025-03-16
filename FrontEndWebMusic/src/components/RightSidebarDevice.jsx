import React from "react";

const RightSidebarDevice = ({ onClose }) => {
  const devices = [
    { id: 1, name: "Loa Bluetooth", type: "Bluetooth" },
    { id: 2, name: "TV Samsung", type: "Chromecast" },
    { id: 3, name: "Headphone Sony", type: "Bluetooth" },
  ];

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
      <div className=" bg-gray-900 text-white p-5 rounded-lg h-screen overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Kết nối thiết bị</h2>
          <button
            onClick={onClose}
            className="text-sm font-semibold hover:text-green-500"
          >
            Đóng
          </button>
        </div>
        <ul>
          {devices.map((device) => (
            <li key={device.id} className="mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{device.name}</p>
                  <p className="text-sm text-gray-400">{device.type}</p>
                  <p className="font-semibold">{device.name}</p>
                  <p className="text-sm text-gray-400">{device.type}</p>
                  <p className="font-semibold">{device.name}</p>
                  <p className="text-sm text-gray-400">{device.type}</p>
                  <p className="font-semibold">{device.name}</p>
                  <p className="text-sm text-gray-400">{device.type}</p>
                  
                </div>
                <button className="text-sm text-green-500 hover:text-green-400">
                  Kết nối
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default RightSidebarDevice;