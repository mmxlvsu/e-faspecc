import React, { useState } from "react";
import backIcon from "../assets/back.png";
import hideIcon from "../assets/hide.png";

export default function PasswordInputs() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="w-screen h-screen relative bg-white font-poppins">
      {/* Back button */}
      <img
        src={backIcon}
        alt="Back"
        className="absolute cursor-pointer"
        style={{
          left: "3vw",
          top: "7vh",
          width: "6vw",
          height: "6vw",
        }}
        onClick={() => alert("Back clicked")}
      />

      {/* Top texts */}
      <h1
        className="absolute font-bold text-black"
        style={{
          left: "8vw",
          top: "22vh",
          width: "80vw",
          fontSize: "8vw",
        }}
      >
        Reset Password
      </h1>

      <p
        className="absolute text-[#36570A]"
        style={{
          left: "8.5vw",
          top: "28vh",
          width: "86vw",
          fontSize: "3.2vw",
        }}
      >
        Enter a new password below to reset password
      </p>

      {/* New Password input */}
      <input
        type={showNew ? "text" : "password"}
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{
          left: "7vw",
          top: "37vh",
          width: "86vw",
          height: "7vh",
          backgroundColor: "rgba(54, 87, 10, 0.2)",
          fontSize: "4vw",
        }}
      />
      <img
        src={hideIcon}
        alt="Toggle Password"
        className="absolute cursor-pointer"
        style={{
          right: "10vw",
          top: "38.5vh", // aligned with input top
          width: "8vw", // same scaling as Login component
          height: "7vw", // match width for square icon
        }}
        onClick={() => setShowNew(!showNew)}
      />

      {/* Text: Password must be 8-16 characters */}
      <p
        className="absolute text-black"
        style={{
          left: "8.5vw",
          top: "45vh",
          fontSize: "3vw",
        }}
      >
        Password must be 8-16 characters
      </p>

      {/* Confirm Password input */}
      <input
        type={showConfirm ? "text" : "password"}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{
          left: "7vw",
          top: "48vh",
          width: "86vw",
          height: "7vh",
          backgroundColor: "rgba(54, 87, 10, 0.2)",
          fontSize: "4vw",
        }}
      />
      <img
        src={hideIcon}
        alt="Toggle Confirm Password"
        className="absolute cursor-pointer"
        style={{
          right: "10vw",
          top: "49.5vh", // aligned with input top
          width: "8vw", // match new password toggle
          height: "7vw", // match new password toggle
        }}
        onClick={() => setShowConfirm(!showConfirm)}
      />

      {/* Text: Password must match */}
      <p
        className="absolute text-black"
        style={{
          left: "8.5vw",
          top: "56vh",
          fontSize: "3vw",
        }}
      >
        Password must match
      </p>

      {/* Reset Password button */}
      <button
        className="absolute rounded-lg text-white font-bold"
        style={{
          left: "7vw",
          top: "61vh",
          width: "86vw",
          height: "7vh",
          backgroundColor: "#36570A",
          fontSize: "4vw",
        }}
        onClick={() => alert("Reset Password clicked")}
      >
        Reset Password
      </button>
    </div>
  );
}
