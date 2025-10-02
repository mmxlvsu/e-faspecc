import React, { useState } from "react";
import homeIcon from "../assets/home.png";
import menuIcon from "../assets/menu.png";
import cartIcon from "../assets/cart.png";
import orderIcon from "../assets/order.png";
import personIcon from "../assets/profile.png";
import notiIcon from "../assets/not.png";
import heartIcon from "../assets/heart.png";
import searchIcon from "../assets/search.png";
import foodIcon from "../assets/food.png";

export default function BottomBar() {
  const [notificationCount] = useState(3);
  const [heartCount] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const items = [
    { icon: homeIcon, onClick: () => alert("Go to Home"), filter: "brightness(0) saturate(100%) invert(35%) sepia(72%) saturate(454%) hue-rotate(53deg) brightness(95%) contrast(93%)", iconSize: "6vw", offsetX: 0, offsetY: 0 },
    { icon: menuIcon, onClick: () => alert("Go to Menu"), filter: "invert(0%)", iconSize: "6vw", offsetX: 0, offsetY: 0 },
    { icon: cartIcon, onClick: () => alert("Go to Cart"), filter: "invert(0%) brightness(0%)", iconSize: "6vw", offsetX: 0, offsetY: 1 },
    { icon: orderIcon, onClick: () => alert("Go to Orders"), filter: "invert(0%)", iconSize: "6vw", offsetX: 0, offsetY: 0 },
    { icon: personIcon, onClick: () => alert("Go to Profile"), filter: "invert(0%) brightness(0%)", iconSize: "6vw", offsetX: 0, offsetY: 0 },
  ];

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh" }}>
      {/* Half-Screen Green Background */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "50vh", backgroundColor: "#36570A", zIndex: 0 }} />

      {/* Food Icon Behind Container */}
      <img
        src={foodIcon}
        alt="Food"
        style={{
          position: "absolute",
          top: "16vh",
          right: "1%",
          width: "150px",
          height: "150px",
          zIndex: 1
        }}
      />

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
        <img
          src={searchIcon}
          alt="Search"
          style={{ marginLeft: "12px", width: "18px", height: "18px", filter: "brightness(0) saturate(100%)", cursor: "pointer" }}
          onClick={() => alert(`Search for: ${searchQuery}`)}
        />
        <input
          type="text"
          placeholder="Have an exact order in mind?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginLeft: "12px", width: "100%", fontSize: "12px", fontFamily: "Poppins, sans-serif", fontWeight: "400", color: "#4A4A4A", border: "none", outline: "none", background: "transparent" }}
        />
      </form>

      {/* Scrollable White Container */}
      <div style={{ position: "absolute", top: "29.5vh", left: 0, right: 0, bottom: 0, backgroundColor: "#FFFFFF", borderTopLeftRadius: "6%", borderTopRightRadius: "6%", padding: "20px", overflowY: "auto", zIndex: 2 }}>
        {[...Array(30)].map((_, i) => <p key={i} style={{ margin: "12px 0" }}>Item {i + 1}</p>)}
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
      <div style={{ position: "fixed", bottom: 0, width: "100%", height: "7vh", backgroundColor: "#FFFFFF", borderTop: "0.2vw solid #CECECE", zIndex: 9999, display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        {items.map((item, index) => (
          <div key={index} style={{ cursor: "pointer" }} onClick={item.onClick}>
            <img src={item.icon} alt="" style={{ width: item.iconSize, height: item.iconSize, filter: item.filter }} />
          </div>
        ))}
      </div>
    </div>
  );
}
