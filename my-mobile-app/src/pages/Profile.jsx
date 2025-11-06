import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI, logout } from "../lib/api";
import homeIcon from "../assets/home.png";
import cartIcon from "../assets/cart.png";
import orderIcon from "../assets/order.png";
import personIcon from "../assets/profile.png";
import editIcon from "../assets/edit.png";
import defaultProfile from "../assets/default-profile.png";
import profileBack from "../assets/backk.png";

export default function BottomBarPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    fullName: "",
    contact: "",
  });

  // Fetch user info from backend
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

  const handleEditClick = () => {
    if (userData) {
      setEditValues({
        fullName: userData.fullName || "",
        contact: userData.contact || "",
      });
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    try {
      const updatedUser = await authAPI.updateUser(editValues);
      setUserData(updatedUser);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating user:", err);
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
    
<div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
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
      onClick={handleEditClick} // clicking image triggers edit
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
      onClick={handleEditClick} // clicking icon also triggers edit
    />
  </div>


      {/* User Info Section */}
      <div
        style={{
          position: "absolute",
          top: "10vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "60px",
          fontFamily: "Poppins",
        }}
      >
        <div
  style={{
    width: "90%",
    maxWidth: "400px",
    marginBottom: "15px",
    display: "flex",
    justifyContent: "flex-start",
  }}
>
  <h2 style={{ color: "#36570A", margin: 0, fontSize: "15px",
    fontWeight: "500", }}>Profile Information</h2>
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

 <div
  style={{
    width: "90%",
    maxWidth: "400px",
    marginTop: "20px",
    display: "flex",
    justifyContent: "flex-start",
  }}
>
  <h2 style={{ color: "#36570A", margin: 0, fontSize: "15px",
    fontWeight: "500", }}>Settings</h2>
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
  {/* Example placeholder rows */}
  <div
  style={{
    height: "45px",
    borderRadius: "15px",
    border: "1px solid #ccc",
    padding: "0 15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between", // make space between text and icon
    cursor: "pointer",
    backgroundColor: "#f3f3f3",
    fontSize: "14px",
    fontWeight: "bold",
  }}
  onClick={() => navigate("/change-password")}
>
  Password
  <img src={profileBack} alt="Back" style={{ width: "15px", height: "15px" }} />
</div>

<div
  style={{
    height: "45px",
    borderRadius: "15px",
    border: "1px solid #ccc",
    padding: "0 15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    backgroundColor: "#f3f3f3",
    fontSize: "14px",
    fontWeight: "bold",
  }}
  onClick={() => navigate("/terms-and-policies")}
>
  FastPick Policies
  <img src={profileBack} alt="Back" style={{ width: "15px", height: "15px" }} />
</div>

<div
  style={{
    height: "45px",
    borderRadius: "15px",
    border: "1px solid #ccc",
    padding: "0 15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    backgroundColor: "#f3f3f3",
    fontSize: "14px",
    fontWeight: "bold",
  }}
  onClick={() => navigate("/help")}
>
  Happy with FastPick? Rate us!
  <img src={profileBack} alt="Back" style={{ width: "15px", height: "15px" }} />
</div>

<div
  style={{
    height: "45px",
    borderRadius: "15px",
    border: "1px solid #ccc",
    padding: "0 15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    backgroundColor: "#f3f3f3",
    fontSize: "14px",
    fontWeight: "bold",
  }}
  onClick={() => navigate("/help")}
>
  About
  <img src={profileBack} alt="Back" style={{ width: "15px", height: "15px" }} />
</div>
{/* Sign Out Button below the last placeholder */}
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

        {/* Edit Modal */}
        {isEditing && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 20000,
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px 30px",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                width: "85%",
                maxWidth: "400px",
                fontFamily: "Poppins",
              }}
            >
              <h3 style={{ marginBottom: "15px", textAlign: "center", fontWeight: "600" }}>
                Edit Profile
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <label>Full Name</label>
                <input
                  value={editValues.fullName}
                  onChange={(e) => setEditValues({ ...editValues, fullName: e.target.value })}
                  style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
                />

                <label>Email</label>
                <input
                  value={userData.email}
                  disabled
                  style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    fontSize: "14px",
                    backgroundColor: "#f5f5f5",
                  }}
                />
                <label>Contact</label>
                <input
                  value={editValues.contact}
                  onChange={(e) => setEditValues({ ...editValues, contact: e.target.value })}
                  style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
                />
                
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
                  <button
                    onClick={handleSave}
                    style={{
                      flex: 1,
                      marginRight: "10px",
                      backgroundColor: "#36570A",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      padding: "8px",
                      cursor: "pointer",
                      fontWeight: "500",
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    style={{
                      flex: 1,
                      backgroundColor: "#fff",
                      border: "1px solid #36570A",
                      borderRadius: "8px",
                      padding: "8px",
                      cursor: "pointer",
                      fontWeight: "500",
                    }}
                  >
                    Cancel
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <div
        style={{
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
          zIndex: 9999,
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