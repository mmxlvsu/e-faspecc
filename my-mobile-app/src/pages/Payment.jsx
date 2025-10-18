import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import backIcon from "../assets/back.png";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0;
  const [paymentMethod, setPaymentMethod] = useState("");
  const [instruction, setInstruction] = useState("");

  return (
    <div className="w-screen h-screen relative bg-white">
      {/* Header */}
      <div
        className="fixed flex items-center"
        style={{
          top: "0vw",
          left: "0vw",
          right: "0vw",
          height: "15vw",
          padding: "0 4vw",
          boxShadow: "0 0.2vw 0.5vw rgba(0,0,0,0.1)",
          zIndex: 9999,
          position: "relative",
        }}
      >
        <h1
          className="flex-1 text-center font-bold"
          style={{
            fontSize: "4vw",
            color: "black",
            top: "0vw",
            left: "0vw",
            position: "relative",
          }}
        >
          Checkout
        </h1>
      </div>

      {/* Scrollable Container */}
      <div
        style={{
          position: "absolute",
          top: "15vw",
          left: "0vw",
          right: "0vw",
          bottom: "15vh",
          overflowY: "auto",
          padding: "4vw",
          backgroundColor: "white",
        }}
      >
        {/* Payment Method Section */}
        <span
          style={{
            fontSize: "3.5vw",
            fontWeight: "600",
            color: "#36570A",
          }}
        >
          Payment Method
        </span>

        <div
          style={{
            backgroundColor: "white",
            border: "0.9px solid black",
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
              style={{
                width: "5vw",
                height: "5vw",
                accentColor: "#36570A",
              }}
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
              style={{
                width: "5vw",
                height: "5vw",
                accentColor: "#36570A",
              }}
            />
          </label>

          {/* Note */}
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
              For Cash payments, please prepare the exact amount if possible.
              For GCash payments, ensure your app is ready for the transaction.
            </span>
          </div>
        </div>

        {/* Order Summary Section */}
        <span
          style={{
            fontSize: "3.5vw",
            fontWeight: "600",
            color: "#36570A",
          }}
        >
          Order Summary
        </span>

        {/* Order Summary Placeholder */}
        <div
          style={{
            position: "relative",
            width: "100%",
            left: "0%",
            marginTop: "2vw",
            backgroundColor: "white",
            borderRadius: "2vw",
            padding: "4vw",
            boxShadow: "0 0.3vw 0.8vw rgba(0,0,0,0.1)",
            marginBottom: "3vw",
          }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "2.5vw",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2vw",
                }}
              >
                {/* Quantity Placeholder */}
                <div
                  style={{
                    width: "6vw",
                    height: "4vw",
                    backgroundColor: "#ddd",
                    borderRadius: "1vw",
                    animation: "pulse 1.5s infinite",
                  }}
                ></div>

                {/* Menu Title Placeholder */}
                <div
                  style={{
                    width: "30vw",
                    height: "4vw",
                    backgroundColor: "#eee",
                    borderRadius: "1vw",
                    animation: "pulse 1.5s infinite",
                  }}
                ></div>
              </div>

              {/* Price Placeholder */}
              <div
                style={{
                  width: "15vw",
                  height: "4vw",
                  backgroundColor: "#eee",
                  borderRadius: "1vw",
                  animation: "pulse 1.5s infinite",
                }}
              ></div>
            </div>
          ))}

          <hr style={{ border: "0.1vw solid #ccc", margin: "3vw 0" }} />

          {/* Placeholder for Total */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "25vw",
                height: "4.5vw",
                backgroundColor: "#eee",
                borderRadius: "1vw",
                animation: "pulse 1.5s infinite",
              }}
            ></div>
            <div
              style={{
                width: "20vw",
                height: "4.5vw",
                backgroundColor: "#eee",
                borderRadius: "1vw",
                animation: "pulse 1.5s infinite",
              }}
            ></div>
          </div>
        </div>

        <style>{`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.6; }
            100% { opacity: 1; }
          }
        `}</style>

        {/* Special Instruction Section */}
        <div style={{ marginTop: "4vw", marginBottom: "6vw" }}>
          <span
            style={{
              display: "block",
              fontSize: "3.5vw",
              fontWeight: "600",
              color: "#36570A",
              marginBottom: "1.5vw",
            }}
          >
            Special Instruction
          </span>

          <span
            style={{
              display: "block",
              fontSize: "2.3vw",
              fontWeight: "400",
              color: "#555",
              lineHeight: "1.4",
              marginBottom: "2vw",
            }}
          >
            💬 Got any special requests for your food? You can place them here —
            like “no peanuts,” “less spicy,” “extra rice,” or anything you’d like
            us to take note of when preparing your order. We’ll do our best to
            follow your instructions so your meal comes out just the way you
            want it!
          </span>

          {/* Textarea + Counter */}
          <div style={{ position: "relative" }}>
            <textarea
              maxLength={500}
              placeholder="Type your special instructions here..."
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
                position: "absolute",
                bottom: "3vw",
                right: "3vw",
                fontSize: "2.5vw",
                color: "#888",
              }}
            >
              {instruction.length}/500
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Container */}
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
            ₱ {totalAmount.toFixed(2)}
          </span>
        </div>

        {/* Buttons Row */}
        <div style={{ display: "flex", gap: "4vw", marginTop: "0vw" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              width: "40vw",
              height: "12vw",
              backgroundColor: "white",
              border: "1px solid #36570A",
              color: "#333",
              borderRadius: "1.5vw",
              fontSize: "4vw",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Back to Cart
          </button>

          <button
            onClick={() =>
              alert(
                `Proceed to payment with ${
                  paymentMethod || "no method"
                } and instruction: ${instruction || "none"}`
              )
            }
            style={{
              width: "40vw",
              height: "12vw",
              backgroundColor: "#36570A",
              color: "white",
              border: "none",
              borderRadius: "1.5vw",
              fontSize: "4vw",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}
