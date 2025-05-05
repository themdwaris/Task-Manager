"use client";
import Loader from "@/components/Loader";
import { useUserTask } from "@/context/UserTaskContext";
import axios from "axios";
// import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  
  const [authState, setAuthState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading]=useState(false)
  const {router}=useUserTask()

  const authHandler = async(e) => {
    e.preventDefault();
    if(authState==="register"){
      try {
        setLoading(true)
        const res = await axios.post(`/api/signup`,{name,email,password})
        if(res?.data?.success){
          toast.success(res?.data?.message)
          setAuthState("login")
          setLoading(false)
        }else{
          setLoading(false)
          toast.error(res.data.message)
        }
      } catch (error) {
        setLoading(false)
        toast.error(res.data.message)
        console.log("Failed to sign up ::",error);
        
      }
    }else{
      try {
        setLoading(true)
        const res = await axios.post('/api/login',{email,password})
      if(res?.data?.success){
        router.push("/")
        toast.success(res?.data?.message)
        setLoading(false)
      }
      } catch (error) {
        setLoading(false)
        console.log("Failed to login ::",error);
        
      }
    }
  };
  return (
    <div className="px-5 w-full h-[70vh] md:h-screen flex justify-center items-center">
      <div className="w-full max-w-[450px] mx-auto rounded-md">
        <h1 className="text-center text-4xl font-bold my-10">
          Sign&nbsp;
          <span className="text-green-700">
            {authState === "login" ? "In" : "Up"}
          </span>
          <p className="text-base pt-5 font-normal">
            {authState === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            {authState === "login" ? (
              <span
                className="text-sm underline text-green-600 cursor-pointer"
                onClick={() => setAuthState("register")}
              >
                &nbsp;Sign Up
              </span>
            ) : (
              <span
                className="text-sm underline text-green-600 cursor-pointer"
                onClick={() => setAuthState("login")}
              >
                &nbsp;Login
              </span>
            )}
          </p>
        </h1>
        <form
          onSubmit={authHandler}
          className="w-full flex items-center flex-col justify-center gap-4"
        >
          {authState === "register" && (
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/15 border-b-2 border-green-700 outline-none"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/15 border-b-2 border-green-700 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/15 border-b-2 border-green-700 outline-none"
          />

          <button type="submit" disabled={loading} className={`w-full flex justify-center items-center gap-2.5 mt-5 p-3 rounded-lg bg-green-700 text-[18px] cursor-pointer transition transform active:scale-90 select-none ${loading&&"opacity-70"}`}>
            <span>{authState === "login" ? "Login" : "Sign Up"}</span> {loading&&<Loader/>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
