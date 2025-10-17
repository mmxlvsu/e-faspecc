import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import trash from "../assets/trash.png";

// Checkbox SVG
const CheckIconSVG = ({ isChecked, style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke={isChecked ? "#36570A" : "#CECECE"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ ...style, cursor: "pointer", transition: "all 0.1s" }}
  >
    <rect x="3.5" y="2" width="20" height="20" rx="2" ry="2"></rect>
    {isChecked && <polyline points="9 11 12 14 20 6" stroke="#36570A" fill="none" />}
  </svg>
);

// Back arrow SVG
const BackIconSVG = ({ style, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ ...style }}
    onClick={onClick}
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

export default function Cart() {
  const navigate = useNavigate();
  const cartContentRef = useRef(null);
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(true);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [cartItems, setCartItems] = useState([]);

  // ✅ Load cart from localStorage
  useEffect(() => {
    const loadCart = () => {
      try {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        if (storedCart && Array.isArray(storedCart)) {
          console.log("🧾 Loaded cart from localStorage:", storedCart);
          setCartItems(storedCart);
        } else {
          console.log("⚠️ No valid cart data found.");
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error loading cart:", error);
        setCartItems([]);
      }
    };

    loadCart();

    // ✅ Listen for cart changes from other pages
    window.addEventListener("storage", loadCart);

    return () => {
      window.removeEventListener("storage", loadCart);
    };
  }, []);
  
  // ✅ Keep localStorage synced with cart state
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Handle remove (supports id or _id)
  const handleRemove = (id) => {
    const updated = cartItems.filter(
      (item) => item.id !== id && item._id !== id
    );
    setCartItems(updated);
  };

  // ✅ Quantity change (supports id or _id)
  const handleQuantityChange = (id, delta) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id || item._id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  // ✅ Add-ons
  const [addOns, setAddOns] = useState([
    { id: 1, name: "Extra Sauce", price: 10, isChecked: false },
    { id: 2, name: "Extra Toppings", price: 49, isChecked: true },
    { id: 3, name: "Disposable Cutlery", price: 0, isChecked: false },
  ]);

  const handleToggleAddOn = (id) =>
    setAddOns((prev) =>
      prev.map((addOn) =>
        addOn.id === id ? { ...addOn, isChecked: !addOn.isChecked } : addOn
      )
    );

  const selectedAddOnsTotal = addOns.reduce(
    (sum, addOn) => sum + (addOn.isChecked ? addOn.price : 0),
    0
  );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity || 0),
    0
  );
  const grandTotal = subtotal + selectedAddOnsTotal;

  // ✅ Hide bottom bar when scrolled to bottom
  const handleScroll = () => {
    const el = cartContentRef.current;
    if (!el) return;
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight <= 1;
    setIsBottomBarVisible(!isAtBottom);
  };

  const vw = (pixels) => `${(pixels / 4.14).toFixed(1)}vw`;
  const vh = (pixels) => `${(pixels / 9).toFixed(1)}vh`;
  const responsiveText = (pixels) => `${(pixels / 4.14).toFixed(1)}vw`;

  return (
    <div style={{ width: "100%", minHeight: "100vh", position: "relative" }}>
      {/* Header */}
      <BackIconSVG
        onClick={() => navigate("/home")}
        style={{
          position: "absolute",
          left: vw(12),
          top: vh(30),
          width: vw(24),
          height: vw(24),
          cursor: "pointer",
          zIndex: 3,
          color: "#000",
        }}
      />
      <p
        style={{
          position: "absolute",
          left: vw(43),
          top: vh(32),
          fontSize: responsiveText(14),
          fontWeight: 600,
          fontFamily: "Poppins, sans-serif",
          color: "#000",
          zIndex: 3,
        }}
      >
        Cart
      </p>

      {/* Progress Steps */}
      <div
        style={{
          position: "absolute",
          top: vh(90),
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: vw(90),
          zIndex: 2,
        }}
      >
        {[{ num: 1, label: "Menu" }, { num: 2, label: "Cart" }, { num: 3, label: "Checkout" }].map(
          (step, index) => (
            <div
              key={index}
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <div
                style={{
                  width: vw(28),
                  height: vw(28),
                  borderRadius: "50%",
                  backgroundColor: step.num < 3 ? "#000" : "#CCC",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                  fontWeight: 300,
                  fontSize: responsiveText(12),
                }}
              >
                {step.num}
              </div>
              <span
                style={{
                  marginTop: vw(4),
                  fontSize: responsiveText(10),
                  color: step.num < 3 ? "#000" : "#8C8C8C",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {step.label}
              </span>
            </div>
          )
        )}
      </div>

      {/* Cart Items */}
      <div
        ref={cartContentRef}
        onScroll={handleScroll}
        style={{
          position: "absolute",
          top: vh(150),
          left: 0,
          width: "100%",
          maxHeight: `calc(100vh - ${vh(70)})`,
          overflowY: "auto",
          zIndex: 4,
        }}
      >
        <div
          style={{
            width: "100%",
            padding: `${vh(20)} ${vw(18)}`,
            boxSizing: "border-box",
            backgroundColor: "white",
            borderBottom: "2px solid #CECECE",
          }}
        >
          {cartItems.length === 0 ? (
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                textAlign: "center",
                fontSize: responsiveText(12),
                color: "#888",
              }}
            >
              Your cart is empty 😔
            </p>
          ) : (
            cartItems.map((item) => {
              const itemId = item.id || item._id;
              return (
                <div
                  key={itemId}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: vh(20),
                    gap: vw(12),
                  }}
                >
                  <img
                    src={item.image || item.imageUrl}
                    alt={item.name}
                    style={{
                      width: vw(48),
                      height: vw(48),
                      objectFit: "cover",
                      borderRadius: vw(6),
                      marginTop: vh(-31),
                    }}
                  />
                  <div style={{ flex: 1, marginLeft: vw(5) }}>
                    <p
                      style={{
                        fontFamily: "Poppins,sans-serif",
                        fontSize: responsiveText(16),
                        fontWeight: 700,
                        margin: 0,
                        color: "#000",
                      }}
                    >
                      {item.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "Poppins,sans-serif",
                        fontSize: responsiveText(12),
                        fontWeight: 400,
                        margin: 0,
                        marginTop: vh(4),
                        color: "#555",
                      }}
                    >
                      {item.description || ""}
                    </p>

                    {/* Quantity & Delete */}
                    <div
                      style={{
                        marginTop: vh(10),
                        width: vw(100),
                        height: vh(32),
                        backgroundColor: "#fff",
                        border: "0.5px solid #CECECE",
                        borderRadius: vw(10),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: `0 ${vw(15)}`,
                        gap: vw(10),
                      }}
                    >
                      <img
                        src={trash}
                        alt="Remove"
                        style={{ width: vw(18), height: vw(18), cursor: "pointer" }}
                        onClick={() => handleRemove(itemId)}
                      />
                      <div style={{ display: "flex", alignItems: "center", gap: vw(8) }}>
                        <button
                          onClick={() => handleQuantityChange(itemId, -1)}
                          style={{
                            border: "none",
                            background: "none",
                            fontSize: responsiveText(16),
                            fontWeight: "bold",
                            cursor: "pointer",
                            color: "#36570A",
                          }}
                        >
                          –
                        </button>
                        <span
                          style={{
                            fontSize: responsiveText(14),
                            fontFamily: "Poppins,sans-serif",
                            fontWeight: 500,
                            color: "#000",
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(itemId, 1)}
                          style={{
                            border: "none",
                            background: "none",
                            fontSize: responsiveText(16),
                            fontWeight: "bold",
                            cursor: "pointer",
                            color: "#36570A",
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <p
                    style={{
                      fontFamily: "Poppins,sans-serif",
                      fontSize: responsiveText(12),
                      fontWeight: 300,
                      marginTop: vh(68),
                      marginBottom: 0,
                    }}
                  >
                    ₱{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              );
            })
          )}

          {/* Subtotal */}
          {cartItems.length > 0 && (
            <div style={{ marginTop: vh(15), display: "flex", justifyContent: "space-between" }}>
              <span
                style={{
                  fontFamily: "Poppins,sans-serif",
                  fontSize: responsiveText(14),
                  fontWeight: 400,
                }}
              >
                Subtotal
              </span>
              <span
                style={{
                  fontFamily: "Poppins,sans-serif",
                  fontSize: responsiveText(14),
                  fontWeight: 500,
                  color: "#000",
                }}
              >
                ₱{subtotal.toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          height: vh(140),
          backgroundColor: "#fff",
          borderTop: "0.5px solid #CECECE",
          boxShadow: "0 -2px 5px rgba(0,0,0,0.05)",
          zIndex: 5,
          transform: isBottomBarVisible
            ? "translateY(0)"
            : `translateY(${vh(140)})`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <p
          style={{
            position: "absolute",
            left: vw(19),
            top: vh(13),
            fontSize: responsiveText(14),
            fontFamily: "Poppins,sans-serif",
            fontWeight: 900,
            color: "#000",
          }}
        >
          Total
        </p>
        <p
          style={{
            position: "absolute",
            right: vw(19),
            top: vh(13),
            fontSize: responsiveText(14),
            fontFamily: "Poppins,sans-serif",
            fontWeight: 900,
            color: "#36570A",
          }}
        >
          ₱{grandTotal.toFixed(2)}
        </p>
        <div
          style={{
            position: "absolute",
            left: vw(18),
            right: vw(18),
            bottom: vw(35),
            width: `calc(100% - ${vw(36)})`,
            height: vw(42),
            backgroundColor: "#36570A",
            borderRadius: vw(6),
            zIndex: 6,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => navigate("/payment")}
        >
          <span
            style={{
              color: "#fff",
              fontSize: responsiveText(15),
              fontFamily: "Poppins,sans-serif",
              fontWeight: 600,
            }}
          >
            Review Payment
          </span>
        </div>
      </div>
    </div>
  );
}