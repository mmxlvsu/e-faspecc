import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import buyIcon from "../assets/buy.png";
import cartIcon from "../assets/cart.png";
import backIcon from "../assets/back.png";

export default function ProductActionButtons() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItem = location.state?.menuItem || {};
  const placeholderImage = menuItem?.image || null;

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(prev + delta, 1));
  };

  const totalPrice = (menuItem?.price || 0) * quantity;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundColor: "#F3F3F3",
        overflow: "hidden",
      }}
    >
      {/* Pulse Animation */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.6; }
            100% { opacity: 1; }
          }
          .pulse {
            animation: pulse 2s infinite;
          }
        `}
      </style>

      {/* Back Button */}
      <div
        onClick={() => navigate("/home")}
        style={{
          position: "absolute",
          top: "4vh",
          left: "4vw",
          width: "10vw",
          height: "10vw",
          borderRadius: "50%",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        <img src={backIcon} alt="Back" style={{ width: "5vw", height: "5vw",    filter: "invert(34%) sepia(77%) saturate(373%) hue-rotate(80deg) brightness(87%) contrast(86%)"
 }} />
      </div>

      {/* Circular Image Placeholder */}
      <div
        className="pulse"
        style={{
          position: "absolute",
          top: "-20vh",
          left: "50%",
          transform: "translateX(-50%)",
          width: "120vw",
          height: "120vw",
          borderRadius: "50%",
          backgroundColor: "#ddd",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {placeholderImage ? (
          <img
            src={placeholderImage}
            alt={menuItem.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span style={{ color: "#aaa", fontSize: "4vw" }}>Image</span>
        )}
      </div>

      {/* Quantity */}
      <div
        style={{
          position: "absolute",
          bottom: "47vh", // adjustable
          right: "10vw", // adjustable
          display: "flex",
          alignItems: "center",
          gap: "2vw",
          backgroundColor: "#fff",
          borderRadius: "2vw",
          padding: "1vw 3vw",
          fontSize: "3vw",
          fontWeight: "500",
          color: "black",
        }}
      >
        <span style={{ cursor: "pointer" }} onClick={() => handleQuantityChange(-1)}>
          -
        </span>
        <span>{quantity}</span>
        <span style={{ cursor: "pointer" }} onClick={() => handleQuantityChange(1)}>
          +
        </span>
      </div>

      {/* Price */}
      <p
        style={{
          position: "absolute",
          bottom: "20vh", // adjustable
          left: "50vw", // adjustable
          transform: "translateX(-50%)",
          fontSize: "6vw",
          fontWeight: "700",
          color: "#36570A",
          margin: 0,
        }}
      >
        ₱ {totalPrice.toFixed(2)}
      </p>

      {/* Title */}
      <h2
        style={{
          position: "absolute",
          bottom: "38vh", // adjustable
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "5vw",
          fontWeight: "500",
          margin: 0,
        }}
      >
        {menuItem?.name || "Menu Name"}
      </h2>

      {/* Description */}
      <p
        style={{
          position: "absolute",
          bottom: "35vh", // adjustable
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "3vw",
          color: "#333",
          margin: 0,
        }}
      >
        {menuItem?.description || "Menu description goes here."}
      </p>

      {/* Buy Now Button */}
      <button
        style={{
          position: "absolute",
          bottom: "10vh",
          left: "13vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFCC00",
          color: "black",
          fontWeight: "600",
          fontSize: "3vw",
          padding: "2vw 5vw",
          border: "none",
          borderRadius: "2vw",
          cursor: "pointer",
          width: "35vw",
        }}
      >
        <img
          src={buyIcon}
          alt="buy"
          style={{
            width: "5vw",
            height: "5vw",
            marginRight: "2vw",
            filter: "invert(0%) brightness(0%)",
          }}
        />
        Buy Now
      </button>

      {/* Add to Cart Button */}
      <button
        style={{
          position: "absolute",
          bottom: "10vh",
          left: "52vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#36570A",
          color: "white",
          fontWeight: "600",
          fontSize: "3vw",
          padding: "2vw 5vw",
          borderRadius: "2vw",
          cursor: "pointer",
          width: "35vw",
        }}
      >
        <img
          src={cartIcon}
          alt="cart"
          style={{
            width: "5vw",
            height: "5vw",
            marginRight: "2vw",
            filter: "invert(100%) brightness(200%)",
          }}
        />
        Add to Cart
      </button>
    </div>
  );
}
