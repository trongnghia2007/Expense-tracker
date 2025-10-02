import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout';
import { useState , useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { UserContext } from '../../context/userContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Handle Login Form Submission
  const handleLogin = async(e) => {
    e.preventDefault();

    if(!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if(!password) {
      setError('Please enter your password');
      return;
    }

    setError('');


    // Login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      console.log("Login response:", response.data);

      // Extract token and user data from the response
      const token = response.data.user.token; 
      const profile = response.data.user.user;  
      if (token) {
        // Store token in localStorage to keep user logged in
        localStorage.setItem("token", token);
        updateUser(profile); 
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[80%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px) mb-6">Enter your details to log in</p>

        <form onSubmit={handleLogin}>
          <Input 
            value={email}
            onChange={setEmail}
            label="Email"
            type="text"
            placeholder="email@example.com"
          />

          <Input 
            value={password}
            onChange={setPassword}
            label="Password"
            type="password"
            placeholder="Min 8 characters"
          />

          {error && <p className="text-red-500 text-[12px] -mt-2 mb-2">{error}</p>}

          <button type="submit" className="w-full bg-primary text-white py-3 rounded mt-4 hover:opacity-90 transition-opacity">
            Log In
          </button>

          <p className="text-[12px] text-slate-600 mt-4">Don't have an account? <span className="text-primary cursor-pointer" onClick={() => navigate('/signup')}>Sign Up</span></p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login