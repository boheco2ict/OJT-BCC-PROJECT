import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleGetCode = async () => {
    if (countdown > 0) return;
    try {
      const response = await axios.post("http://localhost:5000/get-code", { email });
      if (response.status === 200) {
        setVerificationCode(response.data.verificationCode);
        alert(`Your verification code: ${response.data.verificationCode}`);
        setCountdown(60);
      }
    } catch (error) {
      console.error("Error getting verification code:", error);
      alert("Failed to get verification code. Try again.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isVerified) {
      setError("Please verify your email before registering.");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.post("http://localhost:5000/register", { username, email, password });
      if (response.status === 200) {
        alert("Registration successful! Redirecting to login.");
        navigate("/login");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };  

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/verify-code", { email, code: enteredCode });
      if (response.status === 200) {
        setIsVerified(true);
        alert("Verification successful!");
      }
    } catch (error) {
      setError("Incorrect verification code.");
    }
  };
  

  const handleExit = () => {
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-green-100">
      <div className="w-96 bg-white p-6 rounded shadow-md relative">
        <div className="absolute top-4 right-4 cursor-pointer" onClick={handleExit}>
          <span className="text-2xl text-red-600">X</span>
        </div>

        <h2 className="text-5xl font-bold mb-4 text-center">
          {isVerified ? "Registration Complete!" : "Register"}
        </h2>

        {!isVerified ? (
          <form onSubmit={handleRegister}>
            <label className="block mb-2">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border p-2 mb-4 w-full"
            />

            <label className="block mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border p-2 mb-4 w-full"
            />

            <label className="block mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border p-2 mb-4 w-full"
            />

            <label className="block mb-2">Enter Verification Code:</label>
            <div className="relative mb-4">
             <input
               type="text"
                value={enteredCode}
                onChange={(e) => setEnteredCode(e.target.value)}
                maxLength={6}
                required
             className="border p-2 w-full pr-20" 
             />
             <button
              type="button"
              onClick={handleGetCode}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 width-1/4 ${
              countdown > 0 ? "bg-gray-400" : "bg-blue-500"
              } text-white rounded`}
              disabled={countdown > 0}
              >
             {countdown > 0 ? `Wait ${countdown}s` : "Get Code"}
          </button>
          </div>

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded w-full"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Go to Login
          </button>
        )}

        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
      </div>
    </div>
  );
}

export default Register;



