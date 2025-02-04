import React, { useState } from "react";
import "./style.css"; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === 'user@example.com' && password === 'password123') {
      alert("Login Successful");
      
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-teal-400 to-pink-500">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-6"></h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
          {error && <div className="text-red-500 mb-4">{error}</div>}

          <label htmlFor="email" className="block text-lg text-gray-700 mb-2">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-2 border-teal-500 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <label htmlFor="password" className="block text-lg text-gray-700 mb-2">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-2 border-teal-500 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <button
            type="submit"
            className="w-full py-3 bg-teal-500 text-black font-semibold rounded-xl transform transition-all duration-300 hover:scale-105 hover:bg-teal-600"
          >
            Login
          </button>

          <div className="mt-4">
            <a href="/forgot-password" className="text-teal-500 hover:text-teal-700 text-sm">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
