import React from "react";

const RightSidebarSingerInformation = ({ singer }) => {
  return (
    <div className="w-1/5 bg-gray-900 text-white p-5 rounded-lg">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Thông tin ca sĩ</h2>
      </div>
      <div className="flex flex-col items-center">
        <img
          src={singer.image}
          alt={singer.name}
          className="w-24 h-24 rounded-full mb-4"
        />
        <h3 className="text-lg font-semibold">{singer.name}</h3>
        <p className="text-sm text-gray-400">{singer.bio}</p>
      </div>
    </div>
  );
};

export default RightSidebarSingerInformation;