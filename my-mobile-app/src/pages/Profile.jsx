import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI, logout } from "../lib/api";
import homeIcon from "../assets/home.png";
import cartIcon from "../assets/cart.png";
import orderIcon from "../assets/order.png";
import personIcon from "../assets/profile.png";
import editIcon from "../assets/edit.png";
import defaultProfile from "../assets/default-profile.png";
import profileBack from "../assets/backk.png";
import password from "../assets/password.png";
import policies from "../assets/policies.png";
import about from "../assets/about.png";
import rate from "../assets/rate.png";
import faq from "../assets/faq.png";
import backIcon from "../assets/back.png";

export default function BottomBarPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showBottomBar, setShowBottomBar] = useState(true);
  const [editValues, setEditValues] = useState({
    fullName: "",
    contact: "",
  });

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await authAPI.getCurrentUser();
        setUserData(user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        logout(navigate);
      }
    }
    fetchUser();
  }, [navigate]);

  // Scroll listener to hide/show bottom bar
  useEffect(() => {
    const handleScroll = () => {
      const el = scrollContainerRef.current;
      if (!el) return;

      const atBottom = el.scrollHeight - el.scrollTop === el.clientHeight;
      setShowBottomBar(!atBottom);
    };

    const el = scrollContainerRef.current;
    if (el) el.addEventListener("scroll", handleScroll);

    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleEditClick = () => {
    if (userData) {
      setEditValues({
        fullName: userData.fullName || "",
        contact: userData.contact || "",
      });
      setIsEditing(true);
    }
  };

  const handleSignOut = () => logout(navigate);

  if (!userData) {
    return (
      <div style={{ textAlign: "center", marginTop: "40vh", fontFamily: "Poppins" }}>
        Loading user...
      </div>
    );
  }

  const items = [
    { icon: homeIcon, onClick: () => navigate("/home"), iconSize: "6vw", filter: "invert(0%) brightness(0%)" },
    { icon: cartIcon, onClick: () => navigate("/cart"), iconSize: "6vw", filter: "invert(0%) brightness(0%)" },
    { icon: orderIcon, onClick: () => navigate("/order"), iconSize: "6vw", filter: "invert(0%)" },
    { icon: personIcon, onClick: () => navigate("/profile"), iconSize: "6vw", filter: "invert(35%) sepia(72%) saturate(454%) hue-rotate(53deg) brightness(95%) contrast(93%)" },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>

      {/* Scrollable Content */}
      <div
        ref={scrollContainerRef}
        style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Poppins",
    paddingTop: "30px",
    paddingBottom: "80px", // ✅ space for bottom bar
    boxSizing: "border-box",
    backgroundColor: "#fff",
  }}
      >
        {/* Profile Picture */}
      <div style={{ position: "relative", width: "80px", height: "80px" }}>
        <img
          src={userData.profileImage || defaultProfile}
          alt="Profile"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "1px solid #f3f3f3",
            cursor: "pointer",
          }}
          onClick={handleEditClick}
        />
        <img
          src={editIcon}
          alt="Edit"
          style={{
            width: "22px",
            height: "22px",
            position: "absolute",
            bottom: "0",
            right: "0",
            borderRadius: "50%",
            backgroundColor: "#fff",
            padding: "2px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
          onClick={handleEditClick}
        />
      </div>

        {/* Profile Info */}
        <div style={{ width: "90%", maxWidth: "400px", marginTop: "22px", marginBottom: "10px" }}>
          <h2 style={{ color: "#36570A", margin: 0, fontSize: "15px", fontWeight: "500" }}>
            Profile Information
          </h2>
        </div>

        <div
          style={{
            width: "90%",
            maxWidth: "400px",
            backgroundColor: "#f3f3f3",
            border: "1px solid #ccc",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px" }}>
            <div><strong>Full Name:</strong> {userData.fullName}</div>
            <div><strong>Email:</strong> {userData.email}</div>
            <div><strong>Contact:</strong> {userData.contact}</div>
          </div>
        </div>

        {/* Settings */}
        <div style={{ width: "90%", maxWidth: "400px", marginTop: "22px", marginBottom: "-1px" }}>
          <h2 style={{ color: "#36570A", margin: 0, fontSize: "15px", fontWeight: "500" }}>
            Settings
          </h2>
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "15px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {[ 
            { icon: password, text: "Password" },
            { icon: policies, text: "Terms & Policies" },
            { icon: about, text: "About" },
            { icon: rate, text: "Rate" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                height: "45px",
                borderRadius: "15px",
                border: "1px solid #ccc",
                padding: "0 15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#f3f3f3",
                cursor: "pointer",
              }}
              onClick={() => navigate("/change-password")}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <img src={item.icon} alt={item.text} style={{ width: "18px", height: "18px", objectFit: "contain" }} />
                <span style={{ fontSize: "14px", fontWeight: "bold" }}>{item.text}</span>
              </div>
              <img src={profileBack} alt="Back Icon" style={{ width: "15px", height: "15px" }} />
            </div>
          ))}

          {/* FAQs Row */}
          <div
            style={{
              height: "45px",
              borderRadius: "15px",
              border: "1px solid #ccc",
              padding: "0 15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#f3f3f3",
              cursor: "pointer",
            }}
            onClick={() => setShowPopup(true)}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img src={faq} alt="FAQ Icon" style={{ width: "18px", height: "18px", objectFit: "contain" }} />
              <span style={{ fontSize: "14px", fontWeight: "bold" }}>FAQs</span>
            </div>
            <img src={profileBack} alt="Back Icon" style={{ width: "15px", height: "15px", objectFit: "contain" }} />
          </div>

          {/* Sign Out Button */}
          <div
            style={{
              marginTop: "15px",
              borderRadius: "7px",
              backgroundColor: "#36570A",
              padding: "10px",
              cursor: "pointer",
              fontFamily: "Poppins, sans-serif",
              fontSize: "14px",
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
            }}
            onClick={handleSignOut}
          >
            Sign Out
          </div>
        </div>
      </div>

      {/* FAQs Popup */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              width: "100%",
              height: "100vh",
              position: "relative",
              overflowY: "auto",
            }}
          >
            <img
              src={backIcon}
              alt="Back"
              onClick={() => setShowPopup(false)}
              style={{
                position: "absolute",
                left: "4vw",
                top: "4vh",
                width: "5vw",
                height: "5vw",
                cursor: "pointer",
              }}
            />

            <div style={{ marginTop: "12vh", padding: "20px" }}>
              <h3 style={{ fontSize: "24px", fontWeight: "bold", color: "#36570A" }}>FAQs</h3>
              <p style={{ fontSize: "14px", marginTop: "10px" }}>
                Here you can display frequently asked questions or help information.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div
        style={{
          position: "fixed",
          bottom: showBottomBar ? "0px" : "-70px",
          left: "0px",
          right: "0px",
          height: "67px",
          borderTop: "0.8px solid #CECECE",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          transition: "bottom 0.3s ease-in-out",
          zIndex: 999,
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