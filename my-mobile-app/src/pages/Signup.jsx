import React, { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI, storage } from "../lib/api";
import backIcon from "../assets/back.png";
import logo from "../assets/logo.png";
import userIcon from "../assets/user.png";
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";
import showIcon from "../assets/show.png";
import hideIcon from "../assets/hide.png";
import studentIcon from "../assets/user.png";
import contactIcon from "../assets/phone.png";

// ===============================
// InputField wrapped in memo
// ===============================
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
    backgroundColor: "#ffffff",
  };
  const iconStyle = { width: "4.5vw", height: "4.5vw", marginRight: "2vw", opacity: 0.7 };
  const eyeStyle = { position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", width: "22px", height: "22px", cursor: "pointer" };
  const inputStyle = { flex: 1, fontSize: 14, height: "100%", border: "none", outline: "none", color: "#000" };

  const inputType = onToggle && toggle ? "text" : type;

  return (
    <div style={wrapperStyle}>
      <img src={icon} alt="" style={iconStyle} />
      <input
        type={inputType}
        placeholder={placeholder}
        value={formData[field]}
        onChange={e => handleInputChange(field, e.target.value)}
        style={inputStyle}
      />
      {onToggle && <img src={toggle ? showIcon : hideIcon} alt="Toggle" style={eyeStyle} onClick={onToggle} />}
    </div>
  );
});

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    studentId: "",
    contact: "",
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
      navigate("/verify", { state: { email: formData.email, message: "Registration successful! Check your email for verification." } });
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
        style={{ left: "4vw", top: "4vh", width: "5vw", height: "5vw" }}
        onClick={() => navigate("/")}
      />
      <img src={logo} alt="Logo" className="absolute" style={{ top: "9vh", left: "50%", transform: "translateX(-50%)", width: "45vw" }} />
      <h1 className="absolute font-black text-black" style={{ left: "8vw", top: "30vh", fontSize: "7vw" }}>Create an account</h1>
      <p className="absolute font-semibold text-[#36570A]" style={{ left: "8.5vw", top: "34vh", fontSize: "3.5vw" }}>Please enter your details</p>
      {error && <div className="absolute text-red-600 font-semibold text-center" style={{ top: "38vh", left: "7vw", width: "86vw", fontSize: "3vw" }}>{error}</div>}

      <InputField top="40.8vh" icon={userIcon} type="text" field="fullName" placeholder="Full Name" formData={formData} handleInputChange={handleInputChange} />
      <InputField top="47.8vh" icon={emailIcon} type="email" field="email" placeholder="Email Address" formData={formData} handleInputChange={handleInputChange} />
      <InputField top="55vh" icon={studentIcon} type="text" field="studentId" placeholder="Student ID" formData={formData} handleInputChange={handleInputChange} />
      <InputField top="62.2vh" icon={contactIcon} type="tel" field="contact" placeholder="Contact Number" formData={formData} handleInputChange={handleInputChange} />
      <InputField top="69.4vh" icon={passwordIcon} type="password" field="password" placeholder="Password" toggle={showPassword} onToggle={() => setShowPassword(!showPassword)} formData={formData} handleInputChange={handleInputChange} />
      <p className="absolute text-gray-600" style={{ left: "8vw", top: "75.7vh", fontSize: "2.8vw" }}>Password must be 8-16 characters</p>
      <InputField top="78vh" icon={passwordIcon} type="password" field="confirmPassword" placeholder="Confirm Password" toggle={showConfirm} onToggle={() => setShowConfirm(!showConfirm)} formData={formData} handleInputChange={handleInputChange} />

      <button
        className="absolute rounded-lg text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ top: "86vh", left: "7vw", width: "86vw", height: "6vh", backgroundColor: "#36570A", fontSize: "3.5vw" }}
        onClick={handleSignup}
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>

      <p className="absolute text-black text-center" style={{ top: "93vh", left: "10vw", fontSize: "3.2vw", width: "80vw" }}>
        Already have an account? <span className="underline cursor-pointer font-bold text-[#36570A]" onClick={() => navigate("/login")}>Log in here.</span>
      </p>
    </div>
  );
}
