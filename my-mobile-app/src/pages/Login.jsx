import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI, storage } from "../lib/api";
import hideIcon from "../assets/hide.png";
import backIcon from "../assets/back.png";
import showIcon from "../assets/show.png";
import logo from "../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Input change
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  // Validation
  const validateForm = () => {
    const { email, password } = formData;
    if (!email.trim()) return "Email is required";
    if (!email.includes("@")) return "Please enter a valid email";
    if (!password) return "Password is required";
    return null;
  };

  // Login
  const handleLogin = async () => {
    const validationError = validateForm();
    if (validationError) { setError(validationError); return; }

    setLoading(true); setError("");
    try {
      const response = await authAPI.login(formData.email, formData.password);
      storage.setToken(response.token);
      storage.setUser(response.user);
      navigate("/home");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen relative bg-white font-poppins px-[5vw]">
      {/* Back Button */}
      <img src={backIcon} alt="Back" className="absolute cursor-pointer"
        style={{ left: "4vw", top: "4vh", width: "5vw", height: "5vw" }}
        onClick={() => navigate("/")} />

      {/* Logo */}
      <img src={logo} alt="Logo" className="absolute"
        style={{ top: "9vh", left: "50%", transform: "translateX(-50%)", width: "45vw", height: "auto" }} />

      <h1 className="absolute font-extrabold text-black leading-tight"
        style={{ left: "8vw", top: "30vh", fontSize: "7vw", width: "80vw" }}>Welcome Back!</h1>

      <p className="absolute font-semibold text-[#36570A]"
        style={{ left: "8.5vw", top: "34vh", fontSize: "3.5vw", width: "60vw" }}>Good to see you again</p>

      {error && (
        <div className="absolute text-red-600 font-semibold text-center"
          style={{ top: "38vh", left: "7vw", width: "86vw", fontSize: "3vw" }}>{error}</div>
      )}

      <input type="email" placeholder="Email Address" value={formData.email}
        onChange={e => handleInputChange("email", e.target.value)}
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{ top: "40.8vh", left: "7vw", width: "86vw", height: "6vh", color: "#000", border: "1px solid #ccc", fontSize: "14px" }} />

      <input type={showPassword ? "text" : "password"} placeholder="Password" value={formData.password}
        onChange={e => handleInputChange("password", e.target.value)}
        className="absolute rounded-lg px-4 text-black placeholder-black"
        style={{ top: "47.8vh", left: "7vw", width: "86vw", height: "6vh", color: "#000", border: "1px solid #ccc", fontSize: "14px" }} />

      <img src={showPassword ? showIcon : hideIcon} alt="Toggle Password" className="absolute cursor-pointer"
        style={{ right: "10vw", top: "49vh", width: "6vw", height: "3vh" }}
        onClick={() => setShowPassword(!showPassword)} />

      <button className="absolute rounded-lg text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ top: "56.8vh", left: "7vw", width: "86vw", height: "6vh", backgroundColor: "#36570A", fontSize: "3.5vw" }}
        onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="absolute text-black cursor-pointer text-center"
        style={{ top: "65vh", left: "30vw", fontSize: "3vw", width: "40vw" }}
        onClick={() => navigate("/forgot")}>Forgot password?</p>

      <p className="absolute text-black text-center"
        style={{ top: "85vh", left: "10vw", fontSize: "3.2vw", width: "80vw" }}>
        Don't have an account yet?{" "}
        <span className="underline cursor-pointer font-bold text-[#36570A]" onClick={() => navigate("/signup")}>Sign up here.</span>
      </p>
    </div>
  );
}