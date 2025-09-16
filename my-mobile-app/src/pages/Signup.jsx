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
        style={{ left: "11px", top: "56px", width: "24px", height: "24px" }}
        onClick={() => alert("Back clicked")}
      />

      {/* Header */}
      <h1
        className="absolute text-[32px] font-bold text-black"
        style={{ left: "21px", top: "202px", width: "307px", height: "48px" }}
      >
        Create an account
      </h1>

      <p
        className="absolute text-[15px] text-[#36570A]"
        style={{ left: "26px", top: "246px", width: "209px", height: "19px" }}
      >
        Please enter your details
      </p>

      {/* Username */}
      <input
        type="text"
        placeholder="Username"
        className="absolute left-[21px] top-[301px] w-[355px] h-[51px] rounded-lg px-4 text-black placeholder-black"
        style={{ backgroundColor: "rgba(54, 87, 10, 0.2)", fontSize: "15px" }}
      />

      {/* Email */}
      <input
        type="text"
        placeholder="Email Address"
        className="absolute left-[21px] top-[369px] w-[355px] h-[51px] rounded-lg px-4 text-black placeholder-black"
        style={{ backgroundColor: "rgba(54, 87, 10, 0.2)", fontSize: "15px" }}
      />

      {/* Password */}
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className="absolute left-[21px] top-[437px] w-[355px] h-[51px] rounded-lg px-4 text-black placeholder-black"
        style={{
          backgroundColor: "rgba(54, 87, 10, 0.2)",
          fontSize: "15px",
        }}
      />
      <img
        src={hideIcon}
        alt="Toggle Password"
        className="absolute cursor-pointer"
        style={{ left: "328px", top: "449px", width: "32px", height: "28px" }}
        onClick={() => setShowPassword(!showPassword)}
      />

      <p
        className="absolute left-[30px] top-[494px] text-[12px] text-black"
        style={{ width: "209px", height: "19px" }}
      >
        Password must be 8-16 characters
      </p>

      {/* Confirm Password */}
      <input
        type={showConfirm ? "text" : "password"}
        placeholder="Confirm Password"
        className="absolute left-[21px] top-[521px] w-[355px] h-[51px] rounded-lg px-4 text-black placeholder-black"
        style={{ backgroundColor: "rgba(54, 87, 10, 0.2)", fontSize: "15px" }}
      />
      <img
        src={hideIcon}
        alt="Toggle Confirm Password"
        className="absolute cursor-pointer"
        style={{ left: "328px", top: "530px", width: "32px", height: "28px" }}
        onClick={() => setShowConfirm(!showConfirm)}
      />

      {/* Sign Up button */}
      <button
        className="absolute left-[21px] top-[622px] w-[355px] h-[51px] rounded-lg text-white font-bold"
        style={{ backgroundColor: "black", fontSize: "15px" }}
        onClick={() => alert("Sign Up clicked")}
      >
        Sign Up
      </button>

      {/* Already have an account? */}
      <p
        className="absolute left-[74px] top-[694px] text-[13px] text-black"
        style={{ width: "263px", height: "19px" }}
      >
        Already have an account?{" "}
        <span
          className="underline cursor-pointer font-semibold"
          onClick={() => alert("Log in clicked")}
        >
          Log in here.
        </span>
      </p>
    </div>
  );
}
