import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authAPI } from "../lib/api";
import backIcon from "../assets/back.png";
import hideIcon from "../assets/hide.png";
import showIcon from "../assets/show.png";
import logo from "../assets/logo.png";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Validation
  const validateForm = () => {
    if (!newPassword) return "New password is required";
    if (newPassword.length < 8 || newPassword.length > 16) return "Password must be 8-16 characters";
    if (newPassword !== confirmPassword) return "Passwords do not match";
    return null;
  };

  // Submit
  const handleResetPassword = async () => {
    const validationError = validateForm();
    if (validationError) { setError(validationError); return; }
    if (!token) { setError("Invalid reset token"); return; }

    setLoading(true); setError(""); setSuccess("");
    try {
      await authAPI.resetPassword(token, newPassword);
      setSuccess("Password reset successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen relative bg-white font-poppins">
      {/* Back */}
      <img src={backIcon} alt="Back" className="absolute cursor-pointer"
        style={{ left: "4vw", top: "4vh", width: "5vw", height: "5vw" }}
        onClick={() => navigate("/login")} />

      {/* Logo */}
      <img src={logo} alt="Logo" className="absolute"
        style={{ top: "9vh", left: "50%", transform: "translateX(-50%)", width: "45vw", height: "auto" }} />

      {/* Title */}
      <h1 className="absolute font-bold text-black"
        style={{ left: "8vw", top: "30vh", width: "80vw", fontSize: "7vw" }}>
        Reset Password
      </h1>

      {/* Instruction */}
      <p className="absolute text-[#36570A]"
        style={{ left: "8.5vw", top: "34vh", width: "86vw", fontSize: "3.2vw" }}>
        Enter a new password below to reset password
      </p>

      {/* Error */}
      {error && <div className="absolute text-red-600 font-semibold text-center"
        style={{ top: "38vh", left: "7vw", width: "86vw", fontSize: "3vw" }}>{error}</div>}

      {/* Success */}
      {success && <div className="absolute text-green-600 font-semibold text-center"
        style={{ top: "38vh", left: "7vw", width: "86vw", fontSize: "3vw", lineHeight: "4.5vw" }}>{success}</div>}

      {/* New Password */}
      <input type={showNew ? "text" : "password"} placeholder="New Password" value={newPassword}
        onChange={e => { setNewPassword(e.target.value); if (error) setError(""); }}
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{ left: "7vw", top: "40.8vh", width: "86vw", height: "6vh", color: "#000", border: "1px solid #ccc", fontSize: "14px" }} />
      <img src={showNew ? showIcon : hideIcon} alt="Toggle Password" className="absolute cursor-pointer"
        style={{ right: "10vw", top: "42vh", width: "6vw", height: "3vh" }} onClick={() => setShowNew(!showNew)} />
      <p className="absolute text-gray-600" style={{ left: "8.5vw", top: "47.5vh", fontSize: "2.8vw" }}>
        Password must be 8-16 characters
      </p>

      {/* Confirm Password */}
      <input type={showConfirm ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword}
        onChange={e => { setConfirmPassword(e.target.value); if (error) setError(""); }}
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{ left: "7vw", top: "51vh", width: "86vw", height: "6vh", color: "#000", border: "1px solid #ccc", fontSize: "14px" }} />
      <img src={showConfirm ? showIcon : hideIcon} alt="Toggle Confirm Password" className="absolute cursor-pointer"
        style={{ right: "10vw", top: "52.2vh", width: "6vw", height: "3vh" }} onClick={() => setShowConfirm(!showConfirm)} />
      <p className="absolute text-gray-600" style={{ left: "8.5vw", top: "58vh", fontSize: "2.8vw" }}>
        Password must match
      </p>

      {/* Reset Button */}
      <button className="absolute rounded-lg text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ left: "7vw", top: "62vh", width: "86vw", height: "6vh", backgroundColor: "#36570A", fontSize: "3.5vw" }}
        onClick={handleResetPassword} disabled={loading}>
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </div>
  );
}