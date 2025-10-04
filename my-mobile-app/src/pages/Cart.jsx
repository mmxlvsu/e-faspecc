import React, { useState, useRef } from "react";
import car1 from "../assets/car1.png"; // placeholder image
import trash from "../assets/trash.png";

// UPDATED CheckIconSVG
const CheckIconSVG = ({ isChecked, style }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" // Box fill is now always 'none' (transparent)
    stroke={isChecked ? "#36570A" : "#CECECE"} // Box stroke is green when checked
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={{ ...style, cursor: "pointer", transition: "all 0.1s" }}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    {/* The checkmark polyline now appears and is explicitly colored green */}
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

const handleAction = (action) => console.log(`${action} clicked`);

export default function WhiteAndGreenRectangle() {
  const vw = (pixels) => `${(pixels / 4.14).toFixed(1)}vw`;
  const vh = (pixels) => `${(pixels / 9).toFixed(1)}vh`;
  const responsiveText = (pixels) => `${(pixels / 4.14).toFixed(1)}vw`;

  // STATE FOR HIDING/SHOWING BOTTOM BAR
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(true);
  const cartContentRef = useRef(null);
  // NEW STATE for Special Instructions
  const [specialInstructions, setSpecialInstructions] = useState("");


  // Backend-ready cart items
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Chicken Adobo", description: "Classic Filipino chicken stew", quantity: 1, price: 150, productId: 101, options: {}, image: car1 },
    { id: 2, name: "Fried Rice", description: "Stir-fried rice with veggies", quantity: 2, price: 50, productId: 102, options: {}, image: car1 },
    { id: 3, name: "Soda", description: "Refreshing carbonated drink", quantity: 1, price: 30, productId: 103, options: {}, image: car1 },
    { id: 4, name: "Spring Rolls", description: "Crispy rolls with veggies", quantity: 2, price: 70, productId: 104, options: {}, image: car1 },
    { id: 5, name: "Ice Cream", description: "Sweet frozen dessert", quantity: 1, price: 120, productId: 105, options: {}, image: car1 },
    
  ]);

  // NEW STATE for Add-ons
  const [addOns, setAddOns] = useState([
    { id: 1, name: "Extra Sauce", price: 10, isChecked: false, addOnId: 201 },
    { id: 2, name: "Extra Toppings", price: 49, isChecked: true, addOnId: 202 },
    { id: 3, name: "Disposable Cutlery", price: 0, isChecked: false, addOnId: 203 },
    
  ]);

  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleToggleAddOn = (id) => {
    setAddOns((prevAddOns) => 
      prevAddOns.map(addOn => 
        addOn.id === id ? { ...addOn, isChecked: !addOn.isChecked } : addOn
      )
    );
  };

  const selectedAddOnsTotal = addOns.reduce((sum, addOn) => 
    sum + (addOn.isChecked ? addOn.price : 0), 0
  );

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = subtotal + selectedAddOnsTotal;


  // SCROLL HANDLER FUNCTION
  const handleScroll = () => {
    const element = cartContentRef.current;
    if (element) {
      // Check if user is near the bottom (within 1-pixel tolerance)
      const isAtBottom = element.scrollHeight - element.scrollTop - element.clientHeight <= 1;
      
      // We only hide it when it is exactly at the bottom.
      if (isAtBottom && isBottomBarVisible) {
        setIsBottomBarVisible(false);
      } else if (!isAtBottom && !isBottomBarVisible) {
        setIsBottomBarVisible(true);
      }
    }
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", position: "relative" }}>
      <BackIconSVG
        onClick={() => handleAction("Back")}
        style={{
          position: "absolute",
          left: vw(12),
          top: vh(30),
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
          top: vh(32),
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
          top: vh(110),
          left: 0,
          width: "100%",
          height: vw(2),
          backgroundColor: "#CECECE",
          zIndex: 1,
        }}
      />

      {/* Cart Content Wrapper - Apply ref and onScroll handler here */}
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
        {/* Dynamic Cart Items */}
        <div
          style={{
            width: "100%",
            padding: `${vh(20)} ${vw(18)}`,
            boxSizing: "border-box",
            backgroundColor: "white",
            borderBottom: "2px solid #CECECE",
          }}
        >
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: vh(20),
                gap: vw(12),
              }}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: vw(48),
                  height: vw(48),
                  objectFit: "cover",
                  borderRadius: vw(6),
                  marginTop: vh(-31),
                }}
              />

              {/* Title + Description + Rectangle Placeholder */}
              <div style={{ flex: 1, marginLeft: vw(5) }}>
                <p style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: responsiveText(16),
                  fontWeight: 700,
                  margin: 0,
                  color: "#000000",
                }}>
                  {item.name}
                </p>
                <p style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: responsiveText(12),
                  fontWeight: 400,
                  margin: 0,
                  marginTop: vh(4),
                  color: "#555555",
                }}>
                  {item.description}
                </p>

                {/* Rectangle Placeholder with Trash + Quantity Counter */}
                <div
                  style={{
                    marginTop: vh(10),
                    width: vw(100),
                    height: vh(32),
                    backgroundColor: "#FFFFFF",
                    border: "0.5px solid #CECECE",
                    borderRadius: vw(10),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: `0 ${vw(15)}`,
                    gap: vw(10),
                  }}
                >
                  {/* Trash Icon */}
                  <img
                    src={trash}
                    alt="Remove"
                    style={{
                      width: vw(18),
                      height: vw(18),
                      cursor: "pointer",
                    }}
                    onClick={() => handleRemove(item.id)}
                  />

                  {/* Counter */}
                  <div style={{ display: "flex", alignItems: "center", gap: vw(8) }}>
                    {/* Minus */}
                    <button
                      onClick={() =>
                        setCartItems((prev) =>
                          prev.map((i) =>
                            i.id === item.id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i
                          )
                        )
                      }
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

                    {/* Quantity Number */}
                    <span
                      style={{
                        fontSize: responsiveText(14),
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 500,
                        color: "#000000",
                      }}
                    >
                      {item.quantity}
                    </span>

                    {/* Plus */}
                    <button
                      onClick={() =>
                        setCartItems((prev) =>
                          prev.map((i) =>
                            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                          )
                        )
                      }
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

              {/* Price */}
              <p style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: responsiveText(12),
                fontWeight: 300,
                marginTop: vh(68),
                marginBottom: 0,
              }}>
                P {item.price * item.quantity}.00
              </p>
            </div>
          ))}

          {/* Add More + Subtotal Section */}
          <div style={{ marginTop: vh(5), padding: `${vh(1)} ${vw(1)}`, }}>
            {/* Add More Button */}
            <div
              style={{
                backgroundColor: "#36570A",
                borderRadius: vw(10),
                padding: `${vh(5)} ${vw(10)}`,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={() => handleAction("Add More Items")}
            >
              <span
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: responsiveText(10),
                  fontWeight: 400,
                  color: "white",
                }}
              >
                + Add more items
              </span>
            </div>

            {/* Subtotal Row */}
            <div
              style={{
                marginTop: vh(15),
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: responsiveText(12),
                  fontWeight: 400,
                }}
              >
                Subtotal
              </span>
              <span
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: responsiveText(12),
                  fontWeight: 500,
                  color: "#000000",
                }}
              >
                P {subtotal}.00
              </span>
            </div>
          </div>
        </div>
        
        {/* ADD ONS CONTAINER */}
        <div
            style={{
                width: "100%",
                padding: `${vh(20)} ${vw(18)}`,
                boxSizing: "border-box",
                backgroundColor: "white",
                marginTop: vh(0), // No top margin for visual connection
                borderBottom: "2px solid #CECECE",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: vh(25),
                    // REMOVED marginBottom FROM THIS DIV, MOVING IT TO THE TITLE P TAG
                }}
            >
                <p
                    style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: responsiveText(12),
                        fontWeight: 600,
                        margin: 0,
                        color: "#36570A",
                    }}
                >
                    Add ons
                </p>

                {/* Optional Rectangle Text Placeholder */}
                <div
                    style={{
                        backgroundColor: "#CECECE",
                        borderRadius: vw(10),
                        padding: `${vh(2)} ${vw(12)}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <span
                        style={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: responsiveText(10),
                            fontWeight: 400,
                            color: "#FFFFFF",
                        }}
                    >
                        Optional
                    </span>
                </div>
            </div>

            {/* Dynamic Add Ons List */}
            {addOns.map((addOn, index) => (
                <div 
                    key={addOn.id}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        // --- START OF CHANGE ---
                        // Set a small margin-top between items (vh(10))
                        // The very first item gets its space from the title's margin-bottom
                        marginTop: index === 0 ? 0 : vh(10), 
                        // Added a small margin-bottom for spacing between items
                        marginBottom: vh(10),
                        // --- END OF CHANGE ---
                        cursor: 'pointer',
                    }}
                    onClick={() => handleToggleAddOn(addOn.id)}
                >
                    {/* Item Name */}
                    <span
                        style={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: responsiveText(12),
                            fontWeight: 400,
                            color: "#000000",
                            margin: 0, // Ensure no extra margin here
                        }}
                    >
                        {addOn.name}
                    </span>

                    {/* Price and Checkbox Container */}
                    <div style={{ display: "flex", alignItems: "center", gap: vw(15) }}>
                        {/* Price */}
                        <span
                            style={{
                                fontFamily: "Poppins, sans-serif",
                                fontSize: responsiveText(12),
                                fontWeight: 300,
                                color: "#555555",
                            }}
                        >
                            {addOn.price > 0 ? `P ${addOn.price}.00` : 'FREE'}
                        </span>
                        
                        {/* Checkbox (SVG Component) */}
                        <CheckIconSVG
                            isChecked={addOn.isChecked}
                            style={{ width: vw(18), height: vw(18) }}
                        />
                    </div>
                </div>
            ))}
        </div>

        {/* SPECIAL INSTRUCTIONS CONTAINER - NEW SECTION */}
<div
    style={{
        width: "100%",
        padding: `${vh(20)} ${vw(18)}`,
        boxSizing: "border-box",
        backgroundColor: "white",
        paddingBottom: vh(140),
    }}
>
    <p
        style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: responsiveText(12),
            fontWeight: 600,
            margin: `0 0 ${vh(3)} 0`,
            color: "#36570A",
                    paddingBottom: vh(-1),

        }}
    >
        Special instructions
    </p>

    <p
        style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: responsiveText(8),
            fontWeight: 300,
            margin: `0 0 ${vh(10)} 0`,
            color: "#000000",
        }}
    >
        Any special requests for your meal? Let us know if you have any notes for the cafeteria staff regarding your order.
    </p>

    {/* Wrapper for Textarea and Counter */}
    <div style={{ position: "relative" }}>
        {/* Textarea for Instructions */}
        <textarea
            value={specialInstructions}
            // Use maxLength to limit input directly
            maxLength={500}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder="e.g., 'no peanuts'"
            style={{
                width: "100%",
                height: vh(100),
                padding: vw(10),
                boxSizing: "border-box",
                border: "0.5px solid #36570A",
                borderRadius: vw(10),
                resize: "none",
                fontFamily: "Poppins, sans-serif",
                fontSize: responsiveText(10),
                fontWeight: 400,
                color: "#000000",
                // Add padding-bottom to prevent the text from overlapping the counter
                paddingBottom: vh(25), 
            }}
        />

        {/* Character Counter */}
        <p
            style={{
                position: "absolute",
                bottom: vh(-10), // Adjust this value to position it relative to the bottom of the textarea wrapper
                right: vw(10), // Position it to the right
                fontFamily: "Poppins, sans-serif",
                fontSize: responsiveText(8), // Smaller font size for the counter
                fontWeight: 400,
                color: "#666666",
                margin: 0,
            }}
        >
            ({specialInstructions.length}/500)
        </p>
    </div>
</div>

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
          // CSS for visibility based on state
          transform: isBottomBarVisible ? 'translateY(0)' : `translateY(${vh(140)})`,
          transition: 'transform 0.3s ease-out', // Smooth transition
        }}
      >
        <p
          style={{
            position: "absolute",
            left: vw(19),
            top: vh(13),
            fontSize: responsiveText(13),
            fontFamily: "Poppins, sans-serif",
            fontWeight: 900,
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
            fontSize: responsiveText(13),
            fontFamily: "Poppins, sans-serif",
            fontWeight: 900,
            color: "#36570A",
            lineHeight: responsiveText(18),
            textAlign: "right",
            zIndex: 6,
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