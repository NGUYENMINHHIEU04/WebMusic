// import React, { useState } from 'react';
// import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
// import SocialLogin from './SocialLogin';

// const API_URL = "http://localhost:8080/api/auth/sign-up"; // Thay thế bằng API thực tế của bạn

// function RegisterForm({ isActive }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [firstname, setFirstname] = useState('');
//   const [lastname, setLastname] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password, firstname, lastname }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccess("Registration successful! You can now log in.");
//       } else {
//         setError(data.message || "Registration failed!");
//       }
//     } catch (error) {
//       setError("Network error, please try again.");
//     }
//   };

//   return (
//     <div className={`absolute right-0 w-1/2 h-full bg-white flex items-center justify-center text-center p-10 transition-all duration-1000 ease-in-out ${isActive ? 'right-1/2' : 'invisible'} z-10`}>
//       <form className="w-full" onSubmit={handleRegister}>
//         <h1 className="text-4xl text-green-900 font-bold mb-4">Registration</h1>

//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         {success && <p className="text-green-500 mb-4">{success}</p>}

//         <div className="relative my-6">
//           <input
//             type="text"
//             placeholder="First Name"
//             value={firstname}
//             onChange={(e) => setFirstname(e.target.value)}
//             className="w-full px-5 py-3 bg-gray-100 rounded-lg border-none outline-none text-lg font-medium text-gray-800 placeholder-gray-500"
//             required
//           />
//           <FaUser className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
//         </div>

//         <div className="relative my-6">
//           <input
//             type="text"
//             placeholder="Last Name"
//             value={lastname}
//             onChange={(e) => setLastname(e.target.value)}
//             className="w-full px-5 py-3 bg-gray-100 rounded-lg border-none outline-none text-lg font-medium text-gray-800 placeholder-gray-500"
//             required
//           />
//           <FaUser className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
//         </div>

//         <div className="relative my-6">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-5 py-3 bg-gray-100 rounded-lg border-none outline-none text-lg font-medium text-gray-800 placeholder-gray-500"
//             required
//           />
//           <FaEnvelope className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
//         </div>

//         <div className="relative my-6">
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-5 py-3 bg-gray-100 rounded-lg border-none outline-none text-lg font-medium text-gray-800 placeholder-gray-500"
//             required
//           />
//           <FaLock className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
//         </div>

//         <button type="submit" className="w-full py-3 bg-green-900 rounded-lg text-white font-semibold text-lg shadow-md hover:bg-green-600 transition-all">
//           Register
//         </button>

//         <p className="my-4 text-gray-600">or register with social platforms</p>
//         <SocialLogin />
//       </form>
//     </div>
//   );
// }

// export default RegisterForm;

import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import SocialLogin from './SocialLogin';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { API_BASE_URL } from '../apis/api';

const API_URL = `${API_BASE_URL}/auth/sign-up`;

function RegisterForm({ isActive }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState(''); // Rename to firstName
  const [lastName, setLastName] = useState('');   // Rename to lastName
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // For redirecting after success

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstName, lastName }), // Use camelCase to match backend
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate('/auth'); // Redirect to login page after 2 seconds
        }, 2000);
      } else {
        setError(data.message || "Registration failed!");
      }
    } catch (error) {
      setError("Network error, please try again.");
    }
  };

  return (
    <div className={`absolute right-0 w-1/2 h-full bg-white flex items-center justify-center text-center p-10 transition-all duration-1000 ease-in-out ${isActive ? 'right-1/2' : 'invisible'} z-10`}>
      <form className="w-full" onSubmit={handleRegister}>
        <h1 className="text-4xl text-green-900 font-bold mb-4">Registration</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <div className="relative my-6">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-5 py-3 bg-gray-100 rounded-lg border-none outline-none text-lg font-medium text-gray-800 placeholder-gray-500"
            required
          />
          <FaUser className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
        </div>

        <div className="relative my-6">
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-5 py-3 bg-gray-100 rounded-lg border-none outline-none text-lg font-medium text-gray-800 placeholder-gray-500"
            required
          />
          <FaUser className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
        </div>

        <div className="relative my-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 bg-gray-100 rounded-lg border-none outline-none text-lg font-medium text-gray-800 placeholder-gray-500"
            required
          />
          <FaEnvelope className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
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

        <button type="submit" className="w-full py-3 bg-green-900 rounded-lg text-white font-semibold text-lg shadow-md hover:bg-green-600 transition-all">
          Register
        </button>

        <p className="my-4 text-gray-600">or register with social platforms</p>
        <SocialLogin />
      </form>
    </div>
  );
}

export default RegisterForm;