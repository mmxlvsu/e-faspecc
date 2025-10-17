import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import homeIcon from "../assets/home.png";
import cartIcon from "../assets/cart.png";
import orderIcon from "../assets/order.png";
import personIcon from "../assets/profile.png";

export default function BottomBarPage() {
  const navigate = useNavigate();

  const items = [
    { icon: homeIcon, onClick: () => navigate("/home"), iconSize: "6vw", filter: "invert(0%)" },
    { icon: cartIcon, onClick: () => navigate("/cart"), iconSize: "6vw", filter: "invert(0%) brightness(0%)" },
    { icon: orderIcon, onClick: () => navigate("/home"), iconSize: "6vw", filter: "invert(35%) sepia(72%) saturate(454%) hue-rotate(53deg) brightness(95%) contrast(93%)" },
    { icon: personIcon, onClick: () => navigate("/profile"), iconSize: "6vw", filter: "invert(0%)" },
  ];

  const tabs = ["Pending", "Preparing", "Ready", "Completed", "Cancelled"];
  const [activeTab, setActiveTab] = useState("Pending");

  // Bottom bar show/hide state
  const [showBottomBar, setShowBottomBar] = useState(true);
  const lastScrollTop = useRef(0);
  const scrollContainerRef = useRef(null);

  // Hide/show bottom bar on scroll
  useEffect(() => {
    const container = scrollContainerRef.current || window;
    const handleScroll = () => {
      const scrollTop = container.scrollTop ?? window.scrollY;

      if (scrollTop > lastScrollTop.current) {
        // scrolling down
        setShowBottomBar(false);
      } else {
        // scrolling up
        setShowBottomBar(true);
      }
      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      style={{ position: "relative", width: "100%", height: "100vh", backgroundColor: "#fff", fontFamily: "Poppins", overflowY: "auto" }}
    >
      {/* Orders Page Title */}
      <h1
        className="font-bold"
        style={{
          position: "absolute",
          top: "4vh",
          left: "5vw",
          fontSize: "4vw",
        }}
      >
        My Orders
      </h1>

      {/* Tabs */}
      <div
        className="absolute flex overflow-x-auto"
        style={{ top: "8vh", left: "0", width: "100%", padding: "0 2vw", boxSizing: "border-box" }}
      >
        {tabs.map((tab) => (
          <div
            key={tab}
            className="cursor-pointer flex-shrink-0 relative"
            style={{
              padding: "1vh 0",
              minWidth: "19vw",
              textAlign: "center",
              fontSize: "3vw",
              fontWeight: "500",
              color: activeTab === tab ? "#36570A" : "#000",
              transition: "color 0.2s"
            }}
            onClick={() => setActiveTab(tab)}
            onMouseEnter={(e) => e.currentTarget.querySelector(".underline").style.width = "50%"}
            onMouseLeave={(e) => e.currentTarget.querySelector(".underline").style.width = activeTab === tab ? "50%" : "0%"}
          >
            {tab}
            <div
              className="underline"
              style={{
                position: "absolute",
                bottom: "0",
                left: "50%",
                transform: "translateX(-50%)",
                height: "2px",
                width: activeTab === tab ? "50%" : "0%",
                backgroundColor: "#36570A",
                transition: "width 0.2s"
              }}
            />
          </div>
        ))}
      </div>

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
        {items.map((item, index) => (
          <img
            key={index}
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
        ))}
      </div>
    </div>
  );
}
