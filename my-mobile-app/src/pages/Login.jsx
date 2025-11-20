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
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.email.trim()) return "Email is required";
    if (!formData.email.includes("@")) return "Please enter a valid email";
    if (!formData.password) return "Password is required";
    return null;
  };

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

  const InputField = ({ icon, type, placeholder, field, toggle, onToggle, top }) => (
    <div
      style={{
        position: "absolute",
        top,
        left: "7vw",
        width: "86vw",
        height: "6vh",
        border: "1px solid #ccc",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        paddingLeft: "3vw",
        boxSizing: "border-box",
      }}
    >
      <img
        src={icon}
        alt=""
        style={{ width: "4.5vw", height: "4.5vw", marginRight: "2vw", opacity: 0.7 }}
      />
      <input
        type={toggle ? "text" : type}
        placeholder={placeholder}
        value={formData[field]}
        onChange={e => handleInputChange(field, e.target.value)}
        style={{
          flex: 1,
          fontSize: "14px",
          height: "100%",
          border: "none",
          outline: "none",
          color: "#000",
        }}
      />
      {onToggle && (
        <img
          src={toggle ? showIcon : hideIcon}
          alt="Toggle Visibility"
          onClick={onToggle}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "22px",
            height: "22px",
            cursor: "pointer",
          }}
        />
      )}
    </div>
  );

  return (
    <div className="w-screen h-screen relative bg-white font-poppins">
      {/* Back Button */}
      <img
        src={backIcon}
        alt="Back"
        style={{ position: "absolute", left: "4vw", top: "4vh", width: "5vw", height: "5vw", cursor: "pointer" }}
        onClick={() => navigate("/")}
      />

      {/* Logo */}
      <img
        src={logo}
        alt="Logo"
        style={{ position: "absolute", top: "9vh", left: "50%", transform: "translateX(-50%)", width: "45vw" }}
      />

      {/* Heading */}
      <h1 style={{ position: "absolute", left: "8vw", top: "30vh", fontSize: "7vw", fontWeight: 800, color: "#000" }}>
        Welcome Back!
      </h1>
      <p style={{ position: "absolute", left: "8.5vw", top: "34vh", fontSize: "3.5vw", fontWeight: 600, color: "#36570A" }}>
        Good to see you again
      </p>

      {/* Error Message */}
      {error && (
        <div style={{ position: "absolute", top: "38vh", left: "7vw", width: "86vw", fontSize: "3vw", color: "red", fontWeight: 600, textAlign: "center" }}>
          {error}
        </div>
      )}

      {/* Inputs */}
      <InputField icon={emailIcon} type="email" placeholder="Email Address" field="email" top="40.8vh" />
      <InputField
        icon={passwordIcon}
        type="password"
        placeholder="Password"
        field="password"
        toggle={showPassword}
        onToggle={() => setShowPassword(!showPassword)}
        top="47.8vh"
      />

      {/* Login Button */}
      <button
        onClick={handleLogin}
        disabled={loading}
        style={{
          position: "absolute",
          top: "56.8vh",
          left: "7vw",
          width: "86vw",
          height: "6vh",
          backgroundColor: "#36570A",
          fontSize: "3.5vw",
          color: "#fff",
          fontWeight: 700,
          borderRadius: "8px",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* Forgot Password */}
      <p style={{ position: "absolute", top: "65vh", left: "37vw", fontSize: "3vw", color: "#000", cursor: "pointer" }} onClick={() => navigate("/forgot")}>
        Forgot password?
      </p>

      {/* Sign Up Link */}
      <p style={{ position: "absolute", top: "85vh", left: "18vw", fontSize: "3.2vw", width: "80vw", color: "#000" }}>
        Don't have an account yet?{" "}
        <span style={{ textDecoration: "underline", fontWeight: 700, color: "#36570A", cursor: "pointer" }} onClick={() => navigate("/signup")}>
          Sign up here.
        </span>
      </p>
    </div>
  );
}
