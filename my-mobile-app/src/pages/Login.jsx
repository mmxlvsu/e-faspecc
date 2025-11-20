import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI, storage } from "../lib/api";
import backIcon from "../assets/back.png";
import logo from "../assets/logo.png";
import email from "../assets/email.png";
import password from "../assets/password.png";
import showIcon from "../assets/show.png";
import hideIcon from "../assets/hide.png";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (f, v) => { setFormData(p => ({ ...p, [f]: v })); if (error) setError(""); };
  const validateForm = () => !formData.email.trim() ? "Email is required" :
    !formData.email.includes("@") ? "Please enter a valid email" :
    !formData.password ? "Password is required" : null;

  const handleLogin = async () => {
    const errMsg = validateForm(); if (errMsg) return setError(errMsg);
    setLoading(true); setError("");
    try {
      const res = await authAPI.login(formData.email, formData.password);
      storage.setToken(res.token); storage.setUser(res.user); navigate("/home");
    } catch (err) { setError(err.message || "Login failed. Please try again."); }
    finally { setLoading(false); }
  };

  const inputBox = (top, type, icon, field, placeholder, showToggle) => (
    <div className="absolute flex items-center rounded-lg" style={{ top, left: "7vw", width: "86vw", height: "6vh", border: "1px solid #ccc", paddingLeft: "3vw" }}>
      <img src={icon} alt="" style={{ width: "4.5vw", height: "4.5vw", marginRight: "2vw", opacity: .7 }} />
      <input
        type={type}
        placeholder={placeholder}
        value={formData[field]}
        onChange={e => handleInputChange(field, e.target.value)}
        className="flex-1 text-black placeholder-black focus:outline-none"
        style={{ fontSize: 14 }}
      />
      {showToggle && (
        <img
          src={showPassword ? showIcon : hideIcon}
          alt="Toggle"
          className="cursor-pointer"
          style={{ width: "6vw", height: "3vh", marginRight: "2vw" }}
          onClick={() => setShowPassword(!showPassword)}
        />
      )}
    </div>
  );

  return (
    <div className="w-screen h-screen relative bg-white font-poppins px-[5vw]">
      <img src={backIcon} alt="Back" className="absolute cursor-pointer" style={{ left: "4vw", top: "4vh", width: "5vw", height: "5vw" }} onClick={() => navigate("/")} />
      <img src={logo} alt="Logo" className="absolute" style={{ top: "9vh", left: "50%", transform: "translateX(-50%)", width: "45vw" }} />

      <h1 className="absolute font-extrabold text-black leading-tight" style={{ left: "8vw", top: "30vh", fontSize: "7vw" }}>Welcome Back!</h1>
      <p className="absolute font-semibold text-[#36570A]" style={{ left: "8.5vw", top: "34vh", fontSize: "3.5vw" }}>Good to see you again</p>

      {error && <div className="absolute text-red-600 font-semibold text-center" style={{ top: "38vh", left: "7vw", width: "86vw", fontSize: "3vw" }}>{error}</div>}

      {inputBox("40.8vh", "email", email, "email", "Email Address")}
      {inputBox("47.8vh", showPassword ? "text" : "password", password, "password", "Password", true)}

      <button className="absolute rounded-lg text-white font-bold" style={{ top: "56.8vh", left: "7vw", width: "86vw", height: "6vh", backgroundColor: "#36570A", fontSize: "3.5vw" }} onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="absolute text-black text-center cursor-pointer" style={{ top: "65vh", left: "37vw", fontSize: "3vw" }} onClick={() => navigate("/forgot")}>Forgot password?</p>

      <p className="absolute text-black text-center" style={{ top: "85vh", left: "10vw", fontSize: "3.2vw", width: "80vw" }}>
        Don't have an account yet? <span className="underline cursor-pointer font-bold text-[#36570A]" onClick={() => navigate("/signup")}>Sign up here.</span>
      </p>
    </div>
  );
}