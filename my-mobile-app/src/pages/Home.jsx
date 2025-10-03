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
import splashBg from "../assets/splash.png";
import cat1 from "../assets/cat1.png";
import cat2 from "../assets/cat2.png";
import cat3 from "../assets/cat3.png";
import cat4 from "../assets/cat4.png";
import cat5 from "../assets/cat5.png";
import cat6 from "../assets/cat6.png";
import reco1 from "../assets/reco.png";

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
    { icon: menuIcon, onClick: () => navigate("/home"), filter: "invert(0%)", iconSize: "6vw" },
    { icon: cartIcon, onClick: () => navigate("/cart"), filter: "invert(0%) brightness(0%)", iconSize: "6vw" },
    { icon: orderIcon, onClick: () => navigate("/home"), filter: "invert(0%)", iconSize: "6vw" },
    { icon: personIcon, onClick: () => navigate("/profile"), filter: "invert(0%) brightness(0%)", iconSize: "6vw" },
  ];

  const todayItems = [todayPic1, todayPic2, todayPic3, todayPic4, todayPic5, todayPic6];

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh" }}>
      {/* Global CSS to hide all scrollbars */}
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
        `}
      </style>

      {/* Half-Screen Image Background with Dark Overlay */}
      <div 
        style={{ 
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "50vh",
          backgroundImage: `linear-gradient(rgba(54, 87, 10, 0.8), rgba(54, 87, 10, 0.9)), url(${splashBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }} 
      />

      {/* Food Icon */}
      <img src={foodIcon} alt="Food" style={{ position: "absolute", top: "16vh", right: "1%", width: "150px", height: "150px", zIndex: 1 }} />

      {/* Greeting */}
      <div style={{ position: "fixed", top: "19vh", left: "6%", right: "5%", display: "flex", flexDirection: "column", zIndex: 9999 }}>
        <p style={{ fontSize: "24px", fontFamily: "Poppins, sans-serif", fontWeight: "800", color: "#FFFFFF", marginBottom: "-3px" }}>Hello, Mariel!</p>
        <p style={{ fontSize: "11px", fontFamily: "Poppins, sans-serif", fontWeight: "500", color: "#FFFFFF", marginTop: "-2px" }}>Explore our food deals</p>
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
          {[{ text: "VM 1:\nPhp 55" }, { text: "VM 2:\nPhp 70" }, { text: "VM 3:\nPhp 70" }, { text: "VM 4:\nPhp 85" }].map((btn, index) => (
            <button key={index} onClick={() => alert(`Clicked ${btn.text.replace("\n", " ")}`)} style={{ padding: "15px", borderRadius: "10px", border: "1px solid #36570A", backgroundColor: "white", color: "#000000", fontWeight: "400", cursor: "pointer", flex: "1 1 40%", textAlign: "center", whiteSpace: "pre-line", lineHeight: "1.2", fontSize: "14px" }}>{btn.text}</button>
          ))}
        </div>

        {/* Categories */}
        <div style={{ marginTop: "33px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <p style={{ fontSize: "16px", fontWeight: "600", color: "#000000", margin: 0 }}>Categories</p>
            <p style={{ fontSize: "13px", fontWeight: "400", color: "#36570A", margin: 0, cursor: "pointer", textDecoration: "underline" }} onClick={() => alert("See All Categories")}>See All</p>
          </div>

          <div style={{ display: "flex", overflowX: "auto", gap: "13px", paddingBottom: "20px" }} className="hide-scrollbar">
            {[{ label: "Budget\nSnacks", icon: cat1 }, { label: "Snacks", icon: cat2 }, { label: "Value\nMeals", icon: cat3 }, { label: "Packed\nMeals", icon: cat4 }, { label: "Short\nOrders", icon: cat5 }, { label: "Buffet", icon: cat6 }].map((item, index) => (
              <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div style={{ width: "90px", height: "90px", backgroundColor: "#F3F3F3", borderRadius: "10px", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={() => alert(`Clicked ${item.label}`)}>
                  <img src={item.icon} alt={item.label} style={{ width: "40px", height: "40px" }} />
                </div>
                <p style={{ marginTop: "9px", fontSize: "12px", fontWeight: "600", color: "#36570A", textAlign: "center", whiteSpace: "pre-line" }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
<div style={{ marginTop: "20px" }}>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "15px",
    }}
  >
    <p
      style={{
        fontSize: "16px",
        fontWeight: "600",
        color: "#000000",
        margin: 0,
      }}
    >
      Our Recommendations
    </p>
    <p
      style={{
        fontSize: "13px",
        fontWeight: "400",
        color: "#36570A",
        margin: 0,
        cursor: "pointer",
        textDecoration: "underline",
      }}
      onClick={() => alert("See All Recommendations")}
    >
      See All
    </p>
  </div>

  {/* Carousel (for now one image reco.png) */}
  <div
    style={{ display: "flex", overflowX: "auto", gap: "10px" }}
    className="hide-scrollbar"
  >
    <img
      src={reco1}
      alt="Recommendation 1"
      style={{
        width: "100%",
        maxWidth: "366px",
        height: "134px",
        borderRadius: "12px",
        cursor: "pointer",
      }}
      onClick={() => alert("Clicked Recommendation")}
    />
  </div>

  {/* 5 stacked images vertically */}
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      marginTop: "15px",
    }}
  >
    <img
      src={reco1}
      alt="Recommendation 1"
      style={{
        width: "100%",
        maxWidth: "366px",
        height: "134px",
        borderRadius: "12px",
        cursor: "pointer",
      }}
      onClick={() => alert("Clicked Recommendation 1")}
    />
    <img
      src={reco1}
      alt="Recommendation 2"
      style={{
        width: "100%",
        maxWidth: "366px",
        height: "134px",
        borderRadius: "12px",
        cursor: "pointer",
      }}
      onClick={() => alert("Clicked Recommendation 2")}
    />
    <img
      src={reco1}
      alt="Recommendation 3"
      style={{
        width: "100%",
        maxWidth: "366px",
        height: "134px",
        borderRadius: "12px",
        cursor: "pointer",
      }}
      onClick={() => alert("Clicked Recommendation 3")}
    />
    <img
      src={reco1}
      alt="Recommendation 4"
      style={{
        width: "100%",
        maxWidth: "366px",
        height: "134px",
        borderRadius: "12px",
        cursor: "pointer",
      }}
      onClick={() => alert("Clicked Recommendation 4")}
    />
    <img
      src={reco1}
      alt="Recommendation 5"
      style={{
        width: "100%",
        maxWidth: "366px",
        height: "134px",
        borderRadius: "12px",
        cursor: "pointer",
      }}
      onClick={() => alert("Clicked Recommendation 5")}
    />
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
