import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authAPI } from "../lib/api";
import backIcon from "../assets/back.png";
import hideIcon from "../assets/hide.png";
import showIcon from "../assets/show.png"; // NEW: Import the unslashed eye icon

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams(); // Get token from URL params
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form validation
  const validateForm = () => {
    if (!newPassword) return "New password is required";
    if (newPassword.length < 8 || newPassword.length > 16) return "Password must be 8-16 characters";
    if (newPassword !== confirmPassword) return "Passwords do not match";
    return null;
  };

  // Handle password reset
  const handleResetPassword = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!token) {
      setError("Invalid reset token");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await authAPI.resetPassword(token, newPassword);
      setSuccess("Password reset successfully! Redirecting to login...");
      
      // Navigate to login after successful reset
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (err) {
      setError(err.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
        onClick={() => navigate("/login")}
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

      {/* Error Message */}
      {error && (
        <div
          className="absolute text-red-600 font-semibold text-center"
          style={{ 
            top: "33vh", 
            left: "7vw", 
            width: "86vw", 
            fontSize: "3vw" 
          }}
        >
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div
          className="absolute text-green-600 font-semibold text-center"
          style={{ 
            top: "33vh", 
            left: "7vw", 
            width: "86vw", 
            fontSize: "3vw",
            lineHeight: "4.5vw"
          }}
        >
          {success}
        </div>
      )}

      {/* New Password input */}
      <input
        type={showNew ? "text" : "password"}
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
          if (error) setError("");
        }}
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{
          left: "7vw",
          top: "37vh",
          width: "86vw",
          height: "6vh",
          backgroundColor: "rgba(54, 87, 10, 0.2)",
          fontSize: "3.8vw",
        }}
      />
      <img
        src={showNew ? showIcon : hideIcon} // CONDITIONAL ICON SOURCE
        alt="Toggle Password"
        className="absolute cursor-pointer"
        style={{
          right: "10vw",
          top: "38.5vh",
          width: "6vw",
          height: "3vh",
        }}
        onClick={() => setShowNew(!showNew)}
      />

      {/* Text: Password must be 8-16 characters */}
      <p
        className="absolute text-gray-600"
        style={{
          left: "8.5vw",
          top: "44vh",
          fontSize: "2.8vw",
        }}
      >
        Password must be 8-16 characters
      </p>

      {/* Confirm Password input */}
      <input
        type={showConfirm ? "text" : "password"}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          if (error) setError("");
        }}
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{
          left: "7vw",
          top: "47vh",
          width: "86vw",
          height: "6vh",
          backgroundColor: "rgba(54, 87, 10, 0.2)",
          fontSize: "3.8vw",
        }}
      />
      <img
        src={showConfirm ? showIcon : hideIcon} // CONDITIONAL ICON SOURCE
        alt="Toggle Confirm Password"
        className="absolute cursor-pointer"
        style={{
          right: "10vw",
          top: "48.5vh",
          width: "6vw",
          height: "3vh",
        }}
        onClick={() => setShowConfirm(!showConfirm)}
      />

      {/* Text: Password must match */}
      <p
        className="absolute text-gray-600"
        style={{
          left: "8.5vw",
          top: "54vh",
          fontSize: "2.8vw",
        }}
      >
        Password must match
      </p>

      {/* Reset Password button */}
      <button
        className="absolute rounded-lg text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          left: "7vw",
          top: "59vh",
          width: "86vw",
          height: "6vh",
          backgroundColor: "#36570A",
          fontSize: "4vw",
        }}
        onClick={handleResetPassword}
        disabled={loading}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </div>
  );
}