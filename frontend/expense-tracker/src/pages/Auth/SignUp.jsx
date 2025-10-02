import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { uploadImage } from '../../utils/uploadImage';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle SignUp Form Submission
  const handleSignUp = async(e) => {
    e.preventDefault();

    if(!fullname) {
      setError('Please enter your full name');
      return;
    }
    if(!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if(!password) {
      setError('Please enter your password');
      return;
    }

    setError('');

    // Sign up API call
    try {
      // Upload image if present
      let profileImageUrl = "";
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }


      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName: fullname,
        email,
        password,
      });
      console.log("Register response:", response.data);
      // Nếu backend giống login, token nằm trong response.data.user.token
      const token = response.data.user.token;
      const profile = response.data.user.user; 

      if (token) {
        localStorage.setItem("token", token); 
        updateUser(profile);                   
        navigate("/dashboard");                
      }
    } catch (error) {
      console.error("Sign up error:", error.response?.data || error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }

  }

  return (
    <AuthLayout>
      <div className="lg:w-[80%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an account</h3>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector 
            image={profilePic}
            setImage={setProfilePic}
          />

          <Input 
            value={fullname}
            onChange={setFullName}
            label="Full Name"
            type="text"
            placeholder="H Nghia Nguyen"
          />

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
            Sign up
          </button>

          <p className="text-[12px] text-slate-600 mt-4">Already have an account? 
            <span className="text-primary cursor-pointer" onClick={() => navigate('/login')}> Login</span></p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp