import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../lib/api";
import backIcon from "../assets/back.png";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form validation
  const validateForm = () => {
    if (!email.trim()) return "Email is required";
    if (!email.includes("@")) return "Please enter a valid email";
    return null;
  };

  // Handle forgot password submission
  const handleForgotPassword = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await authAPI.forgotPassword(email);
      setSuccess("Password reset email sent! Check your inbox for instructions.");
      
      // Navigate to login after showing success message
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      
    } catch (err) {
      setError(err.message || "Failed to send reset email. Please try again.");
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
        style={{ left: "3vw", top: "7vh", width: "6vw", height: "6vw" }}
        onClick={() => navigate("/login")}
      />

      {/* "Forgot Password?" text */}
      <h1
        className="absolute font-extrabold text-black"
        style={{ left: "7vw", top: "20vh", width: "80vw", fontSize: "8vw" }}
      >
        Forgot Password?
      </h1>

      {/* Instruction text */}
      <p
        className="absolute"
        style={{
          left: "7vw",
          top: "27vh",
          width: "85vw",
          fontSize: "3.5vw",
          lineHeight: "5vw",
          color: "#36570A",
        }}
      >
        Enter the email address associated with your account and we'll send you
        a reset link to change your password.
      </p>

      {/* Error Message */}
      {error && (
        <div
          className="absolute text-red-600 font-semibold text-center"
          style={{ 
            top: "39.5vh", 
            left: "7vw", 
            width: "86vw", 
            fontSize: "3.2vw" 
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
            top: "39.5vh", 
            left: "7vw", 
            width: "86vw", 
            fontSize: "3.2vw",
            lineHeight: "4.5vw"
          }}
        >
          {success}
        </div>
      )}

      {/* Email Address input */}
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (error) setError("");
        }}
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{
          top: "43vh",
          left: "7vw",
          width: "86vw",
          height: "6vh",
          backgroundColor: "rgba(54, 87, 10, 0.2)",
          color: "#36570A",
          fontSize: "3.8vw",
        }}
      />

      {/* Send Reset Email button */}
      <button
        className="absolute rounded-lg text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          top: "52vh",
          left: "7vw",
          width: "86vw",
          height: "6vh",
          backgroundColor: "#36570A",
          fontSize: "3.5vw",
        }}
        onClick={handleForgotPassword}
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Reset Email"}
      </button>
    </div>
  );
}