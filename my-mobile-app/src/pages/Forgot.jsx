import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../lib/api";
import backIcon from "../assets/back.png";
import logo from "../assets/logo.png";
import emailIcon from "../assets/email.png";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateForm = () => {
    if (!email.trim()) return "Email is required";
    if (!email.includes("@")) return "Please enter a valid email";
    return null;
  };

  const handleForgotPassword = async () => {
    const validationError = validateForm();
    if (validationError) return setError(validationError);
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
      <img src={backIcon} alt="Back" className="absolute cursor-pointer" style={{ left: "4vw", top: "4vh", width: "5vw", height: "5vw" }} onClick={() => navigate("/login")} />
      <img src={logo} alt="Logo" className="absolute" style={{ top: "9vh", left: "50%", transform: "translateX(-50%)", width: "45vw" }} />
      <h1 className="absolute font-extrabold text-black" style={{ left: "7vw", top: "30vh", fontSize: "7vw" }}>Forgot Password?</h1>
      <p className="absolute" style={{ left: "7vw", top: "35vh", width: "85vw", fontSize: "3vw", lineHeight: "5vw", color: "#36570A" }}>Enter the email address associated with your account and we'll send you a reset link to change your password.</p>
      {(error || success) && (
        <div className={`absolute font-semibold text-center ${error ? "text-red-600" : "text-green-600"}`} style={{ top: "41.5vh", left: "7vw", width: "86vw", fontSize: "3.2vw" }}>
          {error || success}
        </div>
      )}
      <div className="absolute flex items-center rounded-lg px-4 bg-white" style={{ top: "45vh", left: "7vw", width: "86vw", height: "6vh", border: "1px solid #ccc" }}>
        <img src={emailIcon} alt="Email" style={{ width: "4.5vw", height: "4.5vw", marginRight: "2vw", opacity: 0.7 }} />
        <input type="email" placeholder="Email Address" value={email} onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }} className="w-full text-black placeholder-black focus:outline-none" style={{ fontSize: "14px" }} />
      </div>
      <button className="absolute rounded-lg text-white font-bold disabled:opacity-50" style={{ top: "54vh", left: "7vw", width: "86vw", height: "6vh", backgroundColor: "#36570A", fontSize: "3.5vw" }} onClick={handleForgotPassword} disabled={loading}>
        {loading ? "Sending..." : "Send Reset Email"}
      </button>
    </div>
  );
}