import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../lib/api";
import homeIcon from "../assets/home.png";
import menuIcon from "../assets/menu.png";
import cartIcon from "../assets/cart.png";
import orderIcon from "../assets/order.png";
import personIcon from "../assets/profile.png";
import backIcon from "../assets/back.png";
import promo1 from "../assets/promo1.jpg";

export default function BottomBarWithTabs() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleLogout = () => logout(navigate);
  const handleEditProfile = () => alert("Edit Profile clicked");
  const handleHomeClick = () => navigate("/home");
  const handleMenuClick = () => navigate("/home");
  const handleCartClick = () => navigate("/cart");
  const handleOrdersClick = () => navigate("/home");
  const handleProfileClick = () => navigate("/profile");

  const vw = (px) => `${(px / 414) * 100}vw`;
  const vh = (px) => `${(px / 896) * 100}vh`; // design height reference
  const responsiveText = (px) => `${(px / 414) * 100}vw`;

  const indicatorWidth = 68;
  const dashboardLeft = 68;
  const activityLeft = 290;

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: vh(187),
          backgroundColor: "#36570A",
          zIndex: 0,
        }}
      />

      <p
        style={{
          position: "absolute",
          left: vw(20),
          top: vh(75),
          fontSize: responsiveText(18),
          fontWeight: 400,
          color: "#fff",
          fontFamily: "Poppins, sans-serif",
          zIndex: 3,
        }}
      >
        Account
      </p>

      <div
        style={{
          position: "absolute",
          left: vw(10),
          top: vh(117),
          width: vw(391),
          height: vh(127),
          backgroundColor: "#fff",
          border: `${vw(0.5)} solid rgba(146,146,146,0.3)`,
          borderRadius: vw(15),
          boxShadow: `0 ${vh(4)} ${vh(6)} rgba(0,0,0,0.1)`,
          zIndex: 1,
        }}
      />

      <img
        src={promo1}
        alt="User"
        style={{
          position: "absolute",
          left: vw(33),
          top: vh(141),
          width: vw(40),
          height: vw(40),
          borderRadius: "50%",
          objectFit: "cover",
          zIndex: 2,
        }}
      />

      <p
        style={{
          position: "absolute",
          left: vw(89),
          top: vh(148),
          width: vw(194),
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          fontSize: responsiveText(20),
          color: "#000",
          lineHeight: responsiveText(26),
          zIndex: 2,
        }}
      >
        Jennie Kim
      </p>

      <div
        onClick={handleEditProfile}
        style={{
          position: "absolute",
          left: vw(31),
          top: vh(204),
          width: vw(349),
          height: vh(30),
          backgroundColor: "#fff",
          border: `${vw(0.5)} solid rgba(146,146,146,0.3)`,
          borderRadius: vw(8),
          cursor: "pointer",
          zIndex: 2,
        }}
      >
        <p
          style={{
            position: "absolute",
            left: vw(160),
            top: vh(6),
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontSize: responsiveText(8),
            color: "#000",
            lineHeight: responsiveText(12),
          }}
        >
          Edit Profile
        </p>
      </div>

      <div style={{ position: "absolute", top: vh(261), left: 0, width: "100%" }}>
        <div
          onClick={() => setActiveTab("Dashboard")}
          style={{
            cursor: "pointer",
            position: "absolute",
            left: vw(dashboardLeft),
            top: 0,
            width: vw(68),
            height: vh(18),
            color: activeTab === "Dashboard" ? "#36570A" : "#000",
            fontFamily: "Poppins, sans-serif",
            fontSize: responsiveText(12),
            fontWeight: 500,
            lineHeight: responsiveText(18),
          }}
        >
          Dashboard
        </div>
        <div
          onClick={() => setActiveTab("Activity")}
          style={{
            cursor: "pointer",
            position: "absolute",
            left: vw(activityLeft),
            top: 0,
            width: vw(44),
            height: vh(18),
            color: activeTab === "Activity" ? "#36570A" : "#000",
            fontFamily: "Poppins, sans-serif",
            fontSize: responsiveText(12),
            fontWeight: 500,
            lineHeight: responsiveText(18),
          }}
        >
          Activity
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: vh(282),
          left:
            activeTab === "Dashboard"
              ? vw(dashboardLeft + (68 - indicatorWidth) / 2)
              : vw(activityLeft + (44 - indicatorWidth) / 2),
          width: vw(indicatorWidth),
          height: vh(0.5),
          backgroundColor: "#36570A",
          transition: "all 0.3s ease",
        }}
      />

      <div
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          height: vh(55),
          backgroundColor: "#fff",
          borderTop: `${vw(0.5)} solid #CECECE`,
          zIndex: 9999,
        }}
      >
        {[{icon: homeIcon, left:34, label:"Home", onClick:handleHomeClick},
          {icon: menuIcon, left:115, label:"Menu", onClick:handleMenuClick},
          {icon: cartIcon, left:196, label:"Cart", onClick:handleCartClick},
          {icon: orderIcon, left:277, label:"Orders", onClick:handleOrdersClick},
          {icon: personIcon, left:360, label:"Profile", onClick:handleProfileClick}].map((item,index)=>(
          <React.Fragment key={index}>
            <img
              src={item.icon}
              alt={item.label}
              onClick={item.onClick}
              style={{
                position: "absolute",
                left: vw(item.left),
                top: vh(10),
                width: vw(20),
                height: vw(20),
                cursor: "pointer",
              }}
            />
            <p style={{
              position:"absolute",
              left: vw(item.left - 2),
              top: vh(35),
              fontSize: responsiveText(8),
              fontFamily:"Poppins, sans-serif",
              fontWeight:300,
              color:item.label==="Profile" ? "#36570A" : "#000"
            }}>{item.label}</p>
          </React.Fragment>
        ))}
      </div>

      <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          left: vw(24),
          top: vh(767),
          width: vw(364),
          height: vh(36),
          backgroundColor: "#fff",
          border: `${vw(1)} solid #000`,
          borderRadius: vw(6),
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          fontSize: responsiveText(12),
          color: "#000",
          cursor: "pointer",
        }}
      >
        Log Out
      </button>
    </div>
  );
}
