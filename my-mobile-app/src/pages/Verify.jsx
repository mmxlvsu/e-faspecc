import React, { useRef, useState, useEffect } from "react";
import backIcon from "../assets/back.png";

export default function VerificationCode() {
  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const input4 = useRef(null);

  const [timer, setTimer] = useState(10);
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");

  const handleChange = (e, nextInput) => {
    if (e.target.value.length === 1 && nextInput) nextInput.current.focus();
  };

  const handleKeyDown = (e, prevInput) => {
    if ((e.key === "Backspace" || e.key === "Delete") && prevInput && e.target.value === "")
      prevInput.current.focus();
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else setShowPopup(true);
  }, [timer]);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const handleResendYes = () => {
    alert("Resend clicked");
    setTimer(180);
    setShowPopup(false);
  };

  const handleResendCancel = () => setShowPopup(false);

  return (
    <div className="w-screen h-screen relative bg-white font-poppins">
      {/* Back button */}
      <img
        src={backIcon}
        alt="Back"
        className="absolute cursor-pointer"
        style={{
          top: "7vh",
          left: "3vw",
          width: "6vw",
          height: "6vw",
        }}
        onClick={() => alert("Back clicked")}
      />

      {/* Title */}
      <h1
        className="absolute font-extrabold text-black"
        style={{
          top: "18vh",
          left: "7vw",
          width: "86vw",
          fontSize: "8vw",
        }}
      >
        Verification Code
      </h1>

      {/* Instruction */}
      <p
        className="absolute text-gray-700"
        style={{
          top: "23vh",
          left: "8vw",
          width: "86vw",
          fontSize: "3vw",
          lineHeight: "5vw",
          color: "black",
        }}
      >
        We have sent the code verification to
      </p>

      <div
  className="absolute flex items-center justify-start"
  style={{
    top: "27vh",
    left: "8vw",
    width: "85vw",
    gap: "2vw",
  }}
>
  <input
    type="text"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="laplap.mariel05@edu.ph"
    className="bg-white focus:outline-none font-bold" // changed from bg-transparent
    style={{
      fontSize: "3vw",
      color: "black",
      borderBottom: "none",
      flexShrink: 1, // allow shrinking on small screens
      minWidth: "40vw", // prevent it from getting too small
      width: `${Math.max(4 * (email.length || 20), 40)}vw`,
      transition: "width 0.2s ease",
    }}
  />
  <p
    className="underline cursor-pointer font-semibold"
    style={{
      fontSize: "3vw",
      color: "#36570A",
      whiteSpace: "nowrap", // force the text to stay in one line
    }}
    onClick={() => alert("Change email clicked")}
  >
    Change email address?
  </p>
</div>



      {/* Verification code boxes */}
      <div
        className="absolute flex justify-between"
        style={{
          top: "34vh",
          left: "7vw",
          width: "86vw",
        }}
      >
        {[input1, input2, input3, input4].map((ref, idx) => {
          const prevInput = idx > 0 ? [input1, input2, input3][idx - 1] : null;
          const nextInput = idx < 3 ? [input2, input3, input4][idx] : null;
          return (
            <input
              key={idx}
              type="text"
              maxLength={1}
              ref={ref}
              className="text-center rounded-lg font-bold"
              style={{
                width: "18vw",
                height: "18vw",
                fontSize: "6vw",
                backgroundColor: "rgba(54,87,10,0.3)",
              }}
              onChange={(e) => handleChange(e, nextInput)}
              onKeyDown={(e) => handleKeyDown(e, prevInput)}
            />
          );
        })}
      </div>

      {/* Timer */}
      <div
        className="absolute text-black"
        style={{
          top: "46vh",
          left: "35vw",
          fontSize: "3vw",
        }}
      >
        Resend code after:{" "}
        <span className="font-bold">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </span>
      </div>

      {/* Confirm button */}
      <button
        className="absolute rounded-lg text-white font-bold"
        style={{
          top: "53vh",
          left: "7vw",
          width: "86vw",
          height: "7vh",
          backgroundColor: "#36570A",
          fontSize: "4vw",
        }}
        onClick={() => alert("Confirm clicked")}
      >
        Confirm
      </button>

      {/* Resend button */}
      <button
        className="absolute rounded-lg"
        style={{
          top: "61vh",
          left: "7vw",
          width: "86vw",
          height: "7vh",
          backgroundColor: "rgba(54,87,10,0.2)",
          fontSize: "4vw",
          color: "black",
          opacity: timer > 0 ? 0.5 : 1,
        }}
        onClick={() => alert("Resend clicked")}
        disabled={timer > 0}
      >
        Resend
      </button>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 p-4">
          <div
            className="bg-white rounded-lg text-center p-5"
            style={{ width: "86vw" }}
          >
            <p
              className="text-black mb-4"
              style={{ fontSize: "3.5vw" }}
            >
              Do you want to resend a new code?
            </p>
            <div className="flex justify-between gap-3">
              <button
                className="flex-1 rounded-lg bg-black text-white"
                style={{ height: "7vh", fontSize: "3.5vw" }}
                onClick={handleResendYes}
              >
                Yes
              </button>
              <button
                className="flex-1 rounded-lg bg-green-900/20"
                style={{ height: "7vh", fontSize: "3.5vw" }}
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
