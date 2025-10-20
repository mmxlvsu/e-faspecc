import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import backIcon from "../assets/back.png";
import { orderAPI } from "../lib/api"; // ✅ import your API helper

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0;

  const [paymentMethod, setPaymentMethod] = useState("");
  const [instruction, setInstruction] = useState("");

  // ✅ Retrieve cart items from navigation state or localStorage
  const cartItems =
    location.state?.cartItems || JSON.parse(localStorage.getItem("cart")) || [];

  // ✅ Confirm Order Function
  async function handleConfirmOrder() {
    try {
      if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Please log in to place an order.");
        navigate("/login");
        return;
      }

      const orderData = {
        items: cartItems.map((item) => ({
          menuId: item.id,
          quantity: item.quantity,
        })),
        pickupType: "take_out",
        pickupTime: null,
        paymentMethod,
        instruction,
      };

      const newOrder = await orderAPI.createOrder(orderData);
      console.log("✅ Order created:", newOrder);
      alert("Order placed successfully!");

      localStorage.removeItem("cart");
      navigate("/order");
    } catch (err) {
      console.error("Order error:", err);
      alert("❌ Failed to place order: " + err.message);
    }
  }

  return (
    <div className="w-screen h-screen relative bg-white">
      {/* Header */}
      <div
        className="fixed flex items-center"
        style={{
          top: "0",
          left: "0",
          right: "0",
          height: "15vw",
          padding: "0 4vw",
          boxShadow: "0 0.2vw 0.5vw rgba(0,0,0,0.1)",
          zIndex: 9999,
        }}
      >
        <img
          src={backIcon}
          alt="Back"
          style={{
            width: "6vw",
            height: "6vw",
            cursor: "pointer",
          }}
          onClick={() => navigate(-1)}
        />
        <h1
          className="flex-1 text-center font-bold"
          style={{
            fontSize: "4vw",
            color: "black",
          }}
        >
          Checkout
        </h1>
      </div>

      {/* Scrollable Content */}
      <div
        style={{
          position: "absolute",
          top: "15vw",
          left: "0",
          right: "0",
          bottom: "18vh",
          overflowY: "auto",
          padding: "4vw",
          backgroundColor: "white",
        }}
      >
        {/* Payment Method */}
        <span
          style={{
            fontSize: "4vw",
            fontWeight: "600",
            color: "#36570A",
          }}
        >
          Payment Method
        </span>

        <div
          style={{
            border: "0.2px solid #36570A",
            borderRadius: "1vw",
            padding: "4vw",
            display: "flex",
            flexDirection: "column",
            gap: "3vw",
            marginTop: "1.5vw",
            marginBottom: "3vw",
          }}
        >
          {/* Cash Option */}
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "3.8vw",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Cash
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
              style={{ width: "5vw", height: "5vw", accentColor: "#36570A" }}
            />
          </label>

          {/* GCash Option */}
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "3.8vw",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            GCash
            <input
              type="radio"
              name="payment"
              value="gcash"
              checked={paymentMethod === "gcash"}
              onChange={() => setPaymentMethod("gcash")}
              style={{ width: "5vw", height: "5vw", accentColor: "#36570A" }}
            />
          </label>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2vw",
              fontSize: "2.7vw",
              color: "#555",
              lineHeight: "4vw",
            }}
          >
            <span>💡</span>
            <span>
              For Cash payments, please prepare the exact amount if possible. For
              GCash payments, ensure your app is ready for the transaction.
            </span>
          </div>
        </div>

        {/* Order Summary */}
        <span
          style={{
            fontSize: "4vw",
            fontWeight: "600",
            color: "#36570A",
          }}
        >
          Order Summary
        </span>

        <div
          style={{
            marginTop: "2vw",
            backgroundColor: "white",
            borderRadius: "1vw",
            border: "0.4vw solid #ccc",
            padding: "4vw",
            marginBottom: "3vw",
          }}
        >
          {cartItems.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "2.5vw",
              }}
            >
              <div style={{ display: "flex", gap: "2vw", alignItems: "center" }}>
                <span style={{ fontSize: "3.2vw" }}>{item.quantity}x</span>
                <span style={{ fontSize: "3.2vw" }}>{item.name}</span>
              </div>
              <span
                style={{
                  fontSize: "3.2vw",
                  color: "black",
                  fontWeight: "500",
                }}
              >
                ₱{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          <hr style={{ border: "0.2vw solid #ccc", margin: "3vw 0" }} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "4vw", fontWeight: "600" }}>Total</span>
            <span
              style={{
                fontSize: "4vw",
                fontWeight: "700",
                color: "#36570A",
              }}
            >
              ₱{totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Special Instruction */}
        <div style={{ marginTop: "4vw", marginBottom: "6vw" }}>
          <span
            style={{
              display: "block",
              fontSize: "4vw",
              fontWeight: "600",
              color: "#36570A",
              marginBottom: "1.5vw",
            }}
          >
            Special Instruction
          </span>

          <textarea
            maxLength={500}
            placeholder="Type your special request here"
            style={{
              width: "100%",
              minHeight: "25vw",
              fontSize: "2.8vw",
              padding: "3vw",
              borderRadius: "1.5vw",
              border: "0.9px solid #ccc",
              resize: "vertical",
              outline: "none",
            }}
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
          ></textarea>

          <span
            style={{
              display: "block",
              textAlign: "right",
              fontSize: "2.5vw",
              color: "#888",
              marginTop: "1vw",
            }}
          >
            {instruction.length}/500
          </span>
        </div>
      </div>

      {/* Bottom Checkout Bar */}
      {cartItems.length > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: "0",
            left: "0",
            right: "0",
            minHeight: "18vh",
            backgroundColor: "white",
            boxShadow: "0 -0.3vw 1vw rgba(0,0,0,0.1)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2vw",
            gap: "2vw",
          }}
        >
          {/* Total Row */}
          <div
            style={{
              width: "88%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "clamp(16px, 4vw, 24px)",
                fontWeight: "400",
                color: "#333",
              }}
            >
              Total:
            </span>
            <span
              style={{
                fontSize: "clamp(16px, 4vw, 24px)",
                fontWeight: "600",
                color: "#36570A",
              }}
            >
              ₱{totalAmount.toFixed(2)}
            </span>
          </div>

          {/* Button Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "0vw",
            }}
          >
            <button
              onClick={handleConfirmOrder}
              style={{
                width: "80vw",
                height: "12vw",
                backgroundColor: "#36570A",
                color: "white",
                border: "none",
                borderRadius: "1.5vw",
                fontSize: "4vw",
                fontWeight: "600",
                cursor: cartItems.length > 0 ? "pointer" : "not-allowed",
                opacity: cartItems.length > 0 ? 1 : 0.5,
              }}
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
