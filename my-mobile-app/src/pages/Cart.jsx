import React from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../assets/back.png";

export default function Cart() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen relative bg-white">
      {/* Header Container */}
      <div className="absolute w-full flex items-center" style={{ top: "4vh", padding: "0 4vw" }}>
        {/* Back Icon */}
        <img
          src={backIcon}
          alt="Back"
          className="cursor-pointer"
          style={{ width: "5vw", height: "5vw" }}
          onClick={() => navigate("/home")}
        />

        {/* Cart Page Title */}
        <h1
          className="flex-1 text-center font-bold"
          style={{ fontSize: "4vw" }}
        >
          Cart
        </h1>
      </div>
    </div>
  );
}
