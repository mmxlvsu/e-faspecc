import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../assets/back.png";
import cartempty from "../assets/empty.png";
import { menuAPI } from "../lib/api";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const scrollRef = useRef(null);
  const [showCheckout, setShowCheckout] = useState(true);

  // 🔹 Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCart);
    };

    loadCart();
    window.addEventListener("storage", loadCart);
    return () => window.removeEventListener("storage", loadCart);
  }, []);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("storage")); // update other pages
  };

  const handleQuantityChange = (index, delta) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity + delta);
    updateCart(updatedCart);
  };

  const handleRemove = (index) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      const updatedCart = cartItems.filter((_, i) => i !== index);
      updateCart(updatedCart);
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
    borderRadius: "1vw",
    width: "90%",
    left: "5%",
    position: "relative",
    border: "0.4vw solid #ccc",
  };

  const addOnItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "3vw 2vw",
    borderRadius: "1vw",
    marginBottom: "2vw",
  };

  const totalAmount =
    cartItems.length > 0
      ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      : 0;

    const handleCheckout = () => {
      if (cartItems.length === 0) return;
      navigate("/payment", { state: { totalAmount, cartItems } });
    };

  const [addOns, setAddOns] = useState([]);
    useEffect(() => {
      const fetchAddOns = async () => {
        try {
          const categories = await menuAPI.getCategories();
          const addOnsCategory = categories.find(
            (cat) => cat.id === "4e26ef2e-f46a-43ed-8538-cdde3e372af4"
          );

          if (addOnsCategory && addOnsCategory.items) {
            setAddOns(addOnsCategory.items);
          } else {
            console.warn("Add-ons category not found or empty");
          }
        } catch (err) {
          console.error("Error fetching add-ons:", err);
        }
      };

      fetchAddOns();
    }, []);

    const handleAddToCart = (item) => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const itemId = item.id || item._id || Math.random().toString(36).substr(2, 9);

      const image =
        item.photoUrl ||
        item.image ||
        item.imageUrl ||
        item.img ||
        "";

      const existingItem = cart.find((i) => i.id === itemId || i._id === itemId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: itemId,
          name: item.name || "Unnamed Item",
          description: item.description || "",
          price: Number(item.price) || 0,
          image,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      // ✅ update local state so total updates instantly
      setCartItems(cart);

      // still trigger global update for other pages
      window.dispatchEvent(new Event("storage"));
    };

  return (
    <div className="w-screen h-screen relative bg-[#36570A]">
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
          style={{ width: "5vw", height: "5vw", filter: "brightness(0) invert(1)" }}
          onClick={() => navigate("/home")}
        />
        <h1 className="flex-1 text-center font-bold" style={{ fontSize: "4vw", color: "white" }}>
          Cart
        </h1>
      </div>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className="absolute top-[15vw] bottom-0 left-0 right-0 overflow-y-auto px-4vw"
        style={{ backgroundColor: "white", paddingTop: "4vw" }}
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
                  borderRadius: "1vw",
                  border: "0.2vw solid #36570A",
                  padding: "2vw",
                  height: "25vw",
                  width: "90%",
                  margin: "0 auto 4vw",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      position: "absolute",
                      top: "2.5vw",
                      left: "3vw",
                      width: "25%",
                      height: "80%",
                      objectFit: "cover",
                      borderRadius: "2vw",
                      backgroundColor: "#f0f0f0",
                    }}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                ) : (
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
                )}
                <div
                  style={{
                    position: "absolute",
                    top: "3vw",
                    left: "30vw",
                    fontSize: "3.5vw",
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
                    fontSize: "3.2vw",
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
                      width: "6vw",
                      height: "6vw",
                      borderRadius: "50%",
                      border: "1px solid #ccc",
                      backgroundColor: "#fff",
                      fontSize: "4vw",
                      cursor: "pointer",
                    }}
                  >
                    -
                  </button>
                  <div style={{ width: "8vw", textAlign: "center", fontSize: "4vw", fontWeight: "600" }}>
                    {quantity}
                  </div>
                  <button
                    onClick={() => handleQuantityChange(i, 1)}
                    style={{
                      width: "6vw",
                      height: "6vw",
                      borderRadius: "50%",
                      border: "1px solid #ccc",
                      backgroundColor: "#fff",
                      fontSize: "4vw",
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
        {cartItems.length > 0 && addOns.length > 0 && (
          <div style={addOnsContainerStyle}>
            <h2
              style={{
                fontSize: "4vw",
                color: "#36570A",
                fontWeight: "600",
                marginBottom: "2vw",
              }}
            >
              Add-ons
            </h2>

            {addOns.map((addOn) => (
              <div key={addOn.id} style={addOnItemStyle}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2vw",
                    flex: 1,
                  }}
                >
                  <img
                    src={addOn.photoUrl}
                    alt={addOn.name}
                    style={{
                      width: "12vw",
                      height: "12vw",
                      objectFit: "cover",
                      borderRadius: "1vw",
                      backgroundColor: "#f0f0f0",
                    }}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <span
                    style={{
                      fontSize: "3.2vw",
                      fontWeight: "500",
                      color: "#333",
                    }}
                  >
                    {addOn.name}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: "3.2vw",
                    color: "#333",
                    fontWeight: "400",
                    marginRight: "4vw",
                  }}
                >
                  ₱{Number(addOn.price).toFixed(2)}
                </div>

                <button
                   onClick={() => handleAddToCart(addOn)}
                  style={{
                    color: "black",
                    borderRadius: "1vw",
                    padding: "1vw 2vw",
                    fontSize: "4vw",
                    cursor: "pointer",
                    border: "0.4vw solid #36570A",
                  }}
                >
                  +
                </button>
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
          bottom: "0vw",
          left: "0vw",
          right: "0vw",
          height: "18vh",
          backgroundColor: "white",
          boxShadow: "0 -0.3vw 1vw rgba(0,0,0,0.1)",
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "2vw",            
          }}
        >
          <div style={{ position: "absolute", top: "6.3vw", left: "7.7vw", fontSize: "5vw", fontWeight: "400", color: "#333" }}>
            Total:
          </div>
          <div style={{ position: "absolute", top: "6.3vw", right: "7.7vw", fontSize: "5vw", fontWeight: "600", color: "#36570A" }}>
            ₱{totalAmount.toFixed(2)}
          </div>
          <button
            onClick={handleCheckout}
            style={{
              position: "absolute",
              bottom: "6.2vw",
              left: "50%",
              transform: "translateX(-50%)",
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
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
