import React, { useState, useRef } from "react";

const CheckIconSVG = ({ isChecked, onClick, style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke={isChecked ? "#36570A" : "#CECECE"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ ...style, cursor: "pointer", transition: "all 0.1s" }}
    onClick={onClick}
  >
    <rect x="3.5" y="2" width="20" height="20" rx="2" ry="2"></rect>
    {isChecked && <polyline points="9 11 12 14 20 6" stroke="#36570A" fill="none"></polyline>}
  </svg>
);

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

// Function to handle the click on the "terms & conditions" link
const handleTermsClick = () => {
    alert("Navigating to Terms & Conditions page or showing a modal...");
    console.log("Terms & Conditions clicked");
}

const handleAction = (action) => console.log(`${action} clicked`);

export default function WhiteAndGreenRectangle() {
  const vw = (pixels) => `${(pixels / 4.14).toFixed(1)}vw`;
  const vh = (pixels) => `${(pixels / 9).toFixed(1)}vh`;
  const responsiveText = (pixels) => `${(pixels / 4.14).toFixed(1)}vw`;

  const [selectedPayment, setSelectedPayment] = useState("Cash");
  // 1. State for controlling the visibility of the bottom bar
  const [showBottomBar, setShowBottomBar] = useState(true); 
  
  // Ref for the scrollable container
  const scrollContainerRef = useRef(null);
  
  // Ref to store the last scroll position
  const lastScrollTop = useRef(0);

  const subtotal = 550;
  const selectedAddOnsTotal = 49;
  const grandTotal = subtotal + selectedAddOnsTotal;

  const mockOrderItems = [
    { id: 1, name: "Chicken Adobo", quantity: 1, price: 40.0 },
    { id: 2, name: "Leche Flan", quantity: 2, price: 55.5 },
    { id: 3, name: "Lumpia Shanghai (10pcs)", quantity: 1, price: 120.0 },
    { id: 4, name: "Soda (Coke)", quantity: 3, price: 25.0 },
    { id: 5, name: "Garlic Rice", quantity: 1, price: 30.0 },
    { id: 6, name: "Chicken Adobo", quantity: 1, price: 40.0 },
    { id: 7, name: "Leche Flan", quantity: 2, price: 55.5 },
    { id: 8, name: "Lumpia Shanghai (10pcs)", quantity: 1, price: 120.0 },
    { id: 9, name: "Lumpia Shanghai (10pcs)", quantity: 1, price: 120.0 },
    { id: 10, name: "Soda (Coke)", quantity: 3, price: 25.0 },
  ];
  
  // 2. Scroll handler logic
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    
    // Check if scrolled to the absolute bottom (within a 2px tolerance)
    // The content is fully visible only when scrolled all the way down.
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 2;

    // Check if scrolling up
    const isScrollingUp = scrollTop < lastScrollTop.current;

    if (isAtBottom) {
      // Hide the bar when at the very bottom
      setShowBottomBar(false);
    } else if (isScrollingUp) {
      // Show the bar when scrolling up
      setShowBottomBar(true);
    } 
    
    // Update the last scroll position
    lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop; 
  };


  return (
    <div style={{ width: "100%", minHeight: "100vh", position: "relative", backgroundColor: "#FFFFFF" }}>
      
      {/* Absolute/Fixed Header Elements */}
      <BackIconSVG
        onClick={() => handleAction("Back")}
        style={{
          position: "absolute",
          left: vw(12),
          top: vh(30),
          width: vw(24),
          height: vw(24),
          cursor: "pointer",
          color: "#000000",
          zIndex: 3,
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
          color: "#000000",
          zIndex: 3,
        }}
      >
        Checkout
      </p>

      {/* Step Indicator and Separator */}
      <div
        style={{
          position: "absolute",
          top: vh(90),
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: vw(90),
          zIndex: 2,
        }}
      >
        {["Menu", "Cart", "Checkout"].map((label, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: vw(28),
                height: vw(28),
                borderRadius: "50%",
                backgroundColor: "#000000",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#FFFFFF",
                fontSize: responsiveText(12),
              }}
            >
              {i + 1}
            </div>
            <span
              style={{
                marginTop: vw(4),
                fontSize: responsiveText(10),
                color: "#000000",
                fontFamily: "Poppins, sans-serif",
              }}
            >
                {label}
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          top: vh(110),
          width: "100%",
          height: vw(2),
          backgroundColor: "black",
          zIndex: 1,
        }}
      />
      
      {/* MAIN SCROLLABLE CONTENT AREA */}
      <div 
        ref={scrollContainerRef} // 3. Attach the ref
        onScroll={handleScroll} // 4. Attach the scroll handler
        style={{
          position: "absolute",
          top: vh(130), // Start after the separator
          bottom: vh(10), // Stop before the fixed bottom bar
          width: "100%",
          overflowY: "auto",
          paddingBottom: vh(20), // Extra space at the bottom of the scroll area
        }}
      >
        {/* Payment Method - Now relative flow */}
        <div
          style={{
            width: "100%",
            padding: `0 ${vw(18)}`,
            boxSizing: "border-box",
            marginBottom: vh(25),
            marginTop: vh(40),
          }}
        >
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: responsiveText(16),
              fontWeight: 600,
              marginBottom: vh(10),
              color: "#36570A",
            }}
          >
            Payment Method
          </p>

          <div
            style={{
              border: `0.5px solid #CECECE`,
              borderRadius: vw(10),
              padding: `${vh(10)} ${vw(10)}`,
              backgroundColor: "#FFFFFF",
            }}
          >
            {["Cash", "G-Cash"].map((method) => (
              <div key={method}>
                <div
                  onClick={() => setSelectedPayment(method)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    padding: `${vh(5)} 0`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: responsiveText(14),
                      color: "#000000",
                    }}
                  >
                    {method}
                  </span>
                  <CheckIconSVG isChecked={selectedPayment === method} style={{ width: vw(18), height: vw(18) }} />
                </div>
                {method === "Cash" && (
                  <div style={{ height: "0.5px", backgroundColor: "#E0E0E0", margin: `${vh(10)} 0` }} />
                )}
              </div>
            ))}
          </div>

          {/* Payment Note */}
          <div
            style={{
              marginTop: vh(10),
              backgroundColor: "#FFF8E7",
              padding: `${vh(8)} ${vw(12)}`,
              borderRadius: vw(8),
              border: "1px solid #E0C97F",
            }}
          >
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: responsiveText(10),
                fontWeight: 500,
                color: "#4B4B4B",
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              💡 <strong>Note:</strong> For <strong>cash</strong>, please prepare the exact amount if possible.  
              For <strong>GCash</strong>, have your phone ready for a quicker transaction.
            </p>
          </div>
        </div>

        {/* Order Summary - Now relative flow */}
        <div
          style={{
            width: "100%",
            padding: `0 ${vw(18)}`,
            boxSizing: "border-box",
            marginBottom: vh(25),
          }}
        >
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: responsiveText(16),
              fontWeight: 600,
              color: "#36570A",
              marginBottom: vh(10),
            }}
          >
            Order Summary
          </p>

          <div>
            {mockOrderItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: vh(5),
                }}
              >
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: responsiveText(12),
                  }}
                >
                  {item.quantity}x {item.name}
                </span>
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: responsiveText(12),
                    fontWeight: 400,
                    color: "black",
                  }}
                >
                  Php {item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Terms & Conditions - Now flows directly after Order Summary */}
        <div
          style={{
            width: "100%",
            padding: `0 ${vw(18)}`,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              border: "0.5px solid #CECECE",
              borderRadius: vw(10),
              padding: `${vh(10)} ${vw(10)}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: vw(8) }}>
              <CheckIconSVG isChecked={true} style={{ width: vw(18), height: vw(18), marginTop: vh(1), flexShrink: 0 }} />
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: responsiveText(9),
                  fontWeight: 300,
                  color: "#000000",
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                <strong style={{ fontWeight: 500 }}>
                  I hereby give FASPecc USTP CDO Cafeteria the permission to share my customer data, including order history, contact information, and preferences, with authorized cafeteria personnel for the purpose of processing, fulfilling, and improving my pre-orders.
                </strong>
                <br />
              </p>
            </div>
          </div>

          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: responsiveText(10),
              fontWeight: 500,
              // MODIFIED: Set to left alignment
              textAlign: "left", 
              marginTop: vh(10),
            }}
          >
            By completing this order, I agree to all 
            {/* MODIFIED: Make "terms & conditions" clickable and green */}
            <span
                onClick={handleTermsClick}
                style={{
                    color: "#36570A",
                    textDecoration: "underline",
                    cursor: "pointer",
                    marginLeft: vw(3), 
                    marginRight: vw(3),
                }}
            >
                terms & conditions
            </span>.
          </p>
        </div>
      </div>

      {/* Bottom Bar - Remains Fixed */}
      <div
        style={{
          position: "fixed",
          left: 0,
          // 5. Use state to move the bar off-screen when hidden
          bottom: showBottomBar ? 0 : `-${vh(140)}`, 
          width: "100%",
          height: vh(140),
          backgroundColor: "#FFFFFF",
          borderTop: "0.5px solid #CECECE",
          boxShadow: "0 -2px 5px rgba(0,0,0,0.05)",
          zIndex: 5,
          // 6. Add transition for smooth animation
          transition: "bottom 0.3s ease-out", 
        }}
      >
        <p
          style={{
            position: "absolute",
            left: vw(19),
            top: vh(13),
            fontSize: responsiveText(14),
            fontFamily: "Poppins, sans-serif",
            fontWeight: 900,
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
            fontFamily: "Poppins, sans-serif",
            fontWeight: 900,
            color: "#36570A",
          }}
        >
          P {grandTotal}.00
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
          onClick={() => handleAction("Review Payment")}
        >
          <span
            style={{
              color: "#FFFFFF",
              fontSize: responsiveText(15),
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