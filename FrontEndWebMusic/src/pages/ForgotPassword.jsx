// src/pages/ForgotPassword.jsx
import React from 'react';

const ForgotPassword = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-100">
      <div className="w-[400px] bg-white rounded-3xl shadow-2xl p-8 text-center">
        <h1 className="text-4xl text-purple-500 font-bold mb-6">Forgot Password</h1>
        <form>
          <div className="relative my-6">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-5 py-3 bg-gray-100 rounded-lg border-none outline-none text-lg font-medium text-gray-800 placeholder-gray-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-purple-500 rounded-lg text-white font-semibold text-lg shadow-md hover:bg-purple-600 transition-all"
          >
            Reset Password
          </button>
        </form>
        <p className="mt-4 text-gray-600">
          Remember your password?{' '}
          <a href="/login" className="text-purple-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;