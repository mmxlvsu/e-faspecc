import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../assets/back.png";
import notifEmpty from "../assets/notif_empty.png";
import pendingIcon from "../assets/pending.png"; // example icon
import preparingIcon from "../assets/preparing.png"; // example icon
import readyIcon from "../assets/ready.png"; // example icon
import completedIcon from "../assets/complete.png"; // example icon
import cancelledIcon from "../assets/cancel.png"; // example icon

export default function Notification() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  // Example notifications placeholder
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      status: "pending",
      orderNumber: "12345",
      time: "1 min ago",
    },
    {
      id: "2",
      status: "preparing",
      orderNumber: "12346",
      time: "5 mins ago",
    },
    {
      id: "1",
      status: "ready",
      orderNumber: "12345",
      time: "1 min ago",
    },
    {
      id: "2",
      status: "completed",
      orderNumber: "12346",
      time: "5 mins ago",
    },
    {
      id: "2",
      status: "cancelled",
      orderNumber: "12346",
      time: "5 mins ago",
    },
  ]);

  // Get icon based on status
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return pendingIcon;
      case "preparing":
        return preparingIcon;
      case "ready":
        return readyIcon;
      case "completed":
        return completedIcon;
      case "cancelled":
        return cancelledIcon;
      default:
        return pendingIcon;
    }
  };

  return (
    <div className="w-screen h-screen relative bg-[#36570A]">
      {/* Header */}
      <div
        className="fixed top-0 left-0 right-0 flex items-center"
        style={{
          height: "15vw",
          padding: "0 4vw",
          boxShadow: "0 0.2vw 0.5vw rgba(0,0,0,0.1)",
          zIndex: 9999,
          position: "relative",
        }}
      >
        <img
          src={backIcon}
          alt="Back"
          className="cursor-pointer"
          style={{ width: "5vw", height: "5vw", filter: "brightness(0) invert(1)" }}
          onClick={() => navigate("/home")}
        />
        <h1 className="flex-1 text-center font-bold" style={{ fontSize: "4vw", color: "white" }}>
          Notification
        </h1>
      </div>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        style={{
          position: "absolute",
          top: "15vw",
          bottom: 0,
          left: 0,
          right: 0,
          overflowY: "auto",
          backgroundColor: "white",
          padding: "4vw",
        }}
      >
        {notifications.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              marginTop: "30vw",
            }}
          >
            <img
              src={notifEmpty}
              alt="Notification Empty"
              style={{ width: "18vw", height: "18vw" }}
            />
            <p style={{ fontSize: "5vw", color: "#777", marginTop: "5vw" }}>
              Your notification is empty
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "2vw" }}>
            {notifications.map((notif) => (
              <div
                key={notif.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "4vw",
                  borderRadius: "2vw",
                  color: "#000", border: "1px solid #ccc",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/order", { state: { status: notif.status, orderId: notif.id } })}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4vw" }}>
                    <img src={getStatusIcon(notif.status)} alt={notif.status} style={{ width: "6vw", height: "6vw" }} />
                    <span style={{ fontSize: "4vw", fontWeight: "bold", textTransform: "capitalize" }}>
                      {notif.status}
                    </span>
                  </div>
                  <span style={{ fontSize: "3vw", color: "#999" }}>{notif.time}</span>
                </div>
                <p style={{ fontSize: "3.2vw", marginLeft: "10vw", marginTop: "1vw" }}>
                  Your order #{notif.orderNumber} is {notif.status}.
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
