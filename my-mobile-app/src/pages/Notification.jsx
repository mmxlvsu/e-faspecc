import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNotifications } from "../lib/api";
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
      case "rejected":
        return cancelledIcon;
      default:
        return pendingIcon;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetchNotifications(token)
      .then((data) => setNotifications(data))
      .catch((err) =>
        console.error("Failed to fetch notifications:", err)
      );
  }, []);

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
          style={{
            width: "5vw",
            height: "5vw",
            filter: "brightness(0) invert(1)",
          }}
          onClick={() => navigate("/home")}
        />
        <h1
          className="flex-1 text-center font-bold"
          style={{ fontSize: "4vw", color: "white" }}
        >
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
            <p
              style={{
                fontSize: "5vw",
                color: "#777",
                marginTop: "5vw",
              }}
            >
              Your notification is empty
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "2vw" }}>
            {notifications.map((notif) => {
              const orderStatus = notif.order?.status || "pending";
              const orderId = notif.orderId;

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
                  onClick={() =>
                    navigate("/order", { state: { orderId } })
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4vw",
                      }}
                    >
                      <img
                        src={getStatusIcon(orderStatus)}
                        alt={orderStatus}
                        style={{ width: "6vw", height: "6vw" }}
                      />
                      <span
                        style={{
                          fontSize: "4vw",
                          fontWeight: "bold",
                          textTransform: "capitalize",
                        }}
                      >
                        {orderStatus}
                      </span>
                    </div>
                    <span
                      style={{ fontSize: "3vw", color: "#999" }}
                    >
                      {new Date(notif.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
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
