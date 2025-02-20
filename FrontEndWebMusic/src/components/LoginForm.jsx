import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import SocialLogin from './SocialLogin';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:8080/api/auth/sign-in"; // Thay thế bằng API của bạn

function LoginForm({ isActive }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Điều hướng sau khi đăng nhập thành công

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Xóa lỗi trước đó

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token); // Lưu token vào localStorage
        navigate("/home"); // Chuyển hướng đến trang chính
      } else {
        setError(data.message || "Invalid credentials!");
      }
    } catch (error) {
      setError("Network error, please try again.");
    }
  };

  return (
    <div className={`absolute right-0 w-1/2 h-full bg-white flex items-center justify-center text-center p-10 transition-all duration-1000 ease-in-out ${isActive ? 'right-1/2' : ''} z-10`}>
      <form className="w-full" onSubmit={handleLogin}>
        <h1 className="text-4xl text-purple-500 font-bold mb-4">Login</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="relative my-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 bg-gray-100 rounded-lg border-none outline-none text-lg font-medium text-gray-800 placeholder-gray-500"
            required
          />
          <FaUser className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
        </div>

        <div className="relative my-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3 bg-gray-100 rounded-lg border-none outline-none text-lg font-medium text-gray-800 placeholder-gray-500"
            required
          />
          <FaLock className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
        </div>

        <div className="my-4">
          <Link to="/forgot-password" className="text-sm text-gray-800 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button type="submit" className="w-full py-3 bg-purple-500 rounded-lg text-white font-semibold text-lg shadow-md hover:bg-purple-600 transition-all">
          Login
        </button>

        <p className="my-4 text-gray-600">or login with social platforms</p>
        <SocialLogin />
      </form>
    </div>
  );
}

export default LoginForm;
