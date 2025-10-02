import React, { useState } from "react";
import backIcon from "../assets/back.png"; 
import hideIcon from "../assets/hide.png"; 

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="w-screen h-screen relative bg-white font-poppins">
      {/* Back button */}
      <img
        src={backIcon}
        alt="Back"
        className="absolute cursor-pointer"
        style={{ left: "3vw", top: "7vh", width: "6vw", height: "6vw" }}
        onClick={() => alert("Back clicked")}
      />

      {/* Header */}
      <h1
        className="absolute font-black text-black"
        style={{ left: "8vw", top: "17vh", fontSize: "8vw", width: "80vw" }}
      >
        Create an account
      </h1>

      <p
        className="absolute font-semibold text-[#36570A]"
        style={{ left: "8.5vw", top: "23vh", fontSize: "3.8vw", width: "70vw" }}
      >
        Please enter your details
      </p>

      {/* Username */}
      <input
        type="text"
        placeholder="Username"
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{ 
          top: "30vh", 
          left: "7vw", 
          width: "86vw", 
          height: "7vh", 
          backgroundColor: "rgba(54, 87, 10, 0.2)", 
          fontSize: "3.8vw" 
        }}
      />

      {/* Email */}
      <input
        type="text"
        placeholder="Email Address"
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{ 
          top: "39vh", 
          left: "7vw", 
          width: "86vw", 
          height: "7vh", 
          backgroundColor: "rgba(54, 87, 10, 0.2)", 
          fontSize: "3.8vw" 
        }}
      />

      {/* Password */}
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{ 
          top: "48vh", 
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
        style={{ right: "10vw", top: "50vh", width: "8vw", height: "7vw" }}
        onClick={() => setShowPassword(!showPassword)}
      />

      <p
        className="absolute text-black"
        style={{ left: "8vw", top: "56vh", fontSize: "3vw", width: "70vw" }}
      >
        Password must be 8-16 characters
      </p>

      {/* Confirm Password */}
      <input
        type={showConfirm ? "text" : "password"}
        placeholder="Confirm Password"
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{ 
          top: "59vh", 
          left: "7vw", 
          width: "86vw", 
          height: "7vh", 
          backgroundColor: "rgba(54, 87, 10, 0.2)", 
          fontSize: "3.8vw" 
        }}
      />
      <img
        src={hideIcon}
        alt="Toggle Confirm Password"
        className="absolute cursor-pointer"
        style={{ right: "10vw", top: "61vh", width: "8vw", height: "7vw" }}
        onClick={() => setShowConfirm(!showConfirm)}
      />

      {/* Sign Up button */}
      <button
        className="absolute rounded-lg text-white font-bold"
        style={{ 
          top: "69vh", 
          left: "7vw", 
          width: "86vw", 
          height: "7vh", 
          backgroundColor: "#36570A", 
          fontSize: "4vw" 
        }}
        onClick={() => alert("Sign Up clicked")}
      >
        Sign Up
      </button>

      {/* Already have an account? */}
      <p
        className="absolute text-black text-center"
        style={{ 
          top: "90vh", 
          left: "10vw", 
          fontSize: "3.2vw", 
          width: "80vw" 
        }}
      >
        Already have an account?{" "}
        <span
          className="underline cursor-pointer font-semibold text-[#36570A]"
          onClick={() => alert("Log in clicked")}
        >
          Log in here.
        </span>
      </p>
    </div>
  );
}
