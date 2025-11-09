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

  const InputField = ({ icon, type, placeholder, field, value, toggle, onToggle }) => (
    <div
      className="absolute flex items-center rounded-lg"
      style={{
        top: value.top,
        left: "7vw",
        width: "86vw",
        height: "6vh",
        border: "1px solid #ccc",
        paddingLeft: "3vw",
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
        className="flex-1 text-black placeholder-black focus:outline-none"
        style={{ fontSize: "14px" }}
      />
      {onToggle && (
        <img
          src={toggle ? showIcon : hideIcon}
          alt="Toggle Visibility"
          className="cursor-pointer"
          style={{ width: "6vw", height: "3vh", marginRight: "2vw" }}
          onClick={onToggle}
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

      {/* Heading */}
      <h1 className="absolute font-black text-black" style={{ left: "8vw", top: "30vh", fontSize: "7vw" }}>
        Create an account
      </h1>
      <p className="absolute font-semibold text-[#36570A]" style={{ left: "8.5vw", top: "34vh", fontSize: "3.5vw" }}>
        Please enter your details
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

      {/* Inputs */}
      <InputField icon={userIcon} type="text" placeholder="Full Name" field="fullName" value={{ top: "40.8vh" }} />
      <InputField icon={emailIcon} type="email" placeholder="Email Address" field="email" value={{ top: "47.8vh" }} />
      <InputField
        icon={passwordIcon}
        type="password"
        placeholder="Password"
        field="password"
        toggle={showPassword}
        onToggle={() => setShowPassword(!showPassword)}
        value={{ top: "55vh" }}
      />

      <p className="absolute text-gray-600" style={{ left: "8vw", top: "62vh", fontSize: "2.8vw" }}>
        Password must be 8-16 characters
      </p>

      <InputField
        icon={passwordIcon}
        type="password"
        placeholder="Confirm Password"
        field="confirmPassword"
        toggle={showConfirm}
        onToggle={() => setShowConfirm(!showConfirm)}
        value={{ top: "65vh" }}
      />
<p className="absolute text-gray-600" style={{ left: "8vw", top: "71.5vh", fontSize: "2.8vw" }}>
        Password must match
      </p>

      {/* Signup Button */}
      <button
        className="absolute rounded-lg text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          top: "75.5vh",
          left: "7vw",
          width: "86vw",
          height: "6vh",
          backgroundColor: "#36570A",
          fontSize: "3.5vw",
        }}
        onClick={handleSignup}
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>

      {/* Login Link */}
      <p className="absolute text-black text-center" style={{ top: "85vh", left: "10vw", fontSize: "3.2vw", width: "80vw" }}>
        Already have an account?{" "}
        <span className="underline cursor-pointer font-bold text-[#36570A]" onClick={() => navigate("/login")}>
          Log in here.
        </span>
      </p>
    </div>
  );
}
