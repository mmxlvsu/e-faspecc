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

      {/* Buttons container */}
      <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[85%] flex flex-col gap-4 z-30">
        <button
          onClick={handleGetStarted}
          className="w-full py-4 bg-black text-white text-lg font-bold rounded-lg"
        >
          Get Started
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleGoogle}
            className="w-full py-4 bg-white text-black text-lg font-bold rounded-lg flex items-center justify-center gap-2"
          >
            <img src={logo1} alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleFacebook}
            className="w-full py-4 bg-white text-black text-lg font-bold flex items-center justify-center gap-2 rounded-lg"
          >
            <img src={logo2} alt="Facebook" className="w-5 h-5" />
            Continue with Facebook
          </button>
        </div>
      </div>

      {/* Social sign up text */}
      <div className="absolute bottom-[27%] left-1/2 -translate-x-1/2 w-3/4 flex items-center z-30">
        <div className="flex-grow border-t border-white"></div>
        <span
          className="mx-2 text-sm text-white text-center cursor-pointer"
          onClick={() => alert("Social sign up clicked!")}
        >
          or use social sign up
        </span>
        <div className="flex-grow border-t border-white"></div>
      </div>

      {/* Log in text */}
      <p className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-3/4 text-sm text-white text-center z-30">
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
