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
  const [verificationData, setVerificationData] = useState({ code: "", expiresAt: null, isUsed: false });
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      sessionStorage.clear();
    }

    return () => {
      clearTimeout(timer);
    };
  }, [countdown]);

  const handleGetCode = async () => {
    if (countdown > 0) return;
    
    try {
      // Changed by: Mark Kelvin Cadelina
      /**Your verification code: ${response.data.verificationCode}
       * If Response 200 - Line 36 Alert ex: "Verification Sent Please Check Your Email"
       */
      try {
        const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expirationTime = Date.now() + 60000; 
        setVerificationData({ code: generatedCode, expiresAt: expirationTime, isUsed: false });
        setVerificationCode(generatedCode);
        setCountdown(60);
      } catch (error) {
        console.error("Error getting verification code:", error);
        alert("Failed to get verification code. Try again.");
      }

      const response = await axios.post("http://192.168.1.210:3000/verify", { recipient:email });
      if (response.status === 200) {
        setVerificationCode(response.data.verificationCode);
        alert(`"Verification Sent Please Check Your Email"`);
        sessionStorage.setItem(response.data.verificationCode, "Valid")
        setCountdown(60);
      }
    } catch (error) {
      console.error("Error getting verification code:", error);
      alert("Failed to get verification code. Try again.");
    }
  };
  /**
   * Sa Register Pwede ra sad na ani rasad e verify 
   * E Compare lang ang na store na data sa verificationCode from Line 35
   * 
   * Create dummy data for verificationCode was Expire, Valid 
   * Ex: it Will Expire in 60s after 60s verificationCode will be Invalid 
   * if Successful verificationCode will automatically marked as Exipre
   */
  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (enteredCode != verificationCode) {
      setError("Registration Failed!");
      setLoading(false);
    }

    if (enteredCode == verificationCode || sessionStorage.getItem(verificationCode) == "Valid") {
      setError("Registration Sucessful!");
      sessionStorage.clear();
      setVerificationCode("");
      setLoading(false);
    }



    // if (!verificationData.code ||  Date.now() > verificationData.expiresAt) {
    //   setError("Verification code has already expired.");
    //   return;
    // } 
    // if (verificationData.isUsed || enteredCode === verificationData.code) {
    //   setError("Verification code is invalid or has already been used. Please request a new one.");
    //   return;
    // }
    // if (enteredCode !== verificationData.code) {
    //   setError("Registration Sucessful!");
    //   return;  
    // }
  
    
    
  };  

  const handleExit = () => {
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-green-100">
      <div className="w-90 bg-aqua p-1 rounded shadow-md relative">
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
              countdown > 0 ? "bg-gray-400" : "bg-green-500"
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



