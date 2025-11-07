import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import homeIcon from "../assets/home.png";
import cartIcon from "../assets/cart.png";
import orderIcon from "../assets/order.png";
import personIcon from "../assets/profile.png";

export default function BottomBarPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const tabRef = useRef(null);
  const [showBottomBar, setShowBottomBar] = useState(true);
  const [activeTab, setActiveTab] = useState("Pending");
  const lastScrollTop = useRef(0);
  const scrollContainerRef = useRef(null);

  const navItems = [
    { icon: homeIcon, route: "/home", filter: "invert(0%)" },
    { icon: cartIcon, route: "/cart", filter: "invert(0%) brightness(0%)" },
    {
      icon: orderIcon,
      route: "/order",
      filter:
        "invert(35%) sepia(72%) saturate(454%) hue-rotate(53deg) brightness(95%) contrast(93%)",
    },
    { icon: personIcon, route: "/profile", filter: "invert(0%)" },
  ];

  const orderTabs = ["Pending", "Preparing", "Ready", "Completed", "Cancelled"];

  // Hide/show bottom bar on scroll
  useEffect(() => {
    const container = scrollContainerRef.current || window;

    const handleScroll = () => {
      const scrollTop = container.scrollTop ?? window.scrollY;
      setShowBottomBar(scrollTop <= lastScrollTop.current);
      lastScrollTop.current = Math.max(scrollTop, 0);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset tab when navigating to /order
  useEffect(() => {
    if (location.pathname === "/order") {
      setActiveTab("Pending");
    }
  }, [location.pathname]);

  return (
    <div
      ref={scrollContainerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundColor: "white",
        fontFamily: "Poppins, sans-serif",
        overflowY: "auto",
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontSize: "4vw",
          fontWeight: "bold",
          margin: "20px 0 10px 5vw",
        }}
      >
        My Orders
      </h1>

      {/* Scrollable Tabs - full width */}
      <div
        ref={tabRef}
        style={{
          display: "flex",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          borderBottom: "2px solid #ccc",
          width: "100%",
        }}
      >
        {orderTabs.map((tab, index) => {
          const circleColors = ["#f3f3f3", "#f3f3f3", "#f3f3f3", "#f3f3f3", "#f3f3f3"];
          return (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab === "Completed" && tabRef.current) {
                  tabRef.current.scrollTo({
                    left: tabRef.current.scrollWidth,
                    behavior: "smooth",
                  });
                }
                if (
                  (tab === "Preparing", "Ready" || tab === "Completed") &&
                  activeTab === "Cancelled" &&
                  tabRef.current
                ) {
                  tabRef.current.scrollTo({
                    left: 0,
                    behavior: "smooth",
                  });
                }
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2vw",
                fontSize: "3.4vw",
                fontWeight: activeTab === tab ? "600" : "400",
                color: activeTab === tab ? "#2e7d32" : "#555",
                padding: "10px 20px 8px 20px",
                cursor: "pointer",
                flexShrink: 0,
                background: "none",
                border: "none",
                borderBottom:
                  activeTab === tab
                    ? "1px solid #2e7d32"
                    : "1px solid transparent",
              }}
            >
              {/* Circle Placeholder */}
              <div
                style={{
                  width: "5vw",
                  height: "5vw",
                  borderRadius: "50%",
                  backgroundColor: circleColors[index],
                  color: "black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "2.8vw",
                  fontWeight: "600",
                }}
              >
                {index + 1}
              </div>

              {/* Tab Text */}
              {tab}
            </button>
          );
        })}
      </div>

      {/* Gray Container below Tabs */}
      <div
        style={{
          backgroundColor: "#f3f3f3",
          width: "100%",
          minHeight: "90vh",
          padding: "5vw 0",
        }}
      >
        {/* Pending Tab */}
        {activeTab === "Pending" && (
          <div style={{ backgroundColor: "#f3f3f3", width: "100%", padding: "0" }}>
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "white",
                  borderRadius: "2vw",
                  padding: "4vw",
                  width: "90%",
                  margin: index === 0 ? "0 auto" : "3vw auto 0 auto",
                }}
              >
                <p style={{ fontSize: "3.5vw", fontWeight: "600" }}>Order #12345</p>
                <p style={{ fontSize: "3vw", color: "#666" }}>Quantity: 2</p>
                <p style={{ fontSize: "3vw", color: "#666" }}>Price: ₱250</p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "3vw",
                    marginTop: "3vw",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #d9d9d9",
                      color: "black",
                      borderRadius: "1vw",
                      padding: "2vw 2vw",
                      fontSize: "2.8vw",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    Cancel Order
                  </button>
                  <button
                    style={{
                      backgroundColor: "white",
                      color: "#36570A",
                      border: "1px solid #36570A",
                      borderRadius: "1vw",
                      padding: "2vw 2vw",
                      fontSize: "2.8vw",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Preparing Tab */}
        {activeTab === "Preparing" && (
          <div style={{ backgroundColor: "#f3f3f3", width: "100%", padding: "0" }}>
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "white",
                  borderRadius: "2vw",
                  padding: "4vw",
                  width: "90%",
                  margin: index === 0 ? "0 auto" : "3vw auto 0 auto",
                }}
              >
                <p style={{ fontSize: "3.5vw", fontWeight: "600" }}>Order #12346</p>
                <p style={{ fontSize: "3vw", color: "#666" }}>Quantity: 1</p>
                <p style={{ fontSize: "3vw", color: "#666" }}>Price: ₱150</p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "3vw",
                    marginTop: "3vw",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "white",
                      color: "#36570A",
                      border: "1px solid #36570A",
                      borderRadius: "1vw",
                      padding: "2vw 2vw",
                      fontSize: "2.8vw",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    View Order Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Ready Tab */}
        {activeTab === "Ready" && (
          <div style={{ backgroundColor: "#f3f3f3", width: "100%", padding: "0" }}>
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "white",
                  borderRadius: "2vw",
                  padding: "4vw",
                  width: "90%",
                  margin: index === 0 ? "0 auto" : "3vw auto 0 auto",
                }}
              >
                <p style={{ fontSize: "3.5vw", fontWeight: "600" }}>Order #12347</p>
                <p style={{ fontSize: "3vw", color: "#666" }}>Quantity: 3</p>
                <p style={{ fontSize: "3vw", color: "#666" }}>Price: ₱400</p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "3vw",
                    marginTop: "3vw",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "white",
                      color: "#36570A",
                      border: "1px solid #36570A",
                      borderRadius: "1vw",
                      padding: "2vw 2vw",
                      fontSize: "2.8vw",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    Order Received
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Completed Tab */}
        {activeTab === "Completed" && (
          <div style={{ backgroundColor: "#f3f3f3", width: "100%", padding: "0" }}>
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "white",
                  borderRadius: "2vw",
                  padding: "4vw",
                  width: "90%",
                  margin: index === 0 ? "0 auto" : "3vw auto 0 auto",
                }}
              >
                <p style={{ fontSize: "3.5vw", fontWeight: "600" }}>Order #12348</p>
                <p style={{ fontSize: "3vw", color: "#666" }}>Quantity: 4</p>
                <p style={{ fontSize: "3vw", color: "#666" }}>Price: ₱600</p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "3vw",
                    marginTop: "3vw",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #d9d9d9",
                      color: "black",
                      borderRadius: "1vw",
                      padding: "2vw 2vw",
                      fontSize: "2.8vw",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    Order Again
                  </button>
                  <button
                    style={{
                      backgroundColor: "white",
                      color: "#36570A",
                      border: "1px solid #36570A",
                      borderRadius: "1vw",
                      padding: "2vw 2vw",
                      fontSize: "2.8vw",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    Rate Us
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cancelled Tab */}
        {activeTab === "Cancelled" && (
          <div style={{ backgroundColor: "#f3f3f3", width: "100%", padding: "0" }}>
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "white",
                  borderRadius: "2vw",
                  padding: "4vw",
                  width: "90%",
                  margin: index === 0 ? "0 auto" : "3vw auto 0 auto",
                }}
              >
                <p style={{ fontSize: "3.5vw", fontWeight: "600" }}>Order #12349</p>
                <p style={{ fontSize: "3vw", color: "#666" }}>Quantity: 1</p>
                <p style={{ fontSize: "3vw", color: "#666" }}>Price: ₱100</p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "3vw",
                    marginTop: "3vw",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "white",
                      color: "#36570A",
                      border: "1px solid #36570A",
                      borderRadius: "1vw",
                      padding: "2vw 2vw",
                      fontSize: "2.8vw",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    Order Again
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fixed Bottom Navigation */}
      <div
        style={{
          position: "fixed",
          bottom: showBottomBar ? "0" : "-80px",
          left: 0,
          right: 0,
          height: "67px",
          borderTop: "0.8px solid #CECECE",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          zIndex: 999,
          transition: "bottom 0.3s ease-in-out",
        }}
      >
        {navItems.map((item, index) => (
          <img
            key={index}
            src={item.icon}
            alt={`nav-${index}`}
            onClick={() => navigate(item.route)}
            style={{
              width: "6vw",
              height: "6vw",
              filter: item.filter,
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}
