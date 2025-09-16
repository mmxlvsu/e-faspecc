import React, { useRef, useState, useEffect } from "react";
import backIcon from "../assets/back.png";

export default function BackButtonOnly() {
  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const input4 = useRef(null);

  // Timer state in seconds (3 minutes)
  const [timer, setTimer] = useState(10);
  const [showPopup, setShowPopup] = useState(false);

  // Temporary email field
  const [email, setEmail] = useState(""); // editable for now

  // Handle input auto-focus
  const handleChange = (e, nextInput) => {
    if (e.target.value.length === 1 && nextInput) {
      nextInput.current.focus();
    }
  };

  const handleKeyDown = (e, prevInput) => {
    if ((e.key === "Backspace" || e.key === "Delete") && prevInput && e.target.value === "") {
      prevInput.current.focus();
    }
  };

  // Countdown effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setShowPopup(true);
    }
  }, [timer]);

  // Format timer as MM:SS
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  // Handle popup buttons
  const handleResendYes = () => {
    alert("Resend clicked");
    setTimer(180); // Reset timer
    setShowPopup(false);
  };

  const handleResendCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className="w-screen h-screen relative bg-white font-poppins">
      {/* Back button */}
      <img
        src={backIcon}
        alt="Back"
        className="absolute cursor-pointer"
        style={{ left: "11px", top: "56px", width: "24px", height: "24px" }}
        onClick={() => alert("Back clicked")}
      />

      {/* "Verification Code" text */}
      <h1
        className="absolute font-bold text-black"
        style={{ left: "22px", top: "216px", width: "286px", height: "48px", fontSize: "32px" }}
      >
        Verification Code
      </h1>

      {/* "We have sent the code verification to" text */}
      <p
        className="absolute text-black"
        style={{ left: "25px", top: "271px", width: "281px", height: "18px", fontSize: "12px" }}
      >
        We have sent the code verification to
      </p>

      {/* Temporary editable email field */}
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="absolute text-black font-semibold"
        style={{
          left: "25px",
          top: "294px",
          width: "176px",
          height: "18px",
          fontSize: "12px",
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
        }}
        placeholder="laplap.mariel05@edu.ph"
      />

      {/* "Change email address?" text */}
      <p
        className="absolute text-[#36570A] font-semibold underline cursor-pointer"
        style={{ left: "208px", top: "294px", width: "164px", height: "18px", fontSize: "12px" }}
        onClick={() => alert("Change email clicked")}
      >
        Change email address?
      </p>

      {/* Verification code inputs */}
      {[input1, input2, input3, input4].map((ref, idx) => {
        const leftPositions = ["47px", "133px", "219px", "305px"];
        const prevInput = idx > 0 ? [input1, input2, input3][idx - 1] : null;
        const nextInput = idx < 3 ? [input2, input3, input4][idx] : null;
        return (
          <input
            key={idx}
            type="text"
            maxLength={1}
            ref={ref}
            className="absolute text-center rounded-lg"
            style={{
              left: leftPositions[idx],
              top: "368px",
              width: "65px",
              height: "65px",
              backgroundColor: "rgba(54, 87, 10, 0.3)",
              fontSize: "32px",
              fontWeight: "bold",
            }}
            onChange={(e) => handleChange(e, nextInput)}
            onKeyDown={(e) => handleKeyDown(e, prevInput)}
          />
        );
      })}

      {/* Grouped "Resend code after:" text and timer */}
      <div className="absolute flex justify-center items-center" style={{ left: 0, right: 0, top: "502px" }}>
        <span className="text-black" style={{ fontSize: "12px", marginRight: "4px" }}>
          Resend code after:
        </span>
        <span className="text-black" style={{ fontSize: "12px", fontWeight: "bold" }}>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </span>
      </div>

      {/* Confirm button */}
      <button
        className="absolute rounded-lg text-white font-bold"
        style={{ left: "63px", top: "572px", width: "286px", height: "53px", backgroundColor: "black", fontSize: "16px" }}
        onClick={() => alert("Confirm clicked")}
      >
        Confirm
      </button>

      {/* Resend button (disabled until timer = 0) */}
      <button
        className="absolute rounded-lg font-bold"
        style={{
          left: "63px",
          top: "643px",
          width: "286px",
          height: "53px",
          backgroundColor: "rgba(54, 87, 10, 0.2)",
          fontSize: "16px",
        }}
        onClick={() => alert("Resend clicked")}
        disabled={timer > 0}
      >
        Resend
      </button>

      {/* Popup */}
      {showPopup && (
        <div
          className="absolute w-screen h-screen flex justify-center items-center bg-black bg-opacity-50"
          style={{ top: 0, left: 0 }}
        >
          <div className="bg-white rounded-lg p-3 flex flex-col items-center">
            <p className="text-black mb-4" style={{ fontSize: "10px" }}>
              Do you want to resend a new code?
            </p>
            <div className="flex space-x-3">
              <button
                className="rounded-lg text-white font-bold"
                style={{ width: "120px", height: "40px", backgroundColor: "black" }}
                onClick={handleResendYes}
              >
                Yes
              </button>
              <button
                className="rounded-lg"
                style={{ width: "120px", height: "40px", backgroundColor: "rgba(54, 87, 10, 0.2)" }}
                onClick={handleResendCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
