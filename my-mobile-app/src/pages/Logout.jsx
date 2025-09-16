import React from "react";
import backIcon from "../assets/back.png";
import homeIcon from "../assets/home.png";
import cartIcon from "../assets/cart.png";
import menuIcon from "../assets/menu.png";
import personIcon from "../assets/person.png";
import orderIcon from "../assets/order.png";

export default function AccountPage() {
  return (
    <div className="w-screen h-screen relative bg-white font-poppins">
      {/* Back button */}
      <button
        className="absolute cursor-pointer"
        style={{
          left: "11px",
          top: "56px",
          width: "24px",
          height: "24px",
          padding: 0,
          border: "none",
          background: "transparent",
          zIndex: 10, // make sure it is on top
        }}
        onClick={() => alert("Back clicked")}
      >
        <img
          src={backIcon}
          alt="Back"
          className="w-full h-full object-contain"
        />
      </button>

      {/* Title: Account */}
      <h1
        className="absolute font-bold text-center"
        style={{
          left: 0,
          right: 0,
          top: "53px",
          margin: "0 auto",
          fontSize: "18px",
          color: "#000",
          pointerEvents: "none", // prevents blocking the button
        }}
      >
        Account
      </h1>

      {/* Log out button */}
      <button
        className="absolute rounded-lg"
        style={{
          left: "24px",
          top: "690px",
          width: "364px",
          height: "36px",
          backgroundColor: "white",
          border: "1px solid #36570A",
          color: "black",
          fontSize: "14px",
        }}
        onClick={() => alert("Log out clicked")}
      >
        Log out
      </button>

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
