import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { orderAPI }  from "../lib/api";
import homeIcon from "../assets/home.png";
import cartIcon from "../assets/cart.png";
import orderIcon from "../assets/order.png";
import personIcon from "../assets/profile.png";
import { toast } from "react-hot-toast";

const formatOrderId = (id) => {
  if (!id) return "";
  return `#${id.slice(0, 5)}`;
};

export default function BottomBarPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const tabRef = useRef(null);
  const [showBottomBar, setShowBottomBar] = useState(true);
  const [activeTab, setActiveTab] = useState("Pending");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const lastScrollTop = useRef(0);
  const scrollContainerRef = useRef(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [confirming, setConfirming] = useState({});



  const navItems = [
    { icon: homeIcon, route: "/home", filter: "invert(0%)" },
    { icon: cartIcon, route: "/cart", filter: "invert(0%) brightness(0%)" },
    {
      icon: orderIcon,
      route: "/order",
      filter:
        "invert(35%) sepia(72%) saturate(454%) hue-rotate(53deg) brightness(95%) contrast(93%)",
    },
    { icon: personIcon, route: "/profile", filter: "invert(0%)" },
  ];

  const orderTabs = ["Pending", "Preparing", "Ready", "Completed", "Cancelled"];

  // Hide/show bottom bar on scroll
  useEffect(() => {
    const container = scrollContainerRef.current || window;
    const handleScroll = () => {
      const scrollTop = container.scrollTop ?? window.scrollY;
      setShowBottomBar(scrollTop <= lastScrollTop.current);
      lastScrollTop.current = Math.max(scrollTop, 0);
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset tab when navigating to /order
  useEffect(() => {
    if (location.pathname === "/order") {
      setActiveTab("Pending");
    }
  }, [location.pathname]);

  // ✅ Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await orderAPI.getOrders();
        setOrders(data);
      } catch (err) {
        setError("Failed to fetch orders");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchOrders();
    }, 10000); // every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // ✅ Filter by tab (match backend statuses)
  const filteredOrders = orders.filter((order) => {
    const status = order.status?.toLowerCase();
    switch (activeTab) {
      case "Pending":
        return status === "pending";
      case "Preparing":
        return status === "preparing";
      case "Ready":
        return status === "ready";
      case "Completed":
        return status === "picked_up";
      case "Cancelled":
        return status === "rejected";
      default:
        return false;
    }
  });

  // ✅ Handle actions
  const openCancelPopup = (id) => {
    setSelectedOrderId(id);
    setShowConfirmPopup(true);
  };

  const confirmCancelOrder = async () => {
    if (!selectedOrderId) return;
    try {
      await orderAPI.cancelOrder(selectedOrderId);
      setOrders((prev) =>
        prev.map((o) =>
          o.id === selectedOrderId ? { ...o, status: "rejected" } : o
        )
      );
      setShowConfirmPopup(false);
      setSelectedOrderId(null);
    } catch (err) {
      console.error("Cancel failed:", err);
      alert("Failed to cancel order");
    }
  };

  const confirmPayment = async (orderId) => {
    try {
      setConfirming((prev) => ({ ...prev, [orderId]: true }));

      await orderAPI.confirmPayment(orderId);

      toast.success("Payment request sent! Please wait while the staff processes your payment.");

      // Optional: refresh after a few seconds to check if staff has updated the order
      setTimeout(() => fetchOrders(), 5000);
    } catch (err) {
      console.error("Confirm payment failed:", err);
      toast.error(err.response?.data?.error || "Failed to confirm payment");
    } finally {
      setConfirming((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  // ✅ Loading / Error states
  if (loading) return <p style={{ padding: "20px" }}>Loading orders...</p>;
  if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;

  return (
    <div
      ref={scrollContainerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundColor: "white",
        fontFamily: "Poppins, sans-serif",
        overflowY: "auto",
      }}
    >
      <h1 style={{ fontSize: "4vw", fontWeight: "bold", margin: "20px 0 10px 5vw" }}>
        My Orders
      </h1>

      {/* Tabs */}
      <div
        ref={tabRef}
        style={{
          display: "flex",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          borderBottom: "2px solid #ccc",
          width: "100%",
        }}
      >
        {orderTabs.map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2vw",
              fontSize: "3.4vw",
              fontWeight: activeTab === tab ? "600" : "400",
              color: activeTab === tab ? "#2e7d32" : "#555",
              padding: "10px 20px 8px 20px",
              cursor: "pointer",
              flexShrink: 0,
              background: "none",
              border: "none",
              borderBottom:
                activeTab === tab
                  ? "1px solid #2e7d32"
                  : "1px solid transparent",
            }}
          >
            <div
              style={{
                width: "5vw",
                height: "5vw",
                borderRadius: "50%",
                backgroundColor: "#36570A",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "2.8vw",
                fontWeight: "600",
              }}
            >
              {index + 1}
            </div>
            {tab}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div style={{ backgroundColor: "#f3f3f3", width: "100%", minHeight: "90vh", padding: "5vw 0" }}>
        {filteredOrders.length === 0 ? (
          <p style={{ textAlign: "center", color: "#777" }}>No {activeTab} orders found.</p>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              style={{
                backgroundColor: "white",
                borderRadius: "2vw",
                padding: "4vw",
                width: "90%",
                margin: "3vw auto",
              }}
            >
              <p style={{ fontSize: "3.5vw", fontWeight: "600" }}>
                Order {formatOrderId(order.id)}
              </p>
              <p style={{ fontSize: "3vw", color: "#666" }}>
                Total Items: {order.orderItems?.length}
              </p>
              <p style={{ fontSize: "3vw", color: "#666" }}>
                Total Price: ₱{Number(order.totalPrice).toFixed(2)}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "3vw",
                  marginTop: "3vw",
                }}
              >
                {activeTab === "Pending" && (
                  <>
                    <button
                      style={{
                        backgroundColor: "white",
                        border: "1px solid #d9d9d9",
                        color: "black",
                        borderRadius: "1vw",
                        padding: "2vw 2vw",
                        fontSize: "2.8vw",
                        fontWeight: "500",
                        cursor: "pointer",
                      }}
                      onClick={() => openCancelPopup(order.id)}
                    >
                      Cancel Order
                    </button>
                    {/*
                    <button
                      style={{
                        backgroundColor: "white",
                        color: "#36570A",
                        border: "1px solid #36570A",
                        borderRadius: "1vw",
                        padding: "2vw 2vw",
                        fontSize: "2.8vw",
                        fontWeight: "500",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(`/order/${order.id}`)}
                    >
                      View Details
                    </button>
                    */}
                  </>
                )}

                {activeTab === "Ready" && (
                  <>
                    {!order.paymentConfirmed ? (
                      <button
                        onClick={() => confirmPayment(order.id)}
                        disabled={confirming[order.id]}
                        style={{
                          backgroundColor: "white",
                          color: "#36570A",
                          border: "1px solid #36570A",
                          borderRadius: "1vw",
                          padding: "2vw 2vw",
                          fontSize: "2.8vw",
                          fontWeight: "500",
                          cursor: confirming[order.id] ? "not-allowed" : "pointer",
                          opacity: confirming[order.id] ? 0.6 : 1,
                          width: "100%",
                          marginTop: "3vw",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        }}
                      >
                        {confirming[order.id] ? "Processing..." : "Pay at the Counter"}
                      </button>
                    ) : (
                      <p
                        style={{
                          marginTop: "3vw",
                          textAlign: "center",
                          color: "#999",
                          fontWeight: "500",
                          fontSize: "3vw",
                        }}
                      >
                        💳 Waiting for staff to confirm payment...
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Nav */}
      <div
        style={{
          position: "fixed",
          bottom: showBottomBar ? "0" : "-80px",
          left: 0,
          right: 0,
          height: "67px",
          borderTop: "0.8px solid #CECECE",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          zIndex: 999,
          transition: "bottom 0.3s ease-in-out",
        }}
      >
        {navItems.map((item, index) => (
          <img
            key={index}
            src={item.icon}
            alt={`nav-${index}`}
            onClick={() => navigate(item.route)}
            style={{
              width: "6vw",
              height: "6vw",
              filter: item.filter,
              cursor: "pointer",
            }}
          />
        ))}
      </div>
      {showConfirmPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "2vw",
              padding: "6vw",
              textAlign: "center",
              width: "80%",
              maxWidth: "350px",
            }}
          >
            <p style={{ fontSize: "4vw", fontWeight: "600", marginBottom: "4vw" }}>
              Cancel this order?
            </p>
            <p style={{ fontSize: "3vw", color: "#666", marginBottom: "6vw" }}>
              This action cannot be undone.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "4vw" }}>
              <button
                style={{
                  backgroundColor: "#ccc",
                  color: "black",
                  border: "none",
                  borderRadius: "1vw",
                  padding: "2vw 4vw",
                  fontSize: "3vw",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
                onClick={() => setShowConfirmPopup(false)}
              >
                No
              </button>
              <button
                style={{
                  backgroundColor: "#d9534f",
                  color: "white",
                  border: "none",
                  borderRadius: "1vw",
                  padding: "2vw 4vw",
                  fontSize: "3vw",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
                onClick={confirmCancelOrder}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
