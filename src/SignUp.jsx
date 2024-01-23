import { auth, db} from "../firebase";
import React, { useState } from 'react';
import mountain from './images/mountain.webp';
import { useHistory } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EyeOpenIcon from './images/EyeOpenIcon';
import { Button } from "@/components/ui/button";
import EyeCloseIcon from './images/EyeCloseIcon';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";


const SignUp=()=>{
    const history = useHistory();
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const handleSubmit=async(e)=>{
        e.preventDefault();
        const displayName = e.target[0].value.toLowerCase();
        const email = e.target[1].value;
        const password = e.target[2].value;
        
        const usernameCheckRef = doc(db, "users", displayName);
        const usernameCheckSnapshot = await getDoc(usernameCheckRef);
        console.log("Username exists:", usernameCheckSnapshot.exists());

        if (usernameCheckSnapshot.exists()) {
            alert("Username is already taken. Please choose a different username.");
            return;
        }
        
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db,"users",res.user.uid),{
                uid:res.user.uid,
                displayName,
                email,
                password,
            });
            history.push("/home");
        } catch (err) {
            console.log(err.code, err.message);
            setLoading(false);
            if (err.code === 'auth/email-already-in-use') {
                alert('Email is already in use. Please choose a different email or log in.');
            } else {
                setErr(true);
            }
        }
    };

    const login=()=> {
        history.push('/');
    }

    return (
        <div className='h-screen flex items-center justify-center bg-violet-500'
        style={{ 
        backgroundImage: `url(${mountain})`, 
        backgroundSize: 'cover',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.3)'
        }}
        >
            <div className='w-full max-w-md p-6 border border-black rounded-2xl'>
                <span className="text-3xl font-semiblod text-center block mb-4">Quiz App</span>
                <span className="text-xl font-semibold text-center block mb-8">Sign Up</span>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label name="username" className="font-semibold text-gray-800">Username</Label>
                        <Input id="username" className="p-2 border rounded hover:border-gray-600 cursor-text" placeholder="Enter name" required />
                    </div>
                    <div className="mb-4">
                        <Label name="email" className="font-semibold text-gray-800">Email</Label>
                        <Input id="email" type="email" className="p-2 border rounded bg-none hover:border-gray-600 cursor-text" placeholder="Enter Email Id" required />
                    </div>
                    <div className="mb-4">
                        <Label name="password" className="font-semibold text-gray-800">Password</Label>
                        <div className="flex flex-row items-center border border-black rounded hover:border-gray-600 cursor-text">
                            <Input id="password" type={showPassword ? "text" : "password"} className="border-none" placeholder="Minimum of 6 characters" required/>
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
                        <Button  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-green" type="submit">
                            Sign up
                        </Button>
                    </div>
                    {err && <span className='ml-[117px] text-red-500 '>Something went wrong</span>}
                </form>
                <p className="text-center mt-4">Already have an account?</p>
                <Button onClick={login} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue ml-[163px]">Login</Button>
            </div>
        </div>
    );
};

export default SignUp;