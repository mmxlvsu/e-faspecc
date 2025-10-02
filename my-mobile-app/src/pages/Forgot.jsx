import React from "react";
import backIcon from "../assets/back.png";

export default function BackButtonOnly() {
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

      {/* "Forgot Password?" text */}
      <h1
        className="absolute font-extrabold text-black"
        style={{ left: "29px", top: "220px", width: "294px", height: "48px", fontSize: "32px" }}
      >
        Forgot Password?
      </h1>

      {/* Instruction text */}
      <p
        className="absolute"
        style={{
          left: "29px",
          top: "268px",
          width: "330px",
          height: "63px",
          fontSize: "14px",
          lineHeight: "21px",
          color: "#36570A",
        }}
      >
        Enter the email address associated with your account and we’ll send you a validation code to reset your password.
      </p>

      {/* Email Address input */}
      <input
        type="email"
        placeholder="Email Address"
        className="absolute left-[27px] top-[387px] w-[355px] h-[51px] rounded-lg px-4 text-black placeholder-black"
        style={{ backgroundColor: "rgba(54, 87, 10, 0.2)", color: "#36570A", fontSize: "15px" }}
      />

      {/* Send Validation Code button */}
      <button
        className="absolute left-[27px] top-[459px] w-[355px] h-[51px] rounded-lg text-white font-bold"
        style={{ backgroundColor: "#36570A", fontSize: "15px" }}
        onClick={() => alert("Send Validation Code clicked")}
      >
        Send Validation Code
      </button>
    </div>
  );
}
