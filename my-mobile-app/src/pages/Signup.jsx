import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI, storage } from "../lib/api";
import backIcon from "../assets/back.png";
import hideIcon from "../assets/hide.png";
import showIcon from "../assets/show.png";
import logo from "../assets/logo.png";
import userIcon from "../assets/user.png";
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const validateForm = () => {
    const { fullName, email, password, confirmPassword } = formData;
    if (!fullName.trim()) return "Full name is required";
    if (!email.trim()) return "Email is required";
    if (!email.includes("@")) return "Please enter a valid email";
    if (!password) return "Password is required";
    if (password.length < 8 || password.length > 16)
      return "Password must be 8-16 characters";
    if (password !== confirmPassword) return "Passwords do not match";
    return null;
  };

  const handleSignup = async () => {
    const validationError = validateForm();
    if (validationError) return setError(validationError);

    setLoading(true);
    setError("");
    try {
      const { confirmPassword, ...data } = formData;
      const response = await authAPI.register(data);
      storage.setToken(response.token);
      storage.setUser(response.user);
      navigate("/verify", {
        state: {
          email: formData.email,
          message: "Registration successful! Please check your email for verification code.",
        },
      });
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
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
          boxSizing: "border-box",
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
      <h1 style={{ position: "absolute", left: "8vw", top: "30vh", fontSize: "7vw", fontWeight: 900, color: "#000" }}>
        Create an account
      </h1>
      <p style={{ position: "absolute", left: "8.5vw", top: "34vh", fontSize: "3.5vw", fontWeight: 600, color: "#36570A" }}>
        Please enter your details
      </p>

      {/* Error Message */}
      {error && (
        <div style={{ position: "absolute", top: "38vh", left: "7vw", width: "86vw", fontSize: "3vw", color: "red", fontWeight: 600, textAlign: "center" }}>
          {error}
        </div>
      )}

      {/* Input Fields */}
      <InputField icon={userIcon} type="text" placeholder="Full Name" field="fullName" top="40.8vh" />
      <InputField icon={emailIcon} type="email" placeholder="Email Address" field="email" top="47.8vh" />
      <InputField
        icon={passwordIcon}
        type="password"
        placeholder="Password"
        field="password"
        toggle={showPassword}
        onToggle={() => setShowPassword(!showPassword)}
        top="55vh"
      />
      <p style={{ position: "absolute", left: "8vw", top: "62vh", fontSize: "2.8vw", color: "#555" }}>
        Password must be 8-16 characters
      </p>
      <InputField
        icon={passwordIcon}
        type="password"
        placeholder="Confirm Password"
        field="confirmPassword"
        toggle={showConfirm}
        onToggle={() => setShowConfirm(!showConfirm)}
        top="65vh"
      />

      {/* Signup Button */}
      <button
        onClick={handleSignup}
        disabled={loading}
        style={{
          position: "absolute",
          top: "74vh",
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
        {loading ? "Signing Up..." : "Sign Up"}
      </button>

      {/* Login Link */}
      <p style={{ position: "absolute", top: "85vh", left: "19vw", fontSize: "3.2vw", width: "80vw", color: "#000" }}>
        Already have an account?{" "}
        <span style={{ textDecoration: "underline", fontWeight: 700, color: "#36570A", cursor: "pointer" }} onClick={() => navigate("/login")}>
          Log in here.
        </span>
      </p>
    </div>
  );
}
