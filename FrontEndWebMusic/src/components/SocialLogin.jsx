import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple } from 'react-icons/fa';
import { FaPhone } from "react-icons/fa6";

function SocialLogin() {
  return (
    <div className="flex justify-center space-x-4">
      <a href="#" className="p-2 border-2 border-gray-300 rounded-lg text-gray-800 hover:bg-gray-100 transition-all"><FcGoogle className="text-2xl" /></a>
      <a href="#" className="p-2 border-2 border-gray-300 rounded-lg text-gray-800 hover:bg-gray-100 transition-all"><FaFacebook className="text-2xl text-blue-600" /></a>
      <a href="#" className="p-2 border-2 border-gray-300 rounded-lg text-gray-800 hover:bg-gray-100 transition-all"><FaApple className="text-2xl" /></a>
      <a href="#" className="p-2 border-2 border-gray-300 rounded-lg text-gray-800 hover:bg-gray-100 transition-all"><FaPhone className="text-2xl text-green-600" /></a>
    </div>
  );
}

export default SocialLogin;