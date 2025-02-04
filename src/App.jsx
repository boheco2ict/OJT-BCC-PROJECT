import { useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col justify-start items-center bg-gradient-to-r from-blue-800 to-purple-700">
    <h1 className="text-5xl font-extrabold text-white mb-6 mt-12 tracking-normal drop-shadow-lg">Welcome to My App</h1>
      <div className="space-y-4 w-full max-w-md px-8 py-10 bg-white bg-opacity-80 shadow-xl backdrop-blur-lg">
        <button
          onClick={() => navigate('/login')}
          className="w-full px-5 py-4 bg-teal-500 text-white font-semibold shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-1xl"
        >
          Login   
        </button>
        <button
          onClick={() => navigate('/register')}
          className="border w-full px-5 py-4 bg-green-500 text-white font-semibold shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          Register
        </button>
      </div>
    </div>
  );
}

function Login() {
  const navigate = useNavigate();
  return ( 
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-3 mb-4 border"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 mb-4 border"
          />
          <Link
            to="/forgot-password" 
            className="text-sm text-blue-600 hover:underline block text-right mb-4"
          >
            Forgot Password?
          </Link>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-3 transform transition-all duration-300 hover:scale-105"
          >
            Log In
          </button>
        </form>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-red-500 text-white py-2 px-4 w-full"
        >
          Exit
        </button>
      </div>
    </div>
  );
}

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email format.');
      return;
    }

    setStep(2);
    alert(`A verification code has been sent to ${email}.`);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (verificationCode === '123456') {
      setIsVerified(true);
      alert('Verification successful! You can now log in.');
      setStep(3);
    } else {
      setErrorMessage('Invalid verification code.');
    }
  };

  return (
    
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-sm bg-white p-6 shadow-md">

        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        {step === 1 && (
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 mb-4 border"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 mb-4 border"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 mb-4 border"
            />
            <button type="submit" className="w-full bg-green-500 text-black py-3">
              Register
            </button>
          </form>
        )}

        {step === 2 && !isVerified && (
          <div className="mt-6">
            <p className="text-gray-600 text-center mb-4">Please enter the verification code sent to your email:</p>
            <form onSubmit={handleVerify}>
              <input
                type="text"
                placeholder="Verification Code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
                required
                className="w-full px-4 py-3 mb-4 border"
              />
              <button type="submit" className="w-full bg-yellow-500 text-black py-3">
                Verify
              </button>
            </form>
          </div>
        )}

        {isVerified && step === 3 && (
          <p className="text-green-600 text-center mt-4">Account verified! You can now log in.</p>
        )}

        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-red-500 text-white py-2 px-4 w-full"
        >
          Exit
        </button>
      </div>
    </div>
  );
}

const appStyles = {
  backgroundImage: "url('/background.jpeg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  minHeight: "100vh",
};

function App() {
  return (
    <div style={appStyles}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}


export default App;


