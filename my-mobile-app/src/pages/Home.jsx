import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import homeIcon from "../assets/home.png";
import cartIcon from "../assets/cart.png";
import orderIcon from "../assets/order.png";
import personIcon from "../assets/profile.png";
import notifIcon from "../assets/noti.png";
import locIcon from "../assets/location.png";
import searchIcon from "../assets/search.png";
import foodIcon from "../assets/food.png";
import { menuAPI, authAPI, storage } from "../lib/api";

export default function BottomBarPage() {

    const [firstName, setFirstName] = useState("Guest");

    useEffect(() => {
      const fetchUser = async () => {
        try {
          // Try local user first
          const localUser = storage.getUser();
          if (localUser?.fullName) {
            const first = localUser.fullName.split(" ")[0];
            setFirstName(first);
          }

          // Then try fetching the most recent user data from backend
          const user = await authAPI.getCurrentUser();
          if (user?.fullName) {
            const first = user.fullName.split(" ")[0];
            setFirstName(first);
            storage.setUser(user); // refresh stored user data
          }
        } catch (err) {
          console.warn("Failed to fetch user info:", err);
        }
      };

      fetchUser();
    }, []);

  const navigate = useNavigate();
  const [showBottomBar, setShowBottomBar] = useState(true);
  const lastScrollTop = useRef(0);
  const scrollRef = useRef(null);

  const items = [
    { icon: homeIcon, onClick: () => navigate("/home"), iconSize: "6vw", filter: "invert(35%) sepia(72%) saturate(454%) hue-rotate(53deg) brightness(95%) contrast(93%)" },
    { icon: cartIcon, onClick: () => navigate("/cart"), iconSize: "6vw", filter: "invert(0%) brightness(0%)" },
    { icon: orderIcon, onClick: () => navigate("/order"), iconSize: "6vw", filter: "invert(0%)" },
    { icon: personIcon, onClick: () => navigate("/profile"), iconSize: "6vw", filter: "invert(0%)" },
  ];

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    };

    updateCount();
    window.addEventListener("storage", updateCount);
    return () => window.removeEventListener("storage", updateCount);
  }, []);

  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [todayItems, setTodayItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryData, itemData] = await Promise.all([
          menuAPI.getCategories(),
          menuAPI.getAllItems(),
        ]);

        // Assuming your backend returns something like:
        // [ { name: "Breakfast" }, { name: "Lunch" }, { name: "Dinner" } ]
        const formattedCategories = [
          "All",
          ...categoryData
            .map((cat) => cat.name || cat.categoryName)
            .filter(Boolean) // removes any undefined/null
            .sort((a, b) => a.localeCompare(b)), // ✅ sort alphabetically
        ];

        setCategories(formattedCategories);
        setTodayItems(itemData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = todayItems.filter((item) => {
    // Handle possible variations in category data
    const categoryName =
      typeof item.category === "string"
        ? item.category
        : item.category?.name || item.categoryName || "";

    const matchesCategory =
      selectedCategory === "All" ||
      categoryName.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const [selectedItem, setSelectedItem] = useState(null); // 🔹 for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔹 Add to cart (stored in localStorage for now)
  const handleAddToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const itemId = item.id || item._id || Math.random().toString(36).substr(2, 9);

    // ✅ include Supabase field photoUrl
    const image =
      item.photoUrl || // <-- your database field
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
    window.dispatchEvent(new Event("storage"));
  };

  const [quantity, setQuantity] = useState(1);
    const openItemModal = (item) => {
    setSelectedItem(item);
    setQuantity(1); // reset quantity each time
    setIsModalOpen(true);
  };

  // Hide/show bottom bar on scroll
  useEffect(() => {
    const container = scrollRef.current;
    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;

      if (scrollTop > lastScrollTop.current && scrollTop + clientHeight >= scrollHeight - 5) {
        setShowBottomBar(false);
      } else if (scrollTop < lastScrollTop.current) {
        setShowBottomBar(true);
      }
      lastScrollTop.current = Math.max(scrollTop, 0);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundColor: "#F3F3F3",
        overflow: "hidden",
      }}
    >
      {/* Green Header */}
      <div
        style={{
          position: "absolute",
          top: "-10vh",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100vw",
          height: "40vh",
          backgroundColor: "#36570A",
          borderRadius: "20vw",
          zIndex: 500,
          overflow: "hidden",
        }}
      >
        <img
          src={foodIcon}
          alt="food"
          style={{
            position: "absolute",
            bottom: "-4vh",
            right: "3vw",
            width: "33vw",
            height: "auto",
          }}
        />
      </div>

      {/* Notification Icon */}
      <div
        style={{
          position: "absolute",
          top: "3vh",
          right: "5vw",
          width: "6vw",
          height: "6vw",
          cursor: "pointer",
          zIndex: 1000,
        }}
        onClick={() => navigate("/notifications")}
      >
        <img
          src={notifIcon}
          alt="notification"
          style={{ width: "100%", height: "100%", filter: "invert(100%) brightness(200%)" }}
        />
        <div
          style={{
            position: "absolute",
            top: "-1vw",
            right: "-1vw",
            width: "4vw",
            height: "4vw",
            borderRadius: "50%",
            backgroundColor: "white",
            color: "black",
            fontSize: "2.5vw",
            fontWeight: "600",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          3
        </div>
      </div>

      {/* Location */}
      <img
        src={locIcon}
        alt="location"
        style={{
          position: "absolute",
          top: "3vh",
          left: "5vw",
          width: "6vw",
          height: "6vw",
          filter: "invert(100%) brightness(200%)",
          cursor: "pointer",
          zIndex: 1000,
        }}
      />
      <span
        style={{
          position: "absolute",
          top: "2.7vh",
          left: "13vw",
          fontSize: "3vw",
          color: "white",
          fontWeight: "700",
          zIndex: 1000,
        }}
      >
        FASPeCC
      </span>
      <span
        style={{
          position: "absolute",
          top: "4.8vh",
          left: "13vw",
          fontSize: "2.5vw",
          color: "white",
          fontWeight: "200",
          zIndex: 1000,
        }}
      >
        USTP-CDO Campus Cafeteria
      </span>

      {/* Search Bar */}
      <div
        style={{
          position: "absolute",
          top: "10vh",
          left: "50%",
          transform: "translateX(-50%)",
          width: "85vw",
          height: "5vh",
          backgroundColor: "white",
          borderRadius: "10vw",
          display: "flex",
          alignItems: "center",
          padding: "0 4vw",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          zIndex: 900,
        }}
      >
        <img
          src={searchIcon}
          alt="search"
          style={{
            width: "4.5vw",
            height: "4.5vw",
            filter: "invert(50%)",
            marginRight: "3vw",
          }}
        />
        <input
          type="text"
          placeholder="What’s on your mind?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            border: "none",
            outline: "none",
            width: "100%",
            fontSize: "3vw",
            color: "#333",
            backgroundColor: "transparent",
          }}
        />
      </div>

      {/* Welcome Text */}
      <div
        style={{
          position: "absolute",
          top: "20vh",
          left: "10vw",
          color: "white",
          zIndex: 900,
          width: "90vw",
        }}
      >
        <h2 style={{ fontSize: "5.5vw", margin: 0, fontWeight: "800" }}>Hello there, {firstName}!</h2>
        <p style={{ fontSize: "2.3vw", color: "white" }}>See what’s available today &gt;</p>
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        style={{
          position: "absolute",
          top: "32vh",
          left: 0,
          width: "100%",
          bottom: "35px",
          backgroundColor: "#F3F3F3",
          borderTopLeftRadius: "5vw",
          borderTopRightRadius: "5vw",
          padding: "3vw",
          overflowY: "auto",
          zIndex: 700,
        }}
      >
        {/* Categories */}
        <div
          style={{
            overflowX: "auto", // ✅ Allow horizontal scroll
            whiteSpace: "nowrap",
            marginTop: "-3vh",
            padding: "2vh 3vw",
            scrollbarWidth: "none", // Hide scrollbar (Firefox)
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "3vw",
              width: "max-content", // ✅ Ensures inner div expands beyond screen width
            }}
          >
            {categories.map((cat, index) => {
              const isSelected = cat === selectedCategory;
              return (
                <div
                  key={index}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    flex: "0 0 auto",
                    backgroundColor: isSelected ? "#36570A" : "white",
                    color: isSelected ? "white" : "#333",
                    padding: "2vw 5vw",
                    borderRadius: "3vw",
                    fontSize: "2.5vw",
                    fontWeight: "500",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    border: isSelected ? "1px solid #36570A" : "1px solid #ddd",
                    transition: "all 0.2s ease",
                  }}
                >
                  {cat}
                </div>
              );
            })}
          </div>
        </div>

        {/* Product Placeholders */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "3vw",
            padding: "1vw 1vw",
          }}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              // Default values for missing data
              const status = item.status || "Available";
              const statusStyles = {
                Available: { backgroundColor: "#4CAF50", textColor: "white" },
                "Low Stock": { backgroundColor: "#FFC107", textColor: "#333" },
                Unavailable: { backgroundColor: "#F44336", textColor: "white" },
              };
              const { backgroundColor, textColor } = statusStyles[status] || statusStyles["Available"];

              return (
                <div
                  key={item.id}
                  style={{
                    position: "relative",
                    backgroundColor: "white",
                    borderRadius: "2vw",
                    padding: "1vw",
                    height: "40vw",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* Status Banner */}
                  <div
                    style={{
                      position: "absolute",
                      top: "4vw",
                      right: "4vw",
                      backgroundColor,
                      color: textColor,
                      fontSize: "2vw",
                      fontWeight: "400",
                      padding: "0.5vw 2vw",
                      borderRadius: "2vw",
                      boxShadow: "0 0.3vw 0.8vw rgba(0,0,0,0.2)",
                    }}
                  >
                    {status}
                  </div>

                  {/* Product Image */}
                  <img
                    src={item.photoUrl || "/placeholder-food.png"}
                    alt={item.name}
                    style={{
                      width: "95%",
                      height: "75%",
                      borderRadius: "2vw",
                      objectFit: "cover",
                      marginTop: "1vw",
                      marginBottom: "2vw",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setSelectedItem(item);
                      setIsModalOpen(true);
                      openItemModal(item);
                    }}
                  />

                  {/* Title and Price */}
                  <p
                    style={{
                      fontSize: "2.5vw",
                      fontWeight: "600",
                      color: "#333",
                      marginBottom: "0.5vw",
                    }}
                  >
                    {item.name}
                  </p>
                  <p style={{ fontSize: "2.5vw", color: "#666" }}>₱{Number(item.price).toFixed(2)}</p>
                </div>
              );
            })
          ) : (
            // Show placeholders while loading
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#eee",
                  borderRadius: "2vw",
                  height: "35vw",
                  animation: "pulse 1.5s infinite",
                }}
              />
            ))
          )}
        </div>
      </div>

          {isModalOpen && selectedItem && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
              }}
              onClick={() => setIsModalOpen(false)} // close when clicking outside
            >
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "3vw",
                  width: "85vw",
                  maxWidth: "400px",
                  padding: "5vw",
                  position: "relative",
                }}
                onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
              >
                {/* Close button */}
                <div
                  style={{
                    position: "absolute",
                    top: "2vw",
                    right: "3vw",
                    fontSize: "6.5vw",
                    fontWeight: "bold",
                    color: "#888",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsModalOpen(false)}
                >
                  ×
                </div>

                {/* Product Image */}
                <img
                  src={selectedItem.photoUrl || "/placeholder-food.png"}
                  alt={selectedItem.name}
                  style={{
                    width: "100%",
                    height: "45vw",
                    objectFit: "cover",
                    borderRadius: "2vw",
                    marginTop: "7vw",
                    marginBottom: "3vw",
                  }}
                />

                {/* Product Info */}
<h3
  style={{
    fontSize: "5vw",       // 🔹 Adjust title font size
    margin: "1vw 0",
    color: "#1a1a1a",       // 🔹 Adjust title color
    fontWeight: "700",
  }}
>
  {selectedItem.name}
</h3>

<p
  style={{
    position: "absolute",    // 🔹 Enables top/left/bottom/right control
    top: "61.5vw",             // 🔹 Adjust distance from top
    right: "8vw",             // 🔹 Adjust distance from left
    fontSize: "4vw",       // 🔹 Adjust font size
    color: "#2e7d32",        // 🔹 Adjust color
    fontWeight: "600",
    margin: 0,               // 🔹 Remove default margin
  }}
>
  ₱{Number(selectedItem.price).toFixed(2)}
</p>

<p
  style={{
    fontSize: "3vw",          // 🔹 Adjust description font size
    color: "#555555",         // 🔹 Adjust description color
    marginTop: "2vw",
    lineHeight: "1.4",
  }}
>
  {selectedItem.description || "No description available."}
</p>


                {/* Quantity Selector */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1vw",
                    marginTop: "5vw",
                  }}
                >
                  <button
                    onClick={() =>
                      setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                    }
                    style={{
                      width: "8vw",
                      height: "8vw",
                      borderRadius: "50%",
                      border: "1px solid #ccc",
                      fontSize: "5vw",
                      backgroundColor: "white",
                      cursor: "pointer",
                    }}
                  >
                    −
                  </button>

                  <span
                    style={{
                      fontSize: "4vw",
                      fontWeight: "bold",
                      color: "#333",
                      minWidth: "10vw",
                      textAlign: "center",
                    }}
                  >
                    {quantity}
                  </span>

                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    style={{
                      width: "8vw",
                      height: "8vw",
                      borderRadius: "50%",
                      border: "1px solid #ccc",
                      fontSize: "5vw",
                      backgroundColor: "white",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={() => {
                    handleAddToCart({ ...selectedItem, quantity });
                    setIsModalOpen(false);
                  }}
                  style={{
                    width: "100%",
                    backgroundColor: "#36570A",
                    color: "white",
                    fontSize: "3.5vw",
                    fontWeight: "600",
                    padding: "2.5vw 0",
                    borderRadius: "3vw",
                    border: "none",
                    cursor: "pointer",
                    marginTop: "6vw",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          )}

      {/* Pulse Animation */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.6; }
            100% { opacity: 1; }
          }
        `}
      </style>

      {/* Bottom Bar */}
      <div
        style={{
          position: "fixed",
          bottom: showBottomBar ? "0px" : "-80px",
          left: 0,
          right: 0,
          height: "67px",
          borderTop: "0.8px solid #CECECE",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          zIndex: 9999,
          transition: "bottom 0.3s ease-in-out",
        }}
      >
        {items.map((item, index) => {
          const isCartIcon = item.icon === cartIcon; // 🛒 Check if this item is the cart
          return (
            <div key={index} style={{ position: "relative" }}>
              <img
                src={item.icon}
                alt={`icon-${index}`}
                onClick={item.onClick}
                style={{
                  width: item.iconSize,
                  height: item.iconSize,
                  filter: item.filter,
                  cursor: "pointer",
                }}
              />

              {/* 🔴 Cart Badge */}
              {isCartIcon && cartCount > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-8px",
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                    width: "18px",
                    height: "18px",
                    fontSize: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "600",
                  }}
                >
                  {cartCount}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
