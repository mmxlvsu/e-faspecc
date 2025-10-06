import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI, storage } from "../lib/api";
import backIcon from "../assets/back.png"; 
import hideIcon from "../assets/hide.png"; 
import showIcon from "../assets/show.png"; 

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    studentId: "",
    contact: "",
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

    return null;
  };

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
      storage.setToken(response.token);
      storage.setUser(response.user);
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
      <img
        src={backIcon}
        alt="Back"
        className="absolute cursor-pointer"
        style={{ left: "3vw", top: "4vh", width: "6vw", height: "6vw" }}
        onClick={() => navigate("/")}
      />

      <h1 className="absolute font-black text-black" style={{ left: "8vw", top: "10vh", fontSize: "8vw", width: "80vw" }}>
        Create an account
      </h1>

      <p className="absolute font-semibold text-[#36570A]" style={{ left: "8.5vw", top: "16vh", fontSize: "3.8vw", width: "70vw" }}>
        Please enter your details
      </p>

      {error && (
        <div className="absolute text-red-600 font-semibold text-center" style={{ top: "20vh", left: "7vw", width: "86vw", fontSize: "3vw" }}>
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={(e) => handleInputChange("fullName", e.target.value)}
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{ top: "23vh", left: "7vw", width: "86vw", height: "6vh", backgroundColor: "rgba(54, 87, 10, 0.2)", fontSize: "3.8vw" }}
      />

      <input
        type="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{ top: "31vh", left: "7vw", width: "86vw", height: "6vh", backgroundColor: "rgba(54, 87, 10, 0.2)", fontSize: "3.8vw" }}
      />

      <input
        type="tel"
        placeholder="Student ID"
        value={formData.studentId}
        onChange={(e) => handleInputChange("studentId", e.target.value)}
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{ top: "39vh", left: "7vw", width: "86vw", height: "6vh", backgroundColor: "rgba(54, 87, 10, 0.2)", fontSize: "3.8vw" }}
      />
      <p className="absolute text-gray-500" style={{ right: "10vw", top: "40.5vh", fontSize: "3vw" }}>optional</p>

      <input
        type="tel"
        placeholder="Contact Number"
        value={formData.contact}
        onChange={(e) => handleInputChange("contact", e.target.value)}
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{ top: "47vh", left: "7vw", width: "86vw", height: "6vh", backgroundColor: "rgba(54, 87, 10, 0.2)", fontSize: "3.8vw" }}
      />
      <p className="absolute text-gray-500" style={{ right: "10vw", top: "48.5vh", fontSize: "3vw" }}>optional</p>

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={formData.password}
        onChange={(e) => handleInputChange("password", e.target.value)}
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{ top: "55vh", left: "7vw", width: "86vw", height: "6vh", backgroundColor: "rgba(54, 87, 10, 0.2)", fontSize: "3.8vw" }}
      />
      <img
        src={showPassword ? showIcon : hideIcon}
        alt="Toggle Password"
        className="absolute cursor-pointer"
        style={{ right: "10vw", top: "56.5vh", width: "6vw", height: "3vh" }}
        onClick={() => setShowPassword(!showPassword)}
      />
      <p className="absolute text-gray-600" style={{ left: "8vw", top: "62vh", fontSize: "2.8vw", width: "70vw" }}>
        Password must be 8-16 characters
      </p>

      <input
        type={showConfirm ? "text" : "password"}
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{ top: "65vh", left: "7vw", width: "86vw", height: "6vh", backgroundColor: "rgba(54, 87, 10, 0.2)", fontSize: "3.8vw" }}
      />
      <img
        src={showConfirm ? showIcon : hideIcon}
        alt="Toggle Confirm Password"
        className="absolute cursor-pointer"
        style={{ right: "10vw", top: "66.5vh", width: "6vw", height: "3vh" }}
        onClick={() => setShowConfirm(!showConfirm)}
      />

      <button
        className="absolute rounded-lg text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ top: "74vh", left: "7vw", width: "86vw", height: "6vh", backgroundColor: "#36570A", fontSize: "4vw" }}
        onClick={handleSignup}
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>

      <p className="absolute text-black text-center" style={{ top: "84vh", left: "10vw", fontSize: "3.2vw", width: "80vw" }}>
        Already have an account?{" "}
        <span className="underline cursor-pointer font-bold text-[#36570A]" onClick={() => navigate("/login")}>
          Log in here.
        </span>
      </p>
    </div>
  );
}
