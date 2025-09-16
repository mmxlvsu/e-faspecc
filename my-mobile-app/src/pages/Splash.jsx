import React from "react";
import splashImage from "../assets/splash.png";
import logo1 from "../assets/logo1.png"; // Google logo
import logo2 from "../assets/logo2.png"; // Facebook logo

export default function Splash() {
  // Click handlers show alerts only
  const handleGetStarted = () => alert("Get Started clicked!");
  const handleGoogle = () => alert("Continue with Google clicked!");
  const handleFacebook = () => alert("Continue with Facebook clicked!");
  const handleLogin = () => alert("Log in clicked!");

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-black font-poppins">
      {/* Background image */}
      <img
        src={splashImage}
        alt="Splash"
        className="w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: `linear-gradient(
            to top,
            #6A972E 0%,         
            rgba(106, 151, 46, 0.9) 40%,
            rgba(106, 151, 46, 0.6) 60%,
            rgba(106, 151, 46, 0.3) 80%,
            rgba(106, 151, 46, 0) 100% 
          )`,
        }}
      />

      {/* Buttons */}
      <div className="absolute z-30 left-[26px] top-[474px]">
        <button
          onClick={handleGetStarted}
          className="w-[360px] h-[63px] bg-black text-white text-[18px] font-bold rounded-lg"
        >
          Get Started
        </button>
      </div>

      <div className="absolute z-30 left-[26px] top-[589px]">
        <button
          onClick={handleGoogle}
          className="w-[360px] h-[63px] bg-white text-black text-[18px] font-bold rounded-lg flex items-center justify-center gap-2"
        >
          <img src={logo1} alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>
      </div>

      <div className="absolute z-30 left-[26px] top-[671px]">
        <button
          onClick={handleFacebook}
          className="w-[360px] h-[63px] bg-white text-black text-[18px] font-bold flex items-center justify-center gap-2 rounded-lg"
        >
          <img src={logo2} alt="Facebook" className="w-5 h-5" />
          Continue with Facebook
        </button>
      </div>

      {/* Extra texts - centered with lines */}
      <div className="absolute z-30 left-1/2 top-[550px] w-[281px] -translate-x-1/2 flex items-center">
        <div className="flex-grow border-t border-white"></div>
        <span className="mx-2 text-[13px] text-white text-center cursor-pointer" onClick={() => alert("Social sign up clicked!")}>
          or use social sign up
        </span>
        <div className="flex-grow border-t border-white"></div>
      </div>

      {/* Log in text */}
      <p className="absolute z-30 left-1/2 top-[757px] w-[281px] -translate-x-1/2 text-[13px] text-white text-center">
        Already have an account?{" "}
        <span
          onClick={handleLogin}
          className="underline font-semibold cursor-pointer"
        >
          Log in here.
        </span>
      </p>
    </div>
  );
}
