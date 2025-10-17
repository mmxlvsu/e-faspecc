import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI, logout } from "../lib/api";
import homeIcon from "../assets/home.png";
import cartIcon from "../assets/cart.png";
import orderIcon from "../assets/order.png";
import personIcon from "../assets/profile.png";
import editIcon from "../assets/edit.png";

export default function BottomBarPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    fullName: "",
    contact: "",
    studentId: "",
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
        studentId: userData.studentId || "",
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
    { icon: orderIcon, onClick: () => navigate("/home"), iconSize: "6vw", filter: "invert(0%)" },
    { icon: personIcon, onClick: () => navigate("/profile"), iconSize: "6vw", filter: "invert(35%) sepia(72%) saturate(454%) hue-rotate(53deg) brightness(95%) contrast(93%)" },
  ];

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", backgroundColor: "#fff" }}>
      {/* Top Green Header */}
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
        <div style={{ width: "90px", height: "90px", marginBottom: "-35px" }}>
          <div
            onClick={handleEditClick}
            style={{
              position: "absolute",
              bottom: "4px",
              right: "calc(50% - 12px)",
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
            <img src={editIcon} alt="Edit" style={{ width: "15px", height: "15px" }} />
          </div>
        </div>
      </div>

      {/* User Info Section */}
      <div
        style={{
          position: "absolute",
          top: "15vh",
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
            backgroundColor: "#F8F8F8",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            padding: "20px",
          }}
        >
          <h2 style={{ textAlign: "center", color: "#36570A", marginBottom: "15px" }}>
            Profile Information
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px" }}>
            <div><strong>Full Name:</strong> {userData.fullName}</div>
            <div><strong>Role:</strong> {userData.role}</div>
            <div><strong>Email:</strong> {userData.email}</div>
            <div><strong>Contact:</strong> {userData.contact}</div>
            <div><strong>Student ID:</strong> {userData.studentId}</div>
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

                <label>Role</label>
                <input
                  value={userData.role}
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

                <label>Student ID</label>
                <input
                  value={editValues.studentId}
                  onChange={(e) => setEditValues({ ...editValues, studentId: e.target.value })}
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
          zIndex: 10000,
        }}
        onClick={handleSignOut}
      >
        Sign Out
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