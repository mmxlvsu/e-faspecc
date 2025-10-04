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
    { id: 6, name: "Ice Cream", description: "Sweet frozen dessert", quantity: 1, price: 120, productId: 105, options: {}, image: car1 },

  ]);

  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ width: "100%", minHeight: "100vh", position: "relative", paddingBottom: vh(132) }}>
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

      {/* Cart Content Wrapper - New Container for Dynamic Flow */}
      <div
        style={{
          position: "absolute",
          top: vh(150),
          left: 0,
          width: "100%",
          maxHeight: `calc(100vh - ${vh(280)})`,
          overflowY: "auto",
          zIndex: 4,
        }}
      >
        {/* Dynamic Cart Items */}
        <div
          style={{
            width: "100%",
            padding: `${vh(10)} ${vw(18)}`,
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
        
        {/* ADD ONS CONTAINER - New Container Added Here */}
        <div
            style={{
                width: "100%",
                padding: `${vh(10)} ${vw(18)}`,
                boxSizing: "border-box",
                backgroundColor: "white",
                marginTop: vh(10), // Optional: Add some space above
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between", // To push the badge to the right
                    alignItems: "center",
                    marginBottom: vh(10),
                }}
            >
                <p
                    style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: responsiveText(12),
                        fontWeight: 400,
                        margin: 0,
                        color: "#000000",
                    }}
                >
                    Add ons
                </p>

                {/* Optional Rectangle Text Placeholder */}
                <div
                    style={{
                        backgroundColor: "#CECECE",
                        borderRadius: vw(10),
                        padding: `${vh(2)} ${vw(8)}`,
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
                            color: "#FFFFFF", // White text color
                        }}
                    >
                        Optional
                    </span>
                </div>
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
          P {subtotal}.00
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