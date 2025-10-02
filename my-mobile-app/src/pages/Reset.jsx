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
        style={{ left: "11px", top: "56px", width: "24px", height: "24px" }}
        onClick={() => alert("Back clicked")}
      />

      {/* Top texts */}
      <h1
        className="absolute font-bold text-black"
        style={{ left: "30px", top: "220px", width: "261px", height: "48px", fontSize: "32px" }}
      >
        Reset Password
      </h1>

      <p
        className="absolute text-[#36570A]"
        style={{ left: "30px", top: "265px", width: "342px", height: "18px", fontSize: "12px" }}
      >
        Enter a new password below to reset password
      </p>

      {/* New Password input */}
      <input
        type={showNew ? "text" : "password"}
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="absolute left-[25px] top-[347px] w-[355px] h-[51px] rounded-lg px-4 text-black placeholder-black"
        style={{ backgroundColor: "rgba(54, 87, 10, 0.2)", fontSize: "15px" }}
      />
      <img
        src={hideIcon}
        alt="Toggle Password"
        className="absolute cursor-pointer"
        style={{ left: "328px", top: "359px", width: "32px", height: "28px" }}
        onClick={() => setShowNew(!showNew)}
      />

      {/* Text: Password must be 8-16 characters */}
      <p
        className="absolute text-black"
        style={{ left: "33px", top: "400px", width: "209px", height: "19px", fontSize: "12px" }}
      >
        Password must be 8-16 characters
      </p>

      {/* Confirm Password input */}
      <input
        type={showConfirm ? "text" : "password"}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="absolute left-[25px] top-[435px] w-[355px] h-[51px] rounded-lg px-4 text-black placeholder-black"
        style={{ backgroundColor: "rgba(54, 87, 10, 0.2)", fontSize: "15px" }}
      />
      <img
        src={hideIcon}
        alt="Toggle Confirm Password"
        className="absolute cursor-pointer"
        style={{ left: "328px", top: "444px", width: "32px", height: "28px" }}
        onClick={() => setShowConfirm(!showConfirm)}
      />

      {/* Text: Password must match */}
      <p
        className="absolute text-black"
        style={{ left: "33px", top: "488px", width: "209px", height: "19px", fontSize: "12px" }}
      >
        Password must match
      </p>

      {/* Reset Password button */}
      <button
        className="absolute rounded-lg text-white font-bold"
        style={{ left: "25px", top: "536px", width: "355px", height: "51px", backgroundColor: "#36570A", fontSize: "16px" }}
        onClick={() => alert("Reset Password clicked")}
      >
        Reset Password
      </button>
    </div>
  );
}
