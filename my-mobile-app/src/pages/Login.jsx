import React, { useState } from "react";
import hideIcon from "../assets/hide.png"; 
import backIcon from "../assets/back.png"; 

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-screen h-screen relative bg-white font-poppins px-8">
      {/* Back button */}
      <img
        src={backIcon}
        alt="Back"
        className="absolute cursor-pointer"
        style={{ left: "11px", top: "56px", width: "24px", height: "24px" }}
        onClick={() => alert("Back clicked")}
      />

      {/* "Welcome Back!" */}
      <h1
        className="absolute left-[30px] top-[227px] text-[32px] font-extrabold text-black leading-tight"
        style={{ width: "300px" }}
      >
        Welcome Back!
      </h1>

      <p
        className="absolute left-[32px] top-[270px] text-[14px] text-[#36570A] font-semibold"
        style={{ width: "209px" }}
      >
        Good to see you again
      </p>

      {/* Email input */}
      <input
        type="email"
        placeholder="Email Address"
        className="absolute top-[365px] left-[29px] w-[355px] h-[51px] rounded-lg px-4 text-black placeholder-black"
        style={{ backgroundColor: "rgba(54, 87, 10, 0.2)", fontSize: "15px" }}
      />

      {/* Password input */}
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className="absolute top-[441px] left-[29px] w-[355px] h-[51px] rounded-lg px-4 text-black placeholder-black"
        style={{ backgroundColor: "rgba(54, 87, 10, 0.2)", fontSize: "15px" }}
      />
      <img
        src={hideIcon}
        alt="Toggle Password"
        className="absolute cursor-pointer"
        style={{ left: "332px", top: "451px", width: "32px", height: "28px" }}
        onClick={() => setShowPassword(!showPassword)}
      />

      {/* Login button */}
      <button
        className="absolute left-[29px] top-[531px] w-[355px] h-[51px] rounded-lg text-white font-bold"
        style={{ backgroundColor: "#36570A", fontSize: "15px" }}
        onClick={() => alert("Login clicked")}
      >
        Login
      </button>

      {/* "Forgot password?" */}
      <p
        className="absolute left-[148px] top-[599px] text-[12px] font-bold text-[#000000] cursor-pointer"
        style={{ width: "113px", height: "19px" }}
        onClick={() => alert("Forgot password clicked")}
      >
        Forgot password?
      </p>

      {/* "Don't have an account yet? Sign up here." */}
      <p
        className="absolute left-[65px] top-[757px] text-[13px] text-black"
        style={{ width: "281px", height: "19px" }}
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
