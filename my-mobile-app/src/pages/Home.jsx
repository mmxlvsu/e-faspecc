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

export default function BottomBarPage() {
  const navigate = useNavigate();
  const [showBottomBar, setShowBottomBar] = useState(true);
  const lastScrollTop = useRef(0);
  const scrollContainerRef = useRef(null);

  const items = [
    {
      icon: homeIcon,
      onClick: () => navigate("/home"),
      iconSize: "6vw",
      filter:
        "invert(35%) sepia(72%) saturate(454%) hue-rotate(53deg) brightness(95%) contrast(93%)",
    },
    { icon: cartIcon, onClick: () => navigate("/cart"), iconSize: "6vw", filter: "invert(0%) brightness(0%)" },
    { icon: orderIcon, onClick: () => navigate("/orders"), iconSize: "6vw", filter: "invert(0%)" },
    { icon: personIcon, onClick: () => navigate("/profile"), iconSize: "6vw", filter: "invert(0%)" },
  ];

  const categories = ["✔ All", "Breakfast", "Lunch", "Dinner"];

  // 👇 Scroll behavior logic
  useEffect(() => {
    const container = scrollContainerRef.current;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;

      // detect scroll direction
      if (scrollTop > lastScrollTop.current && scrollTop + clientHeight >= scrollHeight - 5) {
        // reached bottom → hide
        setShowBottomBar(false);
      } else if (scrollTop < lastScrollTop.current) {
        // scroll up → show
        setShowBottomBar(true);
      }

      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
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
      {/* 🟩 Green background */}
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

      {/* 🔔 Notification */}
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
          style={{
            width: "100%",
            height: "100%",
            filter: "invert(100%) brightness(200%)",
          }}
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

      {/* 📍 Location */}
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

      {/* 🔍 Search bar */}
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

      {/* 👋 Welcome */}
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
        <h2 style={{ fontSize: "5.5vw", margin: "0", fontWeight: "800" }}>
          Welcome Back!
        </h2>
        <p style={{ fontSize: "2.3vw", color: "white" }}>
          See what’s available today &gt;
        </p>
      </div>

      {/* ⚪ White container (scrollable) */}
      <div
        ref={scrollContainerRef}
        style={{
          position: "absolute",
          top: "32vh",
          left: "0",
          width: "100%",
          bottom: "15px",
          backgroundColor: "#F3F3F3",
          borderTopLeftRadius: "5vw",
          borderTopRightRadius: "5vw",
          padding: "3vw",
          overflowY: "auto",
          zIndex: 700,
        }}
      >
        {/* 🍱 Categories */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "-3vh",
          }}
        >
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              gap: "3vw",
              padding: "2vh 0",
              scrollbarWidth: "none",
            }}
          >
            {categories.map((cat, index) => (
              <div
                key={index}
                style={{
                  flex: "0 0 auto",
                  backgroundColor: index === 0 ? "#36570A" : "white",
                  color: index === 0 ? "white" : "#333",
                  padding: "2vw 5vw",
                  borderRadius: "3vw",
                  fontSize: "2.2vw",
                  fontWeight: "500",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>

        {/* 🍽️ Placeholders */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "5vw",
            padding: "1vw 5vw 1vw 5vw",
          }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#F3F3F3",
                borderRadius: "4vw",
                padding: "1vw",
                height: "35vw",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                animation: "pulse 1.5s infinite",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "150%",
                  backgroundColor: "#ddd",
                  borderRadius: "2vw",
                  marginBottom: "3vw",
                }}
              ></div>
              <div
                style={{
                  width: "80%",
                  height: "10%",
                  backgroundColor: "#ddd",
                  borderRadius: "1vw",
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* 💫 Pulse animation */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.6; }
            100% { opacity: 1; }
          }
        `}
      </style>

      {/* 🧭 Bottom bar (appears/disappears) */}
      <div
        style={{
          position: "fixed",
          bottom: showBottomBar ? "0px" : "-80px",
          left: "0px",
          right: "0px",
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
