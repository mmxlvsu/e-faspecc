import React, { useState } from "react";
import hideIcon from "../assets/hide.png"; 
import backIcon from "../assets/back.png"; 

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-screen h-screen relative bg-white font-poppins px-[5vw]">
      {/* Back button */}
      <img
        src={backIcon}
        alt="Back"
        className="absolute cursor-pointer"
        style={{ left: "3vw", top: "7vh", width: "6vw", height: "6vw" }}
        onClick={() => alert("Back clicked")}
      />

      {/* "Welcome Back!" */}
      <h1
        className="absolute font-extrabold text-black leading-tight"
        style={{ 
          left: "8vw", 
          top: "22vh", 
          fontSize: "8vw", 
          width: "80vw" 
        }}
      >
        Welcome Back!
      </h1>

      <p
        className="absolute font-semibold text-[#36570A]"
        style={{ 
          left: "8.5vw", 
          top: "28vh", 
          fontSize: "3.5vw", 
          width: "60vw" 
        }}
      >
        Good to see you again
      </p>

      {/* Email input */}
      <input
        type="email"
        placeholder="Email Address"
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{ 
          top: "35vh", 
          left: "7vw", 
          width: "86vw", 
          height: "7vh", 
          backgroundColor: "rgba(54, 87, 10, 0.2)", 
          fontSize: "3.8vw" 
        }}
      />

      {/* Password input */}
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{ 
          top: "44vh", 
          left: "7vw", 
          width: "86vw", 
          height: "7vh", 
          backgroundColor: "rgba(54, 87, 10, 0.2)", 
          fontSize: "3.8vw" 
        }}
      />
      <img
        src={hideIcon}
        alt="Toggle Password"
        className="absolute cursor-pointer"
        style={{ right: "10vw", top: "45.5vh", width: "8vw", height: "7vw" }}
        onClick={() => setShowPassword(!showPassword)}
      />

      {/* Login button */}
      <button
        className="absolute rounded-lg text-white font-bold"
        style={{ 
          top: "55vh", 
          left: "7vw", 
          width: "86vw", 
          height: "7vh", 
          backgroundColor: "#36570A", 
          fontSize: "4vw" 
        }}
        onClick={() => alert("Login clicked")}
      >
        Login
      </button>

      {/* "Forgot password?" */}
      <p
        className="absolute font-bold text-[#000000] cursor-pointer text-center"
        style={{ 
          top: "64vh", 
          left: "30vw", 
          fontSize: "3vw", 
          width: "40vw" 
        }}
        onClick={() => alert("Forgot password clicked")}
      >
        Forgot password?
      </p>

      {/* "Don't have an account yet? Sign up here." */}
      <p
        className="absolute text-black text-center"
        style={{ 
          top: "90vh", 
          left: "10vw", 
          fontSize: "3.2vw", 
          width: "80vw" 
        }}
      >
        Don't have an account yet?{" "}
        <span
          className="underline cursor-pointer font-semibold text-[#36570A]"
          onClick={() => alert("Go to signup")}
        >
          Sign up here.
        </span>
      </p>
    </div>
  );
}
