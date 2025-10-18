import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../assets/back.png";
import cartempty from "../assets/empty.png";

export default function Cart({ cartItems = [], onRemoveItem }) {
  const navigate = useNavigate();
  const [placeholderQuantities, setPlaceholderQuantities] = useState(
    Array.from({ length: 5 }, () => 1)
  );
  const scrollRef = useRef(null);
  const [showCheckout, setShowCheckout] = useState(true);

  const handleQuantityChange = (index, delta) => {
    setPlaceholderQuantities(prev =>
      prev.map((q, i) => (i === index ? Math.max(1, q + delta) : q))
    );
  };

  const handleRemove = index => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      setPlaceholderQuantities(prev => prev.filter((_, i) => i !== index));
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
    backgroundColor: "#fff",
    borderRadius: "3vw",
    width: "90%",
    left: "5%",
    position: "relative",
  };

  const addOnItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2vw 2vw",
    borderBottom: "1px solid #eee",
    backgroundColor: "#f8f8f8",
    borderRadius: "1.5vw",
    marginBottom: "2vw",
  };

  const totalAmount =
    cartItems.length > 0
      ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      : 0;

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
        <h1 className="flex-1 text-center font-bold" style={{ fontSize: "4vw", color: "black" }}>
          Cart
        </h1>
      </div>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className="absolute top-[15vw] bottom-0 left-0 right-0 overflow-y-auto px-4vw"
        style={{ backgroundColor: "#F3F3F3", paddingTop: "4vw" }}
      >
        {cartItems.length === 0 ? (
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <img
              src={cartempty}
              alt="Cart Empty"
              style={{
                position: "absolute",
                top: "50vw",
                left: "42vw",
                width: "20vw",
                height: "20vw",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "75vw",
                left: "31vw",
                fontSize: "5vw",
                color: "#777",
              }}
            >
              Your cart is empty
            </div>
          </div>
        ) : (
          cartItems.map((item, i) => {
            const quantity = item.quantity;
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
                  margin: "0 auto 4vw",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
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

                {/* Quantity */}
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
                    onClick={() => handleQuantityChange(i, -1)}
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
                  <div style={{ width: "8vw", textAlign: "center", fontSize: "4vw", fontWeight: "500" }}>
                    {quantity}
                  </div>
                  <button
                    onClick={() => handleQuantityChange(i, 1)}
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
          })
        )}

        {/* Add-ons */}
        {cartItems.length > 0 && (
          <div style={addOnsContainerStyle}>
            <h2 style={{ fontSize: "3vw", fontWeight: "600", marginBottom: "2vw" }}>Add-ons</h2>
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} style={addOnItemStyle}>
                <div style={{ width: "50%", height: "5vw", backgroundColor: "#ddd", borderRadius: "1vw" }} />
                <div style={{ width: "15%", height: "5vw", backgroundColor: "#ddd", borderRadius: "1vw" }} />
                <div style={{ width: "5vw", height: "5vw", backgroundColor: "#ddd", borderRadius: "1vw" }} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.6; }
          100% { opacity: 1; }
        }
      `}</style>

      {/* Checkout */}
      {showCheckout && cartItems.length > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: "18vh",
            backgroundColor: "white",
            borderTopLeftRadius: "5vw",
            borderTopRightRadius: "5vw",
            boxShadow: "0 -0.5vw 1vw rgba(0,0,0,0.15)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            paddingTop: "2vw",
          }}
        >
          <div style={{ position: "absolute", top: "5vw", left: "5vw", fontSize: "5vw", fontWeight: "400", color: "#333" }}>
            Total:
          </div>
          <div style={{ position: "absolute", top: "5vw", right: "5vw", fontSize: "5vw", fontWeight: "600", color: "#36570A" }}>
            ₱{totalAmount.toFixed(2)}
          </div>
          <button
            onClick={() => { if (cartItems.length > 0) alert("Proceed to checkout"); }}
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
              cursor: cartItems.length > 0 ? "pointer" : "not-allowed",
              opacity: cartItems.length > 0 ? 1 : 0.5,
            }}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
