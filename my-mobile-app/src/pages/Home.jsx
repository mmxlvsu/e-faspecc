import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import homeIcon from "../assets/home.png";
import menuIcon from "../assets/menu.png";
import cartIcon from "../assets/cart.png";
import orderIcon from "../assets/order.png";
import personIcon from "../assets/profile.png";
import notiIcon from "../assets/not.png";
import heartIcon from "../assets/heart.png";
import searchIcon from "../assets/search.png";
import foodIcon from "../assets/food.png";
import todayPic1 from "../assets/t1.png";
import todayPic2 from "../assets/t2.png";
import todayPic3 from "../assets/t3.png";
import todayPic4 from "../assets/t4.png";
import todayPic5 from "../assets/t5.png";
import todayPic6 from "../assets/car1.png";

export default function BottomBar() {
  const navigate = useNavigate();
  const [notificationCount] = useState(3);
  const [heartCount] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBottomBar, setShowBottomBar] = useState(true);

  const scrollRef = useRef(null);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const st = scrollRef.current.scrollTop;
      setShowBottomBar(st <= lastScrollTop.current); // hide on scroll down, show on scroll up
      lastScrollTop.current = st <= 0 ? 0 : st;
    };

    const scrollEl = scrollRef.current;
    scrollEl.addEventListener("scroll", handleScroll);
    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, []);

  const items = [
    { icon: homeIcon, onClick: () => navigate("/home"), filter: "brightness(0) saturate(100%) invert(35%) sepia(72%) saturate(454%) hue-rotate(53deg) brightness(95%) contrast(93%)", iconSize: "6vw" },
    { icon: menuIcon, onClick: () => navigate("/home"), filter: "invert(0%)", iconSize: "6vw" }, // Navigate to home for now since Menu page doesn't exist
    { icon: cartIcon, onClick: () => navigate("/cart"), filter: "invert(0%) brightness(0%)", iconSize: "6vw" },
    { icon: orderIcon, onClick: () => navigate("/home"), filter: "invert(0%)", iconSize: "6vw" }, // Navigate to home for now since Orders page doesn't exist
    { icon: personIcon, onClick: () => navigate("/profile"), filter: "invert(0%) brightness(0%)", iconSize: "6vw" },
  ];

  const categories = [
    { img: todayPic1, text: "Budget Snacks", width: "105px" },
    { img: todayPic2, text: "Snacks", width: "60px" },
    { img: todayPic3, text: "Value Meals", width: "91px" },
    { img: todayPic4, text: "Packed Meals", width: "150px" },
    { img: todayPic5, text: "Short Orders", width: "92px" },
    { img: todayPic6, text: "Buffet", width: "51px" },
  ];

  const todayItems = [todayPic1, todayPic2, todayPic3, todayPic4, todayPic5, todayPic6];

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh" }}>
      {/* Global CSS to hide all scrollbars */}
      <style>
        {`
          /* Chrome, Edge, Safari */
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          /* Firefox */
          .hide-scrollbar {
            scrollbar-width: none;
            -ms-overflow-style: none; /* IE 10+ */
          }
        `}
      </style>

      {/* Half-Screen Green Background */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "50vh", backgroundColor: "#36570A", zIndex: 0 }} />

      {/* Food Icon */}
      <img src={foodIcon} alt="Food" style={{ position: "absolute", top: "16vh", right: "1%", width: "150px", height: "150px", zIndex: 1 }} />

      {/* Greeting */}
      <div style={{ position: "fixed", top: "19vh", left: "6%", right: "5%", display: "flex", flexDirection: "column", zIndex: 9999 }}>
        <p style={{ fontSize: "24px", fontFamily: "Poppins, sans-serif", fontWeight: "600", color: "#FFFFFF", margin: 0 }}>Hello, Mariel!</p>
        <p style={{ fontSize: "10px", fontFamily: "Poppins, sans-serif", fontWeight: "300", color: "#FFFFFF", margin: 0, marginTop: "1px" }}>Let's find a best food match for you</p>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={(e) => { e.preventDefault(); alert(`You searched for: ${searchQuery}`); }}
        style={{
          position: "fixed",
          left: "50%",
          top: "10vh",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: "370px",
          height: "35px",
          backgroundColor: "#FFFFFF",
          border: "1px solid #36570A",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          zIndex: 9999,
        }}
      >
        <img src={searchIcon} alt="Search" style={{ marginLeft: "12px", width: "18px", height: "18px", filter: "brightness(0) saturate(100%)", cursor: "pointer" }} onClick={() => alert(`Search for: ${searchQuery}`)} />
        <input
          type="text"
          placeholder="Have an exact order in mind?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginLeft: "12px", width: "100%", fontSize: "12px", fontFamily: "Poppins, sans-serif", fontWeight: "400", color: "#4A4A4A", border: "none", outline: "none", background: "transparent" }}
        />
      </form>

      {/* Scrollable White Container */}
      <div
        ref={scrollRef}
        className="hide-scrollbar"
        style={{
          position: "absolute",
          top: "29.5vh",
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#FFFFFF",
          borderTopLeftRadius: "6%",
          borderTopRightRadius: "6%",
          padding: "20px",
          overflowY: "auto",
          zIndex: 2,
        }}
      >
        {/* What's Available Today */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <p style={{ fontSize: "16px", fontWeight: "600", color: "#000000", margin: 0 }}>What's Available Today</p>
          <p style={{ fontSize: "13px", fontWeight: "400", color: "#36570A", margin: 0, cursor: "pointer", textDecoration: "underline" }} onClick={() => alert("See All Today’s Specials")}>See All</p>
        </div>

        <div style={{ display: "flex", overflowX: "auto", gap: "15px", paddingBottom: "20px" }} className="hide-scrollbar">
          {todayItems.map((img, index) => (
            <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
              <img src={img} alt={`Today ${index + 1}`} style={{ width: "140px", height: "140px", borderRadius: "12px", cursor: "pointer" }} onClick={() => alert(`Clicked item ${index + 1}`)} />
              <p style={{ marginTop: "5px", fontSize: "12px", fontWeight: "500", color: "#000000" }}>Food {index + 1}</p>
            </div>
          ))}
        </div>

        {/* Value Meals */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", marginTop: "10px" }}>
          <p style={{ fontSize: "16px", fontWeight: "600", color: "#000000", margin: 0 }}>Value Meals</p>
          <p style={{ fontSize: "13px", fontWeight: "400", color: "#36570A", margin: 0, cursor: "pointer", textDecoration: "underline" }} onClick={() => alert("See All Value Meals")}>See All</p>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
          {[{ text: "VM 1:\nPhp 55", fill: "white", stroke: "#36570A" }, { text: "VM 2:\nPhp 70", fill: "white", stroke: "#36570A" }, { text: "VM 3:\nPhp 70", fill: "white", stroke: "#36570A" }, { text: "VM 4:\nPhp 85", fill: "white", stroke: "#36570A" }].map((btn, index) => (
            <button key={index} onClick={() => alert(`Clicked ${btn.text.replace("\n", " ")}`)} style={{ padding: "15px", borderRadius: "10px", border: `1px solid ${btn.stroke}`, backgroundColor: btn.fill, color: "#000000", fontWeight: "400", cursor: "pointer", flex: "1 1 40%", textAlign: "center", whiteSpace: "pre-line", lineHeight: "1.2", fontSize: "14px" }}>{btn.text}</button>
          ))}
        </div>

        {/* Categories */}
        <div style={{ marginTop: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <p style={{ fontSize: "16px", fontWeight: "600", color: "#000000", margin: 0 }}>Categories</p>
            <p style={{ fontSize: "13px", fontWeight: "400", color: "#36570A", margin: 0, cursor: "pointer", textDecoration: "underline" }} onClick={() => alert("See All Categories")}>See All</p>
          </div>

          <div style={{ display: "flex", overflowX: "auto", gap: "12px", paddingBottom: "20px" }} className="hide-scrollbar">
            {categories.map((item, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  flexShrink: 0,
                  cursor: "pointer",
                  borderRadius: "12px",
                  overflow: "hidden",
                  display: "inline-flex",
                  alignItems: "flex-end",
                }}
                onClick={() => alert(`Clicked ${item.text}`)}
              >
                <img src={item.img} alt={item.text} style={{ height: "40px", width: item.width, objectFit: "cover" }} />
                <div style={{
                  position: "absolute",
                  bottom: "0",
                  background: "rgba(0,0,0,0.5)",
                  color: "#fff",
                  textAlign: "center",
                  padding: "5px 8px",
                  fontSize: "12px",
                  fontWeight: "500",
                  whiteSpace: "nowrap",
                }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations (vertical scroll) */}
        <div style={{ marginTop: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <p style={{ fontSize: "16px", fontWeight: "600", color: "#000000", margin: 0 }}>Recommendation</p>
            <p style={{ fontSize: "13px", fontWeight: "400", color: "#36570A", margin: 0, cursor: "pointer", textDecoration: "underline" }} onClick={() => alert("See All Recommendations")}>See All</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px", maxHeight: "500px", overflowY: "auto", paddingBottom: "20px" }} className="hide-scrollbar">
            {[...Array(10)].map((_, index) => (
              <div key={index} style={{ cursor: "pointer", borderRadius: "12px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", height: "160px", width: "100%", backgroundColor: "#E0E0E0" }} onClick={() => alert(`Clicked recommendation ${index + 1}`)}>
                <p style={{ color: "#555", fontSize: "12px" }}>Image {index + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Heart & Notifications */}
      <div style={{ position: "fixed", top: "5vh", right: "5%", display: "flex", alignItems: "center", zIndex: 9999 }}>
        <div style={{ position: "relative", width: "26px", height: "26px", marginRight: "15px", cursor: "pointer" }} onClick={() => alert("Go to Favorites")}>
          <img src={heartIcon} alt="Heart" style={{ width: "23px", height: "23px", filter: "invert(100%) brightness(150%)" }} />
          <div style={{ position: "absolute", top: "-6px", right: "-3px", width: "16px", height: "16px", borderRadius: "50%", backgroundColor: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "bold", color: "#000000" }}>{heartCount}</div>
        </div>

        <div style={{ position: "relative", width: "26px", height: "26px", cursor: "pointer" }} onClick={() => alert("Go to Notifications")}>
          <img src={notiIcon} alt="Notifications" style={{ width: "24px", height: "24px", filter: "invert(100%) brightness(150%)" }} />
          <div style={{ position: "absolute", top: "-6px", right: "-3px", width: "16px", height: "16px", borderRadius: "50%", backgroundColor: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "bold", color: "#000000" }}>{notificationCount}</div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        position: "fixed",
        bottom: showBottomBar ? 0 : "-10vh",
        left: 0,
        width: "100%",
        height: "7vh",
        backgroundColor: "#FFFFFF",
        borderTop: "0.2vw solid #CECECE",
        zIndex: 9999,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        transition: "bottom 0.3s ease"
      }}>
        {items.map((item, index) => (
          <div key={index} style={{ cursor: "pointer" }} onClick={item.onClick}>
            <img src={item.icon} alt="" style={{ width: item.iconSize, height: item.iconSize, filter: item.filter }} />
          </div>
        ))}
      </div>
    </div>
  );
}
