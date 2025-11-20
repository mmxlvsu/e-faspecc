import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI, storage } from "../lib/api";
import backIcon from "../assets/back.png";
import logo from "../assets/logo.png";
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";
import showIcon from "../assets/show.png";
import hideIcon from "../assets/hide.png";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const validateForm = () =>
    !formData.email.trim()
      ? "Email is required"
      : !formData.email.includes("@")
      ? "Please enter a valid email"
      : !formData.password
      ? "Password is required"
      : null;

  const handleLogin = async () => {
    const errMsg = validateForm();
    if (errMsg) return setError(errMsg);
    setLoading(true);
    setError("");
    try {
      const res = await authAPI.login(formData.email, formData.password);
      storage.setToken(res.token);
      storage.setUser(res.user);
      navigate("/home");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Input field component
  const InputField = ({ top, icon, type, field, placeholder, toggle, onToggle }) => (
    <div
      className="absolute flex items-center rounded-lg"
      style={{
        top,
        left: "7vw",
        width: "86vw",
        height: "6vh",
        border: "1px solid #ccc",
        paddingLeft: "3vw",
        paddingRight: "3vw",
        boxSizing: "border-box",
      }}
    >
      <img
        src={icon}
        alt=""
        style={{ width: "4.5vw", height: "4.5vw", opacity: 0.7, marginRight: "2vw" }}
      />
      <input
        type={toggle ? "text" : type}
        placeholder={placeholder}
        value={formData[field]}
        onChange={e => handleInputChange(field, e.target.value)}
        className="text-black placeholder-black focus:outline-none"
        style={{
          width: "100%",
          height: "100%",
          fontSize: "14px",
          boxSizing: "border-box",
          paddingRight: toggle ? "40px" : "10px",
        }}
      />
      {onToggle && (
        <img
          src={showPassword ? showIcon : hideIcon}
          alt="Toggle"
          onClick={onToggle}
          style={{
            position: "absolute",
            right: "10px",
            width: "22px",
            height: "22px",
            cursor: "pointer",
          }}
        />
      )}
    </div>
  );

  return (
    <div className="w-screen h-screen relative bg-white font-poppins px-[5vw]">
      {/* Back Icon */}
      <img
        src={backIcon}
        alt="Back"
        className="absolute cursor-pointer"
        style={{ left: "4vw", top: "4vh", width: "5vw", height: "5vw" }}
        onClick={() => navigate("/")}
      />

      {/* Logo */}
      <img
        src={logo}
        alt="Logo"
        className="absolute"
        style={{ top: "9vh", left: "50%", transform: "translateX(-50%)", width: "45vw" }}
      />

      {/* Titles */}
      <h1
        className="absolute font-extrabold text-black leading-tight"
        style={{ left: "8vw", top: "30vh", fontSize: "7vw" }}
      >
        Welcome Back!
      </h1>
      <p
        className="absolute font-semibold text-[#36570A]"
        style={{ left: "8.5vw", top: "34vh", fontSize: "3.5vw" }}
      >
        Good to see you again
      </p>

      {/* Error Message */}
      {error && (
        <div
          className="absolute text-red-600 font-semibold text-center"
          style={{ top: "38vh", left: "7vw", width: "86vw", fontSize: "3vw" }}
        >
          {error}
        </div>
      )}

      {/* Input Fields */}
      <InputField top="40.8vh" icon={emailIcon} type="email" field="email" placeholder="Email Address" />
      <InputField
        top="47.8vh"
        icon={passwordIcon}
        type="password"
        field="password"
        placeholder="Password"
        toggle={showPassword}
        onToggle={() => setShowPassword(!showPassword)}
      />

      {/* Login Button */}
      <button
        className="absolute rounded-lg text-white font-bold"
        style={{
          top: "56.8vh",
          left: "7vw",
          width: "86vw",
          height: "6vh",
          backgroundColor: "#36570A",
          fontSize: "3.5vw",
        }}
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* Forgot password */}
      <p
        className="absolute text-black text-center cursor-pointer"
        style={{ top: "65vh", left: "37vw", fontSize: "3vw" }}
        onClick={() => navigate("/forgot")}
      >
        Forgot password?
      </p>

      {/* Signup prompt */}
      <p
        className="absolute text-black text-center"
        style={{ top: "85vh", left: "10vw", fontSize: "3.2vw", width: "80vw" }}
      >
        Don't have an account yet?{" "}
        <span
          className="underline cursor-pointer font-bold text-[#36570A]"
          onClick={() => navigate("/signup")}
        >
          Sign up here.
        </span>
      </p>
    </div>
  );
}
