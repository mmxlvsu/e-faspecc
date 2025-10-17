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

  const userData = { name: "Jennie Kim", role: "Student" };

  const items = [
    { icon: homeIcon, onClick: () => navigate("/home"), iconSize: "6vw", filter: "invert(0%) brightness(0%)" },
    { icon: cartIcon, onClick: () => navigate("/cart"), iconSize: "6vw", filter: "invert(0%) brightness(0%)" },
    { icon: orderIcon, onClick: () => navigate("/home"), iconSize: "6vw", filter: "invert(0%)" },
    { icon: personIcon, onClick: () => navigate("/profile"), iconSize: "6vw", filter: "invert(35%) sepia(72%) saturate(454%) hue-rotate(53deg) brightness(95%) contrast(93%)" },
  ];

  const handleSignOut = () => {
    console.log("Signed Out");
    navigate("/login");
  };

  const handleEditClick = () => console.log("Edit clicked");

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", backgroundColor: "#fff" }}>

      {/* Top Half Green Backdrop */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "15vh",
          backgroundColor: "#36570A",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          zIndex: 998,
        }}
      >
        {/* Profile Image Container */}
        <div 
          style={{ 
            position: 'relative', 
            width: "90px",
            height: "90px",
            marginBottom: "-35px",
            zIndex: 999,
          }}
        >
          {/* Profile Image */}
          <img
            src={self}
            alt="User Profile"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #FFFFFF",
              display: 'block',
            }}
          />
          
          {/* Edit Icon */}
          <div
            onClick={handleEditClick}
            style={{
              position: "absolute",
              bottom: "4px",
              right: "-5px",
              width: "25px",
              height: "25px",
              borderRadius: "50%",
              backgroundColor: "#FFFFFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              zIndex: 1000,
            }}
          >
            <img
              src={editIcon}
              alt="Edit"
              style={{ width: "15px", height: "15px", filter: "invert(0%) brightness(0%)" }}
            />
          </div>
        </div>
      </div>
      
      {/* Name & Role Banner */}
      <div style={{ 
        position: 'absolute', 
        top: '15vh',
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        paddingTop: '40px', 
        zIndex: 999 
      }}>
        <p style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#000',
          margin: '0 0 5px 0', 
          fontFamily: "Poppins, sans-serif",
        }}>
          {userData.name}
        </p>

        <div style={{
          backgroundColor: '#FFECA2',
          borderRadius: '15px',
          padding: '3px 15px',
        }}>
          <p style={{
            fontSize: '10px',
            fontWeight: '500',
            color: 'black',
            margin: 0,
            fontFamily: "Poppins, sans-serif",
            textTransform: 'uppercase',
          }}>
            {userData.role}
          </p>
        </div>
      </div>

      {/* Sign Out Button */}
      <div
        style={{
          position: "fixed",
          bottom: "85px",
          left: "50%",
          transform: "translateX(-50%)",
          border: "1px solid #36570A",
          borderRadius: "8px",
          backgroundColor: "#FFFFFF",
          padding: "6px 100px",
          cursor: "pointer",
          fontFamily: "Poppins, sans-serif",
          fontSize: "12px",
          fontWeight: 500,
          color: "black",
          textAlign: "center",
          whiteSpace: "nowrap",
          zIndex: 10000
        }}
        onClick={handleSignOut}
      >
        Sign Out
      </div>

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
