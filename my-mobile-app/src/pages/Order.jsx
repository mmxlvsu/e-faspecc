import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import homeIcon from "../assets/home.png";
import cartIcon from "../assets/cart.png";
import orderIcon from "../assets/order.png";
import personIcon from "../assets/profile.png";
import { orderAPI } from "../lib/api";
import { toast } from "react-hot-toast"; // ✅ for quick toast messages
import { motion, AnimatePresence } from "framer-motion";


export default function BottomBarPage() {
  const navigate = useNavigate();

  const items = [
    { icon: homeIcon, onClick: () => navigate("/home"), iconSize: "6vw", filter: "invert(0%)" },
    { icon: cartIcon, onClick: () => navigate("/cart"), iconSize: "6vw", filter: "invert(0%) brightness(0%)" },
    { icon: orderIcon, onClick: () => navigate("/order"), iconSize: "6vw", filter: "invert(35%) sepia(72%) saturate(454%) hue-rotate(53deg) brightness(95%) contrast(93%)" },
    { icon: personIcon, onClick: () => navigate("/profile"), iconSize: "6vw", filter: "invert(0%)" },
  ];

  const tabs = ["Pending", "Preparing", "Ready", "Completed", "Cancelled"];
  const [activeTab, setActiveTab] = useState("Pending");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState({}); // track loading per order

  // Hide/show bottom bar on scroll
  const [showBottomBar, setShowBottomBar] = useState(true);
  const lastScrollTop = useRef(0);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current || window;
    const handleScroll = () => {
      const scrollTop = container.scrollTop ?? window.scrollY;
      setShowBottomBar(scrollTop <= lastScrollTop.current);
      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Fetch orders
  const fetchOrders = async () => {
    try {
      const data = await orderAPI.getOrders();
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Confirm payment API call
  const confirmPayment = async (orderId) => {
    try {
      setConfirming((prev) => ({ ...prev, [orderId]: true }));
      await orderAPI.confirmPayment(orderId); // ✅ FIXED
      toast.success("Payment confirmed! Please proceed to the counter.");

      await fetchOrders();
    } catch (err) {
      console.error("Confirm payment failed:", err);
      toast.error(err.response?.data?.error || "Failed to confirm payment");
    } finally {
      setConfirming((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  const mapStatusToTab = (status) => {
    switch (status) {
      case "pending": return "Pending";
      case "preparing": return "Preparing";
      case "ready": return "Ready";
      case "picked_up": return "Completed";
      case "rejected": return "Cancelled";
      default: return status;
    }
  };

  // ✅ Filter orders based on tab
  const filteredOrders = orders.filter(
    (order) => mapStatusToTab(order.status) === activeTab
  );

  return (
    <div
      ref={scrollContainerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundColor: "#fff",
        fontFamily: "Poppins",
        overflowY: "auto",
      }}
    >
      <h1
        style={{
          position: "absolute",
          top: "4vh",
          left: "5vw",
          fontSize: "4vw",
          fontWeight: "bold",
        }}
      >
        My Orders
      </h1>

      {/* Tabs */}
      <div
        className="absolute flex overflow-x-auto"
        style={{
          top: "8vh",
          left: "0",
          width: "100%",
          padding: "0 2vw",
          boxSizing: "border-box",
        }}
      >
        {tabs.map((tab) => (
          <div
            key={tab}
            className="cursor-pointer flex-shrink-0 relative"
            style={{
              padding: "1vh 0",
              minWidth: "19vw",
              textAlign: "center",
              fontSize: "3vw",
              fontWeight: "500",
              color: activeTab === tab ? "#36570A" : "#000",
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            <div
              className="underline"
              style={{
                position: "absolute",
                bottom: "0",
                left: "50%",
                transform: "translateX(-50%)",
                height: "2px",
                width: activeTab === tab ? "50%" : "0%",
                backgroundColor: "#36570A",
                transition: "width 0.2s",
              }}
            />
          </div>
        ))}
      </div>

      {/* Orders List */}
      <div style={{ marginTop: "14vh", padding: "4vw" }}>
        {loading ? (
          <p>Loading orders...</p>
        ) : filteredOrders.length === 0 ? (
          <p style={{ color: "#777", textAlign: "center" }}>
            No {activeTab.toLowerCase()} orders yet.
          </p>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "2vw",
                padding: "3vw",
                marginBottom: "3vw",
                boxShadow: "0 0.5vw 1vw rgba(0,0,0,0.05)",
              }}
            >
              <p style={{ fontWeight: "600", fontSize: "3.5vw" }}>
                Order #{order.id}
              </p>
              <p style={{ fontSize: "3vw", color: "#555" }}>
                Total: ₱{Number(order.totalPrice).toFixed(2)}
              </p>
              <p style={{ fontSize: "3vw", color: "#555" }}>
                Status:{" "}
                <span style={{ color: "#36570A", fontWeight: "600" }}>
                  {order.status}
                </span>
              </p>

              <div style={{ marginTop: "2vw" }}>
                {order.orderItems?.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "2.8vw",
                    }}
                  >
                    <span>
                      {item.quantity}× {item.item?.name}
                    </span>
                    <span>₱{Number(item.priceAtOrder).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* ✅ Pay at Counter Button */}
              <AnimatePresence>
                {order.status === "ready" && !order.paymentConfirmed && (
                  <motion.button
                    key={`pay-${order.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    onClick={() => confirmPayment(order.id)}
                    disabled={confirming[order.id]}
                    style={{
                      marginTop: "3vw",
                      width: "100%",
                      backgroundColor: "#36570A",
                      color: "white",
                      padding: "2.5vw",
                      border: "none",
                      borderRadius: "2vw",
                      fontSize: "3.2vw",
                      fontWeight: "600",
                      cursor: confirming[order.id] ? "not-allowed" : "pointer",
                      opacity: confirming[order.id] ? 0.6 : 1,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                  >
                    {confirming[order.id] ? "Confirming..." : "Pay at the Counter"}
                  </motion.button>
                )}
              </AnimatePresence>

              {/* ✅ Show confirmation state if already confirmed */}
              <AnimatePresence>
                {order.status === "ready" && order.paymentConfirmed && (
                  <motion.p
                    key={`confirmed-${order.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{
                      marginTop: "3vw",
                      textAlign: "center",
                      color: "#4CAF50",
                      fontWeight: "600",
                      fontSize: "3vw",
                    }}
                  >
                    ✅ Payment confirmed. Please proceed to the counter.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))
        )}
      </div>

      {/* Bottom Nav */}
      <div
        style={{
          position: "fixed",
          bottom: showBottomBar ? "0px" : "-80px",
          left: 0,
          right: 0,
          height: "67px",
          borderTop: "0.8px solid #CECECE",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          zIndex: 9999,
          transition: "bottom 0.3s ease-in-out",
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
