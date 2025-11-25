import React, { useState, memo } from "react"; // <-- Import memo
import { useNavigate } from "react-router-dom";
import { authAPI, storage } from "../lib/api";
import backIcon from "../assets/back.png";
import logo from "../assets/logo.png";
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";
import showIcon from "../assets/show.png";
import hideIcon from "../assets/hide.png";

// =========================================================
// 1. DEFINE INPUTFIELD OUTSIDE AND WRAP IN REACT.MEMO
// =========================================================
const InputField = memo(({ top, icon, type, field, placeholder, toggle, onToggle, formData, handleInputChange }) => {
  const wrapperStyle = {
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
  };
  const iconStyle = { width: "4.5vw", height: "4.5vw", marginRight: "2vw", opacity: 0.7 };
  const eyeStyle = { position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", width: "22px", height: "22px", cursor: "pointer" };
  const inputStyle = { flex: 1, fontSize: 14, height: "100%", border: "none", outline: "none", color: "#000" };

  // FIX 1: Keep the previous type fix logic just in case
  const inputType = onToggle && toggle ? "text" : type;

  return (
    <div style={wrapperStyle}>
      <img src={icon} alt="" style={iconStyle} />
      <input
        type={inputType}
        placeholder={placeholder}
        // FIX 2: Access formData via props
        value={formData[field]}
        // FIX 3: Call handleInputChange via props
        onChange={e => handleInputChange(field, e.target.value)}
        style={inputStyle}
      />
      {onToggle && <img src={toggle ? showIcon : hideIcon} alt="Toggle" style={eyeStyle} onClick={onToggle} />}
    </div>
  );
});

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Memoize handleInputChange to prevent unnecessary re-renders in InputField
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
    const err = validateForm();
    if (err) return setError(err);

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


  return (
    <div className="w-screen h-screen relative bg-white font-poppins px-[5vw]">
      {/* Back */}
      <img
        src={backIcon}
        alt="Back"
        className="absolute cursor-pointer"
        style={{ left: "4vw", top: "4vh", width: "5vw", height: "5vw" }}
        onClick={() => navigate("/")}
      />

      {/* Logo */}
      <img src={logo} alt="Logo" className="absolute" style={{ top: "7vh", left: "50%", transform: "translateX(-50%)", width: "45vw" }} />

      {/* Title */}
      <h1 className="absolute font-extrabold text-black" style={{ left: "8vw", top: "26.5vh", fontSize: "7vw" }}>Welcome Back!</h1>
      <p className="absolute font-semibold text-[#36570A]" style={{ left: "8.5vw", top: "30vh", fontSize: "3.5vw" }}>Good to see you again</p>

      {/* Error */}
      {error && <div className="absolute text-red-600 font-semibold text-center" style={{ top: "34vh", left: "7vw", width: "86vw", fontSize: "3vw" }}>{error}</div>}

      {/* Inputs */}
      {/* 2. PASS PROPS INCLUDING FORM DATA AND HANDLER */}
      <InputField 
        top="37vh" 
        icon={emailIcon} 
        type="email" 
        field="email" 
        placeholder="Email Address" 
        formData={formData} // <-- Pass formData
        handleInputChange={handleInputChange} // <-- Pass handler
      />
      <InputField 
        top="44vh" 
        icon={passwordIcon} 
        type="password" 
        field="password" 
        placeholder="Password" 
        toggle={showPassword} 
        onToggle={() => setShowPassword(!showPassword)} 
        formData={formData} // <-- Pass formData
        handleInputChange={handleInputChange} // <-- Pass handler
      />

      {/* Login Button */}
      <button
        className="absolute rounded-lg text-white font-bold"
        style={{ top: "51.5vh", left: "7vw", width: "86vw", height: "6vh", backgroundColor: "#36570A", fontSize: "3.5vw" }}
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* Forgot */}
      <p className="absolute text-black text-center cursor-pointer" style={{ top: "60vh", left: "37vw", fontSize: "3vw" }} onClick={() => navigate("/forgot")}>Forgot password?</p>

      {/* Signup */}
      <p className="absolute text-black text-center" style={{ top: "90vh", left: "10vw", fontSize: "3.2vw", width: "80vw" }}>
        Don't have an account yet?{" "}
        <span className="underline cursor-pointer font-bold text-[#36570A]" onClick={() => navigate("/signup")}>Sign up here.</span>
      </p>
    </div>
  );
}