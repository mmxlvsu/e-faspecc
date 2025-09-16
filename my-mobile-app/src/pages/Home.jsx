import React, { useState } from "react";
import searchIcon from "../assets/search.png";
import homeIcon from "../assets/home.png";
import cartIcon from "../assets/cart.png";
import menuIcon from "../assets/menu.png";
import personIcon from "../assets/person.png";
import orderIcon from "../assets/order.png";
import notIcon from "../assets/not.png";

export default function Home({ username = "User" }) {
  const [notifications, setNotifications] = useState(3); // placeholder number

  return (
    <div className="w-screen h-screen relative bg-white font-poppins">
      {/* Circle with notification */}
      <div
        className="absolute"
        style={{
          left: "354px",
          top: "73px",
          width: "40px",
          height: "40px",
        }}
      >
        <button className="w-full h-full relative flex items-center justify-center rounded-full bg-[#F5F5F5]" onClick={() => alert("Notification clicked")}>
          <img src={notIcon} alt="Notification" className="w-6 h-6" />
          {notifications > 0 && (
            <div
              className="absolute flex items-center justify-center text-white font-bold text-[10px]"
              style={{
                top: "-4px",
                right: "-4px",
                width: "16px",
                height: "16px",
                backgroundColor: "orange",
                borderRadius: "50%",
              }}
            >
              {notifications}
            </div>
          )}
        </button>
      </div>

      {/* Greeting text */}
      <h1
        className="absolute font-bold"
        style={{
          left: "26px",
          top: "144px",
          width: "194px",
          height: "26px",
          fontSize: "24px",
          color: "#36570A",
        }}
      >
        Hi, {username}!
      </h1>

      {/* Subtext */}
      <p
        className="absolute"
        style={{
          left: "25px",
          top: "180px",
          width: "346px",
          height: "28px",
          fontSize: "10px",
          color: "black",
        }}
      >
        Let's find the best food match for you.
      </p>

      {/* Search input field */}
      <div
        className="absolute flex items-center"
        style={{
          left: "24px",
          top: "207px",
          width: "370px",
          height: "51px",
          backgroundColor: "white",
          border: "1px solid #36570A",
          borderRadius: "8px",
          padding: "0 12px",
        }}
      >
        <input
          type="text"
          placeholder="Have an exact order in mind?"
          className="flex-1 text-[#36570A] placeholder-[#36570A] text-[12px] bg-transparent outline-none"
        />
        <img
          src={searchIcon}
          alt="Search"
          style={{ width: "24px", height: "24px" }}
        />
      </div>

      {/* Rectangular rounded element */}
      <div
        className="absolute"
        style={{
          left: "20px",
          top: "770px",
          width: "372px",
          height: "56px",
          backgroundColor: "#6A972E",
          borderRadius: "50px",
        }}
      ></div>

      {/* Bottom icons as buttons */}
      <button
        className="absolute"
        style={{ left: "42px", top: "781px", width: "32px", height: "34px" }}
        onClick={() => alert("Home clicked")}
      >
        <img src={homeIcon} alt="Home" className="w-full h-full" />
      </button>

      <button
        className="absolute"
        style={{ left: "118px", top: "781px", width: "32px", height: "34px" }}
        onClick={() => alert("Menu clicked")}
      >
        <img src={menuIcon} alt="Menu" className="w-full h-full" />
      </button>

      <button
        className="absolute"
        style={{ left: "265px", top: "781px", width: "32px", height: "34px" }}
        onClick={() => alert("Order clicked")}
      >
        <img src={orderIcon} alt="Order" className="w-full h-full" />
      </button>

      <button
        className="absolute"
        style={{ left: "190px", top: "781px", width: "32px", height: "34px" }}
        onClick={() => alert("Cart clicked")}
      >
        <img src={cartIcon} alt="Cart" className="w-full h-full" />
      </button>

      <button
        className="absolute"
        style={{ left: "335px", top: "781px", width: "32px", height: "34px" }}
        onClick={() => alert("Person clicked")}
      >
        <img src={personIcon} alt="Person" className="w-full h-full" />
      </button>
    </div>
  );
}
