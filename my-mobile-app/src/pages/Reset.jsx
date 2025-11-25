import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authAPI } from "../lib/api";
import backIcon from "../assets/back.png";
import hideIcon from "../assets/hide.png";
import showIcon from "../assets/show.png";
import logo from "../assets/logo.png";
import passwordIcon from "../assets/password.png";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: "", isError: false });

  const handleResetPassword = async () => {
    if (!newPassword) return setMsg({ text: "New password is required", isError: true });
    if (newPassword.length < 8 || newPassword.length > 16) return setMsg({ text: "Password must be 8-16 characters", isError: true });
    if (newPassword !== confirmPassword) return setMsg({ text: "Passwords do not match", isError: true });
    if (!token) return setMsg({ text: "Invalid reset token", isError: true });
    setLoading(true); setMsg({ text: "", isError: false });
    try {
      await authAPI.resetPassword(token, newPassword);
      setMsg({ text: "Password reset successfully! Redirecting to login...", isError: false });
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMsg({ text: err.message || "Failed to reset password. Please try again.", isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen relative bg-white font-poppins">
      <img src={backIcon} alt="Back" className="absolute cursor-pointer" style={{ left: "4vw", top: "4vh", width: "5vw", height: "5vw" }} onClick={() => navigate("/login")} />
      <img src={logo} alt="Logo" className="absolute" style={{ top: "7vh", left: "50%", transform: "translateX(-50%)", width: "45vw" }} />
      <h1 className="absolute font-bold text-black" style={{ left: "8vw", top: "26.5vh", width: "80vw", fontSize: "7vw" }}>Reset Password</h1>
      <p className="absolute text-[#36570A]" style={{ left: "8.5vw", top: "31vh", width: "86vw", fontSize: "3.2vw" }}>
        Enter a new password below to reset password
      </p>
      {msg.text && (
        <div className={`absolute font-semibold text-center ${msg.isError ? "text-red-600" : "text-green-600"}`} style={{ top: "36vh", left: "7vw", width: "86vw", fontSize: "3vw" }}>
          {msg.text}
        </div>
      )}

      <div className="absolute flex items-center rounded-lg px-4 bg-white" style={{ left: "7vw", top: "39vh", width: "86vw", height: "6vh", border: "1px solid #ccc" }}>
        <img src={passwordIcon} alt="Password" style={{ marginLeft: "-2vw",width: "4.5vw", height: "4.5vw", marginRight: "2vw", opacity: 0.7 }} />
        <input type={showNew ? "text" : "password"} placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="flex-1 text-black placeholder-black focus:outline-none" style={{ fontSize: "14px" }} />
        <img src={showNew ? showIcon : hideIcon} alt="Toggle Password" className="cursor-pointer" style={{ marginRight: "-3vw", width: "22px", height: "22px" }} onClick={() => setShowNew(!showNew)} />
      </div>
      <p className="absolute text-gray-600" style={{ left: "8.5vw", top: "45.2vh", fontSize: "2.8vw" }}>Password must be 8-16 characters</p>

      <div className="absolute flex items-center rounded-lg px-4 bg-white" style={{ left: "7vw", top: "47.5vh", width: "86vw", height: "6vh", border: "1px solid #ccc" }}>
        <img src={passwordIcon} alt="Password" style={{ marginLeft: "-2vw", width: "4.5vw", height: "4.5vw", marginRight: "2vw", opacity: 0.7 }} />
        <input type={showConfirm ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="flex-1 text-black placeholder-black focus:outline-none" style={{ fontSize: "14px" }} />
        <img src={showConfirm ? showIcon : hideIcon} alt="Toggle Password" className="cursor-pointer" style={{ marginRight: "-3vw", width: "22px", height: "22px" }} onClick={() => setShowConfirm(!showConfirm)} />
      </div>
      <p className="absolute text-gray-600" style={{ left: "8.5vw", top: "53.7vh", fontSize: "2.8vw" }}>Password must match</p>

      <button className="absolute rounded-lg text-white font-bold disabled:opacity-50" style={{ left: "7vw", top: "58.2vh", width: "86vw", height: "6vh", backgroundColor: "#36570A", fontSize: "3.5vw" }} onClick={handleResetPassword} disabled={loading}>
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </div>
  );
}
