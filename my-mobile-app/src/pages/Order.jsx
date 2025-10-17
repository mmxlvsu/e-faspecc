import React from "react";
import { useNavigate } from "react-router-dom";
import homeIcon from "../assets/home.png";
import cartIcon from "../assets/cart.png";
import orderIcon from "../assets/order.png";
import personIcon from "../assets/profile.png";
import self from "../assets/self.png";
import editIcon from "../assets/edit.png";

export default function BottomBarPage() {
  const navigate = useNavigate();


  const items = [
    { icon: homeIcon, onClick: () => navigate("/home"), iconSize: "6vw", filter: "invert (0%)"},
    { icon: cartIcon, onClick: () => navigate("/cart"), iconSize: "6vw", filter: "invert(0%) brightness(0%)" },
    { icon: orderIcon, onClick: () => navigate("/home"), iconSize: "6vw", filter: "invert(35%) sepia(72%) saturate(454%) hue-rotate(53deg) brightness(95%) contrast(93%)" },
    { icon: personIcon, onClick: () => navigate("/profile"), iconSize: "6vw", filter: "invert(0%)" },
  ];

  const handleSignOut = () => {
    console.log("Signed Out");
    navigate("/login");
  };

  const handleEditClick = () => console.log("Edit clicked");

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", backgroundColor: "#fff" }}>

        
      {/* Bottom Bar */}
      <div style={{
        position: "fixed",
        bottom: "0px",
        left: "0px",
        right: "0px",
        height: "67px",
        borderTop: "0.8px solid #CECECE",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: 9999
      }}>
        {items.map((item, index) => (
          <img
            key={index}
            src={item.icon}
            alt={`icon-${index}`}
            onClick={item.onClick}
            style={{ width: item.iconSize, height: item.iconSize, filter: item.filter, cursor: "pointer" }}
          />
        ))}
      </div>
    </div>
  );
}
