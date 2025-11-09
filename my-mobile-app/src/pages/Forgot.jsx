import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../lib/api";
import backIcon from "../assets/back.png";
import logo from "../assets/logo.png";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Validation
  const validateForm = () => {
    if (!email.trim()) return "Email is required";
    if (!email.includes("@")) return "Please enter a valid email";
    return null;
  };

  // Submit
  const handleForgotPassword = async () => {
    const validationError = validateForm();
    if (validationError) { setError(validationError); return; }

    setLoading(true); setError(""); setSuccess("");
    try {
      await authAPI.forgotPassword(email);
      setSuccess("Password reset email sent!");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.message || "Failed to send reset email. Please try again.");
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
      <h1 className="absolute font-extrabold text-black"
        style={{ left: "7vw", top: "30vh", width: "80vw", fontSize: "7vw" }}>Forgot Password?</h1>

      {/* Instructions */}
      <p className="absolute"
        style={{ left: "7vw", top: "35vh", width: "85vw", fontSize: "3vw", lineHeight: "5vw", color: "#36570A" }}>
        Enter the email address associated with your account and we'll send you a reset link to change your password.
      </p>

      {/* Error */}
      {error && <div className="absolute text-red-600 font-semibold text-center"
        style={{ top: "41.5vh", left: "7vw", width: "86vw", fontSize: "3.2vw" }}>{error}</div>}

      {/* Success */}
      {success && <div className="absolute text-green-600 font-semibold text-center"
        style={{ top: "41.5vh", left: "7vw", width: "86vw", fontSize: "3.2vw", lineHeight: "4.5vw" }}>{success}</div>}

      {/* Email input */}
      <input type="email" placeholder="Email Address" value={email}
        onChange={e => { setEmail(e.target.value); if (error) setError(""); }}
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{ top: "45vh", left: "7vw", width: "86vw", height: "6vh", color: "#000", border: "1px solid #ccc", fontSize: "14px" }} />

      {/* Send button */}
      <button className="absolute rounded-lg text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ top: "54vh", left: "7vw", width: "86vw", height: "6vh", backgroundColor: "#36570A", fontSize: "3.5vw" }}
        onClick={handleForgotPassword} disabled={loading}>
        {loading ? "Sending..." : "Send Reset Email"}
      </button>
    </div>
  );
}
