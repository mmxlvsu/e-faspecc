import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import name from "../assets/faspecc.png";
import animationData from "../assets/animation.json";

export default function Splash() {
  const navigate = useNavigate();

  const handleGetStarted = () => navigate("/signup");
  const handleLogin = () => navigate("/login");

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-black font-poppins">

      {/* Green gradient overlay */}
<div
  aria-hidden="true"
  className="absolute inset-0 z-10 pointer-events-none"
  style={{
    background: `linear-gradient(
      to top,
      #6A972E 0%,         
      rgba(106, 151, 46, 0.8) 20%,
      rgba(106, 151, 46, 0.7) 60%,
      rgba(106, 151, 46, 0.2) 100%,
      rgba(106, 151, 46, 0) 0%
    )`,
  }}
/>

{/* Lottie Animation - above the gradient */}
<div className="absolute z-20 left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 w-[60vw]">
  <Lottie animationData={animationData} loop={true} />
</div>


      {/* Center Logo */}
      <div className="absolute z-30 left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2">
        <img 
          src={name}
          alt="Logo"
          className="w-[70vw] h-auto opacity-100"
        />
      </div>

      {/* Sign in button */}
      <div className="absolute z-30 left-1/2 top-[72%] w-[82%] -translate-x-1/2">
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            height: "6.7vh",
            color: "white",
            fontSize: "4.2vw",
            fontWeight: "bold",
            borderRadius: "8px",
            border: "1px solid white",
          }}
        >
          Sign in
        </button>
      </div>

      {/* Create an Account button */}
      <div className="absolute z-30 left-1/2 top-[80%] w-[82%] -translate-x-1/2">
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            height: "6.7vh",
            backgroundColor: "white",
            color: "black",
            fontSize: "4.2vw",
            fontWeight: "bold",
            borderRadius: "8px",
            border: "2px solid white",
          }}
        >
          Create an Account
        </button>
      </div>

    </div>
  );
}
