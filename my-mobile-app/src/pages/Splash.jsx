import React from "react";
import { useNavigate } from "react-router-dom";
import splashImage from "../assets/splash.png";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";

export default function Splash() {
  const navigate = useNavigate();

  const handleGetStarted = () => navigate("/signup");
  const handleGoogle = () => {
    console.log("Google authentication would be implemented here");
    navigate("/signup");
  };
  const handleFacebook = () => {
    console.log("Facebook authentication would be implemented here");
    navigate("/signup");
  };
  const handleLogin = () => navigate("/login");

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-black font-poppins">
      <img src={splashImage} alt="Splash" className="w-full h-full object-cover" />

      <div
        aria-hidden="true"
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: `linear-gradient(
            to top,
            #6A972E 0%,         
            rgba(106, 151, 46, 0.8) 40%,
            rgba(106, 151, 46, 0.5) 60%,
            rgba(106, 151, 46, 0.2) 100%,
            rgba(106, 151, 46, 0) 100%
          )`,
        }}
      />

      <div className="absolute z-30 left-1/2 top-[48%] w-[82%] -translate-x-1/2">
        <button
          onClick={handleGetStarted}
          className="w-full h-[8vh] bg-black text-white text-[4.5vw] font-bold rounded-lg"
        >
          Get Started
        </button>
      </div>

      <div className="absolute z-30 left-1/2 top-[63%] w-[82%] -translate-x-1/2">
        <button
          onClick={handleGoogle}
          className="w-full h-[8vh] bg-white text-black text-[4.5vw] font-bold rounded-lg flex items-center justify-center gap-2"
        >
          <img src={logo1} alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>
      </div>

      <div className="absolute z-30 left-1/2 top-[73%] w-[82%] -translate-x-1/2">
        <button
          onClick={handleFacebook}
          className="w-full h-[8vh] bg-white text-black text-[4.5vw] font-bold flex items-center justify-center gap-2 rounded-lg"
        >
          <img src={logo2} alt="Facebook" className="w-5 h-5" />
          Continue with Facebook
        </button>
      </div>

      <div className="absolute z-30 left-1/2 top-[58%] w-3/4 -translate-x-1/2 flex items-center">
        <div className="flex-grow border-t border-white"></div>
        <span
          className="mx-2 text-[3.5vw] text-white text-center cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          or use social sign up
        </span>
        <div className="flex-grow border-t border-white"></div>
      </div>

      <p className="absolute z-30 left-1/2 top-[83%] w-3/4 -translate-x-1/2 text-[3.5vw] text-white text-center">
        Already have an account?{" "}
        <span onClick={handleLogin} className="underline font-semibold cursor-pointer">
          Log in here.
        </span>
      </p>
    </div>
  );
}
