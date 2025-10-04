import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../lib/api";
import homeIcon from "../assets/home.png";
import menuIcon from "../assets/menu.png";
import cartIcon from "../assets/cart.png";
import orderIcon from "../assets/order.png";
import personIcon from "../assets/profile.png"; // Using profile.png instead of person.png
import backIcon from "../assets/back.png";
// import promo1 from "../assets/promo1.jpg"; // Commented out since it's causing errors

export default function BottomBarWithTabs() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Dashboard");

  // Logout handler - clears authentication and redirects to splash
  const handleLogout = () => {
    logout(navigate);
  };

  // Navigation handlers
  const handleEditProfile = () => alert("Edit Profile clicked");
  const handleHomeClick = () => navigate("/home");
  const handleMenuClick = () => navigate("/home"); // Navigate to home for now since Menu page doesn't exist
  const handleCartClick = () => navigate("/cart");
  const handleOrdersClick = () => navigate("/home"); // Navigate to home for now since Orders page doesn't exist
  const handleProfileClick = () => navigate("/profile");

  // Width of the indicator line
  const indicatorWidth = 68;
  const dashboardLeft = 68;
  const activityLeft = 290;

  return (
    <div style={{ width: "414px", height: "100vh", position: "relative" }}>
      {/* Green Background Rectangle */}
      <div
        style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          width: "418px",
          height: "187px",
          backgroundColor: "#36570A",
          zIndex: 0,
        }}
      />

      {/* Account Label */}
      <p
        style={{
          position: "absolute",
          left: "20px",
          top: "75px",
          fontSize: "18px",
          fontWeight: 400,
          color: "#FFFFFF",
          fontFamily: "Poppins, sans-serif",
          zIndex: 3,
        }}
      >
        Account
      </p>

      {/* White Rounded Rectangle with Drop Shadow */}
      <div
        style={{
          position: "absolute",
          left: "10px",
          top: "117px",
          width: "391px",
          height: "127px",
          backgroundColor: "#FFFFFF",
          border: "0.5px solid rgba(146,146,146,0.3)",
          borderRadius: "15px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 1,
        }}
      />

      {/* User Image */}
      <img
        src={promo1}
        alt="User"
        style={{
          position: "absolute",
          left: "33px",
          top: "141px",
          width: "40px",
          height: "40px",
          borderRadius: "128px",
          objectFit: "cover",
          zIndex: 2,
        }}
      />

      {/* User Placeholder Name */}
      <p
        style={{
          position: "absolute",
          left: "89px",
          top: "148px",
          width: "194px",
          height: "26px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          fontSize: "20px",
          color: "#000000",
          lineHeight: "26px",
          zIndex: 2,
        }}
      >
        Jennie Kim
      </p>

      {/* Edit Profile Button */}
      <div
        onClick={handleEditProfile}
        style={{
          position: "absolute",
          left: "31px",
          top: "204px",
          width: "349px",
          height: "25px",
          backgroundColor: "#FFFFFF",
          border: "0.5px solid rgba(146,146,146,0.3)",
          borderRadius: "8px",
          zIndex: 2,
          cursor: "pointer",
        }}
      >
        <p
          style={{
            position: "absolute",
            left: "160px",
            top: "6px",
            width: "65px",
            height: "12px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontSize: "8px",
            color: "#000000",
            lineHeight: "12px",
          }}
        >
          Edit Profile
        </p>
      </div>

      {/* Tabs */}
      <div style={{ position: "absolute", top: "261px", left: 0, width: "100%" }}>
        <div
          onClick={() => setActiveTab("Dashboard")}
          style={{
            cursor: "pointer",
            position: "absolute",
            left: `${dashboardLeft}px`,
            top: "0px",
            width: "68px",
            height: "18px",
            color: activeTab === "Dashboard" ? "#36570A" : "#000000",
            fontFamily: "Poppins, sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            lineHeight: "18px",
          }}
        >
          Dashboard
        </div>

        <div
          onClick={() => setActiveTab("Activity")}
          style={{
            cursor: "pointer",
            position: "absolute",
            left: `${activityLeft}px`,
            top: "0px",
            width: "44px",
            height: "18px",
            color: activeTab === "Activity" ? "#36570A" : "#000000",
            fontFamily: "Poppins, sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            lineHeight: "18px",
          }}
        >
          Activity
        </div>
      </div>

      {/* Tab Indicator Line */}
      <div
        style={{
          position: "absolute",
          top: "282px",
          left:
            activeTab === "Dashboard"
              ? `${dashboardLeft + (68 - indicatorWidth) / 2}px`
              : `${activityLeft + (44 - indicatorWidth) / 2}px`,
          width: `${indicatorWidth}px`,
          height: "0.5px",
          backgroundColor: "#36570A",
          transition: "all 0.3s ease",
        }}
      />

      {/* Bottom bar */}
      <div
        style={{
          position: "fixed",
          left: "0px",
          bottom: "0px",
          width: "414px",
          height: "55px",
          backgroundColor: "#FFFFFF",
          borderTop: "0.5px solid #CECECE",
          zIndex: 9999,
        }}
      >
        {/* Home icon */}
        <img
          src={homeIcon}
          alt="Home"
          onClick={handleHomeClick}
          style={{
            position: "absolute",
            left: "34px",
            top: "10px",
            width: "20px",
            height: "20px",
            cursor: "pointer",
            filter: "brightness(0) saturate(100%) invert(0%)",
          }}
        />
        {/* Menu icon */}
        <img
          src={menuIcon}
          alt="Menu"
          onClick={handleMenuClick}
          style={{
            position: "absolute",
            left: "115px",
            top: "10px",
            width: "20px",
            height: "20px",
            cursor: "pointer",
            filter: "invert(0%)",
          }}
        />
        {/* Cart icon */}
        <img
          src={cartIcon}
          alt="Cart"
          onClick={handleCartClick}
          style={{
            position: "absolute",
            left: "196px",
            top: "10px",
            width: "20px",
            height: "20px",
            cursor: "pointer",
            filter: "brightness(0) saturate(100%) invert(0%)",
          }}
        />
        {/* Order icon */}
        <img
          src={orderIcon}
          alt="Orders"
          onClick={handleOrdersClick}
          style={{
            position: "absolute",
            left: "277px",
            top: "10px",
            width: "20px",
            height: "20px",
            cursor: "pointer",
            filter: "brightness(0) saturate(100%) invert(0%)",
          }}
        />
        {/* Person icon */}
        <img
          src={personIcon}
          alt="Profile"
          onClick={handleProfileClick}
          style={{
            position: "absolute",
            left: "360px",
            top: "10px",
            width: "20px",
            height: "20px",
            cursor: "pointer",
            filter:
              "brightness(0) saturate(100%) invert(35%) sepia(72%) saturate(454%) hue-rotate(53deg) brightness(95%) contrast(93%)",
          }}
        />

        {/* Labels */}
        <p style={{ position: "absolute", left: "32px", top: "35px", fontSize: "8px", fontFamily: "Poppins, sans-serif", fontWeight: "300", color: "#000000" }}>Home</p>
        <p style={{ position: "absolute", left: "114px", top: "35px", fontSize: "8px", fontFamily: "Poppins, sans-serif", fontWeight: "300", color: "#000000" }}>Menu</p>
        <p style={{ position: "absolute", left: "198px", top: "35px", fontSize: "8px", fontFamily: "Poppins, sans-serif", fontWeight: "300", color: "#000000" }}>Cart</p>
        <p style={{ position: "absolute", left: "274px", top: "35px", fontSize: "8px", fontFamily: "Poppins, sans-serif", fontWeight: "300", color: "#000000" }}>Orders</p>
        <p style={{ position: "absolute", left: "358px", top: "35px", fontSize: "8px", fontFamily: "Poppins, sans-serif", fontWeight: "300", color: "#36570A" }}>Profile</p>
      </div>

      {/* Log Out Button */}
      <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          left: "24px",
          top: "767px",
          width: "364px",
          height: "36px",
          backgroundColor: "#FFFFFF",
          border: "1px solid #000000",
          borderRadius: "6px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: "400",
          fontSize: "12px",
          color: "#000000",
          cursor: "pointer",
        }}
      >
        Log Out
      </button>
    </div>
  );
}
