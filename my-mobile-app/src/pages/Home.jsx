import React, { useState, useRef } from "react";
import searchIcon from "../assets/search.png";
import homeIcon from "../assets/home.png";
import menuIcon from "../assets/menu.png";
import cartIcon from "../assets/cart.png";
import orderIcon from "../assets/order.png";
import personIcon from "../assets/person.png";
import notiIcon from "../assets/noti.png";
import foodIcon from "../assets/food.png";
import food1 from "../assets/food1.png";
import food2 from "../assets/food2.png";
import food3 from "../assets/food3.png";
import menu1 from "../assets/menu1.png";
import menu2 from "../assets/menu2.png";
import menu3 from "../assets/menu3.png";
import menu4 from "../assets/menu4.png";
import menu5 from "../assets/menu5.png";
import menu6 from "../assets/menu6.png";
import todayImg from "../assets/today.jpg";
import heart from "../assets/heart.png";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationCount] = useState(3);
  const [heartCount] = useState(2); // default value, change as needed
  const [scrollY, setScrollY] = useState(0);
  const [showBottomBar, setShowBottomBar] = useState(true);
  const scrollRef = useRef();

  const foodDeals = [food1, food2, food3];
  const [activeDeal, setActiveDeal] = useState(0);
  const carouselRef = useRef();
  const touchStartX = useRef(0);

  const menuCategories = [
    "Budget Snacks",
    "Snacks",
    "Value Meals",
    "Packed Meals",
    "Short Orders",
    "Buffet",
  ];

  const menuImages = [menu1, menu2, menu3, menu4, menu5, menu6];

  // Editable texts for 4 deals
  const [texts, setTexts] = useState(["Deal 1", "Deal 2", "Deal 3", "Deal 4"]);

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`You searched for: ${searchQuery}`);
  };

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    setScrollY(scrollTop);

    const scrollHeight = e.target.scrollHeight;
    const clientHeight = e.target.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      setShowBottomBar(false);
    } else {
      setShowBottomBar(true);
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX.current - touchEndX > 50) {
      setActiveDeal((prev) => (prev + 1) % foodDeals.length);
    } else if (touchEndX - touchStartX.current > 50) {
      setActiveDeal((prev) => (prev - 1 + foodDeals.length) % foodDeals.length);
    }
  };

  const searchTop = Math.max(20, 119 - scrollY);
  const containerTop = Math.max(searchTop + 55, 288 - scrollY);
  const opacity = Math.max(0, 1 - scrollY / 150);

  return (
    <div
      style={{
        backgroundColor: "#36570A",
        width: "100vw",
        minWidth: "414px",
        height: "100vh",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* Heart icon with counter */}
<div
  style={{
    position: "absolute",
    left: "330px",
    top: `${80 - scrollY}px`,
    width: "22px",
    height: "22px",
    opacity,
    transition: "top 0.1s, opacity 0.1s",
    cursor: "pointer",
  }}
  onClick={() => alert("Go to Favorites")}
>
  <img src={heart} alt="Favorites" style={{ width: "18px", height: "18px", filter: "brightness(0) invert(1)" }} />
  {heartCount > 0 && (
    <span
      style={{
        position: "absolute",
        top: "-7px",
        right: "-8px",
        backgroundColor: "white",   // white badge
        color: "#36570A",           // dark green text
        borderRadius: "50%",
        padding: "2px 6px",
        fontSize: "8px",
        fontFamily: "Poppins, sans-serif",
        fontWeight: "600",
        border: "1px solid #36570A", // stroke to match theme
        minWidth: "18px",
        textAlign: "center",
      }}
    >
      {heartCount}
    </span>
  )}
</div>

{/* Notification icon with counter */}
<div
  style={{
    position: "absolute",
    left: "362px",
    top: `${78 - scrollY}px`,
    width: "22px",
    height: "22px",
    opacity,
    transition: "top 0.1s, opacity 0.1s",
    cursor: "pointer",
  }}
  onClick={() => alert("Go to Notifications")}
>
  <img src={notiIcon} alt="Notification" style={{ width: "22px", height: "22px" }} />
  {notificationCount > 0 && (
    <span
      style={{
        position: "absolute",
        top: "-5px",
        right: "-6px",
        backgroundColor: "white",   // white badge
        color: "#36570A",           // dark green text
        borderRadius: "50%",
        padding: "2px 6px",
        fontSize: "8px",
        fontFamily: "Poppins, sans-serif",
        fontWeight: "600",
        border: "1px solid #36570A", // stroke to match theme
        minWidth: "18px",
        textAlign: "center",
      }}
    >
      {notificationCount}
    </span>
  )}
</div>

      {/* Pinned Search Bar */}
      <form
        onSubmit={handleSearch}
        style={{
          position: "absolute",
          left: "20px",
          top: `${searchTop}px`,
          width: "370px",
          height: "35px",
          backgroundColor: "#FFFFFF",
          border: "1px solid #36570A",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          zIndex: 10,
          transition: "top 0.1s",
        }}
      >
        <img
          src={searchIcon}
          alt="Search"
          style={{
            marginLeft: "12px",
            width: "18px",
            height: "18px",
            filter: "brightness(0) saturate(100%)",
            cursor: "pointer",
          }}
          onClick={() => alert(`Search for: ${searchQuery}`)}
        />
        <input
          type="text"
          placeholder="Have an exact order in mind?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            marginLeft: "12px",
            width: "100%",
            fontSize: "12px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "400",
            color: "#4A4A4A",
            border: "none",
            outline: "none",
            background: "transparent",
          }}
        />
      </form>

      {/* Greeting */}
      <p
        style={{
          position: "absolute",
          left: "24px",
          top: `${205 - scrollY}px`,
          fontSize: "24px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: "700",
          color: "#FFFFFF",
          opacity,
          transition: "top 0.1s, opacity 0.1s",
        }}
      >
        Hello, User!
      </p>
      <p
        style={{
          position: "absolute",
          left: "24px",
          top: `${240 - scrollY}px`,
          fontSize: "12px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: "300",
          color: "#FFFFFF",
          opacity,
          transition: "top 0.1s, opacity 0.1s",
        }}
      >
        Let's find a best food match for you
      </p>

      {/* Food Image */}
      <img
        src={foodIcon}
        alt="Food"
        style={{
          position: "absolute",
          left: "255px",
          top: `${176 - scrollY}px`,
          width: "149px",
          height: "150px",
          opacity,
          transition: "top 0.1s, opacity 0.1s",
        }}
      />

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          position: "absolute",
          top: `${containerTop}px`,
          left: "0px",
          width: "414px",
          height: `calc(100vh - ${containerTop}px)`,
          overflowY: "scroll",
          backgroundColor: "#FFFFFF",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          padding: "10px",
          paddingBottom: "130px",
          transition: "top 0.1s",
          zIndex: 1,
        }}
>
        {/* Food Deals Carousel */}
        <div
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            position: "absolute",
            left: "17px",
            top: "21px",
            width: "376px",
            height: "201px",
            borderRadius: "20px",
            overflow: "hidden",
            cursor: "pointer",
          }}
          onClick={() => alert(`Clicked on carousel image ${activeDeal + 1}`)}
        >
          <img
            src={foodDeals[activeDeal]}
            alt={`Food ${activeDeal + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "20px",
              filter: "brightness(50%)",
            }}
          />
        </div>

        {/* Carousel Indicator */}
        <div
          style={{
            position: "absolute",
            top: "232px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "6px",
          }}
        >
          {foodDeals.map((_, index) => (
            <div
              key={index}
              style={{
                width: "24px",
                height: "3px",
                borderRadius: "2px",
                backgroundColor: activeDeal === index ? "#36570A" : "#D3D3D3",
                transition: "background-color 0.3s",
              }}
            ></div>
          ))}
        </div>

        {/* What's available today */}
        <p
          style={{
            position: "absolute",
            top: "265px",
            width: "100%",
            textAlign: "center",
            fontSize: "18px",
            fontWeight: 600,
            color: "#36570A",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          What's available today?
        </p>

        {/* Today's Image */}
        <img
          src={todayImg}
          alt="Today's special"
          style={{
            position: "absolute",
            top: "305px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "132px",
            height: "157px",
            borderRadius: "20px",
            objectFit: "cover",
            cursor: "pointer",
            filter: "brightness(50%)",
          }}
          onClick={() => alert("Clicked on today's special")}
        />

        {/* Click here text on top of the image */}
        <p
          style={{
            position: "absolute",
            top: "425px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "300",
            textDecoration: "underline",
            margin: 0,
            fontSize: "10px",
            cursor: "pointer",
            zIndex: 2,
          }}
          onClick={() => alert("Clicked on today's special")}
        >
          Click here &gt;
        </p>

        {/* Menu Categories Title */}
        <p
          style={{
            position: "absolute",
            left: "23px",
            top: "510px",
            fontSize: "20px",
            fontWeight: "600",
            color: "black",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Menu Categories
        </p>

        {/* Menu Categories Scroll */}
        <div
          style={{
            position: "absolute",
            top: "550px",
            left: "0px",
            display: "flex",
            gap: "15px",
            overflowX: "auto",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingBottom: "16px",
            width: "100%",
          }}
        >
          {menuCategories.map((category, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: "78px",
                cursor: "pointer",
              }}
              onClick={() => alert(`Clicked on ${category}`)}
            >
              <div
                style={{
                  width: "78px",
                  height: "78px",
                  borderRadius: "6px",
                  backgroundColor: "rgba(217, 217, 217, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={menuImages[index]} alt={category} style={{ width: "40px", height: "40px" }} />
              </div>
              <p
                style={{
                  marginTop: "6px",
                  fontSize: "11.5px",
                  color: "#36570A",
                  textAlign: "center",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {category}
              </p>
            </div>
          ))}
        </div>

        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {/* Grey barricade */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "490px",
            width: "100%",
            height: "6px",
            borderRadius: "3px",
            backgroundColor: "rgba(217, 217, 217, 0.3)",
          }}
        ></div>

        {/* Recommendations Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",
            top: "710px",
            left: "25px",
            right: "25px",
          }}
        >
          <p
            style={{
              fontSize: "16px",
              fontWeight: "700",
              color: "black",
              fontFamily: "Poppins, sans-serif",
              margin: 0,
            }}
          >
            Our Deals
          </p>
          <p
            style={{
              fontSize: "13px",
              fontWeight: "400",
              color: "grey",
              fontFamily: "Poppins, sans-serif",
              margin: 0,
              cursor: "pointer",
            }}
            onClick={() => alert("Clicked See All Recommendations")}
          >
            See all
          </p>
        </div>

{/* 4 Hardcoded Deal Cards (2 per row) */}
<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center", // center all cards
    position: "absolute",
    top: "750px",
    left: "0",
    right: "0",
  }}
>
  {/* Deal 1 */}
  <div
    style={{
      backgroundColor: "white",
      border: "1px solid black",
      borderRadius: "10px",
      padding: "15px",
      boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
      width: "220px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <p
      style={{
        fontSize: "16px",
        fontFamily: "Poppins, sans-serif",
        fontWeight: "700",
        color: "black",
        margin: "0 0 8px 0",
        textAlign: "center",
        textDecoration: "underline",
      }}
    >
      VM 1 : Php 55
    </p>
    <ul style={{ paddingLeft: "0px", margin: 0 }}>
      <li style={{ fontSize: "12px", color: "#36570A" }}>- Rice</li>
      <li style={{ fontSize: "12px", color: "#36570A" }}>- Vegetable</li>
      <li style={{ fontSize: "12px", color: "#36570A" }}>- 1 Dish</li>
    </ul>
  </div>

  {/* Deal 2 */}
  <div
    style={{
      backgroundColor: "white",
      border: "1px solid black",
      borderRadius: "10px",
      padding: "15px",
      boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
      width: "220px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <p
      style={{
        fontSize: "16px",
        fontFamily: "Poppins, sans-serif",
        fontWeight: "700",
        color: "black",
        margin: "0 0 8px 0",
        textAlign: "center",
        textDecoration: "underline",
      }}
    >
     VM 2 : Php 70
    </p>
    <ul style={{ paddingLeft: "20px", margin: 0 }}>
      <li style={{ fontSize: "12px", color: "#36570A" }}>- Rice</li>
      <li style={{ fontSize: "12px", color: "#36570A" }}>- Vegetable</li>
      <li style={{ fontSize: "12px", color: "#36570A" }}>- 1 Dish</li>
      <li style={{ fontSize: "12px", color: "#36570A" }}>- Drink</li>

    </ul>
  </div>

  {/* Deal 3 */}
  <div
    style={{
      backgroundColor: "white",
      border: "1px solid black",
      borderRadius: "10px",
      padding: "15px",
      boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
      width: "220px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <p
      style={{
        fontSize: "16px",
        fontFamily: "Poppins, sans-serif",
        fontWeight: "700",
        color: "black",
        margin: "0 0 8px 0",
        textAlign: "center",
        textDecoration: "underline",
      }}
    >
      VM 3 : Php 70
    </p>
    <ul style={{ paddingLeft: "20px", margin: 0 }}>
      <li style={{ fontSize: "12px", color: "#36570A" }}>- Rice</li>
      <li style={{ fontSize: "12px", color: "#36570A" }}>- Vegetable</li>
      <li style={{ fontSize: "12px", color: "#36570A" }}>- 2 Dishes</li>
    </ul>
  </div>

  {/* Deal 4 */}
  <div
    style={{
      backgroundColor: "white",
      border: "1px solid black",
      borderRadius: "10px",
      padding: "15px",
      boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
      width: "220px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <p
      style={{
        fontSize: "16px",
        fontFamily: "Poppins, sans-serif",
        fontWeight: "700",
        color: "black",
        margin: "0 0 8px 0",
        textAlign: "center",
        textDecoration: "underline",
      }}
    >
      VM 4 : Php 85
    </p>
    <ul style={{ paddingLeft: "20px", margin: 0 }}>
      <li style={{ fontSize: "12px", color: "#36570A" }}>- Rice</li>
      <li style={{ fontSize: "12px", color: "#36570A" }}>- Vegetable</li>
      <li style={{ fontSize: "12px", color: "#36570A" }}>- 2 Dishes</li>
            <li style={{ fontSize: "12px", color: "#36570A" }}>- Drink</li>

    </ul>
  </div>
</div>

      </div>

      {/* Bottom Bar */}
      {showBottomBar && (
        <div
          style={{
            position: "fixed",
            left: "0px",
            bottom: "0px",
            width: "414px",
            height: "55px",
            backgroundColor: "#FFFFFF",
            borderTop: "0.5px solid #CECECE",
            zIndex: 9999,
          }}
        >
          <img
            src={homeIcon}
            alt="Home"
            style={{
              position: "absolute",
              left: "34px",
              top: "10px",
              width: "20px",
              height: "20px",
              filter:
                "brightness(0) saturate(100%) invert(35%) sepia(72%) saturate(454%) hue-rotate(53deg) brightness(95%) contrast(93%)",
              cursor: "pointer",
            }}
            onClick={() => alert("Go to Home")}
          />
          <img
            src={menuIcon}
            alt="Menu"
            style={{ position: "absolute", left: "115px", top: "10px", width: "20px", height: "20px", filter: "invert(0%)", cursor: "pointer" }}
            onClick={() => alert("Go to Menu")}
          />
          <img
            src={cartIcon}
            alt="Cart"
            style={{
              position: "absolute",
              left: "196px",
              top: "10px",
              width: "20px",
              height: "20px",
              filter: "brightness(0) saturate(100%) invert(0%)",
              cursor: "pointer",
            }}
            onClick={() => alert("Go to Cart")}
          />
          <img
            src={orderIcon}
            alt="Orders"
            style={{
              position: "absolute",
              left: "277px",
              top: "10px",
              width: "20px",
              height: "20px",
              filter: "brightness(0) saturate(100%) invert(0%)",
              cursor: "pointer",
            }}
            onClick={() => alert("Go to Orders")}
          />
          <img
            src={personIcon}
            alt="Profile"
            style={{
              position: "absolute",
              left: "360px",
              top: "10px",
              width: "20px",
              height: "20px",
              filter: "brightness(0) saturate(100%) invert(0%)",
              cursor: "pointer",
            }}
            onClick={() => alert("Go to Profile")}
          />

          <p style={{ position: "absolute", left: "32px", top: "35px", fontSize: "8px", fontFamily: "Poppins, sans-serif", fontWeight: "300", color: "#36570A" }}>Home</p>
          <p style={{ position: "absolute", left: "114px", top: "35px", fontSize: "8px", fontFamily: "Poppins, sans-serif", fontWeight: "300", color: "#000000" }}>Menu</p>
          <p style={{ position: "absolute", left: "198px", top: "35px", fontSize: "8px", fontFamily: "Poppins, sans-serif", fontWeight: "300", color: "#000000" }}>Cart</p>
          <p style={{ position: "absolute", left: "277px", top: "35px", fontSize: "8px", fontFamily: "Poppins, sans-serif", fontWeight: "300", color: "#000000" }}>Orders</p>
          <p style={{ position: "absolute", left: "356px", top: "35px", fontSize: "8px", fontFamily: "Poppins, sans-serif", fontWeight: "300", color: "#000000" }}>Profile</p>
        </div>
      )}
    </div>
  );
}
