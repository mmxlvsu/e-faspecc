import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import name from "../assets/faspecc.png";
import animationData from "../assets/animation.json";

export default function Splash() {
  const navigate = useNavigate();
  const lottieRef = useRef();

  const handleGetStarted = () => navigate("/signup");
  const handleLogin = () => navigate("/login");

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-black font-poppins">

      {/* Lottie Animation */}
      <div className="absolute z-20 left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 w-[60vw]">
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={false}
          autoplay={true}
          onComplete={() => {
            lottieRef.current?.stop(); // hard stop after 1 play
          }}
        />
      </div>

      {/* Center Logo */}
      <div className="absolute z-30 left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2">
        <img src={name} alt="Logo" className="w-[70vw] h-auto" />
      </div>

      {/* Sign in button */}
      <div className="absolute z-30 left-1/2 top-[72%] w-[82%] -translate-x-1/2">
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            height: "6.7vh",
            color: "white",
            backgroundColor: "black",
            fontSize: "4.2vw",
            fontWeight: "bold",
            borderRadius: "8px",
          }}
        >
          Sign in
        </button>
      </div>

      {/* Create an Account button */}
      <div className="absolute z-30 left-1/2 top-[80%] w-[82%] -translate-x-1/2">
        <button
          onClick={handleGetStarted}
          style={{
            width: "100%",
            height: "6.7vh",
            backgroundColor: "white",
            color: "black",
            fontSize: "4.2vw",
            fontWeight: "semi-bold",
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
