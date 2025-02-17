import React from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import SocialLogin from './SocialLogin';

function RegisterForm({ isActive }) {
  return (
    <div className={`absolute right-0 w-1/2 h-full bg-white flex items-center justify-center text-center p-10 transition-all duration-1000 ease-in-out ${isActive ? 'right-1/2' : 'invisible'} z-10`}>
          <form className="w-full">
            <h1 className="text-4xl text-purple-500 font-bold mb-4">Registration</h1>
            <div className="relative my-6">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-5 py-3 bg-gray-100 rounded-lg border-none outline-none text-lg font-medium text-gray-800 placeholder-gray-500"
                required
              />
              <FaUser className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
            </div>
            <div className="relative my-6">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-5 py-3 bg-gray-100 rounded-lg border-none outline-none text-lg font-medium text-gray-800 placeholder-gray-500"
                required
              />
              <FaEnvelope className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
            </div>
            <div className="relative my-6">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-5 py-3 bg-gray-100 rounded-lg border-none outline-none text-lg font-medium text-gray-800 placeholder-gray-500"
                required
              />
              <FaLock className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
            </div>
            <button type="submit" className="w-full py-3 bg-purple-500 rounded-lg text-white font-semibold text-lg shadow-md hover:bg-purple-600 transition-all">
              Register
            </button>
            <p className="my-4 text-gray-600">or register with social platforms</p>
        <SocialLogin />
      </form>
    </div>
  );
}

export default RegisterForm;
