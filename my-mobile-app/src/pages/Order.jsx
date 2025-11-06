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
        {orderTabs.map((tab) => (
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
            if (tab === "Preparing", "Completed" && activeTab === "Cancelled" && tabRef.current) {
    tabRef.current.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  }
}}
            style={{
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
                  ? "2px solid #2e7d32"
                  : "2px solid transparent",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Scrollable Content */}
      <div
        style={{
          paddingTop: "150px",
          paddingBottom: "80px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#888", fontSize: "3vw" }}>
          Showing orders under <b>{activeTab}</b>
        </p>
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
