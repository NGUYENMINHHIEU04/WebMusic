import React from "react";

const RightSidebarDevice = ({ onClose }) => {
  // Danh sách thiết bị mẫu
  const devices = [
    { id: 1, name: "Loa Bluetooth", type: "Bluetooth" },
    { id: 2, name: "TV Samsung", type: "Chromecast" },
    { id: 3, name: "Headphone Sony", type: "Bluetooth" },
  ];

  return (
    <div className="w-1/5 bg-gray-900 text-white p-5 rounded-lg">
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
              </div>
              <button className="text-sm text-green-500 hover:text-green-400">
                Kết nối
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RightSidebarDevice;