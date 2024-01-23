import { auth } from '../firebase';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import mountain from './images/mountain.webp';
import EyeOpenIcon from './images/EyeOpenIcon';
import { Button } from "@/components/ui/button";
import EyeCloseIcon from './images/EyeCloseIcon';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const history = useHistory();
  const [err, setErr] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
        await signInWithEmailAndPassword(auth, email, password);
        history.push('/home');
    } catch (err) {
        setErr(true);
    }
  };

  const signup = () =>{
    history.push('/signup');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-violet-500"
    style={{ 
      backgroundImage: `url(${mountain})`, 
      backgroundSize: 'cover',
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(255, 255, 255, 0.3)'
      }} >
      <div className="w-full max-w-md p-6 border border-black rounded-2xl backdrop-blur-[2px] bg-opacity-50">
        <span className="text-3xl font-bold text-center block mb-4">Quiz App</span>
        <span className="text-xl font-semibold text-center block mb-8">Login</span>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="mb-2">
            <Label name="email">Email Id</Label>
            <Input id="email" type="email" required className="p-2 border rounded hover:border-gray-600 cursor-text "/>
          </div>
          <div className="mb-2">
            <Label htmlFor="terms">Password</Label>
            <div className="flex flex-row border border-black rounded hover:border-gray-600 cursor-text items-center">
              <Input id="password" type={showPassword ? "text" : "password"}   required className="border-none"/>
              {showPassword ? (
                <EyeOpenIcon
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                />
                ) : (
                <EyeCloseIcon
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-green">
              Sign in
            </Button>
          </div>
          {err && <span className="ml-[120px] text-red-500"> something went wrong </span>}
        </form>
        <p className="text-center mt-4">Don't have an account?</p>
        <Button onClick={signup} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue ml-[160px]">SignUp</Button>
      </div>
    </div>
  );
}

export default Login;
