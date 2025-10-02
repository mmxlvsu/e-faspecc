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
        style={{ left: "3vw", top: "7vh", width: "6vw", height: "6vw" }}
        onClick={() => alert("Back clicked")}
      />

      {/* "Forgot Password?" text */}
      <h1
        className="absolute font-extrabold text-black"
        style={{ left: "7vw", top: "25vh", width: "80vw", fontSize: "8vw" }}
      >
        Forgot Password?
      </h1>

      {/* Instruction text */}
      <p
        className="absolute"
        style={{
          left: "7vw",
          top: "33vh",
          width: "85vw",
          fontSize: "3.5vw",
          lineHeight: "5vw",
          color: "#36570A",
        }}
      >
        Enter the email address associated with your account and we’ll send you
        a validation code to reset your password.
      </p>

      {/* Email Address input */}
      <input
        type="email"
        placeholder="Email Address"
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{
          top: "44vh",
          left: "7vw",
          width: "86vw",
          height: "7vh",
          backgroundColor: "rgba(54, 87, 10, 0.2)",
          color: "#36570A",
          fontSize: "3.8vw",
        }}
      />

      {/* Send Validation Code button */}
      <button
        className="absolute rounded-lg text-white font-bold"
        style={{
          top: "53vh",
          left: "7vw",
          width: "86vw",
          height: "7vh",
          backgroundColor: "#36570A",
          fontSize: "3.5vw",
        }}
        onClick={() => alert("Send Validation Code clicked")}
      >
        Send Validation Code
      </button>
    </div>
  );
}
