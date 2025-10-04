import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authAPI } from "../lib/api";
import backIcon from "../assets/back.png";

export default function VerificationCode() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const input4 = useRef(null);

  const [timer, setTimer] = useState(180);
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState(location.state?.email || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getVerificationCode = () =>
    [input1, input2, input3, input4].map(ref => ref.current?.value || "").join("");

  const handleChange = (e, nextInput) => {
    if (e.target.value.length === 1 && nextInput) nextInput.current.focus();
  };

  const handleKeyDown = (e, prevInput) => {
    if ((e.key === "Backspace" || e.key === "Delete") && prevInput && e.target.value === "")
      prevInput.current.focus();
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    } else setShowPopup(true);
  }, [timer]);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const handleVerify = async () => {
    const code = getVerificationCode();
    if (code.length !== 4) return setError("Please enter the complete 4-digit code");
    if (!email) return setError("Something went wrong");

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await authAPI.verifyEmail(email, code);
      setSuccess("Email verified successfully!");
      setTimeout(() => navigate("/home"), 2000);
    } catch (err) {
      setError(err.message || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) return setError("Email is required to resend code");

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await authAPI.resendCode(email);
      setSuccess("New verification code sent to your email!");
      setTimer(180);
      setShowPopup(false);
      [input1, input2, input3, input4].forEach(ref => ref.current && (ref.current.value = ""));
      input1.current?.focus();
    } catch (err) {
      setError(err.message || "Failed to resend code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendYes = () => handleResendCode();
  const handleResendCancel = () => setShowPopup(false);

  return (
    <div className="w-screen h-screen relative bg-white font-poppins">
      <img
        src={backIcon}
        alt="Back"
        className="absolute cursor-pointer"
        style={{ top: "7vh", left: "3vw", width: "6vw", height: "6vw" }}
        onClick={() => navigate("/login")}
      />

      <h1
        className="absolute font-extrabold text-black"
        style={{ top: "17vh", left: "7vw", width: "86vw", fontSize: "8vw" }}
      >
        Verification Code
      </h1>

      <p
        className="absolute text-black"
        style={{ top: "23vh", left: "8vw", width: "86vw", fontSize: "3vw", lineHeight: "5vw" }}
      >
        We have sent the code verification to
      </p>

      {error && (
        <div
          className="absolute text-red-600 font-semibold text-center"
          style={{ top: "33vh", left: "7vw", width: "86vw", fontSize: "3vw" }}
        >
          {error}
        </div>
      )}

      {success && (
        <div
          className="absolute text-green-600 font-semibold text-center"
          style={{ top: "33vh", left: "7vw", width: "86vw", fontSize: "3vw" }}
        >
          {success}
        </div>
      )}

      <div className="absolute flex items-center justify-start" style={{ top: "27vh", left: "8vw", width: "85vw", gap: "2vw" }}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          className="bg-white focus:outline-none font-bold"
          style={{
            fontSize: "3vw",
            color: "black",
            borderBottom: "none",
            flexShrink: 1,
            minWidth: "40vw",
            width: `${Math.max(4 * (email.length || 20), 40)}vw`,
            transition: "width 0.2s ease",
          }}
        />
        <p
          className="underline cursor-pointer font-semibold"
          style={{ fontSize: "3vw", color: "#36570A", whiteSpace: "nowrap" }}
          onClick={() => navigate("/signup")}
        >
          Change email address?
        </p>
      </div>

      <div className="absolute flex justify-between" style={{ top: "37vh", left: "7vw", width: "86vw" }}>
        {[input1, input2, input3, input4].map((ref, idx) => {
          const prevInput = idx > 0 ? [input1, input2, input3][idx - 1] : null;
          const nextInput = idx < 3 ? [input2, input3, input4][idx] : null;
          return (
            <input
              key={idx}
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              ref={ref}
              className="text-center rounded-lg font-bold"
              style={{ width: "18vw", height: "18vw", fontSize: "6vw", backgroundColor: "rgba(54,87,10,0.3)" }}
              onChange={e => handleChange(e, nextInput)}
              onKeyDown={e => handleKeyDown(e, prevInput)}
            />
          );
        })}
      </div>

      <div className="absolute text-black" style={{ top: "49vh", left: "35vw", fontSize: "3vw" }}>
        Resend code after: <span className="font-bold">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
      </div>

      <button
        className="absolute rounded-lg text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ top: "55vh", left: "7vw", width: "86vw", height: "6vh", backgroundColor: "#36570A", fontSize: "4vw" }}
        onClick={handleVerify}
        disabled={loading}
      >
        {loading ? "Verifying..." : "Confirm"}
      </button>

      <button
        className="absolute rounded-lg disabled:opacity-40 font-medium disabled:cursor-not-allowed"
        style={{
          top: "63vh",
          left: "7vw",
          width: "86vw",
          height: "6vh",
          backgroundColor: "rgba(54,87,10,0.3)",
          fontSize: "4vw",
          color: "black",
          opacity: timer > 0 ? 0.5 : 1,
        }}
        onClick={handleResendCode}
        disabled={timer > 0 || loading}
      >
        {loading ? "Sending..." : "Resend"}
      </button>

      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 p-4">
          <div className="bg-white rounded-lg text-center p-5" style={{ width: "86vw" }}>
            <p className="text-black mb-4" style={{ fontSize: "3.5vw" }}>
              Do you want to resend a new code?
            </p>
            <div className="flex justify-between gap-3">
              <button className="flex-1 rounded-lg bg-black text-white" style={{ height: "7vh", fontSize: "3.5vw" }} onClick={handleResendYes}>Yes</button>
              <button className="flex-1 rounded-lg bg-green-900/20" style={{ height: "7vh", fontSize: "3.5vw" }} onClick={handleResendCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
