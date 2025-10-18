import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../assets/back.png";

export default function Cart({ cartItems = [], onRemoveItem }) {
  const navigate = useNavigate();

  const [placeholderQuantities, setPlaceholderQuantities] = useState(
    Array.from({ length: 5 }, () => 1)
  );

  const scrollRef = useRef(null);
  const [showCheckout, setShowCheckout] = useState(true);

  const handleQuantityChange = (index, delta) => {
    setPlaceholderQuantities((prev) =>
      prev.map((q, i) => (i === index ? Math.max(1, q + delta) : q))
    );
  };

  const handleRemove = (index) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      setPlaceholderQuantities((prev) => prev.filter((_, i) => i !== index));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const el = scrollRef.current;
      if (!el) return;
      setShowCheckout(el.scrollTop + el.clientHeight < el.scrollHeight);
    };

    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", handleScroll);
    return () => el && el.removeEventListener("scroll", handleScroll);
  }, []);

  const addOnsContainerStyle = {
    marginTop: "2vw",
    marginBottom: "12vw",
    padding: "3vw",
    backgroundColor: "#ffffff",
    borderRadius: "3vw",
    width: "90%",
    position: "relative",
    left: "5%",
    top: "0",
  };

  const addOnItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2vw 0",
    borderBottom: "1px solid #eee",
    backgroundColor: "#f8f8f8",
    borderRadius: "1.5vw",
    paddingLeft: "2vw",
    paddingRight: "2vw",
    marginBottom: "2vw",
  };

  const totalAmount =
    cartItems.length > 0
      ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      : placeholderQuantities.reduce(
          (sum, q, i) => sum + (cartItems[i]?.price || 50) * q,
          0
        );

  return (
    <div className="w-screen h-screen relative bg-white">
      {/* Header */}
      <div
        className="fixed top-0 left-0 right-0 flex items-center"
        style={{
          height: "15vw",
          padding: "0 4vw",
          boxShadow: "0 0.2vw 0.5vw rgba(0,0,0,0.1)",
          zIndex: 9999,
          position: "relative",
        }}
      >
        <img
          src={backIcon}
          alt="Back"
          className="cursor-pointer"
          style={{ width: "5vw", height: "5vw" }}
          onClick={() => navigate("/home")}
        />
        <h1
          className="flex-1 text-center font-bold"
          style={{ fontSize: "4vw", color: "black" }}
        >
          Cart
        </h1>
      </div>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="absolute top-[15vw] bottom-0 left-0 right-0 overflow-y-auto px-4vw"
        style={{ backgroundColor: "#F3F3F3", paddingTop: "4vw" }}
      >
        {(cartItems.length === 0
          ? Array.from({ length: placeholderQuantities.length })
          : cartItems
        ).map((item, i) => {
          const quantity =
            cartItems.length === 0 ? placeholderQuantities[i] : item.quantity;

          return (
            <div
              key={i}
              style={{
                position: "relative",
                backgroundColor: "white",
                borderRadius: "3vw",
                padding: "2vw",
                height: "25vw",
                width: "90%",
                margin: "0 auto 4vw auto",
                display: "flex",
                flexDirection: "column",
                animation:
                  cartItems.length === 0 ? "pulse 1.5s infinite" : "none",
              }}
            >
              {/* Image placeholder */}
              <div
                style={{
                  position: "absolute",
                  top: "2.5vw",
                  left: "3vw",
                  width: "25%",
                  height: "80%",
                  backgroundColor: "#ddd",
                  borderRadius: "2vw",
                }}
              />

              {/* Title placeholder */}
              {cartItems.length === 0 ? (
                <div
                  style={{
                    position: "absolute",
                    top: "3vw",
                    left: "30vw",
                    width: "40%",
                    height: "4vw",
                    backgroundColor: "#ddd",
                    borderRadius: "1vw",
                  }}
                />
              ) : (
                <div
                  style={{
                    position: "absolute",
                    top: "3vw",
                    left: "30vw",
                    fontSize: "3vw",
                    fontWeight: "600",
                    color: "#333",
                  }}
                >
                  {item.name}
                </div>
              )}

              {/* Price placeholder / real price */}
              {cartItems.length === 0 ? (
                <div
                  style={{
                    position: "absolute",
                    top: "8vw",
                    left: "30vw",
                    width: "20%",
                    height: "3vw",
                    backgroundColor: "#ccc",
                    borderRadius: "1vw",
                  }}
                />
              ) : (
                <div
                  style={{
                    position: "absolute",
                    top: "8vw",
                    left: "30vw",
                    fontSize: "2.8vw",
                    color: "#2e7d32",
                    fontWeight: "500",
                  }}
                >
                  ₱{Number(item.price).toFixed(2)}
                </div>
              )}

              {/* X Remove Button */}
              <button
                onClick={() => handleRemove(i)}
                style={{
                  position: "absolute",
                  top: "1vw",
                  right: "3vw",
                  fontSize: "5vw",
                  fontWeight: "bold",
                  background: "none",
                  border: "none",
                  color: "black",
                  cursor: "pointer",
                }}
              >
                ×
              </button>

              {/* Quantity Controls */}
              <div
                style={{
                  position: "absolute",
                  top: "16vw",
                  right: "3vw",
                  display: "flex",
                  alignItems: "center",
                  gap: "1vw",
                }}
              >
                <button
                  onClick={() =>
                    cartItems.length === 0 && handleQuantityChange(i, -1)
                  }
                  style={{
                    width: "5vw",
                    height: "5vw",
                    borderRadius: "50%",
                    border: "1px solid #ccc",
                    backgroundColor: "#fff",
                    fontSize: "3vw",
                    cursor: "pointer",
                  }}
                >
                  -
                </button>
                <div
                  style={{
                    width: "8vw",
                    textAlign: "center",
                    fontSize: "4vw",
                    fontWeight: "500",
                  }}
                >
                  {quantity}
                </div>
                <button
                  onClick={() =>
                    cartItems.length === 0 && handleQuantityChange(i, 1)
                  }
                  style={{
                    width: "5vw",
                    height: "5vw",
                    borderRadius: "50%",
                    border: "1px solid #ccc",
                    backgroundColor: "#fff",
                    fontSize: "3vw",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}

        {/* Add-ons Placeholder Container */}
        <div style={addOnsContainerStyle}>
          <h2 style={{ fontSize: "3vw", fontWeight: "600", marginBottom: "2vw" }}>
            Add-ons
          </h2>
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} style={addOnItemStyle}>
              {/* Food Title Placeholder */}
              <div
                style={{
                  width: "50%",
                  height: "5vw",
                  backgroundColor: "#ddd",
                  borderRadius: "1vw",
                }}
              />
              {/* Price Placeholder */}
              <div
                style={{
                  width: "15%",
                  height: "5vw",
                  backgroundColor: "#ddd",
                  borderRadius: "1vw",
                }}
              />
              {/* Checkbox Placeholder */}
              <div
                style={{
                  width: "5vw",
                  height: "5vw",
                  backgroundColor: "#ddd",
                  borderRadius: "1vw",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pulse animation */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.6; }
            100% { opacity: 1; }
          }
        `}
      </style>

      {/* Checkout Container */}
      {showCheckout && (
        <div
    style={{
      position: "fixed",  // 🔹 fixed to viewport
      bottom: 0,          // 🔹 always at bottom
      left: 0,
      right: 0,
      height: "18vh",
      backgroundColor: "white",
      borderTopLeftRadius: "5vw",
      borderTopRightRadius: "5vw",
      boxShadow: "0 -0.5vw 1vw rgba(0,0,0,0.15)",
      zIndex: 9999,       // 🔹 stays above scrollable content
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      paddingTop: "2vw",
    }}
        >
          {/* Total Label */}
          <div
            style={{
              position: "absolute",
              top: "5vw",
              left: "5vw",
              fontSize: "5vw",
              fontWeight: "400",
              color: "#333",
            }}
          >
            Total:
          </div>

          {/* Total Amount */}
          <div
            style={{
              position: "absolute",
              top: "5vw",
              right: "5vw",
              fontSize: "5vw",
              fontWeight: "600",
              color: "#36570A",
            }}
          >
            ₱{totalAmount.toFixed(2)}
          </div>

          {/* Checkout Button */}
          <button
            onClick={() => alert("Proceed to checkout")}
            style={{
              position: "absolute",
              bottom: "8vw",
              left: "50%",
              transform: "translateX(-50%)",
              width: "80vw",
              height: "12vw",
              backgroundColor: "#36570A",
              color: "white",
              border: "none",
              borderRadius: "2.5vw",
              fontSize: "4vw",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
