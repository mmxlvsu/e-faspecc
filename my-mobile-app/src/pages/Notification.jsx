import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchNotifications,
  storage,
  markAllNotificationsRead,
  getUnreadNotificationsCount,
  markNotificationRead,   // ✅ NEW
} from "../lib/api";

import backIcon from "../assets/back.png";
import notifEmpty from "../assets/notif_empty.png";
import pendingIcon from "../assets/pending.png";
import preparingIcon from "../assets/preparing.png";
import readyIcon from "../assets/ready.png";
import completedIcon from "../assets/complete.png";
import cancelledIcon from "../assets/cancel.png";

export default function Notification() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending": return pendingIcon;
      case "preparing": return preparingIcon;
      case "ready": return readyIcon;
      case "completed": return completedIcon;
      case "cancelled":
      case "rejected": return cancelledIcon;
      default: return pendingIcon;
    }
  };

  const loadNotifications = async () => {
    try {
      const all = await fetchNotifications();

      // ✅ FIXED — only unread notifications
      const unread = all.filter(n => n.status === "unread");

      setNotifications(unread);

      const countData = await getUnreadNotificationsCount();
      setUnreadCount(countData.unread);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleClearAll = async () => {
    try {
      await markAllNotificationsRead();

      setNotifications([]);
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to clear notifications:", err);
    }
  };

  const openNotification = async (notif) => {
    // ✅ mark this notification as read in DB
    await markNotificationRead(notif.id);

    // Remove it from screen instantly without reload
    setNotifications(prev => prev.filter(n => n.id !== notif.id));

    // Navigate to order page
    navigate("/order", { state: { status: notif.status, orderId: notif.orderId } });
  };

  return (
    <div className="w-screen h-screen relative bg-[#36570A]">
      {/* Header */}
      <div
        className="fixed top-0 left-0 right-0 flex items-center justify-between"
        style={{
          height: "15vw",
          padding: "0 4vw",
          boxShadow: "0 0.2vw 0.5vw rgba(0,0,0,0.1)",
          zIndex: 9999,
        }}
      >
        <img
          src={backIcon}
          alt="Back"
          className="cursor-pointer"
          style={{ width: "5vw", height: "5vw", filter: "brightness(0) invert(1)" }}
          onClick={() => navigate("/home")}
        />

        <h1
          className="flex-1 text-center font-bold"
          style={{ fontSize: "4vw", color: "white" }}
        >
          Notifications
        </h1>

        {notifications.length > 0 && (
          <button
            onClick={handleClearAll}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "3vw",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Scrollable Content */}
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
            <img src={notifEmpty} style={{ width: "10vw", height: "10vw", marginTop: "40vw" }} />
            <p style={{ fontSize: "4vw", color: "#777", marginTop: "5vw" }}>
              Your notification is empty
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "2vw" }}>
            {notifications.map((notif) => {
              const orderStatus = notif.order?.status || "pending";
              const orderId = notif.orderId?.slice(0, 5);

              return (
                <div
                  key={notif.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "4vw",
                    borderRadius: "2vw",
                    color: "#000",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                  onClick={() => openNotification(notif)}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "4vw" }}>
                      <img
                        src={getStatusIcon(orderStatus)}
                        style={{ width: "6vw", height: "6vw" }}
                      />
                      <span style={{ fontSize: "4vw", fontWeight: "bold", textTransform: "capitalize" }}>
                        {orderStatus}
                      </span>
                    </div>

                    <span style={{ fontSize: "3vw", color: "#999" }}>
                      {new Date(notif.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: "3.2vw",
                      marginLeft: "10vw",
                      marginTop: "1vw",
                    }}
                  >
                    {notif.message || `Order #${orderId} updated.`}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
