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
import searchIcon from "../assets/search.png";
import hideIcon from "../assets/hide.png";
import showIcon from "../assets/show.png";
import filledStar from "../assets/filled_star.png";
import emptyStar from "../assets/empty_star.png";
import user from "../assets/user.png";
import email from "../assets/email.png";
import phone from "../assets/phone.png";

const faqsData = [
  {
    question: "What is the Cafeteria Pre-Ordering System?",
    answer:
      "It’s an online platform that lets students and staff order food in advance from the school cafeteria to avoid long lines and waiting times.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Simply log in, choose your food items from the menu, confirm your order, and wait for a notification that your meal is ready for pick-up.",
  },
  {
    question: "Can I cancel my order after placing it?",
    answer:
      "Changes can only be made within a short period after ordering. Once the cafeteria starts preparing your food, cancellations may not be accepted.",
  },
  {
    question: "Can I change my order after placing it?",
    answer:
      "Changes can only be made within a short period after ordering. Once the cafeteria starts preparing your food, cancellations may not be accepted.",
  },

  {
    question: "How will I know when my order is ready?",
    answer:
      "You’ll receive a notification or status update in the system once your order is ready for pick-up.",
  },
  {
    question: "Where do I claim my order?",
    answer:
      "Go to the designated pick-up counter at the school cafeteria and show your order confirmation.",
  },
  {
    question: "What if I forget to claim my order?",
    answer:
      "Unclaimed orders after a set period may be disposed of or re-sold, and payment (if applicable) will not be refunded.",
  },
  {
    question: "Can I order anytime?",
    answer:
      "No. Orders can only be placed during cafeteria operating hours, usually before or between class schedules.",
  },
  {
    question: "Do I need to pay online?",
    answer:
      "Payment options depend on your school setup. Some may allow online payment; others may require payment upon pick-up.",
  },
  {
    question: "My order didn’t go through. What should I do?",
    answer:
      "Check your internet connection first. If the problem continues, contact the cafeteria staff or system admin for assistance.",
  },
  {
    question: "Is my personal information safe?",
    answer:
      "Yes. Your details are stored securely and used only for managing cafeteria transactions.",
  },
];

export default function BottomBarPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("Terms of Service");
  const [showAboutPopup, setShowAboutPopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
    const [showRatePopup, setShowRatePopup] = useState(false);
const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showBottomBar, setShowBottomBar] = useState(true);
  const [editValues, setEditValues] = useState({
    fullName: "",
    email: "",
    contact: "",
  });
  const [openIndex, setOpenIndex] = useState(null);
const [showCurrent, setShowCurrent] = useState(false);
const [showNew, setShowNew] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);
  const scrollContainerRef = useRef(null);
const [starRating, setStarRating] = useState(0); // current rating
const [reviewText, setReviewText] = useState("");
const [showCustomPopup, setShowCustomPopup] = useState(false);

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
        email: userData.email || "",
        contact: userData.contact || "",
      });
      setIsEditing(true);
    }
  };

  const handleSignOut = () => logout(navigate);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
          paddingBottom: "80px",
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
          <h2 style={{ color: "#36570A", margin: 0, fontSize: "16px", fontWeight: "600" }}>
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
          <h2 style={{ color: "#36570A", margin: 0, fontSize: "16px", fontWeight: "600" }}>Settings</h2>
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
    onClick={() => {
      if(item.text === "Password") {
        setShowPasswordPopup(true);
      } else if(item.text === "Terms & Policies") {
        setShowTermsPopup(true); 
      } else if(item.text === "About") {
        setShowAboutPopup(true); 
      } else if(item.text === "Rate") {
        setShowRatePopup(true); 
      }
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <img src={item.icon} alt={item.text} style={{ width: "18px", height: "18px", objectFit: "contain" }} />
      <span style={{ fontSize: "14px", fontWeight: "bold" }}>{item.text}</span>
    </div>
    <img src={profileBack} alt="Back Icon" style={{ width: "15px", height: "15px" }} />
  </div>
))}


{/* Edit Profile Fullscreen Popup */}
{isEditing && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "#fff",
      zIndex: 1000,
      display: "flex",
      flexDirection: "column",
      padding: "5vw",
      alignItems: "center",
    }}
  >
    {/* Back Icon */}
    <img
      src={backIcon}
      alt="Back"
      onClick={() => setIsEditing(false)}
      style={{
        position: "absolute",
        left: "4vw",
        top: "4vh",
        width: "5vw",
        height: "5vw",
        cursor: "pointer",
      }}
    />

    {/* Heading */}
    <h2
      style={{
        fontSize: "4vw",
        fontWeight: "bold",
        color: "black",
        marginTop: "1vh",
        marginBottom: "3vh",
      }}
    >
      Edit Profile
    </h2>

    {/* Hidden File Input */}
    <input
      type="file"
      accept="image/*"
      style={{ display: "none" }}
      id="profileImageInput"
      onChange={(e) => {
        if (e.target.files && e.target.files[0]) {
          setEditValues({
            ...editValues,
            profileImage: URL.createObjectURL(e.target.files[0]),
          });
        }
      }}
    />

    {/* Profile Image */}
    <div
      style={{
        marginBottom: "6vh",
        textAlign: "center",
        position: "relative",
        display: "inline-block",
      }}
    >
      <img
        src={editValues.profileImage || defaultProfile}
        alt="Profile"
        style={{
          width: "20vw",
          height: "20vw",
          borderRadius: "50%",
          objectFit: "cover",
          cursor: "pointer",
        }}
        onClick={() => document.getElementById("profileImageInput").click()}
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
          borderRadius: "60%",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "3px",
          cursor: "pointer",
        }}
        onClick={() => document.getElementById("profileImageInput").click()}
      />
    </div>

    {/* Form Fields */}
<div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
  {/* Full Name */}
  <div style={{ display: "flex", flexDirection: "column" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
      <img src={user} alt="User" style={{ width: "16px", height: "16px", opacity: 0.7 }} />
      <label style={{ fontSize: "14px", fontWeight: "500" }}>Full Name</label>
    </div>
    <input
      type="text"
      placeholder="Enter your full name"
      value={editValues.fullName}
      onChange={(e) => setEditValues({ ...editValues, fullName: e.target.value })}
      style={{
        padding: "10px",
        fontSize: "14px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        width: "100%",
        height: "40px",
        boxSizing: "border-box",
        color: "#000",
      }}
    />
  </div>

  {/* Email Address */}
  <div style={{ display: "flex", flexDirection: "column" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
      <img src={email} alt="Email" style={{ width: "16px", height: "16px", opacity: 0.7 }} />
      <label style={{ fontSize: "14px", fontWeight: "500" }}>Email Address</label>
    </div>
    <input
      type="email"
      placeholder="Enter your email address"
      value={editValues.email}
      onChange={(e) => setEditValues({ ...editValues, email: e.target.value })}
      style={{
        padding: "10px",
        fontSize: "14px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        width: "100%",
        height: "40px",
        boxSizing: "border-box",
        color: "#000",
      }}
    />
  </div>

  {/* Contact */}
  <div style={{ display: "flex", flexDirection: "column" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
      <img src={phone} alt="Phone" style={{ width: "16px", height: "16px", opacity: 0.7 }} />
      <label style={{ fontSize: "14px", fontWeight: "500" }}>Contact</label>
    </div>
    <input
      type="text"
      placeholder="Enter your contact number"
      value={editValues.contact}
      onChange={(e) => setEditValues({ ...editValues, contact: e.target.value })}
      style={{
        padding: "10px",
        fontSize: "14px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        width: "100%",
        height: "40px",
        boxSizing: "border-box",
        color: "#000",
      }}
    />
  </div>
</div>

    {/* Save Button */}
    <button
      style={{
        marginTop: "4vh",
        padding: "3vw",
        fontSize: "3.5vw",
        fontWeight: "bold",
        color: "#fff",
        backgroundColor: "#36570A",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        width: "100%",
      }}
      onClick={() => {
        console.log("Saved:", editValues);
        setIsEditing(false);
      }}
    >
      Save Changes
    </button>
  </div>
)}

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
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
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
            {/* Back Icon */}
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

            {/* FAQ Header */}
            <div style={{ marginTop: "6vh", padding: "20px" }}>
              <h3 style={{ fontSize: "26px", fontWeight: "bold" }}>Frequently Asked</h3>
              <p style={{ fontSize: "26px", fontWeight: "bold", marginTop: "-1px" }}>Questions</p>

              {/* Search Button Below FAQ Header */}
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "350px",
                    height: "50px",
                    gap: "10px",
                    backgroundColor: "rgba(54, 87, 10, 0.1)",
                    borderRadius: "12px",
                    padding: "10px 25px",
                    cursor: "pointer",
                    fontSize: "15px",
                    fontFamily: "Poppins",
                  }}
                >
                  <img
                    src={searchIcon}
                    alt="Search"
                    style={{
                      width: "18px",
                      height: "18px",
                      filter: "brightness(0)",
                    }}
                  />
                  What's on your mind?
                </button>
              </div>
            </div>

            {/* Scrollable FAQ List */}
<div style={{ padding: "20px", marginTop: "-15px", display: "flex", flexDirection: "column", gap: "10px" }}>
  {faqsData.map((faqItem, index) => (
    <div
      key={index}
      style={{
        backgroundColor: "rgba(211, 211, 211, 0.2)", // semi-transparent #365570
        borderRadius: "12px",
        padding: "15px",
        cursor: "pointer",
      }}
      onClick={() => setOpenIndex(openIndex === index ? null : index)}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "13.5px", color: "black" }}>{faqItem.question}</span>
        <span
          style={{
            fontSize: "15px",
            color: "black",
            transform: openIndex === index ? "rotate(0deg)" : "rotate(180deg)",
            transition: "transform 0.3s",
          }}
        >
          ▼
        </span>
      </div>
      {openIndex === index && (
        <p style={{ marginTop: "6px", textAlign: "justify", fontSize: "12px", fontWeight: "bold", lineHeight: "1.2", color: "black" }}>{faqItem.answer}</p>
      )}
    </div>
  ))}
</div>
          </div>
        </div>
      )}

{/* Terms & Policies Popup */}
{showTermsPopup && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.5)",
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
      {/* Back Icon */}
      <img
        src={backIcon}
        alt="Back"
        onClick={() => setShowTermsPopup(false)}
        style={{
          position: "absolute",
          left: "4vw",
          top: "4vh",
          width: "5vw",
          height: "5vw",
          cursor: "pointer",
        }}
      />

      {/* Tabs Navigator */}
<div style={{ marginTop: "8.5vh", padding: "0 20px", position: "relative", display: "flex", width: "100%" }}>
  {["Terms of Service", "Privacy Policy"].map((tab, index) => (
    <div
      key={index}
      onClick={() => setActiveTab(tab)}
      style={{
        flex: 1,
        textAlign: "center",
        padding: "10px 0",
        cursor: "pointer",
        fontWeight: activeTab === tab ? "bold" : "normal",
        fontSize: "16px",
      }}
    >
      {tab}
    </div>
  ))}

  {/* Sliding green underline */}
  <div
    style={{
      position: "absolute",
      bottom: 0,
      left: activeTab === "Terms of Service" ? "0%" : "50%",
      width: "50%",
      height: "2px",
      backgroundColor: "#36570A",
      transition: "left 0.3s ease",
    }}
  />
</div>

      {/* Tab Content */}
<div style={{ marginTop: "-1px", padding: "20px", textAlign: "justify", fontSize: "14px", lineHeight: "1.5", color: "black" }}>
  {activeTab === "Terms of Service" && (
    <div>
      <p><strong>1. Purpose</strong><br/>
      This system allows students and staff to pre-order food and beverages from the school cafeteria for faster and more organized service.<br/><br/></p>

      <p><strong>2. Account Use</strong><br/>
      Users must provide accurate information when creating an account. Sharing or misusing another person’s account is strictly prohibited.<br/><br/></p>

      <p><strong>3. Ordering Policy</strong><br/>
      Orders must be placed within the cafeteria’s operating hours.<br/>
      Once an order is confirmed, cancellations or changes may not be guaranteed.<br/>
      Payment (if applicable) must be settled following the cafeteria’s approved payment method.<br/><br/></p>

      <p><strong>4. Pick-Up</strong><br/>
      Orders should be claimed at the designated pick-up area within the scheduled time. Unclaimed orders after a certain period may be disposed of or re-sold.<br/><br/></p>

      <p><strong>5. Conduct</strong><br/>
      Users must respect cafeteria staff and follow school policies when using the system. Misuse or abuse of the system may result in suspension or restriction of access.<br/><br/></p>

      <p><strong>6. Modifications</strong><br/>
      The school reserves the right to update menu items, prices, and system features without prior notice.<br/><br/></p>

      <p><strong>7. Agreement</strong><br/>
      By using this system, you agree to abide by these terms and the cafeteria’s operating policies.<br/><br/></p>
    </div>
  )}

  {activeTab === "Privacy Policy" && (
    <div>
      <p><strong>1. Information We Collect</strong><br/>
      We collect only the necessary information such as your name, student/staff ID, contact details, and order history.<br/><br/></p>

      <p><strong>2. How We Use Your Information</strong><br/>
      Your information is used to process orders, notify you of order status, and improve cafeteria operations.<br/><br/></p>

      <p><strong>3. Data Security</strong><br/>
      All personal information is securely stored and accessible only to authorized cafeteria personnel or system administrators.<br/><br/></p>

      <p><strong>4. Data Sharing</strong><br/>
      We do not share your information with outside parties unless required by school administration or law.<br/><br/></p>

      <p><strong>5. User Rights</strong><br/>
      You may request to review or update your personal information at any time by contacting the cafeteria management.<br/><br/></p>

      <p><strong>6. Policy Updates</strong><br/>
      This policy may be updated to reflect improvements or new regulations. Users will be informed of significant changes through the system.<br/><br/></p>
    </div>
  )}
</div>
    </div>
  </div>
)}

{/* About Popup */}
{showAboutPopup && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
  >
    {/* Scrollable White Container */}
    <div
      style={{
        backgroundColor: "#fff",
        width: "100%",
        height: "100vh", // slight margin for better popup feel
        overflowY: "auto", // 👈 whole popup scrolls (including back icon)
        padding: "5vh 5vw",
        boxSizing: "border-box",
      }}
    >
      {/* Back Icon */}
      <img
        src={backIcon}
        alt="Back"
        onClick={() => setShowAboutPopup(false)}
        style={{
          position: "absolute",
          left: "4vw",
          top: "4vh",
          width: "5vw",
          height: "5vw",
          cursor: "pointer",
        }}
      />

      {/* About Us Text */}
      <div
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "black",
          marginTop: "30px",
        }}
      >
        About Us
      </div>

      {/* About Description */}
      <div
        style={{
          marginTop: "15px",
          backgroundColor: "rgba(54, 87, 10, 0.1)",
          borderRadius: "15px",
          padding: "18px",
          fontSize: "14px",
          lineHeight: "1.5",
          color: "#000",
          textAlign: "justify",
          fontWeight: "500",
        }}
      >
        The Cafeteria Pre-Ordering System is designed to make food service in our school faster, more organized, and more convenient.
        It allows students and staff to browse available meals, place orders in advance, and pick them up without waiting in long lines.
        <br /><br />
        This system aims to reduce congestion during break hours, minimize food waste, and help the cafeteria staff manage orders efficiently.
      </div>

      {/* Developers Text */}
      <div
        style={{
          marginTop: "25px",
          fontSize: "18px",
          fontWeight: "bold",
          color: "black",
        }}
      >
        Developers
      </div>

      {/* Developers Description */}
      <div
        style={{
          marginTop: "15px",
          backgroundColor: "rgba(54, 87, 10, 0.1)",
          borderRadius: "15px",
          padding: "18px",
          fontSize: "14px",
          lineHeight: "1.5",
          color: "#000",
          textAlign: "justify",
          fontWeight: "500",
          marginBottom: "40px",
        }}
      >
        This system was developed by a team of 3rd year Computer Science students as part of a course project.
        Our goal is to create simple, practical solutions applying software engineering theories and practices.
      </div>
    </div>
  </div>
)}



{/* Password Popup */}
{showPasswordPopup && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.5)",
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
      }}
    >
      {/* Back Icon */}
      <img
        src={backIcon}
        alt="Back"
        onClick={() => setShowPasswordPopup(false)}
        style={{
          position: "absolute",
          left: "4vw",
          top: "4vh",
          width: "5vw",
          height: "5vw",
          cursor: "pointer",
        }}
      />

      {/* Scrollable Content */}
      <div
        style={{
          marginTop: "10.5vh",
          height: "91vh",
          overflowY: "auto",
          padding: "0 5vw 5vh 5vw",
          boxSizing: "border-box",
        }}
      >
        {/* Icon + Title + Description */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <img
            src={password} // make sure 'password' is imported above
            alt="Password"
            style={{ width: "40px", height: "40px" }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "black",
              }}
            >
              Change Password
            </div>
            <div
              style={{
                fontSize: "11.5px",
                color: "#000",
                lineHeight: "1.5",
                fontWeight: "400",
              }}
            >
              Update password for enhanced account security.
            </div>
          </div>
        </div>

        {/* Password Fields */}
        <div
          style={{
            marginTop: "35px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {/* Current Password */}
          <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
            <label
              style={{
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "5px",
              }}
            >
              Current Password
            </label>
            <input
              type={showCurrent ? "text" : "password"}
              placeholder="Enter current password"
              style={{
                padding: "10px 40px 10px 10px",
                fontSize: "14px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                width: "100%",
                height: "40px",
                boxSizing: "border-box",
                color: "#000",
              }}
            />
            <img
              src={showCurrent ? showIcon : hideIcon}
              alt="toggle"
              onClick={() => setShowCurrent(!showCurrent)}
              style={{
                position: "absolute",
                right: "10px",
                top: "33px",
                width: "22px",
                height: "22px",
                cursor: "pointer",
              }}
            />
          </div>

          {/* New Password */}
          <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
            <label
              style={{
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "5px",
              }}
            >
              New Password
            </label>
            <input
              type={showNew ? "text" : "password"}
              placeholder="Enter new password"
              style={{
                padding: "10px 40px 10px 10px",
                fontSize: "14px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                width: "100%",
                height: "40px",
                boxSizing: "border-box",
                color: "#000",
              }}
            />
            <img
              src={showNew ? showIcon : hideIcon}
              alt="toggle"
              onClick={() => setShowNew(!showNew)}
              style={{
                position: "absolute",
                right: "10px",
                top: "33px",
                width: "22px",
                height: "22px",
                cursor: "pointer",
              }}
            />
          </div>

          {/* Confirm New Password */}
          <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
            <label
              style={{
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "5px",
              }}
            >
              Confirm New Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm new password"
              style={{
                padding: "10px 40px 10px 10px",
                fontSize: "14px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                width: "100%",
                height: "40px",
                boxSizing: "border-box",
                color: "#000",
              }}
            />
            <img
              src={showConfirm ? showIcon : hideIcon}
              alt="toggle"
              onClick={() => setShowConfirm(!showConfirm)}
              style={{
                position: "absolute",
                right: "10px",
                top: "33px",
                width: "22px",
                height: "22px",
                cursor: "pointer",
              }}
            />
          </div>

          {/* Password Note */}
          <div style={{ fontSize: "12px", color: "#555" }}>
            New password must be 8-16 characters.
          </div>

          {/* Apply Changes Button */}
          <button
            style={{
              marginTop: "20px",
              padding: "10px",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: "#36570A",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  </div>
)}

{/* Rate Popup */}
{showRatePopup && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
  >
    <div
      style={{
        backgroundColor: "#fff",
        width: "90vw",       // smaller width
        maxWidth: "400px",   // optional max width
        padding: "5vh 5vw",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      {/* Back Icon */}
      <img
        src={backIcon}
        alt="Back"
        onClick={() => setShowRatePopup(false)}
        style={{
          position: "absolute",
          left: "5%",
          top: "5%",
          width: "6vw",
          maxWidth: "24px",
          cursor: "pointer",
        }}
      />

      {/* Heading */}
      <h2
        style={{
          fontSize: "3.5vw",
          fontWeight: "bold",
          color: "#36570A",
          marginTop: "5vh",
          textAlign: "center",
        }}
      >
        How are you experiencing our pre-ordering system so far?
      </h2>

      {/* Stars */}
<div style={{ display: "flex", gap: "2vw", marginTop: "2vh" }}>
  {[1, 2, 3, 4, 5].map((star) => (
    <img
      key={star}
      src={starRating >= star ? filledStar : emptyStar}
      alt={`${star} star`}
      style={{ width: "6vw", maxWidth: "40px", cursor: "pointer" }}
      onClick={() => setStarRating(star)}
    />
  ))}
</div>

{/* Counter and Text */}
{starRating > 0 && (
  <div
    style={{
      marginTop: "1vh",
      textAlign: "center",
      fontSize: "3vw",
      fontWeight: "400",
      color: "black",
    }}
  >
    {" "}
    {starRating === 1
      ? "Very Bad"
      : starRating === 2
      ? "Bad"
      : starRating === 3
      ? "Meh"
      : starRating === 4
      ? "Good"
      : "Very Good"}
  </div>
)}
{/* Detailed Review Label */}
<div
  style={{
    marginTop: "3vh",
    width: "95%",
    textAlign: "left",
    fontSize: "3vw",
    fontWeight: "500",
  }}
>
  Detailed Review
</div>

{/* Detailed Review */}
<div style={{ marginTop: "1vh", width: "105%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
  <textarea
    placeholder="Help us improve by leaving a detailed review here..."
    value={reviewText}
    onChange={(e) => {
      if (e.target.value.length <= 200) setReviewText(e.target.value);
    }}
    style={{
      width: "90%",        
      height: "20vh",      
      padding: "10px",
      fontSize: "3vw",
      borderRadius: "8px",
      border: "1px solid #ccc",
      resize: "none",
      boxSizing: "border-box",
      color: "#000",
      fontFamily: "inherit",
    }}
  />
{/* Character Counter (left-aligned) */}
  <div style={{ width: "89%", textAlign: "left", marginTop: "1vh", fontSize: "2.5vw", color: "#000" }}>
    ({reviewText.length}/200)
  </div>
</div>


{/* Submit Button */}
<button
  style={{
    marginTop: "3vh",
    padding: "10px 30px",
    fontSize: "3.5vw",
    color: "black",
    backgroundcolor: "#000",
          border: "1px solid #ccc",
    borderRadius: "8px",
    cursor: "pointer",
  }}
  onClick={() => {
    console.log("Rated:", starRating);
    setShowRatePopup(false);
  }}
>
  Submit
</button>

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
