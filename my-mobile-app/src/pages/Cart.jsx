import React, { useState } from "react";
import car1 from "../assets/car1.png"; // placeholder image
import trash from "../assets/trash.png";

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

const handleAction = (action) => console.log(`${action} clicked`);

export default function WhiteAndGreenRectangle() {
  const vw = (pixels) => `${(pixels / 4.14).toFixed(1)}vw`;
  const vh = (pixels) => `${(pixels / 9).toFixed(1)}vh`;
  const responsiveText = (pixels) => `${(pixels / 4.14).toFixed(1)}vw`;

  // Backend-ready cart items
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Chicken Adobo", description: "Classic Filipino chicken stew", quantity: 1, price: 150, productId: 101, options: {}, image: car1 },
    { id: 2, name: "Fried Rice", description: "Stir-fried rice with veggies", quantity: 2, price: 50, productId: 102, options: {}, image: car1 },
    { id: 3, name: "Soda", description: "Refreshing carbonated drink", quantity: 1, price: 30, productId: 103, options: {}, image: car1 },
    { id: 4, name: "Spring Rolls", description: "Crispy rolls with veggies", quantity: 2, price: 70, productId: 104, options: {}, image: car1 },
    { id: 5, name: "Ice Cream", description: "Sweet frozen dessert", quantity: 1, price: 120, productId: 105, options: {}, image: car1 },
  ]);

  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", position: "relative", paddingBottom: vh(132) }}>
      <BackIconSVG
        onClick={() => handleAction("Back")}
        style={{
          position: "absolute",
          left: vw(12),
          top: vh(73),
          width: vw(24),
          height: vw(24),
          cursor: "pointer",
          zIndex: 3,
          color: "#000000"
        }}
      />

      <p
        style={{
          position: "absolute",
          left: vw(43),
          top: vh(75),
          fontSize: responsiveText(14),
          fontWeight: 600,
          fontFamily: "Poppins, sans-serif",
          color: "#000000",
          lineHeight: responsiveText(21),
          zIndex: 3,
        }}
      >
        Cart
      </p>

      {/* Steps */}
      <div
        style={{
          position: "absolute",
          top: vh(115),
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: vw(90), 
          zIndex: 2,
        }}
      >
        {/* Step 1 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{
            width: vw(28), height: vw(28), borderRadius: "50%",
            backgroundColor: "#000000", display: "flex",
            justifyContent: "center", alignItems: "center",
            color: "#FFFFFF", fontWeight: 300, fontSize: responsiveText(12),
          }}>
            1
          </div>
          <span style={{
            marginTop: vw(4), fontSize: responsiveText(10),
            color: "#000000", fontFamily: "Poppins, sans-serif",
          }}>Menu</span>
        </div>

        {/* Step 2 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{
            width: vw(28), height: vw(28), borderRadius: "50%",
            backgroundColor: "#000000", display: "flex",
            justifyContent: "center", alignItems: "center",
            color: "#FFFFFF", fontWeight: 300, fontSize: responsiveText(12),
          }}>
            2
          </div>
          <span style={{
            marginTop: vw(4), fontSize: responsiveText(10),
            color: "#000000", fontFamily: "Poppins, sans-serif",
          }}>Cart</span>
        </div>

        {/* Step 3 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{
            width: vw(28), height: vw(28), borderRadius: "50%",
            backgroundColor: "#CCCCCC", display: "flex",
            justifyContent: "center", alignItems: "center",
            color: "#FFFFFF", fontWeight: 300, fontSize: responsiveText(12),
          }}>
            3
          </div>
          <span style={{
            marginTop: vw(4), fontSize: responsiveText(10),
            color: "#8C8C8C", fontFamily: "Poppins, sans-serif",
          }}>Checkout</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: vh(130),
          left: 0,
          width: "100%",
          height: vw(2),
          backgroundColor: "#CECECE",
          zIndex: 1,
        }}
      />

      {/* Dynamic Cart Items */}
      <div
        style={{
          position: "absolute",
          top: vh(190),
          left: 0,
          width: "100%",
          maxHeight: `calc(100vh - ${vh(280)})`,
          overflowY: "auto",
          padding: `${vh(10)} ${vw(18)}`,
          boxSizing: "border-box",
          zIndex: 4,
        }}
      >
        {cartItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "flex-start",
              marginBottom: vh(18),
              gap: vw(12),
            }}
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: vw(40),
                height: vw(40),
                objectFit: "cover",
                borderRadius: vw(6),
              }}
            />

            {/* Title + Description + Rectangle Placeholder */}
            <div style={{ flex: 1 }}>
              <p style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: responsiveText(12),
                fontWeight: 700,
                margin: 0,
                color: "#000000",
              }}>
                {item.name}
              </p>
              <p style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: responsiveText(10),
                fontWeight: 400,
                margin: 0,
                marginTop: vh(-3),
                color: "#555555",
              }}>
                {item.description}
              </p>

              {/* Rectangle Placeholder with Trash Icon */}
              <div
                style={{
                  marginTop: vh(6),
                  width: vw(40),
                  height: vh(19),
                  backgroundColor: "#FFFFFF",
                  border: "0.5px solid #CECECE",
                  borderRadius: vw(10),
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleRemove(item.id)}
              >
                <img
                  src={trash}
                  alt="Remove"
                  style={{
                    width: vw(12),
                    height: vw(12),
                  }}
                />
              </div>
            </div>

            {/* Price */}
            <p style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: responsiveText(10),
              fontWeight: 300,
              marginTop: vh(16),
              marginBottom: 0,
            }}>
              P {item.price * item.quantity}.00
            </p>
          </div>
        ))}
      </div>

      {/* Bottom Total and Review Payment */}
      <div
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          height: vh(140),
          backgroundColor: "#FFFFFF",
          borderTop: "0.5px solid #CECECE",
          boxShadow: "0 -2px 5px rgba(0,0,0,0.05)",
          zIndex: 5,
        }}
      >
        <p
          style={{
            position: "absolute",
            left: vw(19),
            top: vh(13),
            fontSize: responsiveText(12),
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            color: "#000000",
            lineHeight: responsiveText(18),
            zIndex: 6,
          }}
        >
          Total
        </p>

        <p
          style={{
            position: "absolute",
            right: vw(19),
            top: vh(13),
            fontSize: responsiveText(12),
            fontFamily: "Poppins, sans-serif",
            fontWeight: 900,
            color: "#36570A",
            lineHeight: responsiveText(18),
            textAlign: "right",
            zIndex: 6,
          }}
        >
          P 719.00
        </p>

        <div
          style={{
            position: "absolute",
            left: vw(18),
            right: vw(18),
            bottom: vw(25),
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
          onClick={() => handleAction("Review Payment")}
        >
          <span
            style={{
              color: "#FFFFFF",
              fontSize: responsiveText(13),
              fontFamily: "Poppins, sans-serif",
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
