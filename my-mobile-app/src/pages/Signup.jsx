import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI, storage } from "../lib/api";
import backIcon from "../assets/back.png"; 
import hideIcon from "../assets/hide.png"; 

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Form data state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    studentId: "",
    contact: "",
  });

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  // Form validation
  const validateForm = () => {
    const { fullName, email, password, confirmPassword, studentId, contact } = formData;
    
    if (!fullName.trim()) return "Full name is required";
    if (!email.trim()) return "Email is required";
    if (!email.includes("@")) return "Please enter a valid email";
    if (!password) return "Password is required";
    if (password.length < 8 || password.length > 16) return "Password must be 8-16 characters";
    if (password !== confirmPassword) return "Passwords do not match";
    if (!studentId.trim()) return "Student ID is required";
    if (!contact.trim()) return "Contact number is required";
    
    return null;
  };

  // Handle form submission
  const handleSignup = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { confirmPassword, ...registrationData } = formData;
      
      const response = await authAPI.register(registrationData);
      
      // Store token and user data
      storage.setToken(response.token);
      storage.setUser(response.user);
      
      // Navigate to verification page or home
      navigate("/verify", { 
        state: { 
          email: formData.email,
          message: "Registration successful! Please check your email for verification code."
        }
      });
      
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
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
        onClick={() => navigate("/")}
      />

      {/* Header */}
      <h1
        className="absolute font-black text-black"
        style={{ left: "8vw", top: "12vh", fontSize: "8vw", width: "80vw" }}
      >
        Create an account
      </h1>

      <p
        className="absolute font-semibold text-[#36570A]"
        style={{ left: "8.5vw", top: "18vh", fontSize: "3.8vw", width: "70vw" }}
      >
        Please enter your details
      </p>

      {/* Error Message */}
      {error && (
        <div
          className="absolute text-red-600 font-semibold text-center"
          style={{ 
            top: "22vh", 
            left: "7vw", 
            width: "86vw", 
            fontSize: "3vw" 
          }}
        >
          {error}
        </div>
      )}

      {/* Full Name */}
      <input
        type="text"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={(e) => handleInputChange("fullName", e.target.value)}
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{ 
          top: "25vh", 
          left: "7vw", 
          width: "86vw", 
          height: "6vh", 
          backgroundColor: "rgba(54, 87, 10, 0.2)", 
          fontSize: "3.8vw" 
        }}
      />

      {/* Email */}
      <input
        type="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{ 
          top: "33vh", 
          left: "7vw", 
          width: "86vw", 
          height: "6vh", 
          backgroundColor: "rgba(54, 87, 10, 0.2)", 
          fontSize: "3.8vw" 
        }}
      />

      {/* Student ID */}
      <input
        type="text"
        placeholder="Student ID"
        value={formData.studentId}
        onChange={(e) => handleInputChange("studentId", e.target.value)}
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{ 
          top: "41vh", 
          left: "7vw", 
          width: "86vw", 
          height: "6vh", 
          backgroundColor: "rgba(54, 87, 10, 0.2)", 
          fontSize: "3.8vw" 
        }}
      />

      {/* Contact */}
      <input
        type="tel"
        placeholder="Contact Number"
        value={formData.contact}
        onChange={(e) => handleInputChange("contact", e.target.value)}
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{ 
          top: "49vh", 
          left: "7vw", 
          width: "86vw", 
          height: "6vh", 
          backgroundColor: "rgba(54, 87, 10, 0.2)", 
          fontSize: "3.8vw" 
        }}
      />

      {/* Password */}
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={formData.password}
        onChange={(e) => handleInputChange("password", e.target.value)}
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{ 
          top: "57vh", 
          left: "7vw", 
          width: "86vw", 
          height: "6vh", 
          backgroundColor: "rgba(54, 87, 10, 0.2)", 
          fontSize: "3.8vw" 
        }}
      />
      <img
        src={hideIcon}
        alt="Toggle Password"
        className="absolute cursor-pointer"
        style={{ right: "10vw", top: "58.5vh", width: "6vw", height: "3vh" }}
        onClick={() => setShowPassword(!showPassword)}
      />

      <p
        className="absolute text-gray-600"
        style={{ left: "8vw", top: "64vh", fontSize: "2.8vw", width: "70vw" }}
      >
        Password must be 8-16 characters
      </p>

      {/* Confirm Password */}
      <input
        type={showConfirm ? "text" : "password"}
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{ 
          top: "67vh", 
          left: "7vw", 
          width: "86vw", 
          height: "6vh", 
          backgroundColor: "rgba(54, 87, 10, 0.2)", 
          fontSize: "3.8vw" 
        }}
      />
      <img
        src={hideIcon}
        alt="Toggle Confirm Password"
        className="absolute cursor-pointer"
        style={{ right: "10vw", top: "68.5vh", width: "6vw", height: "3vh" }}
        onClick={() => setShowConfirm(!showConfirm)}
      />

      {/* Sign Up button */}
      <button
        className="absolute rounded-lg text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ 
          top: "75vh", 
          left: "7vw", 
          width: "86vw", 
          height: "6vh", 
          backgroundColor: "#36570A", 
          fontSize: "4vw" 
        }}
        onClick={handleSignup}
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>

      {/* Already have an account? */}
      <p
        className="absolute text-black text-center"
        style={{ 
          top: "84vh", 
          left: "10vw", 
          fontSize: "3.2vw", 
          width: "80vw" 
        }}
      >
        Already have an account?{" "}
        <span
          className="underline cursor-pointer font-semibold text-[#36570A]"
          onClick={() => navigate("/login")}
        >
          Log in here.
        </span>
      </p>
    </div>
  );
}
